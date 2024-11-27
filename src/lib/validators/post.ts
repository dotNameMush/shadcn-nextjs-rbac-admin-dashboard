import { z } from "zod";

export const PostValidator = z.object({
  title: z.string(),
  content: z.string(),
  topics: z.array(z.string()),
});
export type PostSchema = z.infer<typeof PostValidator>;
