import { z } from "zod";
import { prisma } from "@/lib/prisma";

const usernameSchema = z
  .string()
  .trim()
  .min(3)
  .max(24)
  .regex(/^[a-z0-9_]+$/)
  .transform((value) => value.toLowerCase());

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const parsed = usernameSchema.safeParse(searchParams.get("username"));

  if (!parsed.success) {
    return Response.json(
      {
        available: false,
        message: "Pakai 3-24 huruf kecil, angka, atau underscore.",
      },
      { status: 400 },
    );
  }

  const profile = await prisma.profile.findFirst({
    where: {
      username: parsed.data,
    },
    select: {
      id: true,
    },
  });

  return Response.json({
    available: !profile,
    message: profile ? "Username ini sudah dipakai." : "Username ini masih tersedia.",
  });
}
