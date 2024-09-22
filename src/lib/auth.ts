import { env } from "@/env";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const options: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        "use server";
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/sessions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        if (response.ok) {
          const { id, token, name, profilePicture } = await response.json();
          const user = {
            id,
            name,
            profilePicture,
            accessToken: token,
          };

          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
};
