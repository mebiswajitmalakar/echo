import { Resend } from "resend";
import { verifyEmailTemplate } from "../templates";

export const sendVerificationEmail = async (resend: Resend, to: string, link: string, exp: number, name: string) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_ADDRESS || "onboarding@resend.dev",
    to: to,
    subject: "Echo - Email Verification",
    html: verifyEmailTemplate("Echo", name, link, exp)
  });

  if (error) {
    return {
      success: false,
      err: error
    }
  }

  return {
    success: true,
    data: data
  }
}
