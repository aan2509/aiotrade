"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  CreditCard,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Search,
  Settings2,
  Users,
} from "lucide-react";
import { logoutAction } from "@/app/(protected)/account/actions";
import { cn } from "@/lib/utils";

const homepageItems = [
  { href: "/admin#overview-section", id: "overview-section", label: "Overview Section", section: "overview" },
  { href: "/admin#benefits-section", id: "benefits-section", label: "Benefit Section", section: "benefits" },
  { href: "/admin#pricing-section", id: "pricing-section", label: "Pricing Section", section: "pricing" },
  { href: "/admin#video-section", id: "video-section", label: "Video Section", section: "video" },
  { href: "/admin#faq-section", id: "faq-section", label: "FAQ Section", section: "faq" },
  { href: "/admin#guide-section", id: "guide-section", label: "Guide Section", section: "guide" },
  { href: "/admin#testimonial-section", id: "testimonial-section", label: "Testimoni Section", section: "testimonial" },
  { href: "/admin#blog-section", id: "blog-section", label: "Blog Section", section: "blog" },
  { href: "/admin#banner-ads-section", id: "banner-ads-section", label: "Banner Ads Section", section: "bannerAds" },
  { href: "/admin#register-contact-section", id: "register-contact-section", label: "Register Contact", section: "registerContact" },
  { href: "/admin#footer-section", id: "footer-section", label: "Footer Section", section: "footer" },
] as const;

const postItems = [
  { href: "/admin/posts", label: "Composer Post" },
  { href: "/admin/posts/published", label: "Post Published" },
  { href: "/admin/posts/pdfs", label: "Posting PDF" },
  { href: "/admin/posts/pdfs/published", label: "PDF Published" },
] as const;

const memberPostItems = [
  { href: "/admin/member-posts", label: "Composer Guide" },
  { href: "/admin/member-posts/published", label: "Published Guides" },
] as const;

type AdminSidebarProps = {
  pathname: string;
  username: string;
};

export function AdminSidebar({ pathname, username }: AdminSidebarProps) {
  const resolvedPathname = usePathname() ?? pathname;
  const searchParams = useSearchParams();
  const currentHomepageSection = searchParams.get("section");
  const isHomepageRoute = resolvedPathname === "/admin";
  const isPostsRoute = resolvedPathname.startsWith("/admin/posts");
  const isPostComposerRoute = resolvedPathname === "/admin/posts";
  const isPublishedPostsRoute = resolvedPathname === "/admin/posts/published";
  const isPdfComposerRoute = resolvedPathname === "/admin/posts/pdfs";
  const isPdfPublishedRoute = resolvedPathname === "/admin/posts/pdfs/published";
  const isMemberPostsRoute = resolvedPathname.startsWith("/admin/member-posts");
  const isMemberPostComposerRoute = resolvedPathname === "/admin/member-posts";
  const isMemberPublishedPostsRoute = resolvedPathname === "/admin/member-posts/published";
  const isResetPasswordRoute = resolvedPathname === "/admin/reset-password";
  const isPaymentsRoute = resolvedPathname === "/admin/payments";
  const isSeoRoute = resolvedPathname === "/admin/seo";
  const isUsersRoute = resolvedPathname === "/admin/users";
  const [homepageExpanded, setHomepageExpanded] = useState(isHomepageRoute);
  const [postsExpanded, setPostsExpanded] = useState(isPostsRoute);
  const [memberPostsExpanded, setMemberPostsExpanded] = useState(isMemberPostsRoute);
  const [activeHomepageSection, setActiveHomepageSection] = useState(currentHomepageSection);
  const homepageOpen = isHomepageRoute || homepageExpanded;
  const postsOpen = isPostsRoute || postsExpanded;
  const memberPostsOpen = isMemberPostsRoute || memberPostsExpanded;

  const homepageSectionIds = useMemo(
    () => homepageItems.map((item) => item.id),
    [],
  );

  useEffect(() => {
    if (!isHomepageRoute) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setActiveHomepageSection((current) => current ?? currentHomepageSection);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [currentHomepageSection, isHomepageRoute]);

  useEffect(() => {
    if (!isHomepageRoute || typeof window === "undefined") {
      return;
    }

    const sections = homepageSectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextVisible = visibleEntries[0];

        if (!nextVisible?.target.id) {
          return;
        }

        const matchedItem = homepageItems.find((item) => item.id === nextVisible.target.id);

        if (!matchedItem) {
          return;
        }

        setActiveHomepageSection(matchedItem.section);
      },
      {
        root: null,
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0.1, 0.25, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [homepageSectionIds, isHomepageRoute]);

  function scrollToHomepageSection(sectionId: string, sectionKey: string) {
    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveHomepageSection(sectionKey);
    window.history.replaceState(null, "", `#${sectionId}`);
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-200 px-5 py-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-800">
          <Settings2 className="h-3.5 w-3.5" />
          Admin Panel
        </div>
        <h1 className="mt-4 text-xl font-semibold tracking-tight text-stone-950">Control Center</h1>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Kelola homepage, data user, dan pengaturan lain.
        </p>
      </div>

      
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <nav className="space-y-2">

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

          <Link
            className={cn(
              "flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-semibold transition",
              isPaymentsRoute
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-200 bg-stone-50/80 text-stone-800 hover:bg-stone-100",
            )}
            href="/admin/payments"
          >
            <CreditCard className="h-4 w-4" />
            Payment Settings
          </Link>

          

          <div className="rounded-xl border border-stone-200 bg-stone-50/80">
            <button
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition",
                isMemberPostsRoute
                  ? "bg-stone-900 text-white"
                  : "text-stone-800 hover:bg-stone-100",
              )}
              onClick={() => setMemberPostsExpanded((current) => !current)}
              type="button"
            >
              <span className="inline-flex items-center gap-3">
                <Newspaper className="h-4 w-4" />
                Post to Member
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  memberPostsOpen && "rotate-180",
                )}
              />
            </button>

            <div
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-300",
                memberPostsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0">
                <div className="space-y-1 px-2 pb-2">
                  {memberPostItems.map((item) => {
                    const active =
                      (item.href === "/admin/member-posts" && isMemberPostComposerRoute) ||
                      (item.href === "/admin/member-posts/published" && isMemberPublishedPostsRoute);

                    return (
                      <Link
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm font-medium transition",
                          active
                            ? "bg-white text-stone-950 shadow-sm"
                            : "text-stone-600 hover:bg-white hover:text-stone-950",
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

          <div className="rounded-xl border border-stone-200 bg-stone-50/80">
            <button
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition",
                isPostsRoute
                  ? "bg-stone-900 text-white"
                  : "text-stone-800 hover:bg-stone-100",
              )}
              onClick={() => setPostsExpanded((current) => !current)}
              type="button"
            >
              <span className="inline-flex items-center gap-3">
                <Newspaper className="h-4 w-4" />
                Posting Konten
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  postsOpen && "rotate-180",
                )}
              />
            </button>

            <div
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-300",
                postsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0">
                <div className="space-y-1 px-2 pb-2">
                  {postItems.map((item) => {
                    const active =
                      (item.href === "/admin/posts" && isPostComposerRoute) ||
                      (item.href === "/admin/posts/published" && isPublishedPostsRoute) ||
                      (item.href === "/admin/posts/pdfs" && isPdfComposerRoute) ||
                      (item.href === "/admin/posts/pdfs/published" && isPdfPublishedRoute);

                    return (
                      <Link
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm font-medium transition",
                          active
                            ? "bg-white text-stone-950 shadow-sm"
                            : "text-stone-600 hover:bg-white hover:text-stone-950",
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

          <div className="rounded-xl border border-stone-200 bg-stone-50/80">
            <button
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition",
                isHomepageRoute
                  ? "bg-stone-900 text-white"
                  : "text-stone-800 hover:bg-stone-100",
              )}
              onClick={() => setHomepageExpanded((current) => !current)}
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
                      "relative block rounded-lg px-3 py-2 text-sm font-medium transition",
                      isHomepageRoute && !activeHomepageSection
                        ? "bg-white text-stone-950 shadow-sm ring-1 ring-sky-200/90 before:absolute before:bottom-2 before:left-0 before:top-2 before:w-1 before:rounded-r-full before:bg-sky-500"
                        : "text-stone-600 hover:bg-white hover:text-stone-950",
                    )}
                    href="/admin"
                    onClick={(event) => {
                      if (!isHomepageRoute) {
                        return;
                      }

                      event.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setActiveHomepageSection(null);
                      window.history.replaceState(null, "", "/admin");
                    }}
                  >
                    Semua Section
                  </Link>
                  {homepageItems.map((item) =>
                    isHomepageRoute ? (
                      <button
                        className={cn(
                          "relative block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition",
                          activeHomepageSection === item.section
                            ? "bg-white text-stone-950 shadow-sm ring-1 ring-sky-200/90 before:absolute before:bottom-2 before:left-0 before:top-2 before:w-1 before:rounded-r-full before:bg-sky-500"
                            : "text-stone-600 hover:bg-white hover:text-stone-950",
                        )}
                        key={item.id}
                        onClick={() => scrollToHomepageSection(item.id, item.section)}
                        type="button"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-white hover:text-stone-950"
                        href={item.href}
                        key={item.id}
                      >
                        {item.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          <Link
            className={cn(
              "flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-semibold transition",
              isSeoRoute
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-200 bg-stone-50/80 text-stone-800 hover:bg-stone-100",
            )}
            href="/admin/seo"
          >
            <Search className="h-4 w-4" />
            SEO Settings
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
          className={cn(
            "mt-3 flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-semibold transition",
            isResetPasswordRoute
              ? "border-stone-900 bg-stone-900 text-white"
              : "border-stone-200 bg-stone-50/80 text-stone-800 hover:bg-stone-100",
          )}
          href="/admin/reset-password"
        >
          <KeyRound className="h-4 w-4" />
          Reset Password
        </Link>
        <Link
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-stone-50"
          href="/dashboard"
        >
          <LayoutDashboard className="h-4 w-4" />
          Kembali ke Dashboard
        </Link>
        <form action={logoutAction}>
          <button
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-stone-50"
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
