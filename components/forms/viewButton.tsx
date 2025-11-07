'use client'
import { Task } from '@prisma/client'
import { LoadingButton } from '../ui/loadingbtn'
import { WriterWithUser } from '@/prisma/types'

const ViewButton = ({
    task,
    writers,
}: {
    task: Task
    writers: WriterWithUser[]
}) => {
    const writer = writers.find((writer) => writer.id === task.writerId)
    return (
        <LoadingButton
            className="border-gray-400 w-full"
            disabled
            variant={'outline'}
        >
            <span className="text-nowrap text-sm">
                {writer?.user?.name ?? writer?.email.substring(0, 12)}
            </span>
        </LoadingButton>
    )
}

export default ViewButton
