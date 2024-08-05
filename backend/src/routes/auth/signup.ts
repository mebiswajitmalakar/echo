import {Request, Response} from "express";
import { signupBodyType, signupBodySchema } from "@mebiswajitmalakar/common";
import { PrismaClient } from "@prisma/client";
import { hash, genSalt } from "bcrypt";
import { sign, Algorithm } from "jsonwebtoken";
import statusCodes from "../../utils/statusCodes";
import { getPrisma } from "../../db/connectDb";

export const signupRoute = async (req: Request, res: Response) => {
  const payload: signupBodyType = req.body;

  const validPayload: boolean = signupBodySchema.safeParse(payload).success;
  if (!validPayload) {
    return res.json({
      success: false,
      message: "Invalid inputs"
    }).status(statusCodes.bad_request);
  }

  const db: PrismaClient = getPrisma();

  let existingUser: { verified: boolean } | null = null;
  try {
    existingUser = await db.user.findUnique({
      select: {
        verified: true
      },
      where: {
        email: payload.email
      }
    });
  }
  catch (err) {
    return res.json({
      success: false,
      message: "Internal error"
    }).status(statusCodes.internal_error)
  }

  if (existingUser && existingUser.verified) {
    return res.json({
      success: false,
      message: "Email is taken"
    }).status(statusCodes.unauthorized)
  }

  const hashedPassword: string = await hash(payload.password, await genSalt(10));

  try {
    await db.user.upsert({
      where: {
        email: payload.email
      },
      update: {
        password: hashedPassword,
        name: payload.name
      },
      create: {
        email: payload.email,
        password: hashedPassword,
        name: payload.name
      }
    });
  }
  catch (err) {
    return res.json({
      success: false,
      message: "Internal error"
    }).status(statusCodes.internal_error)
  }

  const expireOn: number = Math.floor(Date.now() + 1000 * 60 * 60 * 24 * 30);

  const token = sign({
    sub: payload.email,
    name: payload.name
  }, process.env.JWT_SECRET, {
    expiresIn: expireOn,
    algorithm: process.env.JWT_ALGORITHM as Algorithm
  });

  /* TODO
  Send an email to user using notify service of echo
  required payload ?
    - email
    - token
    - expireOn
  */

  res.cookie("user_token", encodeURIComponent(`Bearer ${token}`), {
    httpOnly: true,
    expires: new Date(expireOn),
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  return res.json({
    success: true,
    message: "You're signed up"
  }).status(statusCodes.ok);
}
