import { MemberSidebar } from "@/components/dashboard/member-sidebar";

type MemberShellProps = {
  children: React.ReactNode;
  isAdmin: boolean;
  pathname: string;
  username: string;
};

export function MemberShell({ children, isAdmin, pathname, username }: MemberShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#f3f7fb_42%,#edf3f8_100%)] text-stone-950">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.34)_24%,rgba(235,243,250,0.18)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(148,163,184,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-position:center] [background-size:72px_72px]" />

      <div className="relative mx-auto flex max-w-[1680px] flex-col gap-6 px-4 py-4 lg:flex-row lg:px-6 lg:py-6">
        <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-[300px] lg:flex-none">
          <MemberSidebar isAdmin={isAdmin} pathname={pathname} username={username} />
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
