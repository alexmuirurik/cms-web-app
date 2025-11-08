import { Prisma, UserRole } from "@prisma/client"

export type SessionUser = {
    id: string
    name: string
    email: string
    role: UserRole
    companyId: string
}

export type WriterWithUser = Prisma.WriterGetPayload<{
    include: {
        user: true
    }
}>

export type InvoiceWithCompany = Prisma.InvoiceGetPayload<{
    include: {
        company: true,
        tasks: true
    }
}>

export type BillingWithCompany = Prisma.BillingGetPayload<{
    include: {
        company: true
    }
}>