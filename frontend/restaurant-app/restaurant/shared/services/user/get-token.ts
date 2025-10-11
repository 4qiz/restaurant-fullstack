import { prisma } from "@/prisma/prisma-client";

export const getTokenByEmail = async (email: string) => {
  try {
    const token = await prisma.newPasswordToken.findFirst({
      where: {
        email,
      },
    });
    return token;
  } catch (error) {
    return null;
  }
};

export const getTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.newPasswordToken.findUnique({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};
