import type { Priority, ServiceStatus } from "@/types";

export const SERVICE_STATUS_LABELS: Record<ServiceStatus, string> = {
  em_andamento: "Em andamento",
  aguardando_aprovacao: "Aguardando aprovação",
  atrasado: "Atrasado",
  concluido: "Concluído",
  em_analise: "Em análise",
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  alta: "Alta",
  media: "Média",
  baixa: "Baixa",
};

export const APP_NAV = [
  { href: "/app", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/app/servicos", label: "Serviços", icon: "Briefcase" },
  { href: "/app/timeline", label: "Timeline", icon: "GitBranch" },
  { href: "/app/equipe", label: "Equipe", icon: "Users" },
  { href: "/app/clientes", label: "Clientes", icon: "Building2" },
  { href: "/app/configuracoes", label: "Configurações", icon: "Settings" },
] as const;
