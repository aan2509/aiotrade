import { getActivationGuides } from "@/lib/member-guide-categories";
import { getPublishedMemberGuidePosts } from "@/lib/member-guides";
import { MemberVideoGuideSection } from "@/components/dashboard/member-guide-sections";

export default async function DashboardGuideActivationPage() {
  const guides = getActivationGuides(await getPublishedMemberGuidePosts());

  return (
    <MemberVideoGuideSection
      badge="Panduan"
      description="Materi langkah awal untuk mengaktifkan bot dan menyiapkan alur penggunaan member area dengan lebih cepat."
      emptyMessage="Belum ada video panduan aktivasi bot yang dipublish."
      guides={guides}
      title="Aktivasi bot"
    />
  );
}
