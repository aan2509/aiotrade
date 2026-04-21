import Link from "next/link";
import { ArrowUpRight, ExternalLink, Link2, WalletCards } from "lucide-react";
import type { requireCurrentProfile } from "@/lib/auth";
import { ActivateLandingPageButton } from "@/components/dashboard/activate-lp-button";
import { CopyLinkButton } from "@/components/dashboard/copy-link-button";
import { memberGlassPanelClass, memberGlassRowClass, MemberPageHeader } from "@/components/dashboard/member-ui";

type CurrentProfile = Awaited<ReturnType<typeof requireCurrentProfile>>;

type MemberLandingPagePanelProps = {
  landingPageUrl: string;
  profile: CurrentProfile;
};

export function MemberLandingPagePanel({ landingPageUrl, profile }: MemberLandingPagePanelProps) {
  return (
    <div className="space-y-6 px-4 py-6 sm:px-5 lg:px-6 lg:py-8">
      <MemberPageHeader
        badge="Landing Page"
        description="Generate halaman referral pribadi Anda, cek statusnya, lalu bagikan link yang sudah siap dipakai untuk entry member baru."
        icon={WalletCards}
        title="Landing page referral"
        toneClassName="bg-[linear-gradient(135deg,rgba(16,185,129,0.12)_0%,rgba(255,255,255,0)_44%,rgba(59,130,246,0.09)_100%)]"
      />

      <section className={`px-6 py-6 sm:px-7 sm:py-7 ${memberGlassPanelClass}`}>
        <div className="flex items-start gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-800">
            <WalletCards className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-[1.6rem] font-semibold tracking-tight text-stone-950">Generate landing page</h2>
            <p className="mt-1 text-sm leading-7 text-stone-600">
              Visitor akan masuk ke homepage utama dengan referral Anda tetap menempel. Praktis dan lebih rapi untuk dibagikan.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className={memberGlassRowClass}>
            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-800">
                <Link2 className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-stone-500">Status</p>
                <p className="mt-2 text-[1.35rem] font-semibold text-stone-950">
                  {profile.isLpActive ? "Active and Shareable" : "Belum diaktifkan"}
                </p>
              </div>
            </div>
          </div>

          {profile.isLpActive ? (
            <>
              <div className="rounded-[24px] bg-[linear-gradient(135deg,rgba(16,185,129,0.14)_0%,rgba(255,255,255,0.48)_54%,rgba(14,165,233,0.1)_100%)] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.76),0_16px_36px_rgba(16,185,129,0.1)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-emerald-900/72">
                      Link landing page Anda
                    </p>
                    <p className="mt-2 break-all text-lg font-semibold text-stone-950">{landingPageUrl}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-emerald-900/70" />
                </div>
                <p className="mt-4 text-sm leading-7 text-stone-700">
                  Tombol daftar di landing page Anda akan mengikuti referral link yang tersimpan pada profil member.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <CopyLinkButton link={landingPageUrl} />
                <Link
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white/52 px-5 text-sm font-medium text-stone-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] transition hover:bg-white/64 hover:shadow-[0_16px_28px_rgba(15,23,42,0.08)]"
                  href={`/${profile.username}`}
                  target="_blank"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Entry Link
                </Link>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="rounded-[24px] bg-white/46 px-5 py-5 text-sm leading-7 text-stone-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]">
                Landing page Anda belum aktif. Setelah diaktifkan, sistem akan membuat link shareable berbasis username member.
              </div>
              <ActivateLandingPageButton />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
