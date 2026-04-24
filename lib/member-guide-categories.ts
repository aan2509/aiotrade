import type { MemberGuidePost } from "@/lib/member-guide-types";

export function getStartGuides(guides: MemberGuidePost[]) {
  return guides.filter((guide) => guide.section === "start" && guide.type === "video");
}

export function getActivationGuides(guides: MemberGuidePost[]) {
  return guides.filter((guide) => guide.section === "activation" && guide.type === "video");
}

export function getBotSettingsGuides(guides: MemberGuidePost[]) {
  return guides.filter((guide) => guide.section === "bot_settings" && guide.type === "video");
}

export function getPdfGuides(guides: MemberGuidePost[]) {
  return guides.filter((guide) => guide.section === "files" && guide.type === "pdf");
}
