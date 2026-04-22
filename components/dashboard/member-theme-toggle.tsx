"use client";

import { Moon, Sun } from "lucide-react";
import type { MemberTheme } from "@/lib/member-theme";
import { cn } from "@/lib/utils";

type MemberThemeToggleProps = {
  onChange: (theme: MemberTheme) => void;
  theme: MemberTheme;
};

const options = [
  { icon: Sun, label: "Light", value: "light" },
  { icon: Moon, label: "Dark", value: "dark" },
] as const satisfies ReadonlyArray<{
  icon: typeof Sun;
  label: string;
  value: MemberTheme;
}>;

export function MemberThemeToggle({ onChange, theme }: MemberThemeToggleProps) {
  return (
    <div
      className="rounded-[24px] p-2"
      style={{
        background: "var(--member-row-bg)",
        border: "1px solid var(--member-row-border)",
        boxShadow: "var(--member-row-shadow)",
      }}
    >
      <p className="px-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--member-text-muted)]">
        Theme
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {options.map((option) => {
          const Icon = option.icon;
          const active = option.value === theme;

          return (
            <button
              className={cn(
                "relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-3 py-3 text-sm font-semibold transition duration-300",
                active
                  ? "text-[var(--member-sidebar-active-text)]"
                  : "text-[var(--member-text-secondary)] hover:text-[var(--member-text-primary)]",
              )}
              key={option.value}
              onClick={() => onChange(option.value)}
              style={
                active
                  ? {
                      background: "var(--member-sidebar-active-bg)",
                      boxShadow: "var(--member-sidebar-active-shadow)",
                    }
                  : {
                      background: "var(--member-soft-button-bg)",
                      boxShadow: "var(--member-soft-button-shadow)",
                    }
              }
              type="button"
            >
              {active ? (
                <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-[var(--member-sidebar-active-highlight)]" />
              ) : null}
              <Icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
