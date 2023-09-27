// import { NextResponse } from "next/server";
// import { interviews } from "@/db/schema";
// import { eq, like} from "drizzle-orm";
// import { db } from "@/db"
// import {z} from 'zod'

// export async function GET(req: Request) {
//     const url = new URL(req.url);
//     try{
//         const {interview_id} = z.object({
//             interview_id: z.string(),

//         }).parse({
//             interview_id: url.searchParams.get('interview_id'),
//         })
//         const results = await db.query.interviews.findFirst({
//             where: eq(interviews.id, parseInt(interview_id))
//           })

//           return NextResponse.json(results)
        
//     } catch (error) {
//         if(error instanceof z.ZodError){
//             return new Response('Invalid request data passed', {status: 422})
//         }

//         return new Response('Could not find any interview', {status: 500})
//     }
// }