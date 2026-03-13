# Project Guidelines — CASSA DRV / RELIEF

## Overview
Sopra Steria CASSA landing page with interactive 3D knowledge graph for the **Deutsche Rentenversicherung (DRV)**. All UI text is **German**. Domain: social law (SGB I–XII), DRV processes, GRA-Anweisungen, Chat-API, GraphRAG.

Deployed at: `https://ma3u.github.io/cassa-drv/` (base path `/cassa-drv/`)

**Next project: CASSA RELIEF** — AI-assisted E-AKTE management for SGB II (Grundsicherung für Arbeitsuchende / gemeinsame Einrichtungen). See `RELIEF_DEMO_PLAN.md` for project brief.

## Tech Stack
- **React 19** + **TypeScript 5.7** + **Vite 7** (SWC plugin, `@vitejs/plugin-react-swc`)
- **Tailwind CSS v4** (`@tailwindcss/vite`, oklch color space, `@theme inline`)
- **shadcn/ui** ("new-york" style, `@/components/ui/*`) with 14 Radix UI primitives
- **react-force-graph-3d** ^1.29 + **three.js** ^0.175 + **three-spritetext** ^1.10 for 3D graph
- **framer-motion** ^12.6 for animations
- **d3** ^7.9 (force layout engine used by react-force-graph)
- **@github/spark** platform — **never** remove `sparkPlugin()` or `createIconImportProxy()` from `vite.config.ts`
- **react-error-boundary** ^6.0 wrapping `<App />` in `main.tsx`

## Build & Dev
```sh
npm run dev       # Vite dev server (default port 5000)
npm run build     # tsc -b --noCheck && vite build
npm run lint      # eslint .
npm run preview   # Preview production build
npm run kill      # fuser -k 5000/tcp
npm run optimize  # vite optimize (pre-bundle deps)
```

## CI/CD
- **GitHub Actions**: `.github/workflows/deploy.yml` — Node 22, `npm ci` → `npm run build` → deploy `dist/` to GitHub Pages
- **Dependabot**: `.github/dependabot.yml` — npm daily, devcontainers weekly

## Project Structure

```
├── .github/
│   ├── copilot-instructions.md    # This file
│   ├── dependabot.yml
│   └── workflows/deploy.yml      # GitHub Pages deploy
├── input/                         # Legacy graph source data (hydra/police project)
├── public/audio/
│   └── drv_fall_mueller.mp3       # ElevenLabs narration (Alice voice, current)
├── scripts/                       # Python helper scripts (see below)
├── src/
│   ├── App.tsx                    # Main SPA, all scroll sections + narration
│   ├── ErrorFallback.tsx          # Error boundary fallback UI
│   ├── main.tsx                   # createRoot, ErrorBoundary, CSS imports
│   ├── main.css                   # Tailwind v4 entry, @theme inline, design tokens
│   ├── index.css                  # Custom oklch colors, hero-pattern, network-pattern
│   ├── vite-end.d.ts              # Vite + Spark runtime type declarations
│   ├── components/
│   │   ├── DRVKnowledgeGraph3D.tsx # 3D force-graph — case Fall Müller (EM-Rente)
│   │   ├── DataModelGraph3D.tsx   # 3D schema/ontology graph — DRV meta-model
│   │   └── ui/                    # 45 shadcn/ui components (accordion → tooltip)
│   ├── hooks/
│   │   └── use-mobile.ts          # useIsMobile() — breakpoint 768px
│   ├── lib/
│   │   └── utils.ts               # cn() = twMerge(clsx(...))
│   └── styles/
│       └── theme.css              # Radix color scales, Spark theme vars
├── RELIEF_DEMO_PLAN.md            # CASSA RELIEF project brief (SGB II / E-AKTE)
├── PRD.md                         # Product requirements document
├── check-console.mjs             # Playwright: console error/warning logger
├── test-graph.mjs                # Playwright: headless screenshot + pixel analysis
├── components.json               # shadcn/ui config
├── runtime.config.json           # Spark app ID
├── spark.meta.json               # Spark metadata
├── tailwind.config.js            # Radix color scale integration, spacing
├── vite.config.ts                # base: '/cassa-drv/', plugins, path alias
└── tsconfig.json                 # ES2020, strictNullChecks, bundler resolution
```

## Scripts & Tools

### Python Scripts (`scripts/`)
All scripts use Python 3 and `urllib` (no external deps unless noted). API key from `.env` (`ELEVENLABS_API_KEY`).

| Script | Purpose | Usage |
|--------|---------|-------|
| `generate_drv_narration.py` | Generate DRV narration MP3 — Fall Müller (Alice voice) | `python3 scripts/generate_drv_narration.py` |
| `find_voices.py` | Query ElevenLabs API for voices | `python3 scripts/find_voices.py` |
| `generate_narration.py` | Legacy narration generator (Lucius voice) | `python3 scripts/generate_narration.py` |
| `generate_hydra_voice.py` | Legacy hydra TTS generation | `python3 scripts/generate_hydra_voice.py` |
| `generate_graph_code.py` | Convert enriched JSON → TypeScript `buildCaseData()` code | `python3 scripts/generate_graph_code.py` |

### Playwright Test Scripts (root)
Require `@playwright/test` + Chromium: `npx playwright install chromium`

| Script | Purpose | Usage |
|--------|---------|-------|
| `check-console.mjs` | Launch browser, log console errors/warnings/network failures | `node check-console.mjs` |
| `test-graph.mjs` | Headless screenshot of 3D graph canvas, pixel analysis | `node test-graph.mjs` |

## Architecture

### Single-Page App
- **No router** — one `App.tsx` with scroll-based sections, using `scrollToSection(id)` helper
- **Sections** (in order): Hero → Challenges → Architecture (4-Layer Ontology) → Fall Müller (EM case) → GraphRAG vs Vector RAG → Chat-API → Scenarios → Standards → Graph Detail
- **Narration**: `HTMLAudioElement` playing `public/audio/drv_fall_mueller.mp3` (ElevenLabs "Alice" voice — professional female, multilingual v2)

### State Management
React hooks only (`useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`) — no external state library.

Key state in `App.tsx`:
- `selectedLayer: number | null` — 4-layer architecture highlighting
- `activeScenario: number` — scenario tab selection
- `showIntroGuide: boolean` — intro overlay
- `isPlayingNarration: boolean` — audio toggle

### Path Alias
`@/*` → `./src/*` (configured in both `vite.config.ts` and `tsconfig.json`)

### CSS Import Order
`main.tsx` imports: `main.css` → `theme.css` → `index.css`

## Code Style
- Functional components with named exports for features, default export for `App`
- Section dividers: `// ────────────` with section labels
- Types at file top: `type NodeType = 'suspect' | 'victim' | ...` union pattern
- Node data uses `Record<string, string>` for flexible `details` and optional `timestamp`, `score` fields
- Icons from `lucide-react` — primary icon library in components
- Also available: `@heroicons/react`, `@phosphor-icons/react` (Spark icon proxy)

## Graph Component Conventions

### Two Graph Components
- **`DRVKnowledgeGraph3D`** — case-level graph for Fall Müller (EM-Rente), 65+ nodes / 90+ rels
- **`DataModelGraph3D`** — meta-model / ontology schema graph showing node type hierarchy

### DRV Node Types (15)
`law`, `section`, `component`, `rule`, `process`, `task`, `entity`, `gra`, `standard`, `chatapi`, `case`, `person`, `event`, `period`, `document`

### Schema Node Types (11 in `DataModelGraph3D`)
`law`, `section`, `core_component`, `business_rule`, `process`, `goal`, `task`, `entity`, `gra_instruction`, `standard`, `chatapi`

### Data Architecture
- Each type needs entries in `NODE_COLORS` (hex or oklch) and `NODE_LABELS` (emoji + German label)
- Node data built in `buildCaseData()` or `buildSchemaData()` → returns `{ nodes, links }`
- Links: `{ source, target, type, description? }` — source/target are string node IDs
- Detail panel shows node description + related link descriptions on click

### German Legal Formats (SGB domain)
- Aktenzeichen: `R XXX/XX EM` pattern
- Paragraph references: `§43 SGB VI`, `§56 SGB VI`, `§9 SGB VI i.V.m. §49 SGB IX`
- SGB law references: SGB I, IV, VI, IX, X, XI, XII (full name in German)
- GRA references: `GRA zu §43 SGB VI`
- Addresses anonymised — never use real personal data

## CSS & Theming
- **Tailwind v4** with `@theme inline` in `src/main.css` — all design tokens as CSS custom properties
- **oklch color space** throughout: Deep Navy primary (`oklch(0.25 0.05 250)`), Signal Red accent (`oklch(0.55 0.22 25)`)
- **Dark mode** via `.dark` selector and `@custom-variant dark (&:is(.dark *))`
- **Fonts**: **Space Grotesk** (headings), **Inter** (body) — loaded via Google Fonts in `index.html`
- **Radix color scales**: All scales imported in `src/styles/theme.css` (262 lines)
- **Spark theme vars** in `#spark-app` selector — spacing, radius, neutral/accent mapping but mostly dark/light bg colors
- `tailwind.config.js` (147 lines): extends defaultTheme with Radix CSS variable mappings

## Environment Variables

| Variable | File | Purpose |
|----------|------|---------|
| `ELEVENLABS_API_KEY` | `.env` | ElevenLabs TTS API key (for `scripts/*.py`) |

`.env` is in `.gitignore` — never commit API keys.

## Narration / Audio
- **Always use ElevenLabs** for text-to-speech generation — **never** use the Web Speech API (`SpeechSynthesis`)
- Voice: **Alice** — clear, professional female educator (ElevenLabs voice ID `Xb7hH8MSUJpSbSDYk0k2`)
- Model: `eleven_multilingual_v2`
- API key is read from `.env` (`ELEVENLABS_API_KEY`) — never hardcode it
- Generate script: `python3 scripts/generate_drv_narration.py` → outputs `public/audio/drv_fall_mueller.mp3`
- The **player in `App.tsx` always uses the stored MP3 file** (`HTMLAudioElement` with `${import.meta.env.BASE_URL}audio/drv_fall_mueller.mp3`) — never inline `SpeechSynthesisUtterance`
- When the narration text changes, **regenerate the MP3** by running the generate script before committing

## Security
- Report vulnerabilities via `opensource-security@github.com`, not public issues
- All case data is fictional (Fall Müller) — keep personal data anonymised, use fake Aktenzeichen
- SGB / DSGVO legal references must be accurate when added
- Never commit `.env` or API keys
- ElevenLabs API key is only used by Python scripts at generate time, not at runtime

## Domain Knowledge

### CASSA DRV — 4-Layer Ontology
| Layer | Name | Content |
|-------|------|---------|
| 1 | Normative Schicht | SGB I–XII law hierarchy, EU directives, GRA |
| 2 | Zeitliche Dimension | Transition rules (§235 SGB VI), pension adjustments |
| 3 | Prozedurale Schicht | DRV business processes: Rentenantrag, EM-Prüfung, Reha |
| 4 | Fallbezogener Overlay | Versichertendaten: Entgeltpunkte, Wartezeiten, Bescheide |

### GraphRAG vs Vector RAG
The app demonstrates four concrete failure cases where Vector RAG cannot reliably trace cross-paragraph chains (e.g., §43 → §50 → §53 SGB VI for EM-Rente with Arbeitsunfall). This is the core sales argument for GraphRAG.

### CASSA RELIEF (SGB II — upcoming)
- Domain: Grundsicherung für Arbeitsuchende, gemeinsame Einrichtungen (gE)
- Goal: AI-assisted E-AKTE management — classification, metadata correction, sorting, redaction
- Key document types: Kontoauszüge, Lohnabrechnungen, Mietverträge, Nebenkostenabrechnungen
- See `RELIEF_DEMO_PLAN.md` for full context

## Key Dependencies (34 production, 10 dev)

### Core
`react` ^19, `react-dom` ^19, `react-error-boundary` ^6, `framer-motion` ^12.6

### 3D Visualization
`react-force-graph-3d` ^1.29, `three` ^0.175, `three-spritetext` ^1.10, `d3` ^7.9

### UI Components
14 `@radix-ui/react-*` packages, `class-variance-authority`, `clsx`, `tailwind-merge`, `cmdk`, `vaul`, `sonner`, `embla-carousel-react`, `react-day-picker`, `react-resizable-panels`, `input-otp`

### Icons
`lucide-react` ^0.484, `@heroicons/react` ^2.2, `@phosphor-icons/react` ^2.1

### Data & Forms
`@tanstack/react-query` ^5.83, `react-hook-form` ^7.54, `@hookform/resolvers` ^4.1, `zod` ^3.25, `recharts` ^2.15

### GitHub/Spark
`@github/spark` >=0.43.1, `octokit` ^4.1, `@octokit/core` ^6.1

### Utilities
`date-fns` ^3.6, `marked` ^15.0, `next-themes` ^0.4, `uuid` ^11.1

### Dev
`vite` ^7.2, `tailwindcss` ^4.1, `typescript` ~5.7, `eslint` ^9.28, `@playwright/test` ^1.58

## TypeScript Configuration
- Target: `ES2020`, Module: `ESNext`, Resolution: `bundler`
- `strictNullChecks: true` (but not full `strict` mode)
- `noEmit: true`, `skipLibCheck: true`, `jsx: react-jsx`
- `isolatedModules: true`, `noFallthroughCasesInSwitch: true`

## Vite Configuration
- **Base**: `/cassa-drv/` (subpath deployment)
- **Plugins**: react-swc, tailwindcss, Spark icon proxy, Spark plugin
- **Alias**: `@` → `src/`
- Use `${import.meta.env.BASE_URL}` prefix for all `public/` asset references (audio, images)
- Known build warnings: CSS `@media` Tailwind v4 artifacts (harmless), bundle >500KB (expected for three.js)
