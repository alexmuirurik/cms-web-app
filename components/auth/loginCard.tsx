'use client'

import SignInForm from '@/components/auth/SignInForm'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'
import LoginForm from './loginForm'
import { LoadingButton } from '../ui/loadingbtn'
import { useState } from 'react'

const LoginCard = () => {
    const [googleLoading, setGoogleLoading] = useState(false)
    const [githubLoading, setGithubLoading] = useState(false)
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border rounded-lg">
            <div className="flex items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm mb-6">
                <Image
                    src="/assets/img/Ellipse.png"
                    alt=""
                    width={30}
                    height={30}
                    className="me-2"
                />
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex items-center justify-between gap-4 w-full mb-6">
                    <SignInForm
                        setLoading={setGoogleLoading}
                        provider="google"
                        className="flex border w-full"
                    >
                        <LoadingButton
                            loading={googleLoading}
                            type="submit"
                            className="flex items-center px-8 py-2 w-full"
                            variant={'outline'}
                        >
                            <FcGoogle className="me-1 text-lg" />
                            Google
                        </LoadingButton>
                    </SignInForm>
                    <SignInForm
                        setLoading={setGithubLoading}
                        provider="github"
                        className="flex justify-end border w-full"
                    >
                        <LoadingButton
                            loading={githubLoading}
                            type="submit"
                            className="flex items-center px-8 py-2 w-full"
                            variant={'outline'}
                        >
                            <FaGithub className="me-1 text-lg" />
                            Github
                        </LoadingButton>
                    </SignInForm>
                </div>

                <div className="flex items-center justify-between w-full font-semibold text-sm inset-1 mb-4">
                    <span className="border w-3/12"></span>
                    <span className="text-sm px-2">Or continue with Email</span>
                    <span className="border w-3/12"></span>
                </div>

                <LoginForm />
            </div>
        </div>
    )
}

export default LoginCard
