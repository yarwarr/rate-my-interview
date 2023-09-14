
import path, { dirname } from 'path';
// import insertCompaniesFromJSON from "@/lib/createCompanies"
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { companies, faqs, stats, positions, interviewees, interviews, interview_to_questions, questions } from "@/db/schema";
import { connect } from "@planetscale/database";
import { config } from '@/db/config'
import fs from 'fs';

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

async function insertFAQsFromFiles() {
  try {
    console.log(__dirname)
    const dataFolder = path.join(__dirname, '..', '..', '..', 'public', 'data');
    const dataFiles = fs.readdirSync(dataFolder).filter(file => file.endsWith('.json'));

    const conn = connect(config);
    const db = drizzle(conn);
    console.log(db)
    for (const dataFile of dataFiles) {
      const companyId = parseInt(dataFile.replace('.json', '')); // Extract the company ID from the filename
      const file = `/data/${companyId}.json`;
      // Fetch the content of the JSON file using node-fetch
      const response = await fetch(`http://localhost:3000${file}`);
      const jsonData = await response.json();

      // Extract FAQ data from the JSON
      const faqsData = jsonData.faq.faq;

      if (!Array.isArray(faqsData)) {
        throw new Error(`Invalid JSON data format for FAQs in file ${file}. Expected an array.`);
      }

      // Insert each FAQ into the "faqs" table with the corresponding company ID
      for (const faqData of faqsData) {
        const faqRecord = {
          company_id: companyId,
          question: faqData.questionText,
          answer: faqData.answerText,
        };

        // const insertResult = await db.insert(faqs).values(faqRecord);
        // console.log(`Inserted FAQ for company ${companyId}:`, insertResult);
      }
    }

    console.log('All FAQs inserted successfully.');
  } catch (error) {
    console.error('Error inserting FAQs:', error);
  }
}

async function insertStatsFromFiles() {
  try {
    const dataFolder = path.join(__dirname, '..', '..', '..', 'public', 'data');
    const dataFiles = fs.readdirSync(dataFolder).filter(file => file.endsWith('.json'));

    const conn = connect(config);
    const db = drizzle(conn);

    for (const dataFile of dataFiles) {
      const companyId = parseInt(dataFile.replace('.json', '')); // Extract the company ID from the filename
      const file = `/data/${companyId}.json`;
      // Fetch the content of the JSON file using node-fetch
      const response = await fetch(`http://localhost:3000${file}`);
      const jsonData = await response.json();

      let hasStatsData = false;

      // Check if the JSON data contains the "stats" section
      if (jsonData.stats && jsonData.stats.stats) {
        hasStatsData = true;

        // Extract stats data from the JSON
        const statsData = jsonData.stats.stats;

        // Insert the stats data into the "stats" table with the corresponding company ID
        const statsRecord = {
          company_id: companyId,
          positive_experience: statsData.experience.positive,
          negative_experience: statsData.experience.negative,
          neutral_experience: statsData.experience.neutral,
          applied_online: statsData.gettingInterview["Applied online"],
          recruiter: statsData.gettingInterview.Recruiter,
          employee_referral: statsData.gettingInterview["Employee Referral"],
          difficulty: statsData.difficulty,
        };

        const insertResult = await db.insert(stats).values(statsRecord);
        console.log(`Inserted stats for company ${companyId}:`, insertResult);
      }

      if (!hasStatsData) {
        console.log(`No stats data found for company ${companyId}. Skipping insertion.`);
      }
    }

    console.log('All stats inserted successfully.');
  } catch (error) {
    console.error('Error inserting stats:', error);
  }
}

async function insertInterviewDataFromFiles() {
  try {
    const dataFolder = path.join(__dirname, '..', '..', '..', 'public', 'data');
    const dataFiles = fs.readdirSync(dataFolder).filter(file => file.endsWith('.json'));

    const conn = connect(config);
    const db = drizzle(conn);


    for (const dataFile of dataFiles) {
      const companyId = parseInt(dataFile.replace('.json', '')); // Extract the company ID from the filename
      console.log(companyId)
      const file = `/data/${companyId}.json`;
      // Fetch the content of the JSON file using node-fetch
      const response = await fetch(`http://localhost:3000${file}`);
      const jsonData = await response.json();

      // Extract interview data from the JSON
      const interviewsData = jsonData.interviews;

      // Insert interviewee data into the "interviewees" table and get their auto-generated IDs
      const intervieweeIds = [];
      for (const interviewData of interviewsData) {
        const intervieweeRecord = {
          name: interviewData.intervieweeSubtext,
        };
        const insertResult = await db.insert(interviewees).values(intervieweeRecord);
        intervieweeIds.push(insertResult.insertId);
        console.log(`Inserted interviewee:`, insertResult);
      }

      // Insert position data into the "positions" table and get their auto-generated IDs
      const positionIds = [];
      for (const interviewData of interviewsData) {
        const positionRecord = {
          company_id: companyId,
          name: interviewData.position,
        };
        const insertResult = await db.insert(positions).values(positionRecord);
        positionIds.push(insertResult.insertId);
        console.log(`Inserted position for company ${companyId}:`, insertResult);
      }

      // Insert interview data into the "interviews" table
      const interviewIds = []
      for (let i = 0; i < interviewsData.length; i++) {
        
        const interviewData = interviewsData[i];
        const interviewRecord = {
          company_id: companyId,
          interviewee_id: parseInt(intervieweeIds[i]),
          position_id: parseInt(positionIds[i]),
          offer_status: interviewData.offerLink.text,
          experience: interviewData.experienceLink.text,
          difficulty: interviewData.averageInterviewLink.text,
          interview_process: interviewData.interviewProcess,
        };
        const insertResult = await db.insert(interviews).values(interviewRecord);
        interviewIds.push(insertResult.insertId);
        console.log(`Inserted interview for company ${companyId}:`, insertResult);
      }

      // Insert question data into the "questions" table and get their auto-generated IDs
      const questionIds = [];
      for (const interviewData of interviewsData) {
        for (const questionData of interviewData.interviewQuestions) {
          const questionRecord = {
            text: questionData.questionText,
          };
          const insertResult = await db.insert(questions).values(questionRecord);
          questionIds.push(insertResult.insertId);
          console.log(`Inserted question:`, insertResult);
        }
      }

      // Insert data into the "interview_questions" table
      console.log(interviewIds)
      let questionIndex = 0;
      let interviewIndex = 0;
      for (const interviewData of interviewsData) {
        const interviewId = interviewIds[interviewIndex]; // Use the interview ID from the interviewIds list
        console.log(interviewId)
        for (const questionData of interviewData.interviewQuestions) {
          const interviewQuestionRecord = {
            interview_id: parseInt(interviewId),
            question_id: parseInt(questionIds[questionIndex]),
          };
          const insertResult = await db.insert(interview_to_questions).values(interviewQuestionRecord);
          console.log(`Linked question to interview:`, insertResult);
          questionIndex++;
        }
        interviewIndex++;
      }
    }

    console.log('All interview data inserted successfully.');
  } catch (error) {
    console.error('Error inserting interview data:', error);
  }
}