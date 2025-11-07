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
                <AvatarImage
                    src={writer?.user?.image ?? '/assets/img/profile.png'}
                    alt=""
                />
            </Avatar>
            <h4 className="text-base font-bold text-gray-800 mt-4">
                {writer?.user?.name ?? writer.email}
            </h4>
            <p className="font-bold text-xs text-center">Writer</p>
        </Link>
    ))
}

export default WritersCard
