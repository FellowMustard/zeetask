import { getResetTokenByToken } from "@/data/resetToken";
import { getUserByEmail } from "@/data/user";
import { NewPassSchema } from "@/schemas";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { password, confirmPassword, token } = data;

    const validateFields = NewPassSchema.safeParse({
      password,
      confirmPassword,
    });

    if (!validateFields.success) {
      return NextResponse.json({ error: "Invalid Fields!" }, { status: 400 });
    }

    const tokenExist = await getResetTokenByToken(token);
    if (!tokenExist)
      return NextResponse.json({ error: "Token not found!" }, { status: 404 });

    const hasExpired = new Date(tokenExist.expires) < new Date();
    if (hasExpired)
      return NextResponse.json(
        { error: "Token already expired!" },
        { status: 401 }
      );

    const checkUser = await getUserByEmail(tokenExist.email);
    if (!checkUser)
      return NextResponse.json(
        { error: "Email does not exist!" },
        { status: 404 }
      );

    const hashedPass = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: checkUser.id },
      data: { password: hashedPass },
    });

    await db.passwordResetToken.delete({
      where: { id: tokenExist.id },
    });

    return NextResponse.json({ success: "Password Successfully Changed!" });
  } catch (err) {
    return NextResponse.json({ error: "Invalid Token!" }, { status: 400 });
  }
}
