import { getUserByEmail } from "@/data/user";
import { RegisterSchema } from "@/schemas";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { generateVToken } from "@/lib/tokens";
import { sendVEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validateFields = RegisterSchema.safeParse(data);

    if (!validateFields.success) {
      return NextResponse.json({ error: "Invalid Fields!" }, { status: 400 });
    }
    const { email, password, name } = validateFields.data;
    const existingUser = await getUserByEmail(email);

    if (existingUser)
      return NextResponse.json(
        { error: "Email already in use!" },
        { status: 409 }
      );

    const hashedPass = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPass,
      },
    });

    const vToken = await generateVToken(email);
    await sendVEmail(vToken.email, vToken.token);

    return NextResponse.json({ success: "Confirmation email sent!" });
  } catch (err) {
    return NextResponse.json({ error: "Invalid Fields!" }, { status: 400 });
  }
}
