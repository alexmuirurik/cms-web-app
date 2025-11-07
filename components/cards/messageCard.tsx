'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import MessageBox from '../forms/messageBox'
import { Message } from '@prisma/client'

const MessageCard = ({ messages }: { messages: Message[] }) => {
    return (
        <Card className="bg-transparent p-0 md:w-8/12 lg:w-9/12">
            <CardHeader className="flex flex-row justify-between items-center border-b border-gray-300 p-2 ps-4">
                <div className="titles">
                    <CardTitle className="text-lg font-bold">
                        Start a conversation
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                        <span className="flex h-2 w-2 rounded-full bg-teal-600" />
                        <span className='text-xs'>Status</span>
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="p-0 h-96">
                        
            </CardContent>
            <CardFooter className='p-0'>
                <MessageBox /> 
            </CardFooter>
        </Card>
    )
}

export default MessageCard
