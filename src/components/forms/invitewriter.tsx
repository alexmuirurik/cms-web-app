'use client'
import { Button } from '@/src/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/src/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useToast } from '../ui/use-toast'
import { useState } from 'react'
import { Input } from '../ui/input'
import { inviteWriterFormSchema } from '@/prisma/schema'
import { inviteWriter } from '@/src/actions/emailController'
import { LoadingButton } from '../ui/loadingbtn'
import { Checkbox } from '../ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { Company } from '@prisma/client'
import { useRouter } from 'next/navigation'

const InviteWriter = ({ company }: { company: Company }) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof inviteWriterFormSchema>>({
        resolver: zodResolver(inviteWriterFormSchema),
        defaultValues: {
            companyId: company.id,
        },
    })
    const onFormSubmit = async (
        data: z.infer<typeof inviteWriterFormSchema>
    ) => {
        setLoading(true)
        try {
            const user = await inviteWriter(data)
            if (user) {
                toast({
                    title: 'Invite Sent',
                    description: 'We have sent an invite to your email',
                    variant: 'success',
                })
                setOpen(false)
                return router.refresh()
            }
        } catch (error) {
            console.log('Error sending invite ' + error)
        }

        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-teal-500 hover:bg-teal-700">
                    Invite a Writer
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-800 border-gray-600">
                <DialogHeader className="flex flex-col !justify-center !text-center">
                    <DialogTitle className="text-gray-300 mb-2">
                        Invite a Writer
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onFormSubmit)}
                        className="grid gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-right text-gray-300 mb-2">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border-gray-600 text-gray-300 placeholder:text-gray-500 w-full"
                                            placeholder="Enter Email"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="testWriter"
                            render={({ field }) => (
                                <FormItem className="flex items-start gap-4">
                                    <FormControl>
                                        <Checkbox
                                            className="data-[state=checked]:bg-teal-600 dark:data-[state=checked]:bg-teal-700 border-gray-200 text-gray-200 mt-1.5"
                                            onCheckedChange={check => () => {
                                                field.onChange(check)
                                            }}
                                        />
                                    </FormControl>
                                    <FormLabel className="text-gray-300 text-center">
                                        Test the writer with a written test
                                    </FormLabel>
                                </FormItem>
                            )}
                        />
                        <div className="flex !justify-center text-center ">
                            <LoadingButton
                                type="submit"
                                className="text-gray-300 border-gray-600"
                                variant="outline"
                                loading={loading}
                            >
                                Invite Writer
                            </LoadingButton>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default InviteWriter
