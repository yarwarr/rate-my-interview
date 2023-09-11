import { interviews, interviewees, positions, interview_to_questions } from "@/db/schema";

export type ExtendedInterview = interviews & {
    interviewees: interviewees,
    positions: positions,
    interviewToQuestions: interview_to_questions[]
}

export type Question = {
    id: number,
    text: String
}