import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { companies } from "@/db/schema";
import { eq } from "drizzle-orm";


export default async function getAllCompanies(): Promise<Company[]> {
  const conn = connect(config)
  const db = drizzle(conn)

  const results: Company[] = await db.select({
    id: companies.id,
    name: companies.name
  })
  .from(companies)

  return results

}
