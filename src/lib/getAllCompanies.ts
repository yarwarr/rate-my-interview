import { connect } from "@planetscale/database";
// import { config } from '@/db/config'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { companies } from "@/db/schema";
import { eq, like, desc } from "drizzle-orm";
import { config } from "@/db/config";
import { db } from "@/db";

export default async function getAllCompanies() {
  console.log(config)
  const conn = connect(config);
  const db = drizzle(conn);

  const results = await db.select({
    id: companies.id,
    name: companies.name,
    logo: companies.logo,
    rating: companies.rating,
    reviewsLink: companies.reviewsLink,
    reviewsCount: companies.reviewsCount,
    reviewsText: companies.reviewsText,
    salariesLink: companies.salariesLink,
    salariesCount: companies.salariesCount,
    jobsLink: companies.jobsLink,
    jobsCount: companies.jobsCount,
    location: companies.location,
    // locationLink: companies.locationLink,
    // companySize: companies.companySize,
    // companyType: companies.companyType,
    // description: companies.description,
  })
  .from(companies);
  console.log('h')
  console.log(results)
  return results;
}

// export default async function filterCompaniesAction(query: string) {
//     // const conn = connect(config);
//     // const db = drizzle(conn);
//     // if (typeof query !== "string") {
//     //   throw new Error("Invalid input.")
//     // }
  
//     if (query.length === 0) return null
//     console.log('About to')
//     const filteredCompanies = await db
//       .select({
//         id: companies.id,
//         name: companies.name,
//         logo: companies.logo,
//         companyType: companies.companyType
//       })
//       .from(companies)
//       .where(like(companies.name, `%${query}%`))
//       .orderBy(desc(companies.id))
//       .limit(10)
//       console.log('DOne')
//       console.log(filteredCompanies)
//     const productsByCategory = Object.values(companies).map(
//       (company) => ({
//         companies: company
//       })
//     )
  
//     return productsByCategory
//   }


