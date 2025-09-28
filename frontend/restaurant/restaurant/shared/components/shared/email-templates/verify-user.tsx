export const VerifyUserEmailTemplate = (url: string) => {
  return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <title>Подтверждение электронной почты</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
            <tr>
              <td align="center" style="padding-bottom: 24px;">
                <h1 style="margin: 0; font-size: 24px; color: #111827;">Подтвердите вашу почту</h1>
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 16px; color: #374151; line-height: 1.6; padding-bottom: 24px;">
             
                Чтобы завершить регистрацию и активировать вашу учетную запись, подтвердите адрес электронной почты, нажав на кнопку ниже.
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 16px; color: #374151; line-height: 1.6; padding-bottom: 24px;">
                После подтверждения вы сможете войти в свой аккаунт Штаб
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom: 32px;">
                <a
                  href="${url}"
                  style="
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #688656;
                    color: #ffffff;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none;
                    border-radius: 8px;
                    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
                  "
                >
                  Подтвердить почту
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 14px; color: #6b7280; line-height: 1.5;">
                Если вы не регистрировались на нашем сайте, просто проигнорируйте это письмо.
              </td>
            </tr>
           <tr>
              <td align="center" style="padding-top: 24px;">
              
                 <h2 style="margin: 10; font-size: 16px; color: #111827;">ШТАБ | Ресто • кафе</h2>          

              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};
