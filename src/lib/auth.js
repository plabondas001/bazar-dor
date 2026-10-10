import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

let authInstance;

// Create the auth instance lazily so the build doesn't need a database connection string.
export function getAuth() {
  if (authInstance) return authInstance;

  if (!process.env.BETTER_AUTH_DB) {
    throw new Error("BETTER_AUTH_DB environment variable is not set");
  }

  const client = new MongoClient(process.env.BETTER_AUTH_DB);
  const db = client.db("bazar-dor");

  authInstance = betterAuth({
    // email
    emailAndPassword: {
      enabled: true,
    },

    // google
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },

      // github
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    },

    database: mongodbAdapter(db, {
      client,
    }),
  });

  return authInstance;
}
