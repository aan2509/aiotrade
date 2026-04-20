import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignupForm } from "@/components/auth/signup-form";
import { getCurrentProfile } from "@/lib/auth";

type SignupPageProps = {
  searchParams: Promise<{ ref?: string | string[] }>;
};

const signupHighlights = [
  "Nama pengguna Anda langsung siap dipakai.",
  "Nomor WhatsApp memudahkan kami menghubungi Anda.",
  "Halaman pribadi bisa Anda aktifkan setelah masuk.",
];

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const profile = await getCurrentProfile();

  if (profile) {
    redirect("/dashboard");
  }

  const resolvedSearchParams = await searchParams;
  const refValue = resolvedSearchParams.ref;
  const referredBy =
    typeof refValue === "string" ? refValue.toLowerCase() : refValue?.[0]?.toLowerCase() ?? null;

  return (
    <AuthPageShell
      badge={
        <>
          <ShieldCheck className="h-4 w-4" />
          Daftar dengan aman
        </>
      }
      description="Isi data singkat di bawah untuk mulai bergabung. Setelah itu Anda bisa langsung masuk dan melanjutkan langkah berikutnya."
      highlights={signupHighlights}
      sideBadge="Mulai bersama AIOTrade"
      sideDescription="Kami buat proses daftarnya singkat, jelas, dan nyaman supaya Anda bisa cepat lanjut tanpa bingung."
      sideTitle="Buat akun baru dan mulai dengan tenang."
      title="Buat akun Anda"
    >
      <SignupForm referredBy={referredBy} />
    </AuthPageShell>
  );
}
