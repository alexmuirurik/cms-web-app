import React from 'react'
import { getCompany } from '@/actions/companyController'
import { auth } from '@/auth'
import DashChart from '@/components/dash/dashchart'
import FolderDetails from '@/components/dash/folderdetails'
import TitleCards from '@/components/dash/titlecards'
import { redirect } from 'next/navigation'


const Dashboard = async () => {
    const session = await auth()
    const company = await getCompany(session?.user?.id as string)
    if(!company) return redirect('/settings')

    return (
        <div className="content">
            <TitleCards />
            <FolderDetails />
            <DashChart />
        </div>
    )
}

export default Dashboard