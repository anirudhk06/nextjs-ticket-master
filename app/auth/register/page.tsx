"use client";

import RegisterForm from "@/components/forms/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div
      className="flex min-h-screen w-full"
      style={{ backgroundColor: "var(--th-bg)" }}
    >
      {/* ── Left Panel — Decorative ── */}
      <div
        className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex lg:w-[45%]"
        style={{
          background: "linear-gradient(145deg, #0d0a00, #1a1200, #0d0800)",
          borderRight: "1px solid var(--th-border)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, rgba(245,166,35,0.04) 0px, rgba(245,166,35,0.04) 1px, transparent 1px, transparent 60px),
              repeating-linear-gradient(0deg, rgba(245,166,35,0.04) 0px, rgba(245,166,35,0.04) 1px, transparent 1px, transparent 60px)
            `,
          }}
        />

        <div
          className="pointer-events-none absolute top-0 left-0 right-0"
          style={{
            height: "50%",
            background:
              "radial-gradient(ellipse at top right, rgba(245,166,35,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative">
          <Link href="/" className="th-font-display text-3xl tracking-[4px]">
            <span style={{ color: "var(--th-amber)" }}>TICKET</span>
            <span style={{ color: "var(--th-text)" }}>HIVE</span>
          </Link>
        </div>

        <div className="relative">
          <div
            className="th-font-display mb-4 text-7xl leading-none tracking-wide"
            style={{ color: "var(--th-text)" }}
          >
            JOIN THE{" "}
            <span
              style={{
                WebkitTextStroke: "1px var(--th-amber)",
                color: "transparent",
              }}
            >
              CROWD.
            </span>
          </div>

          <p
            className="max-w-xs text-[14px] font-light leading-relaxed"
            style={{ color: "var(--th-muted-2)" }}
          >
            Create your free account and start discovering amazing events in
            your city today.
          </p>
        </div>

        <div
          className="relative text-[11px] font-light"
          style={{ color: "var(--th-muted)" }}
        >
          Already trusted by 50,000+ event-goers across India
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex flex-1 items-start justify-center overflow-y-auto px-6 py-10">
        <div className="w-full max-w-md">

          {/* Mobile Brand */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="th-font-display text-2xl tracking-[4px]">
              <span style={{ color: "var(--th-amber)" }}>TICKET</span>
              <span style={{ color: "var(--th-text)" }}>HIVE</span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1
              className="th-font-display mb-1 text-4xl tracking-wide"
              style={{ color: "var(--th-text)" }}
            >
              CREATE ACCOUNT
            </h1>
            <p
              className="text-[13px] font-light"
              style={{ color: "var(--th-muted-2)" }}
            >
              Already have one?{" "}
              <Link
                href="/auth/login"
                className="font-semibold"
                style={{ color: "var(--th-amber)" }}
              >
                Sign in →
              </Link>
            </p>
          </div>

          {/* Google Signup */}
          <button
            type="button"
            className="mb-5 flex w-full items-center justify-center gap-3 rounded-lg py-3 text-[13px] font-semibold"
            style={{
              background: "var(--th-surface-2)",
              border: "1px solid var(--th-border-2)",
              color: "var(--th-text)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="mb-5 flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: "var(--th-border)" }} />
            <span
              className="text-[11px] font-bold uppercase tracking-[2px]"
              style={{ color: "var(--th-muted)" }}
            >
              or fill in details
            </span>
            <div className="h-px flex-1" style={{ background: "var(--th-border)" }} />
          </div>

          {/* Form */}
          <RegisterForm/>
        </div>
      </div>
    </div>
  );
}