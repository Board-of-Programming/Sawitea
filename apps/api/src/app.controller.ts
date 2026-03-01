import { Controller, Get, Inject } from "@nestjs/common";
import { AllowAnonymous, OptionalAuth, Session } from "@thallesp/nestjs-better-auth";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { eq } from "drizzle-orm";
import { DRIZZLE } from "./database";
import type { DrizzleDB } from "./database";
import { user } from "@sawitea/database/schema";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
  ) {}

  @Get()
  @AllowAnonymous()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("profile")
  async getProfile(@Session() session: UserSession) {
    // Get user from database using Drizzle
    const userData = await this.db.query.user.findFirst({
      where: eq(user.id, session.user.id),
    });

    return {
      user: session.user,
      dbUser: userData,
    };
  }

  @Get("users")
  @AllowAnonymous()
  async getUsers() {
    // Example: Get all users from database using Drizzle
    const users = await this.db.query.user.findMany({
      columns: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });

    return { users };
  }

  @Get("public")
  @AllowAnonymous()
  getPublic() {
    return { message: "This is a public route" };
  }

  @Get("optional")
  @OptionalAuth()
  getOptional(@Session() session: UserSession) {
    return { authenticated: !!session, user: session?.user };
  }
}
