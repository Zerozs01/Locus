import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Compass,
  Sparkles,
  TreePine,
  UtensilsCrossed,
  Bed,
  PartyPopper,
  Landmark,
  Car,
  Coffee,
  Users,
  CalendarDays,
  ArrowRight,
  ChevronRight,
  Mountain,
  Waves,
  Camera,
  Heart,
  Zap,
  Map,
  Pencil
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────
type IntentMode = null | 'help' | 'explore';

interface DiscoveryChip {
  label: string;
  icon: React.ReactNode;
  keywords: string[];
}

// ─── Data ───────────────────────────────────────────
const DISCOVERY_CHIPS: DiscoveryChip[] = [
  { label: 'ธรรมชาติ', icon: <TreePine size={14} />, keywords: ['nature'] },
  { label: 'อาหาร', icon: <UtensilsCrossed size={14} />, keywords: ['food'] },
  { label: 'พักผ่อน', icon: <Bed size={14} />, keywords: ['rest'] },
  { label: 'คาเฟ่', icon: <Coffee size={14} />, keywords: ['cafe'] },
  { label: 'Road Trip', icon: <Car size={14} />, keywords: ['roadtrip'] },
  { label: 'ครอบครัว', icon: <Users size={14} />, keywords: ['family'] },
  { label: 'ทะเล', icon: <Waves size={14} />, keywords: ['beach'] },
  { label: 'ภูเขา', icon: <Mountain size={14} />, keywords: ['mountain'] },
  { label: 'วัฒนธรรม', icon: <Landmark size={14} />, keywords: ['culture'] },
  { label: 'ถ่ายรูป', icon: <Camera size={14} />, keywords: ['photo'] },
  { label: '2D1N', icon: <CalendarDays size={14} />, keywords: ['weekend'] },
  { label: 'Hidden Gems', icon: <Heart size={14} />, keywords: ['hidden'] },
];

const REGIONS = [
  { id: 'north', name: 'ภาคเหนือ', eng: 'North', color: '#a855f7' },
  { id: 'northeast', name: 'ภาคอีสาน', eng: 'Isan', color: '#ef4444' },
  { id: 'central', name: 'ภาคกลาง', eng: 'Central', color: '#f97316' },
  { id: 'east', name: 'ตะวันออก', eng: 'East', color: '#06b6d4' },
  { id: 'west', name: 'ตะวันตก', eng: 'West', color: '#22c55e' },
  { id: 'south', name: 'ภาคใต้', eng: 'South', color: '#eab308' },
];

// ─── Theme Colors per Question ──────────────────────
// Each question has its own accent color to make selections feel distinct
interface QuestionTheme {
  accent: string;       // e.g. '#a855f7'
  accentBg: string;     // selected bg
  accentBorder: string; // selected border
  progressColor: string;
  labelColor: string;
}

const QUESTION_THEMES: QuestionTheme[] = [
  // Q1: อยากเที่ยวแบบไหน → ม่วง
  { accent: '#a855f7', accentBg: 'rgba(168,85,247,0.12)', accentBorder: 'rgba(168,85,247,0.5)', progressColor: '#a855f7', labelColor: 'text-purple-400' },
  // Q2: ไปกี่วัน → น้ำเงิน
  { accent: '#3b82f6', accentBg: 'rgba(59,130,246,0.12)', accentBorder: 'rgba(59,130,246,0.5)', progressColor: '#3b82f6', labelColor: 'text-blue-400' },
  // Q3: มีรถไหม → เขียว
  { accent: '#22c55e', accentBg: 'rgba(34,197,94,0.12)', accentBorder: 'rgba(34,197,94,0.5)', progressColor: '#22c55e', labelColor: 'text-emerald-400' },
  // Q4: ไปกับใคร → ชมพู
  { accent: '#ec4899', accentBg: 'rgba(236,72,153,0.12)', accentBorder: 'rgba(236,72,153,0.5)', progressColor: '#ec4899', labelColor: 'text-pink-400' },
  // Q5: งบประมาณ → เหลืองทอง
  { accent: '#eab308', accentBg: 'rgba(234,179,8,0.12)', accentBorder: 'rgba(234,179,8,0.5)', progressColor: '#eab308', labelColor: 'text-yellow-400' },
];

// ─── Questions ──────────────────────────────────────
interface HelpQuestion {
  id: string;
  question: string;
  options: { label: string; value: string; icon?: React.ReactNode }[];
}

const HELP_QUESTIONS: HelpQuestion[] = [
  {
    id: 'style',
    question: 'อยากเที่ยวแบบไหน?',
    options: [
      { label: 'พักผ่อน ชิลล์ๆ', value: 'chill', icon: <Bed size={16} /> },
      { label: 'ผจญภัย ลุยๆ', value: 'adventure', icon: <Zap size={16} /> },
      { label: 'ธรรมชาติ ป่าเขา', value: 'nature', icon: <TreePine size={16} /> },
      { label: 'วัฒนธรรม ประวัติศาสตร์', value: 'culture', icon: <Landmark size={16} /> },
    ],
  },
  {
    id: 'duration',
    question: 'ไปกี่วัน?',
    options: [
      { label: 'เช้าไป-เย็นกลับ', value: '1day' },
      { label: '2 วัน 1 คืน', value: '2d1n' },
      { label: '3-4 วัน', value: '3-4d' },
      { label: '5 วัน+', value: '5d+' },
    ],
  },
  {
    id: 'transport',
    question: 'มีรถส่วนตัวไหม?',
    options: [
      { label: 'ขับรถไป', value: 'car', icon: <Car size={16} /> },
      { label: 'ไม่มีรถ (ขนส่งสาธารณะ)', value: 'public', icon: <Map size={16} /> },
    ],
  },
  {
    id: 'companion',
    question: 'ไปกับใคร?',
    options: [
      { label: 'คนเดียว', value: 'solo' },
      { label: 'คู่รัก', value: 'couple', icon: <Heart size={16} /> },
      { label: 'เพื่อน / กลุ่ม', value: 'friends', icon: <Users size={16} /> },
      { label: 'ครอบครัว', value: 'family', icon: <Users size={16} /> },
    ],
  },
  {
    id: 'budget',
    question: 'งบประมาณประมาณ?',
    options: [
      { label: 'ประหยัด (< 1,000/วัน)', value: 'low' },
      { label: 'ปานกลาง (1,000-3,000/วัน)', value: 'mid' },
      { label: 'สบายๆ (3,000+/วัน)', value: 'high' },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════
export const GeoArchivePage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<IntentMode>(null);
  const [helpStep, setHelpStep] = useState(0);
  const [helpAnswers, setHelpAnswers] = useState<Record<string, string>>({});
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);

  const handleBack = useCallback(() => {
    if (mode === 'help' && helpStep > 0) {
      setHelpStep((s) => s - 1);
    } else {
      setMode(null);
      setHelpStep(0);
      setHelpAnswers({});
      setSelectedChips([]);
      setEditingQuestion(null);
    }
  }, [mode, helpStep]);

  const toggleChip = (label: string) => {
    setSelectedChips((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };

  // Build the prefill text from answers (for AI chat context)
  const buildPrefillContext = () => {
    return HELP_QUESTIONS.map((q) => {
      const ans = q.options.find((o) => o.value === helpAnswers[q.id]);
      return `${q.question} ${ans?.label || 'ไม่ระบุ'}`;
    }).join('\n');
  };

  // ─── Intent Selection (Home) ──────────────────────
  if (mode === null) {
    return (
      <div className="flex-1 bg-[#050608] overflow-y-auto">
        <div className="mx-auto flex min-h-full max-w-4xl flex-col items-center justify-center px-6 py-16">
          {/* Title */}
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
            <Compass size={32} className="text-cyan-400" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white">วางแผนเที่ยวไหนดี?</h1>
          <p className="mb-12 text-center text-sm text-slate-500">
            เลือกจุดเริ่มต้นที่เหมาะกับคุณ แล้ว Locus จะช่วยคุณวางแผนต่อ
          </p>

          {/* 3 Intent Buttons */}
          <div className="grid w-full max-w-2xl gap-4">
            {/* "มีที่ในใจแล้ว" → Navigate to /map with search focus */}
            <IntentCard
              icon={<MapPin size={28} />}
              title="มีที่ในใจแล้ว"
              subtitle="รู้จังหวัดหรือสถานที่ที่อยากไป — เปิดแผนที่แล้วค้นหาเลย"
              gradient="from-emerald-500/20 to-teal-600/10"
              border="border-emerald-500/30"
              iconColor="text-emerald-400"
              onClick={() => navigate('/map', { state: { focusSearch: true } })}
            />
            <IntentCard
              icon={<Sparkles size={28} />}
              title="ช่วยเลือกให้หน่อย"
              subtitle="ตอบคำถามสั้นๆ แล้ว AI จะแนะนำจังหวัดที่เหมาะกับคุณ"
              gradient="from-purple-500/20 to-indigo-600/10"
              border="border-purple-500/30"
              iconColor="text-purple-400"
              onClick={() => setMode('help')}
            />
            <IntentCard
              icon={<Compass size={28} />}
              title="สำรวจตามความสนใจ"
              subtitle="เลือกหมวดที่ชอบ — ธรรมชาติ อาหาร ทะเล คาเฟ่ road trip และอื่นๆ"
              gradient="from-amber-500/20 to-orange-600/10"
              border="border-amber-500/30"
              iconColor="text-amber-400"
              onClick={() => setMode('explore')}
            />
          </div>

          {/* Discovery Chips Preview */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-2 text-xs text-slate-600">สำรวจด่วน:</span>
            {DISCOVERY_CHIPS.slice(0, 8).map((chip) => (
              <button
                key={chip.label}
                onClick={() => {
                  setMode('explore');
                  setSelectedChips([chip.label]);
                }}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                {chip.icon}
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── Mode: "ช่วยเลือกให้หน่อย" ───────────────────
  if (mode === 'help') {
    const currentQ = HELP_QUESTIONS[helpStep];
    const theme = QUESTION_THEMES[helpStep] || QUESTION_THEMES[0];
    const isLastStep = helpStep >= HELP_QUESTIONS.length - 1;
    const hasAnswered = currentQ && helpAnswers[currentQ.id];

    // All questions answered → show editable summary
    if (helpStep >= HELP_QUESTIONS.length) {
      return (
        <div className="flex-1 bg-[#050608] overflow-y-auto">
          <div className="mx-auto max-w-3xl px-6 py-12">
            <BackButton onClick={handleBack} />
            <h2 className="mb-2 text-2xl font-bold text-white">
              <Sparkles size={24} className="mr-2 inline text-purple-400" />
              สรุปความต้องการของคุณ
            </h2>
            <p className="mb-8 text-sm text-slate-500">
              กดปุ่ม ✏️ เพื่อแก้ไขคำตอบได้ ก่อนส่งให้ AI วิเคราะห์
            </p>

            {/* Editable Summary */}
            <div className="mb-8 rounded-2xl border border-white/10 bg-[#0a0c10] p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {HELP_QUESTIONS.map((q, idx) => {
                  const qTheme = QUESTION_THEMES[idx];
                  const isEditing = editingQuestion === q.id;
                  return (
                    <div
                      key={q.id}
                      className="relative rounded-xl p-3 transition-all"
                      style={{
                        backgroundColor: isEditing ? qTheme.accentBg : 'rgba(255,255,255,0.03)',
                        border: isEditing ? `1px solid ${qTheme.accentBorder}` : '1px solid transparent',
                      }}
                    >
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {q.question}
                      </div>

                      {isEditing ? (
                        <div className="mt-2 space-y-1.5">
                          {q.options.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => {
                                setHelpAnswers((prev) => ({ ...prev, [q.id]: opt.value }));
                                setEditingQuestion(null);
                              }}
                              className="block w-full rounded-lg px-3 py-1.5 text-left text-xs transition-all"
                              style={{
                                backgroundColor: helpAnswers[q.id] === opt.value ? qTheme.accentBg : 'rgba(255,255,255,0.05)',
                                border: helpAnswers[q.id] === opt.value ? `1px solid ${qTheme.accentBorder}` : '1px solid transparent',
                                color: helpAnswers[q.id] === opt.value ? '#fff' : '#94a3b8',
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-white">
                            {q.options.find((o) => o.value === helpAnswers[q.id])?.label || '—'}
                          </div>
                          <button
                            onClick={() => setEditingQuestion(q.id)}
                            className="ml-2 rounded-lg p-1 text-slate-600 transition-colors hover:bg-white/10 hover:text-white"
                            title="แก้ไข"
                          >
                            <Pencil size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Send to AI — navigate with context attached, but don't auto-send */}
            <button
              onClick={() => {
                const contextText = buildPrefillContext();
                navigate('/intelligence', {
                  state: {
                    context: {
                      type: 'travel-plan',
                      name: 'วางแผนเที่ยว',
                      data: { answers: helpAnswers },
                    },
                    // Prefill into the input box but DON'T auto-send
                    prefillInput: `ช่วยแนะนำจังหวัดที่เหมาะกับความต้องการนี้หน่อยครับ:\n${contextText}`,
                  },
                });
              }}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:from-purple-600/30 hover:to-indigo-600/30"
            >
              <Sparkles size={18} className="text-purple-400" />
              ส่งให้ AI วิเคราะห์แนะนำ
              <ArrowRight size={16} className="text-purple-400 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="mt-3 text-center text-[11px] text-slate-600">
              ข้อมูลจะถูกส่งไปยังหน้า Chat เพื่อให้คุณเพิ่มคำถามหรือแก้ไขก่อนส่ง
            </p>
          </div>
        </div>
      );
    }

    // ─── Question Flow ──────────────────────────────
    return (
      <div className="flex-1 bg-[#050608] overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <BackButton onClick={handleBack} />

          {/* Progress bar with theme colors */}
          <div className="mb-8 flex items-center gap-3">
            {HELP_QUESTIONS.map((_, i) => (
              <div
                key={i}
                className="h-1.5 flex-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    i < helpStep
                      ? QUESTION_THEMES[i].progressColor
                      : i === helpStep
                        ? QUESTION_THEMES[i].progressColor
                        : 'rgba(255,255,255,0.07)',
                  opacity: i <= helpStep ? 1 : 0.3,
                }}
              />
            ))}
          </div>

          <div className={`mb-2 text-xs font-medium ${theme.labelColor}`}>
            คำถามที่ {helpStep + 1} / {HELP_QUESTIONS.length}
          </div>
          <h2 className="mb-8 text-2xl font-bold text-white">{currentQ.question}</h2>

          <div className="grid gap-3">
            {currentQ.options.map((opt) => {
              const isSelected = helpAnswers[currentQ.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    setHelpAnswers((prev) => ({ ...prev, [currentQ.id]: opt.value }));
                  }}
                  className="group flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-200"
                  style={{
                    borderColor: isSelected ? theme.accentBorder : 'rgba(255,255,255,0.07)',
                    backgroundColor: isSelected ? theme.accentBg : '#0a0c10',
                  }}
                >
                  {opt.icon && (
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors"
                      style={{
                        borderColor: isSelected ? theme.accentBorder : 'rgba(255,255,255,0.1)',
                        backgroundColor: isSelected ? theme.accentBg : 'rgba(255,255,255,0.03)',
                        color: isSelected ? theme.accent : '#94a3b8',
                      }}
                    >
                      {opt.icon}
                    </div>
                  )}
                  <span
                    className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next Button — uses current question's theme */}
          {hasAnswered && (
            <button
              onClick={() => setHelpStep((s) => s + 1)}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border py-3 text-sm font-bold text-white transition-all hover:brightness-110"
              style={{
                borderColor: theme.accentBorder,
                backgroundColor: theme.accentBg,
              }}
            >
              {isLastStep ? 'ดูสรุป' : 'ถัดไป'}
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── Mode: "สำรวจตามความสนใจ" ─────────────────────
  if (mode === 'explore') {
    return (
      <div className="flex-1 bg-[#050608] overflow-y-auto">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <BackButton onClick={handleBack} />
          <h2 className="mb-2 text-2xl font-bold text-white">
            <Compass size={24} className="mr-2 inline text-amber-400" />
            สำรวจตามความสนใจ
          </h2>
          <p className="mb-8 text-sm text-slate-500">เลือกหมวดที่สนใจ แล้วดูสถานที่ที่เหมาะ</p>

          {/* Discovery Chips */}
          <div className="mb-8 flex flex-wrap gap-2">
            {DISCOVERY_CHIPS.map((chip) => {
              const isSelected = selectedChips.includes(chip.label);
              return (
                <button
                  key={chip.label}
                  onClick={() => toggleChip(chip.label)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {chip.icon}
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Region Filter */}
          <div className="mb-8">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
              กรองตามภูมิภาค
            </h3>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => navigate('/map', { state: { regionId: r.id } })}
                  className="rounded-full border border-white/10 bg-[#0a0c10] px-4 py-2 text-xs font-medium text-slate-400 transition-all hover:border-white/20 hover:text-white"
                  style={{ borderColor: `${r.color}30` }}
                >
                  <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: r.color }} />
                  {r.name}
                </button>
              ))}
            </div>
          </div>

          {/* Explore Results */}
          {selectedChips.length > 0 ? (
            <div>
              <h3 className="mb-4 text-sm font-bold text-white">
                ผลลัพธ์สำหรับ: {selectedChips.join(', ')}
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {getExploreResults(selectedChips).map((item, i) => (
                  <div
                    key={i}
                    className="group cursor-pointer rounded-2xl border border-white/10 bg-[#0a0c10] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/5"
                    onClick={() => {
                      if (item.regionId && item.provinceId) {
                        navigate(`/province/${item.regionId}/${item.provinceId}`);
                      }
                    }}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-slate-400">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {item.category}
                      </span>
                    </div>
                    <div className="mb-1 text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-500">{item.location}</div>
                    {item.tags && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  navigate('/intelligence', {
                    state: {
                      context: { type: 'explore', name: selectedChips.join(', ') },
                      prefillInput: `แนะนำสถานที่ท่องเที่ยวในไทยที่เกี่ยวกับ: ${selectedChips.join(', ')} หน่อยครับ`,
                    },
                  });
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 py-3 text-sm font-medium text-cyan-300 transition-all hover:bg-cyan-500/20"
              >
                <Sparkles size={16} />
                ให้ AI แนะนำเพิ่มเติม
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#0a0c10] py-16 text-center">
              <PartyPopper size={32} className="mb-4 text-slate-600" />
              <p className="text-sm text-slate-500">เลือกหมวดด้านบนเพื่อเริ่มสำรวจ</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

// ═══════════════════════════════════════════════════════
// Sub Components
// ═══════════════════════════════════════════════════════
interface IntentCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  gradient: string;
  border: string;
  iconColor: string;
  onClick: () => void;
}

const IntentCard = ({ icon, title, subtitle, gradient, border, iconColor, onClick }: IntentCardProps) => (
  <button
    onClick={onClick}
    className={`group relative flex items-center gap-5 overflow-hidden rounded-2xl border bg-gradient-to-r ${gradient} ${border} p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
  >
    <div
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border bg-black/20 ${border} ${iconColor} transition-transform group-hover:scale-110`}
    >
      {icon}
    </div>
    <div>
      <div className="mb-1 text-lg font-bold text-white">{title}</div>
      <div className="text-sm text-slate-400 leading-relaxed">{subtitle}</div>
    </div>
    <ChevronRight
      size={20}
      className="absolute right-5 text-slate-600 transition-all group-hover:right-4 group-hover:text-white"
    />
  </button>
);

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="mb-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 transition-all hover:bg-white/10 hover:text-white"
  >
    ← กลับ
  </button>
);

// ─── Mock Explore Results ───────────────────────────
interface ExploreResult {
  title: string;
  location: string;
  category: string;
  icon: React.ReactNode;
  tags?: string[];
  regionId?: string;
  provinceId?: string;
}

function getExploreResults(chips: string[]): ExploreResult[] {
  const allResults: Record<string, ExploreResult[]> = {
    'ธรรมชาติ': [
      { title: 'ดอยอินทนนท์', location: 'เชียงใหม่', category: 'ธรรมชาติ', icon: <Mountain size={16} />, tags: ['ภูเขา', 'ป่าดิบ'], regionId: 'north', provinceId: 'chiang-mai' },
      { title: 'เขาสก', location: 'สุราษฎร์ธานี', category: 'ธรรมชาติ', icon: <TreePine size={16} />, tags: ['ทะเลสาบ', 'ป่าดึกดำบรรพ์'], regionId: 'south', provinceId: 'surat-thani' },
      { title: 'อุทยานแห่งชาติเขาใหญ่', location: 'นครราชสีมา', category: 'ธรรมชาติ', icon: <TreePine size={16} />, tags: ['นํ้าตก', 'สัตว์ป่า'], regionId: 'northeast', provinceId: 'nakhon-ratchasima' },
    ],
    'อาหาร': [
      { title: 'ย่านเยาวราช', location: 'กรุงเทพฯ', category: 'อาหาร', icon: <UtensilsCrossed size={16} />, tags: ['Street Food', 'จีน'], regionId: 'central', provinceId: 'bangkok' },
      { title: 'ตลาดโต้รุ่ง', location: 'เชียงใหม่', category: 'อาหาร', icon: <UtensilsCrossed size={16} />, tags: ['ข้าวซอย', 'ไส้อั่ว'], regionId: 'north', provinceId: 'chiang-mai' },
      { title: 'ตลาดน้ำ 4 ภาค', location: 'พัทยา', category: 'อาหาร', icon: <UtensilsCrossed size={16} />, tags: ['ตลาดน้ำ', 'ของกิน'], regionId: 'east', provinceId: 'chon-buri' },
    ],
    'ทะเล': [
      { title: 'เกาะพีพี', location: 'กระบี่', category: 'ทะเล', icon: <Waves size={16} />, tags: ['ดำน้ำ', 'หาดทราย'], regionId: 'south', provinceId: 'krabi' },
      { title: 'เกาะเสม็ด', location: 'ระยอง', category: 'ทะเล', icon: <Waves size={16} />, tags: ['ใกล้กรุงเทพ', 'Weekend'], regionId: 'east', provinceId: 'rayong' },
      { title: 'เกาะสมุย', location: 'สุราษฎร์ธานี', category: 'ทะเล', icon: <Waves size={16} />, tags: ['รีสอร์ท', 'พาร์ตี้'], regionId: 'south', provinceId: 'surat-thani' },
    ],
    'คาเฟ่': [
      { title: 'คาเฟ่ม่อนแจ่ม', location: 'เชียงใหม่', category: 'คาเฟ่', icon: <Coffee size={16} />, tags: ['วิว', 'ภูเขา'], regionId: 'north', provinceId: 'chiang-mai' },
      { title: 'คาเฟ่พระนครศรีอยุธยา', location: 'อยุธยา', category: 'คาเฟ่', icon: <Coffee size={16} />, tags: ['โบราณ', 'ริมน้ำ'], regionId: 'central', provinceId: 'ayutthaya' },
    ],
    'วัฒนธรรม': [
      { title: 'วัดพระแก้ว', location: 'กรุงเทพฯ', category: 'วัฒนธรรม', icon: <Landmark size={16} />, tags: ['UNESCO', 'Temple'], regionId: 'central', provinceId: 'bangkok' },
      { title: 'อุทยานประวัติศาสตร์สุโขทัย', location: 'สุโขทัย', category: 'วัฒนธรรม', icon: <Landmark size={16} />, tags: ['มรดกโลก'], regionId: 'north', provinceId: 'sukhothai' },
    ],
    'Road Trip': [
      { title: 'เส้นทาง 1095 แม่ฮ่องสอน', location: 'แม่ฮ่องสอน', category: 'Road Trip', icon: <Car size={16} />, tags: ['762 โค้ง', 'ทิวทัศน์'], regionId: 'north', provinceId: 'mae-hong-son' },
      { title: 'Scenic route เขาค้อ', location: 'เพชรบูรณ์', category: 'Road Trip', icon: <Car size={16} />, tags: ['ภูเขา', 'ทะเลหมอก'], regionId: 'north', provinceId: 'phetchabun' },
    ],
    'ครอบครัว': [
      { title: 'ซาฟารีเวิลด์', location: 'กรุงเทพฯ', category: 'ครอบครัว', icon: <Users size={16} />, tags: ['เด็ก', 'สัตว์'], regionId: 'central', provinceId: 'bangkok' },
      { title: 'สวนนงนุช', location: 'พัทยา', category: 'ครอบครัว', icon: <Users size={16} />, tags: ['สวนสวย', 'โชว์'], regionId: 'east', provinceId: 'chon-buri' },
    ],
    'ภูเขา': [
      { title: 'ดอยอ่างขาง', location: 'เชียงใหม่', category: 'ภูเขา', icon: <Mountain size={16} />, tags: ['ดอกไม้', 'อากาศเย็น'], regionId: 'north', provinceId: 'chiang-mai' },
      { title: 'ภูชี้ฟ้า', location: 'เชียงราย', category: 'ภูเขา', icon: <Mountain size={16} />, tags: ['ทะเลหมอก', 'พระอาทิตย์ขึ้น'], regionId: 'north', provinceId: 'chiang-rai' },
    ],
    'ถ่ายรูป': [
      { title: 'วัดร่องขุ่น', location: 'เชียงราย', category: 'ถ่ายรูป', icon: <Camera size={16} />, tags: ['Iconic', 'สถาปัตยกรรม'], regionId: 'north', provinceId: 'chiang-rai' },
      { title: 'ปาย', location: 'แม่ฮ่องสอน', category: 'ถ่ายรูป', icon: <Camera size={16} />, tags: ['IG Famous', 'Chill'], regionId: 'north', provinceId: 'mae-hong-son' },
    ],
    'พักผ่อน': [
      { title: 'หัวหิน', location: 'ประจวบฯ', category: 'พักผ่อน', icon: <Bed size={16} />, tags: ['ทะเล', 'รีสอร์ท'], regionId: 'west', provinceId: 'prachuap-khiri-khan' },
    ],
    '2D1N': [
      { title: 'เขาใหญ่ Weekend', location: 'นครราชสีมา', category: '2D1N', icon: <CalendarDays size={16} />, tags: ['ใกล้กรุงเทพ', 'ธรรมชาติ'], regionId: 'northeast', provinceId: 'nakhon-ratchasima' },
    ],
    'Hidden Gems': [
      { title: 'เกาะขาม', location: 'ชลบุรี', category: 'Hidden Gems', icon: <Heart size={16} />, tags: ['ทะเลใส', 'คนน้อย'], regionId: 'east', provinceId: 'chon-buri' },
      { title: 'ผาเดียวดาย', location: 'ชัยภูมิ', category: 'Hidden Gems', icon: <Heart size={16} />, tags: ['ทุ่งดอกไม้', 'ลับ'], regionId: 'northeast', provinceId: 'chaiyaphum' },
    ],
  };

  const results: ExploreResult[] = [];
  chips.forEach((chip) => {
    if (allResults[chip]) results.push(...allResults[chip]);
  });

  const seen = new Set<string>();
  return results.filter((r) => {
    if (seen.has(r.title)) return false;
    seen.add(r.title);
    return true;
  });
}
