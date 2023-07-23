import Image from "next/image"
import Link from "next/link"
import { db } from "@/db"
import { desc, eq, sql } from "drizzle-orm"
import Balance from "react-wrap-balancer"

import { productCategories } from "@/config/products"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/Icons"
import { Shell } from "@/components/shells/shell"
import { Combobox } from "@/components/combobox"
import getAllCompanies from "@/lib/getAllCompanies"
// import insertCompaniesFromJSON from "@/lib/createCompanies"
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { companies } from "@/db/schema";
import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import filterCompaniesAction from "./_actions/company"


// Running out of edge function execution units on vercel free plan
const companiesDataFile = '/output.json'; // Replace with the correct relative path to output.json in the public directory

async function insertCompaniesFromJSON() {
  try {
    // Fetch the data from the JSON file
    const response = await fetch('http://localhost:3000' + companiesDataFile, { cache: 'no-store' });
    const companiesData = await response.json();

    if (!Array.isArray(companiesData)) {
      throw new Error('Invalid JSON data format. Expected an array.');
    }

    const conn = connect(config);
    const db = drizzle(conn);

    // Loop through the array of companies and insert each company into the "companies" table
    for (const companyData of companiesData) {
      const insertResult = await db.insert(companies).values(companyData);
      console.log('Inserted company:', insertResult);
    }

    console.log('All companies inserted successfully.');
  } catch (error) {
    console.error('Error inserting companies:', error);
  }
}

export default async function IndexPage() {
  // const companies = await insertCompaniesFromJSON()
  // console.log(companies)
  // console.log(await getAllCompanies())
  return (
    <Shell as="div" className="gap-12">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-32"
      >
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          A Website
        </h1>
        <Balance className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
          Enter the company name
        </Balance>
        <div className="space-x-4">
          {/* <Link
            href="/products"
            className={cn(
              buttonVariants({
                size: "lg",
              })
            )}
          >
            Buy Now
          </Link>
          <Link
            href="/dashboard/stores"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              })
            )}
          >
            Sell Now
          </Link> */}
          <Combobox />
        </div>
      </section>
      
    </Shell>
  )
}
