import { db } from "@/lib/db";

export const get2FATokenByToken = async (token: string) => {
  try {
    const twoFAToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFAToken;
  } catch {
    return null;
  }
};

export const get2FATokenByEmail = async (email: string) => {
  try {
    const twoFAToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFAToken;
  } catch {
    return null;
  }
};
