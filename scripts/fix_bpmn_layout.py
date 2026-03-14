#!/usr/bin/env python3
"""Rewrite the DI section of relief-process.bpmn with proper layout coordinates."""
import os

BPMN_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'components', 'bpmn', 'relief-process.bpmn')

with open(BPMN_PATH, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line index where the DI content starts (after <bpmndi:BPMNPlane ...>)
plane_idx = None
for i, line in enumerate(lines):
    if '<bpmndi:BPMNPlane' in line:
        plane_idx = i
        break

if plane_idx is None:
    raise RuntimeError("Could not find <bpmndi:BPMNPlane> in BPMN file")

# Keep everything up to and including the BPMNPlane opening line
header = lines[:plane_idx + 1]

NEW_DI = r"""
      <!-- Participant Bands -->
      <bpmndi:BPMNShape id="Shape_Lane_Antragsteller" bpmnElement="Lane_Antragsteller" isHorizontal="true">
        <dc:Bounds x="160" y="60" width="2400" height="180" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Lane_Sachbearbeitung" bpmnElement="Lane_Sachbearbeitung" isHorizontal="true">
        <dc:Bounds x="160" y="280" width="2400" height="520" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Lane_RELIEF" bpmnElement="Lane_RELIEF" isHorizontal="true">
        <dc:Bounds x="160" y="840" width="2400" height="250" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Lane_Entscheidung" bpmnElement="Lane_Entscheidung" isHorizontal="true">
        <dc:Bounds x="160" y="1130" width="2400" height="210" />
      </bpmndi:BPMNShape>

      <!-- LANE 1: Antragsteller (y center ~150) -->
      <bpmndi:BPMNShape id="Shape_Start_Insolvenz" bpmnElement="Start_Insolvenz">
        <dc:Bounds x="232" y="132" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="210" y="175" width="80" height="40" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_Antrag" bpmnElement="Task_Antrag">
        <dc:Bounds x="330" y="110" width="160" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_DokEingang" bpmnElement="Task_DokEingang">
        <dc:Bounds x="560" y="110" width="160" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Event_Mitwirkung" bpmnElement="Event_Mitwirkung">
        <dc:Bounds x="1252" y="132" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="1225" y="95" width="90" height="30" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_Nachreichung" bpmnElement="Task_Nachreichung">
        <dc:Bounds x="1360" y="110" width="160" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Event_BescheidZustellung" bpmnElement="Event_BescheidZustellung">
        <dc:Bounds x="2292" y="132" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="2272" y="95" width="76" height="30" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_End_Antragsteller" bpmnElement="End_Antragsteller">
        <dc:Bounds x="2442" y="132" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="2422" y="175" width="76" height="30" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>

      <!-- Antragsteller sequence flows -->
      <bpmndi:BPMNEdge id="Edge_Flow_A1" bpmnElement="Flow_A1">
        <di:waypoint x="268" y="150" /><di:waypoint x="330" y="150" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_A2" bpmnElement="Flow_A2">
        <di:waypoint x="490" y="150" /><di:waypoint x="560" y="150" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_A3" bpmnElement="Flow_A3">
        <di:waypoint x="720" y="150" /><di:waypoint x="1252" y="150" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_A4" bpmnElement="Flow_A4">
        <di:waypoint x="1288" y="150" /><di:waypoint x="1360" y="150" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_A5" bpmnElement="Flow_A5">
        <di:waypoint x="1520" y="150" /><di:waypoint x="2292" y="150" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_A6" bpmnElement="Flow_A6">
        <di:waypoint x="2328" y="150" /><di:waypoint x="2442" y="150" />
      </bpmndi:BPMNEdge>

      <!-- LANE 2: Sachbearbeitung (y=280..800) -->
      <bpmndi:BPMNShape id="Shape_Event_AntragEingang" bpmnElement="Event_AntragEingang">
        <dc:Bounds x="392" y="332" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="374" y="375" width="72" height="30" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_AkteOeffnen" bpmnElement="Task_AkteOeffnen">
        <dc:Bounds x="490" y="310" width="160" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_SBForwardDocs" bpmnElement="Task_SBForwardDocs">
        <dc:Bounds x="490" y="430" width="160" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Event_KIErgebnis" bpmnElement="Event_KIErgebnis">
        <dc:Bounds x="712" y="452" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="694" y="495" width="72" height="30" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_BGPruefung" bpmnElement="Task_BGPruefung">
        <dc:Bounds x="810" y="310" width="160" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_GW_Parallel1" bpmnElement="GW_Parallel1">
        <dc:Bounds x="1025" y="325" width="50" height="50" />
        <bpmndi:BPMNLabel><dc:Bounds x="1005" y="295" width="90" height="25" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_Einkommen" bpmnElement="Task_Einkommen">
        <dc:Bounds x="1140" y="310" width="170" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_Vermoegen" bpmnElement="Task_Vermoegen">
        <dc:Bounds x="1140" y="395" width="170" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_KdU" bpmnElement="Task_KdU">
        <dc:Bounds x="1140" y="480" width="170" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_Vollstaendigkeit" bpmnElement="Task_Vollstaendigkeit">
        <dc:Bounds x="1140" y="570" width="170" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_GW_Vollstaendig" bpmnElement="GW_Vollstaendig" isMarkerVisible="true">
        <dc:Bounds x="1200" y="680" width="50" height="50" />
        <bpmndi:BPMNLabel><dc:Bounds x="1120" y="695" width="70" height="30" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_Mitwirkung" bpmnElement="Task_Mitwirkung">
        <dc:Bounds x="1090" y="740" width="130" height="55" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_GW_Parallel2" bpmnElement="GW_Parallel2">
        <dc:Bounds x="1395" y="325" width="50" height="50" />
        <bpmndi:BPMNLabel><dc:Bounds x="1375" y="295" width="90" height="25" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_GW_Einkommen" bpmnElement="GW_Einkommen" isMarkerVisible="true">
        <dc:Bounds x="1525" y="325" width="50" height="50" />
        <bpmndi:BPMNLabel><dc:Bounds x="1510" y="295" width="80" height="25" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_VorlBescheid" bpmnElement="Task_VorlBescheid">
        <dc:Bounds x="1650" y="310" width="170" height="70" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_EndBescheid" bpmnElement="Task_EndBescheid">
        <dc:Bounds x="1650" y="420" width="170" height="70" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_GW_BescheidMerge" bpmnElement="GW_BescheidMerge" isMarkerVisible="true">
        <dc:Bounds x="1895" y="325" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_EskalationSend" bpmnElement="Task_EskalationSend">
        <dc:Bounds x="2000" y="415" width="160" height="70" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Event_Freigabe" bpmnElement="Event_Freigabe">
        <dc:Bounds x="2212" y="432" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="2195" y="475" width="70" height="30" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_BescheidErstellen" bpmnElement="Task_BescheidErstellen">
        <dc:Bounds x="2140" y="310" width="180" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_End_Sachbearbeitung" bpmnElement="End_Sachbearbeitung">
        <dc:Bounds x="2442" y="332" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="2426" y="375" width="68" height="30" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>

      <!-- Sachbearbeitung sequence flows -->
      <bpmndi:BPMNEdge id="Edge_Flow_S1" bpmnElement="Flow_S1">
        <di:waypoint x="428" y="350" /><di:waypoint x="490" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S2" bpmnElement="Flow_S2">
        <di:waypoint x="570" y="390" /><di:waypoint x="570" y="430" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S3" bpmnElement="Flow_S3">
        <di:waypoint x="650" y="470" /><di:waypoint x="712" y="470" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S4" bpmnElement="Flow_S4">
        <di:waypoint x="748" y="470" /><di:waypoint x="780" y="470" /><di:waypoint x="780" y="350" /><di:waypoint x="810" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S5" bpmnElement="Flow_S5">
        <di:waypoint x="970" y="350" /><di:waypoint x="1025" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S6a" bpmnElement="Flow_S6a">
        <di:waypoint x="1075" y="342" /><di:waypoint x="1140" y="342" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S6b" bpmnElement="Flow_S6b">
        <di:waypoint x="1050" y="375" /><di:waypoint x="1050" y="427" /><di:waypoint x="1140" y="427" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S6c" bpmnElement="Flow_S6c">
        <di:waypoint x="1050" y="375" /><di:waypoint x="1050" y="512" /><di:waypoint x="1140" y="512" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S6d" bpmnElement="Flow_S6d">
        <di:waypoint x="1050" y="375" /><di:waypoint x="1050" y="602" /><di:waypoint x="1140" y="602" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S7a" bpmnElement="Flow_S7a">
        <di:waypoint x="1310" y="342" /><di:waypoint x="1395" y="342" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S7b" bpmnElement="Flow_S7b">
        <di:waypoint x="1310" y="427" /><di:waypoint x="1420" y="427" /><di:waypoint x="1420" y="375" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S7c" bpmnElement="Flow_S7c">
        <di:waypoint x="1310" y="512" /><di:waypoint x="1420" y="512" /><di:waypoint x="1420" y="375" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S7d" bpmnElement="Flow_S7d">
        <di:waypoint x="1225" y="635" /><di:waypoint x="1225" y="680" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_Vollst_Ja" bpmnElement="Flow_Vollst_Ja">
        <di:waypoint x="1250" y="705" /><di:waypoint x="1420" y="705" /><di:waypoint x="1420" y="375" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_Vollst_Nein" bpmnElement="Flow_Vollst_Nein">
        <di:waypoint x="1225" y="730" /><di:waypoint x="1225" y="740" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_MitwDone" bpmnElement="Flow_MitwDone">
        <di:waypoint x="1155" y="795" /><di:waypoint x="1420" y="795" /><di:waypoint x="1420" y="375" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S8" bpmnElement="Flow_S8">
        <di:waypoint x="1445" y="350" /><di:waypoint x="1525" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_Vorlaeufig" bpmnElement="Flow_Vorlaeufig">
        <di:waypoint x="1575" y="345" /><di:waypoint x="1650" y="345" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_Endgueltig" bpmnElement="Flow_Endgueltig">
        <di:waypoint x="1550" y="375" /><di:waypoint x="1550" y="455" /><di:waypoint x="1650" y="455" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_VB1" bpmnElement="Flow_VB1">
        <di:waypoint x="1820" y="345" /><di:waypoint x="1895" y="345" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_EB1" bpmnElement="Flow_EB1">
        <di:waypoint x="1820" y="455" /><di:waypoint x="1920" y="455" /><di:waypoint x="1920" y="375" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S9" bpmnElement="Flow_S9">
        <di:waypoint x="1920" y="375" /><di:waypoint x="1920" y="450" /><di:waypoint x="2000" y="450" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S10" bpmnElement="Flow_S10">
        <di:waypoint x="2160" y="450" /><di:waypoint x="2212" y="450" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S11" bpmnElement="Flow_S11">
        <di:waypoint x="2230" y="432" /><di:waypoint x="2230" y="390" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_S12" bpmnElement="Flow_S12">
        <di:waypoint x="2320" y="350" /><di:waypoint x="2442" y="350" />
      </bpmndi:BPMNEdge>

      <!-- LANE 3: RELIEF KI-System (y=840..1090, center ~962) -->
      <bpmndi:BPMNShape id="Shape_Event_KIStart" bpmnElement="Event_KIStart">
        <dc:Bounds x="392" y="947" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="374" y="990" width="72" height="30" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_OCR" bpmnElement="Task_OCR">
        <dc:Bounds x="490" y="930" width="160" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_Klassifikation" bpmnElement="Task_Klassifikation">
        <dc:Bounds x="700" y="930" width="160" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_PII" bpmnElement="Task_PII">
        <dc:Bounds x="910" y="930" width="160" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_GW_Datenschutz" bpmnElement="GW_Datenschutz" isMarkerVisible="true">
        <dc:Bounds x="1115" y="937" width="50" height="50" />
        <bpmndi:BPMNLabel><dc:Bounds x="1105" y="910" width="70" height="25" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_Schwaerzung" bpmnElement="Task_Schwaerzung">
        <dc:Bounds x="1200" y="1015" width="150" height="55" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_GW_DSMerge" bpmnElement="GW_DSMerge" isMarkerVisible="true">
        <dc:Bounds x="1395" y="937" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_NER" bpmnElement="Task_NER">
        <dc:Bounds x="1490" y="930" width="160" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_Sortierung" bpmnElement="Task_Sortierung">
        <dc:Bounds x="1700" y="930" width="160" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_Freitext" bpmnElement="Task_Freitext">
        <dc:Bounds x="1910" y="930" width="160" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_Graph" bpmnElement="Task_Graph">
        <dc:Bounds x="2120" y="930" width="160" height="65" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_KIResult" bpmnElement="Task_KIResult">
        <dc:Bounds x="2120" y="860" width="170" height="55" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_End_RELIEF" bpmnElement="End_RELIEF">
        <dc:Bounds x="2442" y="870" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="2418" y="913" width="84" height="30" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>

      <!-- RELIEF sequence flows -->
      <bpmndi:BPMNEdge id="Edge_Flow_R1" bpmnElement="Flow_R1">
        <di:waypoint x="428" y="965" /><di:waypoint x="490" y="962" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_R2" bpmnElement="Flow_R2">
        <di:waypoint x="650" y="962" /><di:waypoint x="700" y="962" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_R3" bpmnElement="Flow_R3">
        <di:waypoint x="860" y="962" /><di:waypoint x="910" y="962" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_R4" bpmnElement="Flow_R4">
        <di:waypoint x="1070" y="962" /><di:waypoint x="1115" y="962" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_DS_Ja" bpmnElement="Flow_DS_Ja">
        <di:waypoint x="1140" y="987" /><di:waypoint x="1140" y="1042" /><di:waypoint x="1200" y="1042" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_DS_Nein" bpmnElement="Flow_DS_Nein">
        <di:waypoint x="1165" y="962" /><di:waypoint x="1395" y="962" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_DS1" bpmnElement="Flow_DS1">
        <di:waypoint x="1350" y="1042" /><di:waypoint x="1420" y="1042" /><di:waypoint x="1420" y="987" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_R5" bpmnElement="Flow_R5">
        <di:waypoint x="1445" y="962" /><di:waypoint x="1490" y="962" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_R6" bpmnElement="Flow_R6">
        <di:waypoint x="1650" y="962" /><di:waypoint x="1700" y="962" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_R7" bpmnElement="Flow_R7">
        <di:waypoint x="1860" y="962" /><di:waypoint x="1910" y="962" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_R8" bpmnElement="Flow_R8">
        <di:waypoint x="2070" y="962" /><di:waypoint x="2120" y="962" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_R9" bpmnElement="Flow_R9">
        <di:waypoint x="2200" y="930" /><di:waypoint x="2200" y="915" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_R10" bpmnElement="Flow_R10">
        <di:waypoint x="2290" y="887" /><di:waypoint x="2442" y="888" />
      </bpmndi:BPMNEdge>

      <!-- LANE 4: Teamleitung (y=1130..1340, center ~1235) -->
      <bpmndi:BPMNShape id="Shape_Event_Eskalation" bpmnElement="Event_Eskalation">
        <dc:Bounds x="2062" y="1217" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="2044" y="1260" width="72" height="30" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_AuditTrail" bpmnElement="Task_AuditTrail">
        <dc:Bounds x="2140" y="1200" width="170" height="70" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_GW_Freigabe" bpmnElement="GW_Freigabe" isMarkerVisible="true">
        <dc:Bounds x="2345" y="1210" width="50" height="50" />
        <bpmndi:BPMNLabel><dc:Bounds x="2348" y="1188" width="44" height="18" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_FreigabeSend" bpmnElement="Task_FreigabeSend">
        <dc:Bounds x="2420" y="1160" width="130" height="55" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_Task_Rueckfrage" bpmnElement="Task_Rueckfrage">
        <dc:Bounds x="2420" y="1260" width="130" height="55" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_End_Entscheidung_OK" bpmnElement="End_Entscheidung_OK">
        <dc:Bounds x="2522" y="1170" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="2508" y="1150" width="64" height="18" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Shape_End_Entscheidung_RQ" bpmnElement="End_Entscheidung_RQ">
        <dc:Bounds x="2522" y="1270" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="2504" y="1310" width="72" height="18" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>

      <!-- Entscheidung sequence flows -->
      <bpmndi:BPMNEdge id="Edge_Flow_E1" bpmnElement="Flow_E1">
        <di:waypoint x="2098" y="1235" /><di:waypoint x="2140" y="1235" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_E2" bpmnElement="Flow_E2">
        <di:waypoint x="2310" y="1235" /><di:waypoint x="2345" y="1235" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_FG_Ja" bpmnElement="Flow_FG_Ja">
        <di:waypoint x="2370" y="1210" /><di:waypoint x="2370" y="1188" /><di:waypoint x="2420" y="1188" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_FG_Nein" bpmnElement="Flow_FG_Nein">
        <di:waypoint x="2370" y="1260" /><di:waypoint x="2370" y="1288" /><di:waypoint x="2420" y="1288" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_E4" bpmnElement="Flow_E4">
        <di:waypoint x="2550" y="1188" /><di:waypoint x="2522" y="1188" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_Flow_E5" bpmnElement="Flow_E5">
        <di:waypoint x="2550" y="1288" /><di:waypoint x="2522" y="1288" />
      </bpmndi:BPMNEdge>

      <!-- MESSAGE FLOWS (vertical, routed to avoid boxes) -->
      <bpmndi:BPMNEdge id="Edge_MF_1" bpmnElement="MF_1">
        <di:waypoint x="410" y="190" /><di:waypoint x="410" y="332" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_MF_3" bpmnElement="MF_3">
        <di:waypoint x="570" y="510" /><di:waypoint x="570" y="820" /><di:waypoint x="410" y="820" /><di:waypoint x="410" y="947" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_MF_4" bpmnElement="MF_4">
        <di:waypoint x="2205" y="860" /><di:waypoint x="2205" y="820" /><di:waypoint x="730" y="820" /><di:waypoint x="730" y="488" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_MF_5" bpmnElement="MF_5">
        <di:waypoint x="2310" y="310" /><di:waypoint x="2310" y="168" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_MF_6" bpmnElement="MF_6">
        <di:waypoint x="1155" y="740" /><di:waypoint x="1155" y="270" /><di:waypoint x="1270" y="270" /><di:waypoint x="1270" y="168" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_MF_7" bpmnElement="MF_7">
        <di:waypoint x="2080" y="485" /><di:waypoint x="2080" y="1217" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Edge_MF_8" bpmnElement="MF_8">
        <di:waypoint x="2485" y="1160" /><di:waypoint x="2485" y="1110" /><di:waypoint x="2230" y="1110" /><di:waypoint x="2230" y="468" />
      </bpmndi:BPMNEdge>

    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
"""

with open(BPMN_PATH, 'w', encoding='utf-8') as f:
    f.writelines(header)
    f.write(NEW_DI)

print(f"Done! Written to {BPMN_PATH}")
with open(BPMN_PATH, 'r') as f:
    content = f.read()
print(f"File size: {len(content)} bytes, has width=2400: {'2400' in content}")
