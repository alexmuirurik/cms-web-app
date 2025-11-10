'use client'

import { toTitleCase } from '@/lib/utils'
import { WriterWithUser } from '@/prisma/types'
import { Task, Writer } from '@prisma/client'
import { ActionsThemselves, TaskStatus } from '@/lib/taskTypes'
import { taskActions } from '@/lib/taskActions'
import { getTaskDeadline } from '@/lib/tastLib'

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
    const writer = writers.find((writer) => writer.id === task.writerId)
    const notInProgress = task.status !== TaskStatus.IN_PROGRESS
    const deadline = getTaskDeadline(task)
    return (
        <div className="left space-y-3">
            <div className="flex items-center justify-between gap-2 w-full">
                {possibleActions.map((action) => (
                    <action.component
                        key={action.value}
                        task={task}
                        writers={writers}
                        writer={writer}
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
                    <span className="text-xs">{deadline}</span>
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
