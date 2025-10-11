'use server';

import {prisma} from '@/prisma/prisma-client';
// import { sendEmail } from "@/shared/lib/send-email";
//  import { VerifyUserEmailTemplate } from
//  "@/shared/components/shared/email-templates/verify-user";
import {getUserSession} from '@/shared/lib/get-user-session';
import {Prisma} from '@prisma/client';
import {hashSync} from 'bcrypt';

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      // if (!user.verified) {
      //   throw new Error("Почта не подтверждена");
      // }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        fullName: body.fullName,
        password: hashSync(body.password, 10),
        verified: new Date(),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    // await sendEmail(
    //   createdUser.email,
    //   "Штаб | Подтверждение регистрации",
    //   VerifyUserEmailTemplate(
    //     `${baseUrl}/api/auth/verify?code=${code}`
    //     // code: code,
    //   )
    // );
  } catch (error) {
    console.log('Error [CREATE_USER]', error);
    throw error;
  }
}

export async function updateUserInfo(fullName: string) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден в сессии');
    }

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });
    if (!user) {
      throw new Error('Пользователь не найден в бд');
    }

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        fullName: fullName,
      },
    });
  } catch (error) {
    console.log('Error [UPDATE_USER]', error);
    throw error;
  }
}
