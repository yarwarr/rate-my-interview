import { NextResponse } from "next/server";
import { companies } from "@/db/schema";
import { eq, like} from "drizzle-orm";
import { db } from "@/db"
import {z} from 'zod'

export async function GET(req: Request) {
    const url = new URL(req.url);
    try{
        const {company_id} = z.object({
            company_id: z.string(),

        }).parse({
            company_id: url.searchParams.get('company_id'),
        })
        const results = await db.query.companies.findFirst({
            where: eq(companies.id, parseInt(company_id))
          })

          return NextResponse.json(results)
        
    } catch (error) {
        if(error instanceof z.ZodError){
            return new Response('Invalid request data passed', {status: 422})
        }

        return new Response('Could not find any company', {status: 500})
    }
}