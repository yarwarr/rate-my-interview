import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { companies, faqs, stats } from "@/db/schema";
import { and, desc, eq, not } from "drizzle-orm";

import { cn } from "@/lib/utils";

import { Shell } from "@/components/shells/shell";
import { Star } from "lucide-react";
import InterviewFeed from "@/components/InterviewFeed";
import { ExtendedInterview } from "../../../../db";
export const metadata: Metadata = {
  title: "Company",
  description: "Product description",
};

interface CompanyPageProps {
  params: {
    companyId: string;
  };
}
export default async function CompanyPage({ params }: CompanyPageProps) {
  const productCategories = [
    { title: "Interviews", path: "/interviews" },
    { title: "Ratings", path: "/ratings" },
    { title: "Jobs", path: "/jobs" },
  ];
  const activeCategory = "jobs";
  const companyId = Number(params.companyId);
  const initialInterviews: ExtendedInterview[] = [];
  const company = await db.query.companies.findFirst({
    where: eq(companies.id, companyId),
    with: {
      stats: true,
      faqs: true,
    },
  });
  const faq = company?.faqs;
  const stat = company?.stats[0];

  if (!company) {
    notFound();
  }

  return (
    <Shell>
      <div className="flex items-center space-x-1 text-sm capitalize text-muted-foreground">
        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
          <img
            className="w-40 h-40"
            src={company.logo}
            referrerPolicy="no-referrer"
          />
          <h1 className="mt-2 inline-block text-4xl font-bold leading-tight lg:text-5xl">
            {company.name}
          </h1>
          <div className="mt-4 flex space-x-4">{company.description}</div>
        </div>
      </div>
      <div className="lg:text-5xl flex">
        <Star colorProfile="orange" />
        {company.rating}
      </div>
      {/* Display all of the pages for a company */}
      {/* Navigation bar */}
      {/* <div className="sticky top-14 z-30 w-full shrink-0 overflow-hidden bg-background/80 pb-4 pt-6 shadow-md sm:backdrop-blur-md">
        <div className="grid place-items-center overflow-x-auto">
          <div className="inline-flex w-fit items-center rounded border bg-background p-1 text-muted-foreground shadow-2xl">
            {productCategories.map((category) => (
              <Link
                aria-label={category.title}
                key={category.title}
                href={`/company/${companyId}${category.path}`}
              >
                <div
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded border-b-2 border-transparent px-3 py-1.5 text-sm font-medium ring-offset-background transition-all hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    category.path === "jobs" &&
                      "rounded-none border-primary text-foreground hover:rounded-t"
                  )}
                >
                  {category.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div> */}
      <InterviewFeed
        companyId={companyId}
        initialInterviews={initialInterviews}
      />
      {/* Display FAQ questions and answers */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <ul className="mt-4 space-y-4">
          {faq?.map((item) => (
            <li key={item.id}>
              <h3 className="text-xl font-semibold">{item.question}</h3>
              <p className="mt-2">{item.answer}</p>
            </li>
          ))}
        </ul>
        {/* Display company statistics */}
        {stat && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Company Statistics</h2>
            <ul className="mt-4 space-y-2">
              <li>Positive Experience: {stat.positive_experience}</li>
              <li>Negative Experience: {stat.negative_experience}</li>
              <li>Neutral Experience: {stat.neutral_experience}</li>
              <li>Applied Online: {stat.applied_online}</li>
              <li>Recruiter: {stat.recruiter}</li>
              <li>Employee Referral: {stat.employee_referral}</li>
              <li>Difficulty: {stat.difficulty}</li>
            </ul>
          </div>
        )}
      </div>
    </Shell>
  );
}
