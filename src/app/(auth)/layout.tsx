import React from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import Navbar from '@/src/components/auth/home/navbar'

const AuthLayout = async ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    const session = await auth()
    if (session?.user) return redirect('/dashboard')
    return (
        <div className="relative">
            {children}
        </div>
    )
}

export default AuthLayout
