# Operiva MVP — Checklist

Frontend mockado em pt-BR. Aguardando backend.

## Estrutura do produto (reestruturação)

- [x] Menu principal: Dashboard, Serviços, Templates, Operação, Clientes, Equipe, Insights, Relatórios, Configurações
- [x] Nicho fora do menu diário — identidade em onboarding + Configurações da empresa
- [x] Onboarding `/app/onboarding` — 5 etapas + `operiva-onboarding-complete` / `operiva-company` no localStorage
- [x] Biblioteca de templates `/app/templates` (primária)
- [x] Wizard novo serviço `/app/servicos/novo` — 4 etapas → `/execucao/[id]`
- [x] Operação `/app/operacao` — Meus | Todos | Prioridades
- [x] Insights `/app/insights` — copiloto operacional (mock, pt-BR)
- [x] Relatórios `/app/relatorios` — redireciona para Insights (link)
- [x] Configurações da empresa `/app/configuracoes`
- [x] Portal `/portal` login mock → `/portal/meus-servicos`
- [x] Compartilhar acompanhamento na execução (copiar + WhatsApp mock)
- [x] Redirects legados `/app/configuracao/*` → novas rotas

## Configuração operacional (templates)

- [x] Biblioteca — cards, usar / visualizar / duplicar / editar / criar do zero
- [x] Builder `/app/templates/[id]/editar` — sidebar DnD, canvas, painel
- [x] Equipe `/app/templates/[id]/equipe`
- [x] Visibilidade cliente `/app/templates/[id]/cliente`
- [x] Preview `/app/templates/[id]/preview`
- [x] Skeleton loaders na biblioteca e builder

## Arquitetura

- [x] Redux: `companySlice`, `portalSessionSlice`, `nicheSlice`, `templateSlice`, `services-slice`, `execution-slice`, `insightsSlice`
- [x] Persistência local (empresa, onboarding, templates customizados, sessão portal)
- [x] Paleta `#0B0F19`, `#111827`, `#1F2937`, acentos `#3B82F6` / `#06B6D4` / `#10B981`
- [x] Framer Motion, breadcrumbs em wizards

## Integração end-to-end

- [x] Fluxo: onboarding → dashboard → novo serviço → execução → portal
- [x] Flags de visibilidade filtram timeline do portal
- [x] Etapas do template populam modo execução
- [x] `cloneTemplate` (sem `structuredClone` em templates)

## Operiva Insights

- [x] Rota `/app/insights` e item no menu (entre Equipe e Relatórios)
- [x] Mock `mocks/insights.ts` — funilaria/construção, pt-BR
- [x] Operiva Score 84/100 com breakdown (velocidade, organização, atrasos, SLA…)
- [x] KPIs: saúde operacional, serviços em risco, tempo médio, eficiência
- [x] Gargalos por etapa (tabela)
- [x] Heatmap CSS (equipes × etapas)
- [x] Insights automáticos (positivo / crítico / operacional)
- [x] Análise de fluxo Recepção → Entrega
- [x] Ranking equipes e colaboradores
- [x] Tendências semana/mês (comparação)
- [x] Abas período Hoje | Semana | Mês (Redux `insightsSlice`)
- [x] Framer Motion + `useReducedMotion`, skeleton no carregamento
- [x] `InsightCard` reutilizável em `components/operiva/`

## Alinhamento estratégico

- [x] Landing vende clareza operacional (não ERP) — hero, dores, antes/depois, faixa “Não é ERP”, recursos operacionais
- [x] Copy global pt-BR — termos administrativos/fiscais evitados em strings de UI
- [x] App: menu operacional, dashboard com tagline, serviços em cards, Insights como copiloto, relatórios → Insights
- [x] Onboarding e configurações: “configure sua operação”, nicho adapta templates (não módulo ERP)
- [x] Portal: tom de transparência e confiança
- [x] Documento [POSICIONAMENTO.md](./POSICIONAMENTO.md)

## Pendente / fora do escopo MVP

- [ ] Autenticação real, SMS, QR code
- [ ] Backend, API, realtime
- [ ] Nichos Assistência técnica e Energia solar (cards “em breve” no onboarding)
- [ ] Timeline no menu (rota `/app/timeline` mantida mas removida do menu)

## Fluxo de teste

1. Limpar `localStorage` (ou Configurações → Resetar onboarding)
2. `/app/onboarding` → empresa → Funilaria → templates → equipe → concluir
3. `/app` dashboard → `/app/templates` → editar ou usar template
4. `/app/servicos/novo` → cliente → template → config → criar → `/execucao/svc-…`
5. Na execução: **Compartilhar acompanhamento** → link portal
6. `/portal` → login mock → `/portal/meus-servicos` → abrir serviço
7. `/portal/[token]` — detalhe com visibilidade do template
8. `/app/operacao` — abas Meus / Prioridades
9. `/app/insights` — copiloto, score, heatmap, ranking (trocar Hoje/Semana/Mês)
10. `/app/relatorios` — link para Insights
11. Rotas antigas: `/app/configuracao/templates?nicho=funilaria` redireciona para `/app/templates`
