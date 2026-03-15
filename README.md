# CASSA RELIEF — KI als unsichtbarer Helfer für die E-AKTE

**Compliance-Assured Structured Semantic Analysis** — OCR, Volltextindizierung und intelligente Suche für die E-AKTE der **gemeinsamen Einrichtungen (gE)** nach SGB II.

> **[▶ Live-Demo öffnen](https://ma3u.github.io/cassa-relief/)**

![SGB II](https://img.shields.io/badge/SGB_II-Grundsicherung-blue) ![BPMN](https://img.shields.io/badge/BPMN-2.0_konform-green) ![DSGVO](https://img.shields.io/badge/DSGVO-konform-orange) ![AI](https://img.shields.io/badge/KI-lokal_%2B_DSGVO-brightgreen)

---

## Was ist CASSA RELIEF?

**Gemeinsame Einrichtungen (gE)** sind die lokalen Jobcenter, in denen Bundesagentur für Arbeit und kommunale Träger gemeinsam die Grundsicherung für Arbeitsuchende nach SGB II umsetzen. Täglich bearbeiten Fachkräfte Anträge, Veränderungsmitteilungen und endgültige Festsetzungen auf Basis umfangreicher Fallakten.

**Das Problem:** 80% der eingereichten Dokumente sind Fotos oder Scans ohne Volltext — nicht durchsuchbar, nicht verknüpft, nicht auffindbar. Sachbearbeiter:innen müssen jedes Dokument einzeln öffnen und manuell den richtigen Prüfschritt zuordnen.

**RELIEF löst das** als unsichtbarer Helfer im Hintergrund:

| Schritt | Aufgabe | Technologie |
|---------|---------|-------------|
| 1 | **OCR & Parsing** | IBM Granite-Docling-258M — Fotos, Scans, PDFs → durchsuchbarer Volltext |
| 2 | **Volltextindizierung** | Elasticsearch/Meilisearch — alle Dokumente in Millisekunden durchsuchbar |
| 3 | **PII-Schwärzung** | GLiNER + Presidio — IBAN, Geburtsdaten, Namen (DSGVO-konform) |
| 4 | **Kontextbereitstellung** | Knowledge Graph — relevante Dokumente automatisch zum Prüfschritt |

### Demo-Fall: Familie Becker (BG-Nr. 412K-078263-B)

Fünfköpfige Bedarfsgemeinschaft, 47 eingereichte Dokumente, 6 Rechtsprüfpunkte (§§ 7, 9, 11, 11b, 12 SGB II, vorläufige Entscheidung §41a SGB II). RELIEF macht alle Dokumente per OCR durchsuchbar, liefert sie im richtigen Kontext und prüft Vollständigkeit — der Bürger lädt hoch, die KI erschließt im Hintergrund.

---

## Features

- **OCR & Volltextindizierung** — Fotos und Scans werden automatisch in durchsuchbaren Volltext umgewandelt
- **Intelligente Suche** — Sachbearbeiter finden Dokumente nach Inhalt, nicht nach Dateiname oder Klassifikation
- **Kontextbereitstellung** — Relevante Unterlagen werden zum richtigen Zeitpunkt im Prozess bereitgestellt
- **PII-Schwärzung** — Automatische Erkennung von Datenschutzdaten (DSGVO Art. 9, §67 SGB X)
- **Vollständigkeitsprüfung** — KI erkennt fehlende Nachweise und generiert Nachforderungsschreiben
- **3D-Knowledge-Graph** — Interaktive Visualisierung der SGB-II-Rechtsstruktur mit GraphRAG
- **BPMN 2.0-Prozessmodellierung** — Rechtsregeln als ausführbare Diagramme, kompatibel mit Camunda, yEd, BPMN.io
- **Vollständig lokal betreibbar** — Keine Cloud-Abhängigkeit, DSGVO-konform

---

## Tech Stack

| Technologie | Version | Zweck |
|-------------|---------|-------|
| React | 19 | UI-Framework |
| TypeScript | 5.7 | Typsicherheit |
| Vite | 7 | Build-Tool (SWC) |
| Tailwind CSS | 4 | Styling (oklch Farbsystem) |
| shadcn/ui | — | UI-Komponentenbibliothek (Radix UI) |
| react-force-graph-3d | 1.29 | 3D-Knowledge-Graph |
| bpmn-js | — | BPMN 2.0 Viewer/Editor im Browser |
| framer-motion | 12.6 | Animationen |

---

## Schnellstart

```bash
# Repository klonen
git clone https://github.com/ma3u/cassa-relief.git
cd cassa-relief

# Abhängigkeiten installieren
npm ci

# Entwicklungsserver starten
npm run dev
```

Öffne [http://localhost:5000/cassa-relief/](http://localhost:5000/cassa-relief/) im Browser.

## Build & Deploy

```bash
npm run build     # Produktions-Build → dist/
npm run preview   # Vorschau des Builds
npm run lint      # ESLint
```

### GitHub Pages

Das Projekt wird automatisch via GitHub Actions deployed:
- Push auf `main` → Build → Deploy auf GitHub Pages
- URL: `https://ma3u.github.io/cassa-relief/`

---

## BPMN 2.0-Kompatibilität

CASSA exportiert Prozessmodelle im offenen **BPMN 2.0-Standard (OMG)**. Die generierten XML-Dateien sind direkt kompatibel mit:

| Tool | Typ | Einsatz |
|------|-----|---------|
| **Camunda Platform 8** | Engine | Ausführbare Prozesse, Workflow-Automation |
| **BPMN.io** | Web-Editor | Bearbeitung im Browser, kostenlos |
| **yEd Graph Editor** | Desktop-Editor | Professionelles Layout mit Auto-Algorithmen |
| **Signavio / Celonis** | Enterprise | Process Mining, Legacy-Analyse |
| **Drools** | Rules Engine | Komplexe Regelketten, Forward-Chaining |

---

## KI-Modelle (lokal, Open Source)

| Modell | Aufgabe | Lizenz |
|--------|---------|--------|
| [IBM Granite-Docling-258M](https://github.com/DS4SD/docling) | OCR + Layout + Indizierung | Apache 2.0 |
| [GLiNER-PII-Large](https://huggingface.co/knowledgator/gliner-pii-large-v1.0) | PII-Erkennung | Apache 2.0 |
| [Presidio](https://microsoft.github.io/presidio/) | Schwärzungs-Framework | MIT |
| [spaCy de_core_news_lg](https://spacy.io/models/de) | NER Deutsch | MIT |

---

## Projektstruktur

```text
src/
├── App.tsx                              # Haupt-SPA mit allen Sektionen
├── components/
│   ├── RELIEFKnowledgeGraph3D.tsx       # 3D-Graph SGB II (Suche + Kontext)
│   ├── DRVKnowledgeGraph3D.tsx          # 3D-Graph SGB VI (Referenz)
│   ├── DataModelGraph3D.tsx             # Ontologie-Schema
│   └── ui/                             # 45 shadcn/ui-Komponenten
├── hooks/use-mobile.ts                  # Mobile-Breakpoint-Hook
├── lib/utils.ts                         # cn() Utility
├── main.css                             # Tailwind v4, Design-Tokens
├── index.css                            # Farbschema (oklch)
└── styles/theme.css                     # Radix-Farbskalen
```

## Lizenz

[MIT](LICENSE)
