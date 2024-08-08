import { Resend } from "resend";
import { sendVerificationEmail } from "./sendVerificationEmail";

export class Email {
  private static resend: Resend;

  private constructor() {
    // can not create object outside of the class
  }

  public static getInstance() {
    if (!this.resend) {
      Email.resend = new Resend(process.env.RESEND_API_KEY);
    }
    return Email.resend;
  }

  public sendVerificationEmail(to:string, verifyLink: string, exp: number) {
    return sendVerificationEmail(Email.resend, to, verifyLink, exp, "Echo");
  }
}
