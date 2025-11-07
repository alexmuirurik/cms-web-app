import { getCompany } from '@/actions/companyController'
import { getTasks } from '@/actions/taskController'
import { getWriters } from '@/actions/userController'
import { auth } from '@/auth'
import TitleCards from '@/components/dash/titlecards'
import WriterDetails from '@/components/dash/writerdetails'
import { redirect } from 'next/navigation'


const Dashboard = async () => {
    const session = await auth()
    const company = await getCompany(session?.user?.id as string)
    if(!company) return redirect('/settings')

    const tasks = await getTasks(company.id) ?? []
    const writers = await getWriters(company.id) ?? []

    return (
        <div className="content">
            <TitleCards />
            <WriterDetails writers={writers} tasks={tasks}/>
        </div>
    )
}

export default Dashboard