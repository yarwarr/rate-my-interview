export const pdfTemplate = async (companyData: any) => {
    try{
        const { name, logo, rating, location, companySize, companyType, description, stats, faqs, interviews } = companyData;
        let pdf =  `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
            <title>${name} Company Profile</title>
            <style>
                @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap");
                * {
                    font-family: "Poppins", "sans-serif" !important;
                }
                html {
                    -webkit-print-color-adjust: exact;
                }
                @media print {
                    body {
                        font-size: 16px;
                        color: lightgrey;
                    }
                    .no-break-inside {
                        break-inside: avoid;
                    }
                    .break-before {
                        break-before: always;
                    }
                }
            </style>
        </head>
        <body>
            <main class="w-[800px] mx-auto p-[20px]">
                <!-- Company Information -->
                <div class="w-full min-h-[70px] h-fit pt-1 mb-4 flex justify-between border-b">
                    <div class="w-[50%] flex items-start h-full flex-col justify-start p-4">
                        <h1 class="font-semibold leading-6 text-xl text-red-500">Company Information</h1>
                        <h3 class="font-semibold leading-6 text-sm text-gray-900">Name: <span class="font-normal">${name}</span></h3>
                        <h3 class="font-semibold leading-6 text-sm text-gray-900">Logo: <span class="font-normal">${logo}</span></h3>
                        <h3 class="font-semibold leading-6 text-sm text-gray-900">Rating: <span class="font-normal">${rating}</span></h3>
                        <h3 class="font-semibold leading-6 text-sm text-gray-900">Locations:- <span class="font-normal">${location}</span></h3>
                        <h3 class="font-semibold leading-6 text-sm text-gray-900">Company Size:- <span class="font-normal">${companySize}</span></h3>
                        <h3 class="font-semibold leading-6 text-sm text-gray-900">Company Type:- <span class="font-normal">${companyType}</span></h3>
                        <h3 class="font-semibold leading-6 text-sm text-gray-900">Description of Company:- <span class="font-normal">${description}</span></h3>
                        <!-- Add more company information here -->
                    </div>
                </div>

                <!-- Stats -->
                <div class="w-full min-h-[20px] my-2 pt-1 px-4">
                    <h2 class="font-bold leading-6 text-lg text-gray-900 text-start">Stats about the company ${name}</h2>
                    <!-- Add stats here -->
                    ${stats.map((stat: any) => `
                        <div class="w-full min-h-[20px] my-2 pt-1 no-break-inside">
                            <h3 class="font-semibold leading-6 text-lg text-gray-900 text-start">Positive Experience:- ${stat.positive_experience}</h3>
                            <p class="text-gray-700">Negative Experience:- ${stat.negative_experience}</p>
                            <p class="text-gray-700">Neutral Experience:- ${stat.neutral_experience}</p>
                            <p class="text-gray-700">Applied Online:- ${stat.applied_online}</p>
                            <p class="text-gray-700">Recruiting:- ${stat.recruiter}</p>
                            <p class="text-gray-700">Employee Referral:- ${stat.employee_referral}</p>
                            <p class="text-gray-700">Difficulty to get in ${name}:- ${stat.difficulty}</p>
                        </div>
                    `).join('')}
                </div>

                <!-- FAQS -->
                <div class="w-full min-h-[20px] my-2 pt-1 px-4">
                    <h2 class="font-bold leading-6 text-lg text-gray-900 text-start">FAQS about the company ${name}</h2>
                    <!-- Add FAQs here -->
                    ${faqs.map((faq: any) => `
                        <div class="w-full min-h-[20px] my-2 pt-1 no-break-inside">
                            <h3 class="font-semibold leading-6 text-lg text-gray-900 text-start">Question:- ${faq.question}</h3>
                            <p class="text-gray-700">Answer:- ${faq.answer}</p>
                        </div>
                    `).join('')}
                </div>

                <!-- Interviews -->
                <div class="w-full min-h-[20px] my-2 pt-1 px-4">
                    <h2 class="font-bold leading-6 text-lg text-gray-900 text-start">Interviews from ${name} Rated by people</h2>
                    <!-- Loop through and display interview details -->
                    ${interviews.map((interview: any) => `
                        <div class="w-full min-h-[20px] my-2 pt-1 no-break-inside">
                            <h3 class="font-semibold leading-6 text-lg text-gray-900 text-start">The person rating the interview:- ${interview.interviewees.name} for ${interview.positions.name} Postion</h3>
                            <p class="text-gray-700">His Experience :- ${interview.experience}</p>
                            <p class="text-gray-700">Offer Status:- ${interview.offer_status}</p>
                            <p class="text-gray-700">Difficulty of the interview :- ${interview.difficulty}</p>
                            <p class="text-gray-700">Interview Process :- ${interview.interview_process}</p>
                            <h3>Interview Questions asked at the interview</h3>
                                    ${interview.interviewToQuestions?.map((question: any) => `
                                        <div class="w-full min-h-[20px] my-2 pt-1 no-break-inside">
                                            <p class="text-gray-700">Question :- ${question.questions[0].text}</p>
                                        </div>
                                    `).join('')}
                        </div>
                    `).join('')}
                </div>
            </main>
        </body>
        <script src="https://cdn.tailwindcss.com"></script>
        </html>
    `;
    return pdf;
    } catch (error) {
        console.log(error)
    }
    
    
                
};