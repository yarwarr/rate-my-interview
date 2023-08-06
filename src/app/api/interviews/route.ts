import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { connect } from "@planetscale/database";
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { interviews } from "@/db/schema";
import { eq, like, desc } from "drizzle-orm";
import { config } from "@/db/config";
import { db } from "@/db"
import {z} from 'zod'

export async function GET(req: Request) {
    const url = new URL(req.url);
    try{
        const {company_id, limit, page} = z.object({
            company_id: z.string(),
            limit: z.string(),
            page: z.string(),

        }).parse({
            company_id: url.searchParams.get('company_id'),
            limit: url.searchParams.get('limit'),
            page: url.searchParams.get('page'),
        })
        const results = await db.query.interviews.findMany({
            where: eq(interviews.company_id, parseInt(company_id)),
            with: {
                interviewees: true,
                positions: true,
                interviewToQuestions: {
                with: {
                    questions: true,
                }
                }
            },
            limit: parseInt(limit),
            offset: (parseInt(page)-1) * parseInt(limit),
            orderBy: (interviews, { asc }) => [asc(interviews.id)],
           
          })

          return NextResponse.json(results)
        
    } catch (error) {
        if(error instanceof z.ZodError){
            return new Response('Invalid request data passed', {status: 422})
        }

        return new Response('Could not fetch interviews', {status: 500})
    }
    
    
}