import type { StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";

export type LandingPageUIProps = {
  banner?: string;
  content: HomepageContent;
  ctaHref: string;
  ctaExternal?: boolean;
  ctaLabel?: string;
  signupCtaHref?: string;
};

export type NavItem = {
  accent: string;
  label: string;
  href: string;
};

export type StatItem = {
  label: string;
  value: string;
};

export type TickerItem = {
  symbol: string;
  price: string;
  change: string;
  positive?: boolean;
  logoUrl?: string;
  name?: string;
  rank?: number;
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Plan = {
  name: string;
  price: string;
  description: string;
  highlight?: string;
  emphasis?: boolean;
};

export type FaqEntry = {
  question: string;
  answer: string;
};

export type Step = {
  number: string;
  title: string;
  description: string;
};

export type Article = {
  title: string;
  description: string;
  image: StaticImageData;
  label: string;
};

export type PartnerLogo = {
  src: StaticImageData;
  alt: string;
};

export type HeroContent = {
  eyebrow: string;
  titleBlue: string;
  titleWhite: string;
  subtitle: string;
  ctaLabel: string;
};

export type OverviewContent = {
  titleBlue: string;
  titleWhite: string;
  description: string;
  ctaLabel: string;
};

export type BenefitItemContent = {
  title: string;
  description: string;
};

export type BenefitsContent = {
  heading: string;
  description: string;
  items: BenefitItemContent[];
};

export type PricingPlanContent = {
  name: string;
  price: string;
  description: string;
  highlight?: string;
  emphasis?: boolean;
};

export type PricingContent = {
  eyebrow: string;
  title: string;
  buttonLabel: string;
  plans: PricingPlanContent[];
};

export type FaqContent = {
  title: string;
  subtitle: string;
  items: FaqEntry[];
};

export type GuideStepContent = {
  number: string;
  title: string;
  description: string;
};

export type GuideContent = {
  eyebrow: string;
  title: string;
  buttonLabel: string;
  steps: GuideStepContent[];
};

export type BlogArticleContent = {
  title: string;
  description: string;
  label: string;
};

export type BlogContent = {
  title: string;
  items: BlogArticleContent[];
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterContent = {
  description: string;
  copyright: string;
  guideLinks: FooterLink[];
};

export type HomepageContent = {
  hero: HeroContent;
  overview: OverviewContent;
  benefits: BenefitsContent;
  pricing: PricingContent;
  faq: FaqContent;
  guide: GuideContent;
  blog: BlogContent;
  footer: FooterContent;
};
