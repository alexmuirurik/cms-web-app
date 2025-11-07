import { z } from 'zod'
import prisma from '@/prisma/prisma'
import { inviteWriterFormSchema } from '@/prisma/schema'

export const getWriterByID = async (writerId: string) => {
    try {
        const writer = await prisma.writer.findUnique({
            where: {
                id: writerId,
            },
            include: {
                user: true,
            },
        })
        return writer
    } catch (error) {
        console.log('Error getting writer by ID: ' + error)
    }
}

export const getWriterByUserID = async (userId: string, companyId: string) => {
    try {
        const writer = await prisma.writer.findFirst({
            where: {
                userId: userId,
                companyId: companyId,
            },
        })
        return writer
    } catch (error) {
        console.log('Error Getting Writer By User Id: ' + error)
    }
}

export const getWriterByEmail = async (email: string, companyId: string) => {
    try {
        const writer = await prisma.writer.findFirst({
            where: {
                email: email,
                companyId: companyId,
            },
        })
        return writer
    } catch (error) {
        console.log('Error Getting Writer By Email: ' + error)
    }
}

export const getWriters = async (companyId: string) => {
    try {
        const writers = await prisma.writer.findMany({
            where: {
                companyId: companyId,
            },
            include: {
                user: true,
            },
        })
        return writers
    } catch (error) {
        console.log('Getting Writers Error: ' + error)
    }
}

export const updateWriter = async (
    writerId: string,
    data: z.infer<typeof inviteWriterFormSchema>
) => {
    try {
        const updatedwriter = await prisma.writer.update({
            where: {
                id: writerId,
            },
            data: data,
        })
        return updatedwriter
    } catch (error) {
        console.log('Updating Writer Error: ' + error)
    }
}

export const createWriter = async (
    data: z.infer<typeof inviteWriterFormSchema>
) => {
    try {
        const writer = await getWriterByEmail(data.email, data.companyId)
        if (writer) return await updateWriter(writer.id, data)
        const createdwriter = await prisma.writer.create({ data })
        return createdwriter
    } catch (error) {
        console.log('Error creating writer ' + error)
    }
}
