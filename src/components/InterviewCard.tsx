import { FC, useRef, useState } from 'react'
import { interviews, interviewees, positions } from "@/db/schema";
import { ExtendedInterview } from '../../db';
// import { formatTimeToNow } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';
import QuestionFeed from './QuestionFeed';

interface InterviewCardProps {
    companyId: number
    interview: ExtendedInterview
}



// get company data from company id using the GET /api/company/:id endpoint




const InterviewCard: FC<InterviewCardProps> = ({ companyId, interview }) => {
    const [expanded, setExpanded] = useState(false);
    async function expandQuestions(questions: []) {
        setExpanded(!expanded)
    }
    const pRef = useRef<HTMLDivElement>(null)
    return <div className='rounded-md bg-white shadow'>
        <div className='px-6 py-4 flex justify-between'>
            {/* TODO Postvotes */}

            <div className='w-0 flex-1'>
                <div className='max-h-40 mt-1 text-xs text-gray-500'>
                    <span>
                        Posted by u/{interview.interviewees.name + ' '}
                    </span>
                    new Date()
                </div>
                <a href={`/company/${companyId}/interview/${interview.id}`}>
                    <h1 className='text-lg font-semibold py-2 loading-6 text-gray-900'>
                        {interview.positions.name}
                    </h1>
                    {interview.interview_process}
                </a>

                <div className='relative text-sm max-h-40 w-full overflow-clip' ref={pRef}>
                    {pRef.current?.clientHeight === 160 ? (
                        <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent' />
                    ) : null}
                </div>
            </div>
        </div>

        <div className='bg-gray-50 z-20 text-sm p-4 sm:px-6'>
            {/* href={`/company/${companyId}/interview/${interview.id}`} */}
            <a className='w-fit flex items-center gap-2 cursor-pointer' onClick={() => expandQuestions(interview.interviewToQuestions)}>
                <MessageSquare className='h-4 w-4' /> {interview.interviewToQuestions.length} Questions
            </a>
        </div>
        {expanded && (
            <div className='bg-gray-50 z-20 text-sm p-4 sm:px-6'>
                {/* Content of your div */}
                <QuestionFeed questions={interview.interviewToQuestions} />
            </div>
        )}

    </div>
}

export default InterviewCard