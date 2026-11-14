"use client";

import {
  FormEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const projectTypes = [
  "Web application",
  "Mobile app",
  "SaaS / dashboard",
  "API / backend",
  "UI redesign",
  "Other",
];

type Status = "idle" | "sending" | "sent" | "error";

export function HireDrawer({ open, onClose }: Props) {
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!open) {
      const reset = window.setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 280);
      return () => window.clearTimeout(reset);
    }

    const preferFocus =
      window.matchMedia("(min-width: 640px) and (hover: hover)").matches;

    const timer = window.setTimeout(() => {
      if (preferFocus) firstFieldRef.current?.focus();
    }, 220);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim(),
      projectType: String(data.get("projectType") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/hire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(result.error || "Could not send your inquiry.");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  return (
    <div
      className={`hire-drawer fixed inset-0 z-[60] ${open ? "is-open" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="hire-drawer-backdrop absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
        aria-label="Close hire form"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="hire-drawer-panel absolute inset-x-0 bottom-0 flex max-h-[min(92dvh,100%)] w-full flex-col border-t border-line bg-paper shadow-[0_-18px_50px_rgba(10,14,18,0.14)] sm:inset-y-0 sm:right-0 sm:left-auto sm:max-h-none sm:max-w-[24rem] sm:border-t-0 sm:border-l sm:shadow-[-24px_0_60px_rgba(10,14,18,0.12)]"
      >
        {/* mobile drag hint */}
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden" aria-hidden>
          <span className="h-1 w-10 rounded-full bg-ink/15" />
        </div>

        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-line px-4 pt-2 pb-4 sm:gap-4 sm:px-6 sm:pt-5 sm:pb-5">
          <div className="min-w-0 flex-1 pr-1">
            <p className="text-[10px] tracking-[0.16em] text-accent uppercase sm:text-[11px]">
              Start a project
            </p>
            <h2
              id={titleId}
              className="mt-1 font-display text-lg font-semibold tracking-tight text-ink sm:mt-1.5 sm:text-xl"
            >
              Tell me what you’re building.
            </h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted sm:mt-2 sm:text-sm">
              Send a short brief and I’ll reply with next steps.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-line text-ink transition-colors hover:border-ink sm:mt-0.5 sm:h-9 sm:w-9"
            aria-label="Close"
          >
            <span className="relative block h-3.5 w-3.5" aria-hidden>
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 rotate-45 bg-ink" />
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 -rotate-45 bg-ink" />
            </span>
          </button>
        </div>

        <div className="hire-drawer-body min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
          {status === "sent" ? (
            <div className="flex min-h-[14rem] flex-col justify-center pb-2 sm:min-h-[16rem]">
              <p className="text-[10px] tracking-[0.16em] text-accent uppercase sm:text-[11px]">
                Received
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Thanks. I’ll review your brief shortly.
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-muted sm:text-sm">
                Your details were sent to my email. I’ll get back to you soon.
              </p>
              <button
                type="button"
                className="btn-primary mt-8 w-full text-sm"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          ) : (
            <form
              id="hire-form"
              className="space-y-4 pb-2 sm:space-y-5"
              onSubmit={handleSubmit}
            >
              <Field label="Full name" htmlFor="hire-name">
                <input
                  ref={firstFieldRef}
                  id="hire-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  enterKeyHint="next"
                  placeholder="Alex Morgan"
                  className="hire-input"
                />
              </Field>

              <Field label="Work email" htmlFor="hire-email">
                <input
                  id="hire-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  enterKeyHint="next"
                  placeholder="alex@company.com"
                  className="hire-input"
                />
              </Field>

              <Field label="Company" htmlFor="hire-company" optional>
                <input
                  id="hire-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  enterKeyHint="next"
                  placeholder="Studio / startup"
                  className="hire-input"
                />
              </Field>

              <Field label="Project type" htmlFor="hire-type">
                <div className="hire-select-wrap">
                  <select
                    id="hire-type"
                    name="projectType"
                    required
                    defaultValue=""
                    className="hire-input hire-select"
                    onChange={(event) => {
                      event.currentTarget.classList.toggle(
                        "has-value",
                        Boolean(event.currentTarget.value),
                      );
                    }}
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    {projectTypes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="hire-select-chevron"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Field>

              <Field label="Project brief" htmlFor="hire-message">
                <textarea
                  id="hire-message"
                  name="message"
                  rows={4}
                  required
                  enterKeyHint="send"
                  placeholder="Goals, features, and any links worth seeing…"
                  className="hire-input hire-textarea"
                />
              </Field>

              {status === "error" && errorMessage ? (
                <p className="text-[13px] text-red-700 sm:text-sm" role="alert">
                  {errorMessage}
                </p>
              ) : null}
            </form>
          )}
        </div>

        {status !== "sent" ? (
          <div className="hire-drawer-footer shrink-0 border-t border-line bg-paper px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-4 sm:pb-5">
            <button
              type="submit"
              form="hire-form"
              className="btn-primary w-full text-sm"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send inquiry"}
            </button>
            <p className="mt-2.5 text-center text-[11px] leading-relaxed text-muted sm:mt-3 sm:text-xs">
              Sent to my inbox · usually replies within a day
            </p>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-2 text-[10px] tracking-[0.12em] text-muted uppercase sm:mb-2 sm:text-[11px]">
        <span>{label}</span>
        {optional ? (
          <span className="normal-case tracking-normal opacity-80">Optional</span>
        ) : null}
      </span>
      {children}
    </label>
  );
}
