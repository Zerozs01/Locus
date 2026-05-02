# Longdo Danger Zone Prompt Pack

ไฟล์นี้รวม prompt พร้อมใช้สำหรับ:
1. Deep research เติมข้อมูลจุดเสี่ยงให้มีพิกัดจริง
2. Implementation ในโค้ด (DB + IPC + TravelGuide + Province Detail)
3. ปรับคุณภาพการค้นหาและแสดงผล Longdo ให้เสถียร

---

## 0) Current Gap Snapshot (จากโค้ดปัจจุบัน)
- ตาราง `province_dangers` ยังมีเพียง: `label`, `severity`, `note`, `season`
- ยังไม่มี `lat/lng`, `place_name`, `radius`, `geojson/bbox`
- หน้า TravelGuide ใช้ hotspot แบบคำนวณ offset (mock), ไม่ใช่พิกัดจริง
- Province Detail (`ProvinceTactical`) ยังไม่มี marker/filter ประเภท danger โดยตรง

---

## 1) Prompt: Deep Research (เติมพิกัดจุดเสี่ยง)

คัดลอก prompt นี้ไปใช้กับโมเดล research agent:

```text
You are a Thailand geospatial data research assistant.
Task: Build a production-ready danger-zone dataset for Thai provinces, starting from existing danger labels.

Goal:
For each province danger item, return map-ready fields for Longdo map and fallback geocoding.

Input schema (existing):
- province_id
- province_name_th
- danger_label
- severity (low|medium|high)
- note
- season

Required output schema (per item):
- province_id
- province_name_th
- danger_label
- severity
- note
- season
- place_name_th
- place_name_en
- lat
- lng
- radius_meters
- confidence (0-1)
- source_type (official_report|news|historical|expert_inference)
- source_url
- source_published_at
- geocoding_query_th
- geocoding_query_en
- bbox (optional)
- geojson (optional)

Data quality rules:
1) Prefer official Thai government sources (DDPM, TMD, BMA, provincial disaster office, traffic police).
2) If exact coordinates are unavailable, infer nearest reliable centroid and set confidence <= 0.65.
3) If only district-level data exists, place marker at district center and increase radius accordingly.
4) Provide at least one verifiable source URL per item.
5) Return Thai and English place names for geocoder robustness.
6) Do not fabricate exact coordinates without source; use low confidence and explicit inference flag.

Coverage:
- At minimum top 3 danger items for each province in the input set.
- Prioritize flooding, PM2.5 hotspots, landslide/fire, traffic blackspots, heat-risk clusters.

Output format:
- Return JSON array only, valid UTF-8, no markdown.
```

---

## 2) Prompt: Implementation (DB + IPC + UI)

คัดลอก prompt นี้ให้ coding agent ทำงานใน repo นี้:

```text
You are a senior Electron + React + TypeScript engineer.
Implement danger-zone geospatial support end-to-end in this repository.

Repository context:
- TravelGuide page: src/renderer/src/pages/TravelGuide/index.tsx
- Province detail page: src/renderer/src/pages/ProvinceTactical/index.tsx
- Province map component: src/renderer/src/components/ProvinceMap.tsx
- DB layer: src/main/database/db.ts

Current state:
- province_dangers has only label/severity/note/season
- TravelGuide danger popup uses synthetic hotspot offsets
- ProvinceTactical map filters do not include danger

Tasks:
1) DB schema migration
- Extend `province_dangers` with:
  - place_name_th TEXT
  - place_name_en TEXT
  - lat REAL
  - lng REAL
  - radius_meters INTEGER DEFAULT 600
  - confidence REAL
  - source_url TEXT
  - source_type TEXT
  - source_published_at TEXT
  - geocoding_query_th TEXT
  - geocoding_query_en TEXT
  - bbox TEXT (JSON optional)
  - geojson TEXT (JSON optional)
- Add safe migration for existing DBs.

2) DB read/write mapping
- Update `getProvincePortal` to include above fields in `dangerZones` payload.
- Keep backward compatibility when fields are null.

3) TravelGuide updates
- Replace mock hotspot generator with real danger coordinates when available.
- Fallback order:
  a) lat/lng from danger item
  b) geocode `place_name_th|en`
  c) province centroid fallback (clearly labeled as approximate)
- In danger popup map preview, show:
  - coordinate confidence
  - source link (if any)
  - radius from data

4) ProvinceTactical updates
- Add danger marker type into map marker model and filter pills.
- Add a `Danger Alerts` filter chip in map controls.
- Add quick toggle in `Essentials` tab to show/hide danger markers.

5) Longdo/geocoder integration
- Build robust query from:
  - place_name_th + province_name_th
  - place_name_en + province_name_en
  - fallback geocoding_query_th/en
- Use bbox/geojson when present for area highlight.

6) UX and safety
- Clear label if location is approximate.
- Prevent blank-state crashes if no danger geometry exists.

7) Acceptance criteria
- No TS compile errors.
- TravelGuide danger popup uses real coordinates when present.
- ProvinceTactical can filter danger markers.
- Existing non-danger map features still work.

Return:
- Summary of changed files
- Migration notes
- Test checklist
```

---

## 3) Prompt: Longdo Query Optimization

คัดลอก prompt นี้เมื่อต้อง fine-tune การค้นหา Longdo:

```text
You are a map search quality engineer.
Optimize Thai location query strategy for Longdo map in an Electron app.

Objective:
Maximize precision and stability for danger-zone search and highlight in Thailand.

Input fields per danger item:
- place_name_th, place_name_en
- province_name_th, province_name_en
- lat, lng (optional)
- geocoding_query_th/en (optional)
- bbox/geojson (optional)

Deliver:
1) Query composition policy (Thai first, then EN fallback)
2) Ranking logic for candidates:
   - province match boost
   - type match boost (district/road/landmark)
   - distance-to-known-latlng penalty
3) Retry strategy (max attempts and backoff)
4) Confidence scoring formula
5) Fallback highlighting strategy when no polygon/bbox:
   - circle/rectangle with radius_meters
6) Telemetry fields for debugging false matches

Output format:
- concise technical spec
- pseudo-code for query builder and ranker
```

---

## 4) Ready-to-Run Checklist
- [ ] Run deep research and export JSON by output schema above
- [ ] Import JSON into `province_dangers` extended columns
- [ ] Apply DB migration and rebuild app
- [ ] Validate TravelGuide danger popup for 5 provinces
- [ ] Validate ProvinceTactical danger filter on map
- [ ] Verify fallback behavior when coordinates are missing
- [ ] Verify Longdo open-link uses best available query

---

## 5) Suggested File for Research Output
เก็บผล deep research เป็น JSON ที่:
- `documents/deepreserach/danger_zone_geodata.json`

จากนั้นค่อยเขียน importer script เข้า DB ต่อ
