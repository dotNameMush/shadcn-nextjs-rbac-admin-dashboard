"use server";

import { revalidateTag } from "next/cache";

export const resetCache = async () => {
  revalidateTag("categories-and-tags");
};
