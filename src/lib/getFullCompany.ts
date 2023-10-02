import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { companies} from "@/db/schema";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";

interface FullCompany extends Company {
    faqs: Faq[];
    stat: Stat;
}

export default async function getACompany(company_id: number): Promise<any | null> {
    const conn = connect(config);
    const db = drizzle(connect(config), { schema });

    const results = await db.query.companies.findFirst({
        where: eq(companies.id, company_id),
        with: {
            stats:{
                columns: {
                    id: false,
                    company_id: false
                }
            },
            faqs: {
                columns: {
                    question: true,
                    answer: true,
                }
            },
            interviews: {
                with: {
                    interviewees: {
                        columns: {
                            name: true
                        }
                    },
                    positions: {
                        columns: {
                            name: true
                        }
                    },
                    interviewToQuestions: {
                    with: {
                        questions: {
                            columns: {
                                text: true
                            }
                        },
                    },
                    columns: {
                    }
                    }
                },
                columns: {
                    id: true,
                    experience: true,
                    offer_status: true,
                    difficulty: true,
                    interview_process: true
                }
            },
        },
       
      })
      
      return results;

   
}