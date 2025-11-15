import PageHeader from '@/src/components/layouts/PageHeader'
import { Input } from '@/src/components/ui/input'
import CardTasks from '@/src/components/cards/cardTasks'
import { auth } from '@/auth'
import { getCompanyById } from '@/src/actions/companyController'
import { redirect } from 'next/navigation'
import { getTasks } from '@/src/actions/taskController'
import AddTask from '@/src/components/forms/addtask'
import { userCanCreate } from '@/src/lib/tastLib'
import { SessionUser } from '@/prisma/types'

const TasksPage = async () => {
    const session = await auth()
    const company = await getCompanyById(session?.user?.companyId as string)
    if (!company) return redirect('/settings')

    const tasks = (await getTasks(company.id as string)) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title="Tasks" description={`${tasks.length}`}>
                <div className="flex items-center gap-2">
                    <Input placeholder="Search Tasks" />
                    {userCanCreate(session?.user as SessionUser) && (
                        <AddTask company={company} />
                    )}
                </div>
            </PageHeader>
            <div className="page-body border w-full">
                <CardTasks tasks={tasks} />
            </div>
        </div>
    )
}

export default TasksPage
