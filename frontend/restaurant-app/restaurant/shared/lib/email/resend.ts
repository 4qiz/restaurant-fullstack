// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// interface SendEmailParams {
//   email: string;
//   subject: string;
//   html: string;
// }

// const sendEmail = async ({
//   email,
//   subject,
//   html,
// }: SendEmailParams): Promise<void> => {
//   const emailFrom = process.env.RESEND_FROM_EMAIL;
//   if (!emailFrom) {
//     throw new Error("RESEND_FROM_EMAIL is not set");
//   }

//   // DEV
//   if (process.env.NODE_ENV !== "production") {
//     console.log(`------ email:`, html);
//   }

//   await resend.emails.send({
//     to: email,
//     from: emailFrom,
//     subject,
//     html,
//   });
// };

// export const sendPasswordResetEmail = async (
//   email: string,
//   token: string
// ): Promise<void> => {
//   const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/account/new-password?token=${token}`;
//   const html = getPasswordResetHtml(confirmLink);

//   await sendEmail({
//     email,
//     subject: "Штаб | Сброс пароля",
//     html,
//   });
// };

// const getPasswordResetHtml = (link: string) => {
//   return `<!DOCTYPE html>
// <html lang="ru">
//   <head>
//     <meta charset="UTF-8" />
//     <title>Сброс пароля</title>
//   </head>
//   <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
//     <table width="100%" cellpadding="0" cellspacing="0">
//       <tr>
//         <td align="center" style="padding: 40px 0;">
//           <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
//             <tr>
//               <td align="center" style="padding-bottom: 24px;">

//                 <h1 style="margin: 0; font-size: 24px; color: #111827;">Сброс пароля</h1>

//               </td>
//             </tr>
//             <tr>
//               <td align="center" style="font-size: 16px; color: #374151; line-height: 1.6; padding-bottom: 24px;">

//                 Мы получили запрос на сброс пароля для вашей учетной записи Штаб. Если это были вы — нажмите на кнопку ниже, чтобы создать новый пароль.
//               </td>
//             </tr>
//             <tr>
//               <td align="center" style="padding-bottom: 32px;">
//                 <a
//                   href="${link}"
//                   style="
//                     display: inline-block;
//                     padding: 12px 24px;
//                     background-color: #688656;
//                     color: #ffffff;
//                     font-size: 16px;
//                     font-weight: 600;
//                     text-decoration: none;
//                     border-radius: 8px;
//                     box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);
//                   "
//                 >
//                   Сбросить пароль
//                 </a>
//               </td>
//             </tr>
//             <tr>
//               <td align="center" style="font-size: 14px; color: #6b7280; line-height: 1.5;">
//                 Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо — ваш пароль останется без изменений.

//               </td>
//             </tr>
//            <tr>
//               <td align="center" style="padding-top: 24px;">

//                  <h2 style="margin: 10; font-size: 16px; color: #111827;">ШТАБ | Ресто • кафе</h2>

//               </td>
//             </tr>
//           </table>
//         </td>
//       </tr>
//     </table>
//   </body>
// </html>`;
// };
