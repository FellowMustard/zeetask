import { db } from "@/lib/db";

export const get2FAConfirmationByUserId = async (userId: string) => {
  try {
    const twoFAConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });
    return twoFAConfirmation;
  } catch {
    return null;
  }
};
