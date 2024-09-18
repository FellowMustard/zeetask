import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getResetTokenByEmail } from "@/data/resetToken";
import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { get2FATokenByEmail } from "@/data/2faToken";

export const generateVToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const tokenExist = await getVerificationTokenByEmail(email);

  if (tokenExist) {
    await db.verificationToken.delete({ where: { id: tokenExist.id } });
  }

  const vToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return vToken;
};

export const generateResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const tokenExist = await getResetTokenByEmail(email);

  if (tokenExist)
    await db.passwordResetToken.delete({ where: { id: tokenExist.id } });

  const resetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return resetToken;
};

export const generate2FAToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const tokenExist = await get2FATokenByEmail(email);

  if (tokenExist)
    await db.twoFactorToken.delete({
      where: { id: tokenExist.id },
    });

  const twoFAToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFAToken;
};
