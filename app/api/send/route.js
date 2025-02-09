import { EmailTemplate } from '../../_components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    const response = await req.json();
    try {
        const { data, error } = await resend.emails.send({
            from: 'ZenShare@resend.dev',
            to: ['dassoumyadipta007@gmail.com'],
            subject: 'Hello world',
            react: EmailTemplate({ firstName: 'John' }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error });
      }
}
