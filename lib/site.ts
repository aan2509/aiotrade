import { headers } from "next/headers";

function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export async function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL);
  }

  const headerStore = await headers();
  const host =
    headerStore.get("x-forwarded-host") ?? headerStore.get("host") ?? null;

  if (!host) {
    return "https://yourdomain.com";
  }

  const protocol =
    headerStore.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}

export function buildProfileUrl(siteUrl: string, username: string) {
  const baseUrl = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
  return new URL(username, baseUrl).toString();
}

function normalizeWhatsappNumber(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  const digits = trimmed.replace(/\D/g, "");

  if (digits.startsWith("00")) {
    return digits.slice(2);
  }

  if (trimmed.startsWith("+")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }

  return digits;
}

export function buildWhatsAppUrl(phone: string, username?: string) {
  const normalizedPhone = normalizeWhatsappNumber(phone);

  if (!normalizedPhone) {
    return null;
  }

  const message = username
    ? `Halo kak ${username}, saya tertarik gabung komunitas AIOTrade.`
    : "Halo, saya tertarik gabung komunitas AIOTrade.";

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
