import { steps } from "@/components/landing/data";

export function GuideSection() {
  return (
    <section className="bg-white py-20" id="panduan">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="max-w-3xl text-center lg:mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#126ac8]">
            Bagaimana AIOTrade bekerja
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-[#111827] sm:text-5xl">
            3 langkah mudah
          </h2>
          <p className="mt-5 text-base leading-8 text-[#475569]">
            Bagian ini menggantikan blok user guide di referensi dengan langkah yang lebih jelas
            dan langsung bisa dipahami pengunjung baru.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {steps.map((step) => (
            <article
              className="rounded-lg border border-[#dbe2ea] bg-[#f8fafc] p-7 shadow-[0_16px_32px_rgba(15,23,42,0.06)]"
              key={step.number}
            >
              <p className="text-6xl font-semibold tracking-tight text-[#126ac8]">{step.number}</p>
              <h3 className="mt-5 text-2xl font-semibold text-[#111827]">{step.title}</h3>
              <p className="mt-4 text-base leading-8 text-[#475569]">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
