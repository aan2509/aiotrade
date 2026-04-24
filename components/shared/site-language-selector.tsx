"use client";

import { useMemo, useState, useTransition } from "react";
import { Check, ChevronDown, Languages, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SITE_LANGUAGE_COOKIE,
  type SiteLanguage,
  type SiteLanguageOption,
} from "@/lib/site-language";
import { cn } from "@/lib/utils";

type SiteLanguageSelectorProps = {
  currentLanguage: SiteLanguage;
  languages: SiteLanguageOption[];
  variant?: "landing" | "member";
};

export function SiteLanguageSelector({
  currentLanguage,
  languages,
  variant = "landing",
}: SiteLanguageSelectorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingLanguage, setPendingLanguage] = useState<SiteLanguage | null>(null);
  const effectivePendingLanguage =
    pendingLanguage && pendingLanguage !== currentLanguage ? pendingLanguage : null;

  const pendingLanguageLabel = useMemo(
    () =>
      languages.find((language) => language.language === effectivePendingLanguage)?.name ??
      effectivePendingLanguage,
    [effectivePendingLanguage, languages],
  );

  function handleChange(nextLanguage: SiteLanguage) {
    if (!nextLanguage || nextLanguage === currentLanguage) {
      return;
    }

    setPendingLanguage(nextLanguage);
    document.cookie = `${SITE_LANGUAGE_COOKIE}=${nextLanguage}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <>
      <label
        className={cn(
          "relative inline-flex h-10 items-center overflow-hidden rounded-2xl border pl-3 pr-9 backdrop-blur-xl transition",
          variant === "landing"
            ? "border-white/14 bg-white/8 text-[var(--landing-header-text)] shadow-[0_10px_28px_rgba(15,23,42,0.12)]"
            : "border-[var(--member-row-border)] bg-[var(--member-soft-button-bg)] text-[var(--member-text-primary)] shadow-[var(--member-soft-button-shadow)]",
          (isPending || effectivePendingLanguage) && "opacity-90",
        )}
      >
        {isPending || effectivePendingLanguage ? (
          <LoaderCircle
            className={cn(
              "mr-2 h-4 w-4 shrink-0 animate-spin",
              variant === "landing" ? "text-[var(--landing-header-text)]" : "text-[var(--member-text-secondary)]",
            )}
          />
        ) : (
          <Languages
            className={cn(
              "mr-2 h-4 w-4 shrink-0",
              variant === "landing" ? "text-[var(--landing-header-text)]" : "text-[var(--member-text-secondary)]",
            )}
          />
        )}
        <select
          aria-label="Pilih bahasa"
          className="h-full appearance-none bg-transparent pr-1 text-sm font-medium outline-none"
          disabled={isPending || Boolean(effectivePendingLanguage)}
          onChange={(event) => handleChange(event.target.value)}
          value={effectivePendingLanguage ?? currentLanguage}
        >
          {languages.map((language) => (
            <option className="text-slate-900" key={language.language} value={language.language}>
              {language.name}
            </option>
          ))}
        </select>
        <ChevronDown
          className={cn(
            "pointer-events-none absolute right-3 h-4 w-4",
            variant === "landing" ? "text-[var(--landing-header-text)]" : "text-[var(--member-text-secondary)]",
          )}
        />
      </label>

      {isPending || effectivePendingLanguage ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(8,15,28,0.28)] px-4 backdrop-blur-sm">
          <div
            className={cn(
              "w-full max-w-sm rounded-[28px] border px-5 py-5 shadow-[0_28px_70px_rgba(15,23,42,0.18)] backdrop-blur-2xl",
              variant === "landing"
                ? "border-white/14 bg-[rgba(255,255,255,0.82)] text-slate-900"
                : "border-[var(--member-row-border)] bg-[var(--member-glass-bg)] text-[var(--member-text-primary)]",
            )}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                  variant === "landing"
                    ? "bg-sky-500/12 text-sky-700"
                    : "bg-[var(--member-soft-button-hover-bg)] text-[var(--member-text-primary)]",
                )}
              >
                <LoaderCircle className="h-5 w-5 animate-spin" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">Mengganti bahasa</p>
                <p className={cn("mt-1 text-sm leading-6", variant === "landing" ? "text-slate-600" : "text-[var(--member-text-secondary)]")}>
                  Halaman sedang diterjemahkan dan dirender ulang
                  {pendingLanguageLabel ? ` ke ${pendingLanguageLabel}` : ""}.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700">
                  <Check className="h-3.5 w-3.5" />
                  Mohon tunggu sebentar
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
