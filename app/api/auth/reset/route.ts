import { getUserByEmail } from "@/data/user";
import { sendResetEmail } from "@/lib/mail";
import { generateResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const validateFields = ResetSchema.safeParse(data);

  if (!validateFields.success)
    return NextResponse.json({ error: "Invalid Fields!" }, { status: 400 });

  const { email } = validateFields.data;
  const userExist = await getUserByEmail(email);

  if (!userExist) {
    return NextResponse.json({ error: "Email not found!" }, { status: 404 });
  }

  const resetToken = await generateResetToken(userExist.email);
  await sendResetEmail(resetToken.email, resetToken.token);

  return NextResponse.json({
    success: "Reset Email Sent, Please Check Your Email!",
  });
}
