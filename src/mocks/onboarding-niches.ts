import type { NicheId } from "@/types/niche";

export interface OnboardingNicheOption {
  id: NicheId | "assistencia" | "energia_solar";
  name: string;
  description: string;
  icon: string;
  available: boolean;
  accentColor: string;
}

export const onboardingNicheOptions: OnboardingNicheOption[] = [
  {
    id: "funilaria",
    name: "Funilaria",
    description: "Oficinas, reparos e pintura automotiva",
    icon: "Car",
    available: true,
    accentColor: "#3B82F6",
  },
  {
    id: "construcao",
    name: "Construção civil",
    description: "Obras, reformas e equipes multidisciplinares",
    icon: "Building2",
    available: true,
    accentColor: "#10B981",
  },
  {
    id: "assistencia",
    name: "Assistência técnica",
    description: "Ordens de serviço e visitas técnicas",
    icon: "Wrench",
    available: false,
    accentColor: "#06B6D4",
  },
  {
    id: "energia_solar",
    name: "Energia solar",
    description: "Instalações e manutenção fotovoltaica",
    icon: "Sun",
    available: false,
    accentColor: "#F59E0B",
  },
];
