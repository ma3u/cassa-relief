import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ForceGraph3D, { type ForceGraphMethods } from 'react-force-graph-3d'
import SpriteText from 'three-spritetext'
import * as THREE from 'three'
import { X, RotateCcw, Maximize2, Minimize2 } from 'lucide-react'

// ────────────────────────────────────────────
// Types
// ────────────────────────────────────────────
type NodeType =
  | 'law'
  | 'section'
  | 'process'
  | 'person'
  | 'case'
  | 'document'
  | 'entity'
  | 'ai'
  | 'standard'
  | 'risk'
  | 'event'

interface GraphNode {
  id: string
  label: string
  type: NodeType
  description: string
  details?: Record<string, string>
  x?: number
  y?: number
  z?: number
}

interface GraphLink {
  source: string | { id: string }
  target: string | { id: string }
  type: string
  description?: string
}

interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

const START_NODE_ID = 'case_becker'

// ────────────────────────────────────────────
// Color palette per node type
// ────────────────────────────────────────────
const NODE_COLORS: Record<NodeType, string> = {
  law: '#3b82f6',
  section: '#6366f1',
  process: '#10b981',
  person: '#f472b6',
  case: '#ef4444',
  document: '#fbbf24',
  entity: '#ec4899',
  ai: '#22c55e',
  standard: '#06b6d4',
  risk: '#f97316',
  event: '#a855f7',
}

const NODE_LABELS: Record<NodeType, string> = {
  law: '📘 Gesetz',
  section: '📄 Paragraph',
  process: '🔄 Prozess',
  person: '👤 Person',
  case: '📁 Fallakte',
  document: '📝 Dokument',
  entity: '🏛️ Fachentität',
  ai: '🤖 KI-Funktion',
  standard: '🛡️ Standard',
  risk: '⚠️ Aktenproblem',
  event: '⚡ Ereignis',
}

// ────────────────────────────────────────────
// RELIEF E-AKTE Knowledge Graph Data
// Fall Familie Becker — BG-Nr. 412K-078263-B
// ────────────────────────────────────────────
function buildCaseData(): GraphData {
  const nodes: GraphNode[] = [
    // ── GESETZE (LAW) ──
    { id: 'sgb_ii', label: 'SGB II', type: 'law', description: 'Grundsicherung für Arbeitsuchende — Primärgesetz für Bürgergeld und Jobcenter', details: { 'Titel': 'Sozialgesetzbuch Zweites Buch', 'Kerninhalt': 'Bürgergeld, KdU, BuT, Eingliederung', 'URL': 'https://www.gesetze-im-internet.de/sgb_2/' } },
    { id: 'sgb_i', label: 'SGB I', type: 'law', description: 'Allgemeiner Teil — Mitwirkungspflichten und -folgen', details: { 'Titel': 'Sozialgesetzbuch Erstes Buch', 'Relevanz': '§60 Mitwirkungspflichten, §66 Versagung bei Pflichtverletzung' } },
    { id: 'sgb_iii', label: 'SGB III', type: 'law', description: 'Arbeitsförderung — Sperrzeitregelungen', details: { 'Titel': 'Sozialgesetzbuch Drittes Buch', 'Relevanz': '§159 Sperrzeit bei Eigenkündigung (hier nicht einschlägig)' } },
    { id: 'sgb_x', label: 'SGB X', type: 'law', description: 'Verwaltungsverfahren und Sozialdatenschutz', details: { 'Titel': 'Sozialgesetzbuch Zehntes Buch', 'Relevanz': '§31 Verwaltungsakt, §67ff. Sozialdatenschutz' } },
    { id: 'dsgvo', label: 'DSGVO', type: 'law', description: 'EU-Datenschutz-Grundverordnung (EU 2016/679)', details: { 'Relevanz': 'Art. 6 Rechtmäßigkeit, Art. 9 besondere Kategorien (Gesundheitsdaten)' } },

    // ── PARAGRAPHEN (SECTION) ──
    { id: 'sec_7', label: '§7 BG-Bestimmung', type: 'section', description: 'Definition der Bedarfsgemeinschaft — wer gehört dazu?', details: { 'Gesetz': 'SGB II', 'Abs. 3': 'BG: Partner, Kinder unter 25 im Haushalt', 'Fall': 'Thomas + Leila + Sophie (14) + Can (6) + Emma (9 Mo.)' } },
    { id: 'sec_9', label: '§9 Hilfebedürftigkeit', type: 'section', description: 'Prüfung der Hilfebedürftigkeit der gesamten BG', details: { 'Gesetz': 'SGB II', 'Prüfung': 'Eigenes Einkommen/Vermögen reicht nicht für Lebensunterhalt', 'BG-Prinzip': 'Einkommen aller BG-Mitglieder wird berücksichtigt' } },
    { id: 'sec_11', label: '§11 Einkommen', type: 'section', description: 'Anrechenbares Einkommen — welche Einnahmen werden berücksichtigt?', details: { 'Gesetz': 'SGB II', 'Fall': 'Leilas Lohn 850€ brutto, Sophies Unterhalt 230€, Kindergeld' } },
    { id: 'sec_11b', label: '§11b Absetzbeträge', type: 'section', description: 'Freibeträge bei Erwerbseinkommen (Erwerbstätigenfreibetrag)', details: { 'Gesetz': 'SGB II', 'Grundabsetzung': '100€ Grundfreibetrag', 'Erwerbstätigenfreibetrag': '20% von 100–520€, 10% von 520–1.500€' } },
    { id: 'sec_12', label: '§12 Vermögen', type: 'section', description: 'Schonvermögen und anrechenbares Vermögen', details: { 'Gesetz': 'SGB II', 'Fall': 'LV 12.500€ (Freibetrag prüfen), VW Touran (angemessen?)' } },
    { id: 'sec_20', label: '§20 Regelbedarf', type: 'section', description: 'Regelbedarfsstufen für BG-Mitglieder', details: { 'Gesetz': 'SGB II', 'Stufe 1': '563€ (Alleinstehend/Alleinerziehend)', 'Stufe 2': '506€ (Partner)', 'Stufe 5': '357€ (Kind 6–13)', 'Stufe 6': '357€ (Kind 0–5)' } },
    { id: 'sec_21', label: '§21 Mehrbedarf', type: 'section', description: 'Mehrbedarfe (Alleinerziehende, Schwangere, etc.)', details: { 'Gesetz': 'SGB II', 'Fall': 'Kein Alleinerziehendenmehrbedarf — BG mit Partner' } },
    { id: 'sec_22', label: '§22 KdU', type: 'section', description: 'Kosten der Unterkunft und Heizung', details: { 'Gesetz': 'SGB II', 'Fall': '1.000€ warm (90m², 5 Personen)', 'Prüfung': 'Kommunale Angemessenheitsgrenze Dortmund' } },
    { id: 'sec_28', label: '§28 BuT', type: 'section', description: 'Bildung und Teilhabe — Leistungen für Kinder', details: { 'Gesetz': 'SGB II', 'Fall': 'Sophie: Schulbedarf, Can: Kita-Mittagessen' } },
    { id: 'sec_31', label: '§31 Pflichtverletzung', type: 'section', description: 'Sanktionen bei Pflichtverletzung', details: { 'Gesetz': 'SGB II', 'Hinweis': 'Nicht einschlägig — Thomas kooperiert' } },
    { id: 'sec_41a', label: '§41a Vorläufig', type: 'section', description: 'Vorläufige Entscheidung bei schwankendem Einkommen', details: { 'Gesetz': 'SGB II', 'Fall': 'Leilas Midijob: 850€ brutto (schwankend) → vorläufiger Bescheid' } },
    { id: 'sec_56', label: '§56 Datenübermittlung', type: 'section', description: 'Automatisierter Datenabgleich (§56 SGB II)', details: { 'Gesetz': 'SGB II', 'Zweck': 'Vermögensabgleich, Einkommensprüfung' } },
    { id: 'sec_60', label: '§60 Mitwirkung', type: 'section', description: 'Mitwirkungspflichten des Antragstellers', details: { 'Gesetz': 'SGB I', 'Pflicht': 'Tatsachen angeben, Nachweise vorlegen, Änderungen mitteilen' } },
    { id: 'sec_66', label: '§66 Versagung', type: 'section', description: 'Folgen bei fehlender Mitwirkung', details: { 'Gesetz': 'SGB I', 'Folge': 'Versagung oder Entziehung der Leistung nach Fristsetzung' } },
    { id: 'sec_159', label: '§159 Sperrzeit', type: 'section', description: 'Sperrzeit bei Arbeitsaufgabe (nicht einschlägig: Insolvenz)', details: { 'Gesetz': 'SGB III', 'Ergebnis': 'Negativ — betriebsbedingte Kündigung durch Insolvenz' } },
    { id: 'sec_67', label: '§67 Sozialdatenschutz', type: 'section', description: 'Sozialdatenschutz — Erhebung und Verarbeitung von Sozialdaten', details: { 'Gesetz': 'SGB X', 'Relevanz': 'Arztbrief Sophie = Gesundheitsdaten → nicht in Leistungsakte!' } },
    { id: 'sec_art9', label: 'Art. 9 DSGVO', type: 'section', description: 'Verarbeitung besonderer Kategorien personenbezogener Daten', details: { 'Gesetz': 'DSGVO', 'Kategorie': 'Gesundheitsdaten = besondere Kategorie', 'Fall': 'Arztbrief darf nicht in der E-AKTE liegen' } },

    // ── PROZESSE (PROCESS) ──
    { id: 'proc_antrag', label: 'Antragstellung', type: 'process', description: 'Bürgergeld-Antrag online über jobcenter.digital oder persönlich', details: { 'Datum': '03.02.2026', 'Kanal': 'jobcenter.digital', 'Formular': 'Hauptantrag + Anlagen KdU, EK, VM' } },
    { id: 'proc_bg_pruefung', label: 'BG-Prüfung', type: 'process', description: 'Bestimmung der Bedarfsgemeinschaft nach §7 Abs. 3 SGB II', details: { 'Ergebnis': '5-Personen-BG: Thomas, Leila, Sophie, Can, Emma', 'Besonderheit': 'Leila = Partnerin (nicht verheiratet, aber eheähnlich)' } },
    { id: 'proc_einkommen', label: 'Einkommensprüfung', type: 'process', description: 'Anrechnung aller Einkommen der BG — §11, §11b SGB II', details: { 'Leilas Lohn': '850€ brutto → Netto abzgl. Freibeträge', 'Unterhalt': '230€ Sophie', 'Kindergeld': '3× 250€' } },
    { id: 'proc_vermoegen', label: 'Vermögensprüfung', type: 'process', description: 'Prüfung des Vermögens der BG — §12 SGB II', details: { 'LV Thomas': '12.500€ Rückkaufwert', 'Kfz': 'VW Touran, Wert ~8.500€' } },
    { id: 'proc_kdu', label: 'KdU-Prüfung', type: 'process', description: 'Prüfung der Angemessenheit der Unterkunftskosten', details: { 'Miete': '780€ kalt + 220€ NK = 1.000€ warm', 'Haushalt': '5 Personen, 90m²', 'Angemessenheit': 'Kommunale Richtlinie Dortmund prüfen' } },
    { id: 'proc_aktenerschliessung', label: 'Aktenerschließung', type: 'process', description: 'Sichtung und Verstehen aller Dokumente in der E-AKTE', details: { 'Dokumente': '47 Stück', 'Zeitaufwand manuell': '~2–3 Stunden', 'RELIEF-Ziel': '<15 Minuten' } },
    { id: 'proc_aktenpflege', label: 'Aktenpflege', type: 'process', description: 'Klassifikation, Sortierung, Schwärzung, Freitexte der E-AKTE', details: { 'Aufgaben': 'Klassifizieren, Sortieren, Schwärzen, Freitexte, Zusammenführen', 'Zeitaufwand manuell': '~1–2 Stunden pro Fall', 'RELIEF-Ziel': 'Automatisch mit manueller Freigabe' } },

    // ── PERSONEN (PERSON) ──
    { id: 'thomas', label: 'Thomas Becker', type: 'person', description: 'Antragsteller, 45 Jahre, arbeitslos seit 15.01.2026 (Insolvenz Arbeitgeber)', details: { 'Alter': '45', 'Status': 'Arbeitslos seit 15.01.2026', 'Grund': 'Insolvenz Möbel-Zentrum GmbH, Dortmund', 'Rolle': 'Antragsteller / Hauptperson BG' } },
    { id: 'leila', label: 'Leila Becker', type: 'person', description: 'Lebensgefährtin, 37 Jahre, Teilzeit-Reinigungskraft (Midijob 850€)', details: { 'Alter': '37', 'Geburtsname': 'Kaya', 'Beschäftigung': 'Reinigungskraft, 850€ brutto (schwankend)', 'Rolle': 'Partnerin in BG' } },
    { id: 'sophie', label: 'Sophie Becker', type: 'person', description: 'Tochter (Thomas, 1. Ehe), 14 Jahre, Unterhalt 230€/Monat', details: { 'Alter': '14', 'Mutter': '1. Ehe Thomas', 'Unterhalt': '230€/Monat von Kindsmutter', 'BuT': 'Schulbedarf' } },
    { id: 'can', label: 'Can Becker', type: 'person', description: 'Sohn (gemeinsam), 6 Jahre, Kita-Kind', details: { 'Alter': '6', 'Kita': 'Ja', 'BuT': 'Mittagessen Kita' } },
    { id: 'emma', label: 'Emma Becker', type: 'person', description: 'Tochter (gemeinsam), 9 Monate, Säugling', details: { 'Alter': '9 Monate', 'Kindergeld': '250€' } },

    // ── FALL (CASE) ──
    { id: 'case_becker', label: 'Fall Familie Becker', type: 'case', description: 'BG-Nr. 412K-078263-B — Bürgergeld-Antrag nach Arbeitgeber-Insolvenz. 5-Personen-BG, schwankendes Einkommen, 47 Dokumente in E-AKTE.', details: { 'BG-Nr.': '412K-078263-B', 'Antragsdatum': '03.02.2026', 'Jobcenter': 'Dortmund', 'BG-Größe': '5 Personen', 'Dokumente': '47', 'Status': 'In Bearbeitung — Aktenerschließung' } },

    // ── DOKUMENTE (DOCUMENT) ──
    { id: 'doc_kontoauszuege', label: '12 Kontoauszüge', type: 'document', description: '12 Kontoauszüge als Einzelfotos — nicht chronologisch sortiert, fehlender Zusammenhang', details: { 'Typ': 'Kontoauszug', 'Anzahl': '12 Seiten (Fotos)', 'Problem': 'Einzelseiten, nicht chronologisch', 'Zeitraum': 'Nov 2025 – Jan 2026' } },
    { id: 'doc_mietvertrag', label: 'Mietvertrag', type: 'document', description: 'Mietvertrag als 15 Fotoaufnahmen — Einzelseiten ohne Dokumentenzusammenhang', details: { 'Typ': 'Mietvertrag', 'Seiten': '15 (Fotos)', 'Problem': 'Einzelseiten ohne Zusammenhang', 'Objekt': '90m², 4 Zi., Dortmund-Hörde' } },
    { id: 'doc_lohn', label: '3 Lohnabrechnungen', type: 'document', description: 'Lohnabrechnungen Leila — unterschiedliches Layout (schwankendes Einkommen)', details: { 'Typ': 'Lohnabrechnung', 'Person': 'Leila Becker', 'Problem': 'Schwankendes Layout, OCR-Qualität', 'Monate': 'Nov, Dez 2025, Jan 2026' } },
    { id: 'doc_nk', label: 'Nebenkostenabrechnung', type: 'document', description: 'Nebenkostenabrechnung — nur 2 von 4 Seiten eingereicht', details: { 'Typ': 'Nebenkostenabrechnung', 'Problem': 'Unvollständig (2 von 4 Seiten)', 'Prüfung': 'Fehlende Seiten anfordern' } },
    { id: 'doc_kindergeld', label: 'Kindergeldbescheid', type: 'document', description: 'Kindergeldbescheid — veraltete Fassung (Betrag stimmt nicht mit aktuellem Satz überein)', details: { 'Typ': 'Kindergeldbescheid', 'Problem': 'Veraltet — Betrag passt nicht zum aktuellen Satz', 'Aktuell': '250€ pro Kind' } },
    { id: 'doc_unterhalt', label: 'Unterhaltsurkunde', type: 'document', description: 'Unterhaltsurkunde Sophie — enthält Kontonummern und Geburtsdaten (schwärzen!)', details: { 'Typ': 'Unterhaltsurkunde', 'Person': 'Sophie Becker', 'Problem': 'Sensible Daten sichtbar (Kontonummern, Geburtsdaten)', 'Lösung': 'Automatische Schwärzungsvorschläge' } },
    { id: 'doc_arztbrief', label: 'Arztbrief Sophie', type: 'document', description: 'Arztbrief Sophie — Gesundheitsdaten! Gehört NICHT in die Leistungsakte (§67 SGB X, Art. 9 DSGVO)', details: { 'Typ': 'Arztbrief (Gesundheitsdaten)', 'Person': 'Sophie Becker', 'Problem': 'Gehört nicht in Leistungsakte!', 'Rechtsgrund': '§67 SGB X, Art. 9 DSGVO', 'Aktion': 'KI-Fehlklassifikations-Flag → Entfernen' } },
    { id: 'doc_insolvenz', label: 'Insolvenzbekanntmachung', type: 'document', description: 'Insolvenzbekanntmachung Möbel-Zentrum GmbH — eingereicht als Screenshot', details: { 'Typ': 'Insolvenzbekanntmachung', 'Firma': 'Möbel-Zentrum GmbH, Dortmund', 'Problem': 'Screenshot statt Dokument — Qualitätsbewertung', 'Quelle': 'insolvenzbekanntmachungen.de' } },
    { id: 'doc_ag_bescheinigung', label: 'Arbeitgeberbescheinigung', type: 'document', description: 'Arbeitgeberbescheinigung Thomas — FEHLT! Muss per Mitwirkungsanforderung nachgefordert werden.', details: { 'Typ': 'Arbeitgeberbescheinigung', 'Status': 'FEHLT', 'Pflicht': '§60 SGB I — Mitwirkungspflicht', 'Aktion': 'Mitwirkungsanforderung an Thomas' } },
    { id: 'doc_sonstige', label: '3× „Sonstiges"', type: 'document', description: 'Drei Dokumente als „Sonstiges" klassifiziert — KI-Reklassifikation nötig', details: { 'Typ': 'Falsch klassifiziert', 'Anzahl': '3 Dokumente', 'Problem': 'Keine verwertbare Klassifikation', 'KI-Aktion': 'Automatische Reklassifikation' } },

    // ── FACHENTITÄTEN (ENTITY) ──
    { id: 'ent_bg', label: 'Bedarfsgemeinschaft', type: 'entity', description: 'Bedarfsgemeinschaft gem. §7 Abs. 3 SGB II — 5 Personen', details: { 'Mitglieder': '5 (Thomas, Leila, Sophie, Can, Emma)', 'Typ': 'Unverheiratete Partner mit Kindern' } },
    { id: 'ent_einkommen', label: 'Einkommen BG', type: 'entity', description: 'Gesamteinkommen der BG: Leilas Lohn, Sophies Unterhalt, Kindergeld', details: { 'Lohn Leila': '850€ brutto (schwankend)', 'Unterhalt Sophie': '230€', 'Kindergeld': '3× 250€ = 750€' } },
    { id: 'ent_vermoegen', label: 'Vermögen Thomas', type: 'entity', description: 'Vermögenswerte: Kapital-Lebensversicherung, PKW', details: { 'LV': '12.500€ Rückkaufwert', 'PKW': 'VW Touran Bj. 2017, ~8.500€', 'Freibetrags-Prüfung': 'Erforderlich nach §12 SGB II' } },
    { id: 'ent_kdu_betrag', label: 'KdU 1.000€ warm', type: 'entity', description: 'Kosten der Unterkunft: 780€ Kaltmiete + 220€ Nebenkosten', details: { 'Kaltmiete': '780€', 'Nebenkosten': '220€', 'Gesamt': '1.000€ warm', 'Wohnfläche': '90m², 4 Zimmer' } },
    { id: 'ent_regelbedarf', label: 'Regelbedarf BG', type: 'entity', description: 'Regelbedarfe der 5-Personen-BG nach Stufen', details: { 'Thomas (St. 1/2)': '506€', 'Leila (St. 2)': '506€', 'Sophie 14J (St. 4)': '471€', 'Can 6J (St. 5)': '390€', 'Emma <6J (St. 6)': '357€' } },
    { id: 'ent_but', label: 'BuT-Leistungen', type: 'entity', description: 'Bildung und Teilhabe: Schulbedarf Sophie, Mittagessen Can', details: { 'Sophie': 'Schulbedarf (§28 Abs. 3)', 'Can': 'Mittagessen Kita (§28 Abs. 6)' } },
    { id: 'ent_vorlaeufig', label: 'Vorläufiger Bescheid', type: 'entity', description: 'Vorläufige Entscheidung wegen schwankendem Einkommen Leila', details: { 'Grund': 'Schwankendes Einkommen Leila (Midijob)', 'Rechtsgrund': '§41a SGB II', 'Folge': 'Endgültige Festsetzung nach Bewilligungszeitraum' } },
    { id: 'ent_eakte', label: 'E-AKTE', type: 'entity', description: 'Elektronische Fallakte im Jobcenter — 47 Dokumente, strukturierungsbedürftig', details: { 'Dokumente gesamt': '47', 'Probleme': '12 identifizierte E-AKTE-Probleme', 'Status': 'Unstrukturiert — RELIEF-KI-Unterstützung benötigt' } },

    // ── KI-FUNKTIONEN (AI) ──
    { id: 'ai_klassifikation', label: 'Dokumentenklassifikation', type: 'ai', description: 'Automatische Zuordnung: Kontoauszug, Mietvertrag, Lohnabrechnung etc.', details: { 'Technologie': 'Document AI, trainierte Modelle', 'Genauigkeit': '>95% Zielwert', 'Aktion': 'Reklassifikation falsch zugeordneter Dokumente' } },
    { id: 'ai_ocr', label: 'OCR & Texterkennung', type: 'ai', description: 'Textextraktion aus Fotos, Scans und Screenshots', details: { 'Technologie': 'Tesseract OCR, Azure Form Recognizer', 'Formate': 'JPEG, PNG, PDF (Scan)', 'Qualitätsprüfung': 'Konfidenzwert pro Feld' } },
    { id: 'ai_metadaten', label: 'Metadaten-Extraktion', type: 'ai', description: 'Datum, Absender, Dokumententyp, zugehörige Person automatisch erkennen', details: { 'Technologie': 'NER, regelbasierte Extraktion', 'Felder': 'Datum, Absender, Person, Betreff' } },
    { id: 'ai_schwaerzung', label: 'Automatische Schwärzung', type: 'ai', description: 'Kontonummern, Geburtsdaten, Gesundheitsdaten erkennen und schwärzen', details: { 'Technologie': 'Pattern-Matching + KI-Erkennung', 'Muster': 'IBAN, Geburtsdaten, Diagnosen, Kontonummern', 'Datenschutz': '§67 SGB X, Art. 9 DSGVO' } },
    { id: 'ai_sortierung', label: 'Sortierung & Zusammenführung', type: 'ai', description: 'Einzelseiten → Dokument, chronologische und sachliche Ordnung herstellen', details: { 'Technologie': 'Sequenzanalyse, Seitenerkennung', 'Aktion': 'Kontoauszüge chronologisch, Mietvertrag-Seiten zusammenführen' } },
    { id: 'ai_freitext', label: 'Freitextgenerierung', type: 'ai', description: 'Beschreibende Texte für jedes Dokument generieren', details: { 'Technologie': 'LLM-Zusammenfassung', 'Beispiel': '„Kontoauszug Sparkasse, Thomas Becker, Feb. 2026, Saldo 412,80€"' } },

    // ── STANDARDS (STANDARD) ──
    { id: 'std_resiscan', label: 'BSI TR-RESISCAN', type: 'standard', description: 'Technische Richtlinie für ersetzendes Scannen — Beweiswert', details: { 'Herausgeber': 'BSI', 'Nummer': 'TR-03138', 'Relevanz': 'Beweiswert gescannter Dokumente in der E-AKTE' } },
    { id: 'std_esor', label: 'BSI TR-ESOR', type: 'standard', description: 'Beweiswerterhaltung kryptographisch signierter Dokumente', details: { 'Herausgeber': 'BSI', 'Nummer': 'TR-03125', 'Relevanz': 'Langzeitsicherung der E-AKTE' } },
    { id: 'std_xdomea', label: 'xdomea 3.0', type: 'standard', description: 'Standard für Austausch von Schriftgutobjekten zwischen Verwaltungssystemen', details: { 'Herausgeber': 'KoSIT / IT-Planungsrat', 'Version': '3.0', 'Relevanz': 'Aktenplan-Strukturierung, Metadaten-Schema' } },
    { id: 'std_iso15489', label: 'ISO 15489', type: 'standard', description: 'Records Management — Aktenführung, Klassifikation, Aufbewahrung', details: { 'Herausgeber': 'ISO', 'Relevanz': 'Grundlage für Ordnungsprinzipien der E-AKTE' } },
    { id: 'std_grundschutz', label: 'BSI IT-Grundschutz', type: 'standard', description: 'IT-Sicherheitsstandard des BSI für Jobcenter-Systeme', details: { 'Relevanz': 'Absicherung der KI-Pipeline und Dokumentenverarbeitung', 'Zertifizierung': 'ISO 27001 auf Basis IT-Grundschutz' } },

    // ── AKTENPROBLEME (RISK) ──
    { id: 'risk_unsortiert', label: 'Unsortierte Einzelseiten', type: 'risk', description: 'Kontoauszüge und Mietvertrag als Einzelfotos ohne Ordnung eingereicht', details: { 'Betroffene Docs': 'Kontoauszüge (12), Mietvertrag (15)', 'Folge': 'Zeitaufwand Aktenerschließung', 'RELIEF': 'KI-Sortierung + Zusammenführung' } },
    { id: 'risk_fehlklassifikation', label: 'Fehlklassifikation', type: 'risk', description: '3 Dokumente als „Sonstiges" klassifiziert, 1 Arztbrief fälschlich in Leistungsakte', details: { 'Anzahl': '4 Dokumente', 'Kritisch': 'Arztbrief = Gesundheitsdaten!', 'RELIEF': 'KI-Reklassifikation + Datenschutz-Flag' } },
    { id: 'risk_unvollstaendig', label: 'Unvollständige Dokumente', type: 'risk', description: 'Nebenkostenabrechnung nur 2/4 Seiten, Arbeitgeberbescheinigung fehlt ganz', details: { 'NK': '2 von 4 Seiten', 'AG-Bescheinigung': 'Fehlt komplett', 'RELIEF': 'Vollständigkeitsprüfung + Mitwirkungsanforderung' } },
    { id: 'risk_datenschutz', label: 'Datenschutzverletzung', type: 'risk', description: 'Unterhaltsurkunde mit offenen Kontonummern, Arztbrief mit Gesundheitsdaten in Leistungsakte', details: { 'Kontonummern': 'Sichtbar in Unterhaltsurkunde', 'Gesundheitsdaten': 'Arztbrief Sophie', 'Rechtsverstoß': '§67 SGB X, Art. 9 DSGVO', 'RELIEF': 'Schwärzung + Entfernung' } },
    { id: 'risk_qualitaet', label: 'Niedrige Dokumentenqualität', type: 'risk', description: 'Screenshot statt Dokument (Insolvenzbekanntmachung), Handyfotos statt Scans', details: { 'Betroffene': 'Insolvenzbekanntmachung, Kontoauszüge', 'Problem': 'OCR-Qualität unzureichend', 'RELIEF': 'Qualitätsbewertung + OCR-Optimierung' } },
    { id: 'risk_freitext', label: 'Fehlende Freitexte', type: 'risk', description: 'Alle 47 Dokumente ohne beschreibende Freitexte — Aktenerschließung erschwert', details: { 'Betroffene': 'Alle 47 Dokumente', 'Folge': 'Jedes Dokument muss einzeln geöffnet werden', 'RELIEF': 'Automatische Freitextgenerierung' } },

    // ── EREIGNISSE (EVENT) ──
    { id: 'evt_insolvenz', label: 'Insolvenz 15.01.2026', type: 'event', description: 'Insolvenz Möbel-Zentrum GmbH — Thomas erhält betriebsbedingte Kündigung', details: { 'Datum': '15.01.2026', 'Firma': 'Möbel-Zentrum GmbH, Dortmund', 'Folge': 'Arbeitslosigkeit Thomas, kein Sperrzeitgrund' } },
    { id: 'evt_antrag', label: 'Antrag 03.02.2026', type: 'event', description: 'Bürgergeld-Antrag online über jobcenter.digital eingereicht', details: { 'Datum': '03.02.2026', 'Kanal': 'jobcenter.digital', 'Dokumente': '47 (digital, Fotos, Post bis 24.02.)' } },
  ]

  const links: GraphLink[] = [
    // ── Gesetze → Paragraphen ──
    { source: 'sgb_ii', target: 'sec_7', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_ii', target: 'sec_9', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_ii', target: 'sec_11', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_ii', target: 'sec_11b', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_ii', target: 'sec_12', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_ii', target: 'sec_20', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_ii', target: 'sec_21', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_ii', target: 'sec_22', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_ii', target: 'sec_28', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_ii', target: 'sec_31', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_ii', target: 'sec_41a', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_ii', target: 'sec_56', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_i', target: 'sec_60', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_i', target: 'sec_66', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_iii', target: 'sec_159', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'sgb_x', target: 'sec_67', type: 'SR_CONTAINS', description: 'enthält' },
    { source: 'dsgvo', target: 'sec_art9', type: 'SR_CONTAINS', description: 'enthält' },

    // ── Paragraphen → Prozesse (Rechtsgrundlage) ──
    { source: 'sec_7', target: 'proc_bg_pruefung', type: 'SR_REALIZED_BY', description: 'umgesetzt in' },
    { source: 'sec_9', target: 'proc_einkommen', type: 'SR_REFERENCES', description: 'verweist auf' },
    { source: 'sec_11', target: 'proc_einkommen', type: 'SR_REALIZED_BY', description: 'umgesetzt in' },
    { source: 'sec_12', target: 'proc_vermoegen', type: 'SR_REALIZED_BY', description: 'umgesetzt in' },
    { source: 'sec_22', target: 'proc_kdu', type: 'SR_REALIZED_BY', description: 'umgesetzt in' },
    { source: 'sec_60', target: 'proc_aktenerschliessung', type: 'SR_REFERENCES', description: 'Mitwirkungspflicht' },

    // ── Prozesskette ──
    { source: 'proc_antrag', target: 'proc_bg_pruefung', type: 'SR_SEQUENCE', description: 'dann' },
    { source: 'proc_bg_pruefung', target: 'proc_einkommen', type: 'SR_SEQUENCE', description: 'dann' },
    { source: 'proc_einkommen', target: 'proc_vermoegen', type: 'SR_SEQUENCE', description: 'dann' },
    { source: 'proc_vermoegen', target: 'proc_kdu', type: 'SR_SEQUENCE', description: 'dann' },
    { source: 'proc_antrag', target: 'proc_aktenerschliessung', type: 'SR_SEQUENCE', description: 'parallel' },
    { source: 'proc_aktenerschliessung', target: 'proc_aktenpflege', type: 'SR_SEQUENCE', description: 'dann' },

    // ── Fall → Personen ──
    { source: 'case_becker', target: 'thomas', type: 'SR_BETRIFFT', description: 'Antragsteller' },
    { source: 'case_becker', target: 'leila', type: 'SR_BETRIFFT', description: 'Partnerin' },
    { source: 'case_becker', target: 'sophie', type: 'SR_BETRIFFT', description: 'Kind' },
    { source: 'case_becker', target: 'can', type: 'SR_BETRIFFT', description: 'Kind' },
    { source: 'case_becker', target: 'emma', type: 'SR_BETRIFFT', description: 'Kind' },

    // ── Personen → BG ──
    { source: 'thomas', target: 'ent_bg', type: 'SR_GEHOERT_ZU', description: 'Mitglied' },
    { source: 'leila', target: 'ent_bg', type: 'SR_GEHOERT_ZU', description: 'Mitglied' },
    { source: 'sophie', target: 'ent_bg', type: 'SR_GEHOERT_ZU', description: 'Mitglied' },
    { source: 'can', target: 'ent_bg', type: 'SR_GEHOERT_ZU', description: 'Mitglied' },
    { source: 'emma', target: 'ent_bg', type: 'SR_GEHOERT_ZU', description: 'Mitglied' },

    // ── Person → Dokumente ──
    { source: 'thomas', target: 'doc_kontoauszuege', type: 'SR_EINGEREICHT', description: 'eingereicht' },
    { source: 'thomas', target: 'doc_mietvertrag', type: 'SR_EINGEREICHT', description: 'eingereicht' },
    { source: 'thomas', target: 'doc_insolvenz', type: 'SR_EINGEREICHT', description: 'eingereicht' },
    { source: 'thomas', target: 'doc_ag_bescheinigung', type: 'SR_FEHLT', description: 'FEHLT!' },
    { source: 'leila', target: 'doc_lohn', type: 'SR_EINGEREICHT', description: 'eingereicht' },
    { source: 'sophie', target: 'doc_unterhalt', type: 'SR_BETRIFFT', description: 'betrifft' },
    { source: 'sophie', target: 'doc_arztbrief', type: 'SR_BETRIFFT', description: 'NICHT in Akte!' },

    // ── Dokumente → Risiken ──
    { source: 'doc_kontoauszuege', target: 'risk_unsortiert', type: 'SR_HAT_PROBLEM', description: 'unsortiert' },
    { source: 'doc_mietvertrag', target: 'risk_unsortiert', type: 'SR_HAT_PROBLEM', description: 'Einzelseiten' },
    { source: 'doc_sonstige', target: 'risk_fehlklassifikation', type: 'SR_HAT_PROBLEM', description: 'falsch klassifiziert' },
    { source: 'doc_arztbrief', target: 'risk_fehlklassifikation', type: 'SR_HAT_PROBLEM', description: 'gehört nicht in Akte' },
    { source: 'doc_arztbrief', target: 'risk_datenschutz', type: 'SR_HAT_PROBLEM', description: 'Gesundheitsdaten!' },
    { source: 'doc_nk', target: 'risk_unvollstaendig', type: 'SR_HAT_PROBLEM', description: 'nur 2/4 Seiten' },
    { source: 'doc_ag_bescheinigung', target: 'risk_unvollstaendig', type: 'SR_HAT_PROBLEM', description: 'fehlt ganz' },
    { source: 'doc_unterhalt', target: 'risk_datenschutz', type: 'SR_HAT_PROBLEM', description: 'Kontonummern sichtbar' },
    { source: 'doc_insolvenz', target: 'risk_qualitaet', type: 'SR_HAT_PROBLEM', description: 'Screenshot' },
    { source: 'doc_kontoauszuege', target: 'risk_qualitaet', type: 'SR_HAT_PROBLEM', description: 'Handyfotos' },

    // ── KI-Funktionen → Risiken (LÖST) ──
    { source: 'ai_sortierung', target: 'risk_unsortiert', type: 'SR_LOEST', description: 'löst' },
    { source: 'ai_klassifikation', target: 'risk_fehlklassifikation', type: 'SR_LOEST', description: 'löst' },
    { source: 'ai_ocr', target: 'risk_qualitaet', type: 'SR_LOEST', description: 'löst' },
    { source: 'ai_schwaerzung', target: 'risk_datenschutz', type: 'SR_LOEST', description: 'löst' },
    { source: 'ai_metadaten', target: 'risk_unvollstaendig', type: 'SR_LOEST', description: 'erkennt' },
    { source: 'ai_freitext', target: 'risk_freitext', type: 'SR_LOEST', description: 'löst' },

    // ── KI-Funktionen → Standards (COMPLIANT) ──
    { source: 'ai_ocr', target: 'std_resiscan', type: 'SR_COMPLIANT', description: 'konform mit' },
    { source: 'ai_schwaerzung', target: 'sec_67', type: 'SR_REFERENCES', description: 'gem. §67 SGB X' },
    { source: 'ai_schwaerzung', target: 'sec_art9', type: 'SR_REFERENCES', description: 'gem. Art. 9 DSGVO' },
    { source: 'ai_klassifikation', target: 'std_xdomea', type: 'SR_COMPLIANT', description: 'konform mit' },
    { source: 'ai_sortierung', target: 'std_iso15489', type: 'SR_COMPLIANT', description: 'konform mit' },
    { source: 'ai_metadaten', target: 'std_xdomea', type: 'SR_COMPLIANT', description: 'konform mit' },

    // ── KI → Prozesse (UNTERSTÜTZT) ──
    { source: 'ai_klassifikation', target: 'proc_aktenpflege', type: 'SR_UNTERSTUETZT', description: 'unterstützt' },
    { source: 'ai_ocr', target: 'proc_aktenerschliessung', type: 'SR_UNTERSTUETZT', description: 'unterstützt' },
    { source: 'ai_sortierung', target: 'proc_aktenpflege', type: 'SR_UNTERSTUETZT', description: 'unterstützt' },
    { source: 'ai_schwaerzung', target: 'proc_aktenpflege', type: 'SR_UNTERSTUETZT', description: 'unterstützt' },
    { source: 'ai_freitext', target: 'proc_aktenerschliessung', type: 'SR_UNTERSTUETZT', description: 'unterstützt' },
    { source: 'ai_metadaten', target: 'proc_aktenerschliessung', type: 'SR_UNTERSTUETZT', description: 'unterstützt' },

    // ── Entitäten → Paragraphen ──
    { source: 'ent_bg', target: 'sec_7', type: 'SR_DEFINIERT_DURCH', description: 'definiert durch' },
    { source: 'ent_einkommen', target: 'sec_11', type: 'SR_DEFINIERT_DURCH', description: 'definiert durch' },
    { source: 'ent_einkommen', target: 'sec_11b', type: 'SR_REFERENCES', description: 'Absetzbeträge' },
    { source: 'ent_vermoegen', target: 'sec_12', type: 'SR_DEFINIERT_DURCH', description: 'definiert durch' },
    { source: 'ent_kdu_betrag', target: 'sec_22', type: 'SR_DEFINIERT_DURCH', description: 'definiert durch' },
    { source: 'ent_regelbedarf', target: 'sec_20', type: 'SR_DEFINIERT_DURCH', description: 'definiert durch' },
    { source: 'ent_but', target: 'sec_28', type: 'SR_DEFINIERT_DURCH', description: 'definiert durch' },
    { source: 'ent_vorlaeufig', target: 'sec_41a', type: 'SR_DEFINIERT_DURCH', description: 'definiert durch' },

    // ── Fall → Ereignisse ──
    { source: 'case_becker', target: 'evt_insolvenz', type: 'SR_EREIGNIS', description: 'auslösendes Ereignis' },
    { source: 'case_becker', target: 'evt_antrag', type: 'SR_EREIGNIS', description: 'Antragstellung' },
    { source: 'evt_insolvenz', target: 'evt_antrag', type: 'SR_SEQUENCE', description: 'führt zu' },

    // ── Fall → Prozesse ──
    { source: 'case_becker', target: 'proc_antrag', type: 'SR_DURCHLAEUFT', description: 'durchläuft' },
    { source: 'case_becker', target: 'proc_aktenerschliessung', type: 'SR_DURCHLAEUFT', description: 'benötigt' },

    // ── Fall → E-AKTE ──
    { source: 'case_becker', target: 'ent_eakte', type: 'SR_HAT', description: 'hat E-AKTE' },

    // ── Alle Dokumente → E-AKTE ──
    { source: 'doc_kontoauszuege', target: 'ent_eakte', type: 'SR_IN_AKTE', description: 'in E-AKTE' },
    { source: 'doc_mietvertrag', target: 'ent_eakte', type: 'SR_IN_AKTE', description: 'in E-AKTE' },
    { source: 'doc_lohn', target: 'ent_eakte', type: 'SR_IN_AKTE', description: 'in E-AKTE' },
    { source: 'doc_nk', target: 'ent_eakte', type: 'SR_IN_AKTE', description: 'in E-AKTE' },
    { source: 'doc_kindergeld', target: 'ent_eakte', type: 'SR_IN_AKTE', description: 'in E-AKTE' },
    { source: 'doc_unterhalt', target: 'ent_eakte', type: 'SR_IN_AKTE', description: 'in E-AKTE' },
    { source: 'doc_arztbrief', target: 'ent_eakte', type: 'SR_IN_AKTE', description: 'NICHT in E-AKTE!' },
    { source: 'doc_insolvenz', target: 'ent_eakte', type: 'SR_IN_AKTE', description: 'in E-AKTE' },
    { source: 'doc_sonstige', target: 'ent_eakte', type: 'SR_IN_AKTE', description: 'in E-AKTE' },

    // ── Dokumente → Fachentitäten (Prüfgrundlage) ──
    { source: 'doc_kontoauszuege', target: 'ent_vermoegen', type: 'SR_NACHWEIS', description: 'Nachweis für' },
    { source: 'doc_lohn', target: 'ent_einkommen', type: 'SR_NACHWEIS', description: 'Nachweis für' },
    { source: 'doc_mietvertrag', target: 'ent_kdu_betrag', type: 'SR_NACHWEIS', description: 'Nachweis für' },
    { source: 'doc_kindergeld', target: 'ent_einkommen', type: 'SR_NACHWEIS', description: 'Nachweis für' },
    { source: 'doc_unterhalt', target: 'ent_einkommen', type: 'SR_NACHWEIS', description: 'Nachweis für' },

    // ── Querverweise zwischen Paragraphen ──
    { source: 'sec_9', target: 'sec_11', type: 'SR_REFERENCES', description: 'Einkommen relevant für Bedürftigkeit' },
    { source: 'sec_9', target: 'sec_12', type: 'SR_REFERENCES', description: 'Vermögen relevant für Bedürftigkeit' },
    { source: 'sec_11', target: 'sec_11b', type: 'SR_REFERENCES', description: 'Absetzbeträge bei Erwerbseinkommen' },
    { source: 'sec_60', target: 'sec_66', type: 'SR_REFERENCES', description: 'Folge bei Pflichtverletzung' },
    { source: 'sec_67', target: 'sec_art9', type: 'SR_REFERENCES', description: 'Datenschutzkonkretisierung' },

    // ── Sperrzeit-Check ──
    { source: 'evt_insolvenz', target: 'sec_159', type: 'SR_PRUEFT', description: 'Sperrzeit? → Nein (Insolvenz)' },

    // ── Fehlender Nachweis → Mitwirkungspflicht ──
    { source: 'doc_ag_bescheinigung', target: 'sec_60', type: 'SR_REFERENCES', description: 'Mitwirkungspflicht' },
    { source: 'doc_ag_bescheinigung', target: 'sec_66', type: 'SR_REFERENCES', description: 'Versagungsrisiko' },

    // ── Standards ──
    { source: 'std_grundschutz', target: 'ent_eakte', type: 'SR_APPLIES_TO', description: 'IT-Sicherheit' },
    { source: 'std_esor', target: 'ent_eakte', type: 'SR_APPLIES_TO', description: 'Beweiswerterhaltung' },

    // ── Freitext-Risiko zu allen Docs ──
    { source: 'doc_kontoauszuege', target: 'risk_freitext', type: 'SR_HAT_PROBLEM', description: 'kein Freitext' },
    { source: 'doc_mietvertrag', target: 'risk_freitext', type: 'SR_HAT_PROBLEM', description: 'kein Freitext' },
    { source: 'doc_lohn', target: 'risk_freitext', type: 'SR_HAT_PROBLEM', description: 'kein Freitext' },
  ]

  return { nodes, links }
}

// ────────────────────────────────────────────
// Component
// ────────────────────────────────────────────
export function RELIEFKnowledgeGraph3D() {
  const graphRef = useRef<ForceGraphMethods | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 700 })
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const graphData = useMemo(() => buildCaseData(), [])

  const getNodeId = useCallback((ref: string | { id: string }) => {
    return typeof ref === 'string' ? ref : ref.id
  }, [])

  const isLinkConnectedToSelected = useCallback((link: GraphLink) => {
    if (!selectedNode) return false
    const src = getNodeId(link.source)
    const tgt = getNodeId(link.target)
    return src === selectedNode.id || tgt === selectedNode.id
  }, [getNodeId, selectedNode])

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }
    updateSize()
    const obs = new ResizeObserver(updateSize)
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [isFullscreen])

  useEffect(() => {
    if (graphRef.current) {
      const fg = graphRef.current
      fg.d3Force('charge')?.strength(-120)
      fg.d3Force('link')?.distance((link: GraphLink) => {
        const src = typeof link.source === 'string' ? link.source : link.source.id
        const tgt = typeof link.target === 'string' ? link.target : link.target.id
        const srcNode = graphData.nodes.find(n => n.id === src)
        const tgtNode = graphData.nodes.find(n => n.id === tgt)
        if (srcNode?.type === 'law' || tgtNode?.type === 'law') return 80
        if (srcNode?.type === 'case' || tgtNode?.type === 'case') return 70
        if (srcNode?.type === 'ai' || tgtNode?.type === 'ai') return 65
        if (link.type === 'SR_SEQUENCE') return 40
        return 55
      })
    }
  }, [graphData])

  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode(node)
    if (graphRef.current) {
      const distance = 200
      const distRatio = 1 + distance / Math.hypot(node.x || 0, node.y || 0, node.z || 0)
      graphRef.current.cameraPosition(
        { x: (node.x || 0) * distRatio, y: (node.y || 0) * distRatio, z: (node.z || 0) * distRatio },
        { x: node.x || 0, y: node.y || 0, z: node.z || 0 },
        1200
      )
    }
  }, [])

  const resetCamera = useCallback(() => {
    if (graphRef.current) {
      graphRef.current.cameraPosition({ x: 0, y: 0, z: 600 }, { x: 0, y: 0, z: 0 }, 1500)
    }
    setSelectedNode(null)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch(() => {
        setIsFullscreen(true)
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      }).catch(() => {
        setIsFullscreen(false)
      })
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false)
      }
    }
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const nodeThreeObject = useCallback((node: GraphNode) => {
    const group = new THREE.Group()
    const isSelected = selectedNode?.id === node.id
    const isStartNode = node.id === START_NODE_ID
    const color = NODE_COLORS[node.type] || '#999'
    const size = node.type === 'case' ? 11
      : node.type === 'law' ? 10
      : node.type === 'ai' ? 9
      : node.type === 'person' ? 8
      : node.type === 'risk' ? 7
      : node.type === 'section' ? 7
      : node.type === 'document' ? 6
      : 5

    const geometry = new THREE.SphereGeometry(size, 24, 24)
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.9,
      shininess: 60,
    })
    const sphere = new THREE.Mesh(geometry, material)
    group.add(sphere)

    if (isStartNode) {
      const startRingGeo = new THREE.TorusGeometry(size * 1.45, 0.75, 16, 64)
      const startRingMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#facc15') })
      const startRing = new THREE.Mesh(startRingGeo, startRingMat)
      startRing.rotation.x = Math.PI / 2
      group.add(startRing)

      const startTag = new SpriteText('START') as any
      startTag.color = '#0f172a'
      startTag.textHeight = 3.6
      startTag.backgroundColor = 'rgba(250, 204, 21, 0.98)'
      startTag.padding = [1.8, 4]
      startTag.borderRadius = 3
      startTag.position.y = size + 7
      if (startTag.material) {
        startTag.material.depthTest = false
        startTag.material.depthWrite = false
      }
      startTag.renderOrder = 1001
      group.add(startTag)
    }

    if (isSelected) {
      const selectedRingGeo = new THREE.TorusGeometry(size * 1.65, 0.7, 16, 64)
      const selectedRingMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffffff') })
      const selectedRing = new THREE.Mesh(selectedRingGeo, selectedRingMat)
      selectedRing.rotation.x = Math.PI / 2
      group.add(selectedRing)
    }

    // Glow effect for case, law, and ai nodes
    if (node.type === 'law' || node.type === 'case' || node.type === 'ai') {
      const glowGeo = new THREE.SphereGeometry(size * 1.4, 24, 24)
      const glowMat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.15,
      })
      group.add(new THREE.Mesh(glowGeo, glowMat))
    }

    const label = new SpriteText(node.label) as any
    label.color = '#e2e8f0'
    label.textHeight = node.type === 'case' ? 5.5 : node.type === 'law' ? 5 : node.type === 'ai' ? 4.5 : node.type === 'person' ? 4 : 3.5
    label.backgroundColor = 'rgba(15, 23, 42, 0.75)'
    label.padding = [2, 4]
    label.borderRadius = 3
    label.position.y = -(size + 6)
    group.add(label)

    return group
  }, [selectedNode])

  const linkWidth = useCallback((link: GraphLink) => {
    if (!selectedNode) return 1.5
    return isLinkConnectedToSelected(link) ? 4.8 : 1.2
  }, [isLinkConnectedToSelected, selectedNode])

  const linkColor = useCallback((link: GraphLink) => {
    switch (link.type) {
      case 'SR_CONTAINS': return 'rgba(59, 130, 246, 0.5)'
      case 'SR_REALIZED_BY': return 'rgba(16, 185, 129, 0.5)'
      case 'SR_REFERENCES': return 'rgba(139, 92, 246, 0.4)'
      case 'SR_SEQUENCE': return 'rgba(34, 197, 94, 0.6)'
      case 'SR_BETRIFFT': return 'rgba(244, 114, 182, 0.7)'
      case 'SR_GEHOERT_ZU': return 'rgba(244, 114, 182, 0.4)'
      case 'SR_EINGEREICHT': return 'rgba(251, 191, 36, 0.5)'
      case 'SR_FEHLT': return 'rgba(239, 68, 68, 0.8)'
      case 'SR_HAT_PROBLEM': return 'rgba(249, 115, 22, 0.7)'
      case 'SR_LOEST': return 'rgba(34, 197, 94, 0.8)'
      case 'SR_COMPLIANT': return 'rgba(6, 182, 212, 0.5)'
      case 'SR_UNTERSTUETZT': return 'rgba(34, 197, 94, 0.5)'
      case 'SR_DEFINIERT_DURCH': return 'rgba(99, 102, 241, 0.5)'
      case 'SR_EREIGNIS': return 'rgba(168, 85, 247, 0.6)'
      case 'SR_DURCHLAEUFT': return 'rgba(16, 185, 129, 0.6)'
      case 'SR_HAT': return 'rgba(239, 68, 68, 0.4)'
      case 'SR_IN_AKTE': return 'rgba(251, 191, 36, 0.3)'
      case 'SR_NACHWEIS': return 'rgba(251, 191, 36, 0.6)'
      case 'SR_PRUEFT': return 'rgba(239, 68, 68, 0.6)'
      case 'SR_APPLIES_TO': return 'rgba(6, 182, 212, 0.4)'
      default: return 'rgba(148, 163, 184, 0.3)'
    }
  }, [])

  const linkDirectionalParticles = useCallback((link: GraphLink) => {
    return link.type === 'SR_SEQUENCE' ? 3
      : link.type === 'SR_LOEST' ? 3
      : link.type === 'SR_FEHLT' ? 2
      : link.type === 'SR_HAT_PROBLEM' ? 2
      : 1
  }, [])

  const linkThreeObject = useCallback((link: GraphLink) => {
    if (!selectedNode || !isLinkConnectedToSelected(link)) return null

    const relationText = link.description && link.description.trim().length > 0
      ? link.description
      : link.type.replace('SR_', '').replace(/_/g, ' ')

    const label = new SpriteText(relationText) as any
    label.color = '#f8fafc'
    label.textHeight = 3.6
    label.backgroundColor = 'rgba(15, 23, 42, 0.9)'
    label.padding = [1.5, 3]
    label.borderRadius = 2
    if (label.material) {
      label.material.depthTest = false
      label.material.depthWrite = false
    }
    label.renderOrder = 1000
    return label
  }, [isLinkConnectedToSelected, selectedNode])

  const linkPositionUpdate = useCallback((sprite: THREE.Object3D, coords: { start: { x: number; y: number; z: number }; end: { x: number; y: number; z: number } }) => {
    const middlePos = {
      x: coords.start.x + (coords.end.x - coords.start.x) * 0.5,
      y: coords.start.y + (coords.end.y - coords.start.y) * 0.5,
      z: coords.start.z + (coords.end.z - coords.start.z) * 0.5,
    }
    Object.assign(sprite.position, middlePos)
  }, [])

  // Build adjacency for detail panel
  const nodeLinks = useMemo(() => {
    const map = new Map<string, Array<{ link: GraphLink; otherNode: GraphNode }>>()
    graphData.links.forEach(link => {
      const srcId = typeof link.source === 'string' ? link.source : link.source.id
      const tgtId = typeof link.target === 'string' ? link.target : link.target.id
      const srcNode = graphData.nodes.find(n => n.id === srcId)
      const tgtNode = graphData.nodes.find(n => n.id === tgtId)
      if (srcNode && tgtNode) {
        if (!map.has(srcId)) map.set(srcId, [])
        if (!map.has(tgtId)) map.set(tgtId, [])
        map.get(srcId)!.push({ link, otherNode: tgtNode })
        map.get(tgtId)!.push({ link, otherNode: srcNode })
      }
    })
    return map
  }, [graphData])

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={`Interaktiver 3D Knowledge Graph: RELIEF E-AKTE — ${graphData.nodes.length} Knoten, ${graphData.links.length} Beziehungen. Zeigt SGB-II-Rechtsstruktur der Bedarfsgemeinschaft Becker mit Dokumenten, Gesetzen und KI-Verarbeitungsschritten.`}
      className={`relative rounded-xl overflow-hidden border-2 border-border bg-[#0f172a] ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'w-full h-full'
      }`}
    >
      {/* Controls */}
      <div className="absolute top-3 right-3 z-20 flex gap-2">
        <button
          onClick={resetCamera}
          className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white transition-colors backdrop-blur-sm"
          title="Kamera zurücksetzen"
          aria-label="Kamera zurücksetzen"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white transition-colors backdrop-blur-sm"
          title={isFullscreen ? 'Vollbild beenden' : 'Vollbild'}
          aria-label={isFullscreen ? 'Vollbild beenden' : 'Vollbild aktivieren'}
          aria-pressed={isFullscreen}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" aria-hidden="true" /> : <Maximize2 className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-20 bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 border border-slate-700">
        <div className="text-xs text-slate-400 font-semibold mb-2">Knotentypen</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {(Object.keys(NODE_LABELS) as NodeType[]).map(type => (
            <div key={type} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: NODE_COLORS[type] }}
              />
              <span className="text-[10px] text-slate-300 whitespace-nowrap">{NODE_LABELS[type]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="absolute top-3 left-3 z-20 bg-slate-900/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-700">
        <div className="text-[10px] text-slate-400">
          {graphData.nodes.length} Knoten · {graphData.links.length} Beziehungen
        </div>
        <div className="text-[10px] text-blue-400 font-medium">RELIEF E-AKTE Knowledge Graph</div>
      </div>

      {/* Graph */}
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#0f172a"
        nodeThreeObject={nodeThreeObject}
        onNodeClick={handleNodeClick}
        linkColor={linkColor}
        linkWidth={linkWidth}
        linkOpacity={0.7}
        linkThreeObjectExtend={true}
        linkThreeObject={linkThreeObject}
        linkPositionUpdate={linkPositionUpdate}
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={0.85}
        linkDirectionalParticles={linkDirectionalParticles}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.005}
        enableNodeDrag={true}
        enableNavigationControls={true}
        showNavInfo={false}
      />

      {/* Detail Panel */}
      {selectedNode && (
        <div className="absolute top-14 right-3 z-30 w-80 max-h-[70vh] overflow-y-auto bg-slate-900/95 backdrop-blur-md text-slate-200 rounded-xl border border-slate-600 shadow-2xl">
          <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md p-4 border-b border-slate-700 flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: NODE_COLORS[selectedNode.type] }}
                />
                <span className="text-xs font-medium text-slate-400">{NODE_LABELS[selectedNode.type]}</span>
              </div>
              <h3 className="font-bold text-lg leading-tight truncate">{selectedNode.label}</h3>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="p-1.5 rounded-lg hover:bg-slate-700/80 text-slate-400 hover:text-white transition-colors flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">{selectedNode.description}</p>

            {selectedNode.details && Object.keys(selectedNode.details).length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Details</h4>
                <div className="space-y-1.5">
                  {Object.entries(selectedNode.details).map(([key, val]) => (
                    <div key={key} className="flex gap-2 text-xs">
                      <span className="text-slate-500 font-medium min-w-[100px] flex-shrink-0">{key}:</span>
                      <span className="text-slate-300">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {nodeLinks.has(selectedNode.id) && (
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Beziehungen ({nodeLinks.get(selectedNode.id)!.length})
                </h4>
                <div className="space-y-1">
                  {nodeLinks.get(selectedNode.id)!.map(({ link, otherNode }, i) => (
                    <button
                      key={i}
                      onClick={() => handleNodeClick(otherNode)}
                      className="w-full text-left p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors group flex items-center gap-2"
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: NODE_COLORS[otherNode.type] }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-slate-300 group-hover:text-white truncate">
                          {otherNode.label}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {link.type.replace('SR_', '').replace(/_/g, ' ')} · {link.description || ''}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
