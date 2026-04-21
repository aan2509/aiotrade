import { getPdfGuides } from "@/lib/member-guide-categories";
import { getPublishedMemberGuidePosts } from "@/lib/member-guides";
import { MemberPdfGuideSection } from "@/components/dashboard/member-guide-sections";

export default async function DashboardGuideFilesPage() {
  const guides = getPdfGuides(await getPublishedMemberGuidePosts());

  return (
    <MemberPdfGuideSection
      badge="Panduan"
      description="Kumpulan file PDF yang bisa Anda buka kapan saja untuk referensi materi, langkah teknis, dan panduan tertulis."
      emptyMessage="Belum ada file PDF panduan yang dipublish."
      guides={guides}
      title="File PDF"
    />
  );
}
