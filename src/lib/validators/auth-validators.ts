import { z } from "zod";

export const SignInValidator = z.object({
  email: z.string({ message: "This field is required" }).email(),
  password: z
    .string({ message: "This field is required" })
    .min(1, "This field is required"),
});
export const SignUpValidator = z.object({
  name: z.string({ message: "This field is required" }),
  email: z.string({ message: "This field is required" }).email(),
  password: z
    .string({ message: "This field is required" })
    .min(6, "Must have 6 or more characters")
    .regex(/[A-Z]/, "Must have Uppercase letter")
    .regex(/[0-9]/, "Must have atleast one number")
    .regex(/[\W_]/, "Must have atleast one special character"),
});

export type SignInSchema = z.infer<typeof SignInValidator>;
export type SignUpSchema = z.infer<typeof SignUpValidator>;
