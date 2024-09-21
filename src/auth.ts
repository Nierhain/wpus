import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import BattleNetProvider from "next-auth/providers/battlenet";
import { env } from "./env";
import { db } from "./server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "./server/db/schema";
import { type UserRole } from "./server/models/UserRole";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
        role: UserRole;
    } & DefaultSession["user"];
    }
    
    interface User {
      // ...other properties
      role: UserRole;
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    BattleNetProvider({
      clientId: env.AUTH_BATTLENET_ID,
      clientSecret: env.AUTH_BATTLENET_SECRET,
      issuer: "https://eu.battle.net/oauth",
    }),
  ],
});
