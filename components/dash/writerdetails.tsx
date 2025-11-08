import { Task, User } from '@prisma/client'
import CardTasks from '../cards/cardTasks'
import ActiveUsers from './activeUsers'

const WriterDetails = async ({
    users,
    tasks,
}: {
    users: User[]
    tasks: Task[]
}) => {
    return (
        <div className="md:flex space-y-4 md:space-y-0 gap-4 mt-4">
            <div className="w-full border">
                <CardTasks tasks={tasks} />
            </div>
            <div className="bg-transparent md:w-5/12 lg:w-4/12 border">
                <div className="flex flex-row justify-between border-b py-3.5 px-2">
                    <h3 className="text-base text-gray-800 font-bold">
                        Active Users
                    </h3>
                </div>
                <div className="px-0">
                    <ActiveUsers users={users} />
                </div>
            </div>
        </div>
    )
}

export default WriterDetails
