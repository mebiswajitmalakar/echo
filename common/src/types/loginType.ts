import { loginBodySchema } from "../schemas";
import z from "zod";

export type loginBodyType = z.infer<typeof loginBodySchema>;
