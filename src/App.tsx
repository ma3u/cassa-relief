import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  ArrowRight, 
  Shield, 
  Database, 
  Network, 
  Clock, 
  ChartBar,
  AlertTriangle,
  Users,
  FileText,
  BrainCircuit,
  CheckCircle2,
  TrendingUp,
  Zap,
  Eye,
  ArrowDown,
  Scale,
  Globe,
  BookOpen,
  ShieldCheck,
  Landmark,
  ScrollText,
  Workflow,
  MessageSquare,
  Search,
  GitCompare,
  XCircle,
  CircleCheck,
  Bot,
  Layers,
  Link2,
  ExternalLink,
  Code2,
  Replace,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { RELIEFKnowledgeGraph3D } from "@/components/RELIEFKnowledgeGraph3D"
import { DataModelGraph3D } from "@/components/DataModelGraph3D"

function App() {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null)
  const [activeScenario, setActiveScenario] = useState<number>(0)
  const [showIntroGuide, setShowIntroGuide] = useState<boolean>(true)
  const [isPlayingNarration, setIsPlayingNarration] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const architectureRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.3])

  useEffect(() => {
    const timer = setTimeout(() => setShowIntroGuide(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  // ── Audio narration ──
  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}audio/relief_fall_becker.mp3`)
    audio.volume = 0.8
    audio.addEventListener('ended', () => setIsPlayingNarration(false))
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.removeEventListener('ended', () => setIsPlayingNarration(false))
    }
  }, [])

  const toggleNarration = useCallback(() => {
    if (!audioRef.current) return
    if (isPlayingNarration) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlayingNarration(!isPlayingNarration)
  }, [isPlayingNarration])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }, [isMuted])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // ────────────────────────────────────────────
  // Data: Challenges
  // ────────────────────────────────────────────
  const challenges = [
    {
      icon: FileText,
      title: "Dokumentenflut in der E-AKTE",
      stat: "47+",
      statLabel: "Dokumente pro Antrag",
      description: "Bürgergeld-Anträge erzeugen Dutzende Nachweise: Kontoauszüge, Mietverträge, Lohnabrechnungen, Nebenkostenabrechnungen — eingereicht als Fotos, Scans und Screenshots. Die E-AKTE wird zum Chaos.",
      trend: "Steigend",
      color: "oklch(0.45 0.15 245)"
    },
    {
      icon: AlertTriangle,
      title: "Fehlklassifikation & fehlende Metadaten",
      stat: "30%",
      statLabel: "falsch zugeordnet",
      description: "Dokumente werden als „Sonstiges“ klassifiziert, Metadaten fehlen, Freitexte existieren nicht. Sachbearbeitende müssen jedes Dokument einzeln sichten, um den Inhalt zu verstehen.",
      trend: "Kritisch",
      color: "oklch(0.55 0.20 55)"
    },
    {
      icon: Shield,
      title: "Datenschutz-Risiken",
      stat: "§67",
      statLabel: "SGB X Sozialdatenschutz",
      description: "Gesundheitsdaten (Arztbriefe), Kontonummern und Geburtsdaten landen ungeschwärzt in der Leistungsakte. Fehlende automatische Schwärzung verstößt gegen DSGVO Art. 9 und §67 SGB X.",
      trend: "DSGVO-Risiko",
      color: "oklch(0.50 0.18 25)"
    },
    {
      icon: Users,
      title: "Fachkräftemangel in den gE",
      stat: "75.000",
      statLabel: "Beschäftigte in gE",
      description: "Aktenerschließung und Aktenpflege binden erhebliche Arbeitszeit der Fachkräfte. Jede Minute für manuelle Aktenarbeit fehlt bei der eigentlichen Leistungsbemessung.",
      trend: "Entlastung nötig",
      color: "oklch(0.45 0.12 200)"
    }
  ]

  // ────────────────────────────────────────────
  // Data: 4-Layer Document AI Pipeline (RELIEF)
  // ────────────────────────────────────────────
  const layers = [
    {
      number: 1,
      title: "Normative Schicht",
      subtitle: "Gesetzeshierarchie SGB II",
      description: "Rechtsgrundlagen der Grundsicherung: SGB II (Leistungen), SGB I (Mitwirkung), SGB X (Sozialdatenschutz), DSGVO. Jeder Paragraph definiert Regeln für die Aktenführung und Leistungsbemessung.",
      icon: Shield,
      color: "oklch(0.35 0.12 245)",
      examples: ["SGB II §7–§41a", "§60/§66 SGB I", "§67 SGB X", "DSGVO Art. 9"]
    },
    {
      number: 2,
      title: "Dokumenten-Schicht",
      subtitle: "Klassifikation & Extraktion",
      description: "KI-gestützte Dokumentenerkennung: Kontoauszüge, Mietverträge, Lohnabrechnungen werden automatisch klassifiziert. OCR extrahiert Text aus Fotos und Scans, Metadaten werden zugeordnet.",
      icon: FileText,
      color: "oklch(0.45 0.15 200)",
      examples: ["Dokumentenklassifikation", "OCR/Texterkennung", "Metadaten-Extraktion", "Qualitätsbewertung"]
    },
    {
      number: 3,
      title: "Prozedurale Schicht",
      subtitle: "BPMN-Prozesse & Geschäftsregeln",
      description: "Geschäftsprozesse der gE als BPMN 2.0: Antragsaufnahme, BG-Prüfung, Einkommensprüfung, KdU-Berechnung. Entscheidungslogik formalisiert als DMN-Tabellen — keine Black-Box-Berechnung mehr.",
      icon: ChartBar,
      color: "oklch(0.50 0.18 160)",
      examples: ["BPMN-Prozessmodelle", "DMN-Entscheidungstabellen", "Regelbasierte Prüfung", "Erklärbare Bescheide"]
    },
    {
      number: 4,
      title: "Fallbezogener Overlay",
      subtitle: "Bedarfsgemeinschaft & Nachweise",
      description: "Konkreter Fall: Familie Becker — 5 Personen, 47 Dokumente, schwankendes Einkommen, Unterhaltszahlungen. Alle Nachweise werden den Personen und Prüfschritten im Knowledge Graph zugeordnet.",
      icon: Database,
      color: "oklch(0.55 0.20 55)",
      examples: ["Bedarfsgemeinschaft", "Einkommensnachweise", "KdU-Dokumente", "Datenschutz-Prüfung"]
    }
  ]

  // ────────────────────────────────────────────
  // Data: Scenarios (from RELIEF_DEMO_PLAN)
  // ────────────────────────────────────────────
  const scenarios = [
    {
      title: "Aktenerschließung",
      description: "Sachbearbeiterin öffnet E-AKTE mit 47 Dokumenten — RELIEF klassifiziert, sortiert und beschriftet automatisch. Statt 45 Minuten manuellem Sichten sind alle Dokumente in Sekunden erschlossen.",
      benefits: [
        "Automatische Klassifikation: Kontoauszüge, Mietvertrag, Lohnabrechnungen, Kindergeldbescheid sofort erkannt",
        "OCR-Texterkennung für Fotos und Scans — auch handschriftliche Notizen",
        "Metadaten-Extraktion: Datum, Absender, zugehörige Person der BG automatisch zugeordnet",
        "Freitextgenerierung: „Kontoauszug Sparkasse Dortmund, Thomas Becker, Jan. 2026, S. 1/3“"
      ],
      icon: FileText,
      color: "oklch(0.45 0.15 245)",
      impact: "Aktenerschließung von 45 Min. auf Sekunden"
    },
    {
      title: "Aktenpflege",
      description: "Unsortierte Einzelseiten, falsche Dokumententypen, fehlende Seiten — RELIEF bereinigt die E-AKTE und stellt eine sachlogische Ordnung her.",
      benefits: [
        "Einzelseiten-Zusammenführung: 15 Mietvertrag-Fotos → ein vollständiges Dokument",
        "Chronologische und sachliche Sortierung: Dokumente nach Prüfschritt und Zeitraum geordnet",
        "Vollständigkeitsprüfung: Fehlende Arbeitgeberbescheinigung automatisch erkannt → Mitwirkungsanforderung",
        "Reklassifikation: „Sonstiges“-Dokumente werden korrekt als Nebenkostenabrechnung, Insolvenzbekanntmachung etc. erkannt"
      ],
      icon: Workflow,
      color: "oklch(0.50 0.18 160)",
      impact: "Geordnete, vollständige Akte in Minuten statt Stunden"
    },
    {
      title: "Datenschutz-Compliance",
      description: "DSGVO Art. 9, §67 SGB X — Gesundheitsdaten und sensible Informationen müssen identifiziert und geschützt werden. RELIEF erkennt kritische Inhalte automatisch.",
      benefits: [
        "Arztbrief Sophie als Gesundheitsdaten erkannt → darf nicht in Leistungsakte → automatisches Flag",
        "Kontonummern und Geburtsdaten auf Unterhaltsurkunde → Schwärzungsvorschlag",
        "Prüfung gegen §67 SGB X und DSGVO Art. 9 im Knowledge Graph verankert",
        "Audit-Trail: Jede Schwärzung und jedes Flag wird dokumentiert und ist nachvollziehbar"
      ],
      icon: Shield,
      color: "oklch(0.55 0.20 55)",
      impact: "Automatische DSGVO-Compliance statt manueller Prüfung"
    },
    {
      title: "Onboarding & Wissenstransfer",
      description: "Neue Mitarbeitende in der gE verstehen Aktenstrukturen, Dokumententypen und Prüfschritte — interaktiv im Knowledge Graph statt mit 200-Seiten-Handbüchern.",
      benefits: [
        "Navigierbarer Wissensgraph: Von §7 BG-Definition über Prüfschritte bis zum konkreten Dokument explorieren",
        "Verknüpfung sichtbar: Warum braucht die KdU-Prüfung den Mietvertrag? Graph zeigt die Verbindung",
        "E-AKTE-Probleme und deren RELIEF-Lösungen als verknüpfte Knoten — Lerneffekt bei der Arbeit",
        "Standards (TR-RESISCAN, xdomea) als Kontext — warum bestimmte Qualitätsanforderungen gelten"
      ],
      icon: Users,
      color: "oklch(0.45 0.12 200)",
      impact: "Einarbeitungszeit von Wochen auf Tage reduzieren"
    },
    {
      title: "Prozessmodernisierung",
      description: "Legacy-Systeme in Visual Basic und COBOL berechnen Leistungen als ‚Black Box' — niemand kann erklären, warum ein Bescheid genau diesen Betrag ausweist. CASSA ersetzt diese schrittweise durch transparente, regelbasierte Systeme.",
      benefits: [
        "BPMN 2.0: Geschäftsprozesse werden als lesbare Diagramme modelliert — Sachbearbeiter und Juristen können sie prüfen",
        "DMN-Entscheidungstabellen: Freibeträge, Regelbedarfe und Anrechnungsregeln als nachvollziehbare Tabellen statt unlesbarem Code",
        "Erklärbare Bescheide: ‚1.247,63 € weil Regel X auf Einkommen Y' — Begründungspflicht (§35 SGB X) automatisch erfüllt",
        "Schrittweise Ablösung: Neues und altes System laufen parallel — Umstellung erst bei nachgewiesener Übereinstimmung"
      ],
      icon: Replace,
      color: "oklch(0.50 0.15 290)",
      impact: "Von Black Box zu erklärbarer Entscheidung"
    }
  ]

  // ────────────────────────────────────────────
  // Data: KI-gestützt vs. Manuelle Aktenarbeit
  // ────────────────────────────────────────────
  const ragComparisons = [
    {
      title: "Dokumentenklassifikation: 47 Eingänge",
      question: "Wie werden 47 eingereichte Dokumente (Fotos, Scans, PDFs) korrekt klassifiziert und der Akte zugeordnet?",
      graphAnswer: {
        result: "Automatisch klassifiziert in Sekunden",
        explanation: "RELIEF traversiert den Knowledge Graph: Bildanalyse → OCR → Dokumententyp-Erkennung → Person-Zuordnung via BG-Graph (§7 SGB II). 12 Kontoauszüge werden als zusammengehörig erkannt, dem richtigen BG-Mitglied zugeordnet und chronologisch sortiert. 3 „Sonstiges“-Dokumente werden als Nebenkostenabrechnung, Insolvenzbekanntmachung und Arbeitgeberbescheinigung reklassifiziert."
      },
      vectorAnswer: {
        result: "Manuelle Sichtung: 45+ Minuten",
        explanation: "Sachbearbeiterin muss jedes der 47 Dokumente einzeln öffnen, den Inhalt lesen, den Dokumententyp im System auswählen und die zugehörige Person manuell zuordnen. Bei Fotos von Kontoauszügen ist die Reihenfolge unklar, Zusammenhänge fehlen. 3 Dokumente bleiben als „Sonstiges“ liegen."
      }
    },
    {
      title: "Datenschutz: Gesundheitsdaten in der Akte",
      question: "Arztbrief Sophie (14) wurde mit den Unterlagen eingereicht — enthält Gesundheitsdaten. Darf er in die Leistungsakte?",
      graphAnswer: {
        result: "Automatisch erkannt und geflaggt",
        explanation: "RELIEF erkennt via OCR + NER: „Arztbrief“, „Diagnose“, Personenname Sophie. Knowledge Graph: Dokument → Typ „Arztbrief“ → verknüpft mit §67 SGB X (Sozialdatenschutz) + DSGVO Art. 9 (besondere Kategorien). Ergebnis: Automatisches Flag „Gesundheitsdaten — nicht in Leistungsakte“. Schwärzungsvorschlag für sensible Daten auf der Unterhaltsurkunde (Kontonummern, Geburtsdaten)."
      },
      vectorAnswer: {
        result: "Risiko: Verstoß übersehen",
        explanation: "Manuell muss die Sachbearbeiterin erkennen, dass ein Arztbrief nicht in die Leistungsakte gehört — besonders wenn er zwischen 46 anderen Dokumenten liegt. Ohne systematische Prüfung besteht das Risiko, dass Gesundheitsdaten eines Kindes unrechtmäßig gespeichert werden. §67 SGB X und DSGVO Art. 9 werden nicht automatisch geprüft."
      }
    },
    {
      title: "Vollständigkeitsprüfung: Fehlende Nachweise",
      question: "Wurden alle für die Leistungsbemessung erforderlichen Nachweise eingereicht?",
      graphAnswer: {
        result: "Fehlende Dokumente sofort identifiziert",
        explanation: "RELIEF traversiert den Prüfgraph: §11 SGB II (Einkommen) → benötigt Arbeitgeberbescheinigung → nicht in 47 Dokumenten vorhanden → automatische Mitwirkungsanforderung nach §60 SGB I. Nebenkostenabrechnung unvollständig (2 von 4 Seiten) → KI erkennt fehlende Seiten. Kindergeldbescheid mit veraltetem Datum → Aktualisierung angefordert."
      },
      vectorAnswer: {
        result: "Lücken erst bei Bearbeitung entdeckt",
        explanation: "Sachbearbeiterin bemerkt fehlende Arbeitgeberbescheinigung erst bei der Einkommensprüfung — Wochen nach Antragseingang. Unvollständige Nebenkostenabrechnung fällt möglicherweise gar nicht auf. Veralteter Kindergeldbescheid wird ggf. nicht als Problem erkannt. Jede Nachforderung verlängert die Bearbeitungszeit um Wochen."
      }
    },
    {
      title: "Einzelseiten-Zusammenführung",
      question: "15 Fotoaufnahmen eines Mietvertrags — wie werden sie zu einem Dokument?",
      graphAnswer: {
        result: "Automatische Erkennung und Zusammenführung",
        explanation: "RELIEF analysiert: Ähnliches Layout, fortlaufende Seitenzahlen, gleicher Briefkopf → gehören zusammen. OCR extrahiert Vertragsbeginn, Kaltmiete (780 €), Nebenkosten (220 €) → Metadaten für KdU-Prüfung (§22 SGB II) automatisch zugeordnet. Freitext: „Mietvertrag, Wohnung Dortmund-Hörde, 90m², 1.000 € warm, Familie Becker“."
      },
      vectorAnswer: {
        result: "15 Einzelseiten bleiben lose in der Akte",
        explanation: "Ohne KI bleiben die 15 Fotos als separate Einträge in der E-AKTE. Sachbearbeiterin muss manuell erkennen, dass sie zusammengehören, die Reihenfolge bestimmen und den Mietvertrag gedanklich rekonstruieren. Die Mietdaten müssen manuell aus den Fotos abgelesen und in die KdU-Berechnung übernommen werden."
      }
    }
  ]

  // ────────────────────────────────────────────
  // Data: RELIEF Document AI API
  // ────────────────────────────────────────────
  const chatApiStandards = [
    {
      name: "Dokumenten-Klassifikation & OCR",
      endpoint: "POST /api/v1/classify",
      description: "IBM Granite-Docling-258M: Spezialisiertes Vision-Language-Modell (258M Parameter) wandelt Fotos, Scans und Screenshots in strukturierten Text um. Erkennt Dokumententyp, Layout und Tabellenstruktur — auch bei Handyfotos von Kontoauszügen.",
      adoptedBy: "IBM Granite-Docling-258M, Docling Framework, RapidOCR",
      url: "https://huggingface.co/ds4sd/docling-ibm-granite-258m-preview",
      color: "#10b981"
    },
    {
      name: "PII-Erkennung (Schwärzung)",
      endpoint: "POST /api/v1/redact",
      description: "GLiNER-PII-Large (Zero-Shot NER): Erkennt IBAN, Geburtsdaten, Gesundheitsdaten und Kontonummern — auch in nicht-standardformatierten Dokumenten. Kombiniert mit Microsoft Presidio für Regex-Validierung und Schwärzung.",
      adoptedBy: "GLiNER-PII-Large, Microsoft Presidio, spaCy de_core_news_lg",
      url: "https://huggingface.co/knowledgator/gliner-pii-large-v1.0",
      color: "#f59e0b"
    },
    {
      name: "Freitextgenerierung",
      endpoint: "POST /api/v1/extract",
      description: "Llama 3 / IBM Granite (lokal): Generiert beschreibende Freitexte für jedes Dokument aus dem extrahierten Inhalt — z.B. 'Kontoauszug Sparkasse Dortmund, Thomas Becker, Jan. 2026, S. 1/3'. Vollständig lokal, keine Cloud.",
      adoptedBy: "Llama 3 (Meta), IBM Granite, Ollama (lokal)",
      url: "https://llama.meta.com/",
      color: "#8b5cf6"
    },
    {
      name: "Knowledge Graph API",
      endpoint: "POST /api/v1/graph/query",
      description: "Neo4j-Wissensgraph: Verknüpft Dokumente mit Gesetzen (§§ SGB II), Personen der BG, Prüfschritten und KI-Ergebnissen. Cypher-Abfragen für Vollständigkeitsprüfung und Compliance-Checks.",
      adoptedBy: "Neo4j, GraphRAG, LangChain Graph",
      url: "https://neo4j.com/",
      color: "#3b82f6"
    }
  ]

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatePresence>
        {showIntroGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Card className="shadow-2xl border-2 border-accent">
              <CardContent className="p-6 flex items-center gap-4">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown className="h-6 w-6 text-accent" />
                </motion.div>
                <div>
                  <p className="font-semibold text-foreground">Scrollen Sie, um mehr zu erfahren</p>
                  <p className="text-sm text-muted-foreground">Interaktive Elemente erwarten Sie</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HEADER ── */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-3">
            <SopraLogo />
            <Separator orientation="vertical" className="h-8 hidden md:block" />
            <span className="text-sm font-medium text-muted-foreground hidden md:block">CASSA · RELIEF</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('architecture')} className="hidden md:flex">
              Architektur
            </Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('fall-becker')} className="hidden md:flex">
              Fall Becker
            </Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('ki-vs-manuell')} className="hidden md:flex">
              KI vs. Manuell
            </Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('document-ai')} className="hidden md:flex">
              Document AI
            </Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('scenarios')} className="hidden md:flex">
              Szenarien
            </Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('tech-stack')} className="hidden md:flex">
              Technologie
            </Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('process-modernization')} className="hidden md:flex">
              Prozesse
            </Button>
            <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href="https://www.soprasteria.de/products/cassa" target="_blank" rel="noopener noreferrer">
                Mehr erfahren
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <motion.section style={{ opacity: heroOpacity }} className="hero-pattern py-32 md:py-40 relative overflow-hidden">
        <AnimatedBackground />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-6 bg-accent text-accent-foreground text-base px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                KI-gestützte E-AKTE-Erschließung + Knowledge Graph
              </Badge>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-foreground leading-tight">
              KI-Assistent für die E-AKTE der Grund&shy;sicherung
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
              Wie RELIEF mit Document AI und einem Knowledge Graph die Aktenarbeit in den gemeinsamen Einrichtungen 
              transformiert — automatische Klassifikation, Schwärzung und Sortierung statt manueller Sichtung.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 h-14 shadow-lg hover:shadow-xl transition-shadow"
              >
                <a href="https://www.soprasteria.de/products/cassa" target="_blank" rel="noopener noreferrer">
                  <BrainCircuit className="mr-2 h-5 w-5" />
                  CASSA entdecken
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-10 h-14 border-2"
                onClick={() => scrollToSection('challenges')}
              >
                Herausforderungen verstehen
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION: Herausforderungen ── */}
      <section id="challenges" className="py-24 bg-muted/30 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 text-base px-4 py-2">
              <Eye className="h-4 w-4 mr-2" />
              Schritt 1: Das Problem verstehen
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Die Herausforderungen der E-AKTE
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              75.000 Beschäftigte in den gemeinsamen Einrichtungen bearbeiten jährlich Millionen Bürgergeld-Anträge —
              mit Dutzenden Nachweisen pro Fall, die in der E-AKTE strukturiert geführt werden müssen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-2 hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="p-4 rounded-xl"
                          style={{ backgroundColor: `${challenge.color}15` }}
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="h-8 w-8" style={{ color: challenge.color }} />
                        </motion.div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors">
                            {challenge.title}
                          </CardTitle>
                          <div className="flex items-center gap-3 mb-3">
                            <div>
                              <div className="text-3xl font-bold" style={{ color: challenge.color }}>
                                {challenge.stat}
                              </div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                                {challenge.statLabel}
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-sm font-semibold">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {challenge.trend}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{challenge.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION: Warum reine LLMs nicht genügen ── */}
      <section className="py-24 bg-card relative">
        <div className="absolute inset-0 bg-destructive/5"></div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-destructive/10 text-destructive border-destructive/20 text-base px-4 py-2">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Schritt 2: Warum manuelle Aktenarbeit nicht skaliert
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Manuelle E-AKTE-Pflege am Limit
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Aktenerschließung und Aktenpflege sind Voraussetzung für die Leistungsbemessung — aber kein eigenständiger 
              Gegenstand der Wertschöpfung. Die manuelle Bearbeitung bindet erhebliche Arbeitszeit und ist fehleranfällig.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Einzelseiten ohne Zusammenhang",
                description: "15 Fotoaufnahmen eines Mietvertrags liegen als separate Einträge in der E-AKTE. Sachbearbeitende müssen manuell erkennen, dass sie zusammengehören, die Reihenfolge bestimmen und den Vertrag gedanklich rekonstruieren.",
                icon: FileText
              },
              {
                title: "Fehlklassifikation verschleiert Inhalte",
                description: "Dokumente als „Sonstiges“ klassifiziert — Sachbearbeitende müssen jedes Dokument öffnen, um den Inhalt zu erkennen. Bei 47 Eingängen summiert sich das zu erheblichem Zeitverlust.",
                icon: AlertTriangle
              },
              {
                title: "Datenschutz-Verstöße vorprogrammiert",
                description: "Gesundheitsdaten (Arztbrief), Kontonummern und Geburtsdaten liegen ungeschwärzt in der Akte. Ohne automatische Erkennung werden DSGVO Art. 9 und §67 SGB X systematisch verletzt.",
                icon: Shield
              }
            ].map((problem, index) => {
              const Icon = problem.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-destructive/5 border-2 border-destructive/20 hover:border-destructive/40 transition-colors">
                    <CardHeader>
                      <div className="mb-4">
                        <Icon className="h-10 w-10 text-destructive" />
                      </div>
                      <CardTitle className="text-xl leading-tight">{problem.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed">{problem.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION: Architektur (4-Layer Ontologie) ── */}
      <section id="architecture" ref={architectureRef} className="py-32 bg-primary/5 network-pattern relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 bg-primary text-primary-foreground text-base px-4 py-2">
              <BrainCircuit className="h-4 w-4 mr-2" />
              Schritt 3: Die RELIEF-Lösung
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Document AI Pipeline + Knowledge Graph
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              RELIEF kombiniert Document AI (Klassifikation, OCR, Schwärzung) mit einem Neo4j-Wissensgraphen — 
              Gesetze, Prozesse, Dokumente und KI-Funktionen als navigierbarer Knowledge Graph.
            </p>
            <p className="text-base text-primary font-semibold">
              👆 Klicken Sie auf die Schichten, um mehr zu erfahren
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            <div className="space-y-4">
              {layers.map((layer, index) => {
                const Icon = layer.icon
                const isSelected = selectedLayer === index
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? 'ring-4 ring-primary shadow-2xl scale-105' 
                          : 'hover:shadow-lg hover:scale-102'
                      }`}
                      onClick={() => setSelectedLayer(isSelected ? null : index)}
                    >
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <motion.div 
                            className="p-4 rounded-xl"
                            style={{ backgroundColor: `${layer.color}15` }}
                            animate={{ scale: isSelected ? [1, 1.1, 1] : 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className="h-8 w-8" style={{ color: layer.color }} />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge 
                                variant="outline"
                                className="text-sm"
                                style={{ borderColor: layer.color, color: layer.color }}
                              >
                                Schicht {layer.number}
                              </Badge>
                              <CardTitle className="text-xl">{layer.title}</CardTitle>
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">{layer.subtitle}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0">
                              <Separator className="mb-4" />
                              <p className="text-muted-foreground leading-relaxed mb-4">{layer.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {layer.examples.map((example, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{example}</Badge>
                                ))}
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="sticky top-24 h-[700px] relative"
            >
              <RELIEFKnowledgeGraph3D />
              {/* Narration Play Button — overlaying the 3D graph */}
              <div className="absolute bottom-5 right-5 z-30 flex items-center gap-3">
                <button
                  onClick={toggleNarration}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-105 backdrop-blur-sm"
                >
                  {isPlayingNarration ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                  <span className="text-sm font-medium">{isPlayingNarration ? 'Pause' : 'Fall Becker anhören'}</span>
                </button>
                {isPlayingNarration && (
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white transition-colors backdrop-blur-sm"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION: Fall Becker — E-AKTE-Fall ── */}
      <section id="fall-becker" className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-red-600 text-white text-base px-4 py-2">
              <FileText className="h-4 w-4 mr-2" />
              Praxisbeispiel: Komplexer E-AKTE-Fall
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Fall Familie Becker — BG-Nr. 412K-078263-B
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ein Bürgergeld-Antrag mit 5-Personen-Bedarfsgemeinschaft, 47 eingereichten Dokumenten,
              schwankendem Einkommen und Datenschutz-Problematik — 14 Prüfpunkte, 5 Sozialgesetzbücher, 1 E-AKTE.
            </p>
          </motion.div>

          {/* Audio Player Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
              <CardContent className="py-5 px-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleNarration}
                    className="flex-shrink-0 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    {isPlayingNarration ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">Fall Becker — Narration</p>
                    <p className="text-sm text-muted-foreground">
                      {isPlayingNarration ? 'Spielt...' : 'Hören Sie die Fallanalyse (ca. 6 Min.)'}
                    </p>
                  </div>
                  <button
                    onClick={toggleMute}
                    className="flex-shrink-0 p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Case Timeline */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Left: Person & Case Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-pink-500/10">
                        <Users className="h-6 w-6 text-pink-500" />
                      </div>
                      <div>
                        <CardTitle>Bedarfsgemeinschaft Becker</CardTitle>
                        <CardDescription>BG-Nr. 412K-078263-B, Dortmund-Hörde</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-muted-foreground text-xs">Antragsteller</div>
                        <div className="font-medium">Thomas Becker (45)</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-muted-foreground text-xs">Partnerin</div>
                        <div className="font-medium">Leila Becker geb. Kaya (37)</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-muted-foreground text-xs">Kinder in der BG</div>
                        <div className="font-medium">Sophie (14), Can (6), Emma (9 Mo.)</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-muted-foreground text-xs">Wohnung</div>
                        <div className="font-medium">90m², 1.000 € warm</div>
                      </div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-sm">
                      <div className="text-muted-foreground text-xs mb-1">Eingereichte Nachweise</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-primary/20 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }} />
                        </div>
                        <span className="font-mono font-medium">47 Dokumente</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Fotos, Scans, PDFs über jobcenter.digital und Post</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Right: Complexity Indicators */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-red-500/10">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <CardTitle>E-AKTE-Probleme im Fall Becker</CardTitle>
                        <CardDescription>12 Probleme in 47 Dokumenten, 14 Prüfpunkte</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { label: '12 Kontoauszüge als unsortierte Fotos', desc: 'Keine chronologische Reihenfolge, kein Dokumentenzusammenhang', color: 'text-red-500' },
                      { label: 'Arztbrief Sophie = Gesundheitsdaten', desc: 'Darf nicht in Leistungsakte → §67 SGB X, DSGVO Art. 9', color: 'text-purple-500' },
                      { label: 'Mietvertrag: 15 Einzelseiten', desc: 'Fotoaufnahmen ohne automatische Zusammenführung', color: 'text-blue-500' },
                      { label: 'Arbeitgeberbescheinigung fehlt', desc: 'Vollständigkeitsprüfung → §60 SGB I Mitwirkungspflicht', color: 'text-amber-500' },
                      { label: '3 Dokumente als „Sonstiges“', desc: 'Fehlklassifikation verhindert sachgerechte Aktenführung', color: 'text-green-500' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <span className={`${item.color} font-bold text-lg leading-none mt-0.5`}>!</span>
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-muted-foreground text-xs">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Timeline Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Dokumenten-Eingang — 47 Nachweise im Überblick
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { period: '12×', label: 'Kontoauszüge', color: 'bg-blue-500', type: 'Fotos, unsortiert, 3 Monate' },
                      { period: '15×', label: 'Mietvertrag', color: 'bg-indigo-500', type: 'Einzelseiten, Fotoaufnahmen' },
                      { period: '3×', label: 'Lohnabrechnungen', color: 'bg-sky-400', type: 'Leila, schwankendes Layout' },
                      { period: '2/4', label: 'NK-Abrechnung', color: 'bg-amber-500', type: 'Unvollständig! 2 Seiten fehlen' },
                      { period: '1×', label: 'Kindergeldbescheid', color: 'bg-green-500', type: 'Veraltet (2024 statt 2026)' },
                      { period: '1×', label: 'Unterhaltsurkunde', color: 'bg-pink-500', type: 'Sensible Daten sichtbar!' },
                      { period: '1×', label: 'Arztbrief', color: 'bg-red-500', type: 'Gesundheitsdaten! Nicht in Akte!' },
                      { period: '1×', label: 'Insolvenz-Screenshot', color: 'bg-purple-500', type: 'Screenshot statt Dokument' },
                      { period: '0×', label: 'AG-Bescheinigung', color: 'bg-red-600', type: 'FEHLT! §60 SGB I' },
                      { period: '3×', label: '„Sonstiges“', color: 'bg-gray-500', type: 'Fehlklassifiziert' },
                    ].map((item, i) => (
                      <TooltipProvider key={i}>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className={`${item.color} text-white rounded-lg px-3 py-2 text-xs font-medium cursor-help transition-transform hover:scale-105`}>
                              <div className="font-bold">{item.period}</div>
                              <div className="opacity-80">{item.label}</div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.type}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Graph traversal explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-primary" />
                    RELIEF-Pipeline: Die Verarbeitungskette im Knowledge Graph
                  </CardTitle>
                  <CardDescription>
                    So verarbeitet RELIEF die 47 Dokumente — automatisch, nachvollziehbar und DSGVO-konform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    {[
                      { text: 'E-AKTE Becker', color: 'bg-red-500' },
                      { text: 'Klassifikation', color: 'bg-indigo-500' },
                      { text: 'OCR & Extraktion', color: 'bg-purple-500' },
                      { text: 'Metadaten-Zuordnung', color: 'bg-blue-500' },
                      { text: 'Schwärzung (§67 SGB X)', color: 'bg-pink-500' },
                      { text: 'Sortierung & Zusammenführung', color: 'bg-green-500' },
                      { text: 'Vollständigkeitsprüfung', color: 'bg-amber-500' },
                      { text: 'Freitextgenerierung', color: 'bg-cyan-500' },
                    ].map((node, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Badge className={`${node.color} text-white border-0`}>
                          {node.text}
                        </Badge>
                        {i < 7 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Manuelle Aktenarbeit erfordert sequenzielles Sichten aller 47 Dokumente. RELIEF parallelisiert die Verarbeitung: 
                    Klassifikation und OCR laufen gleichzeitig, der Knowledge Graph verknüpft jedes Dokument automatisch mit 
                    dem zugehörigen Prüfschritt und der betroffenen Person — und prüft dabei DSGVO-Compliance in Echtzeit.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION: KI-gestützt vs. Manuelle Aktenarbeit ── */}
      <section id="ki-vs-manuell" className="py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 text-base px-4 py-2">
              <GitCompare className="h-4 w-4 mr-2" />
              Schritt 4: Warum KI-gestützte Aktenarbeit?
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              RELIEF KI vs. manuelle Aktenarbeit
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Manuelle Aktenarbeit ist zeitaufwändig und fehleranfällig — RELIEF automatisiert die <strong>Aktenerschließung und Aktenpflege</strong>.
              Hier sind konkrete Beispiele aus dem Fall Familie Becker.
            </p>
          </motion.div>

          {/* Summary comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            <Card className="border-2 border-destructive/30 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Manuelle Aktenarbeit — Limitierungen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Jedes Dokument einzeln öffnen, lesen, zuordnen — 47 Dokumente = 45+ Minuten",
                  "Zusammengehörige Einzelseiten (Mietvertrag: 15 Fotos) werden nicht automatisch erkannt",
                  "Sensible Daten (Gesundheit, Kontonummern) werden bei Zeitdruck leicht übersehen",
                  "Fehlende Nachweise fallen erst bei der Bearbeitung auf — Wochen nach Antragseingang",
                  "Kein systematischer DSGVO-Check: §67 SGB X und Art. 9 DSGVO nicht automatisch geprüft"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <XCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500/30 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CircleCheck className="h-5 w-5 text-green-600" />
                  RELIEF KI — Vorteile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Automatische Klassifikation aller 47 Dokumente in Sekunden — mit Confidence-Score",
                  "Einzelseiten-Erkennung: 15 Mietvertrag-Fotos → ein zusammengeführtes Dokument",
                  "Datenschutz-Flags: Arztbrief, Kontonummern, Geburtsdaten sofort erkannt und markiert",
                  "Vollständigkeitsprüfung: Fehlende Arbeitgeberbescheinigung sofort identifiziert",
                  "Knowledge Graph verknüpft jedes Dokument mit §§, Prüfschritten und Personen der BG"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <CircleCheck className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Concrete failure examples */}
          <h3 className="text-2xl font-bold text-center mb-8">Konkrete Beispiele: RELIEF vs. manuelle Bearbeitung</h3>
          <div className="space-y-8 max-w-5xl mx-auto">
            {ragComparisons.map((comp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-2 hover:shadow-xl transition-shadow overflow-hidden">
                  <CardHeader className="bg-primary/5">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="text-sm font-bold flex-shrink-0">
                        Beispiel {index + 1}
                      </Badge>
                      <div>
                        <CardTitle className="text-lg mb-2">{comp.title}</CardTitle>
                        <CardDescription className="text-base">
                          <span className="font-semibold text-foreground">Frage:</span> '{comp.question}"
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                      {/* RELIEF KI */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <CircleCheck className="h-5 w-5 text-green-600" />
                          <span className="font-bold text-green-700">RELIEF KI</span>
                          <Badge className="bg-green-100 text-green-800 text-xs">{comp.graphAnswer.result}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{comp.graphAnswer.explanation}</p>
                      </div>
                      {/* Manuell */}
                      <div className="p-6 bg-destructive/3">
                        <div className="flex items-center gap-2 mb-3">
                          <XCircle className="h-5 w-5 text-destructive" />
                          <span className="font-bold text-destructive">Manuell</span>
                          <Badge className="bg-red-100 text-red-800 text-xs">{comp.vectorAnswer.result}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{comp.vectorAnswer.explanation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: Document AI Standards ── */}
      <section id="document-ai" className="py-32 bg-muted/30 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 text-base px-4 py-2">
              <MessageSquare className="h-4 w-4 mr-2" />
              Schritt 5: RELIEF Document AI API
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Document AI API für die E-AKTE
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              RELIEF implementiert eine modulare API-Architektur: Dokumentenklassifikation, OCR-Extraktion, 
              automatische Schwärzung und Knowledge-Graph-Abfragen — als REST-Endpunkte für die gE-Systeme.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {chatApiStandards.map((api, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: api.color }} />
                      <CardTitle className="text-base">
                      <a href={api.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                        {api.name}
                        <ExternalLink className="h-3 w-3 opacity-50" />
                      </a>
                    </CardTitle>
                    </div>
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono text-primary">{api.endpoint}</code>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{api.description}</p>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-semibold">Genutzt von:</span> {api.adoptedBy}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CASSA API Detail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-primary/30 bg-primary/5 max-w-5xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Bot className="h-6 w-6 text-primary" />
                  RELIEF Document AI — Klassifikation + Knowledge Graph
                </CardTitle>
                <CardDescription>
                  Die RELIEF API verarbeitet Dokumente und verknüpft sie automatisch mit dem Knowledge Graph der gE.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      POST /api/v1/classify
                    </h4>
                    <div className="bg-slate-900 rounded-lg p-4 text-sm font-mono text-slate-300 overflow-x-auto">
                      <pre>{`{
  "document": "base64_encoded_image",
  "bg_id": "412K-078263-B",
  "context": {
    "person": "Thomas Becker",
    "expected_types": [
      "Kontoauszug",
      "Mietvertrag"
    ]
  }
}`}</pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Response mit Metadaten
                    </h4>
                    <div className="bg-slate-900 rounded-lg p-4 text-sm font-mono text-slate-300 overflow-x-auto">
                      <pre>{`{
  "doc_type": "Kontoauszug",
  "confidence": 0.96,
  "person": "Thomas Becker",
  "metadata": {
    "bank": "Sparkasse Dortmund",
    "period": "01/2026",
    "page": "1/3"
  },
  "flags": [],
  "freitext": "Kontoauszug Sparkasse
    Dortmund, Thomas Becker,
    Januar 2026, Seite 1 von 3"
}`}</pre>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: "POST /api/v1/classify", desc: "Dokumentenklassifikation mit Confidence-Score" },
                    { label: "POST /api/v1/extract", desc: "OCR + strukturierte Datenextraktion" },
                    { label: "POST /api/v1/redact", desc: "Automatische Schwärzung sensibler Daten" },
                    { label: "POST /api/v1/graph/query", desc: "Knowledge Graph Abfrage (Cypher)" },
                    { label: "GET /api/v1/completeness/{bg_id}", desc: "Vollständigkeitsprüfung für BG" },
                    { label: "GET /health", desc: "Health Check Endpoint" },
                  ].map((ep, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <code className="text-xs font-mono font-semibold text-primary">{ep.label}</code>
                      <p className="text-xs text-muted-foreground mt-1">{ep.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION: Praxisszenarien ── */}
      <section id="scenarios" className="py-32 bg-card">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 text-base px-4 py-2">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Schritt 6: Praxis erleben
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Praxisszenarien für die gE
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Konkrete Anwendungsfälle zeigen, wie RELIEF die tägliche Aktenarbeit in den gemeinsamen Einrichtungen unterstützt.
            </p>
          </motion.div>

          <Tabs value={String(activeScenario)} onValueChange={(v) => setActiveScenario(Number(v))} className="w-full">
            <TabsList className="grid w-full grid-cols-5 h-auto p-2 mb-12 max-w-5xl mx-auto">
              {scenarios.map((scenario, index) => {
                const Icon = scenario.icon
                return (
                  <TabsTrigger 
                    key={index} 
                    value={String(index)}
                    className="flex flex-col items-center gap-2 py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs md:text-sm font-medium text-center leading-tight">{scenario.title}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon
              return (
                <TabsContent key={index} value={String(index)}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-2 hover:shadow-2xl transition-shadow">
                      <CardHeader className="pb-8">
                        <div className="flex items-start gap-6">
                          <motion.div 
                            className="p-6 rounded-2xl"
                            style={{ backgroundColor: `${scenario.color}15` }}
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          >
                            <Icon className="h-12 w-12" style={{ color: scenario.color }} />
                          </motion.div>
                          <div className="flex-1">
                            <CardTitle className="text-3xl mb-4">{scenario.title}</CardTitle>
                            <CardDescription className="text-base leading-relaxed">{scenario.description}</CardDescription>
                            <Badge variant="secondary" className="mt-4">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {scenario.impact}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Separator className="mb-6" />
                        <h4 className="font-semibold text-lg mb-4">RELIEF-Funktionen für diesen Fall:</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {scenario.benefits.map((benefit, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: i * 0.1 }}
                              className="flex gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                            >
                              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-foreground leading-relaxed">{benefit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              )
            })}
          </Tabs>
        </div>
      </section>

      {/* ── SECTION: Standards & Compliance ── */}
      <section id="standards" className="py-32 bg-muted/30 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 text-base px-4 py-2">
              <Scale className="h-4 w-4 mr-2" />
              Schritt 7: Rechtsgrundlagen
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Gesetzliche Grundlagen im Knowledge Graph
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Die Grundsicherung nach SGB II basiert auf einem komplexen Geflecht aus Sozialgesetzbüchern, 
              Datenschutzregulierung und E-AKTE-Standards. RELIEF bildet sie alle als Graph ab.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: BookOpen,
                title: "Sozialgesetzbücher",
                color: "oklch(0.45 0.15 245)",
                standards: [
                  { name: "SGB II — Grundsicherung", desc: "Primärgesetz: Leistungsberechtigung (§7), Einkommen (§11), Vermögen (§12), KdU (§22), BuT (§28)", url: "https://www.gesetze-im-internet.de/sgb_2/" },
                  { name: "SGB I — Allgemeiner Teil", desc: "Mitwirkungspflichten (§60), Folgen bei Pflichtverletzung (§66) — Grundlage für Nachforderungen", url: "https://www.gesetze-im-internet.de/sgb_1/" },
                  { name: "SGB III — Arbeitsförderung", desc: "Sperrzeit (§159), Arbeitslosmeldung — Prüfpunkt bei Kündigung/Insolvenz", url: "https://www.gesetze-im-internet.de/sgb_3/" },
                  { name: "SGB X — Verwaltungsverfahren", desc: "Sozialdatenschutz (§67ff.), Verwaltungsakte (§31), Aufhebung (§45/48)", url: "https://www.gesetze-im-internet.de/sgb_10/" },
                  { name: "SGB XII — Sozialhilfe", desc: "Subsidiarität und Abgrenzung zu SGB II — wann greift welches Gesetz?", url: "https://www.gesetze-im-internet.de/sgb_12/" },
                ]
              },
              {
                icon: Landmark,
                title: "Datenschutz & IT-Sicherheit",
                color: "oklch(0.50 0.18 200)",
                standards: [
                  { name: "DSGVO (EU 2016/679)", desc: "Art. 6 Rechtmäßigkeit, Art. 9 besondere Kategorien (Gesundheitsdaten, Religion)", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679" },
                  { name: "BSI IT-Grundschutz", desc: "IT-Sicherheitsstandard für Jobcenter-Systeme — Schutz der E-AKTE-Infrastruktur", url: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/it-grundschutz_node.html" },
                  { name: "BSI TR-RESISCAN", desc: "Technische Richtlinie für ersetzendes Scannen — Beweiswert digitalisierter Dokumente", url: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03138/tr-03138.html" },
                  { name: "BSI TR-ESOR", desc: "Beweiswerterhaltung kryptographisch signierter Dokumente — Langzeitarchivierung", url: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03125/tr-03125.html" },
                  { name: "§67 SGB X — Sozialdatenschutz", desc: "Spezialgesetzlicher Datenschutz für Sozialdaten — strenger als DSGVO-Minimum", url: "https://www.gesetze-im-internet.de/sgb_10/__67.html" },
                ]
              },
              {
                icon: ScrollText,
                title: "E-AKTE & Records Management",
                color: "oklch(0.55 0.20 55)",
                standards: [
                  { name: "xdomea 3.0", desc: "Standard für den Austausch von Schriftgutobjekten zwischen Verwaltungssystemen", url: "https://www.xrepository.de/details/urn:xoev-de:xdomea:standard:xdomea_3.0" },
                  { name: "ISO 15489 — Records Management", desc: "Internationale Norm für Aktenführung, Klassifikation und Aufbewahrungsfristen", url: "https://www.iso.org/standard/62542.html" },
                  { name: "DIN 31647 — Beweiswerterhaltung", desc: "Kryptographische Langzeitsicherung — Hashbäume und Zeitstempel für die E-AKTE", url: "https://www.din.de/de/mitwirken/normenausschuesse/nabd/veroeffentlichungen/wdc-beuth:din21:269816944" },
                  { name: "jobcenter.digital", desc: "Online-Portal der gE — digitaler Dokumenteneingang und Antragstellung", url: "https://www.jobcenter.digital/" },
                  { name: "RELIEF Document AI", desc: "KI-Pipeline: Klassifikation → OCR → Metadaten → Schwärzung → Sortierung → Freitext" },
                ]
              }
            ].map((category, catIndex) => {
              const CatIcon = category.icon
              return (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: catIndex * 0.15 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-xl" style={{ backgroundColor: `${category.color}15` }}>
                          <CatIcon className="h-7 w-7" style={{ color: category.color }} />
                        </div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {category.standards.map((std, i) => (
                        <div key={i} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                          <div className="font-semibold text-sm text-foreground mb-1">
                            {std.url ? (
                              <a href={std.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                                {std.name}
                                <ExternalLink className="h-3 w-3 opacity-40" />
                              </a>
                            ) : std.name}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{std.desc}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-primary/30 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">RELIEF-Integration</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Alle genannten Gesetze und Standards sind direkt im Knowledge Graph verankert. 
                      Jeder Paragraph definiert Regeln für Dokumententypen und Prüfschritte — die KI-Pipeline 
                      verknüpft jedes eingereichte Dokument automatisch mit den relevanten §§ und Complianceanforderungen.
                      BSI-Richtlinien und xdomea-Standards gewährleisten die Beweiswerterhaltung und interoperable Aktenführung.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION: Graph-Architektur im Detail ── */}
      <section id="graph-detail" className="py-32 bg-card relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 text-base px-4 py-2">
              <Layers className="h-4 w-4 mr-2" />
              Schritt 8: Graph-Architektur
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Knowledge Graph — Datenmodell
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Die RELIEF-Graphstruktur: von Dokumententypen über §§ SGB II bis zu KI-Verarbeitungsschritten und Compliance-Regeln.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="h-[700px] rounded-xl overflow-hidden">
              <DataModelGraph3D />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {[
                { label: "~75+", desc: "Knoten im Demo-Graph (skalierbar)", icon: Database },
                { label: "~100+", desc: "Beziehungen zwischen Entitäten", icon: Network },
                { label: "5 SGBs", desc: "SGB II, I, III, IX, X verknüpft", icon: Link2 },
              ].map((stat, i) => {
                const StatIcon = stat.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                      <StatIcon className="h-8 w-8 text-primary mx-auto mb-3" />
                      <div className="text-3xl font-bold text-primary mb-1">{stat.label}</div>
                      <div className="text-sm text-muted-foreground">{stat.desc}</div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: Technologie-Stack ── */}
      <section id="tech-stack" className="py-32 bg-muted/30 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 text-base px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Schritt 9: Technologie
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Open-Source KI-Stack — lokal & DSGVO-konform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Alle Modelle laufen lokal auf Kubernetes — keine Cloud-Abhängigkeit, keine Daten verlassen das Rechenzentrum.
              Zentrale Anforderung für §67 SGB X und BSI IT-Grundschutz.
            </p>
          </motion.div>

          {/* Pipeline visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card className="border-2 border-primary/20 bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-primary" />
                  RELIEF-Pipeline: Vom Foto zur strukturierten E-AKTE
                </CardTitle>
                <CardDescription>
                  Vollständig automatisiert, nachvollziehbar und ohne Cloud-Abhängigkeit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  {[
                    { text: 'Foto / Scan / PDF', color: 'bg-gray-500', sub: 'Eingang' },
                    { text: 'Granite-Docling', color: 'bg-emerald-600', sub: 'OCR + Layout' },
                    { text: 'GLiNER + Presidio', color: 'bg-amber-600', sub: 'PII-Erkennung' },
                    { text: 'spaCy (deutsch)', color: 'bg-blue-600', sub: 'Namen & Orte' },
                    { text: 'Presidio Anonymizer', color: 'bg-pink-600', sub: 'Schwärzung' },
                    { text: 'Llama 3 / Granite', color: 'bg-purple-600', sub: 'Freitext' },
                    { text: 'Neo4j Graph', color: 'bg-indigo-600', sub: 'Verknüpfung' },
                    { text: 'E-AKTE (xdomea)', color: 'bg-green-700', sub: 'Ergebnis' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="text-center">
                        <Badge className={`${step.color} text-white border-0 text-xs`}>
                          {step.text}
                        </Badge>
                        <div className="text-[10px] text-muted-foreground mt-1">{step.sub}</div>
                      </div>
                      {i < 7 && <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Model cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'IBM Granite-Docling-258M',
                role: 'Textextraktion & Layout',
                url: 'https://huggingface.co/ds4sd/docling-ibm-granite-258m-preview',
                description: 'Spezialisiertes Vision-Language-Modell mit nur 258M Parametern. Wandelt Fotos, Scans und Screenshots in strukturierten Text um — Layout, Tabellen und Formeln bleiben erhalten. Verarbeitet genau die Qualitätsprobleme aus dem Demo-Fall: Handyfotos von Kontoauszügen, 15-seitige Mietverträge, Screenshots.',
                highlights: ['258M Parameter (kompakt)', 'Fotos + Scans + PDFs', 'Layout-Erhaltung (DocTags)', 'Open Source (Apache 2.0)'],
                color: 'oklch(0.50 0.18 160)',
                icon: Eye,
              },
              {
                name: 'GLiNER-PII-Large',
                role: 'PII-Erkennung (Zero-Shot)',
                url: 'https://huggingface.co/knowledgator/gliner-pii-large-v1.0',
                description: 'Zero-Shot-NER-Modell von Knowledgator, das IBAN, Geburtsdaten, Gesundheitsdaten und Kontonummern erkennt — auch in nicht standardmäßig formatierten Dokumenten. Entscheidend für die Kontoauszüge und die Unterhaltsurkunde im Demo-Fall.',
                highlights: ['IBAN-Erkennung nativ', 'Geburtsdaten & Gesundheit', 'Zero-Shot (kein Training)', 'Open Source (Apache 2.0)'],
                color: 'oklch(0.55 0.20 55)',
                icon: Shield,
              },
              {
                name: 'Microsoft Presidio',
                role: 'Schwärzungs-Framework',
                url: 'https://microsoft.github.io/presidio/',
                description: 'Modulares Open-Source-Framework für PII-Erkennung und Anonymisierung. Kombiniert GLiNER als NER-Backend mit Regex-Validierung (IBAN-Checksummen). Schwärzt mit wählbaren Operatoren: Ersetzen, Maskieren oder schwarzes Rechteck im PDF.',
                highlights: ['GLiNER als Backend', 'Regex-Doppelprüfung', 'Replace / Mask / Redact', 'Open Source (MIT)'],
                color: 'oklch(0.50 0.18 200)',
                icon: ShieldCheck,
              },
              {
                name: 'spaCy de_core_news_lg',
                role: 'Deutsche Eigennamen (NER)',
                url: 'https://spacy.io/models/de#de_core_news_lg',
                description: 'Deutsches NER-Modell für Personen- und Ortsnamen in Verwaltungstexten. Erkennt "Thomas Becker", "Dortmund-Hörde" und "Sparkasse Dortmund" zuverlässig. Ergänzt GLiNER als performante Basisschicht in Presidio.',
                highlights: ['PER + LOC + ORG', 'Optimiert für Deutsch', 'Performant (kein GPU)', 'Open Source (MIT)'],
                color: 'oklch(0.45 0.15 245)',
                icon: Search,
              },
              {
                name: 'Llama 3 / IBM Granite',
                role: 'Freitextgenerierung',
                url: 'https://llama.meta.com/',
                description: 'Lokales LLM für die automatische Generierung beschreibender Freitexte: "Kontoauszug Sparkasse Dortmund, Thomas Becker, Jan. 2026, S. 1/3". Läuft vollständig lokal via Ollama — keine Daten verlassen das System.',
                highlights: ['Lokal via Ollama', 'Deutsch-fähig', 'Dokument-Summarization', 'Meta LLAMA Lizenz'],
                color: 'oklch(0.45 0.12 280)',
                icon: Bot,
              },
              {
                name: 'Neo4j Knowledge Graph',
                role: 'Verknüpfung & Compliance',
                url: 'https://neo4j.com/',
                description: 'Graph-Datenbank für die Verbindung aller Entitäten: Dokumente → Personen der BG → §§ SGB II → Prüfschritte → KI-Ergebnisse. Ermöglicht Vollständigkeitsprüfung, Compliance-Checks und navigierbare Wissensstruktur.',
                highlights: ['Cypher-Abfragen', 'GraphRAG-fähig', 'Compliance-Traversierung', 'Community Edition'],
                color: 'oklch(0.50 0.15 170)',
                icon: Network,
              },
              {
                name: 'Gemini 3 / Vertex AI',
                role: 'Cloud-Benchmark (Bild & Dokument)',
                url: 'https://ai.google.dev/gemini-api/docs/image-understanding',
                description: 'Googles multimodales KI-Modell als Cloud-Benchmark: Native PDF-Vision (bis 1.000 Seiten), Object Detection & Segmentierung, Nano Banana Inpainting für Schwärzung per Sprachbefehl. Bis 4K Auflösung, Thinking Mode für komplexe Aufgaben.',
                highlights: ['PDF bis 1.000 Seiten', 'Segmentierung & Detection', 'Nano Banana Inpainting', '⚠️ Cloud (DPA erforderlich)'],
                color: 'oklch(0.55 0.15 220)',
                icon: Globe,
              },
            ].map((model, i) => {
              const ModelIcon = model.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl" style={{ backgroundColor: `${model.color}15` }}>
                          <ModelIcon className="h-6 w-6" style={{ color: model.color }} />
                        </div>
                        <div>
                          <CardTitle className="text-lg leading-tight">
                            <a href={model.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1.5">
                              {model.name}
                              <ExternalLink className="h-3.5 w-3.5 opacity-40" />
                            </a>
                          </CardTitle>
                          <p className="text-xs text-muted-foreground font-medium mt-1">{model.role}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{model.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {model.highlights.map((h, j) => (
                          <Badge key={j} variant="secondary" className="text-xs">{h}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* DSGVO compliance note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12"
          >
            <Card className="border-2 border-primary/30 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">100% lokal — 0% Cloud</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Alle Modelle (Granite-Docling, GLiNER, Presidio, spaCy, Llama 3) laufen auf Kubernetes im Rechenzentrum der gE. 
                      Keine personenbezogenen Daten verlassen die Infrastruktur. Alle Komponenten sind Open Source (Apache 2.0 / MIT / Meta LLAMA) — 
                      keine proprietären Cloud-Abhängigkeiten. Konform mit §67 SGB X (Sozialdatenschutz), BSI IT-Grundschutz und DSGVO Art. 25 (Privacy by Design).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION: Prozessmodernisierung — BPMN & BRML ── */}
      <section id="process-modernization" className="py-32 bg-card relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 text-base px-4 py-2">
              <Replace className="h-4 w-4 mr-2" />
              Schritt 9: Prozessmodernisierung
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Von der Black Box zum erklärten Bescheid
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Bestehende Fachverfahren in Visual Basic und COBOL berechnen Leistungen, die niemand nachvollziehen kann. 
              CASSA überführt diese Logik in transparente, prüfbare Modelle — Schritt für Schritt.
            </p>
          </motion.div>

          {/* Before/After visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card className="border-2 border-primary/20 bg-card">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Before */}
                  <div className="text-center">
                    <div className="p-4 rounded-xl bg-red-500/10 mb-4 inline-block">
                      <Code2 className="h-12 w-12 text-red-500" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-red-500">Heute: Black Box</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>Visual Basic & COBOL</p>
                      <p>Berechnung ohne Erklärung</p>
                      <p>Kein Audit-Trail</p>
                      <p>Änderung = Risiko</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-10 w-10 text-primary" />
                    </motion.div>
                    <div className="text-center">
                      <Badge className="bg-primary text-primary-foreground">
                        CASSA-Analyse
                      </Badge>
                      <div className="flex flex-wrap justify-center gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">Prozess-Mining</Badge>
                        <Badge variant="outline" className="text-xs">Regel-Extraktion</Badge>
                        <Badge variant="outline" className="text-xs">Validierung</Badge>
                      </div>
                    </div>
                  </div>

                  {/* After */}
                  <div className="text-center">
                    <div className="p-4 rounded-xl bg-green-500/10 mb-4 inline-block">
                      <Workflow className="h-12 w-12 text-green-500" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-green-500">Morgen: Transparent</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>BPMN 2.0 & DMN-Tabellen</p>
                      <p>Erklärbare Bescheide</p>
                      <p>Vollständiger Audit-Trail</p>
                      <p>Änderung = Tabellenzeile</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* BPMN / DMN / Process cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "BPMN 2.0 — Prozesse sichtbar machen",
                url: "https://www.omg.org/spec/BPMN/2.0.2/",
                icon: Workflow,
                color: "oklch(0.50 0.18 160)",
                description: "Geschäftsprozesse wie Antragsaufnahme, BG-Prüfung und KdU-Berechnung werden als lesbare Diagramme modelliert. Sachbearbeiter und Juristen können Abläufe verstehen und prüfen — ohne Programmierkenntnis.",
                examples: [
                  "Wer ist zuständig? → Swimlanes zeigen Verantwortlichkeiten",
                  "Entscheidungspunkte → z.B. \u201aEinkommen stabil oder schwankend?\u2018",
                  "Vollständigkeitsprüfung → fehlende Nachweise automatisch erkannt",
                  "Prüfbar von Juristen, nicht nur von Entwicklern"
                ]
              },
              {
                title: "DMN — Regeln als Tabellen",
                url: "https://www.omg.org/spec/DMN/",
                icon: Scale,
                color: "oklch(0.50 0.15 50)",
                description: "Entscheidungslogik (Freibeträge, Regelbedarfe, Anrechnungsregeln) wird als verständliche Tabelle formuliert statt als COBOL-Code. Bei Gesetzesänderungen wird eine Tabellenzeile angepasst — nicht monolithischer Code.",
                examples: [
                  "Freibetragsberechnung (§11b SGB II) als Entscheidungstabelle",
                  "Regelbedarfsstufen (§20 SGB II) — jährliche Anpassung in Minuten",
                  "KdU-Angemessenheit (§22 SGB II) — kommunale Grenzwerte als Tabelle",
                  "Leila Becker: 850 € brutto → 283 € Freibetrag → nachvollziehbar"
                ]
              },
              {
                title: "Erklärbare Bescheide",
                url: "https://www.gesetze-im-internet.de/sgb_10/__35.html",
                icon: ShieldCheck,
                color: "oklch(0.45 0.15 245)",
                description: "Jeder Leistungsbescheid enthält automatisch eine Begründung: welche Regel auf welche Daten angewendet wurde. Widersprüche (§78ff. SGG) können nachvollzogen werden — kein Rätselraten mehr über Berechnungswege.",
                examples: [
                  "§35 SGB X: Begründungspflicht automatisch erfüllt",
                  "Audit-Trail: \u201a1.247,63 € weil Regel X auf Einkommen Y\u2018",
                  "Widerspruchsverfahren: exakte Nachverfolgung jeder Berechnung",
                  "Vier-Augen-Prinzip: Juristen prüfen Diagramme, nicht COBOL"
                ]
              }
            ].map((card, i) => {
              const CardIcon = card.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl" style={{ backgroundColor: `${card.color}15` }}>
                          <CardIcon className="h-6 w-6" style={{ color: card.color }} />
                        </div>
                        <CardTitle className="text-lg leading-tight">
                          <a href={card.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1.5">
                            {card.title}
                            <ExternalLink className="h-3.5 w-3.5 opacity-40" />
                          </a>
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{card.description}</p>
                      <div className="space-y-2">
                        {card.examples.map((ex, j) => (
                          <div key={j} className="flex gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{ex}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Migration Steps Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card className="border-2 border-primary/20 bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitCompare className="h-5 w-5 text-primary" />
                  Schrittweise Migration — kein Big Bang
                </CardTitle>
                <CardDescription>
                  Legacy-Code wird Modul für Modul ersetzt — mit Parallelbetrieb und Ergebnisvergleich
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  {[
                    { text: 'VB/COBOL Legacy', color: 'bg-red-600', sub: 'Ist-Zustand' },
                    { text: 'Prozess-Mining', color: 'bg-amber-600', sub: 'Analyse' },
                    { text: 'BPMN-Modell', color: 'bg-blue-600', sub: 'Ablauflogik' },
                    { text: 'DMN-Tabellen', color: 'bg-purple-600', sub: 'Rechenregeln' },
                    { text: 'Fachliche Validierung', color: 'bg-cyan-600', sub: 'Prüfung' },
                    { text: 'Parallelbetrieb', color: 'bg-orange-600', sub: 'Vergleich' },
                    { text: 'Transparenter Bescheid', color: 'bg-green-600', sub: 'Ergebnis' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="text-center">
                        <Badge className={`${step.color} text-white border-0 text-xs`}>
                          {step.text}
                        </Badge>
                        <div className="text-[10px] text-muted-foreground mt-1">{step.sub}</div>
                      </div>
                      {i < 6 && <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Non-technical explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-2 border-primary/30 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Scale className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Warum das wichtig ist — einfach erklärt</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Stellen Sie sich vor, Ihre Steuererklärung wird von einem Programm berechnet, das Ihnen nur den Endbetrag zeigt — 
                      aber niemand kann Ihnen erklären, wie er zustande kam. Genau so funktionieren die heutigen Fachverfahren bei der 
                      Grundsicherung. Die Sachbearbeiterin gibt Daten ein, das System gibt ein Ergebnis aus — aber den Weg dazwischen 
                      kennt niemand.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      CASSA macht diesen Weg sichtbar: Zuerst analysiert es die bestehenden Programme und erstellt daraus 
                      <strong> verständliche Diagramme</strong> (BPMN) und <strong>übersichtliche Tabellen</strong> (DMN). 
                      Fachkräfte und Juristen können diese prüfen — ohne eine Zeile Code lesen zu müssen.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Die neuen Systeme erklären jeden Bescheid: „Familie Becker erhält 1.247,63 €, <em>weil</em> Leilas Freibetrag 
                      283 € beträgt (§11b SGB II, Zeile 2), <em>weil</em> die KdU 1.000 € angemessen sind (§22 SGB II, Tabelle Dortmund), 
                      <em>weil</em> die vorläufige Entscheidung nach §41a SGB II greift." — Bei einem Widerspruch kann jeder Schritt 
                      nachvollzogen werden. Das schafft Rechtssicherheit für Bürgerinnen und Bürger <em>und</em> für die Verwaltung.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tool cards for process modernization */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {[
              { name: 'Camunda Platform 8', url: 'https://camunda.com/', desc: 'BPMN-Engine: Führt Geschäftsprozesse als ausführbare Modelle aus' },
              { name: 'Drools', url: 'https://www.drools.org/', desc: 'Business Rules Engine für komplexe Regelketten und Forward-Chaining' },
              { name: 'BPMN.io', url: 'https://bpmn.io/', desc: 'Open-Source-Editor für BPMN- und DMN-Diagramme (Web-basiert)' },
              { name: 'Celonis / Signavio', url: 'https://www.celonis.com/', desc: 'Process Mining: Analysiert Legacy-Systeme und extrahiert Prozessabläufe' },
            ].map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm mb-1">
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                        {tool.name}
                        <ExternalLink className="h-3 w-3 opacity-40" />
                      </a>
                    </h4>
                    <p className="text-xs text-muted-foreground">{tool.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 network-pattern"></div>
        </div>
        <div className="container mx-auto px-6 max-w-7xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Bereit für KI-gestützte Aktenarbeit?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Erfahren Sie, wie CASSA RELIEF mit Document AI und Knowledge Graph 
              die E-AKTE-Bearbeitung in der Grundsicherung revolutioniert — compliant, transparent und effizient.
            </p>
            <Button 
              asChild 
              size="lg" 
              variant="secondary"
              className="text-lg px-12 h-16 text-primary font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <a href="https://www.soprasteria.de/products/cassa" target="_blank" rel="noopener noreferrer">
                Zur offiziellen CASSA-Website
                <ArrowRight className="ml-3 h-6 w-6" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 border-t border-border bg-muted/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <SopraLogo />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-sm text-muted-foreground text-center">
                © 2025 Sopra Steria. Alle Rechte vorbehalten.
              </p>
              <a
                href="https://www.soprasteria.de/footer/impressum"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Impressum
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ── Helper Components ──

function SopraLogo() {
  return (
    <img 
      src="https://www.soprasteria.de/ResourcePackages/Bootstrap4/assets/dist/logos/logo-soprasteria.svg" 
      alt="Sopra Steria" 
      className="h-8 md:h-10"
    />
  )
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/10 rounded-full"
          initial={{ 
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: 0
          }}
          animate={{ 
            y: [null, Math.random() * 100 + '%'],
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  )
}

export default App
