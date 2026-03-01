import { Module, Global } from "@nestjs/common";
import { DonationGateway } from "./donation.gateway";

@Global()
@Module({
  providers: [DonationGateway],
  exports: [DonationGateway],
})
export class WebsocketModule {}
