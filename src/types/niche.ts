export type NicheId = "funilaria" | "construcao";

export interface NicheTrait {
  id: string;
  label: string;
  icon: string;
}

export interface NicheDefinition {
  id: NicheId;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  stepCount: number;
  exampleFlow: string;
  traits: NicheTrait[];
  accentColor: string;
  gradient: string;
  defaultSteps: string[];
}
