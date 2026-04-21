"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  activateLandingPageAction,
  type ActivateLandingPageState,
} from "@/app/(protected)/dashboard/actions";
import { SubmitButton } from "@/components/auth/submit-button";
import { Alert } from "@/components/ui/alert";

const initialActivateLandingPageState: ActivateLandingPageState = {
  status: "idle",
  message: null,
};

export function ActivateLandingPageButton() {
  const [state, formAction] = useActionState(
    activateLandingPageAction,
    initialActivateLandingPageState,
  );
  const router = useRouter();

  useEffect(() => {
    if (state.status === "success") {
      router.refresh();
    }
  }, [router, state.status]);

  return (
    <form action={formAction} className="space-y-3">
      <SubmitButton
        className="rounded-2xl bg-[linear-gradient(135deg,#111827_0%,#0f172a_100%)] shadow-[0_18px_40px_rgba(15,23,42,0.24)] hover:bg-[linear-gradient(135deg,#0f172a_0%,#020617_100%)]"
        pendingText="Activating..."
      >
        Activate My Landing Page
      </SubmitButton>
      {state.message ? (
        <Alert variant={state.status === "error" ? "error" : "success"}>{state.message}</Alert>
      ) : null}
    </form>
  );
}
