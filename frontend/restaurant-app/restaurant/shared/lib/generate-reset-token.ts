import { v4 as uuidv4 } from "uuid";
import { getTokenByEmail } from "../services/user/get-token";
import { prisma } from "@/prisma/prisma-client";

const EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + EXPIRATION_TIME);
  const existingToken = await getTokenByEmail(email);
  if (existingToken) {
    await prisma.newPasswordToken.delete({
      where: { token: existingToken.token },
    });
  }

  // cringe arhitecture (should be moved to services)
  const newToken = await prisma.newPasswordToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return newToken;
};
