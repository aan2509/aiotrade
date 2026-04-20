"use client";

import Link from "next/link";
import Image from "next/image";
import { Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { landingImages } from "@/components/landing/data";
import type { LandingPageUIProps } from "@/components/landing/types";
import { cn } from "@/lib/utils";

type HeroSectionProps = Pick<LandingPageUIProps, "ctaExternal" | "ctaHref" | "ctaLabel">;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.11,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function HeroSection({
  ctaExternal = false,
  ctaHref,
  ctaLabel = "Gabung Komunitas",
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#0b1322] text-white">
      <motion.div
        animate={prefersReducedMotion ? { scale: 1 } : { scale: 1.02 }}
        className="absolute inset-0"
        initial={prefersReducedMotion ? false : { scale: 1.08 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          alt="Komunitas AIOTrade berkumpul di depan panggung Ruang Investasi."
          className="absolute inset-0 h-full w-full object-cover object-center"
          fill
          priority
          sizes="100vw"
          src={landingImages.heroImage}
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.1)_0%,rgba(4,8,16,0.22)_38%,rgba(4,8,16,0.42)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,15,26,0.02)_0%,rgba(9,15,26,0.26)_70%,rgba(9,15,26,0.42)_100%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col px-6 pb-6 pt-5 sm:px-8 lg:px-10">
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            animate="show"
            className="mx-auto flex w-full max-w-6xl flex-col items-center text-center"
            initial="hidden"
            variants={containerVariants}
          >
            <motion.p
              className="text-[0.72rem] uppercase tracking-[0.62em] text-white/82 sm:text-sm"
              variants={itemVariants}
            >
              Selamat Datang Di Komunitas
            </motion.p>

            <motion.h1
              className="mt-6 text-[4.4rem] font-medium uppercase leading-none tracking-[0.08em] text-white sm:text-[6.4rem] lg:text-[8.6rem]"
              variants={itemVariants}
            >
              <span className="text-[#0ea5ff]">AIO</span>TRADE
            </motion.h1>

            <motion.p
              className="mt-5 max-w-5xl text-[1.25rem] font-light leading-[1.35] text-white/88 sm:text-[1.8rem] lg:text-[2.35rem]"
              variants={itemVariants}
            >
              “Edukasi &amp; Trading Otomatis Bersama AIOTrade”
            </motion.p>
            <motion.div
              className="mt-10"
              variants={itemVariants}
              whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              <Link
                className={cn(
                  "group relative inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-lg border border-white/18 bg-[#ffcf10] px-8 py-4 text-lg font-semibold text-[#101726] shadow-[0_18px_48px_rgba(0,0,0,0.22)] transition duration-300 hover:border-[#ffe075] hover:bg-[#ffd83a] hover:shadow-[0_24px_56px_rgba(255,207,16,0.26)]",
                  "sm:min-w-[304px]",
                )}
                href={ctaHref}
                rel={ctaExternal ? "noreferrer" : undefined}
                target={ctaExternal ? "_blank" : undefined}
              >
                <span className="absolute inset-0 rounded-lg bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.34)_50%,transparent_78%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="relative z-10 inline-flex items-center gap-3">
                  <Users className="h-5 w-5 transition duration-300 group-hover:scale-110" />
                  {ctaLabel}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
