import { prisma } from "@/lib/prisma";
import { buildWhatsAppUrl } from "@/lib/site";
import { parsePublicUsernameCandidate } from "@/lib/username-rules";

export const LANDING_REFERRAL_COOKIE_NAME = "landing_referral";
export const LANDING_REFERRAL_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export type ReferralOwner = {
  username: string;
  whatsapp: string | null;
};

export type ReferralLandingState = {
  owner: ReferralOwner | null;
  ctaExternal: boolean;
  ctaHref: string;
  signupHref: string;
};

export function buildReferralSignupUrl(username: string) {
  return `/signup?ref=${encodeURIComponent(username)}`;
}

export function parseReferralUsername(value: string | null | undefined) {
  return parsePublicUsernameCandidate(value);
}

export async function getActiveReferralOwner(username: string | null | undefined) {
  const normalizedUsername = parseReferralUsername(username);

  if (!normalizedUsername) {
    return null;
  }

  const profiles = await prisma.$queryRaw<ReferralOwner[]>`
    SELECT
      "username",
      "whatsapp"
    FROM "public"."profiles"
    WHERE "username" = ${normalizedUsername}
      AND "is_lp_active" = true
    LIMIT 1
  `;

  return profiles[0] ?? null;
}

export async function resolveHomepageReferralState(cookieReferralUsername: string | null | undefined) {
  const owner = await getActiveReferralOwner(cookieReferralUsername);

  if (!owner) {
    return {
      owner: null,
      ctaExternal: false,
      ctaHref: "/login",
      signupHref: "/login",
    } satisfies ReferralLandingState;
  }

  const signupHref = buildReferralSignupUrl(owner.username);
  const whatsappUrl = owner.whatsapp
    ? buildWhatsAppUrl(owner.whatsapp, owner.username)
    : null;

  return {
    owner,
    ctaExternal: Boolean(whatsappUrl),
    ctaHref: whatsappUrl ?? signupHref,
    signupHref,
  } satisfies ReferralLandingState;
}
