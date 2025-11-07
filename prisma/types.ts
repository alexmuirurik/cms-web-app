import { Prisma } from "@prisma/client"

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