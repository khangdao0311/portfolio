import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { env } from "@/config/env.server";

export async function POST(request: NextRequest) {
  try {
    const { subject, html } = await request.json();

    const transporter = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secure: false,
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: env.MAIL_USER,
      to: env.MAIL_TO,
      subject,
      html,
    });

    return NextResponse.json({
      status: 200,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Send mail error:", error);
    return NextResponse.json({ status: 500, message: "Failed to send email" });
  }
}
