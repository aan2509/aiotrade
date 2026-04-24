"use client";

import { BenefitsSection } from "@/components/landing/benefits-section";
import { BannerAdsSection } from "@/components/landing/banner-ads-section";
import { BlogSection } from "@/components/landing/blog-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FooterSection } from "@/components/landing/footer-section";
import { FloatingWhatsAppButton } from "@/components/landing/floating-whatsapp-button";
import { GuideSection } from "@/components/landing/guide-section";
import { LandingHeader } from "@/components/landing/landing-header";
import { OverviewSection } from "@/components/landing/overview-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialSection } from "@/components/landing/testimonial-section";
import { VideoSection } from "@/components/landing/video-section";
import type { LandingPageUIProps } from "@/components/landing/types";

export default function LandingPageUI({
  blogPosts = [],
  content,
  ctaHref,
  previewMode = false,
  signupCtaExternal,
  signupCtaHref,
  whatsappHref,
}: LandingPageUIProps) {
  const registrationHref = signupCtaHref ?? ctaHref;
  const registrationExternal = signupCtaExternal ?? false;

  return (
    <main className="flex-1 bg-[#f4f2ec] text-[#111827]" id="top">
      <div className="relative">
        <LandingHeader previewMode={previewMode} />
        <OverviewSection
          content={content.overview}
          ctaExternal={registrationExternal}
          ctaHref={registrationHref}
          previewMode={previewMode}
        />
        <BenefitsSection content={content.benefits} />
        <PricingSection content={content.pricing} ctaExternal={registrationExternal} ctaHref={registrationHref} />
        <VideoSection content={content.video} />
        <FaqSection content={content.faq} />
        <GuideSection content={content.guide} />
        <TestimonialSection content={content.testimonial} />
        <BlogSection content={content.blog} posts={blogPosts} />
        <BannerAdsSection content={content.bannerAds} />
        <FooterSection
          content={content.footer}
          ctaExternal={registrationExternal}
          ctaHref={registrationHref}
          previewMode={previewMode}
        />
      </div>
      {!previewMode && whatsappHref ? <FloatingWhatsAppButton href={whatsappHref} /> : null}
    </main>
  );
}
