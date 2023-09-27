import { NextResponse } from "next/server";
import {z} from 'zod'
import getACompany from "@/lib/getACompany";
import { getAuthSession } from "@/lib/auth";

export async function GET(req: Request) {
    const url = new URL(req.url);
    try{
        const {company_id} = z.object({
            company_id: z.string(),

        }).parse({
            company_id: url.searchParams.get('company_id'),
        })
        const results = await getACompany(parseInt(company_id))
          return NextResponse.json(results)
        
    } catch (error) {
        if(error instanceof z.ZodError){
            return new Response('Invalid request data passed', {status: 422})
        }

        return new Response('Could not find any company', {status: 500})
    }
}