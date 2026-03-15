"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/40";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex gap-6">
        <div className="flex-1">
          <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
            First Name
          </label>
          <input
            {...register("firstName", { required: true })}
            className={inputClass}
          />
          {errors.firstName && (
            <p className="text-[10px] text-destructive mt-1 tracking-wide">Required</p>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
            Last Name
          </label>
          <input
            {...register("lastName", { required: true })}
            className={inputClass}
          />
          {errors.lastName && (
            <p className="text-[10px] text-destructive mt-1 tracking-wide">Required</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          Email Address
        </label>
        <input
          type="email"
          {...register("email", { required: true })}
          className={inputClass}
        />
        {errors.email && (
          <p className="text-[10px] text-destructive mt-1 tracking-wide">Required</p>
        )}
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          Subject
        </label>
        <input
          {...register("subject", { required: true })}
          className={inputClass}
        />
        {errors.subject && (
          <p className="text-[10px] text-destructive mt-1 tracking-wide">Required</p>
        )}
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          Message
        </label>
        <textarea
          rows={5}
          {...register("message", { required: true })}
          className={inputClass}
        />
        {errors.message && (
          <p className="text-[10px] text-destructive mt-1 tracking-wide">Required</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="text-xs uppercase tracking-widest border border-foreground px-6 py-2.5 hover:bg-foreground hover:text-background transition-colors disabled:opacity-40"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>

      {status === "sent" && (
        <p className="text-xs text-muted-foreground tracking-wide">Message sent. Thank you.</p>
      )}
      {status === "error" && (
        <p className="text-xs text-destructive tracking-wide">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
