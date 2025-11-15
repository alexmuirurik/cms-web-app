import PageHeader from '@/src/components/layouts/PageHeader'
import { Card, CardContent, CardHeader } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'
import { auth } from '@/auth'
import { getCompanyById } from '@/src/actions/companyController'
import { redirect } from 'next/navigation'
import UserCard from '@/src/components/cards/userCard'
import { getWriters } from '@/src/actions/userController'
import MessageCard from '@/src/components/cards/messageCard'
import { getMessages } from '@/src/actions/emailController'
import { getChatUsers } from '@/src/actions/messageController'
import { SessionUser } from '@/prisma/types'

const Messages = async () => {
    const session = await auth()
    const company = await getCompanyById(session?.user?.companyId as string)
    if (!company) return redirect('/settings')

    const chatUsers = (await getChatUsers(session?.user as SessionUser, company.id)) ?? []
    const messages = (await getMessages(company.id, session?.user?.id as string)) ?? []

    return (
        <div className="page-wrapper">
            <PageHeader title="Messages" description="540+">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        className="bg-transparent focus-within:!ring-0 border text-sm !w-full ps-5 py-2"
                        placeholder="Search"
                    />
                    <Button className="w-full bg-teal-500 hover:bg-teal-700">
                        <span className="text-white text-nowrap">
                            Compose a Message
                        </span>
                    </Button>
                </div>
            </PageHeader>
            <div className="page-body md:flex gap-2">
                <Card className="bg-transparent p-0 md:w-4/12 lg:w-3/12">
                    <CardHeader className="p-2">
                        <Input placeholder="Search" />
                    </CardHeader>
                    <CardContent className="p-0">
                        <UserCard user={chatUsers} />
                    </CardContent>
                </Card>
				<MessageCard messages={messages} users={chatUsers} />
            </div>
        </div>
    )
}

export default Messages
