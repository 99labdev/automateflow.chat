# Creator Infrastructure Repositioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the AutomateFlow landing home so a content creator understands, in one scroll, that the product is an integrated content-to-sale infrastructure (schedule → DM automation → capture/funnel → follow-up → AI support + CRM) operable via MCP.

**Architecture:** Next 15 App Router + next-intl, one page (`src/app/[locale]/page.tsx`) composed of client components with `styled-jsx` and pure HTML/CSS mocks. Copy lives only in `messages/{pt,en,es}.json`; pt is the source. Three new showcase components, one shared `McpPrompt` chip, a step badge CSS class, and a message-key parity script wired into `npm run build`.

**Tech Stack:** Next 15.5, React 19, next-intl 3.25, lucide-react, styled-jsx (built into Next), Node 20 for the check script.

**Spec:** `docs/superpowers/specs/2026-09-18-creator-infra-repositioning-design.md`

**Spec corrections found while planning (apply these, not the spec, where they differ):**
1. `WebChat.tsx` IS used (`src/app/layout.tsx` renders it). It stays. Only `HowItWorks.tsx` and `Agents.tsx` are orphans.
2. Chip prompts were verified against the real MCP tool list (`automateflow/mcp_server/` in the app repo). Funnels and CRM have no MCP tools, so the chips for steps 3 and 5 changed. The verified prompts are in the pt copy of Task 3 and must be used verbatim.
3. MCP scheduling is Instagram-only today (`create_publication` kinds: reel, trial, image, carousel, story; media upload finishes on screen). Schedule section copy says Instagram. "Instagram + TikTok" appears only in pricing copy, copied verbatim from the app.
4. Per-locale metadata: `src/app/layout.tsx` has static pt metadata. Add `generateMetadata` in `src/app/[locale]/layout.tsx` reading a new `metadata` namespace; leave root layout `icons` as is.

## Global Constraints

- This worktree has no `node_modules`: run `npm install` once before Task 1. Every lucide icon named in this plan must be checked once with `node -e "const l=require('lucide-react');console.log(['Funnel','MessageCircleMore','CalendarClock','Headset','Clapperboard','Images','CalendarCheck','MessageSquareText','ClipboardList','KeyRound','Plug','Shuffle','UserCheck','Link2','Sparkles'].filter(n=>!l[n]))"`; any name printed is missing in lucide 0.453 and gets the fallback named in its task (or `Filter`, `MessageCircle`, `Calendar`, `Image`, `Key`, `Link`, `Star` respectively).
- Locales: `en`, `pt`, `es`; default `pt` (`src/i18n/routing.ts`). Every string in a component comes from `useTranslations`; no hardcoded user-visible text.
- Key parity: `messages/pt.json`, `en.json`, `es.json` must have identical key trees and identical array lengths. `npm run build` fails otherwise (Task 1).
- Existing section ids stay: `why-choose`, `instagram-automation`, `agents-showcase`, `crm-showcase`, `pricing`, `faq`. New ids: `mcp`, `schedule`, `funnel`.
- Pricing prices/credits stay: 247/4000, 397/12000, 997/30000. Plan keys `basic`/`standard`/`corporate` stay; only copy changes.
- Visual identity stays: use existing tokens (`--gradient-primary`, `--card-bg`, `--border-color`, `--radius-*`, `--shadow-*`), class `section`, `section-title`, `section-subtitle`, `container`.
- New components target 8–10 KB each. Mocks are decorative: wrap in `aria-hidden="true"`.
- Animations wrapped in `@media (prefers-reduced-motion: reduce) { animation: none }`.
- Mobile breakpoint for stacking: `768px`; nav breakpoint already `992px`.
- No claims that are not verifiable: no "thousands of companies", no invented stats.
- MCP facts for copy: endpoint `https://app.automateflow.chat/mcp`; token generated in the app under Integrações → MCP; clients: Claude Code, Codex, Cursor, VS Code (any MCP client).
- Signup URL: `https://app.automateflow.chat/accounts/signup/`. Login: `https://app.automateflow.chat/accounts/login/`.
- Commit after every task with the attribution line: `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

## Review Focus

1. **A locale missing a key added in pt** → next-intl throws at render, page 500s in that locale. Pinned by `scripts/check-messages.mjs` (Task 1) and its self-test.
2. **A `t.raw()` array with different lengths per locale** (pricing features, cta features) → silently shorter list in one language. Pinned by the array-length check in Task 1.
3. **Nav link to a section id that no longer exists** (`#how-it-works` in Hero today) → click does nothing. Task 4 rewrites all anchors; Task 11 clicks every nav link.
4. **Viewport 390px on `FunnelShowcase`** (three screens side by side) → horizontal overflow. Task 8 stacks at 768px and Task 11 screenshots at 390px.
5. **`prefers-reduced-motion`** on the MCP typing mock → motion for users who opted out. Task 6 adds the media query; Task 11 checks with DevTools emulation.

---

### Task 1: Message-key parity check + orphan removal

**Files:**
- Create: `scripts/check-messages.mjs`
- Modify: `package.json` (scripts)
- Delete: `src/components/HowItWorks.tsx`, `src/components/Agents.tsx`
- Modify: `messages/pt.json`, `messages/en.json`, `messages/es.json` (remove `howItWorks`, `nav.howItWorks`)

**Interfaces:**
- Produces: `npm run check:messages` (exit 0 on parity, 1 with a list of differing paths). `npm run build` runs it first.

- [ ] **Step 1: Write the check script**

```js
// scripts/check-messages.mjs
// Fails the build when pt/en/es message files diverge in keys or array lengths.
import { readFileSync } from 'node:fs';

const locales = ['pt', 'en', 'es'];
const trees = Object.fromEntries(
  locales.map((l) => [l, JSON.parse(readFileSync(new URL(`../messages/${l}.json`, import.meta.url), 'utf8'))]),
);

function paths(node, prefix = '') {
  const out = new Set();
  if (Array.isArray(node)) {
    out.add(`${prefix}[${node.length}]`);
    return out;
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      const p = prefix ? `${prefix}.${k}` : k;
      out.add(p);
      for (const child of paths(v, p)) out.add(child);
    }
  }
  return out;
}

const base = paths(trees.pt);
let failed = false;
for (const l of locales.slice(1)) {
  const other = paths(trees[l]);
  const missing = [...base].filter((p) => !other.has(p));
  const extra = [...other].filter((p) => !base.has(p));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`messages/${l}.json differs from pt.json`);
    for (const p of missing) console.error(`  missing: ${p}`);
    for (const p of extra) console.error(`  extra:   ${p}`);
  }
}
if (failed) process.exit(1);
console.log('messages: pt/en/es keys match');
```

- [ ] **Step 2: Wire into package.json**

Replace the `scripts` block:

```json
"scripts": {
  "dev": "next dev",
  "check:messages": "node scripts/check-messages.mjs",
  "build": "npm run check:messages && next build",
  "start": "next start",
  "lint": "next lint"
}
```

- [ ] **Step 3: Run it — expect pass (files are currently in parity)**

Run: `npm run check:messages`
Expected: `messages: pt/en/es keys match`, exit 0.

- [ ] **Step 4: Prove it fails on divergence**

Run:
```bash
node -e "const fs=require('fs');const p='messages/en.json';const d=JSON.parse(fs.readFileSync(p));d.__probe='x';fs.writeFileSync(p,JSON.stringify(d,null,2))"
npm run check:messages; echo "exit=$?"
git checkout messages/en.json
```
Expected: `messages/en.json differs from pt.json` / `  extra:   __probe` / `exit=1`. After checkout, `git status` shows `messages/en.json` clean.

- [ ] **Step 5: Delete orphan components and their keys**

```bash
git rm src/components/HowItWorks.tsx src/components/Agents.tsx
```

Then in each of `messages/pt.json`, `messages/en.json`, `messages/es.json`:
- delete the whole top-level `"howItWorks": { ... }` object;
- delete the line `"howItWorks": "..."` inside `"nav"`.

Use a script so all three stay in sync:

```bash
for l in pt en es; do
  node -e "const fs=require('fs');const p='messages/$l.json';const d=JSON.parse(fs.readFileSync(p));delete d.howItWorks;delete d.nav.howItWorks;fs.writeFileSync(p,JSON.stringify(d,null,2)+'\n')"
done
```

- [ ] **Step 6: Verify**

Run: `npm run check:messages && grep -rn "howItWorks\|HowItWorks\|components/Agents'" src/ ; echo "grep exit=$?"`
Expected: parity message, then no grep matches (`grep exit=1`).

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add scripts/check-messages.mjs package.json messages/ src/components/
git commit -m "chore: add message-key parity check, remove orphan components

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: `McpPrompt` chip + step badge style

**Files:**
- Create: `src/components/McpPrompt.tsx`
- Modify: `src/app/globals.css` (append `.step-badge`)
- Modify: `messages/pt.json`, `messages/en.json`, `messages/es.json` (new `mcp.promptLabel`)

**Interfaces:**
- Produces: `<McpPrompt text={string} />` — renders label from `mcp.promptLabel` + the prompt text in mono. Used by Tasks 5–8.
- Produces: CSS class `.step-badge` (a `<span>` with number + label), used by Tasks 5–8.

- [ ] **Step 1: Add the translation key (all three locales)**

Add a top-level `mcp` object with only `promptLabel` for now (Task 6 fills the rest):

- pt: `"mcp": { "promptLabel": "ou peça pro Claude:" }`
- en: `"mcp": { "promptLabel": "or ask Claude:" }`
- es: `"mcp": { "promptLabel": "o pídeselo a Claude:" }`

- [ ] **Step 2: Create the component**

```tsx
// src/components/McpPrompt.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';

export default function McpPrompt({ text }: { text: string }) {
  const t = useTranslations('mcp');

  return (
    <div className="mcp-prompt">
      <span className="mcp-prompt-label">
        <Sparkles size={14} />
        {t('promptLabel')}
      </span>
      <code className="mcp-prompt-text">&ldquo;{text}&rdquo;</code>

      <style jsx>{`
        .mcp-prompt {
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px 12px;
          margin: 24px auto 0;
          padding: 10px 16px;
          border: 1px dashed var(--border-light);
          border-radius: var(--radius-full);
          background: var(--secondary-color);
          max-width: 100%;
        }

        .mcp-prompt-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-color);
          white-space: nowrap;
        }

        .mcp-prompt-text {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .mcp-prompt {
            border-radius: var(--radius-lg);
          }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 3: Append the step badge to globals.css**

```css
/* Step badge: "Passo 2 · Engajamento vira lead" above a showcase title */
.step-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto 16px;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  background: var(--gradient-primary);
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.step-badge-wrap {
  text-align: center;
}
```

- [ ] **Step 4: Verify**

Run: `npm run check:messages && npx tsc --noEmit`
Expected: parity ok; no type errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/McpPrompt.tsx src/app/globals.css messages/
git commit -m "feat: add McpPrompt chip and step badge style

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: Portuguese copy for every namespace (source of truth)

**Files:**
- Modify: `messages/pt.json` (replace `nav`, `hero`, `whyChoose`, `agentsShowcase`, `crmShowcase`, `pricing.plans`, `faq`, `cta`, `footer`; add `mcp`, `schedule`, `funnel`, `metadata`)

**Interfaces:**
- Produces: the pt key tree every later task reads. Later tasks name keys exactly as here.

Note: after this task `check:messages` FAILS until Task 10 adds en/es. That is expected; do not run `npm run build` between Tasks 3 and 10 — use `npx tsc --noEmit` and `next dev` on `/pt` instead.

- [ ] **Step 1: Replace `nav`**

```json
"nav": {
  "mcp": "MCP",
  "content": "Conteúdo",
  "automations": "Automações",
  "funnels": "Funis",
  "support": "Atendimento",
  "plans": "Planos",
  "faq": "FAQ",
  "login": "Login",
  "startFree": "Comece Grátis",
  "selectLanguage": "Selecione o idioma"
}
```

- [ ] **Step 2: Replace `hero`**

```json
"hero": {
  "title": "Toda a infraestrutura do seu conteúdo",
  "titleHighlight": "em um só lugar.",
  "subtitle": "Agende posts, transforme comentários em leads, monte funis e venda no automático — na mão ou pedindo pro Claude via MCP.",
  "cta": {
    "trial": "Comece grátis",
    "mcp": "Ver o MCP"
  },
  "pillars": ["Agendamento", "Automações de DM", "Funis e captura", "Atendimento com IA"],
  "chatDemo": {
    "agentName": "Seu perfil no Instagram",
    "status": "Automação ativa"
  },
  "conversations": {
    "c1": {
      "greeting": "Vi que você comentou CLAUDE no reel. Já me segue?",
      "userMessage": "Sigo sim!",
      "response": "Prontinho 🙌 Seu material tá no botão aqui embaixo. Qualquer dúvida, é só chamar."
    },
    "c2": {
      "greeting": "Oi! Você pegou o guia ontem. Conseguiu aplicar?",
      "userMessage": "Ainda não, tô sem tempo 😅",
      "response": "Tranquilo. Se quiser, na mentoria eu monto isso com você. Link no botão."
    },
    "c3": {
      "greeting": "Olá! Sou o assistente da mentoria. Como posso ajudar?",
      "userMessage": "Quanto custa e quando começa?",
      "response": "Próxima turma abre dia 10. Te mando os valores e já reservo sua vaga?"
    }
  }
}
```

- [ ] **Step 3: Replace `whyChoose`**

```json
"whyChoose": {
  "title": "Um ecossistema, não cinco ferramentas",
  "subtitle": "Do post agendado à venda fechada, cada etapa alimenta a próxima",
  "cards": {
    "content": {
      "title": "Conteúdo",
      "description": "Agende reels, carrosséis e stories e publique sem abrir o app."
    },
    "automations": {
      "title": "Automações",
      "description": "Comentário vira DM, DM vira lead. Com botões, exigência de follow e variações de mensagem."
    },
    "funnels": {
      "title": "Funis",
      "description": "Captura, VSL e página de links prontos em minutos, no seu domínio de marca."
    },
    "support": {
      "title": "Atendimento",
      "description": "Agente de IA responde, qualifica e o CRM acompanha até fechar."
    }
  }
}
```

- [ ] **Step 4: Add `mcp` (replace the stub from Task 2)**

```json
"mcp": {
  "promptLabel": "ou peça pro Claude:",
  "badge": "MCP",
  "title": "Configure tudo conversando",
  "subtitle": "Conecte o AutomateFlow ao Claude e peça em português. Sem formulário, sem horas de configuração. Prefere fazer na mão? O painel continua lá.",
  "chat": {
    "user": "Agenda esse reel pra quinta às 18h, cria a automação da palavra CLAUDE e uma captura com nome e e-mail pro material.",
    "tools": {
      "publication": "Reel agendado para quinta, 18:00",
      "automation": "Automação \"CLAUDE\" criada e ativa",
      "capture": "Captura \"material-claude\" criada"
    },
    "assistant": "Feito. Falta só subir o vídeo pelo link que te mandei. Quer que eu crie um follow-up de 24h pra quem pegar o material?"
  },
  "steps": {
    "title": "Três passos e pronto",
    "s1": { "title": "Gere seu token", "description": "No painel, em Integrações → MCP." },
    "s2": { "title": "Cole no seu assistente", "description": "Claude Code, Codex, Cursor, VS Code ou qualquer cliente MCP." },
    "s3": { "title": "Peça", "description": "Agende, automatize, crie capturas e páginas por texto." }
  },
  "clientsLabel": "Funciona com",
  "clients": ["Claude Code", "Codex", "Cursor", "VS Code"],
  "cta": "Ver documentação do MCP"
}
```

- [ ] **Step 5: Add `schedule`**

```json
"schedule": {
  "step": "Passo 1 · Conteúdo",
  "title": "Agende e esqueça",
  "subtitle": "Reels, carrosséis, imagens e stories no Instagram, com legenda, hashtags e primeiro comentário. Vincule uma automação ao post antes mesmo de publicar.",
  "prompt": "Agenda um reel pra quinta às 18h com essa legenda e liga ele na automação CLAUDE",
  "calendar": {
    "title": "Publicações",
    "week": "Esta semana",
    "days": ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    "posts": {
      "p1": { "kind": "Reel", "time": "18:00" },
      "p2": { "kind": "Carrossel", "time": "12:00" },
      "p3": { "kind": "Story", "time": "09:00" },
      "p4": { "kind": "Reel", "time": "18:00" }
    }
  },
  "card": {
    "kind": "Reel",
    "name": "Como uso o Claude pra agendar",
    "status": "Agendado",
    "when": "Qui · 18:00",
    "automation": "Automação: CLAUDE",
    "firstComment": "1º comentário: Comenta CLAUDE que eu te mando o guia"
  }
}
```

- [ ] **Step 6: Replace `agentsShowcase` (AutomationShowcase + AgentsShowcase share it)**

Keep the `agents` sub-object and the `automationSection` mock strings; change titles, drop the three fake automations, add step/prompt keys:

```json
"agentsShowcase": {
  "step": "Passo 4 · Atendimento",
  "title": "Ninguém fica sem resposta",
  "subtitle": "Follow-ups automáticos pra quem pegou o material e um agente de IA que responde, qualifica e transfere pra você quando precisa.",
  "prompt": "Cria um follow-up 24h depois pra quem recebeu o material, oferecendo a mentoria",
  "agents": {
    "multichannel": {
      "title": "Follow-up automático",
      "description": "Sequências por tempo (1h a 7 dias) no Instagram DM, com botões de link",
      "multichannelMsg1": "Oi! Você pegou o guia ontem. Conseguiu aplicar?",
      "multichannelMsg2": "Ainda não, tô sem tempo",
      "multichannelMsg3": "Tranquilo. Se quiser, na mentoria eu monto isso com você. Link no botão 👇"
    },
    "aimodels": {
      "title": "Agente de IA no DM e WhatsApp",
      "description": "Gemini, OpenAI, Anthropic, Llama, Mistral, DeepSeek — você escolhe",
      "aimodelsMsg1": "Olá! Sou o assistente da mentoria. Como posso ajudar?",
      "aimodelsMsg2": "Quanto custa e quando começa?",
      "aimodelsMsg3": "A próxima turma abre dia 10. Te mando os valores agora e já reservo sua vaga?"
    },
    "integrations": {
      "title": "Transferência pra humano",
      "description": "O agente reconhece quando parar e chama você, com fuso e atraso configuráveis",
      "integrationsMsg1": "Essa dúvida é sobre pagamento. Vou chamar o Hudson pra te responder, ok?",
      "integrationsMsg2": "Ok, obrigado!",
      "integrationsMsg3": "Avisei ele. Responde em até 2 min por aqui mesmo."
    },
    "leadcapture": {
      "title": "Base de conhecimento",
      "description": "Treine o agente com seu material, FAQ e regras da sua oferta",
      "leadcaptureMsg1": "Posso responder com base no material da mentoria!",
      "leadcaptureMsg2": "Tem certificado?",
      "leadcaptureMsg3": "Tem sim: certificado ao concluir os 6 módulos. Quer que eu te mande o conteúdo programático?"
    }
  },
  "automationSection": {
    "step": "Passo 2 · Engajamento",
    "title": "Comentário vira conversa",
    "subtitle": "Quem comenta a palavra-chave recebe a DM na hora, com botões de link. Exija follow, varie a mensagem e responda o comentário automaticamente.",
    "prompt": "Cria uma automação: quem comentar CLAUDE recebe o material por DM, só se me seguir",
    "postText": "Comenta \"CLAUDE\" que eu te mando o guia!",
    "likes": "curtidas",
    "comment1": "claude",
    "commentReply": "@hudsonbrendon verifica tua DM!",
    "comment2": "CLAUDE 🙏",
    "dmActive": "Ativo agora",
    "dmGreeting": "Vi que você comentou CLAUDE. Já me segue?",
    "dmText": "Prontinho! Seu guia tá aqui:",
    "dmLinkTitle": "Guia do Claude",
    "dmPlaceholder": "Enviar mensagem..."
  },
  "automations": {
    "commentToDm": {
      "title": "Comentário → DM",
      "description": "Palavra-chave no comentário dispara a DM com botões de link"
    },
    "requireFollow": {
      "title": "Exigir follow",
      "description": "Só entrega depois que a pessoa segue você"
    },
    "variations": {
      "title": "Variações de mensagem",
      "description": "Até 10 textos sorteados pra não parecer robô"
    }
  }
}
```

- [ ] **Step 7: Add `funnel`**

```json
"funnel": {
  "step": "Passo 3 · Lead",
  "title": "Do clique ao lead",
  "subtitle": "Página de captura, funil com VSL e página de links, todos prontos em minutos. O lead entra no CRM na hora.",
  "prompt": "Cria uma captura com nome, e-mail e telefone que manda pro meu funil, e põe o link da mentoria na minha página de bio",
  "capture": {
    "label": "Captura",
    "title": "Pega o guia grátis",
    "fields": ["Nome", "E-mail", "WhatsApp"],
    "button": "Quero o guia"
  },
  "vsl": {
    "label": "Funil VSL",
    "title": "Como eu uso o Claude pra vender todo dia",
    "duration": "12:40",
    "button": "Quero entrar na mentoria"
  },
  "links": {
    "label": "Página de links",
    "handle": "@99hud",
    "items": ["Mentoria", "Comunidade no WhatsApp", "Guia do Claude"]
  }
}
```

- [ ] **Step 8: Replace `crmShowcase` title block (keep `features` and `kanban` as they are)**

Change only these keys; leave `features` and `kanban` untouched:

```json
"step": "Passo 5 · Venda",
"title": "Feche a venda",
"subtitle": "Cada lead da captura e cada conversa viram um card no CRM. Kanban, tarefas e histórico completo.",
"prompt": "Quantas pessoas a automação CLAUDE alcançou nos últimos 7 dias?"
```

- [ ] **Step 9: Replace `pricing.plans` (copy only; keep `title`, `subtitle`, `periods`, `discounts`, `perMonth`, `cta`, `popular`, `enterprise`)**

```json
"plans": {
  "basic": {
    "name": "Creator",
    "price": "247",
    "credits": "4000",
    "description": "Perfeito para começar sua jornada de automação",
    "features": [
      "2 perfis sociais (Instagram + TikTok)",
      "1 membro do time",
      "Agendamento de posts ilimitado",
      "Automações de DM ilimitadas",
      "Funis, VSLs e páginas ilimitados",
      "Captura de leads ilimitada",
      "Acesso MCP: opere tudo pelo seu assistente de IA",
      "Agentes de IA e bases de conhecimento ilimitados",
      "CRM completo com pipelines e qualificação de leads por IA",
      "Conexões API Não Oficial do WhatsApp ilimitadas (R$47,00/mês cada)"
    ]
  },
  "standard": {
    "name": "Pro",
    "price": "397",
    "credits": "12000",
    "description": "Plano mais popular para equipes em crescimento",
    "features": [
      "5 perfis sociais (Instagram + TikTok)",
      "3 membros do time",
      "Agendamento de posts ilimitado",
      "Automações de DM ilimitadas",
      "Funis, VSLs e páginas ilimitados",
      "Captura de leads ilimitada",
      "Acesso MCP: opere tudo pelo seu assistente de IA",
      "Agentes de IA e bases de conhecimento ilimitados",
      "CRM completo com pipelines e qualificação de leads por IA",
      "Conexões API Não Oficial do WhatsApp ilimitadas (R$47,00/mês cada)"
    ]
  },
  "corporate": {
    "name": "Agency",
    "price": "997",
    "credits": "30000",
    "description": "Solução completa com IA e automações avançadas",
    "features": [
      "15 perfis sociais (Instagram + TikTok)",
      "Membros do time ilimitados",
      "Agendamento de posts ilimitado",
      "Automações de DM ilimitadas",
      "Funis, VSLs e páginas ilimitados",
      "Captura de leads ilimitada",
      "Acesso MCP: opere tudo pelo seu assistente de IA",
      "Agentes de IA e bases de conhecimento ilimitados",
      "CRM completo com pipelines e qualificação de leads por IA",
      "Conexões API Não Oficial do WhatsApp ilimitadas (R$47,00/mês cada)"
    ]
  }
}
```

Also change `"monthlyCredits": "créditos por mensal"` → `"créditos por mês"` (fixes an existing typo shown on the site).

- [ ] **Step 10: Replace `faq.questions` with exactly 8 entries (the component renders q1–q8)**

```json
"faq": {
  "title": "Perguntas Frequentes",
  "subtitle": "Tire suas dúvidas sobre a AutomateFlow",
  "questions": {
    "q1": {
      "question": "O que é MCP e preciso saber programar?",
      "answer": "MCP é o protocolo que deixa um assistente de IA usar ferramentas. Você gera um token no painel, cola no Claude (ou outro cliente) e passa a pedir em português: agendar post, criar automação, criar captura. Nada de código."
    },
    "q2": {
      "question": "Funciona com quais assistentes de IA?",
      "answer": "Claude Code, Codex, Cursor, VS Code e qualquer cliente que fale MCP. O endpoint é o mesmo para todos: app.automateflow.chat/mcp."
    },
    "q3": {
      "question": "Posso fazer tudo sem MCP?",
      "answer": "Pode. O painel tem todas as telas: publicações, automações, capturas, funis, páginas, agentes e CRM. O MCP é um atalho, não uma exigência."
    },
    "q4": {
      "question": "Serve pra quem só quer agendar posts?",
      "answer": "Sim. Todos os planos têm agendamento ilimitado de reels, carrosséis, imagens e stories no Instagram. O resto do ecossistema fica disponível quando você precisar."
    },
    "q5": {
      "question": "Ainda tem atendimento com agente de IA no WhatsApp?",
      "answer": "Tem. Agentes com Gemini, OpenAI, Anthropic, Llama, Mistral ou DeepSeek, base de conhecimento, transferência pra humano, fuso horário e atraso de resposta. Canais: WhatsApp (API oficial e não oficial), Instagram DM e Webchat."
    },
    "q6": {
      "question": "Como funciona a automação de comentários no Instagram?",
      "answer": "Você define a palavra-chave. Quem comenta recebe uma DM com botões de link, opcionalmente só depois de seguir você. Dá pra responder o comentário automaticamente e sortear até 10 variações de texto."
    },
    "q7": {
      "question": "Quais são os planos?",
      "answer": "Creator (R$ 247/mês, 2 perfis sociais, 4.000 créditos), Pro (R$ 397/mês, 5 perfis, 12.000 créditos) e Agency (R$ 997/mês, 15 perfis, 30.000 créditos). Todos com agendamento, automações, funis, captura, MCP, agentes e CRM ilimitados."
    },
    "q8": {
      "question": "Como funciona o teste grátis?",
      "answer": "7 dias com todas as funcionalidades, sem cartão de crédito. Cancele quando quiser."
    }
  }
}
```

- [ ] **Step 11: Replace `cta` and `footer.description`**

```json
"cta": {
  "title": "Pronto pra parar de colar ferramenta com fita?",
  "subtitle": "Agendamento, automações, funis, captura e atendimento em uma plataforma só — e um MCP pra operar tudo.",
  "button": "Comece grátis por 7 dias",
  "features": ["Sem cartão de crédito", "Cancele quando quiser", "MCP em todos os planos"]
}
```

In `footer`, change only `description`:

```json
"description": "Infraestrutura para criadores de conteúdo e infoprodutores: agendamento, automações, funis e atendimento com IA — tudo operável via MCP."
```

- [ ] **Step 12: Add `metadata`**

```json
"metadata": {
  "title": "AutomateFlow — Infraestrutura para criadores de conteúdo",
  "description": "Agende posts, transforme comentários em leads, monte funis e venda no automático. Tudo operável via MCP pelo Claude ou pelo painel."
}
```

- [ ] **Step 13: Validate JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('messages/pt.json','utf8'));console.log('pt ok')"`
Expected: `pt ok`.

- [ ] **Step 14: Commit**

```bash
git add messages/pt.json
git commit -m "feat(copy): rewrite Portuguese copy for creator-infrastructure positioning

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4: Hero, WhyChoose, Header, CTA, Footer, metadata

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/WhyChoose.tsx`
- Modify: `src/components/Header.tsx:73-80` (nav links)
- Modify: `src/components/CTA.tsx` (icon only)
- Modify: `src/app/[locale]/layout.tsx` (generateMetadata)
- Modify: `src/app/layout.tsx` (drop static title/description)

**Interfaces:**
- Consumes: pt keys from Task 3 (`hero.*`, `whyChoose.cards.{content,automations,funnels,support}`, `nav.*`, `metadata.*`).

- [ ] **Step 1: Rewrite `Hero.tsx` JSX (keep the whole `<style jsx>` block; remove typewriter)**

Replace everything from the top of the file to just before `<style jsx>{\`` with:

```tsx
'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const t = useTranslations('hero');
  const [currentConversation, setCurrentConversation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalConversations = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentConversation((prev) => (prev + 1) % totalConversations);
        setIsAnimating(false);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const conversationKey = `conversations.c${currentConversation + 1}`;
  const pillars = t.raw('pillars') as string[];

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-main">{t('title')}</span>
              <span className="text-highlight">{t('titleHighlight')}</span>
            </h1>
            <p className="hero-subtitle">{t('subtitle')}</p>

            <div className="hero-buttons">
              <a href="https://app.automateflow.chat/accounts/signup/" className="btn btn-white">
                {t('cta.trial')}
                <ArrowRight size={18} />
              </a>
              <a href="#mcp" className="btn btn-outline-white">
                {t('cta.mcp')}
              </a>
            </div>

            <ul className="hero-pillars">
              {pillars.map((p) => (
                <li key={p} className="hero-pillar">{p}</li>
              ))}
            </ul>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="chat-demo">
              <div className="chat-header">
                <div className="chat-avatar">
                  <Instagram size={22} color="white" />
                </div>
                <div className="chat-info">
                  <span className="chat-name">{t('chatDemo.agentName')}</span>
                  <span className="chat-status">
                    <span className="status-dot"></span>
                    {t('chatDemo.status')}
                  </span>
                </div>
              </div>
              <div className={`chat-messages ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                <div className="message received animate-message">
                  <p>{t(`${conversationKey}.greeting`)}</p>
                  <span className="time">10:30</span>
                </div>
                <div className="message sent animate-message delay-1">
                  <p>{t(`${conversationKey}.userMessage`)}</p>
                  <span className="time">10:32</span>
                </div>
                <div className="message received animate-message delay-2">
                  <p>{t(`${conversationKey}.response`)}</p>
                  <span className="time">10:32</span>
                </div>
              </div>
              <div className="typing-indicator">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

```

- [ ] **Step 2: Adjust Hero CSS**

Inside the existing `<style jsx>` block:

Replace the rules `.hero-title-main`, `.text-highlight-wrapper`, `.text-highlight-placeholder`, `.text-highlight`, `.cursor`, `@keyframes blink`, `.animate-subtitle`, `@keyframes slideUpSubtitle` with:

```css
.hero-title {
  font-size: 3.25rem;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 24px;
  color: white;
  text-align: left;
}

.hero-title-main,
.text-highlight {
  display: block;
}

.text-highlight {
  color: white;
  opacity: 0.85;
}
```

(Delete the earlier `.hero-title` rule so there is only this one.)

Replace `.hero-stats`, `.stat-item`, `.stat-number`, `.stat-label` with:

```css
.hero-pillars {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hero-pillar {
  padding: 6px 14px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0.95;
}
```

In the `@media (max-width: 1024px)` block: replace `.hero-stats { justify-content: center; }` with `.hero-pillars { justify-content: center; }` and add `.hero-title { text-align: center; }`.

In the `@media (max-width: 768px)` block: delete the `.text-highlight-wrapper`, `.text-highlight-placeholder, .text-highlight` and `.hero-stats` rules; set `.hero-title { font-size: 2rem; }`.

Add at the end of the style block:

```css
@media (prefers-reduced-motion: reduce) {
  .hero-section::before,
  .chat-demo,
  .animate-message,
  .typing-dot,
  .status-dot {
    animation: none;
  }
  .animate-message {
    opacity: 1;
  }
}
```

- [ ] **Step 3: Rewrite `WhyChoose.tsx` cards list**

Replace the imports and `cards` array:

```tsx
import { CalendarClock, MessageCircleMore, Funnel, Headset } from 'lucide-react';
```

```tsx
const cards = [
  { key: 'content', icon: CalendarClock },
  { key: 'automations', icon: MessageCircleMore },
  { key: 'funnels', icon: Funnel },
  { key: 'support', icon: Headset },
];
```

Everything else in the component (timeline layout) stays; four items alternate left/right automatically.

If `Funnel` or `MessageCircleMore` are missing in the installed lucide version, check with `node -e "const l=require('lucide-react');console.log(!!l.Funnel,!!l.MessageCircleMore,!!l.CalendarClock,!!l.Headset)"` and substitute `Filter` / `MessageCircle` respectively.

- [ ] **Step 4: Update Header nav links**

Replace the six `<a ... className="nav-link" ...>` lines inside `<nav>` with:

```tsx
<a href="#mcp" className="nav-link" onClick={(e) => handleNavClick(e, 'mcp')}>{t('mcp')}</a>
<a href="#schedule" className="nav-link" onClick={(e) => handleNavClick(e, 'schedule')}>{t('content')}</a>
<a href="#instagram-automation" className="nav-link" onClick={(e) => handleNavClick(e, 'instagram-automation')}>{t('automations')}</a>
<a href="#funnel" className="nav-link" onClick={(e) => handleNavClick(e, 'funnel')}>{t('funnels')}</a>
<a href="#agents-showcase" className="nav-link" onClick={(e) => handleNavClick(e, 'agents-showcase')}>{t('support')}</a>
<a href="#pricing" className="nav-link" onClick={(e) => handleNavClick(e, 'pricing')}>{t('plans')}</a>
<a href="#faq" className="nav-link" onClick={(e) => handleNavClick(e, 'faq')}>{t('faq')}</a>
```

- [ ] **Step 5: CTA icon**

In `CTA.tsx`, delete the `WhatsAppIcon` component and replace `<WhatsAppIcon size={20} />` with `<ArrowRight size={20} />`, importing `ArrowRight` from `lucide-react`. (The button now goes to signup, not WhatsApp.)

- [ ] **Step 6: Per-locale metadata**

In `src/app/[locale]/layout.tsx`, add:

```tsx
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('title'), description: t('description') },
  };
}
```

In `src/app/layout.tsx`, reduce `metadata` to `{ icons: { icon: '/logo.png', apple: '/logo.png' } }`.

- [ ] **Step 7: Verify on /pt**

Run: `npx tsc --noEmit` → no errors.
Run: `npm run dev` in background, open `http://localhost:3000/pt`.
Expected: hero shows "Toda a infraestrutura do seu conteúdo / em um só lugar.", four pillar chips, chat rotates through 3 creator conversations; WhyChoose has 4 cards; nav has 7 links; `<title>` is the pt metadata title (`document.title` in console).

- [ ] **Step 8: Commit**

```bash
git add src/components/Hero.tsx src/components/WhyChoose.tsx src/components/Header.tsx src/components/CTA.tsx src/app/layout.tsx "src/app/[locale]/layout.tsx"
git commit -m "feat: reposition hero, pillars, nav and metadata for creators

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5: Step badges + chips on the three existing showcases

**Files:**
- Modify: `src/components/AutomationShowcase.tsx` (automations list, header, badge, chip)
- Modify: `src/components/AgentsShowcase.tsx` (header, badge, chip)
- Modify: `src/components/CRMShowcase.tsx:171-175` (header, badge, chip)

**Interfaces:**
- Consumes: `McpPrompt` (Task 2), `.step-badge` (Task 2), keys `agentsShowcase.step|prompt`, `agentsShowcase.automationSection.step|prompt`, `crmShowcase.step|prompt` (Task 3).

- [ ] **Step 1: AutomationShowcase — replace automations list**

Replace the `automations` array and its imports:

```tsx
import { Heart, MessageCircle, Send, Bookmark, Instagram, UserCheck, Shuffle } from 'lucide-react';
import McpPrompt from '@/components/McpPrompt';
```

```tsx
const automations = [
  { key: 'commentToDm', icon: Instagram, color: primaryColor },
  { key: 'requireFollow', icon: UserCheck, color: primaryColor },
  { key: 'variations', icon: Shuffle, color: primaryColor },
];
```

In the tabs `map`, remove `${!automation.available ? 'coming-soon' : ''}`, the `disabled` prop, the `onClick` guard (`onClick={() => setActiveAutomation(index)}`), and the `{!automation.available && (...)}` badge block. Delete the `.agent-tab.coming-soon`, `.agent-tab.coming-soon:hover` and `.coming-soon-badge` CSS rules.

- [ ] **Step 2: AutomationShowcase — header**

Replace:

```tsx
<h2 className="section-title">{t('automationSection.title')}</h2>
<p className="automation-subtitle">{t('automationSection.subtitle')}</p>
```

with:

```tsx
<div className="step-badge-wrap"><span className="step-badge">{t('automationSection.step')}</span></div>
<h2 className="section-title">{t('automationSection.title')}</h2>
<p className="section-subtitle">{t('automationSection.subtitle')}</p>
<div className="text-center"><McpPrompt text={t('automationSection.prompt')} /></div>
```

- [ ] **Step 3: AgentsShowcase — header**

Add `import McpPrompt from '@/components/McpPrompt';` and replace:

```tsx
<h2 className="section-title">{t('title')}</h2>
<p className="section-subtitle">{t('subtitle')}</p>
```

with:

```tsx
<div className="step-badge-wrap"><span className="step-badge">{t('step')}</span></div>
<h2 className="section-title">{t('title')}</h2>
<p className="section-subtitle">{t('subtitle')}</p>
<div className="text-center"><McpPrompt text={t('prompt')} /></div>
```

- [ ] **Step 4: CRMShowcase — header**

Add the import and replace:

```tsx
<h3 className="crm-title">{t('title')}</h3>
<p className="crm-subtitle">{t('subtitle')}</p>
```

with:

```tsx
<div className="step-badge-wrap"><span className="step-badge">{t('step')}</span></div>
<h2 className="crm-title">{t('title')}</h2>
<p className="crm-subtitle">{t('subtitle')}</p>
<div className="text-center"><McpPrompt text={t('prompt')} /></div>
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` → no errors. Open `/pt`: each of the three sections shows badge → title → subtitle → chip; Automations has 3 enabled tabs, no "Em Breve".

- [ ] **Step 6: Commit**

```bash
git add src/components/AutomationShowcase.tsx src/components/AgentsShowcase.tsx src/components/CRMShowcase.tsx
git commit -m "feat: add step badges and MCP prompt chips to existing showcases

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6: `McpShowcase`

**Files:**
- Create: `src/components/McpShowcase.tsx`
- Modify: `src/app/[locale]/page.tsx` (insert after `WhyChoose`)

**Interfaces:**
- Consumes: keys `mcp.*` (Task 3).
- Produces: section `id="mcp"`.

- [ ] **Step 1: Create the component**

```tsx
// src/components/McpShowcase.tsx
'use client';

import { useTranslations } from 'next-intl';
import { CalendarCheck, MessageSquareText, ClipboardList, KeyRound, Plug, MessageCircle, ArrowRight } from 'lucide-react';

export default function McpShowcase() {
  const t = useTranslations('mcp');
  const clients = t.raw('clients') as string[];
  const tools = [
    { key: 'publication', icon: CalendarCheck },
    { key: 'automation', icon: MessageSquareText },
    { key: 'capture', icon: ClipboardList },
  ];
  const steps = [
    { key: 's1', icon: KeyRound },
    { key: 's2', icon: Plug },
    { key: 's3', icon: MessageCircle },
  ];

  return (
    <section id="mcp" className="section mcp-section">
      <div className="container">
        <div className="step-badge-wrap"><span className="step-badge">{t('badge')}</span></div>
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>

        <div className="mcp-grid">
          <div className="mcp-chat" aria-hidden="true">
            <div className="mcp-bubble user">{t('chat.user')}</div>
            {tools.map(({ key, icon: Icon }, i) => (
              <div key={key} className="mcp-tool" style={{ animationDelay: `${0.6 + i * 0.6}s` }}>
                <Icon size={16} />
                <span>{t(`chat.tools.${key}`)}</span>
                <span className="mcp-check">✓</span>
              </div>
            ))}
            <div className="mcp-bubble assistant" style={{ animationDelay: '2.6s' }}>{t('chat.assistant')}</div>
          </div>

          <div className="mcp-steps">
            <h3 className="mcp-steps-title">{t('steps.title')}</h3>
            <ol>
              {steps.map(({ key, icon: Icon }, i) => (
                <li key={key} className="mcp-step">
                  <span className="mcp-step-icon"><Icon size={18} /></span>
                  <div>
                    <strong>{i + 1}. {t(`steps.${key}.title`)}</strong>
                    <p>{t(`steps.${key}.description`)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mcp-clients">
              <span className="mcp-clients-label">{t('clientsLabel')}</span>
              {clients.map((c) => <span key={c} className="mcp-client">{c}</span>)}
            </div>
            <a href="https://app.automateflow.chat/mcp/" className="btn btn-outline-primary">
              {t('cta')} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mcp-section { background: var(--bg-primary); scroll-margin-top: 100px; }
        .mcp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          max-width: 1000px;
          margin: 0 auto;
        }
        .mcp-chat {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-xl);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mcp-bubble {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 0.9rem;
          line-height: 1.5;
          max-width: 90%;
          animation: mcpIn 0.5s ease-out both;
        }
        .mcp-bubble.user {
          background: var(--gradient-primary);
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        .mcp-bubble.assistant {
          background: var(--secondary-color);
          color: var(--text-primary);
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }
        .mcp-tool {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.8rem;
          color: var(--text-secondary);
          animation: mcpIn 0.4s ease-out both;
        }
        .mcp-tool :global(svg) { color: var(--primary-color); flex-shrink: 0; }
        .mcp-check { margin-left: auto; color: #16a34a; font-weight: 700; }
        @keyframes mcpIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mcp-steps-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 20px; color: var(--text-primary); }
        .mcp-steps ol { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
        .mcp-step { display: flex; gap: 14px; align-items: flex-start; }
        .mcp-step-icon {
          flex-shrink: 0;
          width: 40px; height: 40px;
          border-radius: 50%;
          background: var(--gradient-primary);
          color: white;
          display: flex; align-items: center; justify-content: center;
        }
        .mcp-step strong { display: block; color: var(--text-primary); margin-bottom: 2px; }
        .mcp-step p { color: var(--text-secondary); font-size: 0.95rem; }
        .mcp-clients { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 24px; }
        .mcp-clients-label { font-size: 0.85rem; color: var(--text-muted); margin-right: 4px; }
        .mcp-client {
          padding: 4px 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        @media (max-width: 768px) {
          .mcp-grid { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mcp-bubble, .mcp-tool { animation: none; }
        }
      `}</style>
    </section>
  );
}
```

- [ ] **Step 2: Insert into the page**

In `src/app/[locale]/page.tsx`, add `import McpShowcase from '@/components/McpShowcase';` and render `<McpShowcase />` directly after `<WhyChoose />`.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`. Open `/pt#mcp`: chat mock animates in (user bubble, three tool lines with ✓, assistant bubble), three steps, four client pills, CTA link to `https://app.automateflow.chat/mcp/`. Emulate `prefers-reduced-motion: reduce` in DevTools rendering panel → everything visible immediately, no motion. Width 390: single column.

- [ ] **Step 4: Commit**

```bash
git add src/components/McpShowcase.tsx "src/app/[locale]/page.tsx"
git commit -m "feat: add MCP showcase section

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 7: `ScheduleShowcase`

**Files:**
- Create: `src/components/ScheduleShowcase.tsx`
- Modify: `src/app/[locale]/page.tsx` (insert after `McpShowcase`)

**Interfaces:**
- Consumes: `schedule.*` (Task 3), `McpPrompt`, `.step-badge`.
- Produces: section `id="schedule"`.

- [ ] **Step 1: Create the component**

```tsx
// src/components/ScheduleShowcase.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Clapperboard, Images, Circle, CalendarClock, MessageSquareText } from 'lucide-react';
import McpPrompt from '@/components/McpPrompt';

// day index (0 = Mon) → post key; the rest of the week is empty on purpose
const SLOTS: Record<number, { key: string; icon: typeof Clapperboard }> = {
  1: { key: 'p1', icon: Clapperboard },
  2: { key: 'p2', icon: Images },
  3: { key: 'p3', icon: Circle },
  4: { key: 'p4', icon: Clapperboard },
};

export default function ScheduleShowcase() {
  const t = useTranslations('schedule');
  const days = t.raw('calendar.days') as string[];

  return (
    <section id="schedule" className="section schedule-section">
      <div className="container">
        <div className="step-badge-wrap"><span className="step-badge">{t('step')}</span></div>
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>
        <div className="text-center"><McpPrompt text={t('prompt')} /></div>

        <div className="schedule-grid" aria-hidden="true">
          <div className="calendar">
            <div className="calendar-header">
              <strong>{t('calendar.title')}</strong>
              <span>{t('calendar.week')}</span>
            </div>
            <div className="calendar-days">
              {days.map((d, i) => {
                const slot = SLOTS[i];
                const Icon = slot?.icon;
                return (
                  <div key={d} className={`calendar-day ${i === 4 ? 'today' : ''}`}>
                    <span className="calendar-day-name">{d}</span>
                    {slot && Icon && (
                      <div className="calendar-post">
                        <Icon size={14} />
                        <span>{t(`calendar.posts.${slot.key}.kind`)}</span>
                        <em>{t(`calendar.posts.${slot.key}.time`)}</em>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="post-card">
            <div className="post-card-thumb"><Clapperboard size={28} /></div>
            <div className="post-card-body">
              <span className="post-card-kind">{t('card.kind')}</span>
              <strong>{t('card.name')}</strong>
              <div className="post-card-row"><CalendarClock size={14} /> {t('card.when')}</div>
              <div className="post-card-row"><MessageSquareText size={14} /> {t('card.automation')}</div>
              <p className="post-card-comment">{t('card.firstComment')}</p>
              <span className="post-card-status">{t('card.status')}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .schedule-section { background: var(--secondary-color); scroll-margin-top: 100px; }
        .schedule-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 32px;
          max-width: 1000px;
          margin: 48px auto 0;
          align-items: start;
        }
        .calendar, .post-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }
        .calendar-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        .calendar-header span { font-size: 0.85rem; color: var(--text-muted); }
        .calendar-days { display: grid; grid-template-columns: repeat(7, 1fr); }
        .calendar-day {
          min-height: 150px;
          padding: 10px 6px;
          border-right: 1px solid var(--border-color);
          display: flex; flex-direction: column; gap: 8px;
        }
        .calendar-day:last-child { border-right: none; }
        .calendar-day.today { background: var(--secondary-color); }
        .calendar-day-name { font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-align: center; }
        .calendar-post {
          display: flex; flex-direction: column; align-items: center; gap: 2px;
          padding: 8px 4px;
          border-radius: var(--radius-md);
          background: var(--gradient-primary);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
        }
        .calendar-post em { font-style: normal; opacity: 0.85; font-weight: 400; }
        .post-card { display: flex; flex-direction: column; }
        .post-card-thumb {
          height: 120px;
          background: var(--gradient-primary);
          color: white;
          display: flex; align-items: center; justify-content: center;
        }
        .post-card-body { padding: 16px 20px 20px; display: flex; flex-direction: column; gap: 8px; }
        .post-card-kind { font-size: 0.75rem; font-weight: 600; color: var(--primary-color); text-transform: uppercase; }
        .post-card-body strong { color: var(--text-primary); }
        .post-card-row { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--text-secondary); }
        .post-card-comment {
          font-size: 0.8rem; color: var(--text-muted);
          padding: 8px 10px; border-left: 3px solid var(--border-light);
        }
        .post-card-status {
          align-self: flex-start;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          background: rgba(22, 163, 74, 0.12);
          color: #16a34a;
          font-size: 0.75rem;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .schedule-grid { grid-template-columns: 1fr; }
          .calendar-days { grid-template-columns: repeat(4, 1fr); }
          .calendar-day { min-height: 110px; border-bottom: 1px solid var(--border-color); }
        }
      `}</style>
    </section>
  );
}
```

- [ ] **Step 2: Insert into the page** after `<McpShowcase />`.

- [ ] **Step 3: Verify**

`npx tsc --noEmit`; open `/pt#schedule`: badge "Passo 1 · Conteúdo", chip, 7-day calendar with 4 posts (Ter/Qua/Qui/Sex), Sex highlighted, post card with status "Agendado". At 390px: calendar wraps to 4 columns, card below.

- [ ] **Step 4: Commit**

```bash
git add src/components/ScheduleShowcase.tsx "src/app/[locale]/page.tsx"
git commit -m "feat: add schedule showcase section

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 8: `FunnelShowcase` + final page order

**Files:**
- Create: `src/components/FunnelShowcase.tsx`
- Modify: `src/app/[locale]/page.tsx` (final order)

**Interfaces:**
- Consumes: `funnel.*` (Task 3), `McpPrompt`, `.step-badge`.
- Produces: section `id="funnel"`; final page order.

- [ ] **Step 1: Create the component**

```tsx
// src/components/FunnelShowcase.tsx
'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Play, Link2 } from 'lucide-react';
import McpPrompt from '@/components/McpPrompt';

export default function FunnelShowcase() {
  const t = useTranslations('funnel');
  const fields = t.raw('capture.fields') as string[];
  const links = t.raw('links.items') as string[];

  return (
    <section id="funnel" className="section funnel-section">
      <div className="container">
        <div className="step-badge-wrap"><span className="step-badge">{t('step')}</span></div>
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('subtitle')}</p>
        <div className="text-center"><McpPrompt text={t('prompt')} /></div>

        <div className="funnel-flow" aria-hidden="true">
          <div className="screen">
            <span className="screen-label">{t('capture.label')}</span>
            <strong className="screen-title">{t('capture.title')}</strong>
            {fields.map((f) => <div key={f} className="field">{f}</div>)}
            <div className="screen-btn">{t('capture.button')}</div>
          </div>

          <ArrowRight className="funnel-arrow" size={28} />

          <div className="screen">
            <span className="screen-label">{t('vsl.label')}</span>
            <div className="video">
              <Play size={28} />
              <span>{t('vsl.duration')}</span>
            </div>
            <strong className="screen-title">{t('vsl.title')}</strong>
            <div className="screen-btn">{t('vsl.button')}</div>
          </div>

          <ArrowRight className="funnel-arrow" size={28} />

          <div className="screen">
            <span className="screen-label">{t('links.label')}</span>
            <div className="avatar" />
            <strong className="screen-title">{t('links.handle')}</strong>
            {links.map((l) => (
              <div key={l} className="link"><Link2 size={14} /> {l}</div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .funnel-section { background: var(--bg-primary); scroll-margin-top: 100px; }
        .funnel-flow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 48px;
        }
        .screen {
          width: 260px;
          padding: 20px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-lg);
          display: flex; flex-direction: column; gap: 10px;
        }
        .screen-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--primary-color); }
        .screen-title { color: var(--text-primary); font-size: 0.95rem; line-height: 1.3; }
        .field {
          padding: 8px 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .screen-btn {
          margin-top: 4px;
          padding: 10px;
          border-radius: var(--radius-md);
          background: var(--gradient-primary);
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          text-align: center;
        }
        .video {
          height: 110px;
          border-radius: var(--radius-lg);
          background: var(--text-primary);
          color: white;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
          font-size: 0.75rem;
        }
        .avatar { width: 48px; height: 48px; border-radius: 50%; background: var(--gradient-primary); align-self: center; }
        .link {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          color: var(--text-primary);
        }
        .funnel-flow :global(.funnel-arrow) { color: var(--primary-color); flex-shrink: 0; }
        @media (max-width: 768px) {
          .funnel-flow { flex-direction: column; }
          .screen { width: 100%; max-width: 320px; }
          .funnel-flow :global(.funnel-arrow) { transform: rotate(90deg); }
        }
      `}</style>
    </section>
  );
}
```

- [ ] **Step 2: Final page order**

Replace `src/app/[locale]/page.tsx` with:

```tsx
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyChoose from '@/components/WhyChoose';
import McpShowcase from '@/components/McpShowcase';
import ScheduleShowcase from '@/components/ScheduleShowcase';
import AutomationShowcase from '@/components/AutomationShowcase';
import FunnelShowcase from '@/components/FunnelShowcase';
import AgentsShowcase from '@/components/AgentsShowcase';
import CRMShowcase from '@/components/CRMShowcase';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <WhyChoose />
      <McpShowcase />
      <ScheduleShowcase />
      <AutomationShowcase />
      <FunnelShowcase />
      <AgentsShowcase />
      <CRMShowcase />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
```

`AutomationShowcase` currently has `padding-top: 0` and a `border-top` because it used to sit right under `AgentsShowcase`. Change `.instagram-automation-section { padding-top: 0; }` → remove that line, and in `.automation-section` remove `border-top` and `padding-top: 60px`.

- [ ] **Step 3: Verify**

`npx tsc --noEmit`; open `/pt`: section order matches the list above; `/pt#funnel` shows three screens with arrows; at 390px they stack with arrows pointing down and no horizontal scroll (`document.documentElement.scrollWidth === window.innerWidth` in console).

- [ ] **Step 4: Commit**

```bash
git add src/components/FunnelShowcase.tsx src/components/AutomationShowcase.tsx "src/app/[locale]/page.tsx"
git commit -m "feat: add funnel showcase and final creator-journey page order

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 9: Copy pass with `copywriting` + `humanizer` (pt)

**Files:**
- Modify: `messages/pt.json`

- [ ] **Step 1:** Invoke the `copywriting` skill on `hero`, `whyChoose`, `mcp`, `schedule`, `funnel`, `agentsShowcase` (title/subtitle only), `crmShowcase` (title/subtitle), `cta`. Keep the chip `prompt` strings verbatim — they are verified against MCP tools and must stay executable.
- [ ] **Step 2:** Invoke the `humanizer` skill on the result. Constraint: no superlatives, second person, no "revolucione/transforme".
- [ ] **Step 3:** Run `node -e "JSON.parse(require('fs').readFileSync('messages/pt.json','utf8'))"` and reload `/pt`.
- [ ] **Step 4: Commit**

```bash
git add messages/pt.json
git commit -m "copy: polish Portuguese landing copy

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 10: English and Spanish translations

**Files:**
- Modify: `messages/en.json`, `messages/es.json`

**Interfaces:**
- Consumes: the final pt tree (Task 9). Every key and array length must match; `npm run check:messages` is the gate.

- [ ] **Step 1: Generate the key skeleton diff**

Run: `npm run check:messages` — the output lists every `missing:`/`extra:` path in en and es. Work through it namespace by namespace.

- [ ] **Step 2: en.json — replace/add these namespaces**

```json
"nav": { "mcp": "MCP", "content": "Content", "automations": "Automations", "funnels": "Funnels", "support": "Support", "plans": "Plans", "faq": "FAQ", "login": "Login", "startFree": "Start Free", "selectLanguage": "Select language" },
"hero": {
  "title": "All the infrastructure for your content",
  "titleHighlight": "in one place.",
  "subtitle": "Schedule posts, turn comments into leads, build funnels and sell on autopilot — by hand or by asking Claude through MCP.",
  "cta": { "trial": "Start free", "mcp": "See the MCP" },
  "pillars": ["Scheduling", "DM automations", "Funnels & capture", "AI support"],
  "chatDemo": { "agentName": "Your Instagram profile", "status": "Automation on" },
  "conversations": {
    "c1": { "greeting": "Saw you commented CLAUDE on the reel. Following me yet?", "userMessage": "Yes, I am!", "response": "Done 🙌 Your guide is in the button below. Ping me if you need anything." },
    "c2": { "greeting": "Hey! You grabbed the guide yesterday. Got to apply it?", "userMessage": "Not yet, no time 😅", "response": "No worries. In the mentorship I build it with you. Link in the button." },
    "c3": { "greeting": "Hi! I'm the mentorship assistant. How can I help?", "userMessage": "How much is it and when does it start?", "response": "Next cohort opens on the 10th. Want the prices and a reserved seat?" }
  }
},
"whyChoose": {
  "title": "One ecosystem, not five tools",
  "subtitle": "From the scheduled post to the closed sale, each step feeds the next",
  "cards": {
    "content": { "title": "Content", "description": "Schedule reels, carousels and stories and publish without opening the app." },
    "automations": { "title": "Automations", "description": "A comment becomes a DM, a DM becomes a lead. Buttons, follow requirement and message variations." },
    "funnels": { "title": "Funnels", "description": "Capture page, VSL and link page ready in minutes, on your brand's domain." },
    "support": { "title": "Support", "description": "An AI agent replies and qualifies; the CRM follows through to the close." }
  }
},
"mcp": {
  "promptLabel": "or ask Claude:",
  "badge": "MCP",
  "title": "Set everything up by chatting",
  "subtitle": "Connect AutomateFlow to Claude and just ask. No forms, no hours of setup. Prefer doing it by hand? The dashboard is still there.",
  "chat": {
    "user": "Schedule this reel for Thursday at 6pm, create the CLAUDE keyword automation and a name + email capture for the guide.",
    "tools": { "publication": "Reel scheduled for Thursday, 18:00", "automation": "Automation \"CLAUDE\" created and active", "capture": "Capture \"claude-guide\" created" },
    "assistant": "Done. You only need to upload the video through the link I sent. Want a 24h follow-up for whoever grabs the guide?"
  },
  "steps": {
    "title": "Three steps and you're in",
    "s1": { "title": "Generate your token", "description": "In the dashboard, under Integrations → MCP." },
    "s2": { "title": "Paste it into your assistant", "description": "Claude Code, Codex, Cursor, VS Code or any MCP client." },
    "s3": { "title": "Ask", "description": "Schedule, automate, create captures and pages by text." }
  },
  "clientsLabel": "Works with",
  "clients": ["Claude Code", "Codex", "Cursor", "VS Code"],
  "cta": "See the MCP docs"
},
"schedule": {
  "step": "Step 1 · Content",
  "title": "Schedule and forget",
  "subtitle": "Reels, carousels, images and stories on Instagram, with caption, hashtags and first comment. Link an automation to the post before it even goes live.",
  "prompt": "Schedule a reel for Thursday at 6pm with this caption and link it to the CLAUDE automation",
  "calendar": {
    "title": "Publications", "week": "This week",
    "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "posts": { "p1": { "kind": "Reel", "time": "18:00" }, "p2": { "kind": "Carousel", "time": "12:00" }, "p3": { "kind": "Story", "time": "09:00" }, "p4": { "kind": "Reel", "time": "18:00" } }
  },
  "card": { "kind": "Reel", "name": "How I use Claude to schedule", "status": "Scheduled", "when": "Thu · 18:00", "automation": "Automation: CLAUDE", "firstComment": "1st comment: Comment CLAUDE and I'll send you the guide" }
},
"funnel": {
  "step": "Step 3 · Lead",
  "title": "From click to lead",
  "subtitle": "Capture page, VSL funnel and link page, all ready in minutes. The lead lands in the CRM instantly.",
  "prompt": "Create a capture with name, email and phone that sends to my funnel, and add the mentorship link to my bio page",
  "capture": { "label": "Capture", "title": "Grab the free guide", "fields": ["Name", "Email", "WhatsApp"], "button": "I want the guide" },
  "vsl": { "label": "VSL funnel", "title": "How I use Claude to sell every day", "duration": "12:40", "button": "Join the mentorship" },
  "links": { "label": "Link page", "handle": "@99hud", "items": ["Mentorship", "WhatsApp community", "Claude guide"] }
},
"cta": {
  "title": "Ready to stop duct-taping tools together?",
  "subtitle": "Scheduling, automations, funnels, capture and support in one platform — plus an MCP to run it all.",
  "button": "Start free for 7 days",
  "features": ["No credit card", "Cancel anytime", "MCP on every plan"]
},
"metadata": { "title": "AutomateFlow — Infrastructure for content creators", "description": "Schedule posts, turn comments into leads, build funnels and sell on autopilot. Run it all through MCP with Claude or from the dashboard." }
```

`agentsShowcase` (en):

```json
"agentsShowcase": {
  "step": "Step 4 · Support",
  "title": "Nobody goes unanswered",
  "subtitle": "Automatic follow-ups for whoever grabbed the guide, and an AI agent that replies, qualifies and hands over to you when needed.",
  "prompt": "Create a follow-up 24h later for whoever received the guide, offering the mentorship",
  "agents": {
    "multichannel": { "title": "Automatic follow-up", "description": "Time-based sequences (1h to 7 days) on Instagram DM, with link buttons", "multichannelMsg1": "Hey! You grabbed the guide yesterday. Got to apply it?", "multichannelMsg2": "Not yet, no time", "multichannelMsg3": "No worries. In the mentorship I build it with you. Link in the button 👇" },
    "aimodels": { "title": "AI agent on DM and WhatsApp", "description": "Gemini, OpenAI, Anthropic, Llama, Mistral, DeepSeek — your pick", "aimodelsMsg1": "Hi! I'm the mentorship assistant. How can I help?", "aimodelsMsg2": "How much is it and when does it start?", "aimodelsMsg3": "The next cohort opens on the 10th. Want the prices now and a reserved seat?" },
    "integrations": { "title": "Handover to a human", "description": "The agent knows when to stop and calls you, with configurable timezone and delay", "integrationsMsg1": "This one's about payment. I'll get Hudson to answer you, ok?", "integrationsMsg2": "Ok, thanks!", "integrationsMsg3": "Pinged him. He'll reply here within 2 min." },
    "leadcapture": { "title": "Knowledge base", "description": "Train the agent on your material, FAQ and offer rules", "leadcaptureMsg1": "I can answer based on the mentorship material!", "leadcaptureMsg2": "Is there a certificate?", "leadcaptureMsg3": "There is: a certificate once you finish the 6 modules. Want the syllabus?" }
  },
  "automationSection": {
    "step": "Step 2 · Engagement",
    "title": "A comment becomes a conversation",
    "subtitle": "Whoever comments the keyword gets the DM right away, with link buttons. Require a follow, vary the message and auto-reply to the comment.",
    "prompt": "Create an automation: whoever comments CLAUDE gets the guide by DM, only if they follow me",
    "postText": "Comment \"CLAUDE\" and I'll send you the guide!",
    "likes": "likes", "comment1": "claude", "commentReply": "@hudsonbrendon check your DM!", "comment2": "CLAUDE 🙏",
    "dmActive": "Active now", "dmGreeting": "Saw you commented CLAUDE. Following me yet?", "dmText": "Done! Here's your guide:", "dmLinkTitle": "Claude guide", "dmPlaceholder": "Send message..."
  },
  "automations": {
    "commentToDm": { "title": "Comment → DM", "description": "A keyword in the comment triggers the DM with link buttons" },
    "requireFollow": { "title": "Require follow", "description": "Only delivers after the person follows you" },
    "variations": { "title": "Message variations", "description": "Up to 10 texts drawn at random so it doesn't feel like a bot" }
  }
}
```

`crmShowcase` (en) — add/replace only: `"step": "Step 5 · Sale"`, `"title": "Close the sale"`, `"subtitle": "Every capture lead and every conversation becomes a card in the CRM. Kanban, tasks and full history."`, `"prompt": "How many people did the CLAUDE automation reach in the last 7 days?"`.

`pricing.plans` (en): names `Creator` / `Pro` / `Agency`; same prices/credits; descriptions keep the existing en text; features:

```json
["2 social profiles (Instagram + TikTok)", "1 team member", "Unlimited post scheduling", "Unlimited DM automations", "Unlimited funnels, VSLs and pages", "Unlimited lead capture", "MCP access: run everything from your AI assistant", "Unlimited AI agents and knowledge bases", "Full CRM with pipelines and AI lead qualification", "Unlimited WhatsApp Unofficial API connections (R$47.00/month each)"]
```
with `5 social profiles` / `3 team members` for `standard` and `15 social profiles` / `Unlimited team members` for `corporate`. `periods.monthlyCredits`: `"credits per month"`.

`faq.questions` (en), q1–q8:

```json
"q1": { "question": "What is MCP and do I need to code?", "answer": "MCP is the protocol that lets an AI assistant use tools. You generate a token in the dashboard, paste it into Claude (or another client) and start asking in plain language: schedule a post, create an automation, create a capture. No code." },
"q2": { "question": "Which AI assistants does it work with?", "answer": "Claude Code, Codex, Cursor, VS Code and any client that speaks MCP. The endpoint is the same for all: app.automateflow.chat/mcp." },
"q3": { "question": "Can I do everything without MCP?", "answer": "Yes. The dashboard has every screen: publications, automations, captures, funnels, pages, agents and CRM. MCP is a shortcut, not a requirement." },
"q4": { "question": "Is it for me if I only want to schedule posts?", "answer": "Yes. Every plan includes unlimited scheduling of reels, carousels, images and stories on Instagram. The rest of the ecosystem is there when you need it." },
"q5": { "question": "Is there still AI-agent support on WhatsApp?", "answer": "Yes. Agents with Gemini, OpenAI, Anthropic, Llama, Mistral or DeepSeek, a knowledge base, human handover, timezone and reply delay. Channels: WhatsApp (official and unofficial API), Instagram DM and Webchat." },
"q6": { "question": "How does the Instagram comment automation work?", "answer": "You set the keyword. Whoever comments gets a DM with link buttons, optionally only after following you. You can auto-reply to the comment and draw from up to 10 text variations." },
"q7": { "question": "What are the plans?", "answer": "Creator (R$ 247/mo, 2 social profiles, 4,000 credits), Pro (R$ 397/mo, 5 profiles, 12,000 credits) and Agency (R$ 997/mo, 15 profiles, 30,000 credits). All with unlimited scheduling, automations, funnels, capture, MCP, agents and CRM." },
"q8": { "question": "How does the free trial work?", "answer": "7 days with every feature, no credit card. Cancel anytime." }
```

`footer.description` (en): `"Infrastructure for content creators and infoproducers: scheduling, automations, funnels and AI support — all operable through MCP."`

- [ ] **Step 3: es.json — same namespaces**

```json
"nav": { "mcp": "MCP", "content": "Contenido", "automations": "Automatizaciones", "funnels": "Embudos", "support": "Atención", "plans": "Planes", "faq": "FAQ", "login": "Iniciar sesión", "startFree": "Empieza gratis", "selectLanguage": "Selecciona el idioma" },
"hero": {
  "title": "Toda la infraestructura de tu contenido",
  "titleHighlight": "en un solo lugar.",
  "subtitle": "Programa posts, convierte comentarios en leads, arma embudos y vende en automático — a mano o pidiéndoselo a Claude vía MCP.",
  "cta": { "trial": "Empieza gratis", "mcp": "Ver el MCP" },
  "pillars": ["Programación", "Automatizaciones de DM", "Embudos y captura", "Atención con IA"],
  "chatDemo": { "agentName": "Tu perfil de Instagram", "status": "Automatización activa" },
  "conversations": {
    "c1": { "greeting": "Vi que comentaste CLAUDE en el reel. ¿Ya me sigues?", "userMessage": "¡Sí, te sigo!", "response": "Listo 🙌 Tu guía está en el botón de abajo. Cualquier duda, escríbeme." },
    "c2": { "greeting": "¡Hola! Ayer tomaste la guía. ¿Pudiste aplicarla?", "userMessage": "Todavía no, sin tiempo 😅", "response": "Tranquilo. En la mentoría lo armo contigo. Link en el botón." },
    "c3": { "greeting": "¡Hola! Soy el asistente de la mentoría. ¿En qué te ayudo?", "userMessage": "¿Cuánto cuesta y cuándo empieza?", "response": "El próximo grupo abre el día 10. ¿Te paso los valores y te reservo el cupo?" }
  }
},
"whyChoose": {
  "title": "Un ecosistema, no cinco herramientas",
  "subtitle": "Del post programado a la venta cerrada, cada etapa alimenta la siguiente",
  "cards": {
    "content": { "title": "Contenido", "description": "Programa reels, carruseles e historias y publica sin abrir la app." },
    "automations": { "title": "Automatizaciones", "description": "El comentario se vuelve DM, el DM se vuelve lead. Con botones, exigencia de follow y variaciones de mensaje." },
    "funnels": { "title": "Embudos", "description": "Captura, VSL y página de links listos en minutos, en el dominio de tu marca." },
    "support": { "title": "Atención", "description": "Un agente de IA responde y califica; el CRM acompaña hasta cerrar." }
  }
},
"mcp": {
  "promptLabel": "o pídeselo a Claude:",
  "badge": "MCP",
  "title": "Configura todo conversando",
  "subtitle": "Conecta AutomateFlow a Claude y pídelo en tu idioma. Sin formularios, sin horas de configuración. ¿Prefieres hacerlo a mano? El panel sigue ahí.",
  "chat": {
    "user": "Programa este reel para el jueves a las 18h, crea la automatización de la palabra CLAUDE y una captura con nombre y e-mail para el material.",
    "tools": { "publication": "Reel programado para el jueves, 18:00", "automation": "Automatización \"CLAUDE\" creada y activa", "capture": "Captura \"guia-claude\" creada" },
    "assistant": "Hecho. Solo falta subir el video por el link que te envié. ¿Quieres que cree un follow-up de 24h para quien tome el material?"
  },
  "steps": {
    "title": "Tres pasos y listo",
    "s1": { "title": "Genera tu token", "description": "En el panel, en Integraciones → MCP." },
    "s2": { "title": "Pégalo en tu asistente", "description": "Claude Code, Codex, Cursor, VS Code o cualquier cliente MCP." },
    "s3": { "title": "Pide", "description": "Programa, automatiza, crea capturas y páginas por texto." }
  },
  "clientsLabel": "Funciona con",
  "clients": ["Claude Code", "Codex", "Cursor", "VS Code"],
  "cta": "Ver documentación del MCP"
},
"schedule": {
  "step": "Paso 1 · Contenido",
  "title": "Programa y olvídate",
  "subtitle": "Reels, carruseles, imágenes e historias en Instagram, con caption, hashtags y primer comentario. Vincula una automatización al post antes de publicarlo.",
  "prompt": "Programa un reel para el jueves a las 18h con este caption y vincúlalo a la automatización CLAUDE",
  "calendar": {
    "title": "Publicaciones", "week": "Esta semana",
    "days": ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    "posts": { "p1": { "kind": "Reel", "time": "18:00" }, "p2": { "kind": "Carrusel", "time": "12:00" }, "p3": { "kind": "Historia", "time": "09:00" }, "p4": { "kind": "Reel", "time": "18:00" } }
  },
  "card": { "kind": "Reel", "name": "Cómo uso Claude para programar", "status": "Programado", "when": "Jue · 18:00", "automation": "Automatización: CLAUDE", "firstComment": "1er comentario: Comenta CLAUDE y te mando la guía" }
},
"funnel": {
  "step": "Paso 3 · Lead",
  "title": "Del clic al lead",
  "subtitle": "Página de captura, embudo con VSL y página de links, todos listos en minutos. El lead entra al CRM al instante.",
  "prompt": "Crea una captura con nombre, e-mail y teléfono que envíe a mi embudo, y pon el link de la mentoría en mi página de bio",
  "capture": { "label": "Captura", "title": "Llévate la guía gratis", "fields": ["Nombre", "E-mail", "WhatsApp"], "button": "Quiero la guía" },
  "vsl": { "label": "Embudo VSL", "title": "Cómo uso Claude para vender todos los días", "duration": "12:40", "button": "Quiero entrar a la mentoría" },
  "links": { "label": "Página de links", "handle": "@99hud", "items": ["Mentoría", "Comunidad en WhatsApp", "Guía de Claude"] }
},
"cta": {
  "title": "¿Listo para dejar de pegar herramientas con cinta?",
  "subtitle": "Programación, automatizaciones, embudos, captura y atención en una sola plataforma — y un MCP para operarlo todo.",
  "button": "Empieza gratis por 7 días",
  "features": ["Sin tarjeta de crédito", "Cancela cuando quieras", "MCP en todos los planes"]
},
"metadata": { "title": "AutomateFlow — Infraestructura para creadores de contenido", "description": "Programa posts, convierte comentarios en leads, arma embudos y vende en automático. Todo operable vía MCP con Claude o desde el panel." }
```

`agentsShowcase` (es):

```json
"agentsShowcase": {
  "step": "Paso 4 · Atención",
  "title": "Nadie se queda sin respuesta",
  "subtitle": "Follow-ups automáticos para quien tomó el material y un agente de IA que responde, califica y te transfiere cuando hace falta.",
  "prompt": "Crea un follow-up 24h después para quien recibió el material, ofreciendo la mentoría",
  "agents": {
    "multichannel": { "title": "Follow-up automático", "description": "Secuencias por tiempo (1h a 7 días) en Instagram DM, con botones de link", "multichannelMsg1": "¡Hola! Ayer tomaste la guía. ¿Pudiste aplicarla?", "multichannelMsg2": "Todavía no, sin tiempo", "multichannelMsg3": "Tranquilo. En la mentoría lo armo contigo. Link en el botón 👇" },
    "aimodels": { "title": "Agente de IA en DM y WhatsApp", "description": "Gemini, OpenAI, Anthropic, Llama, Mistral, DeepSeek — tú eliges", "aimodelsMsg1": "¡Hola! Soy el asistente de la mentoría. ¿En qué te ayudo?", "aimodelsMsg2": "¿Cuánto cuesta y cuándo empieza?", "aimodelsMsg3": "El próximo grupo abre el día 10. ¿Te paso los valores ahora y te reservo el cupo?" },
    "integrations": { "title": "Transferencia a humano", "description": "El agente sabe cuándo parar y te llama, con zona horaria y retraso configurables", "integrationsMsg1": "Esta duda es sobre el pago. Voy a llamar a Hudson para que te responda, ¿ok?", "integrationsMsg2": "Ok, ¡gracias!", "integrationsMsg3": "Ya le avisé. Te responde en hasta 2 min por aquí mismo." },
    "leadcapture": { "title": "Base de conocimiento", "description": "Entrena al agente con tu material, FAQ y reglas de tu oferta", "leadcaptureMsg1": "¡Puedo responder con base en el material de la mentoría!", "leadcaptureMsg2": "¿Tiene certificado?", "leadcaptureMsg3": "Sí: certificado al terminar los 6 módulos. ¿Te mando el programa?" }
  },
  "automationSection": {
    "step": "Paso 2 · Engagement",
    "title": "El comentario se vuelve conversación",
    "subtitle": "Quien comenta la palabra clave recibe el DM al instante, con botones de link. Exige follow, varía el mensaje y responde el comentario automáticamente.",
    "prompt": "Crea una automatización: quien comente CLAUDE recibe el material por DM, solo si me sigue",
    "postText": "¡Comenta \"CLAUDE\" y te mando la guía!",
    "likes": "me gusta", "comment1": "claude", "commentReply": "@hudsonbrendon ¡revisa tu DM!", "comment2": "CLAUDE 🙏",
    "dmActive": "Activo ahora", "dmGreeting": "Vi que comentaste CLAUDE. ¿Ya me sigues?", "dmText": "¡Listo! Tu guía está aquí:", "dmLinkTitle": "Guía de Claude", "dmPlaceholder": "Enviar mensaje..."
  },
  "automations": {
    "commentToDm": { "title": "Comentario → DM", "description": "Una palabra clave en el comentario dispara el DM con botones de link" },
    "requireFollow": { "title": "Exigir follow", "description": "Solo entrega después de que la persona te siga" },
    "variations": { "title": "Variaciones de mensaje", "description": "Hasta 10 textos sorteados para no parecer un bot" }
  }
}
```

`crmShowcase` (es) — add/replace only: `"step": "Paso 5 · Venta"`, `"title": "Cierra la venta"`, `"subtitle": "Cada lead de la captura y cada conversación se vuelven una tarjeta en el CRM. Kanban, tareas e historial completo."`, `"prompt": "¿A cuántas personas llegó la automatización CLAUDE en los últimos 7 días?"`.

`pricing.plans` (es): names `Creator` / `Pro` / `Agency`; features:

```json
["2 perfiles sociales (Instagram + TikTok)", "1 miembro del equipo", "Programación de posts ilimitada", "Automatizaciones de DM ilimitadas", "Embudos, VSLs y páginas ilimitados", "Captura de leads ilimitada", "Acceso MCP: opera todo desde tu asistente de IA", "Agentes de IA y bases de conocimiento ilimitados", "CRM completo con pipelines y calificación de leads por IA", "Conexiones API No Oficial de WhatsApp ilimitadas (R$47,00/mes cada una)"]
```
with `5 perfiles sociales` / `3 miembros del equipo` for `standard` and `15 perfiles sociales` / `Miembros del equipo ilimitados` for `corporate`. `periods.monthlyCredits`: `"créditos por mes"`.

`faq.questions` (es), q1–q8:

```json
"q1": { "question": "¿Qué es MCP y necesito saber programar?", "answer": "MCP es el protocolo que le permite a un asistente de IA usar herramientas. Generas un token en el panel, lo pegas en Claude (u otro cliente) y empiezas a pedir en tu idioma: programar post, crear automatización, crear captura. Nada de código." },
"q2": { "question": "¿Con qué asistentes de IA funciona?", "answer": "Claude Code, Codex, Cursor, VS Code y cualquier cliente que hable MCP. El endpoint es el mismo para todos: app.automateflow.chat/mcp." },
"q3": { "question": "¿Puedo hacer todo sin MCP?", "answer": "Sí. El panel tiene todas las pantallas: publicaciones, automatizaciones, capturas, embudos, páginas, agentes y CRM. El MCP es un atajo, no una exigencia." },
"q4": { "question": "¿Sirve si solo quiero programar posts?", "answer": "Sí. Todos los planes tienen programación ilimitada de reels, carruseles, imágenes e historias en Instagram. El resto del ecosistema queda disponible cuando lo necesites." },
"q5": { "question": "¿Sigue habiendo atención con agente de IA en WhatsApp?", "answer": "Sí. Agentes con Gemini, OpenAI, Anthropic, Llama, Mistral o DeepSeek, base de conocimiento, transferencia a humano, zona horaria y retraso de respuesta. Canales: WhatsApp (API oficial y no oficial), Instagram DM y Webchat." },
"q6": { "question": "¿Cómo funciona la automatización de comentarios en Instagram?", "answer": "Defines la palabra clave. Quien comenta recibe un DM con botones de link, opcionalmente solo después de seguirte. Puedes responder el comentario automáticamente y sortear hasta 10 variaciones de texto." },
"q7": { "question": "¿Cuáles son los planes?", "answer": "Creator (R$ 247/mes, 2 perfiles sociales, 4.000 créditos), Pro (R$ 397/mes, 5 perfiles, 12.000 créditos) y Agency (R$ 997/mes, 15 perfiles, 30.000 créditos). Todos con programación, automatizaciones, embudos, captura, MCP, agentes y CRM ilimitados." },
"q8": { "question": "¿Cómo funciona la prueba gratis?", "answer": "7 días con todas las funcionalidades, sin tarjeta de crédito. Cancela cuando quieras." }
```

`footer.description` (es): `"Infraestructura para creadores de contenido e infoproductores: programación, automatizaciones, embudos y atención con IA — todo operable vía MCP."`

- [ ] **Step 4: If Task 9 changed pt wording**, mirror the meaning in en/es for the same keys (key names never change in Task 9).

- [ ] **Step 5: Verify parity and build**

Run: `npm run check:messages` → `messages: pt/en/es keys match`.
Run: `npm run build` → succeeds.

- [ ] **Step 6: Commit**

```bash
git add messages/en.json messages/es.json
git commit -m "feat(i18n): translate creator-infrastructure copy to English and Spanish

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 11: Visual verification in the browser

**Files:** none (fixes found here go into the owning component, in this task, with their own commit).

- [ ] **Step 1: Start the app**

Run: `npm run build && npm run start` (production build; port 3000).

- [ ] **Step 2: Desktop pass (1440px)** — with `browser-harness` or `claude-in-chrome`:

For each of `/pt`, `/en`, `/es`:
- Screenshot the full page; confirm section order Hero → WhyChoose → MCP → Schedule → Automation → Funnel → Agents → CRM → Pricing → FAQ → CTA → Footer.
- Click each of the 7 nav links; confirm `window.location.hash` and that the target section's top is within the viewport (`document.getElementById(id).getBoundingClientRect().top < 120`).
- Confirm `document.title` equals that locale's `metadata.title`.
- Confirm no console errors (`read_console_messages` with pattern `error|Missing message`).
- Confirm every signup CTA (`hero`, `pricing` ×3, `cta`) links to `https://app.automateflow.chat/accounts/signup/` and the MCP CTA to `https://app.automateflow.chat/mcp/`.

- [ ] **Step 3: Mobile pass (390px)**

Resize to 390×844 and for `/pt` only:
- `document.documentElement.scrollWidth === window.innerWidth` → true (no horizontal scroll).
- Screenshot `#mcp`, `#schedule`, `#funnel` (funnel arrows point down, screens stacked).
- Open the hamburger menu; 7 links visible.

- [ ] **Step 4: Reduced motion**

In DevTools → Rendering → emulate `prefers-reduced-motion: reduce`; reload `/pt#mcp`: all bubbles/tool lines visible immediately, hero typing dots static.

- [ ] **Step 5: Dark theme**

Toggle the header theme button; screenshot `#mcp` and `#schedule` — text readable, cards use `--card-bg`.

- [ ] **Step 6: Record and commit any fixes**

Fix issues in the owning component, re-run the affected check, then:

```bash
git add -A
git commit -m "fix: visual polish from browser verification

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Report the screenshot paths and the console check result in the task summary.
