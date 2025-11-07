'use server'
import { z } from "zod";
import { Resend } from "resend";
import { inviteWriterFormSchema } from "@/prisma/schema";
import GreetingsEmail from "@/components/emails/greetings";
import { createWriter } from "./userController";
import { getCompanyById } from "./companyController";

const resend = new Resend(process.env.RESEND_API_KEY)

export const inviteWriter = async (Invitedata: z.infer<typeof inviteWriterFormSchema>) => {
    try {
        const company = await getCompanyById(Invitedata.companyId)
        const { error } = await resend.emails.send({
            from: `${company?.title} <${company?.owner?.email}>`,
            to: [Invitedata.email],
            subject: 'Welcome to SlackApp',
            react: GreetingsEmail({ firstName: Invitedata.email }),
        })
        if(error) throw(error) 
        const user = await createWriter(Invitedata)
        return user
    } catch (error) {
        console.log(error)
    }
}