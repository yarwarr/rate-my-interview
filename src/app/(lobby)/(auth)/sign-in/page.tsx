import { buttonVariants } from '@/components/ui/Button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import SignIn from '@/components/SignIn'
import { ChevronLeft } from 'lucide-react'

const page = () => {
    return <div className='absolute inset-0'>
        <div className='h-full max-w-2x1 mx-auto flex flex-col itmes-center justify-center gap-20'>
            <Link href='/' className={cn(buttonVariants({ variant: 'ghost' }), 'self-start -mt-20')}>
                <ChevronLeft className='mr-2 h-4 w-4' /> Home
            </Link>
            <SignIn />
        </div>
    </div>
}

export default page