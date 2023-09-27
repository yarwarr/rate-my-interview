import { db } from "@/db";
import { chats, resume } from "@/db/schema";
import { getAuthSession } from "@/lib/auth";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const session = await getAuthSession()
    if(!session) {
        return NextResponse.json({error: 'Not authorized'}, {status: 401})
    }
    // TODO: Implement React Redux
    try {
        const body = await req.json();
        const { companyId } = body;
        const resume1 = await db.select().from(resume).where( eq(resume.user_id, session?.user.id) );
        // And do the following which is already done
        // here I also have to load all of the company data to Pinecone

        const existingChat = await db.select().from(chats).where( eq(chats.company_id, companyId) )
        if(existingChat.length > 0) {
            return NextResponse.json({chat_id: existingChat[0].id, message: "Success", status: 200})
        }
        const chat = await db.insert(chats).values({
            file_key: resume1[0].file_key,
            pdfName: resume1[0].pdfName,
            pdfUrl: getS3Url(resume1[0].file_key),
            user_id: session?.user.id,
            company_id: companyId
        })
        console.log(chat.insertId)
        return NextResponse.json({chat_id: chat.insertId, message: "Success", status: 200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Interanal Server Error'}, {status: 500})
    }
}