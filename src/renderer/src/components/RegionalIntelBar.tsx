import { Compass, Shield, Thermometer } from 'lucide-react';

type ClimateTone = 'cool' | 'warm' | 'hot';
type StabilityTone = 'stable' | 'watch' | 'volatile';
type MobilityTone = 'normal' | 'seasonal' | 'congested' | 'disrupted';

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
}

const climateColors: Record<ClimateTone, { value: string; accent: string }> = {
  cool: { value: 'text-sky-300', accent: 'text-sky-400' },
  warm: { value: 'text-amber-300', accent: 'text-amber-400' },
  hot: { value: 'text-rose-300', accent: 'text-rose-400' },
};

const stabilityColors: Record<StabilityTone, { value: string; dot: string; bar: string }> = {
  stable: { value: 'text-emerald-300', dot: 'bg-emerald-400', bar: 'bg-emerald-400/70' },
  watch: { value: 'text-amber-300', dot: 'bg-amber-400', bar: 'bg-amber-400/70' },
  volatile: { value: 'text-rose-300', dot: 'bg-rose-400', bar: 'bg-rose-400/70' },
};

const mobilityColors: Record<MobilityTone, { value: string; accent: string }> = {
  normal: { value: 'text-cyan-300', accent: 'text-cyan-400' },
  seasonal: { value: 'text-indigo-300', accent: 'text-indigo-400' },
  congested: { value: 'text-orange-300', accent: 'text-orange-400' },
  disrupted: { value: 'text-red-300', accent: 'text-red-400' },
};

const getTrendIcon = (trend: string) => {
  const trimmed = trend.trim();
  if (trimmed.startsWith('-') || trimmed.includes('↓')) return '↓';
  return '↑';
};

export const ClimateStat = ({ value, trend, tone }: ClimateStatProps) => {
  const colors = climateColors[tone];
  const arrow = getTrendIcon(trend);
  return (
    <div className="flex items-center gap-3">
      <div className={`h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${colors.accent}`}>
        <Thermometer size={18} />
      </div>
      <div className="flex flex-col">
        <div className={`text-lg font-semibold leading-none ${colors.value}`}>{value}</div>
        <div className="text-[10px] uppercase tracking-widest text-white/50">อุณหภูมิเฉลี่ย</div>
        <div className={`text-[11px] ${colors.accent}`}>{arrow} {trend.replace(/^[-+]/, '')}</div>
      </div>
    </div>
  );
};

export const StabilityStat = ({ value, label, tone }: StabilityStatProps) => {
  const colors = stabilityColors[tone];
  return (
    <div className="flex items-center gap-3">
      <div className={`h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${colors.value}`}>
        <Shield size={18} />
      </div>
      <div className="flex flex-col">
        <div className={`text-lg font-semibold leading-none ${colors.value}`}>{value}</div>
        <div className="text-[10px] uppercase tracking-widest text-white/50">เสถียรภาพ</div>
        <div className="flex items-center gap-2 text-[11px] text-white/60">
          <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
          {label}
        </div>
        <div className={`mt-1 h-[2px] w-16 rounded-full ${colors.bar}`} />
      </div>
    </div>
  );
};

export const MobilityStat = ({ state, subtitle, tone }: MobilityStatProps) => {
  const colors = mobilityColors[tone];
  return (
    <div className="flex items-center gap-3">
      <div className={`h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${colors.accent}`}>
        <Compass size={18} />
      </div>
      <div className="flex flex-col">
        <div className={`text-lg font-semibold leading-none ${colors.value}`}>{state}</div>
        <div className="text-[10px] uppercase tracking-widest text-white/50">การเคลื่อนตัว</div>
        <div className={`text-[11px] ${colors.accent}`}>{subtitle}</div>
      </div>
    </div>
  );
};

export const RegionalIntelBar = ({ climate, stability, mobility }: RegionalIntelBarProps) => {
  return (
    <div className="mt-3 min-h-[96px] rounded-2xl border border-white/5 bg-[#0a0c10]/70 backdrop-blur-md p-4 shadow-[0_0_25px_rgba(8,145,178,0.12)] hover:shadow-[0_0_30px_rgba(8,145,178,0.18)] transition-shadow">
      <div className="mt-1 h-px w-full bg-gradient-to-r from-white/10 via-white/30 to-transparent" />
      <div className="mt-3 grid grid-cols-3 gap-4">
        <ClimateStat {...climate} />
        <StabilityStat {...stability} />
        <MobilityStat {...mobility} />
      </div>
    </div>
  );
};
