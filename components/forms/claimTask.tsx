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
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

const ClaimTask = ({
    task,
    writers,
    writer,
}: {
    task: Task
    writers: WriterWithUser[]
    writer?: Writer
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const claimTaskAsync = async () => {
        setLoading(true)
        try {
            const claim = await claimTask({
                taskId: task.id,
                writerId: writer?.id as string,
                status: TaskStatus.IN_PROGRESS,
            })
            if (claim) {
                toast({
                    title: 'Task Claimed',
                    description: 'Task Claimed Successfully. Happy Writing!',
                    variant: 'success',
                })
                router.refresh()
                setLoading(false)
                return setOpen(false)
            }
        } catch (error) {
            console.log(error)
        }

        setLoading(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-500 w-full">
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
                        className="bg-teal-600 hover:bg-teal-500"
                        loading={loading}
                        onClick={claimTaskAsync}
                    >
                        Claim Task
                    </LoadingButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ClaimTask
