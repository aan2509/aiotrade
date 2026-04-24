import { randomBytes, scryptSync } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const raw = readFileSync(filePath, "utf8");

  for (const line of raw.split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");

    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(resolve(process.cwd(), ".env"));
loadEnvFile(resolve(process.cwd(), ".env.local"));

const connectionString = process.env.DATABASE_URL ?? process.env.DIRECT_URL;

if (!connectionString) {
  throw new Error("Missing Prisma database connection string. Set DIRECT_URL or DATABASE_URL.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");

  return `${salt}:${hash}`;
}

async function main() {
  const passwordHash = hashPassword(process.env.SEED_REGISTER_PASSWORD ?? "register-seed-placeholder");

  await prisma.profile.upsert({
    where: {
      username: "register",
    },
    update: {
      email: null,
      isAdmin: false,
      isLpActive: true,
      referralLink: null,
      referredBy: null,
      whatsapp: null,
    },
    create: {
      email: null,
      isAdmin: false,
      isLpActive: true,
      passwordHash,
      referralLink: null,
      referredBy: null,
      username: "register",
      whatsapp: null,
    },
  });

  console.log('Seeded special referral username "register".');
}

main()
  .catch((error) => {
    console.error("Failed to seed register user.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
