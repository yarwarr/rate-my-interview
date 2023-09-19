// // lib/auth/index.ts

// import GithubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
// import { eq } from 'drizzle-orm';
// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { db } from '@/db';
// import { users } from '@/db/schema';
// import { getServerSession } from "next-auth";
// import type { NextAuthOptions } from 'next-auth';

// export const authOptions: NextAuthOptions = {
//   adapter: DrizzleAdapter(db),
//   session: {
//     strategy: 'jwt',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/sign-in',
//   },
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   callbacks: {
//     async session({ token, session }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//         session.user.email = token.email;
//         session.user.image = token.picture;
//       }

//       return session;
//     },
//     async jwt({ token, user }) {
//       const [dbUser] = await db
//         .select()
//         .from(users)
//         .where(eq(users.email, token.email || ''))
//         .limit(1);

//       if (!dbUser) {
//         if (user) {
//           token.id = user?.id;
//         }
//         return token;
//       }

//       return {
//         id: dbUser.id,
//         name: dbUser.name,
//         email: dbUser.email,
//         picture: dbUser.image,
//       };
//     },
//   },
// };

// export const getAuthSession = () => getServerSession(authOptions)


// lib/auth/config.ts
import { type GetServerSidePropsContext } from "next"
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { db } from '@/db'
import { PlanetScaleAdapter } from "@/lib/auth/planetScaleAdapter"
import { Adapter } from "next-auth/adapters"
// @ts-ignore
import { UserSession } from "@/lib/auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: UserSession
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
    signOut: '/'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  adapter: PlanetScaleAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
}

// export const getServerAuthSession = (ctx: {
//   req: GetServerSidePropsContext["req"]
//   res: GetServerSidePropsContext["res"]
// }) => {
//   return getServerSession(ctx.req, ctx.res, authOptions)
// }

export const getAuthSession = () => getServerSession(authOptions)