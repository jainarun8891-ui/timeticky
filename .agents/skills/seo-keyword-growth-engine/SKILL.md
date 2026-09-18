---
name: seo-keyword-growth-engine
description: >-
  Automated SEO keyword mining, Google Autocomplete extraction, programmatic content gap analysis,
  and instant search engine indexing to drive high-volume organic search traffic.
---

# SEO Keyword Growth Engine

This skill equips Antigravity with programmatic tools to discover untapped, high-volume search queries and convert them into top-ranking landing pages with instant search engine submission.

---

## 1. Mining Live Google Queries
Run the real-time Google keyword miner to scrape active search trends across any seed term without needing external paid subscriptions:

```bash
# Mine default horology and time difference keywords
node scripts/keyword_miner.mjs

# Mine specific custom topic
node scripts/keyword_miner.mjs "time difference new york to"
```

Output: Saved to `scripts/mined_keywords.json` categorized by:
- **Bilateral Comparison (Ultra Low KD)**: High volume, low competition queries like `time difference between california and hawaii`.
- **Direct Answer / Snippet Box**: Targets Position 0 Google answers (`what time is it in...`).
- **Utility & Converting**: Targets converters (`convert est to pst`).

---

## 2. Programmatic Content Expansion
When high-volume queries are identified:
1. Check if an existing route covers the intent (`/time-difference/[cityA]/[cityB]`, `/convert/[combo]`, `/[city]`).
2. If missing, add the city or pair to the static generator list in `src/app/time-difference/[cityA]/[cityB]/page.tsx` or `src/lib/geo/cities.ts`.
3. Verify that the URL is added to `sitemap.xml/route.ts` with valid canonical status.

---

## 3. Instant Search Engine Submission (IndexNow Protocol)
Immediately push newly generated pages to search engine crawl queues:

```bash
npm run seo:ping
```

This notifies Microsoft Bing, Yandex, Seznam, and IndexNow network crawlers within seconds of deployment.
