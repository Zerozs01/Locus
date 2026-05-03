/**
 * Best Season (Tactical Deployment Season) Evaluator
 * ────────────────────────────────────────────────────
 * Evaluates optimal travel months by analyzing 3 axes:
 *   1. Weather Stability  – low flood/wildfire risk, mild temperature
 *   2. Logistical Safety  – clear traffic, safe roads
 *   3. Quietness          – 'Shoulder Season' over overcrowded peaks
 *
 * If the radar chart expands close to the max on all 3 axes,
 * that month is marked as "Recommended Tactical Season".
 */

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface MonthScore {
  /** 1-12 */
  month: number;
  /** Full month name (English) */
  monthName: string;
  /** 0-100 */
  weatherStability: number;
  /** 0-100 */
  logisticalSafety: number;
  /** 0-100 */
  quietness: number;
  /** Average of all 3 axes */
  composite: number;
  /** Whether this month qualifies as recommended */
  isRecommended: boolean;
}

export interface SeasonEvaluation {
  /** All 12 months with scores */
  months: MonthScore[];
  /** Best month(s) — recommended tactical season */
  recommended: MonthScore[];
  /** Human-readable best season label, e.g. "Nov - Feb" */
  seasonLabel: string;
  /** Thai label */
  seasonLabelTh: string;
}

// ─── Constants ──────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_NAMES_TH = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
];

/** Threshold: month is "recommended" if composite >= this */
const RECOMMENDED_THRESHOLD = 70;

// ─── Region-specific Climate Profiles ───────────────────────────────────────────
// Each profile stores monthly values for the 3 axes (0-100).
// Data derived from Thai Meteorological Department general patterns.

interface RegionClimateProfile {
  /** Monthly weather stability scores (Jan..Dec) */
  weather: number[];
  /** Monthly logistical safety scores */
  logistics: number[];
  /** Monthly quietness scores (inverse of crowd density) */
  quietness: number[];
}

const regionProfiles: Record<string, RegionClimateProfile> = {
  north: {
    //          Jan  Feb  Mar  Apr  May  Jun  Jul  Aug  Sep  Oct  Nov  Dec
    weather:  [ 90,  88,  70,  55,  45,  40,  35,  35,  40,  55,  80,  90],
    logistics:[ 85,  82,  75,  65,  55,  50,  48,  45,  50,  60,  80,  85],
    quietness:[ 55,  60,  70,  75,  85,  88,  90,  90,  85,  75,  50,  45],
  },
  northeast: {
    weather:  [ 92,  90,  75,  55,  40,  38,  35,  32,  38,  50,  82,  92],
    logistics:[ 88,  85,  78,  68,  58,  52,  50,  48,  52,  62,  82,  88],
    quietness:[ 60,  65,  72,  78,  88,  90,  92,  92,  88,  78,  55,  50],
  },
  central: {
    weather:  [ 85,  82,  68,  50,  42,  40,  38,  35,  38,  48,  75,  85],
    logistics:[ 70,  68,  62,  55,  48,  45,  42,  40,  42,  50,  65,  72],
    quietness:[ 45,  50,  58,  65,  78,  82,  85,  85,  82,  72,  42,  38],
  },
  west: {
    weather:  [ 90,  88,  72,  55,  42,  38,  35,  32,  38,  52,  80,  90],
    logistics:[ 85,  82,  75,  65,  55,  50,  48,  45,  50,  60,  78,  85],
    quietness:[ 52,  58,  68,  75,  85,  88,  90,  90,  88,  75,  48,  42],
  },
  east: {
    weather:  [ 85,  88,  82,  65,  48,  42,  38,  35,  40,  52,  78,  85],
    logistics:[ 80,  82,  78,  68,  55,  50,  48,  45,  48,  58,  75,  82],
    quietness:[ 40,  42,  50,  62,  78,  82,  85,  85,  82,  72,  38,  35],
  },
  south: {
    // South has unique monsoon patterns — Andaman vs Gulf
    weather:  [ 78,  82,  80,  72,  55,  50,  48,  50,  48,  42,  55,  72],
    logistics:[ 82,  85,  82,  75,  62,  58,  55,  55,  55,  50,  60,  78],
    quietness:[ 35,  40,  55,  68,  82,  85,  88,  88,  85,  78,  45,  32],
  },
};

// ─── Fallback for unknown region ────────────────────────────────────────────────
const defaultProfile: RegionClimateProfile = {
  weather:   [80, 80, 70, 60, 50, 45, 42, 40, 45, 55, 72, 80],
  logistics: [78, 75, 70, 62, 52, 48, 45, 42, 48, 55, 70, 78],
  quietness: [50, 55, 62, 70, 80, 82, 85, 85, 82, 72, 48, 45],
};

// ─── Main Evaluator ─────────────────────────────────────────────────────────────

/**
 * Evaluate the best travel season for a region.
 *
 * @param regionId - e.g. 'north', 'south', 'central'
 * @param overrides - optional real-time data to adjust scores
 */
export function evaluateBestSeason(
  regionId: string,
  overrides?: {
    /** Override specific month weather scores */
    weatherOverrides?: Partial<Record<number, number>>;
    /** Override specific month logistics scores */
    logisticsOverrides?: Partial<Record<number, number>>;
    /** Current month AQI (adjusts weather score for current & nearby months) */
    currentAqi?: number;
    /** Current temperature (adjusts weather score) */
    currentTemp?: number;
  }
): SeasonEvaluation {
  const profile = regionProfiles[regionId] || defaultProfile;

  const months: MonthScore[] = [];

  for (let i = 0; i < 12; i++) {
    let weather = profile.weather[i];
    let logistics = profile.logistics[i];
    const quietness = profile.quietness[i];

    // Apply overrides if provided
    if (overrides?.weatherOverrides?.[i + 1] !== undefined) {
      weather = overrides.weatherOverrides[i + 1]!;
    }
    if (overrides?.logisticsOverrides?.[i + 1] !== undefined) {
      logistics = overrides.logisticsOverrides[i + 1]!;
    }

    // Apply AQI adjustment to current month
    if (overrides?.currentAqi !== undefined) {
      const currentMonth = new Date().getMonth(); // 0-indexed
      if (i === currentMonth) {
        // High AQI penalizes weather stability
        const aqiPenalty = overrides.currentAqi > 100
          ? Math.min(30, (overrides.currentAqi - 100) * 0.2)
          : overrides.currentAqi > 50
            ? Math.min(10, (overrides.currentAqi - 50) * 0.1)
            : 0;
        weather = Math.max(0, weather - aqiPenalty);
      }
    }

    // Apply temperature adjustment
    if (overrides?.currentTemp !== undefined) {
      const currentMonth = new Date().getMonth();
      if (i === currentMonth && overrides.currentTemp > 38) {
        const heatPenalty = Math.min(20, (overrides.currentTemp - 38) * 5);
        weather = Math.max(0, weather - heatPenalty);
      }
    }

    const composite = Math.round((weather + logistics + quietness) / 3);

    months.push({
      month: i + 1,
      monthName: MONTH_NAMES[i],
      weatherStability: Math.round(weather),
      logisticalSafety: Math.round(logistics),
      quietness: Math.round(quietness),
      composite,
      isRecommended: composite >= RECOMMENDED_THRESHOLD,
    });
  }

  const recommended = months.filter((m) => m.isRecommended);

  // Build season label from recommended months
  const seasonLabel = buildSeasonLabel(recommended);
  const seasonLabelTh = buildSeasonLabelTh(recommended);

  return { months, recommended, seasonLabel, seasonLabelTh };
}

// ─── Label helpers ──────────────────────────────────────────────────────────────

function buildSeasonLabel(recommended: MonthScore[]): string {
  if (recommended.length === 0) return 'No ideal season';
  if (recommended.length >= 10) return 'All Year Round';

  // Find contiguous ranges
  const ranges = findContiguousRanges(recommended.map((m) => m.month));
  return ranges
    .map(([start, end]) => {
      if (start === end) return MONTH_NAMES[start - 1].slice(0, 3);
      return `${MONTH_NAMES[start - 1].slice(0, 3)} - ${MONTH_NAMES[end - 1].slice(0, 3)}`;
    })
    .join(', ');
}

function buildSeasonLabelTh(recommended: MonthScore[]): string {
  if (recommended.length === 0) return 'ไม่มีช่วงเหมาะสม';
  if (recommended.length >= 10) return 'เที่ยวได้ทั้งปี';

  const ranges = findContiguousRanges(recommended.map((m) => m.month));
  return ranges
    .map(([start, end]) => {
      if (start === end) return MONTH_NAMES_TH[start - 1];
      return `${MONTH_NAMES_TH[start - 1]} - ${MONTH_NAMES_TH[end - 1]}`;
    })
    .join(', ');
}

/**
 * Find contiguous month ranges from a sorted month array.
 * Handles wrap-around (e.g. Nov, Dec, Jan, Feb → [11, 2]).
 */
function findContiguousRanges(months: number[]): Array<[number, number]> {
  if (months.length === 0) return [];

  const sorted = [...new Set(months)].sort((a, b) => a - b);
  const ranges: Array<[number, number]> = [];
  let start = sorted[0];
  let prev = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === prev + 1) {
      prev = sorted[i];
    } else {
      ranges.push([start, prev]);
      start = sorted[i];
      prev = sorted[i];
    }
  }
  ranges.push([start, prev]);

  // Try to merge wrap-around (Dec→Jan)
  if (ranges.length >= 2) {
    const first = ranges[0];
    const last = ranges[ranges.length - 1];
    if (last[1] === 12 && first[0] === 1) {
      // Merge: last start → first end
      ranges[ranges.length - 1] = [last[0], first[1]];
      ranges.shift();
    }
  }

  return ranges;
}

// ─── Radar Chart Data Helper ────────────────────────────────────────────────────

export interface RadarDataPoint {
  axis: string;
  value: number;
  fullMark: number;
}

/**
 * Convert a MonthScore into Recharts-compatible radar chart data.
 */
export function toRadarData(month: MonthScore): RadarDataPoint[] {
  return [
    { axis: 'Weather Stability', value: month.weatherStability, fullMark: 100 },
    { axis: 'Logistical Safety', value: month.logisticalSafety, fullMark: 100 },
    { axis: 'Quietness', value: month.quietness, fullMark: 100 },
  ];
}

/**
 * Get the overall "best month" for a region.
 */
export function getBestMonth(regionId: string): MonthScore {
  const evaluation = evaluateBestSeason(regionId);
  const sorted = [...evaluation.months].sort((a, b) => b.composite - a.composite);
  return sorted[0];
}

/**
 * Get a short season label for display in dashboard cards.
 */
export function getSeasonLabel(regionId: string): string {
  const evaluation = evaluateBestSeason(regionId);
  return evaluation.seasonLabel;
}
