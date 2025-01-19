import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export interface UserValue {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: (process.env.NEXT_PUBLIC_CLIENT_ID as string) ?? "",
      clientSecret: (process.env.NEXT_PUBLIC_CLIENT_SECRET as string) ?? "",
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = token.user as UserValue
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});
export { handler as GET, handler as POST };
