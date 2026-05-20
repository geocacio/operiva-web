import { Skeleton } from "@/components/ui/skeleton";

export function ConfigLoadingSkeleton({ variant = "page" }: { variant?: "page" | "builder" }) {
  if (variant === "builder") {
    return (
      <div className="flex h-[calc(100vh-8rem)] flex-col gap-4">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-10 w-full max-w-2xl" />
        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[240px_1fr_300px]">
          <Skeleton className="h-full rounded-xl" />
          <Skeleton className="h-full rounded-xl" />
          <Skeleton className="h-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-10 w-72" />
      <Skeleton className="h-96 w-full rounded-xl" />
    </div>
  );
}
