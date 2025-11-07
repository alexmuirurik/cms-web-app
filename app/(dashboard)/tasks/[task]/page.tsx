import { auth } from '@/auth'
import { getCompany } from '@/actions/companyController'
import { notFound, redirect } from 'next/navigation'
import PageHeader from '@/components/layouts/PageHeader'
import { Button } from '@/components/ui/button'
import WriteTask from '@/components/forms/writetask'
import TaskDetails from '@/components/cards/taskdetails'
import { getTask } from '@/actions/taskController'
import { LoadingButton } from '@/components/ui/loadingbtn'
import { taskActions, UserRole } from '@/lib/tastLib'
import { toTitleCase } from '@/lib/utils'
import { getWriters } from '@/actions/userController'

const SingleTaskPage = async ({
    params,
}: {
    params: Promise<{ task: string }>
}) => {
    const session = await auth()
    console.log(session?.user)
    const company = await getCompany(session?.user?.id as string)
    if (!company) return redirect('/settings')

    const task = await getTask((await params).task)
    if (!task) return notFound()

    const writers = (await getWriters(company.id)) ?? []

    const possibleActions =
        taskActions
            .find((action) => action.status === task.status)
            ?.actions.filter((action) =>
                action.authorized.includes(session?.user?.role as UserRole)
            ) ?? []

    return (
        <div className="page-wrapper">
            <PageHeader
                title={task.title}
                description={`${task.wordcount} Words`}
            >
                <div className="flex items-center gap-2">
                    {possibleActions.map((action) => (
                        <action.component
                            key={action.value}
                            task={task}
                            writers={writers}
                        />
                    ))}
                </div>
            </PageHeader>
            <div className="flex gap-4">
                <div className="sm:order-2 w-full sm-5/12 md:w-4/12 lg:w-3/12">
                    <TaskDetails task={task} />
                </div>
                <div className="w-full sm-7/12 md:w-8/12 lg:w-9/12">
                    <WriteTask task={task} />
                </div>
            </div>
        </div>
    )
}

export default SingleTaskPage
