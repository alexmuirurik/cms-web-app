import React from 'react'
import { Checkbox } from '../ui/checkbox'

const TasksTableHeader = () => {
    return (
        <div className="bg-neutral-300 flex items-center gap-2 border p-2 px-1">
            <div className="flex items-center gap-2 border-e rounded-none p-2 w-4/12">
                <Checkbox className="me-2 border-gray-400 data-[state=checked]:bg-teal-600 " />
                <span className="text-teal-800 text-sm font-bold">Task Title</span>
            </div>
            <div className="border-e rounded-none p-1 w-2/12">
                <span className="text-neutral-600 text-sm">Author</span>
            </div>
            <div className="border-e rounded-none p-1 w-2/12">
                <span className="text-neutral-600 text-sm">Editor</span>
            </div>
            <div className="border-e rounded-none p-1 w-2/12">
                <span className="text-neutral-600 text-sm">Deadline</span>
            </div>
            <div className="border-e rounded-none p-1 w-2/12">
                <span className="text-neutral-600 text-sm">Status</span>
            </div>
        </div>
    )
}

export default TasksTableHeader
