import { db } from "@/db"
import { messages } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export const runtime = 'edge'
export const POST = async (req: Request) => {
    const {chatId} = await req.json()
    const _messages = await db.select().from(messages).where(eq(messages.chat_id, chatId))

    return NextResponse.json(_messages)

}