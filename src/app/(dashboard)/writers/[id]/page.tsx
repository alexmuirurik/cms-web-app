import PageHeader from '@/src/components/layouts/PageHeader'
import AddTask from '@/src/components/forms/addtask'
import { auth } from '@/auth'
import { getCompanyById } from '@/src/actions/companyController'
import { notFound, redirect } from 'next/navigation'
import { getTasks } from '@/src/actions/taskController'
import { getWriterByID } from '@/src/actions/userController'
import CardTasks from '@/src/components/cards/cardTasks'

const SingleWriter = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const session = await auth()
    const company = await getCompanyById(session?.user?.companyId as string)
    if (!company) return redirect('/settings')

    const writer = await getWriterByID((await params).id)
    if (!writer) return notFound()

    const tasks = (await getTasks(writer.id)) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader
                title={writer?.user?.name as string}
                description={`${tasks.length} tasks`}
            >
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2"
                        placeholder="Search"
                    />
                    <AddTask company={company} writer={writer} />
                </div>
            </PageHeader>
            <div className="page-body">
                <CardTasks tasks={tasks} />
            </div>
        </div>
    )
}

export default SingleWriter
