import type { NextApiRequest, NextApiResponse } from 'next';

// import { getToken } from 'next-auth/jwt';
import Mailgun from 'mailgun.js';

export type SendStatus = {
  success: boolean;
  message: string;
};

/*
 * POST Request: Send a template to a mailing list using the Mailgun API.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SendStatus | null>
) {

  if (req.method !== 'POST') {
    res.status(405);
    res.send(null);
    return;
  }

  // TODO auth
  // const token = await getToken({ req });

  // if (!token || !token.email) {
  //   res.status(401);
  //   res.send(null);
  //   return;
  // }

  // TODO actually send the desired template to the desired mailing list
  const templateId = req.body.templateId;
  const mailingListId = req.body.mailingListId;
  console.log(`Sending template ${templateId} to mailing list ${mailingListId}`);

  
  // This is for testing
  const message = req.body.message;
  const emailAddresses = req.body.emailAddresses;

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || "" });

  try {
    // Recipient variables are used to send personalized emails to each recipient
    // They could be used for templating
    // But right now they're just being used so it doesn't show every recipient's email address in the "to" field
    let recipientVariables: any = {};
    for (const email of emailAddresses) {
      recipientVariables[email] = { "a": 0 };
    }

    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN || "", {
      from: "TAMUhack <hello@tamuhack.com>",  // TODO use a name configured in the Project settings
      to: emailAddresses,
      subject: "Test Email from Relay!",
      text: message,
      html: `<h1>${message}</h1><p>Relay go brrrr</p>`,
      "recipient-variables": JSON.stringify(recipientVariables),
    });
    console.log(response);
    res.status(200);
    res.send({ success: true, message: "Email sent!" });
    // TODO the sender and all admins should get an confirmation email that the email was sent
    // They should be notified of job status, sweeping changes, etc.
  }
  catch (e) {
    console.error(e);
    res.status(500);
    res.send(null);
    return;
  }
}
