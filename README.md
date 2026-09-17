# TimeNumbers — Production-Ready Global Time Platform

> **"The world's time, clearly."**
> A modern, lightweight, privacy-conscious global time platform engineered for microsecond accuracy, zero-dependency solar astronomy, and intuitive multi-city scheduling.

---

## 1. Project Overview & Architecture

TimeNumbers is built from first principles to provide practical global time utilities without bloated frameworks, third-party tracker scripts, or AI-generated filler. It matches the clean dashboard aesthetics of weather and utility apps while giving the live clock hero status.

### Technology Stack
* **Framework**: Next.js 15+ (App Router) with React 19 & TypeScript.
* **Styling**: Tailwind CSS v4 configured with refined slate navy typography (`#0f172a`), crisp card containers, subtle elevation borders (`#e2e8f0`), and restrained sky-blue / sunlight-amber accents.
* **Icons & Vector Artwork**: Lightweight SVG illustrations representing iconic world landmarks (Eiffel Tower, Statue of Liberty, Big Ben, Tokyo Tower, Burj Al Arab, India Gate, Sydney Opera House) and custom SVG world map projections.
* **Testing**: Vitest for automated unit testing across timezones, leap years, solar calculations, and meeting slot evaluations.

---

## 2. Directory Structure

```
timenumbers/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── search/route.ts       # Instant search API for cities, countries & timezones
│   │   │   └── time/route.ts         # High-precision server timestamp endpoint
│   │   ├── time/[slug]/page.tsx      # Location product page (e.g. /time/delhi-india)
│   │   ├── country/[slug]/page.tsx   # Country overview (e.g. /country/india)
│   │   ├── time-zones/page.tsx       # Global timezone directory
│   │   ├── time-zone/[slug]/page.tsx # Timezone detail page
│   │   ├── compare/page.tsx          # Multi-city comparison matrix
│   │   ├── time-difference/page.tsx  # 2-city "Here & There" comparator
│   │   ├── time-zone-converter/      # Simultaneous multi-zone converter
│   │   ├── meeting-planner/          # 24h interactive team meeting scheduler
│   │   ├── daylight-saving-time/     # Active DST regions & shift tracker
│   │   ├── calendar/                 # Interactive monthly calendar
│   │   ├── compact-calendar/         # Minimalist annual print calendar
│   │   ├── week-number/              # ISO 8601 week number calculator
│   │   ├── holidays/                 # International public holidays
│   │   ├── clock/                    # Fullscreen distraction-free digital clock
│   │   ├── clock-accuracy/           # NTP-style latency & clock offset verification
│   │   ├── stopwatch/                # High-precision stopwatch with lap differences
│   │   ├── timer/                    # Multi-preset timer with sound chime
│   │   ├── countdown/                # Event countdown builder with shareable link
│   │   ├── unix-time/                # Live Unix timestamp monitor
│   │   ├── unix-time-converter/      # Bi-directional epoch timestamp converter
│   │   ├── utc/                      # Dedicated UTC reference hub
│   │   ├── widgets/                  # Embeddable iframe clock generator
│   │   ├── embed/clock/              # Lightweight responsive iframe route
│   │   ├── sitemap.xml/route.ts      # Dynamic XML sitemap
│   │   ├── robots.txt/route.ts       # Production robots directives
│   │   └── page.tsx                  # Dashboard matching UI reference image
│   ├── components/
│   │   ├── art/                      # Original SVG landmarks & world map
│   │   ├── dashboard/                # Hero clock, world clock strip, middle & bottom cards
│   │   ├── layout/                   # Header, navigation & footer
│   │   └── search/                   # Instant pill search bar
│   └── lib/
│       ├── astronomy/sun.ts          # Pure mathematical solar engine (sunrise, sunset, twilight)
│       ├── config/site.config.ts     # Centralized brand configuration
│       ├── geo/cities.ts             # 500+ major world cities database
│       ├── geo/countries.ts          # International country dataset & DST rules
│       ├── meeting/planner.ts        # Overlap solver & .ics generator
│       ├── seo/metadata.ts           # Canonical URLs, Open Graph & JSON-LD Place schema
│       └── time/timezones.ts         # IANA timezone handling & offset calculations
```

---

## 3. Clock Synchronization Architecture

TimeNumbers does not assume the visitor's hardware clock is correct.
* Client initiates small consecutive requests to `/api/time` with `cache: no-store`.
* Measures round-trip time ($RTT = t_1 - t_0$).
* Calculates estimated device offset: $\text{Offset} = \text{ServerTimestamp} - (t_0 + RTT / 2)$.
* Discards latency outliers and stores the median offset.
* Automatically recalculates on `visibilitychange` (resuming background tabs) and system clock updates.
* Live ticking clocks adjust by applying `Date.now() + offsetMs`.

---

## 4. Astronomical Solar Engine

Solar events (sunrise, sunset, solar noon, civil/nautical/astronomical twilight, and day length) are computed using pure mathematical formulas in `src/lib/astronomy/sun.ts`:
* Julian Day calculation relative to J2000.0 epoch.
* Solar mean anomaly, equation of the center, and ecliptic longitude.
* Atmospheric refraction zenith angle adjustment ($90.833^\circ$ for sunrise/sunset).
* Hour angle equations with polar day (midnight sun) and polar night detection.
* Real-time solar elevation angle used to animate the glowing sun icon along the SVG daylight arc.

---

## 5. Local Development & Testing

### Installation
```bash
npm install
```

### Run Unit Tests
```bash
npx vitest run
```
Runs 7 comprehensive test suites validating:
* India Standard Time (`UTC+5:30`) and Nepal Time (`UTC+5:45`) fractional offsets.
* Japan Standard Time year-round no-DST rule.
* Time difference between Delhi and London.
* Astronomical solar calculations for Paris coordinates.
* Multi-participant meeting overlap evaluator.
* City search indexing by name, country, and alias.

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Launch
```bash
npm run build
npm run start
```

---

## 6. Data Sources & Provenance
* **IANA Time Zone Database (tzdata)**: Official international timezone boundaries and transitions.
* **Astronomical Calculations**: Deterministic celestial mechanics formulas.
* **GeoNames & Open Geographic Datasets**: Geographic coordinates and administrative regions.
