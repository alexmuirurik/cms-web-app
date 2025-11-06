'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loadingbtn'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'

const Contact = () => {
    const form = useForm()

    return (
        <section id="contact" className="contact section space-y-6">
            <div className="container flex flex-col items-center justify-center section-title space-y-4">
                <h2 className="text-4xl font-bold border-b border-gray-300 rounded-none">
                    Contact
                </h2>
                <p>
                    Necessitatibus eius consequatur ex aliquid fuga eum quidem
                    sint consectetur velit
                </p>
            </div>

            <div className="container">
                <div className="flex items-center justify-between gap-2 w-full h-full mb-5">
                    <Form {...form}>
                        <form
                            className="flex flex-col items-center w-full"
                            action="forms/contact.php"
                            method="post"
                            role="form"
                        >
                            <div className="flex items-center justify-between gap-2 w-full h-full mb-5">
                                <FormField
                                    name="name"
                                    render={() => (
                                        <FormItem className="w-1/2">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input className="bg-white border border-teal-600 h-10 w-full" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="name"
                                    render={() => (
                                        <FormItem className="w-1/2">
                                            <FormLabel>Emall</FormLabel>
                                            <FormControl>
                                                <Input className="bg-white border border-teal-600 h-10 w-full" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full form-group mt-3">
                                <FormField
                                    name="name"
                                    render={() => (
                                        <FormItem className="w-full">
                                            <FormLabel>Message</FormLabel>
                                            <FormControl>
                                                <Textarea rows={10} className="bg-white text-sm border border-teal-600 h-10 w-full p-4" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-end items-center my-3 text-end w-full">
                                <LoadingButton className="bg-teal-600 hover:bg-teal-500 text-gray-200 hover:text-gray-100 border-gray-600">
                                    Submit Message
                                </LoadingButton>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )
}

export default Contact
