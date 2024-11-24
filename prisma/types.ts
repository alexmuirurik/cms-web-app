import { Prisma } from "@prisma/client"

export type WriterWithUser = Prisma.WriterGetPayload<{
    include: {
        user: true
    }
}>