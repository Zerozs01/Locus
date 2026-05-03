/**
 * Safety Level (Threat Matrix) Calculator
 * ────────────────────────────────────────
 * Multi-layer risk assessment for Thai provinces.
 *
 * Formula:  SafetyScore = 100 - ((Surface * 0.3) + (Network * 0.4) + (Core * 0.3))
 *
 * Layer 1 – Surface Risk  (30%):  Environmental  → PM2.5, heat, flood/storm
 * Layer 2 – Network Risk  (40%):  Infrastructure → traffic accidents, hospital reachability, road conditions
 * Layer 3 – Core Risk     (30%):  Human          → crime, tourist density, hotzone pressure
 */

// ─── Types ──────────────────────────────────────────────────────────────────────

export type ThreatStatus = 'stable' | 'warning' | 'critical';

export interface SafetyLayerBreakdown {
  /** 0-100 risk score (0 = no risk, 100 = max risk) */
  surfaceRisk: number;
  /** 0-100 risk score */
  networkRisk: number;
  /** 0-100 risk score */
  coreRisk: number;
}

export interface SafetyResult {
  /** 0-100 safety percentage (higher = safer) */
  score: number;
  /** Human-readable status */
  status: ThreatStatus;
  /** Status label in Thai */
  statusLabel: string;
  /** Individual layer breakdown */
  layers: SafetyLayerBreakdown;
}

export interface ProvinceRiskData {
  // ── Layer 1: Surface Risk (Environmental) ──
  /** Current AQI value (0-500). Higher → more risk */
  aqi?: number;
  /** Current temperature in Celsius */
  temperature?: number;
  /** Flood probability 0-1.  0 = no flood risk, 1 = certain flood */
  floodProbability?: number;

  // ── Layer 2: Network Risk (Infrastructure & Logistics) ──
  /** Road accident rate per 100k population.  Thailand avg ~32 */
  accidentRate?: number;
  /** Number of hospitals per 100k population.  Thailand avg ~3 */
  hospitalsPer100k?: number;
  /** Road condition index 0-100 (100 = perfect) */
  roadConditionIndex?: number;

  // ── Layer 3: Core Risk (Human) ──
  /** Crime rate per 100k population.  Thailand avg ~120 */
  crimeRate?: number;
  /** Tourist density score 0-100 (100 = extremely crowded, like Phuket peak) */
  touristDensity?: number;
  /** Hotzone / conflict zone score 0-100 */
  hotzoneScore?: number;

  // ── Pre-existing static safety field (fallback) ──
  /** Static safety score already on Province type (0-100) */
  staticSafety?: number;
}

// ─── Defaults (Thailand national averages / sensible baselines) ──────────────

const DEFAULT_AQI = 50;
const DEFAULT_TEMPERATURE = 30;
const DEFAULT_FLOOD_PROBABILITY = 0.1;

const DEFAULT_ACCIDENT_RATE = 32;
const DEFAULT_HOSPITALS_PER_100K = 3;
const DEFAULT_ROAD_CONDITION = 70;

const DEFAULT_CRIME_RATE = 120;
const DEFAULT_TOURIST_DENSITY = 30;
const DEFAULT_HOTZONE_SCORE = 5;

// ─── Normalization helpers ──────────────────────────────────────────────────────
// Each normalizer maps a raw value → 0-100 risk score.

/** Clamp value between 0 and 100 */
const clamp = (v: number): number => Math.max(0, Math.min(100, v));

/**
 * AQI → risk.
 *  0-50   Good         →  0-10 risk
 * 51-100  Moderate     → 10-30
 * 101-150 Unhealthy(S) → 30-55
 * 151-200 Unhealthy    → 55-75
 * 201-300 Very Unhealt → 75-90
 * 301+    Hazardous    → 90-100
 */
const normalizeAqiRisk = (aqi: number): number => {
  if (aqi <= 50) return (aqi / 50) * 10;
  if (aqi <= 100) return 10 + ((aqi - 50) / 50) * 20;
  if (aqi <= 150) return 30 + ((aqi - 100) / 50) * 25;
  if (aqi <= 200) return 55 + ((aqi - 150) / 50) * 20;
  if (aqi <= 300) return 75 + ((aqi - 200) / 100) * 15;
  return 90 + Math.min(10, ((aqi - 300) / 200) * 10);
};

/**
 * Temperature → heatstroke risk.
 *  < 25°C  → 0 risk
 * 25-32°C  → 0-15
 * 32-38°C  → 15-50
 * 38-42°C  → 50-80
 *  > 42°C  → 80-100
 */
const normalizeHeatRisk = (temp: number): number => {
  if (temp <= 25) return 0;
  if (temp <= 32) return ((temp - 25) / 7) * 15;
  if (temp <= 38) return 15 + ((temp - 32) / 6) * 35;
  if (temp <= 42) return 50 + ((temp - 38) / 4) * 30;
  return 80 + Math.min(20, ((temp - 42) / 5) * 20);
};

/**
 * Flood probability (0-1) → risk (0-100)
 */
const normalizeFloodRisk = (prob: number): number => clamp(prob * 100);

/**
 * Accident rate per 100k → risk.
 * Thailand avg ~32.  Scale: 0 → 0, 60+ → 100
 */
const normalizeAccidentRisk = (rate: number): number => clamp((rate / 60) * 100);

/**
 * Hospitals per 100k → risk (inverse).
 * More hospitals = lower risk.
 * 5+ → 0 risk, 0 → 100 risk
 */
const normalizeHospitalRisk = (count: number): number => clamp(100 - (count / 5) * 100);

/**
 * Road condition 0-100 → risk (inverse).
 * 100 = perfect road → 0 risk
 */
const normalizeRoadRisk = (index: number): number => clamp(100 - index);

/**
 * Crime rate per 100k → risk.
 * 0 → 0, 250+ → 100
 */
const normalizeCrimeRisk = (rate: number): number => clamp((rate / 250) * 100);

/**
 * Tourist density 0-100 → risk.
 * Direct mapping: extremely dense areas are riskier.
 */
const normalizeTouristRisk = (density: number): number => clamp(density);

/**
 * Hotzone score 0-100 → risk.
 * Direct mapping (conflict-prone areas).
 */
const normalizeHotzoneRisk = (score: number): number => clamp(score);

// ─── Main Calculator ────────────────────────────────────────────────────────────

/**
 * Calculate the Safety Level (Threat Matrix) for a province.
 *
 * If real data is unavailable for a variable, national-average defaults are used
 * so the score remains meaningful even with partial data.
 */
export function calculateSafetyLevel(data: ProvinceRiskData): SafetyResult {
  // ── Layer 1: Surface Risk (Environmental) ─────────────────
  const aqiRisk = normalizeAqiRisk(data.aqi ?? DEFAULT_AQI);
  const heatRisk = normalizeHeatRisk(data.temperature ?? DEFAULT_TEMPERATURE);
  const floodRisk = normalizeFloodRisk(data.floodProbability ?? DEFAULT_FLOOD_PROBABILITY);

  // Weighted average within layer  (AQI dominates)
  const surfaceRisk = clamp(aqiRisk * 0.45 + heatRisk * 0.30 + floodRisk * 0.25);

  // ── Layer 2: Network Risk (Infrastructure) ────────────────
  const accidentRisk = normalizeAccidentRisk(data.accidentRate ?? DEFAULT_ACCIDENT_RATE);
  const hospitalRisk = normalizeHospitalRisk(data.hospitalsPer100k ?? DEFAULT_HOSPITALS_PER_100K);
  const roadRisk = normalizeRoadRisk(data.roadConditionIndex ?? DEFAULT_ROAD_CONDITION);

  const networkRisk = clamp(accidentRisk * 0.40 + hospitalRisk * 0.35 + roadRisk * 0.25);

  // ── Layer 3: Core Risk (Human) ────────────────────────────
  const crimeRisk = normalizeCrimeRisk(data.crimeRate ?? DEFAULT_CRIME_RATE);
  const touristRisk = normalizeTouristRisk(data.touristDensity ?? DEFAULT_TOURIST_DENSITY);
  const hotzoneRisk = normalizeHotzoneRisk(data.hotzoneScore ?? DEFAULT_HOTZONE_SCORE);

  const coreRisk = clamp(crimeRisk * 0.45 + touristRisk * 0.25 + hotzoneRisk * 0.30);

  // ── Composite Score ───────────────────────────────────────
  const compositeRisk = surfaceRisk * 0.3 + networkRisk * 0.4 + coreRisk * 0.3;
  const score = Math.round(clamp(100 - compositeRisk));

  // ── Determine Status ──────────────────────────────────────
  let status: ThreatStatus;
  let statusLabel: string;

  if (score >= 80) {
    status = 'stable';
    statusLabel = 'เสถียร';
  } else if (score >= 50) {
    status = 'warning';
    statusLabel = 'เฝ้าระวัง';
  } else {
    status = 'critical';
    statusLabel = 'วิกฤต';
  }

  return {
    score,
    status,
    statusLabel,
    layers: {
      surfaceRisk: Math.round(surfaceRisk),
      networkRisk: Math.round(networkRisk),
      coreRisk: Math.round(coreRisk),
    },
  };
}

// ─── Region-level aggregator ────────────────────────────────────────────────────

/**
 * Calculate safety for an entire region by averaging province scores.
 * Falls back to static `province.safety` when no live data is available.
 */
export function calculateRegionSafety(
  provinces: Array<{ safety?: number; aqi?: number; temperature?: number }>,
  liveAqiByProvinceId?: Record<string, number>,
  liveTempByProvinceId?: Record<string, number>,
  provinceIds?: string[]
): SafetyResult & { provinceResults?: Array<{ name: string; score: number; layers: SafetyLayerBreakdown }> } {
  if (provinces.length === 0) {
    return { ...calculateSafetyLevel({}), provinceResults: [] };
  }

  const results = provinces.map((prov, i) => {
    const provinceId = provinceIds?.[i];
    const aqi = provinceId ? liveAqiByProvinceId?.[provinceId] : undefined;
    const temperature = provinceId ? liveTempByProvinceId?.[provinceId] : undefined;

    // Use full calculator
    return calculateSafetyLevel({
      aqi,
      temperature,
      staticSafety: prov.safety,
    });
  });

  const avgScore = Math.round(results.reduce((a, b) => a + b.score, 0) / results.length);
  const avgSurface = Math.round(results.reduce((a, b) => a + b.layers.surfaceRisk, 0) / results.length);
  const avgNetwork = Math.round(results.reduce((a, b) => a + b.layers.networkRisk, 0) / results.length);
  const avgCore = Math.round(results.reduce((a, b) => a + b.layers.coreRisk, 0) / results.length);

  const finalScore = clamp(avgScore);

  let status: ThreatStatus;
  let statusLabel: string;
  if (finalScore >= 80) {
    status = 'stable';
    statusLabel = 'เสถียร';
  } else if (finalScore >= 50) {
    status = 'warning';
    statusLabel = 'เฝ้าระวัง';
  } else {
    status = 'critical';
    statusLabel = 'วิกฤต';
  }

  return {
    score: finalScore,
    status,
    statusLabel,
    layers: { 
      surfaceRisk: avgSurface, 
      networkRisk: avgNetwork, 
      coreRisk: avgCore 
    },
    provinceResults: results.map((res, i) => ({
      name: (provinces[i] as any).name || `Province ${i + 1}`,
      score: res.score,
      layers: res.layers
    }))
  };
}

// ─── UI Helper ──────────────────────────────────────────────────────────────────

/** Get status indicator color for the threat level */
export function getSafetyStatusColor(status: ThreatStatus): string {
  switch (status) {
    case 'stable':
      return '#22c55e';   // green-500
    case 'warning':
      return '#f59e0b';   // amber-500
    case 'critical':
      return '#ef4444';   // red-500
  }
}

/** Get a pulsing animation class for the status dot */
export function getSafetyPulseClass(status: ThreatStatus): string {
  switch (status) {
    case 'stable':
      return '';
    case 'warning':
      return 'animate-pulse';
    case 'critical':
      return 'animate-ping';
  }
}
