import Email from '@/components/Emailer/Email';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { uid, email, seed, note, amount } = req.body

    const { data, error } = await resend.emails.send({
        // from: 'Degenlink <gm@degenlink.io>',
        from: "DEVESH <send@deveshb.tech>",
        to: [email],
        subject: "You've been served some HIGHER",
        react: Email({ uid, seed, note, amount }),
    });

    if (error) {
        return res.status(400).json(error);
    }

    res.status(200).json(data);
};

export default handler