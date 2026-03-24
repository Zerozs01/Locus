import { Compass, Shield, Thermometer } from 'lucide-react';
import { mixHex, toRgba } from '../utils/color';

type ClimateTone = 'cool' | 'warm' | 'hot';
type StabilityTone = 'stable' | 'watch' | 'volatile';
type MobilityTone = 'normal' | 'seasonal' | 'congested' | 'disrupted';

const DEFAULT_ACCENT = '#06b6d4';
const DEFAULT_DIM = '#164e63';
const DEFAULT_TONE_RAMP: readonly [string, string, string] = ['#67e8f9', '#06b6d4', '#155e75'];

const climateLift: Record<ClimateTone, number> = {
  cool: 0.38,
  warm: 0.28,
  hot: 0.18
};

const stabilityLift: Record<StabilityTone, number> = {
  stable: 0.34,
  watch: 0.24,
  volatile: 0.16
};

const mobilityLift: Record<MobilityTone, number> = {
  normal: 0.36,
  seasonal: 0.28,
  congested: 0.18,
  disrupted: 0.1
};

export interface ClimateStatProps {
  value: string;
  trend: string;
  tone: ClimateTone;
}

export interface StabilityStatProps {
  value: string;
  label: string;
  tone: StabilityTone;
}

export interface MobilityStatProps {
  state: string;
  subtitle: string;
  tone: MobilityTone;
}

export interface RegionalIntelBarProps {
  climate: ClimateStatProps;
  stability: StabilityStatProps;
  mobility: MobilityStatProps;
  accentHex?: string;
  dimHex?: string;
  toneRamp?: readonly [string, string, string];
}

interface RegionSurfaceProps {
  accentHex: string;
  dimHex: string;
  toneRamp: readonly [string, string, string];
}

const getTrendIcon = (trend: string) => {
  const trimmed = trend.trim();
  if (trimmed.startsWith('-') || trimmed.includes('↓')) return '↓';
  return '↑';
};

const getAccentText = (accentHex: string, lift: number) => mixHex(accentHex, '#ffffff', lift);

const getLabelColor = (toneColor: string) => toRgba(getAccentText(toneColor, 0.24), 0.68);

const getTileStyle = (toneColor: string, lift: number) => ({
  color: getAccentText(toneColor, Math.min(0.28, lift * 0.35)),
  background: 'linear-gradient(180deg, rgba(25, 28, 33, 0.98) 0%, rgba(17, 19, 23, 0.98) 100%)',
  borderColor: toRgba(toneColor, 0.16 + lift * 0.08),
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 18px ${toRgba(toneColor, 0.05)}`
});

const getValueStyle = (toneColor: string, lift: number) => ({
  color: getAccentText(toneColor, lift <= 0.18 ? 0.22 : 0.16)
});

const getMetaStyle = (toneColor: string, lift: number) => ({
  color: getAccentText(toneColor, Math.max(0.2, lift * 0.3))
});

const ClimateStat = ({ value, trend, tone, toneRamp }: ClimateStatProps & RegionSurfaceProps) => {
  const lift = climateLift[tone];
  const toneColor = toneRamp[0];
  const arrow = getTrendIcon(trend);

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border" style={getTileStyle(toneColor, lift)}>
        <Thermometer size={18} />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-semibold leading-none" style={getValueStyle(toneColor, lift)}>
          {value}
        </div>
        <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: getLabelColor(toneColor) }}>
          อุณหภูมิเฉลี่ย
        </div>
        <div className="text-[11px]" style={getMetaStyle(toneColor, lift)}>
          {arrow} {trend.replace(/^[-+]/, '')}
        </div>
      </div>
    </div>
  );
};

const StabilityStat = ({ value, label, tone, toneRamp }: StabilityStatProps & RegionSurfaceProps) => {
  const lift = stabilityLift[tone];
  const toneColor = toneRamp[1];
  const accent = getAccentText(toneColor, 0.12);

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border" style={getTileStyle(toneColor, lift)}>
        <Shield size={18} />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-semibold leading-none" style={getValueStyle(toneColor, lift)}>
          {value}
        </div>
        <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: getLabelColor(toneColor) }}>
          เสถียรภาพ
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/60">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
          <span style={getMetaStyle(toneColor, lift)}>{label}</span>
        </div>
        <div
          className="mt-1 h-[2px] w-16 rounded-full"
          style={{ background: `linear-gradient(90deg, ${toRgba(accent, 0.92)} 0%, ${toRgba(toneColor, 0.28)} 100%)` }}
        />
      </div>
    </div>
  );
};

const MobilityStat = ({ state, subtitle, tone, toneRamp }: MobilityStatProps & RegionSurfaceProps) => {
  const lift = mobilityLift[tone];
  const toneColor = toneRamp[2];

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border" style={getTileStyle(toneColor, lift)}>
        <Compass size={18} />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-semibold leading-none" style={getValueStyle(toneColor, lift)}>
          {state}
        </div>
        <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: getLabelColor(toneColor) }}>
          การเคลื่อนตัว
        </div>
        <div className="text-[11px]" style={getMetaStyle(toneColor, lift)}>
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export const RegionalIntelBar = ({
  climate,
  stability,
  mobility,
  accentHex = DEFAULT_ACCENT,
  dimHex = DEFAULT_DIM,
  toneRamp = DEFAULT_TONE_RAMP
}: RegionalIntelBarProps) => {
  return (
    <div
      className="mt-4 min-h-[96px] rounded-[1.45rem] border backdrop-blur-md p-4 transition-shadow"
      style={{
        background: `
          radial-gradient(circle at 8% 0%, ${toRgba(toneRamp[0], 0.06)} 0%, transparent 26%),
          radial-gradient(circle at 52% 100%, ${toRgba(toneRamp[1], 0.04)} 0%, transparent 30%),
          radial-gradient(circle at 100% 18%, ${toRgba(toneRamp[2], 0.06)} 0%, transparent 28%),
          linear-gradient(180deg, rgba(17, 19, 23, 0.96) 0%, rgba(11, 13, 16, 0.98) 100%)
        `,
        borderColor: toRgba(accentHex, 0.12),
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 36px rgba(0,0,0,0.24), 0 0 0 1px ${toRgba(toneRamp[1], 0.02)}`
      }}
    >
      <div
        className="mt-1 h-px w-full"
        style={{ background: `linear-gradient(90deg, ${toRgba(toneRamp[0], 0.1)} 0%, ${toRgba(toneRamp[1], 0.18)} 44%, ${toRgba(toneRamp[2], 0.1)} 100%)` }}
      />
      <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ClimateStat {...climate} accentHex={accentHex} dimHex={dimHex} toneRamp={toneRamp} />
        <StabilityStat {...stability} accentHex={accentHex} dimHex={dimHex} toneRamp={toneRamp} />
        <MobilityStat {...mobility} accentHex={accentHex} dimHex={dimHex} toneRamp={toneRamp} />
      </div>
    </div>
  );
};
