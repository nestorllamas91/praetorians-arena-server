import { handleResponseSuccess } from '$root/utils/handlers';
import { HandlerResponseError } from '$root/utils/handlers';

import nodemailer from 'nodemailer';

export async function sendMail(req, res, next) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'nestorllamas91@gmail.com',
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        accessToken: process.env.OAUTH_ACCESS_TOKEN
      }
    });
    const mail = {
      from: `${req.body.name} <${req.body.email}>`,
      to: 'Néstor Llamas <nestorllamas91@gmail.com>',
      subject: req.body.subject,
      html: `<h1 className='heading1'>Praetorians Arena Contact Form</h1>
          <p>From: ${req.body.name} &lt;${req.body.email}&gt;</p>
          <p>Subject: ${req.body.subject}</p>
          <br />
          <p>${req.body.message.replace(/\r\n|\r|\n/g, '<br />')}</p>`
    };
    await transporter.sendMail(mail);
    handleResponseSuccess(res, null, __filename);
  } catch (err) {
    next(new HandlerResponseError(500, err, __filename));
  }
}
