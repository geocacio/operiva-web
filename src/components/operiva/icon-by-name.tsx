"use client";

import {
  BrickWall,
  Building2,
  Calendar,
  Camera,
  Car,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Columns3,
  Droplet,
  Droplets,
  GitBranch,
  Hammer,
  Landmark,
  Link,
  Package,
  Paintbrush,
  PaintBucket,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Car,
  Building2,
  Camera,
  UserCheck,
  Shield,
  GitBranch,
  Clock,
  Users,
  Link,
  Calendar,
  ClipboardList,
  Search,
  ShieldCheck,
  Wrench,
  Hammer,
  Paintbrush,
  Sparkles,
  Package,
  Droplets,
  CheckCircle2,
  Landmark,
  Columns3,
  BrickWall,
  Zap,
  Droplet,
  PaintBucket,
  ClipboardCheck,
  Circle,
};

export function IconByName({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Circle;
  return <Icon className={className} />;
}
