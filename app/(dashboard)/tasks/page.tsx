import PageHeader from '@/components/layouts/PageHeader'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loadingbtn'
import CardTasks from '@/components/cards/cardTasks'
import { auth } from '@/auth'
import { getCompany } from '@/actions/companyController'
import { redirect } from 'next/navigation'
import { getTasks } from '@/actions/taskController'

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
                    <LoadingButton className="bg-teal-500 hover:bg-teal-700 py-4 px-8">
                        <span className="text-white text-nowrap">Add a Task</span>
                    </LoadingButton>
                </div>
            </PageHeader>
            <div className="page-body">
                <CardTasks tasks={tasks} />
            </div>
        </div>
    )
}

export default TasksPage
