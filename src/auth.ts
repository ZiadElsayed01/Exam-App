import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./features/auth/apis/auth.api";
import { loginSchema } from "./features/auth/schemas/login.schema";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const result = loginSchema.safeParse({
          username: credentials?.username,
          password: credentials?.password,
        });

        if (!result.success) {
          throw new Error("Invalid username or password");
        }

        const data = await login(result.data);

        if (!data.status) {
          throw new Error(data.message);
        }

        return {
          id: data.payload.user.id,
          user: data.payload.user,
          token: data.payload.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};
