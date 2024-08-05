import z from "zod";
import { signupBodySchema } from "../schemas";

export type signupBodyType = z.infer<typeof signupBodySchema>;
