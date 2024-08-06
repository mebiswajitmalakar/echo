import { request, Request, Response } from "express";
import { loginBodyType, loginBodySchema } from "@mebiswajitmalakar/common";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { sign, Algorithm } from "jsonwebtoken";
import statusCodes from "../../utils/statusCodes";
import { getPrisma } from "../../db/connectDb";

export const loginRoute = async (req: Request, res: Response) => {
  const payload: loginBodyType = req.body;

  const validPayload: boolean = loginBodySchema.safeParse(payload).success;
  if (!validPayload) {
    return res.json({
      success: false,
      message: "Invalid inputs"
    }).status(statusCodes.bad_request);
  }

  const db: PrismaClient = getPrisma();

  let existingUser: { verified: boolean, password: string, name: string } | null = null;
  try {
    existingUser = await db.user.findUnique({
      where: {
        email: payload.email
      },
      select: {
        verified: true,
        password: true,
        name: true
      }
    });
  }
  catch(err) {
    return res.json({
      success: false,
      message: "Internal issue"
    }).status(statusCodes.internal_error);
  }

  if (!existingUser) {
    return res.json({
      success: false,
      message: "Account not found"
    }).status(statusCodes.unauthorized);
  }

  if (existingUser && !existingUser.verified) {
    return res.json({
      success: false,
      message: "You're not verified"
    }).status(statusCodes.unauthorized);
  }

  const passwordMatched: boolean = await compare(payload.password, existingUser.password);
  if (!passwordMatched) {
    return res.json({
      success: false,
      message: "Invalid password"
    }).status(statusCodes.unauthorized);
  }

  const expireOn: number = Math.floor(Date.now() + 1000 * 60 * 60 * 24 * 30);

  const token: string = sign({
    sub: payload.email,
    verified: existingUser.verified
  }, process.env.JWT_SECRET, {
    expiresIn: expireOn,
    algorithm: process.env.JWT_ALGORITHM as Algorithm
  });

  /*
  * Send an email using notify service of echo
  * required payload ?
  * email
  * notify about login
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
    message: "You're logged in"
  }).status(statusCodes.ok);
}
