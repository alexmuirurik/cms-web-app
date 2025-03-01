'use client'
import React, { useState } from 'react'
import { Folder, Task } from '@prisma/client'
import TasksTableHeader from './tasksheader'
import { Checkbox } from '../ui/checkbox'
import Link from 'next/link'
import { TaskWithFolder } from '@/prisma/types'

const TaskCard = ({ tasks }: { tasks: TaskWithFolder[] }) => {
    const [checked, setChecked] = useState(new Map())
    return (
        <div className="space-y-2">
            <TasksTableHeader />
            {tasks.map((task) => {
                return (
                    <div className="flex items-center gap-2 border p-1">
                        <div className="flex items-center gap-2 border-e rounded-none p-2 w-4/12">
                            <Checkbox className="me-2 border-gray-400 data-[state=checked]:bg-teal-600 " />
                            <Link 
                                href={`/projects/${task.folder.slug}/${task.slug}`}
                                className="text-teal-800 hover:text-teal-500 text-sm font-bold"
                            >
                                {task.title}
                            </Link>
                        </div>
                        <div className="border-e rounded-none p-1 w-2/12 overflow-x-hidden">
                            <span className="text-neutral-600 text-xs text-nowrap">
                                {task.writerId ?? 'Unassigned'}
                            </span>
                        </div>
                        <div className="border-e rounded-none p-1 w-2/12 overflow-x-hidden">
                            <span className="text-neutral-600 text-xs text-nowrap">
                                {task.editorId ?? 'Unassigned'}
                            </span>
                        </div>
                        <div className="border-e rounded-none p-1 w-2/12 overflow-x-hidden">
                            <span className="text-neutral-600 text-sm text-nowrap">
                                {task.deadline} Days
                            </span>
                        </div>
                        <div className="border-e rounded-none p-1 w-2/12 overflow-x-hidden">
                            <span className="text-neutral-600 text-xs text-nowrap">
                                {task.status}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TaskCard
