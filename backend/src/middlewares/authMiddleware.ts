import { Request, Response } from "express";
import { verify, Algorithm, JwtPayload } from "jsonwebtoken";
import statusCodes from "../utils/statusCodes";

export const authTokenCheck = async (req: Request, res: Response, next: any) => {
  const cookies: Record<string, string> | null = req.cookies;
  if (cookies && cookies.user_token) {
    let token: string = decodeURIComponent(cookies.user_token);
    token = token.split(" ")[1];

    try {
      const decoded: JwtPayload | null = verify(token, process.env.JWT_SECRET, {
        algorithms: [process.env.JWT_ALGORITHM as Algorithm],
        ignoreExpiration: false,
        complete: true
      });

      return res.json({
        success: true,
        message: "You're already verified"
      }).status(statusCodes.ok)
    }
    catch(err) {
      next();
      return;
    }
  }

  next();
}
