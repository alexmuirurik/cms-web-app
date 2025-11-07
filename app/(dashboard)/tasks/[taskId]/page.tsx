import { auth } from '@/auth'
import { getCompany } from '@/actions/companyController'
import { notFound, redirect } from 'next/navigation'
import WriteTask from '@/components/forms/writetask'
import TaskDetails from '@/components/cards/taskdetails'
import { getTaskById } from '@/actions/taskController'
import { taskActions, UserRole } from '@/lib/tastLib'
import { getWriters } from '@/actions/userController'

const SingleTaskPage = async ({
    params,
}: {
    params: Promise<{ taskId: string }>
}) => {
    const session = await auth()
    const company = await getCompany(session?.user?.id as string)
    if (!company) return redirect('/settings')

    const task = await getTaskById((await params).taskId)
    if (!task) return notFound()

    const writers = (await getWriters(company.id)) ?? []
    const actions = taskActions.find((action) => action.status === task.status)
    const possibleActions =
        actions?.actions.filter((action) =>
            action.authorized.includes(session?.user?.role as UserRole)
        ) ?? []

    return (
        <div className="page-wrapper">
            <div className="flex gap-4">
                <div className="sm:order-2 w-full sm-5/12 md:w-4/12 lg:w-3/12">
                    <TaskDetails task={task} possibleActions={possibleActions} writers={writers} user={session?.user} />
                </div>
                <div className="w-full sm-7/12 md:w-8/12 lg:w-9/12">
                    <WriteTask task={task} />
                </div>
            </div>
        </div>
    )
}

export default SingleTaskPage
