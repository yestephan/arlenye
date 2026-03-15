import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { firstName, lastName, email, subject, message } = await request.json();

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "contact@arlenye.com",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `[arlenye.com] ${subject}`,
      text: `From: ${firstName} ${lastName} <${email}>\n\n${message}`,
    });
  } else {
    console.log("Contact form submission:", { firstName, lastName, email, subject, message });
  }

  return NextResponse.json({ ok: true });
}
