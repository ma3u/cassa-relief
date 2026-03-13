#!/usr/bin/env python3
"""Generate ElevenLabs narration audio for CASSA RELIEF — Fall Familie Becker.

Uses Alice voice (multilingual v2) — professional, clear female narrator.
The narration walks through a complex SGB II E-AKTE case (Bedarfsgemeinschaft Becker)
and explains how RELIEF's Document AI pipeline and Knowledge Graph transform Aktenarbeit.
"""
import json, urllib.request, os, sys

# ── Configuration ──
API_KEY = os.environ.get("ELEVENLABS_API_KEY", "")
if not API_KEY:
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
    if os.path.exists(env_path):
        for line in open(env_path):
            if line.startswith("ELEVENLABS_API_KEY"):
                API_KEY = line.split("=", 1)[1].strip().strip('"').strip("'")

if not API_KEY:
    print("ERROR: ELEVENLABS_API_KEY not set. Add to .env or environment.")
    sys.exit(1)

# Alice — Clear, Engaging Educator — middle-aged female, professional
VOICE_ID = "Xb7hH8MSUJpSbSDYk0k2"

NARRATION_TEXT = """Willkommen bei CASSA RELIEF — dem KI-Assistenten für die E-AKTE in der Grundsicherung, entwickelt von Sopra Steria.

Ich möchte Ihnen anhand eines realistischen Falls zeigen, warum KI-gestützte Aktenarbeit für die gemeinsamen Einrichtungen unverzichtbar ist — und warum manuelle Aktenpflege bei der Komplexität des SGB Zwei an ihre Grenzen stößt.

Stellen Sie sich vor: Sie sind Sachbearbeiterin im Jobcenter Dortmund. Auf Ihrem Bildschirm öffnet sich die E-AKTE zur Bedarfsgemeinschaft Becker. BG-Nummer 412K Strich 078263 Strich B. Ein Bürgergeld-Erstantrag mit 47 eingereichten Dokumenten. Und schon beim ersten Blick in die Akte wird klar: Hier wartet Arbeit.

Schauen wir uns die Bedarfsgemeinschaft an. Thomas Becker, 45 Jahre, hat seine Stelle verloren — betriebsbedingte Kündigung durch die Insolvenz seines Arbeitgebers, der Möbel-Zentrum GmbH in Dortmund. Keine Sperrzeit nach Paragraph 159 SGB Drei, denn es war keine Eigenkündigung. Seine Lebensgefährtin Leila, geborene Kaya, 37, arbeitet als Teilzeit-Reinigungskraft — 850 Euro brutto im Monat, aber schwankend. Dazu drei Kinder: Sophie, 14, aus Thomas' erster Ehe — die Mutter zahlt 230 Euro Unterhalt. Can, 6, ein Kita-Kind. Und Emma, 9 Monate alt.

Fünf Personen. Drei verschiedene Einkommensquellen. Und eine Wohnung in Dortmund-Hörde: 90 Quadratmeter, 1.000 Euro warm. Dazu eine Kapital-Lebensversicherung mit 12.500 Euro Rückkaufwert und ein VW Touran, Baujahr 2017.

Jetzt die E-AKTE. Die Familie hat 47 Dokumente eingereicht — digital über jobcenter.digital, als Fotos per Smartphone, teilweise per Post. Und genau hier beginnt das Problem.

12 Kontoauszüge liegen als einzelne Handyfotos in der Akte. Nicht chronologisch sortiert, nicht zusammengeführt, keiner bestimmten Person zugeordnet. 15 Fotos eines Mietvertrags — jede Seite einzeln abfotografiert, in willkürlicher Reihenfolge. 3 Lohnabrechnungen von Leila mit unterschiedlichem Layout. Eine Nebenkostenabrechnung, aber nur 2 von 4 Seiten. Ein Kindergeldbescheid, der veraltet ist. Und dann: ein Arztbrief von Sophie — mit Diagnose und Gesundheitsdaten, die nach Paragraph 67 SGB Zehn und Artikel 9 der DSGVO nicht in die Leistungsakte gehören.

3 weitere Dokumente sind schlicht als „Sonstiges" klassifiziert. Und keines der 47 Dokumente hat einen beschreibenden Freitext.

Für eine Sachbearbeiterin bedeutet das: mindestens 45 Minuten, um die Akte überhaupt zu erschließen. Jedes Dokument einzeln öffnen, den Inhalt lesen, den Typ im System zuordnen, die Person bestimmen. Und dabei besteht immer das Risiko, dass der Arztbrief eines 14-jährigen Mädchens unrechtmäßig in der Akte verbleibt. Oder dass die fehlende Arbeitgeberbescheinigung erst Wochen später auffällt.

Und jetzt kommt RELIEF.

RELIEF verarbeitet alle 47 Dokumente in einer automatisierten Pipeline. Schritt eins: Dokumentenklassifikation. Die KI erkennt sofort — das sind Kontoauszüge, das ist ein Mietvertrag, das ist eine Lohnabrechnung. Die 3 „Sonstiges"-Dokumente werden reklassifiziert: Eine Nebenkostenabrechnung, eine Insolvenzbekanntmachung und eine Arbeitgeberbescheinigung.

Schritt zwei: OCR und Texterkennung. Auch aus den Handyfotos extrahiert RELIEF den vollständigen Text. Vertragsbeginn, Kaltmiete 780 Euro, Nebenkosten 220 Euro — automatisch aus den 15 Mietvertragsfotos.

Schritt drei: Metadaten-Extraktion. Jedes Dokument bekommt automatisch Datum, Absender, Dokumententyp und die zugehörige Person zugewiesen. Die 12 Kontoauszüge werden Thomas Becker zugeordnet, chronologisch sortiert und als zusammengehöriges Dokument gruppiert.

Schritt vier: Automatische Schwärzung. RELIEF erkennt auf der Unterhaltsurkunde: Kontonummern, Geburtsdaten — und schlägt Schwärzungen vor. Auf dem Arztbrief von Sophie erkennt die KI: Gesundheitsdaten, Diagnose, Personenname eines Kindes. Automatisches Flag: Dieses Dokument gehört nicht in die Leistungsakte.

Schritt fünf: Sortierung und Zusammenführung. Die 15 Mietvertragsfotos werden anhand von Layout, Seitenzahlen und Briefkopf als zusammengehörig erkannt und zu einem Dokument verschmolzen. Freitext: „Mietvertrag, Wohnung Dortmund-Hörde, 90 Quadratmeter, 1.000 Euro warm, Familie Becker."

Schritt sechs: Vollständigkeitsprüfung. RELIEF traversiert den Knowledge Graph: Paragraph 11 SGB Zwei — Einkommensprüfung — benötigt Arbeitgeberbescheinigung. Ist nicht unter den 47 Dokumenten. Automatische Mitwirkungsanforderung nach Paragraph 60 SGB Eins wird vorbereitet. Dazu: Nebenkostenabrechnung unvollständig — 2 von 4 Seiten erkannt. Kindergeldbescheid mit veraltetem Datum.

Und im Knowledge Graph sehen Sie all diese Zusammenhänge als explizite Beziehungen. Der Fallknoten „Familie Becker" ist verknüpft mit jedem Mitglied der Bedarfsgemeinschaft — definiert nach Paragraph 7 SGB Zwei. Jedes Dokument zeigt auf seinen Typ, seine Person und die relevanten Paragraphen. Die Kontoauszüge verweisen auf Paragraph 11 SGB Zwei — Einkommensprüfung. Der Mietvertrag auf Paragraph 22 — Kosten der Unterkunft. Der Arztbrief auf Paragraph 67 SGB Zehn — Sozialdatenschutz. Und die KI-Verarbeitungsschritte sind als eigene Knoten modelliert: Klassifikation, OCR, Schwärzung — jeder verknüpft mit den Standards, die er erfüllt. TR-RESISCAN für Beweiswerterhaltung. Xdomea für interoperable Aktenführung.

Das Ergebnis: Statt 45 Minuten manueller Aktenerschließung hat RELIEF die E-AKTE in Sekunden strukturiert. 47 Dokumente klassifiziert, sortiert und mit Freitexten versehen. Datenschutzverstöße automatisch erkannt. Fehlende Nachweise identifiziert. Und die Sachbearbeiterin kann sich auf das konzentrieren, was wirklich zählt: die fachliche Prüfung des Anspruchs.

Denn die rechtliche Komplexität bleibt: Leilas schwankendes Einkommen erfordert einen vorläufigen Bescheid nach Paragraph 41a SGB Zwei. Die Angemessenheit der Unterkunftskosten muss gegen kommunale Richtwerte geprüft werden. Die Vermögensfreibeträge für Thomas' Lebensversicherung sind zu berechnen. Und die BuT-Ansprüche für Sophie und Can — Schulbedarf, Kita-Mittagessen — müssen separat festgestellt werden.

Aber all das kann die Sachbearbeiterin jetzt auf Basis einer sauber strukturierten, vollständigen und datenschutzkonformen Akte tun. Nicht trotz 47 chaotisch eingereichten Dokumenten — sondern weil RELIEF diese Aktenarbeit übernommen hat.

Das ist CASSA RELIEF: Ein System, das die Aktenarbeit nicht vereinfacht, sondern automatisiert — KI-gestützt, rechtskonform und transparent. Für die 75.000 Beschäftigten in den gemeinsamen Einrichtungen, die jeden Tag Fälle wie den der Familie Becker bearbeiten."""

# ── Generate with ElevenLabs ──
url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
payload = json.dumps({
    "text": NARRATION_TEXT,
    "model_id": "eleven_multilingual_v2",
    "voice_settings": {
        "stability": 0.70,
        "similarity_boost": 0.75,
        "style": 0.25,
        "use_speaker_boost": True
    }
}).encode("utf-8")

req = urllib.request.Request(
    url,
    data=payload,
    headers={
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg"
    },
    method="POST"
)

output_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "audio", "relief_fall_becker.mp3")
os.makedirs(os.path.dirname(output_path), exist_ok=True)

print(f"Generating speech with voice: Alice (Clear, Engaging Educator)")
print(f"Model: eleven_multilingual_v2 (German)")
print(f"Text length: {len(NARRATION_TEXT)} characters")
print(f"Output: {output_path}")

try:
    with urllib.request.urlopen(req, timeout=300) as resp:
        audio_data = resp.read()
        with open(output_path, "wb") as f:
            f.write(audio_data)
        size_kb = len(audio_data) / 1024
        print(f"\nSuccess! Audio saved: {size_kb:.0f} KB ({size_kb/1024:.1f} MB)")
        print(f"Estimated duration: ~{len(NARRATION_TEXT) / 15 / 60:.1f} minutes")
except urllib.error.HTTPError as e:
    error_body = e.read().decode("utf-8", errors="replace")
    print(f"\nHTTP Error {e.code}: {e.reason}")
    print(f"Response: {error_body}")
    sys.exit(1)
except Exception as e:
    print(f"\nError: {e}")
    sys.exit(1)
