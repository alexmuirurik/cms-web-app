'use client'

import { Task } from '@prisma/client'
import { Dialog } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { LoadingButton } from '../ui/loadingbtn'

const SubmitContent = ({ task }: { task: Task }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const submitContentAsync = async () => {
        setLoading(true)
        setOpen(false)
        setLoading(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-500 w-full">
                    <span className="text-nowrap">Submit Content</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-800 border-gray-600">
                <DialogHeader className="flex flex-col !justify-center !text-center space-y-4">
                    <DialogTitle className="text-gray-300">
                        Submit Content
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
                        onClick={submitContentAsync}
                    >
                        Submit Content
                    </LoadingButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SubmitContent
