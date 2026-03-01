import { Module } from "@nestjs/common";
import { StreamerService } from "./streamer.service";
import { StreamerController } from "./streamer.controller";

@Module({
  controllers: [StreamerController],
  providers: [StreamerService],
  exports: [StreamerService],
})
export class StreamerModule {}
