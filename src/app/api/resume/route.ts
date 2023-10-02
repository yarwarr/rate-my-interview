import { db } from "@/db";
import { resume } from "@/db/schema";
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
    try {
        const body = await req.json();
        const { file_key, file_name } = body;
        await loadS3IntoPinecone(file_key);
        // Checking if the user already has a resume
        const existingResume = await db.select().from(resume).where( eq(resume.user_id, session?.user.id) );
        if (existingResume.length === 0) {
            const resume1 = await db.insert(resume).values({
                file_key: file_key,
                pdfName: file_name,
                pdfUrl: getS3Url(file_key),
                user_id: session?.user.id,
            })
            console.log(resume1.insertId)
            return NextResponse.json({resume_id: resume1.insertId, message: "Success", status: 200})
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Interanal Server Error'}, {status: 500})
    }
}
// Make a PUT request to /api/resume/route.ts

export async function PUT(req: Request, res: Response) {
    const session = await getAuthSession()
    if (!session) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
    }

    try {
        const { user_id } = session.user; // Use the authenticated user's ID
        const body = await req.json();
        const { file_key, file_name } = body;

        const existingResume = await db.select().from(resume).where( eq(resume.user_id, user_id) );
        console.log(existingResume)
        if (existingResume.length === 0) {

            return NextResponse.json({  message: "Resume cant be edited since there is none", status: 400 });
        } else {
            // If the user already has a resume, update the existing one
            const updated = await db.update(resume).set({
                file_key: file_key,
                pdfName: file_name,
                pdfUrl: getS3Url(file_key),
            }).where(eq(resume.user_id, user_id));

            // Load S3 data into Pinecone (if needed)
            await loadS3IntoPinecone(file_key);

            return NextResponse.json({ resume_id: updated.insertId, message: "Success", status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request, res: Response) {
    const session = await getAuthSession()
    if (!session) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
    }

    try {
        const { user_id } = session.user; // Use the authenticated user's ID

        // Check if the user has a resume
        const existingResume = await db.select().from(resume).where( eq(resume.user_id, user_id) );

        if (!existingResume) {
            return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
        }

        // Delete the user's resume
        await db.delete(resume).where(eq(resume.user_id, user_id));
        // TODO: Also gotta find a way to delete from Pinecone DB

        return NextResponse.json({ message: "Resume deleted successfully", status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

