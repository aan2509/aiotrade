import { getBotSettingsGuides } from "@/lib/member-guide-categories";
import { getPublishedMemberGuidePosts } from "@/lib/member-guides";
import { MemberVideoGuideSection } from "@/components/dashboard/member-guide-sections";

export default async function DashboardGuideBotSettingsPage() {
  const guides = getBotSettingsGuides(await getPublishedMemberGuidePosts());

  return (
    <MemberVideoGuideSection
      badge="Panduan"
      description="Materi ini fokus ke strategi, pengembangan penggunaan bot, dan penyesuaian yang relevan untuk pemakaian lanjutan."
      emptyMessage="Belum ada video materi lanjutan yang dipublish."
      guides={guides}
      title="Materi Lanjutan"
    />
  );
}
