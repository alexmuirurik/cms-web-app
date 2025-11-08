'use client'

import { Task, Writer } from '@prisma/client'
import { LoadingButton } from '../ui/loadingbtn'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from '../ui/button'
import { claimTask } from '@/actions/taskController'
import { TaskStatus } from '@/lib/taskTypes'
import { WriterWithUser } from '@/prisma/types'

const ClaimTask = ({
    task,
    writers,
    writer,
}: {
    task: Task
    writers: WriterWithUser[]
    writer: Writer
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const claimTaskAsync = async () => {
        setLoading(true)
        const claim = await claimTask({
            taskId: task.id,
            writerId: writer.id,
            status: TaskStatus.IN_PROGRESS,
        })
        if (claim) {
            setLoading(false)
            return setOpen(false)
        }
        setLoading(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full" variant="destructive">
                    <span className="text-nowrap">Claim Task</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-800 border-gray-600">
                <DialogHeader className="flex flex-col !justify-center !text-center space-y-4">
                    <DialogTitle className="text-gray-300">
                        Claim Task
                    </DialogTitle>
                    <DialogDescription className="text-neutral-500 ">
                        Make sure you read the instructions before claiming it.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="!justify-between mt-6">
                    <DialogClose asChild>
                        <Button
                            className="text-white border-neutral-600"
                            variant="outline"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <LoadingButton
                        loading={loading}
                        variant="destructive"
                        onClick={() => claimTaskAsync()}
                    >
                        Claim Task
                    </LoadingButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ClaimTask
