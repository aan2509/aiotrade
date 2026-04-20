import { CircleHelp } from "lucide-react";
import { faqEntries } from "@/components/landing/data";

export function FaqSection() {
  return (
    <section className="bg-[#0f1728] py-20 text-white" id="faq">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f6be4f]">
            F.A.Q
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Pertanyaan yang paling sering muncul.
          </h2>
          <p className="mt-5 text-base leading-8 text-white/72">
            Susunan FAQ dibuat ringkas supaya pengunjung cepat paham tanpa harus pindah ke
            halaman lain. Ini menjaga ritme halaman tetap seperti referensi.
          </p>
        </div>

        <div className="space-y-4">
          {faqEntries.map((entry) => (
            <details
              className="rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] px-5 py-4"
              key={entry.question}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium text-white">
                <span>{entry.question}</span>
                <CircleHelp className="h-5 w-5 shrink-0 text-[#11a7ff]" />
              </summary>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">{entry.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
