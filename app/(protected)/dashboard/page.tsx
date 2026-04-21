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
import { memberGlassPanelClass, MemberPageHeader } from "@/components/dashboard/member-ui";

type MemberStatCard = {
  icon: LucideIcon;
  label: string;
  tone: string;
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
      icon: Users,
      label: "Referral Masuk",
      tone: "bg-[linear-gradient(135deg,rgba(14,165,233,0.14)_0%,rgba(255,255,255,0.42)_100%)] text-sky-900",
      value: String(stats.referralCount),
    },
    {
      icon: Link2,
      label: "Landing Page",
      tone: stats.landingPageActive
        ? "bg-[linear-gradient(135deg,rgba(16,185,129,0.16)_0%,rgba(255,255,255,0.42)_100%)] text-emerald-900"
        : "bg-[linear-gradient(135deg,rgba(148,163,184,0.18)_0%,rgba(255,255,255,0.42)_100%)] text-stone-700",
      value: stats.landingPageActive ? "Active" : "Inactive",
    },
    {
      icon: BookOpen,
      label: "Total Panduan",
      tone: "bg-[linear-gradient(135deg,rgba(245,158,11,0.15)_0%,rgba(255,255,255,0.42)_100%)] text-amber-900",
      value: String(stats.publishedGuideCount),
    },
    {
      icon: PlayCircle,
      label: "Video / PDF",
      tone: "bg-[linear-gradient(135deg,rgba(168,85,247,0.14)_0%,rgba(255,255,255,0.42)_100%)] text-violet-900",
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
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-950/[0.045] text-stone-900">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-[1.5rem] font-semibold tracking-tight text-stone-950">Statistik member</h2>
              <p className="mt-1 text-sm leading-7 text-stone-600">
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
                  className={`rounded-[24px] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_14px_34px_rgba(15,23,42,0.08)] ${item.tone}`}
                  key={item.label}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-current/65">
                        {item.label}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <p className="text-[1.7rem] font-semibold tracking-tight text-stone-950">{item.value}</p>
                        {ValueIcon ? <ValueIcon className="h-4 w-4 text-current/70" /> : null}
                      </div>
                    </div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/42 text-current shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]">
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
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-950/[0.045] text-stone-900">
              <Settings2 className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-[1.5rem] font-semibold tracking-tight text-stone-950">Akses cepat</h2>
              <p className="mt-1 text-sm leading-7 text-stone-600">
                Navigasi utama dipisahkan jelas: statistik di dashboard, detail di menu akun, dan materi belajar di menu panduan.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  className="group rounded-[24px] bg-white/44 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_14px_34px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/56"
                  href={item.href}
                  key={item.href}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-950/[0.05] text-stone-900 transition group-hover:bg-stone-950 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[1.2rem] font-semibold tracking-tight text-stone-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-stone-600">{item.description}</p>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-stone-900">
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
