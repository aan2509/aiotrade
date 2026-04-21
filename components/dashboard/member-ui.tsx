import type { LucideIcon } from "lucide-react";

export const memberGlassPanelClass =
  "rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(247,250,253,0.78)_100%)] shadow-[0_26px_72px_rgba(148,163,184,0.24),0_10px_28px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.82)] backdrop-blur-2xl";

export const memberGlassRowClass =
  "rounded-[24px] bg-white/56 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_18px_38px_rgba(148,163,184,0.2),0_8px_22px_rgba(15,23,42,0.06)]";

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
        <div className="inline-flex items-center gap-2 rounded-full bg-white/42 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-stone-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.68)]">
          <Icon className="h-3.5 w-3.5" />
          {badge}
        </div>
        <div>
          <h1 className="text-[2.1rem] font-semibold tracking-tight text-stone-950 sm:text-[2.5rem]">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-8 text-stone-600">{description}</p>
        </div>
      </div>
    </section>
  );
}
