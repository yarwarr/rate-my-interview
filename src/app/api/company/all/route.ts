import { NextResponse } from "next/server";
import {z} from 'zod'
import getFullCompany from "@/lib/getFullCompany";
import { generatePdf } from "@/lib/generatePDF";
import { pdfTemplate } from "@/lib/pdfTemplate";
import { utapi } from "uploadthing/server";
import { db } from "@/db";
import { companies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { File } from "buffer";
import { loadCompanyIntoPinecone } from "@/lib/pinecone";

export async function POST(req: Request) {
    const url = new URL(req.url);
    try{
        const {company_id} = z.object({
            company_id: z.string(),

        }).parse({
            company_id: url.searchParams.get('company_id'),
        })
        const company = await db.select().from(companies).where(eq(companies.id, parseInt(company_id)))
        // If the company already has a pdfUrl, return the url
        if(company[0].pdfUrl) {
            return NextResponse.json(company[0].pdfUrl, {status: 200})
        }
        // Get the company data
        const results = await getFullCompany(parseInt(company_id))
        // Generate the pdf template as string
        const pdf_string = await pdfTemplate(results)
        // Generate the pdf file from the string using puppeteer
        const myPdf = await generatePdf(pdf_string!)
        // Create a Blob from the ArrayBuffer
        const blob = new Blob([myPdf!], { type: "application/pdf" });
        // Create a File from the Blob (you can specify the desired filename here)
        // @ts-ignore
        const file = new File([blob], results.name + "_" + results.id + ".pdf", {
            type: "application/pdf",
        });
        // Upload the File
        const response = await utapi.uploadFiles(file);

        // Update the company table with the pdfUrl
        const company1 = await db.update(companies)
        .set({ pdfUrl: response.data?.url || "" })
        .where(eq(companies.id, parseInt(company_id)));

        const results2 = await getFullCompany(parseInt(company_id))

        // TODO: Gotta find a way to get embedding for free so I dont reach the OpenAI limit
        // Now I have to load the pdf to pinecone so it can be queried later on
        await loadCompanyIntoPinecone(results2)
        return NextResponse.json(results2, {status: 200})
        
    } catch (error) {
        console.log(error)
        if(error instanceof z.ZodError){
            return new Response('Invalid request data passed', {status: 422})
        }

        return new Response('Could not find any company', {status: 500})
    }
}