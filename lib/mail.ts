import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-pass?token=${token}`;
  await resend.emails.send({
    from: "ZeeTask <onboarding@resend.dev>",
    to: email,
    subject: "ZeeTask Password Reset Confirmation",
    html: `<p>Click <a href="${confirmLink}">here</a> to reset password!</p>`,
  });
};

export const sendVEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/verification?token=${token}`;
  await resend.emails.send({
    from: "ZeeTask <onboarding@resend.dev>",
    to: email,
    subject: "ZeeTask Email Confirmation",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email!</p>`,
  });
};

export const send2FAEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "ZeeTask <onboarding@resend.dev>",
    to: email,
    subject: "ZeeTask Two-Factor Authentication (2FA) Code",
    html: `<p>Your 2FA code is: <b>${token}</b>, For your security, never share this code with anyone. </p>`,
  });
};
