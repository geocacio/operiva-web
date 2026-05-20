# Auditoria UX — Operiva MVP

**Data:** 20/05/2026  
**Referência:** [POSICIONAMENTO.md](./POSICIONAMENTO.md) — camada operacional visual, não ERP, premium, clareza em 30s  
**Escopo:** Leitura de componentes reais (sem teste em dispositivo físico). Insights inclui correções mobile aplicadas nesta sessão.

### Escala

| Nota | Significado |
|------|-------------|
| 5 | Excelente alinhamento com posicionamento |
| 4 | Bom; pequenos gaps |
| 3 | Aceitável; desvia em pontos visíveis |
| 2 | Fraco; parece ERP/admin genérico |
| 1 | Desalinhado |

---

## 1. Landing `/`

**Nota: 5/5**

**Pontos fortes**
- Copy e seções espelham o posicionamento: frases oficiais, bloco “Não é ERP”, nichos de serviço, fluxo em 6 etapas e mockups da plataforma.
- Visual premium (grid, gradientes, motion com `useReducedMotion`), CTAs claros para onboarding e app.

**Gaps / melhorias**
- Menu de âncoras some em mobile (`hidden lg:flex`) sem menu hambúrguer equivalente — navegação longa fica só por scroll.
- Reforçar em um bloco curto “complementa seu ERP” (hoje está mais implícito no texto do hero).

---

## 2. Onboarding `/app/onboarding`

**Nota: 4/5**

**Pontos fortes**
- Wizard empresa → nicho → templates → equipe comunica “montar operação”, não cadastro fiscal.
- Integração com mocks de nicho/template alinha funilaria/construção ao discurso de segmentos.

**Gaps / melhorias**
- Experiência ainda parece formulário administrativo; falta preview visual do portal ou de um serviço exemplo ao concluir.
- Sem indicação mobile-first explícita em grids de seleção (cards de template podem ficar apertados em 320px).

---

## 3. Dashboard `/app`

**Nota: 4/5**

**Pontos fortes**
- Tagline “Clareza operacional”, cards operacionais com progresso/etapas, atalhos para execução e “ver como cliente”.
- Timeline visual e painel de alertas reforçam operação ao vivo, não relatório contábil.

**Gaps / melhorias**
- Gráficos de barras (`SimpleBarChart`) lembram painel analítico genérico — rótulos poderiam ser “etapas/dia” com linguagem de chão de fábrica.
- Banner de templates compete com destaque operacional; hierarquia do “o que fazer agora” pode ficar mais forte no topo.

---

## 4. Serviços `/app/servicos` + wizard `/app/servicos/novo`

**Nota: 4/5**

**Pontos fortes**
- Lista usa `OperationalCard` (progresso, etapas, status, links execução/portal) — núcleo da proposta visual.
- Wizard em 4 passos conecta cliente, template e disparo operacional de forma guiada.

**Gaps / melhorias**
- Página de lista quase só filtro + grid — falta headline/subcopy de “visão da operação” no corpo (subtitle está só no shell).
- Ao finalizar wizard, destacar link do portal para o cliente (transparência) como passo de celebração.

---

## 5. Templates `/app/templates/*`

**Nota: 4/5**

**Pontos fortes**
- Biblioteca por nicho, builder de fluxo visual (`BuilderFlowCanvas`), trilha equipe/cliente/preview — forte “camada operacional”.
- Breadcrumbs e linguagem “Editor de fluxo operacional” evitam tom de ERP.

**Gaps / melhorias**
- Builder usa altura fixa `h-[calc(100vh-8rem)]` e layout desktop — em mobile/tablet o canvas + sidebars provavelmente exigem empilhamento dedicado.
- Rotas legadas `/app/configuracao/*` ainda existem — risco de confusão na IA do produto.

---

## 6. Operação `/app/operacao`

**Nota: 4/5**

**Pontos fortes**
- Abas “Meus serviços / Prioridades” orientadas à fila do dia; cards levam direto à execução.
- Badges de status e prioridade mantêm leitura rápida para campo.

**Gaps / melhorias**
- Aba “Todos” sobrepõe valor de `/app/servicos` sem diferenciação clara (gestor vs executor).
- `TabsList` com três+ rótulos pode apertar em telas estreitas — considerar scroll ou ícones.

---

## 7. Execução `/execucao/[id]`

**Nota: 5/5**

**Pontos fortes**
- Modo ultra simples: etapa hero grande, barra inferior de ações (foto, vídeo, aprovação, problema), timeline recente.
- Copy e hierarquia perfeitos para técnico em campo; motion respeita `useReducedMotion`.

**Gaps / melhorias**
- Indicador de conexão/offline e feedback tátil mais explícito ajudariam em obra/oficina (futuro).
- Nenhum gap crítico de posicionamento no MVP atual.

---

## 8. Clientes `/app/clientes`

**Nota: 3/5**

**Pontos fortes**
- Cards limpos com contato e contagem de serviços — útil como diretório.

**Gaps / melhorias**
- Parece mini-CRM (email/telefone) mais que “camada operacional” — sem atalho para serviços ativos ou portal do cliente.
- Falta narrativa: “clientes que acompanham sozinhos” ou status agregado da operação.

---

## 9. Equipe `/app/equipe`

**Nota: 3,5/5**

**Pontos fortes**
- Times com cor, membros e status online/ocupado — visual organizado.

**Gaps / melhorias**
- Somente leitura; não liga carga atual (heatmap/insights) nem atribuição de serviço.
- Pouca diferenciação entre “configurar papéis no template” e “ver quem está fazendo o quê agora”.

---

## 10. Insights `/app/insights` (pós-correção mobile)

**Nota: 4/5**

**Pontos fortes**
- Hero “copiloto operacional”, KPIs operacionais, feed automático e redirecionamento conceitual longe de BI.
- **Mobile:** Gargalos em cards (`md:hidden`), Operiva Score empilhado com anel responsivo, abas de período full-width, `min-w-0` anti-overflow.

**Gaps / melhorias**
- “Análise de fluxo” ainda usa carrossel horizontal (`min-w-max`) — em 320px continua scroll, não stack premium.
- Heatmap mantém grade wide com scroll — aceitável, mas segunda onda mobile poderia virar lista “equipe × etapa”.

---

## 11. Relatórios `/app/relatorios`

**Nota: 5/5**

**Pontos fortes**
- Página de desvio intencional: explica que clareza está em Insights, não em relatório corporativo — alinhamento exemplar com posicionamento.

**Gaps / melhorias**
- Nenhum obrigatório no MVP; opcional: métrica única “exportar PDF” só se não virar BI.

---

## 12. Configurações `/app/configuracoes`

**Nota: 4/5**

**Pontos fortes**
- Foco em empresa, nicho operacional, atalhos para templates e reset de onboarding — escopo certo para gestor.

**Gaps / melhorias**
- Tom ainda técnico (labels de formulário); poderia abrir com frase “Operiva complementa seu ERP”.
- Troca de nicho via `confirm()` nativo quebra sensação premium.

---

## 13. Portal `/portal`, `/portal/meus-servicos`, `/portal/[token]`

**Nota: 4,5/5**

**Pontos fortes**
- Login com copy de transparência; detalhe `[token]` cinematográfico (jornada, mídia, aprovações, celebração).
- Lista do cliente com abas por status — experiência de acompanhamento, não back-office.

**Gaps / melhorias**
- Login demo (qualquer código) é óbvio para MVP, mas reduz confiança em demo comercial.
- Lista não filtra por cliente logado — mostra todos os serviços mock (quebra narrativa “meus serviços”).

---

## Resumo executivo

| Área | Nota |
|------|------|
| Landing | 5 |
| Onboarding | 4 |
| Dashboard | 4 |
| Serviços + wizard | 4 |
| Templates | 4 |
| Operação | 4 |
| Execução | 5 |
| Clientes | 3 |
| Equipe | 3,5 |
| Insights | 4 |
| Relatórios | 5 |
| Configurações | 4 |
| Portal | 4,5 |
| **Média simples** | **~4,1** |

### Onde o MVP mais entrega o posicionamento
- Landing, execução em campo, portal do cliente, página de relatórios (anti-BI) e insights como copiloto.

### Prioridades sugeridas (sem implementar aqui)
1. **Clientes + Equipe** — conectar à operação ativa e ao portal (notas mais baixas).
2. **Templates builder + fluxo Insights** — polish mobile (segunda leva após gargalos/score).
3. **Portal lista** — filtrar serviços pelo cliente da sessão.
4. **Landing mobile** — menu de seções em drawer.

### Correções aplicadas (Insights mobile)
- `operiva-score.tsx`: card full-width, anel SVG responsivo, breakdown empilhado, tipografia menor em mobile.
- `bottlenecks-section.tsx`: lista em cards abaixo de `md`, tabela em desktop.
- `insights-hero.tsx`: score em card destacado no mobile, tipografia ajustada.
- `insights-period-tabs.tsx`: abas full-width em mobile.
- `insights-view.tsx` / `insights-kpi-cards.tsx`: `min-w-0` e padding responsivo.

`npm run build` — OK após alterações.
