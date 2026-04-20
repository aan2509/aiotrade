import { HomepageSettingsView } from "@/components/admin/homepage-settings-view";
import { getHomepageContent } from "@/lib/homepage-content";

type AdminPageProps = {
  searchParams: Promise<{
    section?: string;
    status?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const [content, query] = await Promise.all([getHomepageContent(), searchParams]);

  return (
    <HomepageSettingsView
      content={content}
      section={query.section}
      status={query.status}
    />
  );
}
