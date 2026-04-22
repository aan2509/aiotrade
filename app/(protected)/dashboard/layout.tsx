import { cookies, headers } from "next/headers";
import { requireCurrentProfile } from "@/lib/auth";
import { MemberShell } from "@/components/dashboard/member-shell";
import { parseMemberTheme } from "@/lib/member-theme";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireCurrentProfile();
  const [headerStore, cookieStore] = await Promise.all([headers(), cookies()]);
  const pathname = headerStore.get("x-current-pathname") ?? "/dashboard";
  const initialTheme = parseMemberTheme(cookieStore.get("member-theme")?.value);

  return (
    <MemberShell initialTheme={initialTheme} isAdmin={profile.isAdmin} pathname={pathname} username={profile.username}>
      {children}
    </MemberShell>
  );
}
