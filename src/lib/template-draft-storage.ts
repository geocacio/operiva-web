import type { OperivaTemplate } from "@/types/operiva-template";

const STORAGE_KEY = "operiva-custom-templates";

export function loadCustomTemplates(): OperivaTemplate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as OperivaTemplate[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomTemplates(templates: OperivaTemplate[]) {
  if (typeof window === "undefined") return;
  const custom = templates.filter((t) => !t.isBuiltin);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
}

export function persistTemplate(template: OperivaTemplate) {
  if (typeof window === "undefined" || template.isBuiltin) return;
  const existing = loadCustomTemplates().filter((t) => t.id !== template.id);
  existing.push(template);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}
