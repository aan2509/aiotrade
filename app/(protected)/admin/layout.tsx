import { headers } from "next/headers";
import { requireAdminProfile } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireAdminProfile();
  const pathname = (await headers()).get("x-current-pathname") ?? "/admin";

  return (
    <AdminShell pathname={pathname} username={profile.username}>
      {children}
    </AdminShell>
  );
}
