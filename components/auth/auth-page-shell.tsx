import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import heroImage from "@/bahan foto/hero.jpg";

type AuthPageShellProps = {
  badge: ReactNode;
  title: string;
  description: string;
  sideBadge: string;
  sideTitle: string;
  sideDescription: string;
  highlights: string[];
  children: ReactNode;
};

export function AuthPageShell({
  badge,
  title,
  description,
  sideBadge,
  sideTitle,
  sideDescription,
  highlights,
  children,
}: AuthPageShellProps) {
  return (
    <main className="flex flex-1 bg-[#08111f]">
      <div className="grid min-h-screen w-full lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden lg:block">
          <Image
            alt="Komunitas AIOTrade di acara edukasi."
            className="absolute inset-0 h-full w-full object-cover"
            fill
            priority
            sizes="50vw"
            src={heroImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.45)_0%,rgba(5,10,18,0.72)_48%,rgba(5,10,18,0.9)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(3,7,18,0.84)_0%,rgba(8,17,31,0.54)_46%,rgba(3,7,18,0.8)_100%)]" />

          <div className="relative flex h-full flex-col justify-between px-10 py-10 text-white xl:px-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/10 px-3 py-2 text-sm text-white/90 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 animate-pulse text-[#6dd3ff]" />
                {sideBadge}
              </div>
              <h1 className="mt-8 max-w-xl text-5xl font-semibold leading-tight tracking-tight">
                {sideTitle}
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-white/74">{sideDescription}</p>
            </div>

            <div className="grid gap-4">
              {highlights.map((item, index) => (
                <div
                  className="rounded-lg border border-white/12 bg-[rgba(10,18,34,0.7)] p-5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
                  key={item}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#11a7ff]/14 text-[#7dd3fc]">
                      <Check className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-white/45">
                        0{index + 1}
                      </p>
                      <p className="mt-2 text-base leading-7 text-white/88">{item}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12 sm:px-8 lg:px-10">
          <div className="w-full max-w-xl">
            <Link
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
              href="/"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke halaman utama
            </Link>

            <div className="rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.96)_100%)] p-6 shadow-[0_24px_60px_rgba(2,8,23,0.38)] sm:p-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-lg border border-sky-100 bg-sky-50 px-3 py-2 text-sm text-sky-700">
                  {badge}
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
                <p className="max-w-md text-sm leading-7 text-slate-600">{description}</p>
              </div>

              <div className="mt-8">{children}</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
