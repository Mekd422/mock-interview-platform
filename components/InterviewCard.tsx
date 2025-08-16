import React from 'react'
import dayjs from 'dayjs';
import { getRandomInterviewCover } from '@/lib/utils';

export const InterviewCard = ({interviewId, userId, role, type, techstack, createdAt}
  : InterviewCardProps
) => {

  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
  const formattedDate = dayjs(createdAt).format('MMM D, YYYY');
  return (
    <div>InterviewCard</div>
  )
}
