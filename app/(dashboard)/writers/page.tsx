import React from 'react'
import PageHeader from '@/components/layouts/PageHeader'
import InviteWriter from '@/components/forms/invitewriter'
import { auth } from '@/auth'
import { getCompany } from '@/actions/companyController'
import { redirect } from 'next/navigation'
import { getWriters } from '@/actions/userController'
import WritersCard from '@/components/cards/writerscard'


const Writers = async () => {
    const session = await auth()
    const company = await getCompany(session?.user?.id as string)
    if(!company) return redirect('/settings')
    const writers = await getWriters(company.id) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title='Writers' description={`${writers.length}`} >
                <div className="flex items-center gap-2">
                    <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                    <InviteWriter />
                </div>
            </PageHeader>
            <div className="page-body">
                <div className="relative">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <WritersCard writers={writers} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Writers