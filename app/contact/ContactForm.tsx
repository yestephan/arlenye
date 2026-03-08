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
    "w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-gray-50";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">
            First Name <span className="text-gray-400">(required)</span>
          </label>
          <input
            {...register("firstName", { required: true })}
            className={inputClass}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500 mt-1">Required</p>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">
            Last Name <span className="text-gray-400">(required)</span>
          </label>
          <input
            {...register("lastName", { required: true })}
            className={inputClass}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500 mt-1">Required</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Email Address <span className="text-gray-400">(required)</span>
        </label>
        <input
          type="email"
          {...register("email", { required: true })}
          className={inputClass}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">Required</p>
        )}
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Subject <span className="text-gray-400">(required)</span>
        </label>
        <input
          {...register("subject", { required: true })}
          className={inputClass}
        />
        {errors.subject && (
          <p className="text-xs text-red-500 mt-1">Required</p>
        )}
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Message <span className="text-gray-400">(required)</span>
        </label>
        <textarea
          rows={5}
          {...register("message", { required: true })}
          className={inputClass}
        />
        {errors.message && (
          <p className="text-xs text-red-500 mt-1">Required</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-black text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-green-700">Message sent. Thank you!</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
