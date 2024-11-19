"use server";

import { db } from "@/lib/db";
import { saveSession, signJWT } from "@/lib/jwt";
import { SignInSchema, SignUpSchema } from "@/lib/validators/auth-validators";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as argon from "argon2";

export const signIn = async (values: SignInSchema) => {
  try {
    const message = "Email or Password is incorrect, please try again!";
    const user = await db.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (!user) {
      return {
        success: false,
        message,
      };
    }
    const pwMatches = await argon.verify(user.hash, values.password);

    if (!pwMatches) {
      return {
        success: false,
        message,
      };
    }
    const token = await signJWT({
      id: user.id,
      email: user.email,
    });
    await saveSession(token);
    return {
      success: true,
      message: "Signed in",
    };
  } catch (err) {
    return {
      success: false,
      message: "Server error",
      error: JSON.stringify(err),
    };
  }
};

export const signUp = async (values: SignUpSchema) => {
  try {
    const hashedPassword = await argon.hash(values.password);
    const user = await db.user.create({
      data: {
        name: values.name,
        email: values.email,
        hash: hashedPassword,
      },
    });
    const token = await signJWT({
      id: user.id,
      email: user.email,
    });
    await saveSession(token);
    return {
      success: true,
      message: "Signed up",
    };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return {
          success: false,
          message: "Email is already in use",
        };
      }
    }
    throw err;
  }
};
