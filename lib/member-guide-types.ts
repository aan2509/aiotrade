export type MemberGuideType = "video" | "pdf";
export type MemberGuideSection = "activation" | "bot_settings" | "files";

export const MEMBER_GUIDE_SECTION_OPTIONS = [
  { description: "Embed video untuk proses aktivasi bot member.", label: "Aktivasi Bot", type: "video", value: "activation" },
  {
    description: "Embed video untuk pengaturan, strategi, dan konfigurasi bot.",
    label: "Pengaturan Bot",
    type: "video",
    value: "bot_settings",
  },
  { description: "Upload dokumen PDF yang dibuka di tab baru oleh member.", label: "File PDF", type: "pdf", value: "files" },
] as const satisfies ReadonlyArray<{
  description: string;
  label: string;
  type: MemberGuideType;
  value: MemberGuideSection;
}>;

export function getMemberGuideTypeForSection(section: MemberGuideSection): MemberGuideType {
  return section === "files" ? "pdf" : "video";
}

export function getMemberGuideSectionLabel(section: MemberGuideSection) {
  const match = MEMBER_GUIDE_SECTION_OPTIONS.find((option) => option.value === section);

  return match?.label ?? "Panduan Member";
}

export type MemberGuideAsset = {
  bytes: number | null;
  createdAt: string;
  format: string | null;
  id: string;
  label: string;
  originalFilename: string | null;
  publicId: string;
  secureUrl: string;
};

export type MemberGuidePost = {
  createdAt: string;
  description: string;
  embedUrl: string | null;
  fileAssetId: string | null;
  fileUrl: string | null;
  id: string;
  isPublished: boolean;
  publishedAt: string;
  section: MemberGuideSection;
  sortOrder: number;
  title: string;
  type: MemberGuideType;
  updatedAt: string;
};
