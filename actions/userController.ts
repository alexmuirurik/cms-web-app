import { z } from 'zod'
import prisma from '@/prisma/prisma'
import { inviteWriterFormSchema } from '@/prisma/schema'

export const getUserById = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })
        return user
    } catch (err) {
        console.log('We faced an error getting a user ' + err)
    }
}

export const getWritersByCompany = async (companyId: string) => {
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
    } catch (err) {
        console.log('We faced an error getting folder writers ' + err)
    }
}

export const getEditorById = async (editorId: string) => {
    try {
        const editor = await prisma.editor.findUnique({
            where: {
                id: editorId,
            },
            include: {
                user: true,
            },
        })
        return editor
    } catch (err) {
        console.log('We faced an error getting a single editor ' + err)
    }
}

export const getEditorsByCompany = async (companyId: string) => {
    try {
        const editors = await prisma.editor.findMany({
            where: {
                companyId: companyId,
            },
            include: {
                user: true,
            },
        })
        return editors
    } catch (err) {
        console.log('We faced an error getting folder editors ' + err)
    }
}

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

export const getWriterAccountsByUserID = async (userId: string) => {
    try {
        const accounts = await prisma.account.findMany({
            where: {
                userId: userId,
            },
            include: {
                user: true,
            },
        })
        return accounts
    } catch (error) {
        console.log('Error getting writer accounts by ID: ' + error)
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

export const getWriterByEmail = async (email: string) => {
    try {
        const writer = await prisma.writer.findFirst({
            where: {
                email: email,
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
        const writer = await getWriterByEmail(data.email)
        if (writer) return await updateWriter(writer.id, data)
        const createdwriter = await prisma.writer.create({ data })
        return createdwriter
    } catch (error) {
        console.log('Error creating writer ' + error)
    }
}
