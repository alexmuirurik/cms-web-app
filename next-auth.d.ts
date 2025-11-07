import { Role } from '@prisma/client'
import 'next-auth'

declare module 'next-auth' {
    interface User {
        id?: string
        role?: Role
    }

    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            role?: Role
        }
    }

    interface JWT {
        role?: Role
    }
}
