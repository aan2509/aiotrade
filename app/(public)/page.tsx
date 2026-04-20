import type { Metadata } from "next";
import LandingPageUI from "@/components/LandingPageUI";

export const metadata: Metadata = {
  title: "AIOTrade | Edukasi & Trading Otomatis",
  description:
    "Landing page AIOTrade untuk edukasi, komunitas, dan trading otomatis dengan alur signup yang tetap utuh.",
};

export default function HomePage() {
  return <LandingPageUI ctaHref="/signup" signupCtaHref="/signup" />;
}
