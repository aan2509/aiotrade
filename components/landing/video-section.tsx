"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SectionBackgroundLayer } from "@/components/landing/section-background-layer";
import type { VideoSectionContent } from "@/components/landing/types";
import { Reveal } from "@/components/ui/reveal";
import { buildAutoplayEmbedUrl, normalizeMemberGuideVideoUrl } from "@/lib/member-guide-utils";

type VideoSectionProps = {
  content: VideoSectionContent;
};

export function VideoSection({ content }: VideoSectionProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  const normalizedEmbedUrl = useMemo(
    () => normalizeMemberGuideVideoUrl(content.embedUrl),
    [content.embedUrl],
  );
  const iframeSrc = useMemo(
    () => buildAutoplayEmbedUrl(content.embedUrl, isInView),
    [content.embedUrl, isInView],
  );

  useEffect(() => {
    const node = frameRef.current;

    if (!node || !normalizedEmbedUrl) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry?.isIntersecting ?? false);
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.55,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [normalizedEmbedUrl]);

  if (!content.isVisible || !normalizedEmbedUrl) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-24" id="video">
      <SectionBackgroundLayer
        config={content.background}
        fallbackOverlayColor="#0b1322"
        fallbackOverlayOpacity={34}
        fallbackPreset="dark-slate-cinematic"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,167,255,0.18),transparent_34%),linear-gradient(180deg,rgba(8,14,24,0.42)_0%,rgba(8,14,24,0.78)_100%)]" />
      <div className="pointer-events-none absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-[#10a7ff]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-[-8%] h-72 w-72 rounded-full bg-[#f6be4f]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-[1.05rem] font-semibold tracking-[-0.02em] text-[#58a6ff] sm:text-[1.3rem]">
            {content.eyebrow}
          </p>
          <h2 className="mt-5 text-[3rem] font-semibold leading-none tracking-[-0.045em] text-white sm:text-[4.45rem]">
            {content.title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-[1.02rem] leading-[1.85] text-white/74 sm:text-[1.08rem]">
            {content.description}
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.08} direction="right" distance={42}>
          <div className="landing-glass-dark-panel overflow-hidden rounded-[30px]">
            <div className="p-4 sm:p-6">
              <div
                className="relative overflow-hidden rounded-[26px] border border-white/8 bg-[#050a12] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_48px_rgba(2,6,23,0.28)]"
                ref={frameRef}
              >
                <div className="aspect-video">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                    src={iframeSrc ?? normalizedEmbedUrl}
                    title={content.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
