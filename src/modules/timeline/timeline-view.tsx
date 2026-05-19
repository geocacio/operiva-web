"use client";

import { useEffect } from "react";
import { GitBranch } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { VisualTimeline } from "@/components/shared/visual-timeline";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTimeline } from "@/store/slices/timeline-slice";

export function TimelineView() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.timeline);

  useEffect(() => {
    dispatch(fetchTimeline());
  }, [dispatch]);

  if (loading) {
    return <Skeleton className="h-96 rounded-xl" />;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={GitBranch}
        title="Timeline vazia"
        description="Quando sua equipe registrar etapas, fotos e comentários, eles aparecerão aqui."
      />
    );
  }

  return <VisualTimeline events={items} />;
}
