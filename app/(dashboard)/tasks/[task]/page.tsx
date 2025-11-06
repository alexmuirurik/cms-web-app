import { getCompany } from '@/actions/companyController'
import { getWriterTasks } from '@/actions/taskController'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const TaskPage = async () => {
    const session = await auth()
    const company = await getCompany(session?.user?.id as string)
    if (!company) return redirect('/settings')
    const tasks = await getWriterTasks(session?.user?.id as string)

    return (
        <div className="main ">
            <h1>Task</h1>
        </div>
    )
}

export default TaskPage
