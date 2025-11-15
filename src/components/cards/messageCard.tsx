'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'
import MessageBox from '../forms/messageBox'
import { Message, User } from '@prisma/client'
import { getDaysAgo } from '@/src/lib/utils'
import { useEffect, useState } from 'react'

const MessageCard = ({
    messages,
    users,
}: {
    messages: Message[]
    users: User[]
}) => {
    const [hash, setHash] = useState('')
    const user = users.find((user) => user.id === hash)

    useEffect(() => {
        const handleHashChange = () => {
            setHash(window.location.hash.replace('#', ''))
        }
        window.addEventListener('hashchange', handleHashChange)
        return () => {
            window.removeEventListener('hashchange', handleHashChange)
        }
    }, [])

    return (
        <Card className="bg-transparent p-0 md:w-8/12 lg:w-9/12">
            <CardHeader className="flex flex-row justify-between items-center border-b border-gray-300 p-2 ps-4">
                <div className="titles">
                    <CardTitle className="text-lg font-bold">
                        {hash ?? 'Start a conversation'}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                        <span className="flex h-2 w-2 rounded-full bg-teal-600" />
                        <span className="text-xs">
                            {getDaysAgo(user?.updatedAt ?? new Date())}
                        </span>
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="p-0 h-96"></CardContent>
            <CardFooter className="p-0">
                <MessageBox />
            </CardFooter>
        </Card>
    )
}

export default MessageCard
