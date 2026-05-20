import type { Priority, ServiceStatus } from "@/types";

export const SERVICE_STATUS_LABELS: Record<ServiceStatus, string> = {
  em_andamento: "Em andamento",
  aguardando_aprovacao: "Aguardando aprovação",
  atrasado: "Atrasado",
  concluido: "Concluído",
  em_analise: "Em análise",
  cancelado: "Cancelado",
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  alta: "Alta",
  media: "Média",
  baixa: "Baixa",
};

export const APP_NAV = [
  { href: "/app", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/app/servicos", label: "Serviços", icon: "Briefcase" },
  { href: "/app/templates", label: "Templates", icon: "Layers" },
  { href: "/app/operacao", label: "Operação", icon: "Zap" },
  { href: "/app/clientes", label: "Clientes", icon: "Building2" },
  { href: "/app/equipe", label: "Equipe", icon: "Users" },
  { href: "/app/relatorios", label: "Relatórios", icon: "BarChart3" },
  { href: "/app/configuracoes", label: "Configurações", icon: "Settings" },
] as const;

export const TEMPLATE_ROUTES = {
  library: "/app/templates",
  templateNew: "/app/templates/novo",
  templateEdit: (id: string) => `/app/templates/${id}/editar`,
  templateTeam: (id: string) => `/app/templates/${id}/equipe`,
  templateClient: (id: string) => `/app/templates/${id}/cliente`,
  templatePreview: (id: string) => `/app/templates/${id}/preview`,
} as const;

/** @deprecated Use TEMPLATE_ROUTES — kept for redirects and legacy links */
export const CONFIG_ROUTES = {
  hub: "/app/configuracao",
  niche: "/app/configuracao/nicho",
  templates: TEMPLATE_ROUTES.library,
  templateNew: TEMPLATE_ROUTES.templateNew,
  templateEdit: TEMPLATE_ROUTES.templateEdit,
  templateTeam: TEMPLATE_ROUTES.templateTeam,
  templateClient: TEMPLATE_ROUTES.templateClient,
  templatePreview: TEMPLATE_ROUTES.templatePreview,
  newService: "/app/servicos/novo",
} as const;

export const APP_ROUTES = {
  onboarding: "/app/onboarding",
  dashboard: "/app",
  servicos: "/app/servicos",
  novoServico: "/app/servicos/novo",
  operacao: "/app/operacao",
  relatorios: "/app/relatorios",
  configuracoes: "/app/configuracoes",
  portalLogin: "/portal",
  portalServicos: "/portal/meus-servicos",
} as const;
