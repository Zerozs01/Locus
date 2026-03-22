import { useState, useEffect } from 'react';
import {
  Eye,
  Footprints,
  Users,
  Gauge,
  RotateCcw,
  Save,
  AlertTriangle,
  Skull,
  Volume2,
  Moon
} from 'lucide-react';

export interface ThreatParams {
  zombieSpeed: number;       // กม./ชม. (1–15)
  detectionRange: number;    // เมตร (10–500)
  hordeDensity: number;      // 1–10 (สเกล)
  noiseAttraction: number;   // 1–10 (สเกล)
  nightVisionPenalty: number; // 0–100 (% ลดทอน)
  populationRiskFactor: number; // 0.1–3.0 (ตัวคูณ)
}

const DEFAULT_PARAMS: ThreatParams = {
  zombieSpeed: 5,
  detectionRange: 100,
  hordeDensity: 5,
  noiseAttraction: 5,
  nightVisionPenalty: 40,
  populationRiskFactor: 1.0,
};

interface SliderFieldProps {
  label: string;
  icon: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  description: string;
  colorClass: string;
  onChange: (v: number) => void;
}

const SliderField = ({ label, icon, value, min, max, step, unit, description, colorClass, onChange }: SliderFieldProps) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="bg-[#0f1115] rounded-xl border border-white/5 p-4 hover:border-white/10 transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass}`}>
            {icon}
          </div>
          <div>
            <span className="text-sm font-medium text-white">{label}</span>
            <p className="text-[10px] text-slate-500 leading-tight">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-black text-white">{value}</span>
          <span className="text-[10px] text-slate-500 ml-1">{unit}</span>
        </div>
      </div>
      <div className="relative mt-3">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-200 ${colorClass.replace('bg-', 'bg-').replace('/20', '')}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[9px] text-slate-600">{min}{unit}</span>
        <span className="text-[9px] text-slate-600">{max}{unit}</span>
      </div>
    </div>
  );
};

interface ThreatConfigProps {
  onParamsChange?: (params: ThreatParams) => void;
}

export function ThreatConfig({ onParamsChange }: ThreatConfigProps) {
  const [params, setParams] = useState<ThreatParams>(DEFAULT_PARAMS);
  const [isDirty, setIsDirty] = useState(false);

  // Load saved params
  useEffect(() => {
    try {
      const saved = localStorage.getItem('locus_threat_params');
      if (saved) {
        const parsed = JSON.parse(saved) as ThreatParams;
        setParams(prev => ({ ...prev, ...parsed }));
      }
    } catch {
      // ใช้ค่า default
    }
  }, []);

  const updateParam = <K extends keyof ThreatParams>(key: K, value: ThreatParams[K]) => {
    setParams(prev => {
      const next = { ...prev, [key]: value };
      onParamsChange?.(next);
      return next;
    });
    setIsDirty(true);
  };

  const handleSave = () => {
    localStorage.setItem('locus_threat_params', JSON.stringify(params));
    setIsDirty(false);
  };

  const handleReset = () => {
    setParams(DEFAULT_PARAMS);
    onParamsChange?.(DEFAULT_PARAMS);
    setIsDirty(true);
  };

  // คำนวณ Danger Level จากค่าทั้งหมด
  const dangerLevel = Math.round(
    (params.zombieSpeed / 15 * 25) +
    (params.hordeDensity / 10 * 25) +
    (params.noiseAttraction / 10 * 20) +
    (params.populationRiskFactor / 3 * 15) +
    ((100 - params.nightVisionPenalty) / 100 * 15)
  );

  const dangerColor = dangerLevel > 70 ? 'text-red-400' : dangerLevel > 40 ? 'text-amber-400' : 'text-emerald-400';
  const dangerLabel = dangerLevel > 70 ? 'CRITICAL' : dangerLevel > 40 ? 'MODERATE' : 'LOW';

  return (
    <div className="space-y-6">
      {/* Header with Danger Meter */}
      <div className="bg-[#0a0c10] rounded-2xl border border-white/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
              <Skull size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Threat Configuration</h2>
              <p className="text-xs text-slate-500">ปรับแต่งตัวแปรภัยคุกคามสำหรับการวิเคราะห์แผนที่</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-slate-300 transition-colors"
            >
              <RotateCcw size={14} />
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={!isDirty}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                isDirty 
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                  : 'bg-white/5 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Save size={14} />
              Save
            </button>
          </div>
        </div>

        {/* Danger Level Meter */}
        <div className="bg-[#0f1115] rounded-xl p-4 border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className={dangerColor} />
              <span className="text-sm text-slate-400">Overall Danger Level</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-black ${dangerColor}`}>{dangerLevel}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                dangerLevel > 70 ? 'bg-red-500/20 text-red-400' : dangerLevel > 40 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {dangerLabel}
              </span>
            </div>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                dangerLevel > 70 ? 'bg-gradient-to-r from-red-600 to-red-400' : dangerLevel > 40 ? 'bg-gradient-to-r from-amber-600 to-amber-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'
              }`}
              style={{ width: `${dangerLevel}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-2 gap-4">
        <SliderField
          label="ความเร็วซอมบี้"
          icon={<Footprints size={16} />}
          value={params.zombieSpeed}
          min={1}
          max={15}
          step={0.5}
          unit=" กม./ชม."
          description="ความเร็วเฉลี่ยในการเคลื่อนที่"
          colorClass="bg-red-500/20 text-red-400"
          onChange={(v) => updateParam('zombieSpeed', v)}
        />
        <SliderField
          label="ระยะมองเห็น"
          icon={<Eye size={16} />}
          value={params.detectionRange}
          min={10}
          max={500}
          step={10}
          unit=" m"
          description="รัศมีตรวจจับเป้าหมาย"
          colorClass="bg-amber-500/20 text-amber-400"
          onChange={(v) => updateParam('detectionRange', v)}
        />
        <SliderField
          label="ความหนาแน่นฝูง"
          icon={<Users size={16} />}
          value={params.hordeDensity}
          min={1}
          max={10}
          step={1}
          unit="/10"
          description="ระดับความหนาแน่นของกลุ่ม"
          colorClass="bg-purple-500/20 text-purple-400"
          onChange={(v) => updateParam('hordeDensity', v)}
        />
        <SliderField
          label="ดึงดูดจากเสียง"
          icon={<Volume2 size={16} />}
          value={params.noiseAttraction}
          min={1}
          max={10}
          step={1}
          unit="/10"
          description="ความไวต่อเสียงดัง"
          colorClass="bg-orange-500/20 text-orange-400"
          onChange={(v) => updateParam('noiseAttraction', v)}
        />
        <SliderField
          label="ลดทอนกลางคืน"
          icon={<Moon size={16} />}
          value={params.nightVisionPenalty}
          min={0}
          max={100}
          step={5}
          unit="%"
          description="% ที่ศัตรูมองเห็นได้ลดลงตอนกลางคืน"
          colorClass="bg-indigo-500/20 text-indigo-400"
          onChange={(v) => updateParam('nightVisionPenalty', v)}
        />
        <SliderField
          label="ปัจจัยประชากร"
          icon={<Gauge size={16} />}
          value={params.populationRiskFactor}
          min={0.1}
          max={3}
          step={0.1}
          unit="x"
          description="ตัวคูณ: ประชากรสูง = ดงซอมบี้"
          colorClass="bg-cyan-500/20 text-cyan-400"
          onChange={(v) => updateParam('populationRiskFactor', v)}
        />
      </div>
    </div>
  );
}
