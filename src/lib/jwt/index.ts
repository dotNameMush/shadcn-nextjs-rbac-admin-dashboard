"use server";
import { SignJWT, jwtVerify } from "jose";
import { JwtPayload } from "./types";
import { cookies } from "next/headers";
import { JWT_SESSION_KEY } from "@/config/constants";

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}
const encodedKey = new TextEncoder().encode(secretKey);
export const signJWT = async (payload: JwtPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
};
export const decryptJWT = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as JwtPayload;
  } catch (err) {
    return null;
  }
};
export const saveSession = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(JWT_SESSION_KEY, token);
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(JWT_SESSION_KEY);
};

export const getSession = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(JWT_SESSION_KEY)?.value;
};
