type Company = {
    id: number;
    name: string;
    logo: string;
    rating: string;
    reviewsLink: string;
    reviewsCount: string;
    reviewsText: string;
    salariesLink: string;
    salariesCount: string;
    jobsLink: string;
    jobsCount: string;
    location: string;
    locationLink: string;
    companySize: string;
    companyType: string;
    description: string;
    faqs: Faq[]
    stat: Stat
  };

type Faq = {
    id: number;
    question: string;
    answer: string;
}

type Stat = {
    id: number;
    positive_experience: string;
    neutral_experience: string;
    negative_experience: string;
    applied_online: string;
    employee_referral: string;
    difficulty: string;
    recruiter: string;
}


