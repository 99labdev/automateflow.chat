# Reposicionamento do site: infraestrutura para criadores

Data: 2026-09-18
Status: aprovado em brainstorming, aguardando revisão do spec

## Contexto

O AutomateFlow deixou de ser só atendimento por WhatsApp com agentes de IA. Hoje
o produto entrega agendamento de posts, automação de Instagram (comentário → DM,
follow-ups), funis VSL, páginas de captura, página de links e atendimento com IA
+ CRM. Tudo isso é operável por MCP, público em todos os planos.

O site (`automateflow-landing`, Next 15 + next-intl, pt/en/es) ainda vende
"agentes de IA para atendimento 24/7". Não menciona agendamento, funis, captura,
página de links nem MCP, e promete automações de e-mail e WhatsApp que não
existem.

## Objetivo

Quem produz conteúdo entra no site e entende em uma rolagem que:

1. existe um ecossistema integrado cobrindo do post agendado à venda;
2. pode operar tudo conversando com o Claude via MCP, ou na mão pelo painel;
3. atendimento com IA continua no produto, como último elo da cadeia.

## Decisões

| Tema | Decisão |
|------|---------|
| Profundidade | Reestruturar a home. Identidade visual e design system atuais ficam. |
| Hierarquia | Infraestrutura primeiro; MCP como prova e diferencial. |
| Estrutura | Jornada do criador: seções na ordem do fluxo real, cada uma alimentando a próxima. |
| MCP | Público, todos os planos. Seção própria logo após o hero e chip de prompt em cada passo. |
| Pricing | Intocado (componente e copy). |
| Público | Criadores de conteúdo e infoprodutores. Atendimento vira feature, não produto. |
| Redes do agendador | Instagram (feed e reels). Outras redes entram depois, só copy. |
| Não lançado | Automação de e-mail e de WhatsApp saem do site. Sem "em breve". |

## Estrutura da página

`src/app/[locale]/page.tsx`, nesta ordem:

| # | Componente | Estado | id |
|---|-----------|--------|----|
| — | `Header` | copy | — |
| — | `Hero` | reescrito | — |
| — | `WhyChoose` | 3 → 4 cards | `why-choose` (atual) |
| — | `McpShowcase` | novo | `mcp` |
| 1 | `ScheduleShowcase` | novo | `schedule` |
| 2 | `AutomationShowcase` | copy + selo | `instagram-automation` (mantido) |
| 3 | `FunnelShowcase` | novo | `funnel` |
| 4 | `AgentsShowcase` | copy + selo | `agents-showcase` (mantido) |
| 5 | `CRMShowcase` | copy + selo | `crm-showcase` (mantido) |
| — | `Pricing` | intocado | atual |
| — | `FAQ`, `CTA`, `Footer` | copy | atuais |

Âncoras existentes são mantidas para não quebrar links externos e anúncios.

## Componentes

### `McpPrompt.tsx` (novo, compartilhado)

Chip com rótulo "ou peça pro Claude:" e um prompt em fonte mono. Recebe `text`
por prop. Sem estado, sem lógica. Usado nas cinco seções de passo.

### Selo de passo

Número + rótulo no topo de cada showcase ("Passo 2 — Engajamento vira lead").
Uma classe CSS e uma linha de JSX por seção. Não é componente.

### `McpShowcase.tsx` (novo)

- Mock de janela de chat: prompt do usuário, seguido de chamadas de tool
  respondendo (post agendado, automação criada, captura criada).
- Três passos de conexão: copiar URL do MCP → colar no cliente de IA → pedir.
- Linha de clientes compatíveis.
- Mensagem: MCP é atalho, painel continua disponível.

### `ScheduleShowcase.tsx` (novo)

Mock de calendário semanal com posts agendados e um card de post com status.

### `FunnelShowcase.tsx` (novo)

Três telas ligadas por seta: página de captura → VSL com botão → página de
links. Em telas estreitas vira coluna e as setas giram 90°.

### Padrão dos componentes novos

Seguem os showcases existentes: client component, `useTranslations`, mock em
HTML/CSS puro, classe `section` e tokens de cor atuais. Alvo de 8–10 KB por
componente (os atuais têm ~30 KB; não é referência de tamanho).

### Existentes

- `Hero`: título único (sai a rotação Agentes/Automações). Mock de chat passa a
  mostrar um criador entregando material por DM. Stats só ficam se os números
  forem reais para o novo público; senão viram quatro selos de pilar. Nenhum
  número é inventado.
- `WhyChoose`: quatro cards — Conteúdo, Automações, Funis, Atendimento.
- `AutomationShowcase`: a lista de automações cai de quatro para as que existem
  (DM do Instagram e follow-up).
- `AgentsShowcase`, `CRMShowcase`: copy reposicionada como passos 4 e 5.

### Remoção

`HowItWorks.tsx`, `Agents.tsx` e `WebChat.tsx` não são importados pela page.
Saem junto com suas chaves de tradução órfãs.

## Copy (pt é a fonte; en e es são traduzidos a partir dele)

**Hero**
- Título: "Toda a infraestrutura do seu conteúdo" / destaque "em um só lugar."
- Subtítulo: "Agende posts, transforme comentários em leads, monte funis e
  venda no automático — na mão ou pedindo pro Claude via MCP."
- CTAs: "Comece grátis" (app) e "Ver o MCP" (`#mcp`).

**WhyChoose** — "Um ecossistema, não cinco ferramentas"
1. Conteúdo — agende e publique sem abrir o app
2. Automações — comentário vira DM, DM vira lead
3. Funis — captura, VSL e página de links
4. Atendimento — agente de IA + CRM fecham a venda

**MCP** — "Configure tudo conversando". Subtítulo: "Conecte o AutomateFlow ao
Claude e peça em português. Sem formulário, sem horas de configuração. Prefere
fazer na mão? O painel continua lá."

**Passos**

| # | Título | Prompt do chip |
|---|--------|----------------|
| 1 | Agende e esqueça | "Agenda esse reel pra quinta 18h com essa legenda" |
| 2 | Comentário vira conversa | "Cria automação: quem comentar CLAUDE recebe o material por DM" |
| 3 | Do clique ao lead | "Monta captura com nome e e-mail e um funil com minha VSL" |
| 4 | Ninguém fica sem resposta | "Configura follow-up de 24h pra quem não abriu o material" |
| 5 | Feche a venda | "Me mostra os leads quentes dessa semana" |

Regra: cada prompt precisa corresponder a uma tool real do MCP. Na
implementação, cada um é conferido contra a lista de tools; o que não existir é
trocado por um prompt que exista.

**Nav:** MCP · Conteúdo · Automações · Funis · Atendimento · Planos · FAQ

**FAQ** — entram: o que é MCP e se precisa programar; com quais IAs funciona;
se dá pra fazer tudo sem MCP; se serve pra quem só quer agendar; se ainda há
atendimento por WhatsApp. As perguntas técnicas de agente (configurações
avançadas, diferença da API oficial) se fundem em uma.

**CTA final:** "Pronto pra parar de colar ferramenta com fita?". Sai "milhares
de empresas" (não verificável).

**Footer e metadata:** "Infraestrutura para criadores de conteúdo e
infoprodutores: agendamento, automações, funis e atendimento com IA — tudo
operável via MCP." `title`, `description` e OG atualizados por idioma em
`src/app/[locale]/layout.tsx`.

Tom: direto, segunda pessoa, sem superlativo. A copy final passa pelas skills
`copywriting` e `humanizer`.

## Traduções

- Namespaces novos: `mcp`, `schedule`, `funnel`.
- Reescritos: `nav`, `hero`, `whyChoose`, `faq`, `cta`, `footer`, partes de
  `agentsShowcase` e `crmShowcase`.
- Removidos: `howItWorks`, `agents` e chaves órfãs.
- Nenhuma string fica hardcoded em componente.

## Responsivo e acessibilidade

- Mocks novos empilham abaixo de 768px, mesmo breakpoint dos showcases atuais.
- Mocks são decorativos: `aria-hidden`. O conteúdo está em headings e texto.
- `McpPrompt` é texto real, não imagem.
- Animações respeitam `prefers-reduced-motion`.

## Verificação

`scripts/check-messages.mjs`: compara a árvore de chaves de `pt.json`, `en.json`
e `es.json` e sai com erro se divergirem. Roda dentro de `npm run lint`. É o
único check automatizado novo; a página é estática e não tem lógica a testar.

Antes de considerar pronto:

1. `npm run build`, `npm run lint` e o check de chaves passam.
2. `/pt`, `/en`, `/es` abertos em 1440px e 390px, com screenshot de cada seção
   nova.
3. Todo link de nav rola para a seção certa; CTAs apontam para o app.
4. Cada prompt de chip conferido contra as tools reais do MCP.

## Ordem de entrega

Commits pequenos, site funcional em cada um:

1. Remoção de órfãos + `check-messages.mjs`
2. Copy: hero, whyChoose, nav, footer, CTA, FAQ, metadata (pt)
3. `McpPrompt`, selos de passo, reordenação da page
4. `McpShowcase`, depois `ScheduleShowcase`, depois `FunnelShowcase`
5. en e es + verificação visual

## Fora de escopo

- Pricing (planos, preços, lista de features)
- Termos e privacidade
- Identidade visual
- Página dedicada `/mcp`
- Outras redes no agendador além de Instagram
