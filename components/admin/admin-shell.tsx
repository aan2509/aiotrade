import { AdminSidebar } from "@/components/admin/admin-sidebar";

type AdminShellProps = {
  children: React.ReactNode;
  pathname: string;
  username: string;
};

export function AdminShell({ children, pathname, username }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex max-w-[1680px] flex-col gap-6 px-4 py-4 lg:flex-row lg:px-6 lg:py-6">
        <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-[280px] lg:flex-none">
          <AdminSidebar pathname={pathname} username={username} />
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
