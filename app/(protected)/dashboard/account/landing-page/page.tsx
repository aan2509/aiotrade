import { buildProfileUrl, getSiteUrl } from "@/lib/site";
import { requireCurrentProfile } from "@/lib/auth";
import { MemberLandingPagePanel } from "@/components/dashboard/member-landing-page-panel";

export default async function DashboardAccountLandingPagePage() {
  const profile = await requireCurrentProfile();
  const siteUrl = await getSiteUrl();
  const landingPageUrl = buildProfileUrl(siteUrl, profile.username);

  return <MemberLandingPagePanel landingPageUrl={landingPageUrl} profile={profile} />;
}
