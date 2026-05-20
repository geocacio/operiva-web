"use client";

import { Trophy, Users } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";
import type {
  EmployeeRankingEntry,
  TeamRankingEntry,
} from "@/types/insights";

function RankingTable<T extends TeamRankingEntry>({
  title,
  rows,
  showTeam,
}: {
  title: React.ReactNode;
  rows: T[];
  showTeam?: boolean;
}) {
  return (
    <div className="min-w-[320px] flex-1">
      <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 text-left text-[10px] text-muted-foreground">
              <th className="pb-2 pr-2">#</th>
              <th className="pb-2 pr-2">Nome</th>
              <th className="pb-2 pr-2 text-right">Prod.</th>
              <th className="pb-2 pr-2 text-right">Etapas</th>
              <th className="pb-2 pr-2 text-right">Tempo</th>
              <th className="pb-2 text-right">Atrasos</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id} className="border-b border-white/5">
                <td className="py-2.5 pr-2 text-muted-foreground">{i + 1}</td>
                <td className="py-2.5 pr-2">
                  <span className="font-medium">{row.name}</span>
                  {showTeam && "teamName" in row && (
                    <span className="block text-[10px] text-muted-foreground">
                      {(row as EmployeeRankingEntry).teamName}
                    </span>
                  )}
                </td>
                <td
                  className={cn(
                    "py-2.5 pr-2 text-right tabular-nums",
                    row.productivity >= 100 && "text-emerald-400"
                  )}
                >
                  {row.productivity}%
                </td>
                <td className="py-2.5 pr-2 text-right tabular-nums">
                  {row.stepsCompleted}
                </td>
                <td className="py-2.5 pr-2 text-right tabular-nums">
                  {row.avgTimeHours}h
                </td>
                <td className="py-2.5 text-right tabular-nums text-amber-400/90">
                  {row.delays}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TeamRanking({
  teams,
  employees,
  delay = 0,
}: {
  teams: TeamRankingEntry[];
  employees: EmployeeRankingEntry[];
  delay?: number;
}) {
  return (
    <GlassCard delay={delay} className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <Trophy className="size-5 text-amber-400" />
        <h3 className="font-semibold">Ranking operacional</h3>
      </div>

      <div className="-mx-2 flex gap-6 overflow-x-auto px-2 pb-2">
        <RankingTable title="Equipes" rows={teams} />
        <div className="hidden w-px shrink-0 bg-white/8 sm:block" />
        <RankingTable
          title={
            <span className="inline-flex items-center gap-1">
              <Users className="size-3" /> Colaboradores
            </span>
          }
          rows={employees}
          showTeam
        />
      </div>
    </GlassCard>
  );
}
