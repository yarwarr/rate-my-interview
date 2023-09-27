'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MessageSquarePlus } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    companyId: number
    hasResume: boolean
}

const OpenChat = ({companyId, hasResume}: Props) => {
    // Using useRouter here because this is a client component
    const { push } = useRouter();
    async function createChat() {
        const response = await axios.post('/api/create-chat', {companyId})
        if(response.status == 200) {
            const chatId = response.data.chat_id
            push(`/chat/${companyId}`)
        }
        
      }
  return (
    <>
    {hasResume && (
        <div className="cursor-pointer" onClick={() => createChat()}>
          <MessageSquarePlus />
        </div>
      )}
    </>
  )
}

export default OpenChat