// import { Resend } from "resend";

// export const sendEmail = async (
//   to: string,
//   subject: string,
//   template?: string
// ) => {
//   const resend = new Resend(process.env.RESEND_API_KEY);
//   const fromEmail = process.env.RESEND_FROM_EMAIL;
//   if (!fromEmail) {
//     throw new Error("No from email provided");
//   }

//   const { data, error } = await resend.emails.send({
//     from: fromEmail,
//     to,
//     subject,
//     text: "",
//     html: template,
//   });

//   if (error) {
//     throw error;
//   }

//   return data;
// };
