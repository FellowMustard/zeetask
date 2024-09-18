import * as z from "zod";

export const NewPassSchema = z
  .object({
    password: z.string().min(6, {
      message: "Minimum 6 characters required!",
    }),
    confirmPassword: z.string().min(6, {
      message: "Minimum 6 characters required!",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password did not match!",
    path: ["confirmPassword"],
  });

export const ResetSchema = z.object({
  email: z.string().email(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required!" }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
  name: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
});
