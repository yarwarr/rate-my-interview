import { authOptions } from "@/lib/auth/index";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}