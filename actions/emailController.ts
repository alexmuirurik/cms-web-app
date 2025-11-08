'use server'
import { z } from 'zod'
import { Resend } from 'resend'
import { inviteWriterFormSchema } from '@/prisma/schema'
import GreetingsEmail from '@/components/emails/greetings'
import { createWriter } from './userController'
import { getCompanyById } from './companyController'
import prisma from '@/prisma/prisma'

const resend = new Resend(process.env.AUTH_RESEND_KEY)

export const inviteWriter = async (
    Invitedata: z.infer<typeof inviteWriterFormSchema>
) => {
    try {
        const company = await getCompanyById(Invitedata.companyId)
        const { error } = await resend.emails.send({
            from: `${company?.title} <${process.env.ADMIN_EMAIL}>`,
            to: [Invitedata.email],
            subject: 'Welcome to SlackApp',
            react: GreetingsEmail({ firstName: Invitedata.email }),
        })
        if (error) throw error
        const user = await createWriter(Invitedata)
        return user
    } catch (error) {
        console.log(error)
    }
}

export const getMessages = async (companyId: string, userId: string) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                companyId: companyId,
                OR: [
                    {
                        senderId: userId,
                    },
                    {
                        receiverId: userId,
                    },
                ],
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
