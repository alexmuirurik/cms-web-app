'use client'
import { Avatar, AvatarImage } from '../ui/avatar'
import { WriterWithUser } from '@/prisma/types'
import { LoadingButton } from '../ui/loadingbtn'
import Link from 'next/link'

const WritersCard = ({ writers }: { writers: WriterWithUser[] }) => {
    return writers.map((writer) => (
        <Link
            key={writer.id}
            href={`/writers/${writer.id}`}
            className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-md shadow-sm"
        >
            <Avatar>
                <AvatarImage src={writer?.user?.image ?? '/assets/img/profile.png'} alt="" />
            </Avatar>
            <h4 className="text-base font-bold text-gray-800 mt-4">
                {writer?.user?.name ?? 'Writer Name'}
            </h4>
            <p className="font-bold text-xs text-center">Writer</p>
            <div className="flex gap-2 items-center justify-center mt-4">
                <div className="first rounded-md p-1 px-4">
                    <LoadingButton variant={'outline'} className="">
                        Invoices
                    </LoadingButton>
                </div>
                <div className="first rounded-md p-1 px-4">
                    <LoadingButton variant={'outline'} className="">
                        <span className="text-nowrap">Tasks</span>
                    </LoadingButton>
                </div>
            </div>
        </Link>
    ))
}

export default WritersCard
