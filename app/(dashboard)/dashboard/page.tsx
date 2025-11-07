import { getCompany } from '@/actions/companyController'
import { getTasks } from '@/actions/taskController'
import { auth } from '@/auth'
import FolderDetails from '@/components/dash/folderdetails'
import TitleCards from '@/components/dash/titlecards'
import { redirect } from 'next/navigation'


const Dashboard = async () => {
    const session = await auth()
    const company = await getCompany(session?.user?.id as string)
    if(!company) return redirect('/settings')

    const tasks = await getTasks(company.id) ?? []

    return (
        <div className="content">
            <TitleCards />
            <FolderDetails tasks={tasks} />
        </div>
    )
}

export default Dashboard