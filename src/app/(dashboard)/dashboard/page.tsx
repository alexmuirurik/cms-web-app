import { getCompanyById } from '@/src/actions/companyController'
import { getChatUsers } from '@/src/actions/messageController'
import { getTasks } from '@/src/actions/taskController'
import { auth } from '@/auth'
import TitleCards from '@/src/components/dash/titlecards'
import WriterDetails from '@/src/components/dash/writerdetails'
import { SessionUser } from '@/prisma/types'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
    const session = await auth()
    const company = await getCompanyById(session?.user?.companyId as string)
    if (!company) return redirect('/settings')

    const tasks = (await getTasks(company.id)) ?? []
    const activeUsers = (await getChatUsers(session?.user as SessionUser, company.id)) ?? []

    return (
        <div className="content">
            <TitleCards />
            <WriterDetails users={activeUsers} tasks={tasks} />
        </div>
    )
}

export default Dashboard
