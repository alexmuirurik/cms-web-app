import React, { ReactNode } from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/src/components/layouts/Sidebar'
import Navbar from '@/src/components/layouts/Navbar'
import { SessionUser } from '@/prisma/types'

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    const session = await auth()
    if (!session?.user) redirect('/login')

    return (
        <main className="main relative md:w-[calc(100%_-_15rem)] md:left-52 mx-3 md:mx-0 md:ms-4 top-px">
            <Sidebar user={session.user as SessionUser} />
            <div className="main-wrapper">
                <Navbar />
                <div className="container-fluid relative mt-2 mb-6 min-h-[calc(100vh_-_8.5rem_-_2px)]">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default DashboardLayout
