import * as z from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Server name must be 4 characters long" }),
  imgUrl: z.string(),
});
