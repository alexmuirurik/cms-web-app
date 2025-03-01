'use client'
import React from 'react'
import { Folder, Task } from '@prisma/client'

const TaskDetails = ({ folder, task }: { folder: Folder; task: Task }) => {
    return (
        <div className="left space-y-2">
            <div className="">
                <span className='text-sm font-bold'>Instructions</span>
            </div>
            <div className="flex justify-between items-center border p-2 ">
                <span className="text-sm font-bold">Word Count</span>
                <span className="text-xs">{`${task.wordcount} words`}</span>
            </div>
            <div className="border p-4">
                <div className="content text-sm">
                    <p>{task.instructions}</p>
                </div>
            </div>
        </div>
    )
}

export default TaskDetails
