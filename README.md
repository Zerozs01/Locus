# Locus - Agentic AI for Geospatial Intelligence and Situational Awareness

## 📦 Local Data Setup & Enrichment

When you pull this repository and run `npm run dev` for the first time, Locus will automatically initialize a local SQLite database (`locus.db`) and inject a baseline blueprint of locations fetched from our Deep Research documentation.

To enrich this baseline data with dynamic information (high-resolution thumbnail URLs, Google ratings, open hours, and addresses) using our native Playwright scraper, run:

```bash
# Run on-demand scraper for incomplete rows
npm run db:enrich

# Force re-scrape all rows even if data exists
npm run db:enrich:force
```
