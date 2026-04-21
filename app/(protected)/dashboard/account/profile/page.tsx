import { requireCurrentProfile } from "@/lib/auth";
import { MemberAccountOverview } from "@/components/dashboard/member-account-overview";

export default async function DashboardAccountProfilePage() {
  const profile = await requireCurrentProfile();

  return <MemberAccountOverview profile={profile} />;
}
