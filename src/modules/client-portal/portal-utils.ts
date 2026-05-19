const GRADIENTS = [
  "linear-gradient(135deg, #1e3a5f 0%, #3B82F6 50%, #06B6D4 100%)",
  "linear-gradient(135deg, #064e3b 0%, #10B981 50%, #34d399 100%)",
  "linear-gradient(135deg, #78350f 0%, #F59E0B 50%, #fbbf24 100%)",
  "linear-gradient(135deg, #312e81 0%, #6366f1 50%, #a78bfa 100%)",
  "linear-gradient(135deg, #0c4a6e 0%, #0284c7 50%, #38bdf8 100%)",
  "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #c4b5fd 100%)",
];

export function portalGradient(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash + seed.charCodeAt(i) * (i + 1)) % GRADIENTS.length;
  }
  return GRADIENTS[hash]!;
}

export function sortTimelineNewestFirst<T extends { createdAt: string }>(
  items: T[]
): T[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function collectTimelinePhotos(
  items: import("@/types/portal").PortalTimelineItem[]
): import("@/types/portal").PortalTimelinePhoto[] {
  return items.flatMap((item) => item.photos ?? []);
}
