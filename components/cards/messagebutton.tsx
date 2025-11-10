'use client'

import { Task } from '@prisma/client'
import { taskTitles } from '@/lib/tastLib'
import { LoadingButton } from '../ui/loadingbtn'

const MessageButton = ({ task }: { task: Task }) => {
    const title = taskTitles.find((message) => message.status === task.status)
    return (
        <LoadingButton
            className="w-full border border-gray-600 cursor-not-allowed"
            variant={'outline'}
        >
            {title?.title}
        </LoadingButton>
    )
}

export default MessageButton
