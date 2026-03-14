# CASSA RELIEF — KI-gestützte E-AKTE für die Grundsicherung

**Compliance-Assured Structured Semantic Analysis** — KI-gestützte Dokumentenklassifikation, Aktenpflege und Prozessmodellierung für die **gemeinsamen Einrichtungen (gE)** nach SGB II.

> **[▶ Live-Demo öffnen](https://ma3u.github.io/cassa-relief/)**

![SGB II](https://img.shields.io/badge/SGB_II-Grundsicherung-blue) ![BPMN](https://img.shields.io/badge/BPMN-2.0_konform-green) ![DSGVO](https://img.shields.io/badge/DSGVO-konform-orange) ![AI](https://img.shields.io/badge/KI-lokal_%2B_DSGVO-brightgreen)

---

## Was ist CASSA RELIEF?

**Gemeinsame Einrichtungen (gE)** sind die lokalen Jobcenter, in denen Bundesagentur für Arbeit und kommunale Träger gemeinsam die Grundsicherung für Arbeitsuchende nach SGB II umsetzen. Täglich bearbeiten Fachkräfte Anträge, Veränderungsmitteilungen und endgültige Festsetzungen auf Basis umfangreicher Fallakten.

**Das Problem:** Dokumente gelangen unstrukturiert in die E-AKTE — falsch klassifiziert, ohne Metadaten, in falscher Reihenfolge, mit ungeschwärzten Datenschutzdaten. Die manuelle Aktenerschließung bindet erhebliche Arbeitszeit, die für die eigentliche Leistungsbemessung fehlt.

**RELIEF löst das** durch KI-gestützte Dokumentenverarbeitung entlang einer 4-stufigen Pipeline:

| Schritt | Aufgabe | Technologie |
|---------|---------|-------------|
| 1 | **OCR & Parsing** | IBM Granite-Docling-258M — Fotos, Scans, PDFs → strukturierter Text |
| 2 | **Klassifikation** | Dokumententyp, Metadaten, Aktenzuordnung per NLP |
| 3 | **PII-Schwärzung** | GLiNER + Presidio — IBAN, Geburtsdaten, Namen (DSGVO-konform) |
| 4 | **Prozessmodellierung** | BPMN 2.0 + DMN — Rechtsregeln maschinenlesbar, prüfbar, deploybar |

### Demo-Fall: Familie Becker (BG-Nr. 412K-078263-B)

Fünfköpfige Bedarfsgemeinschaft, 47 eingereichte Dokumente, 6 Rechtsprüfpunkte (§§ 7, 9, 11, 11b, 12 SGB II, vorläufige Entscheidung §41a SGB II). RELIEF klassifiziert alle Dokumente automatisch und erstellt prüfbare BPMN-Modelle für jeden Berechnungsschritt.

---

## Features

- **KI-Dokumentenklassifikation** — Kontoauszüge, Mietverträge, Lohnabrechnungen automatisch erkannt und sortiert
- **BPMN 2.0-Prozessmodellierung** — Rechtsregeln aus SGB II als ausführbare Diagramme, kompatibel mit Camunda, yEd, BPMN.io
- **DMN-Entscheidungstabellen** — Freibeträge (§11b), Regelbedarfe (§20), KdU (§22) als prüfbare Tabellen
- **PII-Schwärzung** — Automatische Erkennung von Datenschutzdaten (DSGVO Art. 9, §67 SGB X)
- **3D-Knowledge-Graph** — Interaktive Visualisierung der SGB-II-Rechtsstruktur mit GraphRAG
- **Interaktiver BPMN-Viewer** — Prozessdiagramm direkt im Browser bearbeiten und exportieren
- **Vollständig lokal betreibbar** — Keine Cloud-Abhängigkeit, DSGVO-konform
- **Praxisszenarien** — 5 konkrete Anwendungsfälle aus der gE-Praxis

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
| [IBM Granite-Docling-258M](https://github.com/DS4SD/docling) | OCR + Layout | Apache 2.0 |
| [GLiNER-PII-Large](https://huggingface.co/knowledgator/gliner-pii-large-v1.0) | PII-Erkennung | Apache 2.0 |
| [Presidio](https://microsoft.github.io/presidio/) | Schwärzungs-Framework | MIT |
| [spaCy de_core_news_lg](https://spacy.io/models/de) | NER Deutsch | MIT |

---

## Projektstruktur

```text
src/
├── App.tsx                              # Haupt-SPA mit allen Sektionen
├── components/
│   ├── RELIEFKnowledgeGraph3D.tsx       # 3D-Graph SGB II (Grundsicherung)
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
