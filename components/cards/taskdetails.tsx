'use client'

import { ActionsThemselves } from '@/lib/tastLib'
import { toTitleCase } from '@/lib/utils'
import { WriterWithUser } from '@/prisma/types'
import { Task } from '@prisma/client'
import { taskActions } from '@/lib/tastLib'

const TaskDetails = ({
    user,
    task,
    writers,
    possibleActions,
}: {
    user: any
    task: Task
    writers: WriterWithUser[]
    possibleActions: ActionsThemselves[]
}) => {
    const action = taskActions.find((action) => action.status === task.status)
    return (
        <div className="left space-y-3">
            <div className="flex items-center justify-between gap-2 w-full">
                {possibleActions.map((action) => (
                    <action.component
                        key={action.value}
                        task={task}
                        writers={writers}
                    />
                ))}
            </div>
            <div className="space-y-4 border p-2 ">
                <div className="space-y-2">
                    <div className="flex justify-between items-center  ">
                        <span className="text-sm font-bold">Status</span>
                        <span className={`text-xs ${action?.color}`}>
                            {toTitleCase(
                                task.status
                                    .replaceAll('_', ' ')
                                    .toLocaleLowerCase()
                            )}
                        </span>
                    </div>
                </div>
                <div className="flex justify-between items-center ">
                    <span className="text-sm font-bold">Word Count</span>
                    <span className="text-xs">{`${task.wordcount} words`}</span>
                </div>
                <div className="flex justify-between items-center ">
                    <span className="text-sm font-bold">Deadline</span>
                    <span className="text-xs">{`${task.deadline} days`}</span>
                </div>
            </div>

            <div className="space-y-3">
                <span className="text-sm font-bold">Instructions</span>
                <div className="border text-sm max-h-96 p-4">
                    <p>{task.instructions}</p>
                </div>
            </div>
        </div>
    )
}

export default TaskDetails
