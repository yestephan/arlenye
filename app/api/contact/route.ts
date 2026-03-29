import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email().max(200),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

export async function POST(request: Request) {
  // Parse + validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid fields." }, { status: 422 });
  }

  const { firstName, lastName, email, subject, message } = result.data;

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && process.env.CONTACT_EMAIL) {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.CONTACT_EMAIL,
        replyTo: email,
        subject: `[arlenye.com] ${subject}`,
        text: `From: ${firstName} ${lastName} <${email}>\n\n${message}`,
      });
    } catch (err) {
      console.error("Mail error:", err);
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }
  } else {
    console.log("Contact form submission:", { firstName, lastName, email, subject, message });
  }

  return NextResponse.json({ ok: true });
}
