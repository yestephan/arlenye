import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email().max(200),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

async function getRatelimit() {
  const { Ratelimit } = await import("@upstash/ratelimit");
  const { Redis } = await import("@upstash/redis");
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "1 h"),
  });
}

export async function POST(request: Request) {
  // Rate limiting (only when Upstash env vars are set)
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
    const ratelimit = await getRatelimit();
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

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

  if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: "contact@arlenye.com",
        to: process.env.CONTACT_EMAIL,
        replyTo: email,
        subject: `[arlenye.com] ${subject}`,
        text: `From: ${firstName} ${lastName} <${email}>\n\n${message}`,
      });
      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
      }
    } catch (err) {
      console.error("Resend exception:", err);
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }
  } else {
    console.log("Contact form submission:", { firstName, lastName, email, subject, message });
  }

  return NextResponse.json({ ok: true });
}
