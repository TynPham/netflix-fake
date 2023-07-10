import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prismadb from "@/lib/prismadb";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password is required");
        }
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
