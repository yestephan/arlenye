import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { firstName, lastName, email, subject, message } = await request.json();

  // To enable email sending:
  // 1. Sign up at resend.com and get an API key
  // 2. Add RESEND_API_KEY and CONTACT_EMAIL to .env.local
  // 3. Uncomment the block below

  /*
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "contact@yourdomain.com",
    to: process.env.CONTACT_EMAIL!,
    subject: `[arlenye.com] ${subject}`,
    text: `From: ${firstName} ${lastName} <${email}>\n\n${message}`,
  });
  */

  // For now, log to console (dev mode)
  console.log("Contact form submission:", { firstName, lastName, email, subject, message });

  return NextResponse.json({ ok: true });
}
