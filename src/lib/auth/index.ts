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
      console.log('session', session)
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