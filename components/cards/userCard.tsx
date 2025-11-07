import { User, Writer } from '@prisma/client'
import { Avatar, AvatarImage } from '../ui/avatar'
import { WriterWithUser } from '@/prisma/types'

const UserCard = ({ user }: { user: WriterWithUser[] }) => {
    return user.map(writer => (
        <div
            key={writer.id}
            className="flex hover:bg-gray-300 rounded-md gap-2 py-2 my-1 px-4 cursor-pointer"
        >
            <Avatar className="w-7 h-7">
                <AvatarImage
                    src={writer?.user?.image ?? '/assets/img/profile.png'}
                    alt=""
                />
            </Avatar>
            <div className="space-y-1">
                <h6 className="text-sm font-bold leading-none">{writer?.user?.name}</h6>
                <p className="text-sm text-muted-foreground">{writer?.user?.email}</p>
            </div>
        </div>
    ))
}

export default UserCard
