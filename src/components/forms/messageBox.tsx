'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { messageFormSchema } from '@/prisma/schema'
import { LoadingButton } from '../ui/loadingbtn'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import z from 'zod'

const MessageBox = () => {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof messageFormSchema>>({
        resolver: zodResolver(messageFormSchema),
    })

    const onFormSubmit = async (data: z.infer<typeof messageFormSchema>) => {
        
    }

    return (
        <Form {...form}>
            <form
                onKeyUp={(key) => {
                    if (key.key === 'Enter') {
                        return form.handleSubmit(onFormSubmit)
                    }
                }}
                className="flex items-center justify-between gap-4 w-full"
            >
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="w-full p-0">
                            <FormControl>
                                <Textarea
                                    className="border-t border-gray-300 text-gray-500 placeholder:text-gray-500 w-full"
                                    placeholder='Enter Message Here'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default MessageBox
