import { db } from "@/db";
import { chats } from "@/db/schema";
import { getAuthSession } from "@/lib/auth";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const session = await getAuthSession()
    console.log(session?.user.id)
    if(!session) {
        return NextResponse.json({error: 'Not authorized'}, {status: 401})
    }

    try {
        const body = await req.json();
        const { file_key, file_name, companyId } = body;
        await loadS3IntoPinecone(file_key);
        const chat = await db.insert(chats).values({
            file_key: file_key,
            pdfName: file_name,
            pdfUrl: getS3Url(file_key),
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