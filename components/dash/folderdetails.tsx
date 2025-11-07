import { Task } from '@prisma/client'
import FilesDetails from './filesdetails'
import CardTasks from '../cards/cardTasks'

const FolderDetails = async ({ tasks }: { tasks: Task[] }) => {
    return (
        <div className="md:flex space-y-4 md:space-y-0 gap-4 mt-4">
            <div className="w-full border">
                <CardTasks tasks={tasks} />
            </div>
            <div className="bg-transparent md:w-5/12 lg:w-3/12 border">
                <div className="flex flex-row justify-between border-b py-3.5 px-2">
                    <h3 className="text-base text-gray-800 font-bold">
                        Active Projects
                    </h3>
                </div>
                <div className="px-0">
                    <FilesDetails />
                </div>
            </div>
        </div>
    )
}

export default FolderDetails
