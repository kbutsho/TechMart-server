import nodemailer from 'nodemailer';
import config from '../config';

export const emailSend = async (email: string, subject: string, verification_url: string) => {

  try {
    const transporter = nodemailer.createTransport({
      service: config.email_service,
      auth: {
        user: config.email_user,
        pass: config.email_pass
      }
    })
    const sent = await transporter.sendMail({
      from: `Tech Mart <${config.email_user}>`,
      to: email,
      subject: subject,
      html: `
            <p style="font-size: 18px; color: #333;">click the button below to verification process!</p>
            <a href="${verification_url}" target="_blank" style="display: inline-block; font-weight: bold; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">CLICK HERE</a>
        `
    })
    return sent
  } catch (error) {
    return error
  }
}