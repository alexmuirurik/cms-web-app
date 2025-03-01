import React from 'react'
import { auth } from '@/auth'
import { getCompany } from '@/actions/companyController'
import { notFound, redirect } from 'next/navigation'
import PageHeader from '@/components/layouts/PageHeader'
import { Button } from '@/components/ui/button'
import WriteTask from '@/components/forms/writetask'
import TaskDetails from '@/components/cards/taskdetails'
import { getTask } from '@/actions/taskController'
import { getSingleFolder } from '@/actions/FolderController'

const SingleTaskPage = async ({
    params,
}: {
    params: { slug: string; taskSlug: string }
}) => {
    const session = await auth()
    const company = await getCompany(session?.user?.id as string)
    if (!company) return redirect('/settings')

    const folder = await getSingleFolder(params.slug)
    const task = await getTask(params.taskSlug)
    if (!folder || !task) return notFound()

    return (
        <div className="page-wrapper">
            <PageHeader title={task.title} description={`${task.wordcount} Words`}>
                <div className="text-sm text-center border p-2">
                    <span>{task.status.replace('-', ' ')}</span>
                </div>
            </PageHeader>
            <div className="flex gap-4">
                <div className="sm:order-2 w-full sm-5/12 md:w-4/12 lg:w-3/12">
                    <TaskDetails folder={folder} task={task} />
                </div>
                <div className="w-full sm-7/12 md:w-8/12 lg:w-9/12">
                    <WriteTask task={task} />
                </div>
            </div>
        </div>
    )
}

export default SingleTaskPage
