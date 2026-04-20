import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaSectionProps = {
  ctaHref: string;
};

export function CtaSection({ ctaHref }: CtaSectionProps) {
  return (
    <section className="bg-[#111827] py-16 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-lg border border-white/10 bg-[#0f1728] px-6 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#11a7ff]">
            Siap mulai?
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Bawa pengunjung dari landing page ke signup tanpa putus alur.
          </h2>
          <p className="mt-4 text-base leading-8 text-white/72">
            Halaman depan sekarang terasa jauh lebih dekat ke referensi, tapi semua aksi penting
            tetap masuk ke flow aplikasi yang sama seperti sebelumnya.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 rounded-lg bg-[#11a7ff] px-6 text-base text-white hover:bg-[#3ab6ff]",
            )}
            href={ctaHref}
          >
            Daftar sekarang
          </Link>
          <Link
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[rgba(255,255,255,0.14)] px-6 text-base text-white hover:bg-[rgba(255,255,255,0.08)]"
            href="#faq"
          >
            <MessageCircle className="h-4 w-4" />
            Lihat FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}
