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
// import { ExtendedInterview } from "../../../../db";
import axios from "axios";
import FileUpload from "@/components/file-upload";
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
  const companyId = Number(params.companyId);
  const initialInterviews: any[] = [];
  console.log(companyId)
  const query = `http://localhost:3000/api/company?company_id=${companyId}`;
    const { data } = await axios.get(query);
    const company: Company = data

  if (!company) {
    notFound();
  }

  return (
    <Shell>
      <div className="flex items-center space-x-1 text-sm capitalize text-muted-foreground py-20">
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
      <FileUpload companyId = {companyId} />
      <InterviewFeed
        companyId={companyId}
        initialInterviews={initialInterviews}
      />
      {/* Display FAQ questions and answers */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <ul className="mt-4 space-y-4">
          {company.faqs.map((item) => (
            <li key={item.id}>
              <h3 className="text-xl font-semibold">{item?.question}</h3>
              <p className="mt-2">{item?.answer}</p>
            </li>
          ))}
        </ul>
        {/* Display company statistics */}
        {company.stat && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Company Statistics</h2>
            <ul className="mt-4 space-y-2">
              <li>Positive Experience: {company.stat.positive_experience}</li>
              <li>Negative Experience: {company.stat.negative_experience}</li>
              <li>Neutral Experience: {company.stat.neutral_experience}</li>
              <li>Applied Online: {company.stat.applied_online}</li>
              <li>Recruiter: {company.stat.recruiter}</li>
              <li>Employee Referral: {company.stat.employee_referral}</li>
              <li>Difficulty: {company.stat.difficulty}</li>
            </ul>
          </div>
        )}
      </div>
    </Shell>
  );
}