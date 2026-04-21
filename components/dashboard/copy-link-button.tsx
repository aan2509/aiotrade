"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

type CopyLinkButtonProps = {
  link: string;
};

export function CopyLinkButton({ link }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button
      className="rounded-2xl border-transparent bg-white/52 text-stone-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] hover:bg-white/64 hover:shadow-[0_16px_28px_rgba(15,23,42,0.08)]"
      onClick={handleCopy}
      type="button"
      variant="outline"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : "Copy Link"}
    </Button>
  );
}
