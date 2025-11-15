'use client'

import { signIn } from 'next-auth/react'
import { Dispatch, SetStateAction } from 'react'

const SignInForm = ({
    setLoading,
    provider,
    className,
    children,
}: {
    setLoading: Dispatch<SetStateAction<boolean>>
    provider?: 'google' | 'github' | 'credentials'
    className?: string
    children: any
}) => {
    const Signin = async (event: any) => {
        setLoading(true)
        const sign = await signIn(provider)
        setTimeout(() => {
            setLoading(false)
        }, 8000)
    }

    return (
        <form action={Signin} method="post" className={'w-full ' + className}>
            {children}
        </form>
    )
}

export default SignInForm
