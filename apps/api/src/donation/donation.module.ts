import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { DonationService } from "./donation.service";
import { DonationController } from "./donation.controller";
import { DonationProcessor } from "./donation.processor";
import { PaymentModule } from "../payment/payment.module";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "donation",
    }),
    PaymentModule,
  ],
  controllers: [DonationController],
  providers: [DonationService, DonationProcessor],
  exports: [DonationService],
})
export class DonationModule {}
