#!/usr/bin/env python3
"""Extract all URLs from source files and check their HTTP status."""
import re
import urllib.request
import urllib.error
import sys
import glob

# Domains to skip (bot-protected, require auth, or localhost dev-only)
SKIP_DOMAINS = [
    'bsi.bund.de',
    'azure.microsoft.com',
    'rvrecht.deutsche-rentenversicherung.de',
    'localhost',
    '127.0.0.1',
]

# Find all source files
patterns = ['src/**/*.tsx', 'src/**/*.ts', '*.md', 'src/**/*.md']
files = []
for p in patterns:
    files.extend(glob.glob(p, recursive=True))

url_pattern = re.compile(r'https?://[^\s"\'<>)\]]+')

# Collect all URLs with context
url_sources: dict[str, list[str]] = {}
for filepath in files:
    with open(filepath, encoding='utf-8') as f:
        content = f.read()
    for match in url_pattern.finditer(content):
        url = match.group().rstrip('.,;`')
        url_sources.setdefault(url, []).append(filepath)

print(f"Found {len(url_sources)} unique URLs\n")

# Check each URL
results = []
skipped = []
for url in sorted(url_sources.keys()):
    if any(domain in url for domain in SKIP_DOMAINS):
        skipped.append(url)
        print(f"- [SKIP] {url}")
        continue
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        resp = urllib.request.urlopen(req, timeout=8)
        status = resp.status
    except urllib.error.HTTPError as e:
        status = e.code
    except Exception as e:
        status = f"ERROR: {e}"
    results.append((status, url, url_sources[url]))

# Print results
broken = []
for status, url, sources in results:
    ok = isinstance(status, int) and 200 <= status < 400
    # Treat 5xx (server errors) as warnings, not broken links — may be transient
    server_error = isinstance(status, int) and status >= 500
    tag = "\u2713" if ok else ("\u26a0" if server_error else "\u2717")
    print(f"{tag} [{status}] {url}")
    print(f"      in: {', '.join(set(sources))}")
    if not ok and not server_error:
        broken.append((status, url, sources))
print(f"\n{'='*60}")
print(f"Total: {len(results)} checked, {len(skipped)} skipped | OK: {len(results)-len(broken)} | Broken: {len(broken)}")
if skipped:
    print(f"\nSKIPPED (bot-protected / localhost):\n  " + "\n  ".join(skipped))
if broken:
    print("\nBROKEN / PROBLEMATIC:")
    for status, url, sources in broken:
        print(f"  [{status}] {url}")
        print(f"    in: {', '.join(set(sources))}")
    sys.exit(1)
