"use client"
import { FC, useRef, useEffect } from 'react'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ExtendedInterview } from '../../db'
import InterviewCard from './InterviewCard'
interface InterviewFeedProps {
  initialInterviews: ExtendedInterview[],
  companyId: number
}

const InterviewFeed: FC<InterviewFeedProps> = ({ initialInterviews, companyId }) => {
  const lastInterviewRef = useRef<HTMLDivElement>(null)
  const { ref, entry } = useIntersection({
    root: lastInterviewRef.current,
    threshold: 1
  })
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const query = `/api/interviews?limit=${4}&page=${pageParam}&company_id=${companyId}`;
      const { data } = await axios.get(query);
      return data as ExtendedInterview[];
    }, {
    getNextPageParam: (_, pages) => {
      return pages.length + 1
    },
    initialData: { pages: [initialInterviews], pageParams: [1] },
  }
  )

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
  }, [entry, fetchNextPage])
  const interviews = data?.pages.flatMap((page) => page) ?? initialInterviews
  return <ul className='flex flex-col col-span-2 space-y-6'>
    {interviews.map((interview, index) => {
      if (index === interviews.length - 1) {
        return (
          <li key={interview.id} ref={ref}>
            <InterviewCard interview={interview} companyId={companyId} />
            {/* Loading bar */}
            {isFetchingNextPage && (
                <div className="flex flex-col justify-center items-center space-y-2">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900 dark:border-white"></div>
                  <span className="text-gray-600 dark:text-white">Loading more Interviews</span>
                </div>
              )}
          </li>
        )
      } else {
        return <InterviewCard key={interview.id} interview={interview} companyId={companyId} />
      }
    })}
  </ul>
}
export default InterviewFeed