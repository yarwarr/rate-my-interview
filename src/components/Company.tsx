'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Company(company: Company[]) {
    console.log(company)
    const router = useRouter()
    const [fade, setFade] = useState(false)
    return (
        <div>
            {Object.values(company).map((item) => (
                <div key={item.id}>
                    {item.name}
                </div>
            ))}
        </div>
    )
}