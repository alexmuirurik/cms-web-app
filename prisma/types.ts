import { Prisma, UserRole } from '@prisma/client'

export type SessionUser = {
    id: string
    name?: string | null | undefined
    email?: string | null | undefined
    image?: string | undefined
    role?: any
    companyId?: string | undefined
}

export type WriterWithUser = Prisma.WriterGetPayload<{
    include: {
        user: true
    }
}>

export type InvoiceWithCompany = Prisma.InvoiceGetPayload<{
    include: {
        company: true
        tasks: true
    }
}>

export type BillingWithCompany = Prisma.BillingGetPayload<{
    include: {
        company: true
    }
}>
