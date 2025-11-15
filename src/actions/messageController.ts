import prisma from '@/prisma/prisma'
import { SessionUser } from '@/prisma/types'
import { Editor, Message, User, UserRole, Writer } from '@prisma/client'
import { getCompanyById } from './companyController'
import { getEditorsByCompany, getWritersByCompany } from './userController'

export const getMessages = async (companyId: string): Promise<Message[] | undefined> => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                companyId: companyId,
            },
            include: {
                sender: true,
                receiver: true,
            },
        })
        return messages
    } catch (err) {
        console.log('We faced an error getting folder messages ' + err)
    }
}

export const getChatUsers = async (user: SessionUser, companyId: string): Promise<User[] | undefined> => {
    try {
        if (user.role !== UserRole.ADMIN) {
            if (user.role === UserRole.WRITER) {
                const company = await getCompanyById(companyId)
                const editors = await getEditorsByCompany(company?.id as string)

                const companyOwner = company?.owner ? [company.owner] : []
                const editorUsers = editors?.flatMap((editor) => editor.user ?? []) ?? []
                const allUsers = [...companyOwner, ...editorUsers]
                return allUsers
            }

            if (user.role === UserRole.EDITOR) {
                const company = await getCompanyById(companyId)
                const writers = await getWritersByCompany(company?.id as string)

                const companyOwner = company?.owner ? [company.owner] : []
                const writerUsers = writers?.flatMap((writer) => writer.user ?? []) ?? []
                const allUSers = [...companyOwner, ...writerUsers]
                return allUSers
            }
        }

        const company = await getCompanyById(companyId)
        const writers = await getWritersByCompany(company?.id as string)
        const editors = await getEditorsByCompany(company?.id as string)

        const writerUsers = writers?.flatMap((writer) => writer.user ?? []) ?? []
        const editorUsers = editors?.flatMap((editor) => editor.user ?? []) ?? []
        const allUsers = [...writerUsers, ...editorUsers]
        return allUsers
    } catch (err) {
        console.log('We faced an error getting users to chat ' + err)
    }
}
