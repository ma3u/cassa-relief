# CASSA Demo Plan — RELIEF

## Projekt RELIEF gE — KI als unsichtbarer Helfer

### Leitprinzip

> **Strategischer Fokus (Expertenfeedback 03/2026):** Weg von „KI klassifiziert beim Upload" hin zu **„KI als unsichtbarer Helfer für Suche und Kontext"**. RELIEF fungiert als **Übersetzer zwischen Bürger und Amt** — der Bürger reicht Nachweise ein, ohne Verwaltungslogik verstehen zu müssen. Die KI erschließt, indiziert und verknüpft im Hintergrund.

### Problemstellung

Die Bearbeitung von Vorgängen (Anträgen, Veränderungsmitteilungen, endgültige Festsetzungen etc.) bei der Grundsicherung für Arbeitsuchende nach dem SGB II durch die gemeinsamen Einrichtungen bedarf einer umfassenden Prüfung der Lebensumstände des Antragstellenden und oftmals weiterer Personen. Basis hierfür sind umfangreiche Formulare sowie zu vielen Sachverhalten einzureichende Nachweise, sowohl in Papierform als auch elektronisch über jobcenter.digital.

Alle anspruchs- und zahlungsbegründenden Unterlagen sind in der E-AKTE abzulegen. Die Kernherausforderung ist dabei nicht die Ablagestruktur, sondern die **Auffindbarkeit und Kontextualisierung** der Dokumente:

- Dokumente werden eingereicht, aber ihre Inhalte sind nicht durchsuchbar (Fotos, Scans)
- Zusammenhänge zwischen Dokumenten und Prüfschritten sind nicht automatisch herstellbar
- Sensible Daten (Gesundheitsdaten, Kontonummern) werden nicht automatisch erkannt
- Fehlende Nachweise fallen erst bei der manuellen Bearbeitung auf — Wochen nach Eingang

### Paradigmenwechsel: Flache Struktur + intelligente Suche

**Alte Denkweise:** Tiefe Ordnerhierarchien, Bürger muss Dokumententyp wählen, Navigation durch Aktenplan.

**Neue Denkweise:** Maximal 2 Ebenen (Kunde → Dokumente). Ein Nachweis ist ein Nachweis. Die KI übernimmt OCR, Indizierung und Volltextsuche im Hintergrund. Dokumente werden nicht durch Navigieren in Ordnern gefunden, sondern durch **intelligente Suche** über den indizierten Volltext.

| Prinzip | Alt | Neu (RELIEF) |
|---------|-----|--------------|
| **Upload** | Bürger wählt Akten-Art, Dokumententyp | Bürger lädt Nachweis hoch — fertig („idiotensicher") |
| **Struktur** | Tiefe Ordnerhierarchie, Aktenplan | Flach: Kunde → Dokumente (max. 2 Ebenen) |
| **Erschließung** | Manuelles Sichten, Klassifizieren, Sortieren | KI: OCR → Indizierung → Volltextsuche |
| **Auffindbarkeit** | Ordner-Navigation, Dokumententyp-Filter | Semantische Suche: „Mietvertrag Becker 2026" |
| **Kontext** | Sachbearbeiterin stellt Zusammenhänge manuell her | KI: Dokument → §§ → Prüfschritt → Person |
| **Bürger** | Muss Verwaltungslogik verstehen | Reicht Nachweis ein, KI übersetzt |

### Ziel

Das Vorhaben RELIEF gE soll die erhebliche Arbeitszeitbindung der Aktenarbeit in den Leistungsbereichen der gE reduzieren. Der Schlüssel ist nicht bessere Ordner, sondern **bessere Suche und automatischer Kontext**. Die KI minimiert den manuellen Aufwand im Amt, indem sie Daten im richtigen Kontext bereitstellt — ohne dass der Bürger die Verwaltungslogik verstehen muss.

Das Vorhaben kann im Erfolgsfall einen wirksamen Beitrag zur Mitigation des demografischen Fachkräftemangels in den gE leisten.

---

## Demo-Fallkonstruktion: Fall Familie Becker — BG-Nr. 412K-078263-B

### Bedarfsgemeinschaft

| Person | Alter | Rolle | Besonderheit |
|--------|-------|-------|-------------|
| Thomas Becker | 45 | Antragsteller, arbeitslos seit 15.01.2026 | Kündigung durch Insolvenz Möbel-Zentrum GmbH, Dortmund |
| Leila Becker geb. Kaya | 37 | Lebensgefährtin, Teilzeit-Reinigungskraft | 850 € brutto/Monat (schwankend), Midijob |
| Sophie Becker | 14 | Tochter (Thomas, 1. Ehe) | Lebt in BG, Mutter zahlt 230 € Unterhalt |
| Can Becker | 6 | Sohn (gemeinsam) | Kita-Kind, Anspruch BuT-Mittagessen |
| Emma Becker | 9 Mo. | Tochter (gemeinsam) | Säugling, Kindergeld |

### Wohn- und Vermögenssituation

- **Wohnung**: 90 m², 4 Zimmer, Dortmund-Hörde, 780 € Kaltmiete + 220 € Nebenkosten = **1.000 € warm**
- **Vermögen Thomas**: Kapital-Lebensversicherung (Rückkaufwert 12.500 €), VW Touran Bj. 2017 (Wert ~8.500 €)

### Hergang

1. **15.01.2026** — Insolvenz Möbel-Zentrum GmbH, Thomas erhält betriebsbedingte Kündigung (keine Sperrzeit, §159 SGB III nicht einschlägig)
2. **03.02.2026** — Bürgergeld-Antrag online über jobcenter.digital
3. **03.02.–24.02.2026** — Familie reicht 47 Dokumente ein (digital, Fotos, Post)
4. **25.02.2026** — Sachbearbeiterin öffnet E-AKTE → Aktenerschließung beginnt

### Rechtliche Prüfpunkte (Komplexität)

| Nr. | Prüfgegenstand | Rechtsnorm | Kommentar |
|-----|---------------|-----------|-----------|
| 1 | BG-Bestimmung | §7 Abs. 3 SGB II | Wer gehört zur BG? Leila = Partnerin, Sophie = Kind in BG (Unterhalt von außen) |
| 2 | Hilfebedürftigkeit | §9 SGB II | Einkommens- und Vermögensprüfung der gesamten BG |
| 3 | Einkommen Leila | §11, §11b SGB II | Schwankendes Einkommen → vorläufige Entscheidung nötig |
| 4 | Unterhalt Sophie | §11 SGB II | 230 € Unterhalt als Einkommen des Kindes anzurechnen |
| 5 | Vermögen Thomas | §12 SGB II | LV 12.500 € (Freibetrag prüfen), Auto 8.500 € (angemessen?) |
| 6 | KdU-Prüfung | §22 SGB II | 1.000 € warm für 5 Personen — kommunale Angemessenheitsgrenze |
| 7 | Regelbedarf BG | §20 SGB II | Regelbedarfsstufen für 5 Personen berechnen |
| 8 | Mehrbedarf | §21 SGB II | Kein Alleinerziehendenmehrbedarf (BG mit Partner) |
| 9 | BuT-Ansprüche | §28 SGB II | Sophie: Schulbedarf; Can: Kita-Mittagessen |
| 10 | Vorläufige Entscheidung | §41a SGB II | Leilas schwankendes Einkommen → vorläufiger Bescheid |
| 11 | Mitwirkungspflicht | §60 SGB I | Fehlende Arbeitgeberbescheinigung → Mitwirkungsanforderung |
| 12 | Fehlende Mitwirkung | §66 SGB I | Fristsetzung, ggf. Versagung bei Nichtreichen |
| 13 | Sperrzeit-Check | §159 SGB III | Prüfergebnis: negativ (Insolvenz = keine eigene Kündigung) |
| 14 | Sozialdatenschutz | §67 SGB X, Art. 9 DSGVO | Arztbrief Sophie = Gesundheitsdaten → nicht in Leistungsakte |

### E-AKTE-Probleme (die 47 eingereichten Dokumente)

**Ausgangspunkt:** Familie Becker lädt 47 Nachweise hoch — ohne Kategorisierung, ohne Sortierung, einfach als Sammlung. RELIEF verarbeitet diese im Hintergrund:

| Nr. | Problem | Betroffenes Dokument | RELIEF-Lösung (unsichtbar im Hintergrund) |
|-----|---------|---------------------|-------------------------------------------|
| 1 | Einzelseiten, nicht chronologisch | 12 Kontoauszüge als Fotos | OCR → Indizierung → per Suche findbar |
| 2 | Einzelseiten ohne Zusammenhang | Mietvertrag (15 Fotoaufnahmen) | OCR erkennt Zusammenhang, indiziert als Einheit |
| 3 | Schwankendes Layout | 3 Lohnabrechnungen Leila | OCR + Volltextindizierung → suchbar |
| 4 | Unvollständig | Nebenkostenabrechnung (2 von 4 Seiten) | KI erkennt fehlende Seiten bei Kontextanalyse |
| 5 | Veraltete Fassung | Kindergeldbescheid | KI-Metadaten-Check bei Kontextbereitstellung |
| 6 | Sensible Daten sichtbar | Unterhaltsurkunde (Kontonummern, Geburtsdaten) | Automatische Schwärzungsvorschläge |
| 7 | Gehört nicht in Akte | Arztbrief Sophie (Gesundheitsdaten!) | KI flaggt bei Kontextanalyse — nicht bei Upload |
| 8 | Fehlt komplett | Arbeitgeberbescheinigung Thomas | KI-Vollständigkeitsprüfung im Bearbeitungskontext |
| 9 | Screenshot statt Dokument | Insolvenzbekanntmachung | OCR verarbeitet auch Screenshots |
| 10 | Nicht suchbar | 3 Dokumente ohne Textinhalt | OCR erzeugt durchsuchbaren Volltext |
| 11 | Keine Beschreibung | Alle 47 Dokumente | KI generiert Kurzbeschreibung für Suchergebnisse |
| 12 | Nur per Ordner-Navigation auffindbar | Dokumente in Eingangsreihenfolge | Volltextsuche statt Ordner-Navigation |

### RELIEF-KI-Kernfunktionen

> **Prinzip: KI arbeitet unsichtbar im Hintergrund** — nicht als Gatekeeper beim Upload, sondern als intelligenter Assistent, der Dokumente erschließt und im richtigen Kontext bereitstellt.

| Funktion | Beschreibung | Wann aktiv? |
|----------|-------------|-------------|
| **OCR & Volltextindizierung** | Fotos, Scans, Screenshots → durchsuchbarer Volltext | Sofort nach Upload (Hintergrund) |
| **Automatische Indizierung** | Datum, Person, Beträge, Adressen extrahiert → Suchindex | Sofort nach OCR (Hintergrund) |
| **Intelligente Suche** | „Mietvertrag Becker" findet den Mietvertrag in 47 Dokumenten | Bei Sachbearbeiter-Anfrage |
| **Kontextbereitstellung** | Bei Prüfschritt X werden automatisch relevante Dokumente angezeigt | Bei Fallbearbeitung |
| **PII-Erkennung & Schwärzung** | IBAN, Geburtsdaten, Gesundheitsdaten erkennen und schwärzen | Hintergrund + bei Prüfung |
| **Vollständigkeitsprüfung** | Fehlende Nachweise im Kontext des aktuellen Prüfschritts melden | Bei Fallbearbeitung |

---

## Gesetzliche und regulatorische Grundlagen

### Sozialgesetzbücher

| Gesetz | Titel | Relevanz für RELIEF |
|--------|-------|---------------------|
| **SGB II** | Grundsicherung für Arbeitsuchende | Primärgesetz: Leistungsberechtigung, Einkommen, Vermögen, KdU, BuT |
| **SGB I** | Allgemeiner Teil | Mitwirkungspflichten (§60), Folgen (§66), Datenschutzgrundsätze |
| **SGB III** | Arbeitsförderung | Sperrzeit (§159), Arbeitslosmeldung, Nahtlosigkeitsregelung |
| **SGB X** | Sozialverwaltungsverfahren | Verwaltungsakte (§31), Sozialdatenschutz (§67ff.), Aufhebung (§45/48) |
| **SGB XII** | Sozialhilfe | Subsidiarität, Abgrenzung zu SGB II |

### Datenschutz & IT-Sicherheit

| Standard | Relevanz |
|----------|----------|
| **DSGVO** (EU 2016/679) | Verarbeitung personenbezogener Daten, Art. 6 Rechtmäßigkeit, Art. 9 besondere Kategorien |
| **BSI IT-Grundschutz** | IT-Sicherheit der Jobcenter-Systeme, KRITIS-Einstufung |
| **BSI TR-RESISCAN** | Technische Richtlinie für ersetzendes Scannen — Beweiswert gescannter Dokumente |
| **BSI TR-ESOR** | Beweiswerterhaltung kryptographisch signierter Dokumente |

### E-AKTE & Records Management

| Standard | Relevanz |
|----------|----------|
| **xdomea 3.0** | Standard für den Austausch von Schriftgutobjekten zwischen Verwaltungssystemen |
| **ISO 15489** | Records Management — Aktenführung, Klassifikation, Aufbewahrung |
| **DIN 31647** | Beweiswerterhaltung — kryptographische Langzeitsicherung |

---

## Knowledge Graph — Knotentypen

> Der Knowledge Graph dient nicht der Ordner-Navigation, sondern der **Kontextualisierung**: Wenn die Sachbearbeiterin einen Prüfschritt bearbeitet, liefert der Graph automatisch alle relevanten Dokumente, §§ und KI-Ergebnisse.

| Typ | Emoji | Beschreibung | Anzahl (Demo) |
|-----|-------|-------------|---------------|
| `law` | 📘 | Gesetze (SGB II, SGB I, SGB X, DSGVO) | 5 |
| `section` | 📄 | Paragraphen (§7, §9, §11, §12, §20, §22, §28, §41a, …) | 18 |
| `process` | 🔄 | Geschäftsprozesse (Antragsaufnahme, BG-Prüfung, KdU-Prüfung, …) | 7 |
| `person` | 👤 | Personen in der Bedarfsgemeinschaft | 5 |
| `case` | 📁 | Fallknoten (BG-Antrag Familie Becker) | 1 |
| `document` | 📝 | Dokumenttypen (Kontoauszug, Mietvertrag, Lohnabrechnung, …) | 12 |
| `entity` | 🏛️ | Fachliche Entitäten (Bedarfsgemeinschaft, Einkommen, Vermögen, …) | 8 |
| `ai` | 🤖 | KI-Fähigkeiten (OCR, Indizierung, Suche, Schwärzung, Kontext) | 6 |
| `standard` | 🛡️ | Standards (TR-RESISCAN, xdomea, ISO 15489, BSI) | 5 |
| `risk` | ⚠️ | Aktenprobleme (Nicht suchbar, fehlende Indizierung, …) | 6 |
| `event` | ⚡ | Ereignisse (Insolvenz, Antragstellung) | 2 |
| **Gesamt** | | | **75** |

---

## Narration (Audio)

Die Erzählung beschreibt den Fall Familie Becker aus der Perspektive einer Sachbearbeiterin im Jobcenter. Sie erklärt:

1. Die Ausgangssituation (Insolvenz, Bürgergeld-Antrag)
2. Den vereinfachten Upload: Familie reicht Nachweise ein — ohne Kategorisierung
3. Wie RELIEF im Hintergrund arbeitet: OCR, Indizierung, Volltexterschließung
4. Wie die Sachbearbeiterin per Suche sofort das richtige Dokument findet
5. Wie der Knowledge Graph automatisch den Kontext liefert (§§ → Dokument → Person)
6. Die automatische Erkennung sensibler Daten und fehlender Nachweise

Voice: **Alice** (ElevenLabs, professional female educator, multilingual v2)

---

## Umsetzungsdetails — Technologie-Stack (2025/2026)

> **Technologie-Fokus: OCR und Indizierung sind die Schlüsseltechnologien.** Die Demo zeigt, dass man Dokumente durch intelligente KI-Suche findet, nicht durch Navigieren in Ordnern. Der Upload ist „idiotensicher" — ein Nachweis ist ein Nachweis, keine Kategorisierung durch den Bürger.

Bezogen auf den konkreten CASSA RELIEF Use Case — 47 Dokumente (Fotos, Scans, Screenshots) mit IBAN-Nummern, Geburtsdaten, Gesundheitsdaten — ergibt sich folgende Tool-Empfehlung. Der gesamte Stack läuft lokal auf Kubernetes ohne Cloud-Abhängigkeit — eine zentrale Anforderung für §67 SGB X (Sozialdatenschutz) und BSI IT-Grundschutz im Jobcenter-Kontext.

### Phase 1: OCR & Volltextindizierung (Kernstück)

#### [IBM Granite-Docling-258M](https://github.com/DS4SD/docling) (Sep 2025, Apache 2.0)

Der aktuell beste Open-Source-Ansatz für den RELIEF-Use Case. Das Modell ist mit nur **258M Parametern** speziell für Dokumentenkonvertierung trainiert — nicht auf einen allgemeinen LLM adaptiert. Es liefert **DocTags**, die Layout, Tabellenstruktur, Formeln und Code vollständig erhalten, und übertrifft dabei deutlich größere Systeme in Benchmarks. Für RELIEF zentral: Es verarbeitet sowohl digitale PDFs (ohne OCR-Overhead) als auch **Fotos und Screenshots** (mit integrierter Vision) — also genau die Qualitätsprobleme #1–#4 aus dem Demo-Fall.

Granite-Docling ist die **VLM-Komponente** des [Docling-Frameworks](https://github.com/DS4SD/docling). Beide werden zusammen als Pipeline betrieben:

```python
from docling.document_converter import DocumentConverter

converter = DocumentConverter()
result = converter.convert("kontoauszug_foto.jpg")  # Foto, PDF, Screenshot
markdown = result.document.export_to_markdown()
```

#### Docling-Extras: [RapidOCR](https://github.com/RapidAI/RapidOCR) & [Azure AI Document Intelligence](https://azure.microsoft.com/de-de/products/ai-services/ai-document-intelligence)

Für schwierige handschriftliche oder qualitätsarme Scans (Demo-Fall #9: Screenshot als Insolvenzbekanntmachung) lässt sich Docling mit **[RapidOCR](https://github.com/RapidAI/RapidOCR)** als Alternative zu [Tesseract](https://github.com/tesseract-ocr/tesseract) konfigurieren. Für Formulare mit strukturierten Key-Value-Paaren (Lohnabrechnungen, Mietverträge) kann **[Azure AI Document Intelligence](https://azure.microsoft.com/de-de/products/ai-services/ai-document-intelligence)** als Docling-Backend eingebunden werden.

### Phase 2: Schwärzung (PII-Erkennung & Redaktion)

#### [GLiNER-PII](https://huggingface.co/knowledgator/gliner-pii-large-v1.0) (Knowledgator, Zero-Shot NER)

Das entscheidende Modell für RELIEF. [`knowledgator/gliner-pii-large-v1.0`](https://huggingface.co/knowledgator/gliner-pii-large-v1.0) ist ein Zero-Shot-NER-Modell, das **explizit `iban` als Label unterstützt** — für die Kontonummern in der Unterhaltsurkunde (Demo-Fall #6):

| Kategorie | Unterstützte Labels (für RELIEF relevant) |
|---|---|
| Personen | `person`, `username` |
| Kontakt | `address`, `phone_number`, `email` |
| Behörden-IDs | `tax_id`, `social_security_number` |
| **Finanzdaten** | **`iban`**, `bank_account`, `credit_card_number` |
| **Gesundheit** | **`medical_record_number`**, `health_insurance_id` |
| Datum | `date_of_birth` |

Der Schlüsselvorteil gegenüber regelbasiertem Pattern-Matching: GLiNER erkennt IBAN auch dann, wenn sie nicht standardformatiert oder mit Leerzeichen erscheinen (häufig bei abfotografierten Kontoauszügen).

#### [Microsoft Presidio](https://microsoft.github.io/presidio/) + GLiNER als Custom Recognizer

Die empfohlene Architektur kombiniert **[Presidio Analyzer](https://microsoft.github.io/presidio/analyzer/)** (Framework) mit **[GLiNER](https://huggingface.co/knowledgator/gliner-pii-large-v1.0)** als NER-Backend. Presidio übernimmt dabei Regex-Validierung (Checksummen für IBAN, Steuernummern) als zweite Schicht:

```python
from presidio_analyzer import AnalyzerEngine
from presidio_analyzer.nlp_engine import NlpEngineProvider
from gliner import GLiNER

# GLiNER als NER-Backend für Presidio
gliner_model = GLiNER.from_pretrained("knowledgator/gliner-pii-large-v1.0")

# Custom Recognizer für deutsche Verwaltungsdokumente
labels = ["person", "iban", "date_of_birth", "address",
          "medical_record_number", "tax_id", "phone_number"]
```

Presidio Anonymizer übernimmt dann die eigentliche Schwärzung mit wählbaren Operatoren: **Replace** (→ `[IBAN]`), **Mask** (→ `DE**...****1234`), **Redact** (→ schwarzes Rechteck im PDF).

#### [spaCy](https://spacy.io/) [`de_core_news_lg`](https://spacy.io/models/de#de_core_news_lg) für deutsche Eigennamen

Für Personennamen (Thomas Becker, Leila Kaya) in deutschen Verwaltungstexten liefert `de_core_news_lg` solide Ergebnisse bei LOC- und PER-Entitäten. Das Transformer-Modell `de_dep_news_trf` ist präziser, aber ressourcenintensiver — bei RELIEF empfiehlt sich `de_core_news_lg` als performanter Basis-NER in Presidio, ergänzt durch GLiNER für strukturierte PII.

### Empfohlene RELIEF-Pipeline (vollständig lokal, DSGVO-konform)

> **Kernidee:** Upload → OCR → Indizierung → Suche. Die KI arbeitet unsichtbar im Hintergrund. Kein Klassifizierungszwang für den Bürger.

```text
Eingang (Foto/Scan/PDF/Screenshot)
  — Bürger lädt Nachweis hoch, keine Kategorisierung nötig —
        ↓
[Granite-Docling-258M]  → Volltext (Layout-erhalten)
        ↓
[Volltextindex]         → Durchsuchbar in Millisekunden
        ↓                   (Elasticsearch / Meilisearch)
[Presidio Analyzer]
   ├─ GLiNER-PII-Large  → IBAN, Geburtsdatum, Gesundheitsdaten
   ├─ spaCy de_core_news_lg  → Namen, Orte
   └─ Regex-Recognizer  → Deutsche Steuernummer, KV-Nr., Aktenzeichen
        ↓
[Presidio Anonymizer]   → Schwärzungsvorschläge (nicht automatisch angewendet)
        ↓
[LLM (Llama 3 / Granite)] → Kurzbeschreibung für Suchergebnisse
        ↓
[Neo4j Knowledge Graph] → Kontext: Dokument ↔ §§ ↔ Prüfschritt ↔ Person
        ↓
Sachbearbeiterin sucht: „Mietvertrag Becker" → sofort gefunden
```

### Modellvergleich für RELIEF

| Modell/Tool | Aufgabe | Stärke im RELIEF-Kontext | Lizenz |
|---|---|---|---|
| **[Granite-Docling-258M](https://github.com/DS4SD/docling)** | OCR + Layout | Fotos, Screenshots, Scans → strukturierter Text | Apache 2.0 |
| **[GLiNER-PII-Large](https://huggingface.co/knowledgator/gliner-pii-large-v1.0)** | NER/PII | IBAN, Geburtsdatum, Zero-Shot | Apache 2.0 |
| **[Presidio](https://microsoft.github.io/presidio/)** | Redaktions-Framework | Modularer Stack, Docker-ready | MIT |
| **[spaCy `de_core_news_lg`](https://spacy.io/models/de#de_core_news_lg)** | NER Deutsch | Deutsche Eigennamen (PER, LOC) | MIT |
| **[Tesseract](https://github.com/tesseract-ocr/tesseract)/[RapidOCR](https://github.com/RapidAI/RapidOCR)** | OCR Fallback | Schlechte Bildqualität | Apache 2.0 |
| **[Llama 3](https://llama.meta.com/) (lokal via [Ollama](https://ollama.com/))** | Freitextgenerierung | Dokument-Summarization auf Deutsch | Meta LLAMA |
| **[Gemini 3 Flash](https://ai.google.dev/gemini-api/docs/image-understanding)** | Bild- & Dokumentenanalyse | Cloud-Benchmark für OCR, Segmentierung, Structured Output | Proprietär (API) |
| **[Imagen 4](https://ai.google.dev/gemini-api/docs/imagen) / [Nano Banana](https://ai.google.dev/gemini-api/docs/image-generation)** | Bildgenerierung & -bearbeitung | Redaktion via Inpainting, bis 4K Auflösung | Proprietär (API) |
| **[Neo4j](https://neo4j.com/)** | Knowledge Graph | Compliance-Traversierung, GraphRAG | Community (GPLv3) |

### Cloud-Alternative: Google Gemini / Vertex AI (Stand März 2026)

Als **Benchmark und optionale Cloud-Alternative** (bei Freigabe durch den Datenschutzbeauftragten) bietet **Google Gemini 3** auf [Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/image/overview) aktuell die leistungsstärksten multimodalen Fähigkeiten für Dokumenten- und Bildverarbeitung:

#### [Gemini — Dokumentenverständnis](https://ai.google.dev/gemini-api/docs/document-processing)

- **Native PDF-Vision**: Versteht PDFs bis 1.000 Seiten mit Layout, Tabellen, Diagramme und Bilder — kein externes OCR nötig
- **Structured Output**: Extrahiert Informationen direkt als JSON (z.B. Mietvertragsdaten, Lohnabrechnung-Positionen)
- **Gemini 3 Media Resolution**: Granulare Kontrolle über Bildauflösung pro Seite (low/medium/high) — optimal für gemischte Dokumentenqualität
- Modell: `gemini-3-flash-preview` (schnell) oder `gemini-3-pro` (präziser)

#### [Gemini — Bildanalyse & Segmentierung](https://ai.google.dev/gemini-api/docs/image-understanding)

- **Object Detection**: Erkennt und lokalisiert Objekte in Bildern mit Bounding Boxes (normalisiert auf 0–1000)
- **Segmentierung**: Ab Gemini 2.5 — liefert pixelgenaue Konturmasken einzelner Objekte (als Base64-PNG)
- **Custom Instructions**: "Erkenne alle IBAN-Nummern auf diesem Kontoauszug-Foto und markiere ihre Position"
- Formate: JPEG, PNG, WEBP, HEIC — bis 3.600 Bilder pro Request

#### [Nano Banana — Bildgenerierung & -bearbeitung](https://ai.google.dev/gemini-api/docs/image-generation) (Gemini Image Models)

- **Inpainting / Semantic Masking**: Schwärzung durch Beschreibung — "Ersetze die IBAN auf diesem Dokument durch einen schwarzen Balken" (ohne manuelles Masking)
- **Multi-Turn Editing**: Konversationelle Bearbeitung — iteratives Schwärzen verschiedener PII-Typen im Dialog
- **Bis 4K Auflösung**: Generiert Bilder in 512, 1K, 2K und 4K — relevant für hochauflösende Scan-Redaktion
- **Thinking Mode**: Nutzt "Thinking Process" für komplexe Bearbeitungsaufgaben mit Zwischenergebnissen
- **14 Referenzbilder**: Kann bis zu 14 Referenzbilder gleichzeitig verarbeiten (Character Consistency, Object Fidelity)
- Modelle: [`gemini-3.1-flash-image-preview`](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-image-preview) (Nano Banana 2, schnell) oder [`gemini-3-pro-image-preview`](https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-image-preview) (Nano Banana Pro, höchste Qualität)

#### Relevanz für RELIEF

| Szenario | Lokaler Stack | Gemini/Vertex AI |
| --- | --- | --- |
| OCR (Handyfoto) | Granite-Docling-258M | Gemini 3 Flash (Document Understanding) |
| PII-Erkennung | GLiNER + Presidio | Gemini 3 + Structured Output (JSON) |
| Schwärzung (PDF) | Presidio Anonymizer | Nano Banana Inpainting |
| Segmentierung | — | Gemini 2.5+ Segmentation |
| DSGVO-Konformität | ✅ Lokal, keine Cloud | ⚠️ Erfordert Cloud-Freigabe + DPA |

**Empfehlung**: Der **lokale Open-Source-Stack** (Granite-Docling + GLiNER + Presidio) bleibt die **Primärlösung** für RELIEF, da §67 SGB X eine lokale Verarbeitung von Sozialdaten erfordert. Gemini/Vertex AI dient als **Benchmark** für Qualitätsvergleiche und als **Fallback** für Szenarien, in denen eine Cloud-Freigabe besteht (z.B. anonymisierte Test-Dokumente, Schulungsmaterialien).

---

## User Stories

### Bürger-Perspektive (Upload)

| ID | User Story | Akzeptanzkriterium |
|----|-----------|-------------------|
| **US-B1** | Als Antragsteller möchte ich meine Nachweise hochladen, ohne einen Dokumententyp auswählen zu müssen, damit ich keinen Verwaltungsjargon verstehen muss. | Upload-Formular hat **kein** Pflichtfeld für Dokumententyp. |
| **US-B2** | Als Antragsteller möchte ich mehrere Fotos auf einmal hochladen, damit ich nicht jeden Kontoauszug einzeln einreichen muss. | Batch-Upload (Drag & Drop oder Multi-Select) funktioniert. |
| **US-B3** | Als Antragsteller möchte ich eine Bestätigung erhalten, dass meine Nachweise eingegangen sind, damit ich sicher bin, dass alles übermittelt wurde. | Eingangsbestätigung mit Anzahl der hochgeladenen Dateien. |

### Sachbearbeiter-Perspektive (Suche & Kontext)

| ID | User Story | Akzeptanzkriterium |
|----|-----------|-------------------|
| **US-S1** | Als Sachbearbeiterin möchte ich per Freitextsuche nach Dokumenten suchen (z.B. „Mietvertrag Becker"), damit ich nicht durch Ordner navigieren muss. | Volltextsuche liefert Ergebnisse in < 1 Sekunde. |
| **US-S2** | Als Sachbearbeiterin möchte ich bei einem Prüfschritt automatisch die relevanten Dokumente angezeigt bekommen, damit ich keine Nachweise übersehe. | Kontextleiste zeigt Dokumente passend zum aktuellen § an. |
| **US-S3** | Als Sachbearbeiterin möchte ich sofort sehen, welche Nachweise noch fehlen, damit ich frühzeitig Mitwirkungsanforderungen stellen kann. | Vollständigkeitsprüfung zeigt fehlende Dokumente pro Prüfschritt. |
| **US-S4** | Als Sachbearbeiterin möchte ich Schwärzungsvorschläge für sensible Daten erhalten, damit ich DSGVO-konform arbeiten kann, ohne jedes Dokument manuell zu prüfen. | PII-Erkennung markiert IBAN, Geburtsdaten, Gesundheitsdaten. |
| **US-S5** | Als Sachbearbeiterin möchte ich zusammengehörige Seiten (z.B. 15 Mietvertrag-Fotos) automatisch gruppiert sehen, damit ich den Überblick behalte. | OCR-basierte Seitenzusammenführung mit Konfidenzanzeige. |

### System-Perspektive (Hintergrundverarbeitung)

| ID | User Story | Akzeptanzkriterium |
|----|-----------|-------------------|
| **US-X1** | Als System möchte ich hochgeladene Fotos und Scans automatisch per OCR verarbeiten, damit der Volltext im Suchindex verfügbar ist. | OCR startet automatisch nach Upload, Volltext in < 30 Sek. indiziert. |
| **US-X2** | Als System möchte ich extrahierte Metadaten (Datum, Person, Betrag) im Knowledge Graph speichern, damit Kontextabfragen möglich sind. | Metadaten werden als Graph-Knoten mit Relationen gespeichert. |
| **US-X3** | Als System möchte ich Dokumente mit den relevanten §§ SGB II verknüpfen, damit die Kontextbereitstellung funktioniert. | Jedes indizierte Dokument hat ≥ 1 Relation zu einem § im Graph. |

---

## Meilensteine

| Phase | Meilenstein | Beschreibung | Lieferobjekte |
|-------|------------|-------------|---------------|
| **M0** | Demo-Prototyp | Interaktive Landing Page mit Knowledge Graph, Narration und BPMN-Prozessdiagramm | React-App (diese Demo), RELIEF_DEMO_PLAN.md |
| **M1** | OCR & Indizierung | Granite-Docling verarbeitet 47 Demo-Dokumente → Volltext im Suchindex (Elasticsearch/Meilisearch) | OCR-Pipeline, Suchindex, API-Endpoint `/api/v1/search` |
| **M2** | Intelligente Suche | Sachbearbeiterin kann per Freitextsuche Dokumente finden (US-S1) | Such-UI, Ergebnisranking, Snippet-Anzeige |
| **M3** | Kontextbereitstellung | Knowledge Graph liefert automatisch Dokumente zum aktuellen Prüfschritt (US-S2) | Neo4j-Integration, Kontext-API, Vollständigkeitsprüfung |
| **M4** | PII & Schwärzung | GLiNER + Presidio erkennen sensible Daten, Schwärzungsvorschläge (US-S4) | PII-Pipeline, Schwärzungs-UI, Audit-Trail |
| **M5** | Vereinfachter Upload | Bürger-Upload ohne Kategorisierung (US-B1, US-B2) → direkt in OCR-Pipeline | Upload-UI, Eingangsbestätigung, Batch-Verarbeitung |
| **M6** | Pilotbetrieb | Integration in gE-Systemlandschaft, Pilottest mit echten (anonymisierten) Akten | Betriebskonzept, Schulungsmaterial, Performance-Metriken |

---

## Prozessmodernisierung — Von Black Box zu transparenter Entscheidung

### Ausgangslage: Legacy-Systeme als „Black Boxes"

Die Leistungsberechnung in der Grundsicherung (SGB II) wird heute durch **historisch gewachsene Fachverfahren** gesteuert, deren Kernlogik in **Visual Basic** und **COBOL** implementiert ist. Diese Systeme berechnen zwar korrekte Ergebnisse, aber:

- **Keine Nachvollziehbarkeit**: Warum der Bescheid genau 1.247,63 € ausweist, kann niemand schrittweise erklären
- **Keine Änderbarkeit**: Bei Gesetzesänderungen (neuer Regelbedarf, geänderte Freibeträge) müssen monolithische Codeblöcke mühsam angepasst werden
- **Kein Audit-Trail**: Bei einem Widerspruch (§44 SGB X) fehlt die Spur, welche Rechenregeln in welcher Reihenfolge angewendet wurden
- **Fachkräftemangel**: Die wenigen verbliebenen COBOL-/VB-Entwickler gehen in Rente — das Wissen geht mit ihnen

### CASSA-Ansatz: Prozessanalyse → formale Modelle → transparente Implementierung

CASSA analysiert die bestehenden Geschäftsprozesse und extrahiert die darin enthaltenen Regeln und Abläufe in zwei standardisierte Formate:

#### 1. [BPMN 2.0](https://www.omg.org/spec/BPMN/2.0.2/) — Geschäftsprozessmodellierung

[Business Process Model and Notation](https://www.omg.org/spec/BPMN/2.0.2/) bildet die **Ablauflogik** der Sachbearbeitung ab:

- **Swimlanes**: Wer ist zuständig? (Antragsteller, Sachbearbeiter, Teamleitung, System)
- **Gateways**: Entscheidungspunkte — z.B. „Ist das Einkommen stabil oder schwankend?" → vorläufiger Bescheid (§41a SGB II) vs. endgültiger Bescheid
- **Events**: Auslöser und Ergebnisse — Antragstellung (Start) → Bescheid (Ende), Mitwirkungsanforderung (Zwischenereignis)
- **Subprozesse**: Verschachtelte Prüfungen — BG-Prüfung enthält Einkommensprüfung enthält Freibetragsberechnung

Beispiel für den Demo-Fall:

```text
[Antrag Familie Becker]
    → BG-Prüfung (§7 SGB II)
        → Gateway: Alle 5 Personen in BG?
            → Einkommensprüfung Leila (§11 SGB II)
                → Gateway: Schwankendes Einkommen?
                    → Ja: Vorläufige Entscheidung (§41a SGB II)
            → Vermögensprüfung Thomas (§12 SGB II)
            → KdU-Prüfung (§22 SGB II)
    → Vollständigkeitsprüfung (§60 SGB I)
        → Fehlende Unterlagen → Mitwirkungsanforderung
    → Bescheid erstellen
```

#### 2. [BRML](https://ruleml.org/) / [DMN 1.4](https://www.omg.org/spec/DMN/) — Geschäftsregeln

Die **Entscheidungslogik** (Rechenregeln, Prüfregeln, Schwellenwerte) wird in maschinenlesbare Regelformate überführt:

- **[DMN](https://www.omg.org/spec/DMN/) (Decision Model and Notation)**: OMG-Standard für Entscheidungstabellen — z.B. Regelbedarfsstufentabelle (§20 SGB II), Freibetragsberechnung (§11b SGB II)
- **[RuleML](https://ruleml.org/) / BRML**: XML-basierte Geschäftsregelsprache für komplexe Regelketten mit Bedingungen und Ausnahmen
- **Entscheidungstabellen**: Jede Zeile eine Regel, jede Spalte eine Bedingung — lesbar für Juristen und Fachkräfte

Beispiel DMN-Entscheidungstabelle für Freibeträge (§11b SGB II):

| Bruttoeinkommen | Freibetrag Grundabsetzung | Erwerbstätigenfreibetrag | Ergebnis |
| --- | --- | --- | --- |
| ≤ 520 € (Minijob) | 100 € | 20% von (Brutto − 100 €) | Freistellung |
| 520 € – 1.000 € | 100 € | 20% von 420 € + 30% von (Brutto − 520 €) | Teilanrechnung |
| > 1.000 € | 100 € | 20% von 420 € + 30% von 480 € + 10% Rest | Volle Anrechnung |

→ Für Leila Becker (850 € brutto): Freibetrag = 100 € + 84 € + 99 € = **283 € frei**, 567 € anrechenbar

#### 3. Schrittweise Ablösung: VB/COBOL → Transparente Implementierung

Die Modernisierung erfolgt **inkrementell** — nicht als Big-Bang-Migration:

| Schritt | Aktion | Ergebnis |
| --- | --- | --- |
| 1. Prozess-Mining | CASSA analysiert laufende Systeme und extrahiert tatsächliche Abläufe | Ist-Prozessmodell (BPMN) |
| 2. Regel-Extraktion | Geschäftslogik aus VB/COBOL wird als DMN/BRML formalisiert | Maschinenlesbare Regeln |
| 3. Validierung | Fachexperten prüfen: Stimmen die extrahierten Regeln mit dem Gesetz überein? | Fachliche Freigabe |
| 4. Parallelbetrieb | Neue transparente Implementierung läuft parallel zur Legacy-Berechnung | Ergebnisvergleich |
| 5. Schrittweise Ablösung | Bei Übereinstimmung wird Modul für Modul umgestellt | Transparente Berechnung |
| 6. Erklärbare Bescheide | Jeder Bescheid enthält einen Audit-Trail: „Ergebnis X weil Regel Y auf Daten Z" | Rechtssicherheit |

### Werkzeuge für die Prozessmodernisierung

| Werkzeug | Aufgabe | Relevanz |
| --- | --- | --- |
| **[Camunda Platform 8](https://camunda.com/)** | BPMN-Ausführung | Orchestriert Geschäftsprozesse als ausführbare BPMN-Modelle |
| **[DMN Engine (Camunda)](https://docs.camunda.io/docs/components/modeler/dmn/)** | Entscheidungsautomatisierung | Führt DMN-Entscheidungstabellen aus — z.B. Freibetragsberechnung |
| **[Drools](https://www.drools.org/)** | Business Rules Engine | Führt BRML/RuleML-Regeln aus — komplexe Regelketten mit Forward/Backward Chaining |
| **[Celonis](https://www.celonis.com/)** / [Signavio](https://www.signavio.com/) | Process Mining | Analysiert Legacy-Systeme und extrahiert tatsächliche Prozessabläufe |
| **[BPMN.io](https://bpmn.io/)** | Modellierung | Open-Source-Editor für BPMN- und DMN-Diagramme (Web-basiert) |

### Rechtssicherheit durch Transparenz

Die formale Modellierung bietet entscheidende Vorteile für die Rechtssicherheit der Leistungsbescheide:

1. **Begründungspflicht (§35 SGB X)**: Jeder Verwaltungsakt muss begründet sein — die transparente Implementierung liefert automatisch die Begründung
2. **Widerspruchsverfahren (§78ff. SGG)**: Bei Widerspruch kann exakt nachvollzogen werden, welche Regel welches Ergebnis erzeugt hat
3. **Gesetzesänderungen**: Neue Regelbedarfsstufen oder Freibeträge werden als DMN-Tabellenzeile geändert — nicht als COBOL-Patch
4. **Vier-Augen-Prinzip**: BPMN-Diagramme können von Juristen gelesen und geprüft werden — COBOL-Code nicht
5. **Revisionssicherheit**: Jede Regelversion ist versioniert und archiviert — §45/48 SGB X (Aufhebung/Änderung) wird nachvollziehbar
