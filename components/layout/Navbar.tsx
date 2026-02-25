"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Use selector (better performance)
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const isAuthenticated = !!user;

  const navLinks = [
    { label: "Discover", href: "/", authRequired: false },
    { label: "Events", href: "/events", authRequired: false },
    { label: "My Tickets", href: "/my-tickets", authRequired: true },
  ];

  const handleLogout = () => {
    logout();
    router.replace("/auth/login"); // better than push for logout
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full backdrop-blur-md"
      style={{
        borderBottom: "1px solid var(--th-border)",
        backgroundColor: "rgba(10, 8, 0, 0.96)",
      }}
    >
      <div className="mx-auto flex px-12 items-center justify-between py-4">
        {/* ── Brand ── */}
        <Link href="/" className="th-font-display text-2xl tracking-[3px]">
          <span className="th-text-amber th-glow-amber">TICKET</span>
          <span className="th-text-primary">HIVE</span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden items-center gap-8 md:flex list-none">
          {navLinks.map((link) =>
            link.authRequired && !isAuthenticated ? null : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[11px] font-semibold uppercase tracking-[2px] transition-colors duration-200"
                  style={{
                    color:
                      pathname === link.href
                        ? "var(--th-amber)"
                        : "var(--th-muted-2)",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* ── Right Side ── */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span
                className="text-[12px] font-semibold"
                style={{ color: "var(--th-muted-2)" }}
              >
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="th-btn-outline px-4 py-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="th-btn-outline px-4 py-2"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="th-btn-primary px-5 py-2"
              >
                Get Tickets
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="flex flex-col gap-[5px] md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block h-[2px] w-6 bg-[var(--th-muted-2)]" />
          <span className="block h-[2px] w-6 bg-[var(--th-muted-2)]" />
          <span className="block h-[2px] w-6 bg-[var(--th-muted-2)]" />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div
          className="px-6 pb-6 pt-4 md:hidden"
          style={{
            borderTop: "1px solid var(--th-border)",
            backgroundColor: "var(--th-bg)",
          }}
        >
          <ul className="mb-6 flex flex-col gap-4 list-none">
            {navLinks.map((link) =>
              link.authRequired && !isAuthenticated ? null : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[12px] font-semibold uppercase tracking-[2px]"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="flex flex-col gap-3">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="th-btn-outline w-full py-3"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="th-btn-outline block w-full py-3 text-center"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  className="th-btn-primary block w-full py-3 text-center"
                >
                  Get Tickets
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}