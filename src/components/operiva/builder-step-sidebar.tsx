"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Copy, GripVertical, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FlowStepConfig } from "@/types/flow-step";
import { IconByName } from "./icon-by-name";

function SortableStep({
  step,
  active,
  onSelect,
  onDuplicate,
  onRemove,
}: {
  step: FlowStepConfig;
  active: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-center gap-2 rounded-lg border px-2 py-2 transition-colors",
        active
          ? "border-indigo-500/40 bg-indigo-500/10"
          : "border-white/8 bg-white/[0.02] hover:border-white/15"
      )}
    >
      <button
        type="button"
        className="cursor-grab touch-none text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
        aria-label="Reordenar"
      >
        <GripVertical className="size-4" />
      </button>
      <button
        type="button"
        onClick={onSelect}
        className="flex min-w-0 flex-1 items-center gap-2 text-left"
      >
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${step.color}22` }}
        >
          <IconByName name={step.icon} className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{step.name}</p>
          <p className="text-[10px] text-muted-foreground">SLA {step.slaHours}h</p>
        </div>
      </button>
      <div className="flex opacity-0 transition-opacity group-hover:opacity-100">
        <Button size="icon" variant="ghost" className="size-7" onClick={onDuplicate}>
          <Copy className="size-3.5" />
        </Button>
        <Button size="icon" variant="ghost" className="size-7" onClick={onRemove}>
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}

export function BuilderStepSidebar({
  steps,
  selectedStepId,
  onSelect,
  onReorder,
  onAdd,
  onDuplicate,
  onRemove,
}: {
  steps: FlowStepConfig[];
  selectedStepId: string | null;
  onSelect: (id: string) => void;
  onReorder: (ids: string[]) => void;
  onAdd: () => void;
  onDuplicate: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = steps.findIndex((s) => s.id === active.id);
    const newIndex = steps.findIndex((s) => s.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const ids = steps.map((s) => s.id);
    const [removed] = ids.splice(oldIndex, 1);
    ids.splice(newIndex, 0, removed);
    onReorder(ids);
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-white/8 bg-[#0B0F19]/80 backdrop-blur-xl">
      <div className="border-b border-white/8 p-4">
        <h3 className="text-sm font-semibold">Etapas do fluxo</h3>
        <p className="text-xs text-muted-foreground">{steps.length} etapas configuradas</p>
      </div>
      <ScrollArea className="flex-1 p-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={steps.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {steps.map((step) => (
                <SortableStep
                  key={step.id}
                  step={step}
                  active={selectedStepId === step.id}
                  onSelect={() => onSelect(step.id)}
                  onDuplicate={() => onDuplicate(step.id)}
                  onRemove={() => onRemove(step.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </ScrollArea>
      <div className="border-t border-white/8 p-3">
        <Button variant="outline" className="w-full gap-2 border-white/10" onClick={onAdd}>
          <Plus className="size-4" />
          Adicionar etapa
        </Button>
      </div>
    </div>
  );
}
