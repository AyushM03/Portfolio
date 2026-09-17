"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const collabSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().trim().email("Enter a valid email"),
  linkedinUrl: z
    .union([z.literal(""), z.string().trim().url("Enter a valid URL")])
    .optional(),
  phone: z.string().trim().optional(),
  reason: z.enum(["collaboration", "recruiting", "other"], {
    error: "Select a reason",
  }),
  message: z.string().trim().min(10, "Message should be at least 10 characters"),
  // honeypot — real bots fill every field; humans never see this one
  company: z.string().max(0).optional(),
});

type CollabFormValues = z.infer<typeof collabSchema>;

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-md border border-black/15 bg-transparent px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-foreground/40 focus:outline-none";

export default function CollabForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CollabFormValues>({
    resolver: zodResolver(collabSchema),
    defaultValues: { reason: "collaboration" },
  });

  const onSubmit = async (data: CollabFormValues) => {
    if (data.company) {
      // honeypot tripped — pretend it worked, do nothing
      setSubmitState("success");
      reset();
      return;
    }

    setSubmitState("submitting");
    try {
      // No backend exists yet (PRD Phase 2) — this simulates the request
      // so the UX/validation flow is real and ready to wire up later.
      await new Promise((resolve) => setTimeout(resolve, 700));
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  };

  if (submitState === "success") {
    return (
      <div className="rounded-lg border border-black/10 bg-neutral-50 p-8 text-center">
        <p className="text-lg font-medium text-foreground">
          Thanks for reaching out.
        </p>
        <p className="mt-2 text-foreground/60">
          This form isn&apos;t wired to a backend yet, so nothing was sent —
          that&apos;s coming in the next phase of this site&apos;s build.
        </p>
        <button
          type="button"
          onClick={() => setSubmitState("idle")}
          className="mt-6 text-sm font-medium uppercase tracking-wide text-foreground underline underline-offset-4"
        >
          Fill it out again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            aria-invalid={!!errors.name}
            className={inputClasses}
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            aria-invalid={!!errors.email}
            className={inputClasses}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <input
            {...register("linkedinUrl")}
            type="text"
            placeholder="LinkedIn URL (optional)"
            aria-invalid={!!errors.linkedinUrl}
            className={inputClasses}
          />
          {errors.linkedinUrl && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.linkedinUrl.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("phone")}
            type="tel"
            placeholder="Phone (optional)"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <select
          {...register("reason")}
          aria-invalid={!!errors.reason}
          className={`${inputClasses} appearance-none`}
        >
          <option value="collaboration">Collaboration</option>
          <option value="recruiting">Recruiting</option>
          <option value="other">Other</option>
        </select>
        {errors.reason && (
          <p className="mt-1.5 text-sm text-red-600">{errors.reason.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("message")}
          placeholder="Message"
          rows={5}
          aria-invalid={!!errors.message}
          className={`${inputClasses} resize-none`}
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Honeypot — hidden from real users, left visually and from tab order */}
      <input
        {...register("company")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {submitState === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-md bg-foreground px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {submitState === "submitting" ? "Sending…" : "Send message"}
      </button>

      <p className="text-sm text-foreground/50">
        Your details are used only to respond to you — never shared.
      </p>
    </form>
  );
}
