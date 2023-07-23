import { connect } from "@planetscale/database";
import path from 'path';
import { config } from '@/db/config'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { companies } from "@/db/schema";
import fs from 'fs';
import getConfig from 'next/config';

export default async function insertCompaniesFromJSON() {
  const { publicRuntimeConfig } = getConfig();
  try {
    console.log('About to insert')
    // Get the absolute file path to the JSON file
    const response = await fetch(publicRuntimeConfig.companiesDataFile);
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


  