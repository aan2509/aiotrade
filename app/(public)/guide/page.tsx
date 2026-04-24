import { cookies } from "next/headers";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { FloatingWhatsAppButton } from "@/components/landing/floating-whatsapp-button";
import { navItems } from "@/components/landing/data";
import type { PublicGuidePdfPost } from "@/lib/public-guide-types";
import { getPublishedPublicGuidePdfPosts } from "@/lib/public-guides";
import { getHomepageContent } from "@/lib/homepage-content";
import { LANDING_REFERRAL_COOKIE_NAME, resolveHomepageReferralState } from "@/lib/referral";
import { getSiteSeoSettings } from "@/lib/site-seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSiteSeoSettings();

  return {
    title: `Panduan PDF | ${seo.siteName}`,
    description: "Kumpulan file panduan PDF resmi AIOTrade yang bisa dibuka langsung dari halaman publik.",
    openGraph: {
      description: "Kumpulan file panduan PDF resmi AIOTrade yang bisa dibuka langsung dari halaman publik.",
      title: `Panduan PDF | ${seo.siteName}`,
      type: "website",
      url: `${seo.siteUrl.replace(/\/$/, "")}/guide`,
    },
  };
}

export default async function GuidePage() {
  const [pdfs, content, cookieStore] = await Promise.all([
    getPublishedPublicGuidePdfPosts(),
    getHomepageContent(),
    cookies(),
  ]);
  const referralState = await resolveHomepageReferralState(
    cookieStore.get(LANDING_REFERRAL_COOKIE_NAME)?.value ?? null,
  );

  return (
    <main className="min-h-screen bg-[#f4f2ec] text-[#111827]" id="top">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(11,19,34,0.96)] backdrop-blur-2xl">
        <div className="mx-auto flex min-h-[60px] w-full max-w-7xl items-center justify-between gap-6 px-4 sm:min-h-[70px] sm:px-8 lg:px-10">
          <Link
            className="inline-flex items-center gap-2 text-sm font-medium text-white/72 transition hover:text-white"
            href="/"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke beranda
          </Link>

          <nav className="no-scrollbar flex max-w-full items-center gap-2 overflow-x-auto text-[0.82rem] text-white/80 sm:gap-6 sm:text-[1rem]">
            {navItems.map((item, index) => {
              const href = item.label === "Blog" ? "/blog" : item.label === "User Guide" ? "/guide" : `/${item.href}`;
              const isActive = item.label === "User Guide";

              return (
                <div className="flex items-center gap-2 sm:gap-6" key={item.href}>
                  {index > 0 ? <span className="text-white/28">|</span> : null}
                  <Link
                    className="relative inline-flex whitespace-nowrap rounded-md px-2 py-2 transition duration-300 hover:text-white sm:px-3"
                    href={href}
                    style={
                      isActive
                        ? {
                            color: item.accent,
                            textShadow: `0 0 18px ${item.accent}22`,
                          }
                        : undefined
                    }
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span
                        className="absolute inset-x-2 bottom-0 h-[2px] rounded-full sm:inset-x-3"
                        style={{
                          backgroundColor: item.accent,
                          boxShadow: `0 0 18px ${item.accent}73`,
                        }}
                      />
                    ) : null}
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-18 lg:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,200,74,0.10)_0%,rgba(255,200,74,0)_30%),radial-gradient(circle_at_top_left,rgba(27,116,223,0.10),transparent_34%)]" />
        <div className="pointer-events-none absolute left-[-7%] top-16 h-64 w-64 rounded-full bg-[#ffd972]/18 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-10 right-[-5%] h-72 w-72 rounded-full bg-[#58a6ff]/12 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-[1.05rem] font-semibold tracking-[-0.02em] text-[#1c74de] sm:text-[1.3rem]">
                Panduan resmi AIOTrade
              </p>
              <h1 className="mt-5 text-[3rem] font-semibold leading-none tracking-[-0.045em] text-[#ffc84a] sm:text-[4.45rem]">
                Guide PDF
              </h1>
              
            </div>

            
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {pdfs.length ? (
              pdfs.map((pdf: PublicGuidePdfPost, index: number) => (
                <article
                  className="relative overflow-hidden rounded-[26px] border border-[#e6e1d6] bg-[linear-gradient(180deg,#ffffff_0%,#f9f8f4_100%)] px-7 py-8 shadow-[0_24px_50px_rgba(15,23,42,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(15,23,42,0.14)]"
                  key={pdf.id}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(27,116,223,0.06)_0%,rgba(27,116,223,0)_100%)]" />
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(27,116,223,0.28)_50%,rgba(255,255,255,0)_100%)]" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#eef5ff] text-[#1b74df]">
                        <FileText className="h-6 w-6" />
                      </div>
                      <span className="inline-flex rounded-full bg-[#ffcc45] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1f2937]">
                        PDF #{index + 1}
                      </span>
                    </div>

                    <h2 className="mt-6 text-[1.85rem] font-semibold leading-[1.12] tracking-[-0.04em] text-[#111827]">
                      {pdf.title}
                    </h2>
                    <p className="mt-5 min-h-[7.5rem] text-[1rem] leading-[1.85] text-[#4b5563]">
                      {pdf.description || "File panduan resmi AIOTrade yang bisa Anda buka langsung dari halaman ini."}
                    </p>

                    <div className="mt-7 flex items-end justify-between gap-4">
                      

                      <Link
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[16px] border border-[#5aa0ff] bg-white px-5 text-[1rem] font-medium text-[#2a7df1] shadow-[0_10px_24px_rgba(42,125,241,0.1)] transition duration-300 hover:bg-[#eef5ff]"
                        href={pdf.fileUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Buka PDF
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-[28px] border border-dashed border-[#d9d1c3] bg-[rgba(255,255,255,0.82)] px-8 py-16 text-center text-[#667085] shadow-[0_18px_46px_rgba(15,23,42,0.08)] md:col-span-2 xl:col-span-3">
                Belum ada panduan PDF yang dipublish.
              </div>
            )}
          </div>
        </div>
      </section>

      

      <footer className="relative overflow-hidden border-t border-white/10 bg-[#0b1322] px-6 py-10 text-white sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(17,167,255,0.08)_0%,rgba(17,167,255,0)_34%)]" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[34rem]">
            <Link className="inline-flex items-baseline text-[2rem] font-semibold tracking-[-0.06em]" href="/">
              <span className="text-[#10a7ff]">AIO</span>
              <span className="text-white">TRADE</span>
            </Link>
            <p className="mt-4 text-[1rem] leading-[1.75] text-white/70">{content.footer.description}</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.98rem] text-white/72">
            <Link className="transition hover:text-white" href="/#fitur">
              Feature
            </Link>
            <Link className="transition hover:text-white" href="/#harga">
              Harga
            </Link>
            <Link className="transition hover:text-white" href="/#faq">
              FAQ
            </Link>
            <Link className="transition hover:text-white" href="/guide">
              User Guide
            </Link>
            <Link className="transition hover:text-white" href="/blog">
              Blog
            </Link>
          </div>
        </div>
      </footer>

      {referralState.whatsappHref ? <FloatingWhatsAppButton href={referralState.whatsappHref} /> : null}
    </main>
  );
}
