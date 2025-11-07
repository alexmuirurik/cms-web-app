import PageHeader from '@/components/layouts/PageHeader'
import { Input } from '@/components/ui/input'
import CardTasks from '@/components/cards/cardTasks'
import { auth } from '@/auth'
import { getCompany } from '@/actions/companyController'
import { redirect } from 'next/navigation'
import { getTasks } from '@/actions/taskController'
import AddTask from '@/components/forms/addtask'

const TasksPage = async () => {
    const session = await auth()
    const company = await getCompany(session?.user?.id as string)
    if (!company) return redirect('/settings')

    const tasks = await getTasks(company.id as string) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title="Invoices" description={`${tasks.length}`}>
                <div className="flex items-center gap-2">
                    <Input placeholder='Search Tasks' />
                    <AddTask company={company} />
                </div>
            </PageHeader>
            <div className="page-body">
                <CardTasks tasks={tasks} />
            </div>
        </div>
    )
}

export default TasksPage
