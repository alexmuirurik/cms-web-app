'use client'

import { LoadingButton } from '@/src/components/ui/loadingbtn'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'
import { useState } from 'react'

const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const form = useForm()
    const { toast } = useToast()
    const onFormSubmit = async (data: any) => {
        setLoading(true)
        const sign = await signIn('resend', {
            email: data.email,
            redirectTo: '/login',
            redirect: false,
        })

        if (sign.ok) {
            toast({
                title: 'Email Sent',
                description: 'Check your email to sign in',
                variant: 'success',
            })
        }

        if (sign.error) {
            toast({
                title: 'Sign in failed',
                description: 'We could not sign you in',
                variant: 'destructive',
            })
        }
        setLoading(false)
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onFormSubmit)}
                className="space-y-6"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="form-group mb-4">
                            <FormLabel className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                                Email address
                            </FormLabel>
                            <Input
                                className="border border-neutral-400 text-sm w-full ps-5 py-2"
                                {...field}
                            />
                        </FormItem>
                    )}
                />

                <div className="form-group">
                    <LoadingButton
                        loading={loading}
                        className="w-full hover:bg-gray-950"
                        type="submit"
                    >
                        Sign in
                    </LoadingButton>
                </div>
            </form>
        </Form>
    )
}

export default LoginForm
