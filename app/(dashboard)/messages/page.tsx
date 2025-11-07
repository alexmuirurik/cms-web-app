import PageHeader from '@/components/layouts/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { getCompany } from '@/actions/companyController'
import { redirect } from 'next/navigation'
import UserCard from '@/components/cards/userCard'
import { getWriters } from '@/actions/userController'
import MessageCard from '@/components/cards/messageCard'
import { getMessages } from '@/actions/emailController'

const Messages = async () => {
    const session = await auth()
    const company = await getCompany(session?.user?.id as string)
    if (!company) return redirect('/settings')

    const writers = (await getWriters(company.id)) ?? []
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
                        <UserCard user={writers} />
                    </CardContent>
                </Card>
				<MessageCard messages={messages} />
            </div>
        </div>
    )
}

export default Messages
