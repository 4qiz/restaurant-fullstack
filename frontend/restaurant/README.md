This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Create a `.env` file and insert
your key/value pairs

```sh
NEXT_PUBLIC_BASE_URL=""

POSTGRES_URL=""
NEXT_PUBLIC_API_URL=""

NEXT_PUBLIC_DADATA_TOKEN=""

RESEND_API_KEY=""
RESEND_FROM_EMAIL=""

YOOKASSA_API_KEY=""
YOOKASSA_STORE_ID=""
YOOKASSA_CALLBACK_URL=""
YOOKASSA_PAYMENT_URL=""

NEXTAUTH_SECRET=""

GITHUB_ID=""
GITHUB_SECRET=""

GOOGLE_ID=""
GOOGLE_SECRET=""
```

## Сервисы

Настройка используемых сервисов:

- [yookassa](https://yookassa.ru/my/merchant/integration/http-notifications) - HTTP-уведомления, указать {BASE_URL} + /api/checkout/callback
- [Resend](https://resend.com) - Подтвердить домен
- [GitHub](https://github.com) - Настроить OAuth, указать {BASE_URL}
- [Google](console.cloud.google.com/apis/dashboard) - Настроить OAuth, указать {BASE_URL}
