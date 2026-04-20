"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, LayoutDashboard, Settings2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const homepageItems = [
  { href: "/admin#hero-section", label: "Hero Section" },
  { href: "/admin#overview-section", label: "Overview Section" },
  { href: "/admin#benefits-section", label: "Benefit Section" },
  { href: "/admin#pricing-section", label: "Pricing Section" },
  { href: "/admin#faq-section", label: "FAQ Section" },
  { href: "/admin#guide-section", label: "Guide Section" },
  { href: "/admin#blog-section", label: "Blog Section" },
  { href: "/admin#footer-section", label: "Footer Section" },
] as const;

type AdminSidebarProps = {
  pathname: string;
  username: string;
};

export function AdminSidebar({ pathname, username }: AdminSidebarProps) {
  const isHomepageRoute = pathname === "/admin";
  const isUsersRoute = pathname === "/admin/users";
  const [homepageOpen, setHomepageOpen] = useState(isHomepageRoute);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-200 px-5 py-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-800">
          <Settings2 className="h-3.5 w-3.5" />
          Admin Panel
        </div>
        <h1 className="mt-4 text-xl font-semibold tracking-tight text-stone-950">Control Center</h1>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Kelola homepage, data user, dan pengaturan admin lain dari satu sidebar.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <nav className="space-y-2">
          <div className="rounded-xl border border-stone-200 bg-stone-50/80">
            <button
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition",
                isHomepageRoute
                  ? "bg-stone-900 text-white"
                  : "text-stone-800 hover:bg-stone-100",
              )}
              onClick={() => setHomepageOpen((current) => !current)}
              type="button"
            >
              <span className="inline-flex items-center gap-3">
                <Settings2 className="h-4 w-4" />
                Setting Homepage
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  homepageOpen && "rotate-180",
                )}
              />
            </button>

            <div
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-300",
                homepageOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0">
                <div className="space-y-1 px-2 pb-2">
                  <Link
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm font-medium transition",
                      isHomepageRoute
                        ? "bg-white text-stone-950 shadow-sm"
                        : "text-stone-600 hover:bg-white hover:text-stone-950",
                    )}
                    href="/admin"
                  >
                    Semua Section
                  </Link>
                  {homepageItems.map((item) => (
                    <Link
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-white hover:text-stone-950"
                      href={item.href}
                      key={item.href}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link
            className={cn(
              "flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-semibold transition",
              isUsersRoute
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-200 bg-stone-50/80 text-stone-800 hover:bg-stone-100",
            )}
            href="/admin/users"
          >
            <Users className="h-4 w-4" />
            User Management
          </Link>
        </nav>
      </div>

      <div className="border-t border-stone-200 px-4 py-4">
        <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
            Login sebagai
          </p>
          <p className="mt-1 text-sm font-semibold text-stone-950">@{username}</p>
        </div>
        <Link
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-stone-50"
          href="/dashboard"
        >
          <LayoutDashboard className="h-4 w-4" />
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
