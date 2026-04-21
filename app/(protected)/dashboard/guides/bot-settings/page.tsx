import { getBotSettingsGuides } from "@/lib/member-guide-categories";
import { getPublishedMemberGuidePosts } from "@/lib/member-guides";
import { MemberVideoGuideSection } from "@/components/dashboard/member-guide-sections";

export default async function DashboardGuideBotSettingsPage() {
  const guides = getBotSettingsGuides(await getPublishedMemberGuidePosts());

  return (
    <MemberVideoGuideSection
      badge="Panduan"
      description="Materi ini fokus ke pengaturan bot, konfigurasi parameter, dan penyesuaian yang relevan untuk penggunaan harian."
      emptyMessage="Belum ada video panduan pengaturan bot yang dipublish."
      guides={guides}
      title="Pengaturan bot"
    />
  );
}
