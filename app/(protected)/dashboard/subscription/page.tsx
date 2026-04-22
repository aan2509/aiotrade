import { CreditCard, Sparkles } from "lucide-react";
import {
  memberGlassPanelClass,
  memberIconSurfaceClass,
  MemberPageHeader,
  memberTextPrimaryClass,
  memberTextSecondaryClass,
} from "@/components/dashboard/member-ui";

export default function DashboardSubscriptionPage() {
  return (
    <div className="space-y-6 px-4 py-6 sm:px-5 lg:px-6 lg:py-8">
      <MemberPageHeader
        badge="Langganan"
        description="Halaman ini disiapkan untuk fitur lanjutan member seperti paket, benefit tambahan, dan pengelolaan akses premium."
        icon={CreditCard}
        title="Langganan member"
        toneClassName="bg-[linear-gradient(135deg,rgba(245,158,11,0.12)_0%,rgba(255,255,255,0)_44%,rgba(168,85,247,0.09)_100%)]"
      />

      <section className={`px-6 py-6 sm:px-7 sm:py-7 ${memberGlassPanelClass}`}>
        <div className="flex items-start gap-3">
          <span className={memberIconSurfaceClass}>
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h2 className={`text-[1.55rem] font-semibold tracking-tight ${memberTextPrimaryClass}`}>Fitur lanjutan segera hadir</h2>
            <p className={`mt-2 max-w-3xl text-sm leading-7 ${memberTextSecondaryClass}`}>
              Area langganan akan dipakai untuk fitur advanced berikutnya. Untuk sekarang, dashboard tetap fokus ke
              statistik referral, panduan member, dan pengelolaan akun.
            </p>
          </div>
        </div>

        <div className={`member-glass-row mt-6 rounded-[24px] px-5 py-5 text-sm leading-7 ${memberTextSecondaryClass}`}>
          Setelah modul ini aktif, menu ini akan menampilkan informasi paket, status akses, dan fitur premium member.
        </div>
      </section>
    </div>
  );
}
