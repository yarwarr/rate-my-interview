"use server"
import { and, eq, inArray, like, desc, asc, sql } from "drizzle-orm";
import { companies } from "@/db/schema";
import {  z } from "zod";
import { db } from "@/db";
import { companySchema } from "@/lib/validators/company";

export default async function filterCompaniesAction(query: string) {
    if (query.length === 0) return null
    const filteredCompanies = await db
      .select({
        id: companies.id,
        name: companies.name,
        logo: companies.logo,
        companyType: companies.companyType
      })
      .from(companies)
      .where(like(companies.name, `${query}%`))
      .orderBy(desc(companies.id))
      .limit(10)
    return [{companies: filteredCompanies}]
}

export async function getCompaniesAction(
  input: z.infer<typeof companySchema>
) {
  const { items, total } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(companies) 
      .limit(input.limit)
      .offset(input.offset)

    const total = await tx
      .select({
        count: sql<number>`count(${companies.id})`
      })
      .from(companies)

    return {
      items,
      total: Number(total[0]?.count) ?? 0,
    };
  });

  return {
    items,
    total,
  };
}
