import "server-only";

import { prisma } from "@/lib/prisma";

type AdminCandidate = {
  email: string | null;
  id: string;
  isAdmin: boolean;
  username: string;
};

function getEnvAdminEmail() {
  return process.env.DEFAULT_ADMIN_EMAIL?.trim().toLowerCase() || null;
}

function getEnvAdminUsername() {
  return process.env.DEFAULT_ADMIN_USERNAME?.trim().toLowerCase() || null;
}

export function matchesEnvAdmin(candidate: Pick<AdminCandidate, "email" | "username">) {
  const adminEmail = getEnvAdminEmail();
  const adminUsername = getEnvAdminUsername();

  if (!adminEmail && !adminUsername) {
    return false;
  }

  return candidate.email === adminEmail || candidate.username === adminUsername;
}

export async function ensureEnvAdmin<T extends AdminCandidate>(candidate: T): Promise<T> {
  if (candidate.isAdmin || !matchesEnvAdmin(candidate)) {
    return candidate;
  }

  try {
    await prisma.profile.update({
      where: {
        id: candidate.id,
      },
      data: {
        isAdmin: true,
      },
    });
  } catch (error) {
    const isStaleIsAdminUpdate =
      error instanceof Error && error.message.includes("Unknown argument `isAdmin`");

    if (!isStaleIsAdminUpdate) {
      throw error;
    }

    await prisma.$executeRaw`
      UPDATE "public"."profiles"
      SET "is_admin" = true
      WHERE "id" = ${candidate.id}
    `;
  }

  return {
    ...candidate,
    isAdmin: true,
  } as T;
}
