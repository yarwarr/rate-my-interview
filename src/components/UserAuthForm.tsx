"use client"
import { FC, useState } from 'react'
import { Button } from './ui/Button1'
import { cn } from '@/lib/utils'
import { Icons } from './Icons'
import { signIn } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {

}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const loginWithGoogle = async () => {
        setIsLoading(true)
        try {
            await signIn('google')
        } catch (error) {
            toast({
                title: 'There was an error',
                description: 'Error while logging in google',
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const loginWithGithub = async () => {
        setIsLoading(true)
        try {
            await signIn('github')
        } catch (error) {
            toast({
                title: 'There was an error',
                description: 'Error while logging in google',
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    }
    return <div className={cn('flex justify-center', className)} {...props}>
        <Button onClick={loginWithGoogle} isLoading={isLoading} size='sm' className='w-full'>{isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}Google</Button>
        <Button onClick={loginWithGithub} isLoading={isLoading} size='sm' className='w-full'>{isLoading ? null : <Icons.github className='h-4 w-4 mr-2' />}Github</Button>
    </div>
}

export default UserAuthForm