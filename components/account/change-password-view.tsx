"use client";

import { useActionState } from "react";
import { AlertCircle, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import {
  changePasswordAction,
  type ChangePasswordActionState,
} from "@/app/(protected)/account/actions";
import { SubmitButton } from "@/components/auth/submit-button";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ChangePasswordViewProps = {
  description: string;
  title: string;
};

const initialChangePasswordState: ChangePasswordActionState = {
  fieldErrors: {},
  message: null,
  status: "idle",
};

function PasswordField({
  autoComplete,
  error,
  icon: Icon,
  id,
  label,
  name,
  placeholder,
}: {
  autoComplete: string;
  error?: string;
  icon: typeof KeyRound;
  id: string;
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="inline-flex items-center gap-2 text-sm font-medium text-stone-700" htmlFor={id}>
        <Icon className="h-4 w-4 text-emerald-600" />
        {label}
      </Label>
      <Input
        autoComplete={autoComplete}
        className={error ? "border-rose-300 focus-visible:ring-rose-400/30" : undefined}
        id={id}
        name={name}
        placeholder={placeholder}
        required
        type="password"
      />
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}

export function ChangePasswordView({ description, title }: ChangePasswordViewProps) {
  const [state, formAction] = useActionState<ChangePasswordActionState, FormData>(
    changePasswordAction,
    initialChangePasswordState,
  );

  return (
    <div className="space-y-6 px-4 py-6 sm:px-5 lg:px-6 lg:py-8">
      <div className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(246,249,252,0.72)_100%)] px-6 py-6 shadow-[0_24px_80px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-2xl sm:px-7 sm:py-7 lg:px-8 lg:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(16,185,129,0.12)_0%,rgba(255,255,255,0)_46%,rgba(59,130,246,0.1)_100%)]" />
        <div className="relative space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-emerald-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.68)]">
          <ShieldCheck className="h-4 w-4" />
          Account Security
        </div>
        <div>
          <h1 className="text-[2.1rem] font-semibold tracking-tight text-stone-950 sm:text-[2.5rem]">{title}</h1>
          <p className="mt-2 max-w-3xl text-base leading-7 text-stone-600">{description}</p>
        </div>
      </div>
      </div>

      <Card className="max-w-2xl rounded-[30px] border-transparent bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(246,249,252,0.72)_100%)] shadow-[0_24px_80px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-2xl">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Masukkan password lama Anda, lalu simpan password baru yang ingin dipakai saat login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-5">
            {state?.message ? (
              <Alert className="flex items-start gap-3" variant={state.status === "success" ? "success" : "error"}>
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{state.message}</p>
              </Alert>
            ) : null}

            <PasswordField
              autoComplete="current-password"
              error={state.fieldErrors.currentPassword}
              icon={KeyRound}
              id="currentPassword"
              label="Password Saat Ini"
              name="currentPassword"
              placeholder="Masukkan password saat ini"
            />

            <PasswordField
              autoComplete="new-password"
              error={state.fieldErrors.newPassword}
              icon={LockKeyhole}
              id="newPassword"
              label="Password Baru"
              name="newPassword"
              placeholder="Minimal 8 karakter"
            />

            <PasswordField
              autoComplete="new-password"
              error={state.fieldErrors.confirmPassword}
              icon={LockKeyhole}
              id="confirmPassword"
              label="Konfirmasi Password Baru"
              name="confirmPassword"
              placeholder="Ulangi password baru"
            />

            <div className="rounded-[24px] bg-white/48 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]">
              <p className="text-sm font-medium text-stone-800">Catatan</p>
              <p className="mt-2 text-sm leading-7 text-stone-600">
                Setelah password diganti, login berikutnya akan memakai password baru ini.
              </p>
            </div>

            <SubmitButton
              className="w-full rounded-2xl bg-[linear-gradient(135deg,#111827_0%,#0f172a_100%)] shadow-[0_18px_40px_rgba(15,23,42,0.24)] hover:bg-[linear-gradient(135deg,#0f172a_0%,#020617_100%)] sm:w-auto"
              pendingText="Menyimpan password..."
            >
              Simpan Password Baru
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
