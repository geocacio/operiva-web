import { OnboardingGuard } from "@/components/layout/onboarding-guard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <OnboardingGuard>{children}</OnboardingGuard>;
}
