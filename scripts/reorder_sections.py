#!/usr/bin/env python3
"""Reorder sections in App.tsx to improve storyline flow."""
import os

APP_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'App.tsx')

with open(APP_PATH, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Section boundaries (0-indexed: start is comment line, end is </section> line inclusive)
# From grep output (1-indexed), convert to 0-indexed:
sections = {
    'header_hero_top': (0, 541),        # lines 1-542 (everything up to challenges comment)
    'challenges':      (541, 617),       # lines 542-617
    'llm_limits':      (618, 686),       # lines 619-686
    'architecture':    (687, 815),       # lines 688-815
    'fall_becker':     (816, 1065),      # lines 817-1065
    'ki_vs_manuell':   (1066, 1191),     # lines 1067-1191
    'document_ai':     (1192, 1332),     # lines 1193-1332
    'scenarios':       (1333, 1428),     # lines 1334-1428
    'standards':       (1429, 1555),     # lines 1430-1555
    'graph_detail':    (1556, 1610),     # lines 1557-1610
    'tech_stack':      (1611, 1812),     # lines 1612-1812
    'process_mod':     (1813, 2114),     # lines 1814-2114
    'cta_footer_end':  (2115, len(lines)), # lines 2116-end
}

def get_section(name):
    start, end = sections[name]
    return lines[start:end]

# New order:
# header_hero_top → challenges → llm_limits → fall_becker → architecture →
# ki_vs_manuell → document_ai → process_mod → scenarios → graph_detail →
# tech_stack → standards → cta_footer_end

new_order = [
    'header_hero_top',
    'challenges',
    'llm_limits',
    'fall_becker',      # moved up: was after architecture
    'architecture',
    'ki_vs_manuell',
    'document_ai',
    'process_mod',      # moved up: was after tech_stack
    'scenarios',
    'graph_detail',
    'tech_stack',
    'standards',        # moved down: was after scenarios
    'cta_footer_end',
]

new_content = []
for section_name in new_order:
    chunk = get_section(section_name)
    new_content.extend(chunk)

with open(APP_PATH, 'w', encoding='utf-8') as f:
    f.writelines(new_content)

print(f"Done! Reordered App.tsx")
print(f"Original lines: {len(lines)}")
print(f"New lines: {len(new_content)}")

# Verify
with open(APP_PATH, 'r') as f:
    verify = f.readlines()
print(f"Verified lines on disk: {len(verify)}")
