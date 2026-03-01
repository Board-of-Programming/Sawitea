import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * Mayar.id Payment Service
 * 
 * Documentation: https://docs.mayar.id/api-reference/introduction
 * 
 * Features:
 * - Multiple payment methods: QRIS, E-Wallet, Bank Transfer, Mini Market, Credit Card, Paylater
 * - Headless API for custom checkout flow
 * - Webhook notifications for payment status
 * - Sandbox environment for testing: https://web.mayar.club/
 */
@Injectable()
export class MayarService {
  private readonly logger = new Logger(MayarService.name);
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly isProduction: boolean;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>("MAYAR_API_KEY") || "";
    this.isProduction = this.configService.get<string>("NODE_ENV") === "production";
    
    // Base URL
    // Production: https://api.mayar.id
    // Sandbox: https://api.mayar.club
    this.baseUrl = this.isProduction
      ? "https://api.mayar.id"
      : "https://api.mayar.club";
  }

  /**
   * Create a payment link via Mayar.id
   * 
   * API Endpoint: POST /v1/payment/create
   * 
   * Required fields:
   * - amount: number
   * - description: string
   * - customerName: string
   * - customerEmail: string
   * 
   * Optional fields:
   * - externalId: string (your internal reference ID)
   * - callbackUrl: string (webhook URL)
   * - returnUrl: string (redirect after payment)
   * - expiredAt: string (ISO 8601 datetime)
   */
  async createPaymentLink(data: {
    amount: number;
    description: string;
    customerName: string;
    customerEmail: string;
    externalId?: string;
    callbackUrl?: string;
    returnUrl?: string;
    expiredAt?: string;
  }): Promise<{
    success: boolean;
    paymentUrl: string;
    transactionId: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/payment/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.text();
        this.logger.error(`Mayar API error: ${error}`);
        throw new Error(`Failed to create payment: ${error}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        paymentUrl: result.paymentUrl,
        transactionId: result.transactionId,
      };
    } catch (error) {
      this.logger.error(`Failed to create Mayar payment: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get payment status
   * 
   * API Endpoint: GET /v1/payment/status/:transactionId
   */
  async getPaymentStatus(transactionId: string): Promise<{
    status: "pending" | "paid" | "expired" | "failed";
    amount: number;
    paidAt?: string;
    paymentMethod?: string;
  }> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v1/payment/status/${transactionId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to get payment status`);
      }

      return await response.json();
    } catch (error) {
      this.logger.error(`Failed to get payment status: ${error.message}`);
      throw error;
    }
  }

  /**
   * Cancel a pending payment
   * 
   * API Endpoint: POST /v1/payment/cancel
   */
  async cancelPayment(transactionId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/payment/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionId }),
      });

      return response.ok;
    } catch (error) {
      this.logger.error(`Failed to cancel payment: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify webhook signature
   * 
   * Mayar.id sends webhook notifications with signature for verification
   * Signature is sent in header: X-Mayar-Signature
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    // TODO: Implement signature verification
    // Mayar.id uses HMAC-SHA256 for signature
    
    /*
    import { createHmac } from "crypto";
    
    const webhookSecret = this.configService.get<string>("MAYAR_WEBHOOK_SECRET");
    const expectedSignature = createHmac("sha256", webhookSecret)
      .update(payload)
      .digest("hex");
    
    return signature === expectedSignature;
    */
    
    return true; // Placeholder
  }

  /**
   * Handle webhook callback
   * 
   * Webhook events:
   * - payment.pending: Payment created and waiting for payment
   * - payment.paid: Payment successful
   * - payment.expired: Payment expired
   * - payment.failed: Payment failed
   */
  async handleWebhook(payload: {
    event: string;
    data: {
      transactionId: string;
      externalId?: string;
      status: string;
      amount: number;
      paidAt?: string;
      paymentMethod?: string;
    };
  }): Promise<void> {
    this.logger.log(`[Mayar Webhook] Event: ${payload.event}`);
    this.logger.log(`[Mayar Webhook] Data:`, payload.data);

    switch (payload.event) {
      case "payment.paid":
        // Handle successful payment
        // - Update donation status
        // - Emit WebSocket event
        // - Update streamer stats
        break;

      case "payment.expired":
        // Handle expired payment
        // - Update donation status to expired
        break;

      case "payment.failed":
        // Handle failed payment
        // - Update donation status to failed
        break;

      default:
        this.logger.warn(`[Mayar Webhook] Unknown event: ${payload.event}`);
    }
  }
}
