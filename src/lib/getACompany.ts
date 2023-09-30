import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { companies, faqs, stats } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function getACompany(company_id: number): Promise<Company | null> {
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
        locationLink: companies.locationLink,
        companySize: companies.companySize,
        companyType: companies.companyType,
        description: companies.description,
        stat: {
            id: stats.id,
            positive_experience: stats.positive_experience,
            neutral_experience: stats.neutral_experience,
            negative_experience: stats.negative_experience,
            applied_online: stats.applied_online,
            employee_referral: stats.employee_referral,
            difficulty: stats.difficulty,
            recruiter: stats.recruiter,
        },
        faqs: {
            id: faqs.id,
            question: faqs.question,
            answer: faqs.answer,
        },
    })
    .from(companies)
    .innerJoin(stats, eq(companies.id, stats.company_id))
    .innerJoin(faqs, eq(companies.id, faqs.company_id))
    .where(eq(companies.id, company_id));

    if (results.length === 0) {
        return null; // No company found with the given company_id
    }

    // Handle null values and ensure that fields match the expected types
    const company: Company = {
        id: results[0].id,
        name: results[0].name,
        logo: results[0].logo || "", // Handle null for logo
        rating: results[0].rating || "", // Handle null for rating
        reviewsLink: results[0].reviewsLink || "", // Handle null for reviewsLink
        reviewsCount: results[0].reviewsCount || "", // Handle null for reviewsCount
        reviewsText: results[0].reviewsText || "", // Handle null for reviewsText
        salariesLink: results[0].salariesLink || "", // Handle null for salariesLink
        salariesCount: results[0].salariesCount || "", // Handle null for salariesCount
        jobsLink: results[0].jobsLink || "", // Handle null for jobsLink
        jobsCount: results[0].jobsCount || "", // Handle null for jobsCount
        location: results[0].location || "", // Handle null for location
        locationLink: results[0].locationLink || "", // Handle null for locationLink
        companySize: results[0].companySize || "", // Handle null for companySize
        companyType: results[0].companyType || "", // Handle null for companyType
        description: results[0].description || "", // Handle null for description
        faqs: results.map((row) => ({
            id: row.faqs.id,
            question: row.faqs.question,
            answer: row.faqs.answer,
        })),
        stat: {
            id: results[0].stat.id,
            positive_experience: results[0].stat.positive_experience || "", // Handle null for positive_experience
            neutral_experience: results[0].stat.neutral_experience || "", // Handle null for neutral_experience
            negative_experience: results[0].stat.negative_experience || "", // Handle null for negative_experience
            applied_online: results[0].stat.applied_online || "", // Handle null for applied_online
            employee_referral: results[0].stat.employee_referral || "", // Handle null for employee_referral
            difficulty: results[0].stat.difficulty || "", // Handle null for difficulty
            recruiter: results[0].stat.recruiter || "", // Handle null for recruiter
        },
    };

    return company;
}