import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const vToken = await db.verificationToken.findUnique({ where: { token } });
    return vToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const vToken = await db.verificationToken.findFirst({ where: { email } });
    return vToken;
  } catch {
    return null;
  }
};
