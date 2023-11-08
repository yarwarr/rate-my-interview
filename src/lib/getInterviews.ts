// import { connect } from "@planetscale/database";
// import { drizzle } from 'drizzle-orm/planetscale-serverless'
// import { interviews } from "@/db/schema";
// import { eq, like, desc } from "drizzle-orm";
// import { config } from "@/db/config";
// import * as schema from "@/db/schema";

// export default async function getInterviews(company_id: number) {
//   const db = drizzle(connect(config), { schema });

//   const results = await db.query.companies.findFirst({
//     where: eq(interviews.company_id, company_id),
//     with: {
//         interviewees: true,
//         positions: true,
//         interviewToQuestions: {
//         with: {
//             questions: true,
//         }
//         }
//     }
   
//   })
//   return results;
// }



