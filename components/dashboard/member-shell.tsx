"use client";

import { useState } from "react";
import { MemberSidebar } from "@/components/dashboard/member-sidebar";
import { MEMBER_THEME_COOKIE, type MemberTheme } from "@/lib/member-theme";

type MemberShellProps = {
  children: React.ReactNode;
  initialTheme: MemberTheme;
  isAdmin: boolean;
  pathname: string;
  username: string;
};

function setThemeCookie(theme: MemberTheme) {
  document.cookie = `${MEMBER_THEME_COOKIE}=${theme}; path=/dashboard; max-age=31536000; samesite=lax`;
}

export function MemberShell({ children, initialTheme, isAdmin, pathname, username }: MemberShellProps) {
  const [theme, setTheme] = useState<MemberTheme>(initialTheme);

  function handleThemeChange(nextTheme: MemberTheme) {
    setTheme(nextTheme);
    setThemeCookie(nextTheme);
  }

  return (
    <div className="member-theme-scope relative min-h-screen overflow-hidden" data-theme={theme}>
      <div className="member-shell-bg pointer-events-none absolute inset-0" />
      <div className="member-shell-overlay pointer-events-none absolute inset-0" />
      <div className="member-shell-topglow pointer-events-none absolute inset-x-0 top-0 h-40" />
      <div className="member-shell-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex max-w-[1680px] flex-col gap-6 px-4 py-4 lg:flex-row lg:px-6 lg:py-6">
        <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-[300px] lg:flex-none">
          <MemberSidebar
            isAdmin={isAdmin}
            onThemeChange={handleThemeChange}
            pathname={pathname}
            theme={theme}
            username={username}
          />
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
