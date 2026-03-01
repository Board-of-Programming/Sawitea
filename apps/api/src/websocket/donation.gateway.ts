import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import type { Donation } from "@sawitea/database/schema";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
  namespace: "/donations",
})
export class DonationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger("DonationGateway");
  private streamerRooms: Map<string, string[]> = new Map();

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("join-streamer")
  handleJoinStreamer(client: Socket, streamerId: string) {
    client.join(`streamer:${streamerId}`);
    this.logger.log(`Client ${client.id} joined room: streamer:${streamerId}`);
    
    // Notify client they've joined
    client.emit("joined", { streamerId });
  }

  @SubscribeMessage("leave-streamer")
  handleLeaveStreamer(client: Socket, streamerId: string) {
    client.leave(`streamer:${streamerId}`);
    this.logger.log(`Client ${client.id} left room: streamer:${streamerId}`);
  }

  @SubscribeMessage("donation-displayed")
  async handleDonationDisplayed(
    client: Socket,
    payload: { donationId: string; streamerId: string }
  ) {
    // Broadcast to all clients that donation has been displayed
    this.server.to(`streamer:${payload.streamerId}`).emit("donation-displayed", {
      donationId: payload.donationId,
    });
  }

  // Method to emit new donation (called from service)
  emitNewDonation(streamerId: string, donation: Donation) {
    this.server.to(`streamer:${streamerId}`).emit("new-donation", {
      id: donation.id,
      donorName: donation.donorName,
      amount: donation.amount,
      message: donation.donorMessage,
      createdAt: donation.createdAt,
    });
  }

  // Method to emit OBS overlay update
  emitOverlayUpdate(streamerId: string, data: any) {
    this.server.to(`streamer:${streamerId}:overlay`).emit("overlay-update", data);
  }
}
