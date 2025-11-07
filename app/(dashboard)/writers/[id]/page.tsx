import React from 'react'
import PageHeader from '@/components/layouts/PageHeader'
import AddTask from '@/components/forms/addtask'
import { auth } from '@/auth'
import { getCompany } from '@/actions/companyController'
import { notFound, redirect } from 'next/navigation'
import { getTasks } from '@/actions/taskController'
import { getWriterByID } from '@/actions/userController'
import CardTasks from '@/components/cards/cardTasks'

const SingleWriter = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const session = await auth()
    const company = await getCompany(session?.user?.id as string)
    if (!company) return redirect('/settings')

    const writer = await getWriterByID((await params).id)
    if (!writer) return notFound()

    const tasks = (await getTasks(writer.id)) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader
                title={writer?.user?.name as string}
                description={`${tasks.length} tasks`}
            >
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2"
                        placeholder="Search"
                    />
                    <AddTask company={company} writer={writer} />
                </div>
            </PageHeader>
            <div className="page-body">
                <CardTasks tasks={tasks} />
            </div>
        </div>
    )
}

export default SingleWriter
