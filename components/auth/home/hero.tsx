import { LoadingButton } from '@/components/ui/loadingbtn'
import {
    ArrowRightIcon,
    CheckCircle,
    CheckCircle2,
    PlayCircle,
} from 'lucide-react'
import Image from 'next/image'
import { BsGraphUp, BsLightning } from 'react-icons/bs'

const Hero = () => {
    return (
        <section
            id="hero"
            className="bg-[#171c35] h-screen w-full sm:pt-52 sm:pb-24 lg:pb-32 text-white rounded-none"
        >
            <div className="flex items-center justify-between mx-28">
                <div className="space-y-4 w-5/12">
                    <span className="bg-blue-950 flex items-center space-x-2 p-2 w-fit text-lg rounded-xl border border-blue-800">
                        <BsLightning />
                        <span className="text-sm">
                            Trusted by 750+ Companies
                        </span>
                    </span>
                    <h1 className="text-5xl text-white font-bold">
                        Launch Your Product Faster Than Ever
                    </h1>
                    <p className="text-gray-300">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam eaque ipsa quae ab illo inventore veritatis.
                    </p>
                    <ul className="flex gap-4 py-4">
                        <li className="flex items-center gap-2 text-lg">
                            <CheckCircle2 className="bg-blue-900 text-gray-900 h-4 w-4" />
                            <span>Instant Setup</span>
                        </li>
                        <li className="flex items-center gap-2 text-lg">
                            <CheckCircle2 className="bg-blue-900 text-gray-900 h-4 w-4" />
                            <span>Advanced Analytics</span>
                        </li>
                        <li className="flex items-center gap-2 text-lg">
                            <CheckCircle2 className="bg-blue-900 text-gray-900 h-4 w-4" />
                            <span>24/7 Support</span>
                        </li>
                    </ul>
                    <div className="flex gap-4">
                        <LoadingButton className="bg-blue-900 px-12 py-6 rounded-lg">
                            <span className="text-white font-bold">Login</span>
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </LoadingButton>
                        <LoadingButton className="bg-[#171c35] border border-gray-700 hover:border-gray-900 px-12 py-6">
                            <PlayCircle className="me-2 h-4 w-4" />
                            <span className="text-white font-bold">
                                Request Demo
                            </span>
                        </LoadingButton>
                    </div>
                    <div className="flex items-center gap-3 py-4">
                        <svg
                            className="w-4 h-4 text-yellow-300 me-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                            className="w-4 h-4 text-yellow-300 me-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                            className="w-4 h-4 text-yellow-300 me-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                            className="w-4 h-4 text-yellow-300 me-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                            className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <p className="ms-1 font-medium text-gray-500 dark:text-gray-400">
                            4.9/5 from 1,200+ reviews
                        </p>
                    </div>
                </div>
                <div className="relative flex items-center justify-end sm:mt-0 w-7/12">
                    <div className="absolute animate-bounce-slow bg-gradient-to-r from-teal-900 via-teal-600 to-teal-900 flex items-center gap-4 px-4 py-2 left-24 top-10">
                        <BsGraphUp className="h-8 w-8" />
                        <div className="">
                            <h4 className="text-lg">+145%</h4>
                            <p className="text-sm text-gray-400 text-nowrap">
                                Growth rate
                            </p>
                        </div>
                    </div>
                    <div className="absolute animate-bounce-slow bg-gradient-to-r from-teal-900 via-teal-600 to-teal-900 flex items-center gap-4 px-4 py-2 left-24 bottom-10">
                        <BsGraphUp className="h-8 w-8" />
                        <div className="">
                            <h4 className="text-lg">+145%</h4>
                            <p className="text-sm text-gray-400 text-nowrap">
                                Growth rate
                            </p>
                        </div>
                    </div>
                    <Image
                        className="flex justify-center"
                        src={'/assets/img/illustration-27.webp'}
                        alt="Illustration"
                        width={600}
                        height={600}
                    />
                    <div className="absolute animate-bounce-slow bg-gradient-to-r from-teal-900 via-teal-600 to-teal-900 flex items-center gap-4 px-4 py-2 right-0 top-10">
                        <BsGraphUp className="h-8 w-8" />
                        <div className="">
                            <h4 className="text-lg">+145%</h4>
                            <p className="text-sm text-gray-400 text-nowrap">
                                Growth rate
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
