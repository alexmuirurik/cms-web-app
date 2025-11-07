import { WriterWithUser } from '@/prisma/types'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '../ui/avatar'

const ActiveUsers = ({ writers }: { writers: WriterWithUser[] }) => {
    const img = 'https://randomuser.me/api/portraits/med/men/2.jpg'
    return writers.map((writer) => (
        <div className="flex items-center gap-2 border-y mt-3 p-3">
            <Avatar className="w-10 h-10 rounded-full">
                <AvatarImage className='rounded-full' src={img} alt="" />
            </Avatar>
            <div className="items">
                <h5 className="font-bold text-sm">
                    {writer.user?.name ?? writer.email}
                </h5>
                <span className="text-xs">Last Seen: Yesterday</span>
            </div>
        </div>
    ))
}

export default ActiveUsers
