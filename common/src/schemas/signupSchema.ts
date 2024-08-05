import z from "zod";
import {checkPassword} from "../utils";

export const signupBodySchema = z.object({
  email: z.string().email({message: "Invalid email address"}),
  name: z.string().min(1, {message: "Name can not be empty"}),
  password: z.string().min(8, {message: "Password must be at least 8 characters long"})
    .refine((password: string) => checkPassword(password), {message: "Password must include uppercase, lowercase, number and special characters"})
})
