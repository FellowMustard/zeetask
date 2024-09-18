import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const tokenExist = await getVerificationTokenByToken(data.token);
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

    await db.user.update({
      where: { id: checkUser.id },
      data: { emailVerified: new Date(), email: tokenExist.email },
    });

    await db.verificationToken.delete({
      where: { id: tokenExist.id },
    });

    return NextResponse.json({ success: "Email Verified!" });
  } catch (err) {
    return NextResponse.json({ error: "Invalid Token!" }, { status: 400 });
  }
}
