import { Resend } from 'resend';
import GreetingsEmail from '@/src/components/emails/greetings';

const resend = new Resend(process.env.AUTH_RESEND_KEY)
export const POST = async () => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['delivered@resend.dev'],
            subject: 'Hello world',
            react: GreetingsEmail({ firstName: 'John' }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
