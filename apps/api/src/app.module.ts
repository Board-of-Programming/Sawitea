import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BullModule } from "@nestjs/bull";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "@sawitea/database";
import { DatabaseModule } from "./database";
import { WebsocketModule } from "./websocket/websocket.module";
import { DonationModule } from "./donation/donation.module";
import { StreamerModule } from "./streamer/streamer.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Bull Queue with Redis
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
      },
    }),
    DatabaseModule, // Drizzle ORM
    WebsocketModule, // WebSocket for OBS
    AuthModule.forRoot({ auth }), // Better Auth
    DonationModule, // Donation feature
    StreamerModule, // Streamer profile feature
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
