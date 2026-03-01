import { Module } from "@nestjs/common";
import { MayarService } from "./mayar.service";

@Module({
  providers: [MayarService],
  exports: [MayarService],
})
export class PaymentModule {}
