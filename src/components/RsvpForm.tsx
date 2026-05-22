"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const RSVP_ENDPOINT = process.env.NEXT_PUBLIC_RSVP_ENDPOINT ?? "";

type FormStatus = "idle" | "loading" | "success" | "error";

export function RsvpForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    attendance: "",
    guests: "",
    message: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!RSVP_ENDPOINT) {
      setStatus("error");
      setErrorMessage("RSVP endpoint is not configured.");
      return;
    }

    try {
      await fetch(RSVP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: formValues.name,
          attendance: formValues.attendance,
          guests: formValues.guests,
          message: formValues.message,
          createdAt: new Date().toISOString(),
        }).toString(),
      });

      // With no-cors the response is opaque, so we can't check response.ok
      // If fetch didn't throw, we treat it as success
      setStatus("success");
      setFormValues({ name: "", attendance: "", guests: "", message: "" });
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-xs uppercase tracking-[0.28em] text-ivory opacity-70">
          <span>Name | الاسم</span>
          <input
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/40"
            placeholder="Your name / الاسم"
          />
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.28em] text-ivory opacity-70">
          <span>Will Attend | هل ستتمكن من الحضور؟</span>
          <select
            name="attendance"
            value={formValues.attendance}
            onChange={handleChange}
            required
            className="
              rounded-2xl
              border
              border-white/20
              bg-[#2a0d14]
              px-4
              py-3
              text-sm
              text-[#f8ead7]
              outline-none
              transition
              focus:border-[#d6b980]
              focus:bg-[#34111a]
            "
          >
            <option value="" disabled className="bg-[#2a0d14] text-[#f8ead7]">
              Select / اختر
            </option>
            <option value="Yes" className="bg-[#2a0d14] text-[#f8ead7]">
              Yes | نعم
            </option>
            <option value="No" className="bg-[#2a0d14] text-[#f8ead7]">
              No | لا
            </option>
          </select>
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.28em] text-ivory opacity-70">
          <span>Number of Guests | عدد المرافقين</span>
          <input
            name="guests"
            type="number"
            min={0}
            value={formValues.guests}
            onChange={handleChange}
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/40"
            placeholder="0"
          />
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.28em] text-ivory opacity-70">
          <span>Message | رسالة</span>
          <textarea
            name="message"
            value={formValues.message}
            onChange={handleChange}
            rows={4}
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/40"
            placeholder="Share a note for us"
          />
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-gold mt-2 rounded-full px-6 py-3 text-xs uppercase tracking-[0.35em] shadow-luxe transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Send RSVP"}
        </button>
      </form>

      <div className="mt-4" aria-live="polite">
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-ivory"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              Thank you! We received your RSVP.
              <span className="block font-ar" dir="rtl">
                شكرا لكم! تم استلام تأكيد الحضور.
              </span>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-ivory"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {errorMessage || "Something went wrong. Please try again."}
              <span className="block font-ar" dir="rtl">
                حدث خطا ما. يرجى المحاولة مرة اخرى.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}