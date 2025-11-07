import { FaEllipsisV } from 'react-icons/fa'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Cloud, Github, LifeBuoy, LogOut } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

const MessageCard = () => {
    return (
        <Card className="bg-transparent p-0 md:w-8/12 lg:w-9/12">
            <CardHeader className="flex flex-row justify-between items-center border-b border-gray-300 p-2 ps-4">
                <div className="titles">
                    <CardTitle className="text-lg font-bold">
                        Brian Cox
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                        <span className="flex h-2 w-2 rounded-full bg-teal-600" />
                        Active
                    </CardDescription>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="border-0">
                        <Button variant="outline">
                            <FaEllipsisV />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="bg-transparent w-56 "
                        align="end"
                    >
                        <DropdownMenuItem className="hover:bg-gray-300 rounded-md">
                            <Github className="mr-2 h-4 w-4" />
                            <span>GitHub</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-300 rounded-md">
                            <LifeBuoy className="mr-2 h-4 w-4" />
                            <span>Support</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="hover:bg-gray-300 rounded-md"
                            disabled
                        >
                            <Cloud className="mr-2 h-4 w-4" />
                            <span>API</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
        </Card>
    )
}

export default MessageCard
