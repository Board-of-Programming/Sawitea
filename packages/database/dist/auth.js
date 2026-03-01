"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const pg_1 = require("pg");
// Create PostgreSQL connection pool for Better Auth
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
// Better Auth configuration with PostgreSQL
exports.auth = (0, better_auth_1.betterAuth)({
    // PostgreSQL Database configuration
    database: {
        db: pool,
        type: "postgres",
    },
    // Email/Password authentication
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    // Social providers (optional)
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        },
    },
    // Session configuration
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
    },
    // Advanced options
    advanced: {
        crossSubDomainCookies: {
            enabled: false,
        },
        generateId: false, // Use database default id generation
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUF5QztBQUN6QywyQkFBMEI7QUFFMUIsb0RBQW9EO0FBQ3BELE1BQU0sSUFBSSxHQUFHLElBQUksU0FBSSxDQUFDO0lBQ3BCLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWTtDQUMzQyxDQUFDLENBQUM7QUFFSCw0Q0FBNEM7QUFDL0IsUUFBQSxJQUFJLEdBQUcsSUFBQSx3QkFBVSxFQUFDO0lBQzdCLG9DQUFvQztJQUNwQyxRQUFRLEVBQUU7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLElBQUksRUFBRSxVQUFVO0tBQ2pCO0lBRUQsZ0NBQWdDO0lBQ2hDLGdCQUFnQixFQUFFO1FBQ2hCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsVUFBVSxFQUFFLElBQUk7S0FDakI7SUFFRCw4QkFBOEI7SUFDOUIsZUFBZSxFQUFFO1FBQ2YsTUFBTSxFQUFFO1lBQ04sUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksRUFBRTtZQUM1QyxZQUFZLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsSUFBSSxFQUFFO1NBQ3JEO1FBQ0QsTUFBTSxFQUFFO1lBQ04sUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksRUFBRTtZQUM1QyxZQUFZLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsSUFBSSxFQUFFO1NBQ3JEO0tBQ0Y7SUFFRCx3QkFBd0I7SUFDeEIsT0FBTyxFQUFFO1FBQ1AsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxTQUFTO0tBQ3ZDO0lBRUQsbUJBQW1CO0lBQ25CLFFBQVEsRUFBRTtRQUNSLHFCQUFxQixFQUFFO1lBQ3JCLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRCxVQUFVLEVBQUUsS0FBSyxFQUFFLHFDQUFxQztLQUN6RDtDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJldHRlckF1dGggfSBmcm9tIFwiYmV0dGVyLWF1dGhcIjtcclxuaW1wb3J0IHsgUG9vbCB9IGZyb20gXCJwZ1wiO1xyXG5cclxuLy8gQ3JlYXRlIFBvc3RncmVTUUwgY29ubmVjdGlvbiBwb29sIGZvciBCZXR0ZXIgQXV0aFxyXG5jb25zdCBwb29sID0gbmV3IFBvb2woe1xyXG4gIGNvbm5lY3Rpb25TdHJpbmc6IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCxcclxufSk7XHJcblxyXG4vLyBCZXR0ZXIgQXV0aCBjb25maWd1cmF0aW9uIHdpdGggUG9zdGdyZVNRTFxyXG5leHBvcnQgY29uc3QgYXV0aCA9IGJldHRlckF1dGgoe1xyXG4gIC8vIFBvc3RncmVTUUwgRGF0YWJhc2UgY29uZmlndXJhdGlvblxyXG4gIGRhdGFiYXNlOiB7XHJcbiAgICBkYjogcG9vbCxcclxuICAgIHR5cGU6IFwicG9zdGdyZXNcIixcclxuICB9LFxyXG5cclxuICAvLyBFbWFpbC9QYXNzd29yZCBhdXRoZW50aWNhdGlvblxyXG4gIGVtYWlsQW5kUGFzc3dvcmQ6IHtcclxuICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICBhdXRvU2lnbkluOiB0cnVlLFxyXG4gIH0sXHJcblxyXG4gIC8vIFNvY2lhbCBwcm92aWRlcnMgKG9wdGlvbmFsKVxyXG4gIHNvY2lhbFByb3ZpZGVyczoge1xyXG4gICAgZ29vZ2xlOiB7XHJcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lEIHx8IFwiXCIsXHJcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQgfHwgXCJcIixcclxuICAgIH0sXHJcbiAgICBnaXRodWI6IHtcclxuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdJVEhVQl9DTElFTlRfSUQgfHwgXCJcIixcclxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HSVRIVUJfQ0xJRU5UX1NFQ1JFVCB8fCBcIlwiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICAvLyBTZXNzaW9uIGNvbmZpZ3VyYXRpb25cclxuICBzZXNzaW9uOiB7XHJcbiAgICBleHBpcmVzSW46IDYwICogNjAgKiAyNCAqIDcsIC8vIDcgZGF5c1xyXG4gIH0sXHJcblxyXG4gIC8vIEFkdmFuY2VkIG9wdGlvbnNcclxuICBhZHZhbmNlZDoge1xyXG4gICAgY3Jvc3NTdWJEb21haW5Db29raWVzOiB7XHJcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIGdlbmVyYXRlSWQ6IGZhbHNlLCAvLyBVc2UgZGF0YWJhc2UgZGVmYXVsdCBpZCBnZW5lcmF0aW9uXHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgdHlwZSBBdXRoID0gdHlwZW9mIGF1dGg7XHJcbiJdfQ==