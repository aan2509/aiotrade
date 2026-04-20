import Image from "next/image";
import { features, landingImages } from "@/components/landing/data";

export function BenefitsSection() {
  return (
    <section className="relative overflow-hidden py-20 text-white">
      <Image
        alt="Komunitas AIOTrade di acara edukasi trading."
        className="absolute inset-0 h-full w-full object-cover"
        fill
        sizes="100vw"
        src={landingImages.heroImage}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,17,0.88)_0%,rgba(9,11,17,0.78)_100%)]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f6be4f]">
            Mengapa memilih AIOTrade
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Dibuat untuk pemula yang butuh kejelasan, juga trader yang suka sistematis.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
            Referensinya banyak memakai foto nyata, overlay gelap, dan blok informasi yang
            langsung ke poin. Pola itu dipertahankan di sini supaya halaman terasa hangat,
            relevan, dan tetap fokus ke konversi.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                className="rounded-lg border border-white/12 bg-[#111a2d]/78 p-6 backdrop-blur-sm"
                key={feature.title}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#f6be4f]/15 text-[#f6be4f]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-base leading-7 text-white/70">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
