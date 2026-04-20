"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminProfile } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function deleteUserAction(formData: FormData) {
  const admin = await requireAdminProfile();
  const userId = String(formData.get("userId") ?? "").trim();

  if (!userId) {
    redirect("/admin/users?status=error");
  }

  if (userId === admin.id) {
    redirect("/admin/users?status=self-delete-blocked");
  }

  try {
    await prisma.profile.delete({
      where: {
        id: userId,
      },
    });
  } catch {
    redirect("/admin/users?status=error");
  }

  revalidatePath("/admin/users");
  redirect("/admin/users?status=deleted");
}
