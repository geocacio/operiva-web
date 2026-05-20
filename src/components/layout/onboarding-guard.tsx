"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { APP_ROUTES } from "@/lib/constants";
import { useAppSelector } from "@/store/hooks";

const BYPASS_PREFIXES = [APP_ROUTES.onboarding];

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useAppSelector((s) => s.company.hydrated);
  const complete = useAppSelector((s) => s.company.onboardingComplete);

  useEffect(() => {
    if (!hydrated) return;
    if (BYPASS_PREFIXES.some((p) => pathname.startsWith(p))) return;
    if (!complete) {
      router.replace(APP_ROUTES.onboarding);
    }
  }, [hydrated, complete, pathname, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#0B0F19] text-[#9CA3AF]">
        Carregando…
      </div>
    );
  }

  if (!complete && !BYPASS_PREFIXES.some((p) => pathname.startsWith(p))) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#0B0F19] text-[#9CA3AF]">
        Redirecionando…
      </div>
    );
  }

  return children;
}
