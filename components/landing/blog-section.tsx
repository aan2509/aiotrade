import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/components/landing/data";

export function BlogSection() {
  return (
    <section className="bg-[#f4f2ec] py-20" id="blog">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f6be4f]">
              Blog dan insight
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-[#111827] sm:text-5xl">
              Materi promo yang terasa hidup.
            </h2>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#126ac8] hover:text-[#0b5aa8]"
            href="#fitur"
          >
            Lihat lagi fiturnya
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              className="overflow-hidden rounded-lg border border-[#e7dcc8] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
              key={article.title}
            >
              <div className="relative flex aspect-[16/10] items-center justify-center bg-[#101828] p-8">
                <Image
                  alt={article.title}
                  className="h-auto max-h-full w-auto max-w-full"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  src={article.image}
                />
                <span className="absolute right-4 top-4 rounded-full bg-[#22c55e] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  {article.label}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#111827]">{article.title}</h3>
                <p className="mt-3 text-base leading-8 text-[#475569]">{article.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
