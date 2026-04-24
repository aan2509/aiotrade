import { getActivationGuides } from "@/lib/member-guide-categories";
import { getPublishedMemberGuidePosts } from "@/lib/member-guides";
import { MemberVideoGuideSection } from "@/components/dashboard/member-guide-sections";

export default async function DashboardGuideActivationPage() {
  const guides = getActivationGuides(await getPublishedMemberGuidePosts());

  return (
    <MemberVideoGuideSection
      badge="Panduan"
      description="Materi langkah awal untuk setup bot, sambungan API, dan persiapan penggunaan member area."
      emptyMessage="Belum ada video panduan setup bot yang dipublish."
      guides={guides}
      title="Setup Bot"
    />
  );
}
