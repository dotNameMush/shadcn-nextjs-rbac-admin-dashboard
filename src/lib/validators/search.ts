import { z } from "zod";

export const SearchValidator = z.object({
  search: z.string(),
});
export type SearchSchema = z.infer<typeof SearchValidator>;
