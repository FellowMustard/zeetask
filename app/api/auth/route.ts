import { signIn } from "@/auth";
import { get2FAConfirmationByUserId } from "@/data/2faConfirmation";
import { get2FATokenByEmail } from "@/data/2faToken";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { send2FAEmail, sendVEmail } from "@/lib/mail";
import { generate2FAToken, generateVToken } from "@/lib/tokens";
import { DEFAULT_CLIENT_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validateFields = LoginSchema.safeParse(data);

    if (!validateFields.success) {
      return NextResponse.json({ error: "Invalid Fields!" }, { status: 400 });
    }

    const { email, password, code } = validateFields.data;

    const existUser = await getUserByEmail(email);

    if (!existUser || !existUser.email || !existUser.password) {
      return NextResponse.json(
        { error: "Wrong Email / Password!" },
        { status: 401 }
      );
    }

    if (!existUser.emailVerified) {
      const vToken = await generateVToken(existUser.email);
      await sendVEmail(vToken.email, vToken.token);
      return NextResponse.json(
        { error: "Email is not verified! Please check your email!" },
        { status: 401 }
      );
    }

    if (existUser.is2FA && existUser.email) {
      if (code) {
        const twoFAToken = await get2FATokenByEmail(existUser.email);

        if (!twoFAToken || twoFAToken.token !== code)
          return NextResponse.json(
            { error: "Invalid 2FA Code!" },
            { status: 401 }
          );

        const hasExpired = new Date(twoFAToken.expires) < new Date();
        if (hasExpired)
          return NextResponse.json(
            { error: "Code Already Expired!" },
            { status: 401 }
          );

        await db.twoFactorToken.delete({
          where: { id: twoFAToken.id },
        });

        const twoFAConfirmation = await get2FAConfirmationByUserId(
          existUser.id
        );

        if (twoFAConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: { id: existUser.id },
          });
        }

        await db.twoFactorConfirmation.create({
          data: {
            userId: existUser.id,
          },
        });
      } else {
        const twoFAToken = await generate2FAToken(existUser.email);
        await send2FAEmail(twoFAToken.email, twoFAToken.token);
        return NextResponse.json({ twoFA: true });
      }
    }

    await signIn("credentials", { email, password, redirect: false });

    return NextResponse.json({
      success: "Sign In!",
      redirect: DEFAULT_CLIENT_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return NextResponse.json(
            { error: "Wrong Email / Password!" },
            { status: 401 }
          );
        case "AccessDenied":
          return NextResponse.json(
            { error: "Access Denied!" },
            { status: 401 }
          );
      }
    }

    return NextResponse.json({ error: "Invalid Fields!" }, { status: 400 });
  }
}
