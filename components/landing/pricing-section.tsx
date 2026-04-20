import Link from "next/link";
import { Check } from "lucide-react";
import { plans } from "@/components/landing/data";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PricingSectionProps = {
  ctaHref: string;
};

export function PricingSection({ ctaHref }: PricingSectionProps) {
  return (
    <section className="bg-[#f8f6f0] py-20" id="harga">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="max-w-3xl text-center lg:mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#126ac8]">
            Biaya registrasi
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-[#111827] sm:text-5xl">Harga</h2>
          <p className="mt-5 text-base leading-8 text-[#475569]">
            Paket dibuat sederhana supaya pengunjung bisa memutuskan lebih cepat tanpa harus
            membaca terlalu banyak detail teknis.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              className={cn(
                "rounded-lg border px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]",
                plan.emphasis
                  ? "border-[#f6be4f] bg-[#111827] text-white"
                  : "border-[#e5dcc7] bg-white text-[#111827]",
              )}
              key={plan.name}
            >
              {plan.highlight ? (
                <span className="inline-flex rounded-full bg-[#f6be4f] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#141a27]">
                  {plan.highlight}
                </span>
              ) : null}

              <h3 className="mt-4 text-3xl font-semibold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-5xl font-semibold">{plan.price}</span>
                <span
                  className={cn(
                    "text-sm font-semibold uppercase tracking-[0.18em]",
                    plan.emphasis ? "text-[#7dd3fc]" : "text-[#16a34a]",
                  )}
                >
                  Lifetime
                </span>
              </div>
              <p
                className={cn(
                  "mt-5 text-base leading-8",
                  plan.emphasis ? "text-white/72" : "text-[#475569]",
                )}
              >
                {plan.description}
              </p>

              <ul
                className={cn(
                  "mt-6 space-y-3 text-sm",
                  plan.emphasis ? "text-white/80" : "text-[#334155]",
                )}
              >
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#11a7ff]" />
                  Akses satu kali bayar
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#11a7ff]" />
                  Dukungan onboarding dan referral
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#11a7ff]" />
                  CTA langsung masuk ke alur daftar yang sama
                </li>
              </ul>

              <Link
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-8 h-12 w-full rounded-lg text-base",
                  plan.emphasis
                    ? "bg-[#11a7ff] text-white hover:bg-[#3ab6ff]"
                    : "bg-[#111827] text-white hover:bg-[#1f2937]",
                )}
                href={ctaHref}
              >
                Daftar Sekarang
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
