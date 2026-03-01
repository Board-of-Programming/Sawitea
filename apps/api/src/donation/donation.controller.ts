import { Controller, Get, Post, Body, Param, Query, Headers, RawBody } from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import { DonationService } from "./donation.service";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { MayarService } from "../payment/mayar.service";

@Controller("donation")
export class DonationController {
  constructor(
    private readonly donationService: DonationService,
    private readonly mayarService: MayarService,
  ) {}

  @Post(":username")
  @AllowAnonymous()
  async create(
    @Param("username") username: string,
    @Body() createDonationDto: CreateDonationDto,
  ) {
    return this.donationService.create(username, createDonationDto);
  }

  @Get(":username")
  @AllowAnonymous()
  async findByStreamer(
    @Param("username") username: string,
    @Query("limit") limit?: string,
  ) {
    return this.donationService.findByStreamer(
      username,
      limit ? parseInt(limit) : 20
    );
  }

  /**
   * Mayar.id Webhook Handler
   * 
   * This endpoint receives webhook notifications from Mayar.id
   * when payment status changes (paid, expired, failed)
   */
  @Post("webhook/mayar")
  @AllowAnonymous()
  async handleMayarWebhook(
    @Headers("x-mayar-signature") signature: string,
    @RawBody() rawBody: string,
  ) {
    // Verify webhook signature
    const isValid = this.mayarService.verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      return { error: "Invalid signature" };
    }

    const payload = JSON.parse(rawBody);
    await this.mayarService.handleWebhook(payload);

    return { received: true };
  }

  /**
   * Payment success callback
   * Redirected from Mayar.id after successful payment
   */
  @Get("callback/success")
  @AllowAnonymous()
  async handleSuccessCallback(
    @Query("transactionId") transactionId: string,
    @Query("externalId") externalId: string,
  ) {
    // Verify payment status with Mayar.id
    const status = await this.mayarService.getPaymentStatus(transactionId);

    return {
      success: true,
      message: "Payment successful",
      transactionId,
      externalId,
    };
  }
}
