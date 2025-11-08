import { Role } from '@prisma/client'
import 'next-auth'

declare module 'next-auth' {
    interface User {
        id?: string
        role?: Role
        companyId?: string
    }

    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            role?: Role
            companyId?: string
        }
    }

    interface JWT {
        role?: Role
        companyId?: string
    }
}
