import { mockServices } from "@/mocks/services";

/** Slug amigável para o portal do cliente (ex.: Instalação Solar #194 → svc-194) */
export const SERVICE_PORTAL_SLUGS: Record<string, string> = {
  s3: "svc-194",
  s1: "svc-prime-funilaria",
  s2: "svc-silva-fundacao",
  s5: "svc-mpn-cozinha",
  s6: "svc-ar-condicionado",
};

export function getPortalSlug(serviceId: string): string {
  return SERVICE_PORTAL_SLUGS[serviceId] ?? serviceId;
}

export function getPortalTokenForService(serviceId: string): string {
  const slug = `svc-${serviceId.replace(/\D/g, "").slice(-8) || Date.now().toString(36)}`;
  SERVICE_PORTAL_SLUGS[serviceId] = slug;
  return slug;
}

export function getPortalHref(serviceId: string): string {
  return `/portal/${getPortalSlug(serviceId)}`;
}

export function getExecutionHref(serviceId: string): string {
  return `/execucao/${serviceId}`;
}

export function resolvePortalToken(token: string): string | null {
  const bySlug = Object.entries(SERVICE_PORTAL_SLUGS).find(([, slug]) => slug === token);
  if (bySlug) return bySlug[0];
  if (mockServices.some((s) => s.id === token)) return token;
  return null;
}
