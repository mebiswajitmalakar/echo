import z from "zod";
import { checkPassword } from "../utils";

export const loginBodySchema = z.object({
  email: z.string().email({message: "Invalid email"}),
  password: z.string().min(8, {message: "Password must be at least 8 characters long"})
    .refine((password: string) => checkPassword(password), {message: "Password must include uppercase, lowercase, number and special characters"})
})
