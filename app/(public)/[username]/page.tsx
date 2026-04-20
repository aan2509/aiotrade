import { notFound } from "next/navigation";
import LandingPageUI from "@/components/LandingPageUI";
import { prisma } from "@/lib/prisma";
import { buildWhatsAppUrl } from "@/lib/site";

type ReplicatedLandingPageProps = {
  params: Promise<{ username: string }>;
};

type PublicProfile = {
  isLpActive: boolean;
  username: string;
  whatsapp: string | null;
};

export default async function ReplicatedLandingPage({
  params,
}: ReplicatedLandingPageProps) {
  const { username } = await params;
  const normalizedUsername = username.toLowerCase();
  let profile: PublicProfile | null = null;

  try {
    profile = await prisma.profile.findFirst({
      where: {
        username: normalizedUsername,
      },
      select: {
        isLpActive: true,
        username: true,
        whatsapp: true,
      },
    });
  } catch (error) {
    const isStaleWhatsappSelect =
      error instanceof Error &&
      error.message.includes("Unknown field `whatsapp` for select statement on model `Profile`");

    if (!isStaleWhatsappSelect) {
      throw error;
    }

    const profiles = await prisma.$queryRaw<PublicProfile[]>`
      SELECT
        "is_lp_active" AS "isLpActive",
        "username",
        "whatsapp"
      FROM "public"."profiles"
      WHERE "username" = ${normalizedUsername}
      LIMIT 1
    `;

    profile = profiles[0] ?? null;
  }

  if (!profile?.isLpActive) {
    notFound();
  }

  const fallbackSignupUrl = `/signup?ref=${encodeURIComponent(profile.username)}`;
  const whatsappUrl = profile.whatsapp
    ? buildWhatsAppUrl(profile.whatsapp, profile.username)
    : null;

  return (
    <LandingPageUI
      ctaExternal={Boolean(whatsappUrl)}
      ctaHref={whatsappUrl ?? fallbackSignupUrl}
      ctaLabel="Gabung Komunitas"
      signupCtaHref={fallbackSignupUrl}
    />
  );
}
