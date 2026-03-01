import { Processor, Process } from "@nestjs/bull";
import type { Job } from "bull";
import { Inject } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DRIZZLE } from "../database";
import type { DrizzleDB } from "../database";
import { donation, streamer } from "@sawitea/database/schema";
import { DonationGateway } from "../websocket/donation.gateway";

interface PaymentJobData {
  donationId: string;
  streamerId: string;
  amount: number;
}

@Processor("donation")
export class DonationProcessor {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
    private readonly donationGateway: DonationGateway,
  ) {}

  @Process("process-payment")
  async handlePayment(job: Job<PaymentJobData>) {
    const { donationId, streamerId, amount } = job.data;

    console.log(`[Mayar.id] Processing payment for donation ${donationId}`);

    // Note: Actual payment processing is handled by Mayar.id
    // This processor handles post-payment updates from Mayar.id webhook
    
    // TODO: Implement Mayar.id webhook handling
    // When Mayar.id sends webhook notification:
    // 1. Verify webhook signature
    // 2. Update donation status
    // 3. Emit WebSocket event
    // 4. Update streamer stats

    console.log(`[Mayar.id] Payment processed for donation ${donationId}`);

    return { donationId, status: "processed" };
  }

  @Process("complete-donation")
  async handleCompleteDonation(job: Job<{ 
    donationId: string; 
    streamerId: string;
    donorName: string;
    amount: string;
    message?: string;
  }>) {
    const { donationId, streamerId, donorName, amount, message } = job.data;

    // Update donation status to completed
    const updatedDonation = await this.db.update(donation)
      .set({
        status: "completed",
        paidAt: new Date(),
      })
      .where(eq(donation.id, donationId))
      .returning();

    if (updatedDonation.length > 0) {
      // Update streamer stats
      const streamerData = await this.db.query.streamer.findFirst({
        where: eq(streamer.id, streamerId),
      });

      if (streamerData) {
        const currentDonations = Number(streamerData.totalDonations || 0);
        const currentDonors = streamerData.totalDonors || 0;

        await this.db.update(streamer)
          .set({
            totalDonations: (currentDonations + Number(amount)).toString(),
            totalDonors: currentDonors + 1,
            updatedAt: new Date(),
          })
          .where(eq(streamer.id, streamerId));
      }

      // Emit WebSocket event for OBS
      this.donationGateway.emitNewDonation(streamerId, updatedDonation[0]);

      console.log(`[Donation] Completed and emitted: ${donationId}`);
    }

    return updatedDonation[0];
  }
}
