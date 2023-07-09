import { NextResponse } from "next/server";
import getAllCompanies from "@/lib/getAllCompanies";

export async function GET(request: Request) {
    const companies = await getAllCompanies()
    console.log('herer')
    return NextResponse.json(companies)
}