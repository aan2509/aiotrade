import Link from "next/link";
import {
  BookOpen,
  CreditCard,
  FileText,
  Link2,
  PlayCircle,
  Settings2,
  Sparkles,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { requireCurrentProfile } from "@/lib/auth";
import { getMemberDashboardStats } from "@/lib/member-dashboard-stats";
import {
  memberGlassPanelClass,
  memberIconSurfaceClass,
  MemberPageHeader,
  memberTextMutedClass,
  memberTextPrimaryClass,
  memberTextSecondaryClass,
} from "@/components/dashboard/member-ui";

type MemberStatCard = {
  accentClassName: string;
  icon: LucideIcon;
  label: string;
  value: string;
  valueIcon?: LucideIcon;
};

const quickLinks = [
  {
    description: "Kelola profil akun, status landing page, dan reset password dari satu grup menu.",
    href: "/dashboard/account/profile",
    icon: UserRound,
    label: "Buka menu akun",
    title: "Akun",
  },
  {
    description: "Masuk ke panduan video untuk aktivasi bot, pengaturan bot, dan file PDF member.",
    href: "/dashboard/guides/activation",
    icon: BookOpen,
    label: "Lihat panduan",
    title: "Panduan",
  },
  {
    description: "Halaman ini disiapkan untuk fitur lanjutan member pada fase berikutnya.",
    href: "/dashboard/subscription",
    icon: CreditCard,
    label: "Cek langganan",
    title: "Langganan",
  },
] as const;

export default async function DashboardPage() {
  const profile = await requireCurrentProfile();
  const stats = await getMemberDashboardStats({
    isLpActive: profile.isLpActive,
    username: profile.username,
  });

  const statCards: MemberStatCard[] = [
    {
      accentClassName: "bg-sky-500/12 text-sky-700",
      icon: Users,
      label: "Referral Masuk",
      value: String(stats.referralCount),
    },
    {
      accentClassName: stats.landingPageActive ? "bg-emerald-500/12 text-emerald-700" : "bg-slate-400/14 text-slate-700",
      icon: Link2,
      label: "Landing Page",
      value: stats.landingPageActive ? "Active" : "Inactive",
    },
    {
      accentClassName: "bg-amber-500/12 text-amber-700",
      icon: BookOpen,
      label: "Total Panduan",
      value: String(stats.publishedGuideCount),
    },
    {
      accentClassName: "bg-violet-500/12 text-violet-700",
      icon: PlayCircle,
      label: "Video / PDF",
      value: `${stats.publishedVideoCount} / ${stats.publishedPdfCount}`,
      valueIcon: FileText,
    },
  ];

  return (
    <main className="flex-1 px-4 py-6 sm:px-5 lg:px-6 lg:py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <MemberPageHeader
          badge="Dashboard"
          description="Ini pusat statistik member Anda. Pantau referral, status landing page, dan jumlah materi panduan tanpa bercampur dengan info akun."
          icon={Sparkles}
          title={`Halo, ${profile.username}`}
        />

        <section className={`px-6 py-6 sm:px-7 sm:py-7 ${memberGlassPanelClass}`}>
          <div className="flex items-start gap-3">
            <span className={memberIconSurfaceClass}>
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h2 className={`text-[1.5rem] font-semibold tracking-tight ${memberTextPrimaryClass}`}>Statistik member</h2>
              <p className={`mt-1 text-sm leading-7 ${memberTextSecondaryClass}`}>
                Ringkasan cepat performa referral dan ketersediaan panduan yang bisa Anda akses saat ini.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {statCards.map((item) => {
              const Icon = item.icon;
              const ValueIcon = item.valueIcon;

              return (
                <div
                  className="rounded-[24px] border border-[var(--member-row-border)] bg-[var(--member-row-bg)] px-5 py-5 shadow-[var(--member-row-shadow)]"
                  key={item.label}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-[0.72rem] font-semibold uppercase tracking-[0.24em] ${memberTextMutedClass}`}>
                        {item.label}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <p className={`text-[1.7rem] font-semibold tracking-tight ${memberTextPrimaryClass}`}>{item.value}</p>
                        {ValueIcon ? <ValueIcon className="h-4 w-4 text-[var(--member-text-muted)]" /> : null}
                      </div>
                    </div>
                    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] ${item.accentClassName}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className={`px-6 py-6 sm:px-7 sm:py-7 ${memberGlassPanelClass}`}>
          <div className="flex items-start gap-3">
            <span className={memberIconSurfaceClass}>
              <Settings2 className="h-5 w-5" />
            </span>
            <div>
              <h2 className={`text-[1.5rem] font-semibold tracking-tight ${memberTextPrimaryClass}`}>Akses cepat</h2>
              <p className={`mt-1 text-sm leading-7 ${memberTextSecondaryClass}`}>
                Navigasi utama dipisahkan jelas: statistik di dashboard, detail di menu akun, dan materi belajar di menu panduan.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  className="group rounded-[24px] border border-[var(--member-row-border)] bg-[var(--member-row-bg)] px-5 py-5 shadow-[var(--member-row-shadow)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--member-row-hover-bg)]"
                  href={item.href}
                  key={item.href}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--member-icon-surface)] text-[var(--member-icon-foreground)] transition group-hover:bg-[var(--member-sidebar-active-bg)] group-hover:text-[var(--member-sidebar-active-text)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className={`mt-4 text-[1.2rem] font-semibold tracking-tight ${memberTextPrimaryClass}`}>{item.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${memberTextSecondaryClass}`}>{item.description}</p>
                  <span className={`mt-5 inline-flex items-center text-sm font-semibold ${memberTextPrimaryClass}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
