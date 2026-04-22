"use client";

import { useActionState } from "react";
import { AlertCircle, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import {
  changePasswordAction,
  type ChangePasswordActionState,
} from "@/app/(protected)/account/actions";
import { SubmitButton } from "@/components/auth/submit-button";
import {
  memberGlassPanelClass,
  memberGlassRowClass,
  memberSolidButtonClass,
  memberTextPrimaryClass,
  memberTextSecondaryClass,
  MemberPageHeader,
} from "@/components/dashboard/member-ui";
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
      <Label className="inline-flex items-center gap-2 text-sm font-medium text-[var(--member-text-secondary)]" htmlFor={id}>
        <Icon className="h-4 w-4 text-emerald-600" />
        {label}
      </Label>
      <Input
        autoComplete={autoComplete}
        className={`border-[var(--member-row-border)] bg-[var(--member-soft-button-bg)] text-[var(--member-text-primary)] placeholder:text-[var(--member-text-muted)] ${error ? "border-rose-300 focus-visible:ring-rose-400/30" : ""}`}
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
      <MemberPageHeader
        badge="Account Security"
        description={description}
        icon={ShieldCheck}
        title={title}
        toneClassName="bg-[linear-gradient(135deg,rgba(16,185,129,0.12)_0%,rgba(255,255,255,0)_46%,rgba(59,130,246,0.1)_100%)]"
      />

      <Card className={`max-w-2xl rounded-[30px] border-transparent ${memberGlassPanelClass}`}>
        <CardHeader>
          <CardTitle className={memberTextPrimaryClass}>Reset Password</CardTitle>
          <CardDescription className={memberTextSecondaryClass}>
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

            <div className={`rounded-[24px] p-4 ${memberGlassRowClass}`}>
              <p className={`text-sm font-medium ${memberTextPrimaryClass}`}>Catatan</p>
              <p className={`mt-2 text-sm leading-7 ${memberTextSecondaryClass}`}>
                Setelah password diganti, login berikutnya akan memakai password baru ini.
              </p>
            </div>

            <SubmitButton
              className={`w-full sm:w-auto ${memberSolidButtonClass}`}
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
