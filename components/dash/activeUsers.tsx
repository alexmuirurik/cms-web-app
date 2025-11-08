import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from '@prisma/client'
import { getDaysAgo } from '@/lib/utils'

const ActiveUsers = ({ users }: { users: User[] }) => {
    return users.map((user) => (
        <div className="flex items-center gap-2 border-y mt-3 p-3">
            <Avatar className="w-10 h-10 rounded-full">
                <AvatarImage
                    className="rounded-full"
                    src={user.image ?? '/assets/img/profile.png'}
                    alt=""
                />
                <AvatarFallback className="text-neutral-500">
                    {user?.email?.substring(0, 2)}
                </AvatarFallback>
            </Avatar>
            <div className="items">
                <h5 className="font-bold text-sm">
                    {user?.name ?? user.email}
                </h5>
                <span className="text-xs">{getDaysAgo(user.updatedAt)}</span>
            </div>
        </div>
    ))
}

export default ActiveUsers
