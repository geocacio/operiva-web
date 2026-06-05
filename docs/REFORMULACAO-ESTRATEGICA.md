# Relatório de Reformulação Estratégica — Operiva Web

**Data:** Junho 2026  
**Escopo:** Reformulação arquitetural completa do frontend — tipos, slices Redux, transforms, mocks, UI e navegação.  
**Decisão estratégica central:** Operiva é uma plataforma de **transparência operacional + inteligência operacional**, não um sistema BPM/ERP. O elemento central é o **SERVIÇO**, não o template ou o fluxo.

---

## 1. Modelo Mental Definitivo

```
Modelo mental anterior (errado):
  Template → Fluxo → Serviço (gerado)

Modelo mental atual (correto):
  SERVIÇO (entidade central)
       ↑
  Modelo (acelerador opcional de criação)
```

O **Serviço** é uma entidade viva e independente. Modelos são apenas um atalho para pré-preencher o plano inicial — após a criação, o serviço não tem nenhuma dependência do modelo original.

---

## 2. O que foi mantido

- **Funcionalidade de templates/modelos** — preservada integralmente como "Modelos de plano inicial"
- **Template builder** — CRUD completo de etapas, equipes, visibilidade do cliente
- **Portal do cliente** — experiência cinematic preservada, com aprimoramentos
- **Modo execução (campo)** — mobile-first mantido, com novos recursos
- **Stack técnica** — Next.js 16, Redux Toolkit, Tailwind CSS 4, shadcn/ui
- **Estrutura de pastas** — `src/modules/`, `src/store/slices/`, `src/flows/`, `src/mocks/`
- **Todos os tipos existentes** — evoluídos com retrocompatibilidade
- **Rotas e páginas** — sem remoções de rota

---

## 3. O que foi adaptado

### Tipos (`src/types/`)

| Arquivo | Mudança |
|---|---|
| `execution.ts` | `ExecutionStep` ganha `subSteps`, `addedDuringExecution`, `clientVisible`, `needsApproval`. `ServiceExecution` ganha `occurrences[]`, `approvals[]`, `clientId`, `teamId`, `estimatedDeadline`, `extraServices`, `scopeChanges`. Evento `"problema"` → `"ocorrencia"` (alias legado mantido) |
| `insights.ts` | `FlowStep` → `OperationStep` (alias `FlowStep` mantido). `InsightsPeriodData` ganha `operationSteps` e `occurrenceStats`. Novo tipo `OccurrenceStats` |
| `portal.ts` | `ClientPortalData` ganha `pendingApprovals[]`, `nextStep`, `estimatedCompletion`. `pendingApproval` mantido para retrocompatibilidade |

### Redux Slices (`src/store/slices/`)

| Slice | Mudança |
|---|---|
| `execution-slice.ts` | +6 novos reducers: `addStep`, `removeStep`, `reorderSteps`, `addSubStep`, `toggleSubStep`, `registerOccurrence`, `recordScopeChange`, `addExtraService`. `requestApproval` agora registra em `approvals[]`. `reportProblem` substituído por `registerOccurrence` |
| `services-slice.ts` | `createServiceFromTemplate` documentado como independente pós-criação. `fetchServices` corrigido — mantém todos os serviços locais, não só os com `templateId`. `addServiceLocally` agora exportado. +`updateServiceProgress` |

### Transforms (`src/flows/`)

| Arquivo | Mudança |
|---|---|
| `template-to-execution.ts` | Steps gerados marcados com `addedDuringExecution: false`. `ServiceExecution` inicializa com `occurrences: []` e `approvals: []`. Mensagem de boas-vindas reframeada |
| `template-to-portal.ts` | Agora delega para `execution-to-portal.ts` — o portal é construído a partir do estado vivo da execução |

### Mocks (`src/mocks/`)

| Arquivo | Mudança |
|---|---|
| `execution.ts` | `solarExecution` atualizado com `subSteps` na etapa 5, etapa dinâmica (`addedDuringExecution: true`), `occurrences[]` com 1 ocorrência resolvida, `approvals[]` com 1 aprovação pendente, `scopeChanges`, `clientId/teamId` |
| `insights.ts` | `operationSteps` adicionado (mesmo dado de `flowSteps`). `occurrenceStats` adicionado em todos os períodos (today/week/month) |

### Navegação (`src/lib/constants.ts`)

- `APP_NAV` reordenado: Serviços em 2º lugar (logo após Dashboard), Templates renomeado para **"Modelos"** e movido para 8º posição (secundária)
- Nova ordem: Dashboard → Serviços → Operação → Clientes → Equipe → Insights → Relatórios → **Modelos** → Configurações

### UI — Execução (`src/modules/execution/`)

| Componente | Mudança |
|---|---|
| `execution-modals.tsx` | `ReportProblemModal` substituído por `RegisterOccurrenceModal` (seleção de tipo + descrição + efeitos). +`AddStepModal` |
| `execution-bottom-bar.tsx` | "Problema" → "Ocorrência". +"+ Etapa" (7 ações). Grid 4→7 colunas |
| `execution-view.tsx` | Integra `registerOccurrence`, `addStep`, `RegisterOccurrenceModal`, `AddStepModal`. Ocorrência e +Etapa disponíveis mesmo com serviço pausado |
| `execution-hero-step.tsx` | Exibe sub-etapas na etapa atual. Lista completa de etapas expandível. Badge de "nova" para etapas dinâmicas. Contador de ocorrências |

### UI — Dashboard (`src/modules/dashboard/`)

- CTA primário: "Crie um serviço" (botão verde) — não mais "Ver templates"
- Tagline: "O que está acontecendo agora" — não mais "Clareza operacional" (mantido nas tags)

### UI — Insights (`src/modules/insights/`)

- `FlowAnalysis`: título "Análise de fluxo" → "Desempenho por etapa"
- Ícone: `Zap` → `TrendingUp`
- Aceita `OperationStep` (tipo novo) sem quebrar compatibilidade

### UI — Modelos (`src/modules/operiva-config/`)

- `TemplateLibraryView`: breadcrumb "Templates" → "Modelos"
- Título: "Biblioteca de templates" → "Modelos disponíveis"
- Banner explicativo: _"Modelos de plano inicial — aceleradores para criação de serviços. Após criar o serviço, ele é totalmente independente."_

---

## 4. O que foi criado

| Arquivo | Descrição |
|---|---|
| `src/types/occurrence.ts` | Ocorrência como entidade de primeira classe — tipos (`OccurrenceType`), efeitos (`OccurrenceEffect`), labels, interface `Occurrence` |
| `src/flows/execution-to-portal.ts` | Constrói `ClientPortalData` a partir do estado vivo de `ServiceExecution` — portal desacoplado do template original |
| `docs/REFORMULACAO-ESTRATEGICA.md` | Este documento |

---

## 5. O que foi removido ou substituído

| Removido | Substituído por |
|---|---|
| `reportProblem` reducer | `registerOccurrence` (mais rico: tipo, efeitos, resolução) |
| `ReportProblemModal` | `RegisterOccurrenceModal` |
| Evento `"problema"` no timeline | Evento `"ocorrencia"` (alias legado `LegacyProblemType` mantido) |
| Portal construído direto do template | Portal construído de `ServiceExecution` via `execution-to-portal.ts` |
| CTA "Ver templates" no dashboard | CTA "Novo serviço" + "Ver todos os serviços" |
| "Templates" no label da nav (posição 3) | "Modelos" (posição 8) |
| `flowSteps` como único campo em InsightsPeriodData | `operationSteps` (primário) + `flowSteps` (alias deprecated) |

**Nota:** Nada foi deletado de forma destrutiva — toda remoção tem uma alternativa melhor no lugar.

---

## 6. O que ainda se recomenda evoluir futuramente

### Alta prioridade

1. **Módulo de ocorrências** — tela dedicada de ocorrências por serviço com histórico, resolução e filtros
2. **Portal multi-aprovação** — componente `PortalApprovalPanel` atualizado para renderizar `pendingApprovals[]` (lista de aprovações pendentes)
3. **Execution reorder UI** — interface de arrastar e soltar para reordenar etapas durante execução (DnD Kit já instalado)
4. **`execution-to-portal` em tempo real** — conectar `client-portal-slice.refreshPortalTimeline` para reconstruir portal a partir de `ServiceExecution` ao invés de append mock

### Média prioridade

5. **Criação de serviço sem template** — fluxo direto `Novo Serviço → Preencher dados → Adicionar etapas manualmente` sem passar por seleção de modelo
6. **Insights de ocorrências** — componente dedicado para renderizar `occurrenceStats` nos Insights (dados já mockados)
7. **`occurrences` na seção de insights** — `AutoInsightsFeed` com insights gerados de padrões de ocorrências
8. **Renomear `src/flows/` → `src/transforms/`** — consistência com nomenclatura do domínio (requer atualização de ~15 imports)

### Baixa prioridade / Longo prazo

9. **Serviço "ao vivo" no portal** — polling ou WebSocket para atualizar portal sem refresh manual
10. **Histórico de versões do plano** — registrar snapshots das etapas quando há mudanças de escopo
11. **Integração backend** — substituir `fakeApi` por API real; `occurrences[]` e `approvals[]` como endpoints separados
12. **App mobile dedicado** — o modo execução (campo) tem UX ideal para PWA/app nativo

---

## 7. Princípios arquiteturais estabelecidos

> "Agora eu sei exatamente o que está acontecendo." — sentimento alvo do usuário (cliente e profissional)

1. **Serviço é a entidade central** — não template, não fluxo
2. **Modelo é um acelerador** — ajuda na criação, não controla a execução
3. **Execução é dinâmica** — etapas podem ser adicionadas, removidas, reordenadas a qualquer momento
4. **Ocorrências são dados, não erros** — fazem parte da realidade operacional e devem ser registradas sem fricção
5. **Portal reflete o estado real** — construído a partir de `ServiceExecution`, não de definições estáticas
6. **Transparência para o cliente** — `clientVisible`, `pendingApprovals[]`, `nextStep` no portal
7. **Mobile-first para o profissional** — bottom bar com ações em um toque, poucos cliques, feedback imediato
