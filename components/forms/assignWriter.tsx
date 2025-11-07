'use client'

import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import { assignWriterFormSchema } from '@/prisma/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Task } from '@prisma/client'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { WriterWithUser } from '@/prisma/types'
import { useState } from 'react'
import { FaBuffer } from 'react-icons/fa'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage } from '../ui/avatar'
import { LoadingButton } from '../ui/loadingbtn'

const AssignWriter = ({
    task,
    writers,
}: {
    task: Task
    writers: WriterWithUser[]
}) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [writer, setWriter] = useState('')
    const [searchWriters, setSearchWriters] = useState<WriterWithUser[]>([])
    const form = useForm<z.infer<typeof assignWriterFormSchema>>({
        resolver: zodResolver(assignWriterFormSchema),
        defaultValues: {
            taskId: task.id,
        },
    })

    const filterWriters = (e: string) => {
        setWriter(e)
        setSearchWriters(() =>
            writers.filter((writer) => {
                if (e === '') return false

                if (writer.user?.name) {
                    return writer.user?.name
                        .toLowerCase()
                        .includes(e.toLowerCase())
                }

                if (writer.email) {
                    return writer.email.toLowerCase().includes(e.toLowerCase())
                }
            })
        )
    }

    const setWriterId = (writer: WriterWithUser) => {
        setWriter(writer.user?.name ?? writer.email)
        form.setValue('writerId', writer.id)
        setSearchWriters([])
    }

    const onFormSubmit = async (
        data: z.infer<typeof assignWriterFormSchema>
    ) => {
        console.log(data)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Form {...form}>
                <form className='w-full' onSubmit={form.handleSubmit(onFormSubmit)}>
                    <DialogTrigger asChild>
                        <Button className="bg-teal-600 hover:bg-teal-500 w-full">
                            <span className='text-nowrap'>Assign Writer</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-neutral-800 border-gray-600">
                        <DialogHeader className="flex flex-col !justify-center !text-center">
                            <DialogTitle className="text-gray-300">
                                Assign Task
                            </DialogTitle>
                            <DialogDescription>
                                Choose a writer to assign the task
                            </DialogDescription>
                        </DialogHeader>
                        <Input
                            className="border-neutral-600 text-neutral-200"
                            placeholder="Search Writers"
                            onChange={(e) => filterWriters(e.target.value)}
                            value={writer}
                        />
                        <div className="space-y-2">
                            {searchWriters.map((writer) => (
                                <div
                                    key={writer.id}
                                    className="flex items-center gap-2 border border-gray-600 p-2 cursor-pointer"
                                    onClick={() => setWriterId(writer)}
                                >
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage
                                            src={
                                                writer?.user?.image ??
                                                '/assets/img/profile.png'
                                            }
                                            alt=""
                                        />
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-neutral-200 font-bold">
                                            {writer?.user?.name ?? writer.email}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {writer?.user?.email}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <DialogFooter className="flex !justify-between items-center w-full">
                            <DialogClose asChild>
                                <Button
                                    className="text-white"
                                    variant="outline"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <LoadingButton
                                className="bg-teal-600 hover:bg-teal-500"
                                loading={loading}
                                type="submit"
                            >
                                Assign Task
                            </LoadingButton>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    )
}

export default AssignWriter
