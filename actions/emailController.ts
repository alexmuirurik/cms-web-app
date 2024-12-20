import { z } from "zod";
import { Resend } from "resend";
import { inviteWriterFormSchema } from "@/prisma/schema";
import GreetingsEmail from "@/components/emails/greetings";
import { createWriter } from "./userController";

export const resend = new Resend(process.env.RESEND_API_KEY ?? 'ddsds')

export const inviteWriter = async (Invitedata: z.infer<typeof inviteWriterFormSchema>) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [Invitedata.email],
            subject: 'Hello world',
            react: GreetingsEmail({ firstName: 'John' }),
        })
        if(error) throw(error) 
        const user = await createWriter(Invitedata)
        return user
    } catch (error) {
        console.log('Invite Writer Error: ' + error)
    }
}