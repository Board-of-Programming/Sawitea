import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import type { Queue } from "bull";
import { eq, desc } from "drizzle-orm";
import { DRIZZLE } from "../database";
import type { DrizzleDB } from "../database";
import { donation, streamer } from "@sawitea/database/schema";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { randomUUID } from "crypto";

@Injectable()
export class DonationService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
    @InjectQueue("donation") private readonly donationQueue: Queue,
  ) {}

  async create(streamerUsername: string, createDonationDto: CreateDonationDto) {
    // Find streamer
    const streamerData = await this.db.query.streamer.findFirst({
      where: eq(streamer.username, streamerUsername),
    });

    if (!streamerData) {
      throw new NotFoundException("Streamer not found");
    }

    const amount = Number(createDonationDto.amount);

    // Create donation with pending status
    const donationId = randomUUID();
    const newDonation = await this.db.insert(donation).values({
      id: donationId,
      streamerId: streamerData.id,
      donorName: createDonationDto.donorName,
      donorEmail: createDonationDto.donorEmail,
      donorMessage: createDonationDto.donorMessage || null,
      isAnonymous: createDonationDto.isAnonymous || false,
      amount: amount.toString(),
      platformFee: "0", // Fee calculation handled by Mayar.id
      gatewayFee: "0",
      totalAmount: amount.toString(), // Total = amount (Mayar handles fees separately)
      paymentMethod: "mayar",
      status: "pending",
    }).returning();

    // TODO: Integrate with Mayar.id API
    const mayarPaymentUrl = await this.createMayarPaymentLink({
      donationId,
      streamerName: streamerData.displayName,
      donorName: createDonationDto.donorName,
      donorEmail: createDonationDto.donorEmail,
      amount,
      message: createDonationDto.donorMessage,
    });

    return {
      donation: newDonation[0],
      paymentUrl: mayarPaymentUrl,
    };
  }

  /**
   * Create payment link via Mayar.id
   * TODO: Replace with actual Mayar.id API integration
   */
  private async createMayarPaymentLink(data: {
    donationId: string;
    streamerName: string;
    donorName: string;
    donorEmail: string;
    amount: number;
    message?: string;
  }): Promise<string> {
    // Placeholder - replace with actual Mayar.id API call
    return `${process.env.FRONTEND_URL}/payment/${data.donationId}`;
  }

  /**
   * Handle Mayar.id webhook callback
   */
  async handleMayarCallback(payload: any) {
    // TODO: Implement webhook handler
  }

  async findByStreamer(streamerUsername: string, limit = 20) {
    const streamerData = await this.db.query.streamer.findFirst({
      where: eq(streamer.username, streamerUsername),
    });

    if (!streamerData) {
      throw new NotFoundException("Streamer not found");
    }

    const donations = await this.db.query.donation.findMany({
      where: eq(donation.streamerId, streamerData.id),
      orderBy: desc(donation.createdAt),
      limit,
    });

    return donations;
  }

  async findRecentDonations(streamerId: string, limit = 10) {
    return this.db.query.donation.findMany({
      where: eq(donation.streamerId, streamerId),
      orderBy: desc(donation.createdAt),
      limit,
    });
  }

  async markAsDisplayed(donationId: string) {
    return this.db.update(donation)
      .set({
        isDisplayed: true,
        displayedAt: new Date(),
      })
      .where(eq(donation.id, donationId))
      .returning();
  }
}
