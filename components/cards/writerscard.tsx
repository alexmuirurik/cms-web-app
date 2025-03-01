'use client'
import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { WriterWithUser } from '@/prisma/types'
import { LoadingButton } from '../ui/loadingbtn'
import Link from 'next/link'

const WritersCard = ({ writers }: { writers: WriterWithUser[] }) => {
    return writers.map((writer) => {
        return (
            <Link
                href={`/writers/${writer.id}`} 
                className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-md shadow-sm"
            >
                <Avatar>
                    <AvatarImage src={writer.user.image as string} />
                </Avatar>
                <h4 className="text-base font-bold text-gray-800 mt-4">
                    {writer.user.name}
                </h4>
                <p className="font-bold text-xs">Writer at Novica Co.</p>
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
        )
    })
}

export default WritersCard
