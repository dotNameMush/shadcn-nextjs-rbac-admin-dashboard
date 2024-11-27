"use server";

import { db } from "@/lib/db";
import { decryptJWT, getSession } from "@/lib/jwt";
import { PostSchema } from "@/lib/validators/post";

export const updatePost = async (id: number, values: PostSchema) => {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        ...values,
      },
    });
    return {
      success: true,
      data: post,
    };
  } catch (err: any) {
    return { success: false, message: err.message ?? "Something went wrong!" };
  }
};
export const createPost = async (values: PostSchema) => {
  console.log(values);
  const session = await getSession();
  const user = await decryptJWT(session);
  if (!user) {
    return {
      success: false,
      message: "Not Logged In",
    };
  }
  const post = await db.post.create({
    data: {
      authorId: user.id,
      ...values,
    },
  });
  return {
    success: true,
    data: post,
  };
};
