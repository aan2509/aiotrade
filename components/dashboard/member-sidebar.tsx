"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronDown,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings2,
  UserRound,
} from "lucide-react";
import { logoutAction } from "@/app/(protected)/account/actions";
import { cn } from "@/lib/utils";

type MemberSidebarProps = {
  isAdmin: boolean;
  pathname: string;
  username: string;
};

const primaryItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/subscription", label: "Langganan", icon: CreditCard },
] as const;

const guideItems = [
  { href: "/dashboard/guides/activation", label: "Aktivasi Bot" },
  { href: "/dashboard/guides/bot-settings", label: "Pengaturan Bot" },
  { href: "/dashboard/guides/files", label: "File PDF" },
] as const;

const accountItems = [
  { href: "/dashboard/account/profile", label: "Profil" },
  { href: "/dashboard/account/landing-page", label: "Landing Page" },
  { href: "/dashboard/account/reset-password", label: "Reset Password" },
] as const;

export function MemberSidebar({ isAdmin, pathname, username }: MemberSidebarProps) {
  const resolvedPathname = usePathname() ?? pathname;
  const isGuidesRoute = resolvedPathname.startsWith("/dashboard/guides");
  const isAccountRoute =
    resolvedPathname.startsWith("/dashboard/account") || resolvedPathname === "/dashboard/reset-password";
  const [guidesExpanded, setGuidesExpanded] = useState(isGuidesRoute);
  const [accountExpanded, setAccountExpanded] = useState(isAccountRoute);
  const guidesOpen = isGuidesRoute || guidesExpanded;
  const accountOpen = isAccountRoute || accountExpanded;

  return (
    <div className="flex h-full flex-col rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(246,250,253,0.84)_100%)] shadow-[0_28px_72px_rgba(148,163,184,0.28),0_12px_34px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-3xl">
      <div className="px-6 py-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-emerald-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
          <LayoutDashboard className="h-3.5 w-3.5" />
          Member Area
        </div>
        <h1 className="mt-5 text-[1.65rem] font-semibold tracking-tight text-stone-950">Dashboard Member</h1>
        <p className="mt-2 max-w-[16rem] text-sm leading-6 text-stone-600">
          Akses informasi akun dan panduan.
        </p>
      </div>

      <div className="mx-6 h-px bg-[linear-gradient(90deg,rgba(148,163,184,0)_0%,rgba(148,163,184,0.34)_18%,rgba(148,163,184,0.2)_82%,rgba(148,163,184,0)_100%)]" />

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <nav className="space-y-3">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const active = resolvedPathname === item.href;

            return (
              <Link
                className={cn(
                  "group flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition duration-300",
                  active
                    ? "bg-[linear-gradient(135deg,rgba(31,41,55,0.96)_0%,rgba(30,41,59,0.92)_100%)] text-white shadow-[0_18px_44px_rgba(15,23,42,0.26),inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(248,250,252,0.56)_100%)] text-stone-700 shadow-[0_14px_28px_rgba(148,163,184,0.18),inset_0_1px_0_rgba(255,255,255,0.88)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.84)_0%,rgba(248,250,252,0.68)_100%)] hover:text-stone-950 hover:shadow-[0_18px_34px_rgba(148,163,184,0.22),0_8px_18px_rgba(15,23,42,0.06)]",
                )}
                href={item.href}
                key={item.href}
              >
                <span
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-2xl transition",
                    active
                      ? "bg-white/10 text-white"
                      : "bg-stone-950/[0.045] text-stone-700 group-hover:bg-stone-950/[0.08]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {item.label}
              </Link>
            );
          })}

          <div className="space-y-2 rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(248,250,252,0.42)_100%)] p-2 shadow-[0_18px_34px_rgba(148,163,184,0.16),inset_0_1px_0_rgba(255,255,255,0.82)]">
            <button
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold transition duration-300",
                isGuidesRoute
                  ? "bg-[linear-gradient(135deg,rgba(31,41,55,0.96)_0%,rgba(30,41,59,0.92)_100%)] text-white shadow-[0_18px_44px_rgba(15,23,42,0.26),inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,rgba(248,250,252,0.54)_100%)] text-stone-700 shadow-[0_14px_26px_rgba(148,163,184,0.14),inset_0_1px_0_rgba(255,255,255,0.84)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(248,250,252,0.66)_100%)] hover:text-stone-950",
              )}
              onClick={() => setGuidesExpanded((current) => !current)}
              type="button"
            >
              <span className="inline-flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                    isGuidesRoute ? "bg-white/10" : "bg-stone-950/[0.045]",
                  )}
                >
                  <BookOpen className="h-4 w-4" />
                </span>
                Panduan
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", guidesOpen && "rotate-180")} />
            </button>

            <div
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-300",
                guidesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0">
                <div className="space-y-1 px-2 pb-2">
                  {guideItems.map((item) => {
                    const active = resolvedPathname === item.href;

                    return (
                      <Link
                        className={cn(
                          "block rounded-xl px-3 py-2.5 text-sm font-medium transition",
                          active
                            ? "bg-white/92 text-stone-950 shadow-[0_14px_28px_rgba(148,163,184,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]"
                            : "text-stone-600 hover:bg-white/78 hover:text-stone-950 hover:shadow-[0_10px_22px_rgba(148,163,184,0.12)]",
                        )}
                        href={item.href}
                        key={item.href}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(248,250,252,0.42)_100%)] p-2 shadow-[0_18px_34px_rgba(148,163,184,0.16),inset_0_1px_0_rgba(255,255,255,0.82)]">
            <button
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold transition duration-300",
                isAccountRoute
                  ? "bg-[linear-gradient(135deg,rgba(31,41,55,0.96)_0%,rgba(30,41,59,0.92)_100%)] text-white shadow-[0_18px_44px_rgba(15,23,42,0.26),inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,rgba(248,250,252,0.54)_100%)] text-stone-700 shadow-[0_14px_26px_rgba(148,163,184,0.14),inset_0_1px_0_rgba(255,255,255,0.84)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(248,250,252,0.66)_100%)] hover:text-stone-950",
              )}
              onClick={() => setAccountExpanded((current) => !current)}
              type="button"
            >
              <span className="inline-flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                    isAccountRoute ? "bg-white/10" : "bg-stone-950/[0.045]",
                  )}
                >
                  <UserRound className="h-4 w-4" />
                </span>
                Akun
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", accountOpen && "rotate-180")} />
            </button>

            <div
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-300",
                accountOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0">
                <div className="space-y-1 px-2 pb-2">
                  {accountItems.map((item) => {
                    const active = resolvedPathname === item.href;

                    return (
                      <Link
                        className={cn(
                          "block rounded-xl px-3 py-2.5 text-sm font-medium transition",
                          active
                            ? "bg-white/92 text-stone-950 shadow-[0_14px_28px_rgba(148,163,184,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]"
                            : "text-stone-600 hover:bg-white/78 hover:text-stone-950 hover:shadow-[0_10px_22px_rgba(148,163,184,0.12)]",
                        )}
                        href={item.href}
                        key={item.href}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="px-5 pb-5">
        <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(246,248,251,0.66)_100%)] px-4 py-4 shadow-[0_18px_34px_rgba(148,163,184,0.16),inset_0_1px_0_rgba(255,255,255,0.88)]">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-stone-500">
            Login sebagai
          </p>
          <p className="mt-2 text-base font-semibold text-stone-950">@{username}</p>
        </div>

        {isAdmin ? (
          <Link
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,rgba(14,165,233,0.18)_0%,rgba(59,130,246,0.12)_100%)] px-4 py-3 text-sm font-medium text-sky-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.68),0_14px_28px_rgba(14,165,233,0.14)] transition hover:translate-y-[-1px] hover:bg-[linear-gradient(135deg,rgba(14,165,233,0.22)_0%,rgba(59,130,246,0.16)_100%)]"
            href="/admin"
          >
            <Settings2 className="h-4 w-4" />
            Admin Panel
          </Link>
        ) : null}

        <form action={logoutAction}>
          <button
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(248,250,252,0.62)_100%)] px-4 py-3 text-sm font-medium text-stone-900 shadow-[0_16px_28px_rgba(148,163,184,0.16),inset_0_1px_0_rgba(255,255,255,0.88)] transition duration-300 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(248,250,252,0.72)_100%)] hover:shadow-[0_20px_34px_rgba(148,163,184,0.2),0_8px_18px_rgba(15,23,42,0.06)]"
            type="submit"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
