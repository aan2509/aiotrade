"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionBackgroundLayer } from "@/components/landing/section-background-layer";
import type { FaqContent } from "@/components/landing/types";
import { Reveal } from "@/components/ui/reveal";

type FaqSectionProps = {
  content: FaqContent;
};

export function FaqSection({ content }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative py-20 text-[#111827]" id="faq">
      <SectionBackgroundLayer
        config={content.background}
        fallbackOverlayColor="#f4f2ec"
        fallbackOverlayOpacity={18}
        fallbackPreset="warm-ivory"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal className="landing-glass-panel overflow-hidden rounded-[30px]">
          <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.54)_0%,rgba(255,255,255,0.18)_100%)] px-6 py-8 text-center sm:px-10 sm:py-10">
            <p className="text-[2.9rem] font-bold tracking-[0.04em] text-[#f7c85f] sm:text-[4rem]">
              {content.title}
            </p>
            <p className="mt-2 text-lg text-[#52627b] sm:text-[1.05rem]">
              {content.subtitle}
            </p>
          </div>

          <div className="bg-transparent">
            {content.items.map((entry, index) => (
              <Reveal delay={index * 0.04} direction="right" distance={28} duration={1.02} key={entry.question}>
                <div className="border-b border-white/60 last:border-b-0">
                  <button
                    aria-controls={`faq-panel-${index}`}
                    aria-expanded={openIndex === index}
                    className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[1.05rem] font-medium transition duration-300 sm:px-7 sm:text-[1.15rem] ${
                      openIndex === index
                        ? "bg-[linear-gradient(135deg,#e3f4fd_0%,rgba(227,244,253,0.86)_100%)] text-[#0f3f67]"
                        : "text-[#1f2937] hover:bg-white/42"
                    }`}
                    onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                    type="button"
                  >
                    <span>{entry.question}</span>
                    <motion.span
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center ${
                        openIndex === index ? "text-[#0f3f67]" : "text-[#1f2937]"
                      }`}
                      transition={{ duration: 0.22 }}
                    >
                      <ChevronDown className="h-4 w-4" strokeWidth={2.4} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index ? (
                      <motion.div
                        animate={{ height: "auto", opacity: 1 }}
                        className="overflow-hidden"
                        exit={{ height: 0, opacity: 0 }}
                        id={`faq-panel-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="bg-white/34 px-6 pb-5 pt-4 text-[0.98rem] leading-8 text-[#5b6474] backdrop-blur-sm sm:px-7">
                          {entry.answer}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
