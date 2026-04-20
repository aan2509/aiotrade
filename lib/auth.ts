import "server-only";

import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE_NAME = "referral_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type SessionPayload = {
  exp: number;
  sub: string;
};

type CurrentProfile = {
  email: string | null;
  id: string;
  isLpActive: boolean;
  referredBy: string | null;
  username: string;
  whatsapp: string | null;
};

function getAuthSecret() {
  return (
    process.env.AUTH_SECRET ??
    process.env.SESSION_SECRET ??
    process.env.DATABASE_URL ??
    process.env.DIRECT_URL ??
    "local-dev-secret"
  );
}

function signSessionPayload(payload: string) {
  return createHmac("sha256", getAuthSecret())
    .update(payload)
    .digest("base64url");
}

function encodeSession(payload: SessionPayload) {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signSessionPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

function decodeSession(cookieValue: string): SessionPayload | null {
  const [encodedPayload, signature] = cookieValue.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signSessionPayload(encodedPayload);
  const providedSignature = Buffer.from(signature);
  const actualSignature = Buffer.from(expectedSignature);

  if (
    providedSignature.length !== actualSignature.length ||
    !timingSafeEqual(providedSignature, actualSignature)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as SessionPayload;

    if (typeof payload.sub !== "string" || typeof payload.exp !== "number") {
      return null;
    }

    if (payload.exp <= Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");

  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, expectedHash] = storedHash.split(":");

  if (!salt || !expectedHash) {
    return false;
  }

  const expectedBuffer = Buffer.from(expectedHash, "hex");
  const actualBuffer = scryptSync(password, salt, 64);

  return (
    expectedBuffer.length === actualBuffer.length &&
    timingSafeEqual(expectedBuffer, actualBuffer)
  );
}

export async function createUserSession(userId: string) {
  const cookieStore = await cookies();
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;

  cookieStore.set(SESSION_COOKIE_NAME, encodeSession({ exp: expiresAt, sub: userId }), {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSessionUserId() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!cookieValue) {
    return null;
  }

  return decodeSession(cookieValue)?.sub ?? null;
}

export async function getCurrentProfile() {
  const userId = await getSessionUserId();

  if (!userId) {
    return null;
  }

  try {
    return await prisma.profile.findFirst({
      where: {
        id: userId,
      },
      select: {
        email: true,
        id: true,
        isLpActive: true,
        referredBy: true,
        whatsapp: true,
        username: true,
      },
    });
  } catch (error) {
    const isStaleWhatsappSelect =
      error instanceof Error &&
      error.message.includes("Unknown field `whatsapp` for select statement on model `Profile`");

    if (!isStaleWhatsappSelect) {
      throw error;
    }

    const profiles = await prisma.$queryRaw<CurrentProfile[]>`
      SELECT
        "id",
        "email",
        "is_lp_active" AS "isLpActive",
        "referred_by" AS "referredBy",
        "whatsapp",
        "username"
      FROM "public"."profiles"
      WHERE "id" = ${userId}
      LIMIT 1
    `;

    return profiles[0] ?? null;
  }
}

export async function requireCurrentProfile() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  return profile;
}
