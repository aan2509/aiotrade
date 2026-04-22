import type { LucideIcon } from "lucide-react";

export const memberGlassPanelClass =
  "member-glass-panel rounded-[30px] backdrop-blur-2xl";

export const memberGlassRowClass =
  "member-glass-row rounded-[24px] px-5 py-5";

export const memberTextPrimaryClass = "text-[var(--member-text-primary)]";
export const memberTextSecondaryClass = "text-[var(--member-text-secondary)]";
export const memberTextMutedClass = "text-[var(--member-text-muted)]";
export const memberIconSurfaceClass =
  "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--member-icon-surface)] text-[var(--member-icon-foreground)]";
export const memberSoftButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-[var(--member-row-border)] bg-[var(--member-soft-button-bg)] px-5 text-sm font-medium text-[var(--member-text-primary)] shadow-[var(--member-soft-button-shadow)] transition hover:bg-[var(--member-soft-button-hover-bg)] hover:shadow-[var(--member-soft-button-hover-shadow)]";
export const memberSolidButtonClass =
  "rounded-2xl bg-[var(--member-solid-button-bg)] text-[var(--member-solid-button-text)] shadow-[var(--member-solid-button-shadow)] hover:bg-[var(--member-solid-button-hover-bg)]";

type MemberPageHeaderProps = {
  badge: string;
  description: string;
  icon: LucideIcon;
  title: string;
  toneClassName?: string;
};

export function MemberPageHeader({
  badge,
  description,
  icon: Icon,
  title,
  toneClassName = "bg-[linear-gradient(135deg,rgba(16,185,129,0.09)_0%,rgba(255,255,255,0)_38%,rgba(245,158,11,0.08)_100%)]",
}: MemberPageHeaderProps) {
  return (
    <section
      className={`relative overflow-hidden px-6 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8 ${memberGlassPanelClass}`}
    >
      <div className={`pointer-events-none absolute inset-0 ${toneClassName}`} />
      <div className="relative space-y-4">
        <div className="member-page-badge inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.24em]">
          <Icon className="h-3.5 w-3.5" />
          {badge}
        </div>
        <div>
          <h1 className={`text-[2.1rem] font-semibold tracking-tight sm:text-[2.5rem] ${memberTextPrimaryClass}`}>
            {title}
          </h1>
          <p className={`mt-3 max-w-3xl text-base leading-8 ${memberTextSecondaryClass}`}>{description}</p>
        </div>
      </div>
    </section>
  );
}
