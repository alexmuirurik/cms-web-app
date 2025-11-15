'use client'

import { deleteTask } from '@/src/actions/taskController'
import { Button } from '@/src/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/src/components/ui/dialog'
import { WriterWithUser } from '@/prisma/types'
import { Task } from '@prisma/client'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import { LoadingButton } from '../ui/loadingbtn'

const DeleteTask = ({
    task,
    writers,
}: {
    task: Task
    writers: WriterWithUser[]
}) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const deleteTaskAsync = async () => {
        setLoading(true)
        const deletetask = await deleteTask(task.id)
        if (deletetask) {
            setLoading(false)
            toast({
                title: 'Task Deleted',
                description: 'Task Deleted Successfully. Happy Writing!',
                variant: 'success',
            })
            setOpen(false)
            return redirect('/tasks')
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full" variant="destructive">
                    <span className="text-nowrap">Delete Task</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-800 border-gray-600">
                <DialogHeader className="flex flex-col !justify-center !text-center space-y-4">
                    <DialogTitle className="text-gray-300">
                        Delete Task
                    </DialogTitle>
                    <DialogDescription className="text-neutral-500 ">
                        Are you sure you want to delete this task? This action
                        is irreversible.
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
                        onClick={() => deleteTaskAsync()}
                    >
                        Delete Task
                    </LoadingButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteTask
