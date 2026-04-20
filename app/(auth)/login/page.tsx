import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { LoginForm } from "@/components/auth/login-form";
import { getCurrentProfile } from "@/lib/auth";

const loginHighlights = [
  "Masuk kembali ke akun Anda dengan cepat.",
  "Lihat halaman pribadi Anda di satu tempat.",
  "Lanjutkan aktivitas tanpa perlu mulai dari awal.",
];

export default async function LoginPage() {
  const profile = await getCurrentProfile();

  if (profile) {
    redirect("/dashboard");
  }

  return (
    <AuthPageShell
      badge={
        <>
          <ShieldCheck className="h-4 w-4" />
          Masuk dengan aman
        </>
      }
      description="Masuk ke akun Anda untuk melihat halaman pribadi dan melanjutkan aktivitas seperti biasa."
      highlights={loginHighlights}
      sideBadge="Selamat datang kembali"
      sideDescription="Kalau Anda sudah pernah daftar, tinggal masuk dan lanjutkan dari tempat terakhir."
      sideTitle="Masuk lagi dan lanjutkan perjalanan Anda."
      title="Masuk ke akun Anda"
    >
      <LoginForm />
    </AuthPageShell>
  );
}
