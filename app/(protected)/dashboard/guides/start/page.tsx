import { MemberVideoGuideSection } from "@/components/dashboard/member-guide-sections";
import { getStartGuides } from "@/lib/member-guide-categories";
import { getPublishedMemberGuidePosts } from "@/lib/member-guides";

export default async function DashboardGuideStartPage() {
  const guides = getStartGuides(await getPublishedMemberGuidePosts());

  return (
    <MemberVideoGuideSection
      badge="Panduan"
      description="Materi pembuka untuk mengenali langkah penting sebelum lanjut ke setup bot maupun materi lanjutan."
      emptyMessage="Belum ada video panduan mulai yang dipublish."
      guides={guides}
      title="Mulai"
    />
  );
}
