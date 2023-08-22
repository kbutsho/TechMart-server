// import nodemailer from 'nodemailer';
// import config from '../config';

// export const sendEmail = async (email: string, subject: string, link: string) => {

//   try {
//     const transporter = nodemailer.createTransport({
//       service: config.email_service,
//       auth: {
//         user: config.email_user,
//         pass: config.email_pass
//       }
//     })

//     const sent = await transporter.sendMail({
//       from: config.email_user,
//       to: email,
//       subject: subject,
//       html: `
//             <p style="font-size: 16px; color: #333;">Click the button below to access the link:</p>
//             <a href="${link}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Access Link</a>
//         `
//     })
//     console.log(sent)
//   } catch (error) {
//     console.log(error)
//     console.log("email not sent")
//   }
// }