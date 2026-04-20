import { cookies } from "next/headers";
import type { Metadata } from "next";
import LandingPageUI from "@/components/LandingPageUI";
import { getHomepageContent } from "@/lib/homepage-content";
import { LANDING_REFERRAL_COOKIE_NAME, resolveHomepageReferralState } from "@/lib/referral";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AIOTrade | Edukasi & Trading Otomatis",
  description:
    "Landing page AIOTrade untuk edukasi, komunitas, dan trading otomatis dengan alur signup yang tetap utuh.",
};

export default async function HomePage() {
  const [content, cookieStore] = await Promise.all([getHomepageContent(), cookies()]);
  const referralState = await resolveHomepageReferralState(
    cookieStore.get(LANDING_REFERRAL_COOKIE_NAME)?.value ?? null,
  );

  return (
    <LandingPageUI
      content={content}
      ctaExternal={referralState.ctaExternal}
      ctaHref={referralState.ctaHref}
      signupCtaHref={referralState.signupHref}
    />
  );
}
