'use client'

import { useRouter } from 'next/navigation'
import { Avatar, AvatarImage } from '../ui/avatar'
import { User } from '@prisma/client'

const UserCard = ({ user }: { user: User[] }) => {
    const router = useRouter()
    const hash = window.location.hash
    return user.map((user) => {
        const userId = hash.replace('#', '')
        const active = userId === user.id
        return (
            <div
                key={user.id}
                className={`flex ${active ? 'bg-gray-300' : 'hover:bg-gray-300'} gap-2 py-2 my-1 px-4 cursor-pointer rounded-none`}
                onClick={() => {
                    router.push(`#${user.id}`)
                }}
            >
                <Avatar className="w-7 h-7">
                    <AvatarImage
                        src={user?.image ?? '/assets/img/profile.png'}
                        alt=""
                    />
                </Avatar>
                <div className="space-y-1">
                    <h6 className="text-sm font-bold leading-none">
                        {user?.name ?? user.email}
                    </h6>
                    <p className="text-sm text-muted-foreground">
                        {user?.email}
                    </p>
                </div>
            </div>
        )
    })
}

export default UserCard
