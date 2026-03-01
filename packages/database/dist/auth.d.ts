import { Pool } from "pg";
export declare const auth: import("better-auth").Auth<{
    database: {
        db: Pool;
        type: string;
    };
    emailAndPassword: {
        enabled: true;
        autoSignIn: true;
    };
    socialProviders: {
        google: {
            clientId: string;
            clientSecret: string;
        };
        github: {
            clientId: string;
            clientSecret: string;
        };
    };
    session: {
        expiresIn: number;
    };
    advanced: {
        crossSubDomainCookies: {
            enabled: false;
        };
        generateId: boolean;
    };
}>;
export type Auth = typeof auth;
