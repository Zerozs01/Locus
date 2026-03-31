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
  Pencil,
  Settings,
  Bus,
  Train,
  CarTaxiFront,
  Bike
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
    question: 'Budget รวม?',
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
  const [helpOthers, setHelpOthers] = useState<Record<string, string>>({});
  const [showCarSettings, setShowCarSettings] = useState(false);
  const [transportMeta, setTransportMeta] = useState({
    carModel: '',
    fuelPercent: '',
    fuelType: '',
    publicModes: [] as string[],
    publicOther: '',
  });
  const [companionMeta, setCompanionMeta] = useState({
    groupTotal: '',
    male: '',
    female: '',
    lgbtq: '',
    lgbtqType: '',
    familyTotal: '',
    familyAdults: '',
    familyChildren: '',
    familyAdultAges: '',
    familyChildAges: '',
  });
  const [budgetMeta, setBudgetMeta] = useState({
    totalBudget: '',
    budgetNote: '',
  });
  const [finalSuggestion, setFinalSuggestion] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);

  const handleBack = useCallback(() => {
    if (mode === 'help' && helpStep > 0) {
      setHelpStep((s) => s - 1);
    } else {
      setMode(null);
      setHelpStep(0);
      setHelpAnswers({});
      setHelpOthers({});
      setShowCarSettings(false);
      setTransportMeta({
        carModel: '',
        fuelPercent: '',
        fuelType: '',
        publicModes: [],
        publicOther: '',
      });
      setCompanionMeta({
        groupTotal: '',
        male: '',
        female: '',
        lgbtq: '',
        lgbtqType: '',
        familyTotal: '',
        familyAdults: '',
        familyChildren: '',
        familyAdultAges: '',
        familyChildAges: '',
      });
      setBudgetMeta({
        totalBudget: '',
        budgetNote: '',
      });
      setFinalSuggestion('');
      setSelectedChips([]);
      setEditingQuestion(null);
    }
  }, [mode, helpStep]);

  const toggleChip = (label: string) => {
    setSelectedChips((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };

  const togglePublicMode = (value: string) => {
    setTransportMeta((prev) => ({
      ...prev,
      publicModes: prev.publicModes.includes(value)
        ? prev.publicModes.filter((mode) => mode !== value)
        : [...prev.publicModes, value],
    }));
  };

  const getAnswerLabel = (questionId: string) => {
    const question = HELP_QUESTIONS.find((q) => q.id === questionId);
    if (!question) return 'ไม่ระบุ';
    const selected = question.options.find((option) => option.value === helpAnswers[questionId]);
    if (selected) return selected.label;
    if ((questionId === 'style' || questionId === 'duration') && helpOthers[questionId]?.trim()) {
      return 'อื่นๆ';
    }
    return 'ไม่ระบุ';
  };

  const getQuestionDetails = (questionId: string) => {
    const details: string[] = [];
    const otherText = helpOthers[questionId]?.trim();

    if (otherText) {
      details.push(`อื่นๆ: ${otherText}`);
    }

    if (questionId === 'transport') {
      if (helpAnswers.transport === 'car') {
        if (transportMeta.carModel.trim()) details.push(`รถ: ${transportMeta.carModel.trim()}`);
        if (transportMeta.fuelPercent.trim()) details.push(`น้ำมันคงเหลือ: ${transportMeta.fuelPercent.trim()}%`);
        if (transportMeta.fuelType.trim()) details.push(`ชนิดน้ำมัน: ${transportMeta.fuelType.trim()}`);
      }

      if (helpAnswers.transport === 'public') {
        if (transportMeta.publicModes.length > 0) {
          details.push(`ขนส่งที่สนใจ: ${transportMeta.publicModes.join(', ')}`);
        }
        if (transportMeta.publicOther.trim()) {
          details.push(`ขนส่งอื่นๆ: ${transportMeta.publicOther.trim()}`);
        }
      }
    }

    if (questionId === 'companion') {
      if (helpAnswers.companion === 'friends') {
        if (companionMeta.groupTotal.trim()) details.push(`จำนวนกลุ่ม: ${companionMeta.groupTotal.trim()} คน`);
        if (companionMeta.male.trim()) details.push(`ชาย: ${companionMeta.male.trim()} คน`);
        if (companionMeta.female.trim()) details.push(`หญิง: ${companionMeta.female.trim()} คน`);
        if (companionMeta.lgbtq.trim()) details.push(`LGBTQ+: ${companionMeta.lgbtq.trim()} คน`);
        if (companionMeta.lgbtqType.trim()) details.push(`ประเภท LGBTQ+: ${companionMeta.lgbtqType.trim()}`);
      }

      if (helpAnswers.companion === 'family') {
        if (companionMeta.familyTotal.trim()) details.push(`สมาชิกครอบครัว: ${companionMeta.familyTotal.trim()} คน`);
        if (companionMeta.familyAdults.trim()) details.push(`ผู้ใหญ่: ${companionMeta.familyAdults.trim()} คน`);
        if (companionMeta.familyChildren.trim()) details.push(`เด็ก: ${companionMeta.familyChildren.trim()} คน`);
        if (companionMeta.familyAdultAges.trim()) details.push(`อายุผู้ใหญ่ (รายคน): ${companionMeta.familyAdultAges.trim()}`);
        if (companionMeta.familyChildAges.trim()) details.push(`อายุเด็ก (รายคน): ${companionMeta.familyChildAges.trim()}`);
      }
    }

    if (questionId === 'budget') {
      if (budgetMeta.totalBudget.trim()) details.push(`งบรวมทริป: ${budgetMeta.totalBudget.trim()} บาท`);
      if (budgetMeta.budgetNote.trim()) details.push(`หมายเหตุงบ: ${budgetMeta.budgetNote.trim()}`);
    }

    return details;
  };

  // Build structured payload text for AI chat context
  const buildStructuredTravelInfo = () => {
    const payload = {
      travel_style: {
        selection: helpAnswers.style || 'other_only',
        selectionLabel: getAnswerLabel('style'),
        other: (helpOthers.style || '').trim(),
      },
      duration: {
        selection: helpAnswers.duration || 'other_only',
        selectionLabel: getAnswerLabel('duration'),
        other: (helpOthers.duration || '').trim(),
      },
      transport: {
        selection: helpAnswers.transport || 'unspecified',
        selectionLabel: getAnswerLabel('transport'),
        other: (helpOthers.transport || '').trim(),
        car: {
          model: transportMeta.carModel.trim(),
          fuelPercent: transportMeta.fuelPercent.trim(),
          fuelType: transportMeta.fuelType.trim(),
        },
        publicTransport: {
          preferredModes: transportMeta.publicModes,
          other: transportMeta.publicOther.trim(),
        },
      },
      companion: {
        selection: helpAnswers.companion || 'unspecified',
        selectionLabel: getAnswerLabel('companion'),
        other: (helpOthers.companion || '').trim(),
        friendsGroup: {
          total: companionMeta.groupTotal.trim(),
          male: companionMeta.male.trim(),
          female: companionMeta.female.trim(),
          lgbtq: companionMeta.lgbtq.trim(),
          lgbtqType: companionMeta.lgbtqType.trim(),
        },
        family: {
          total: companionMeta.familyTotal.trim(),
          adults: companionMeta.familyAdults.trim(),
          children: companionMeta.familyChildren.trim(),
          adultAges: companionMeta.familyAdultAges.trim(),
          childAges: companionMeta.familyChildAges.trim(),
        },
      },
      budget: {
        selection: helpAnswers.budget || 'unspecified',
        selectionLabel: getAnswerLabel('budget'),
        other: (helpOthers.budget || '').trim(),
        tripTotalBudget: budgetMeta.totalBudget.trim(),
        note: budgetMeta.budgetNote.trim(),
      },
    };

    return JSON.stringify(payload, null, 2);
  };

  const buildReadableSummary = () => {
    return HELP_QUESTIONS.map((q) => {
      const details = getQuestionDetails(q.id);
      const detailText = details.length > 0 ? `\n- ${details.join('\n- ')}` : '';
      return `${q.question} ${getAnswerLabel(q.id)}${detailText}`;
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
    const currentOther = currentQ ? (helpOthers[currentQ.id] || '').trim() : '';
    const hasPrimaryAnswer = Boolean(currentQ && helpAnswers[currentQ.id]);
    const allowOtherOnly = Boolean(currentQ && (currentQ.id === 'style' || currentQ.id === 'duration'));
    const hasBudgetTotal = Boolean(currentQ?.id === 'budget' && budgetMeta.totalBudget.trim());
    const hasAnswered = hasPrimaryAnswer || (allowOtherOnly && currentOther.length > 0) || hasBudgetTotal;

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
                  const detailLines = getQuestionDetails(q.id);
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
                        <div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-white">
                              {getAnswerLabel(q.id) || '—'}
                            </div>
                            <button
                              onClick={() => setEditingQuestion(q.id)}
                              className="ml-2 rounded-lg p-1 text-slate-600 transition-colors hover:bg-white/10 hover:text-white"
                              title="แก้ไข"
                            >
                              <Pencil size={12} />
                            </button>
                          </div>
                          {detailLines.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {detailLines.map((line) => (
                                <div key={line} className="text-[11px] text-slate-400">
                                  • {line}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Send to AI — auto-send on Intelligence page */}
            <div className="mb-4 rounded-2xl border border-white/10 bg-[#0a0c10] p-4">
              <label className="mb-2 block text-sm font-semibold text-slate-200">อยากถามอะไรเพิ่มกับ AI? (User suggestion)</label>
              <textarea
                value={finalSuggestion}
                onChange={(event) => setFinalSuggestion(event.target.value)}
                rows={3}
                placeholder="เช่น เน้นจังหวัดปลอดภัย คนไม่พลุกพล่าน มีแผนเดินทาง 3 แบบให้เลือก"
                className="w-full resize-none rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-purple-500/40"
              />
            </div>

            <button
              onClick={() => {
                const structuredInfo = buildStructuredTravelInfo();
                const readableSummary = buildReadableSummary();
                const userAsk = finalSuggestion.trim() || 'ช่วยแนะนำจังหวัดที่เหมาะกับความต้องการนี้ พร้อมวางแผนงบเดินทางให้ด้วย';
                navigate('/intelligence', {
                  state: {
                    autoSendMessage:
                      `${userAsk}\n\n` +
                      `สรุปความต้องการจากผู้ใช้:\n${readableSummary}\n\n` +
                      'ขอผลลัพธ์เป็น: จังหวัดแนะนำ, เหตุผล, แผนเที่ยวรายวัน, และประมาณการงบที่เป็นไปได้',
                    autoSendSystemContext:
                      'TRAVEL_PROFILE_JSON_FOR_TOOLING_ONLY:\n' + structuredInfo,
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
              เมื่อกดปุ่ม ระบบจะส่งคำถามและข้อมูลสรุปไปให้ AI วิเคราะห์ทันที
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

          {currentQ.id === 'budget' && (
            <div className="mb-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <h3 className="mb-3 text-sm font-semibold text-yellow-300">Budget รวม (ใส่อย่างเดียวก็ไปต่อได้)</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={budgetMeta.totalBudget}
                  onChange={(event) => setBudgetMeta((prev) => ({ ...prev, totalBudget: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="งบรวมทั้งทริป (บาท)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-yellow-400/40"
                />
                <input
                  value={budgetMeta.budgetNote}
                  onChange={(event) => setBudgetMeta((prev) => ({ ...prev, budgetNote: event.target.value }))}
                  placeholder="ข้อจำกัดงบเพิ่มเติม เช่น กินหรูได้ 1 มื้อ"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-yellow-400/40"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">ตัวเลือกงบต่อวันด้านล่างเป็นตัวช่วยเสริม (ไม่บังคับ)</p>
            </div>
          )}

          <div className="grid gap-3">
            {currentQ.options.map((opt) => {
              const isSelected = helpAnswers[currentQ.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    setHelpAnswers((prev) => ({ ...prev, [currentQ.id]: opt.value }));
                    if (currentQ.id === 'transport' && opt.value !== 'car') {
                      setShowCarSettings(false);
                    }
                  }}
                  className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${
                    isSelected
                      ? 'shadow-[0_8px_24px_rgba(0,0,0,0.35)]'
                      : 'border-white/10 bg-[#0a0c10] hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.04]'
                  }`}
                  style={
                    isSelected
                      ? {
                          borderColor: theme.accentBorder,
                          backgroundColor: theme.accentBg,
                        }
                      : undefined
                  }
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
                  {currentQ.id === 'transport' && opt.value === 'car' && isSelected && (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(event) => {
                        event.stopPropagation();
                        setShowCarSettings((prev) => !prev);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          event.stopPropagation();
                          setShowCarSettings((prev) => !prev);
                        }
                      }}
                      className="ml-auto inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-xs text-slate-200 transition-colors hover:bg-white/10"
                      aria-label="ตั้งค่าข้อมูลรถส่วนตัว"
                    >
                      <Settings size={14} />
                      ตั้งค่ารถ
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Optional free text for every question */}
          <div className="mt-5 rounded-2xl border border-white/10 bg-[#0a0c10] p-4">
            <label className="mb-2 block text-xs font-medium text-slate-400">อื่นๆ (พิมพ์เพิ่มได้)</label>
            <textarea
              value={helpOthers[currentQ.id] || ''}
              onChange={(event) => {
                const value = event.target.value;
                setHelpOthers((prev) => ({ ...prev, [currentQ.id]: value }));
              }}
              rows={2}
              placeholder="เช่น โฟกัสความปลอดภัย อยากเลี่ยงคนเยอะ หรือรายละเอียดเฉพาะที่อยากบอก AI"
              className="w-full resize-none rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-500/40"
            />
          </div>

          {/* Transport details */}
          {currentQ.id === 'transport' && helpAnswers.transport === 'car' && (
            <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-emerald-300">ตั้งค่าข้อมูลรถส่วนตัว (เพื่อช่วยคำนวณค่าน้ำมัน)</h3>
                <button
                  type="button"
                  onClick={() => setShowCarSettings((prev) => !prev)}
                  className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300 transition-colors hover:bg-white/10"
                >
                  {showCarSettings ? 'ซ่อนรายละเอียด' : 'แสดงรายละเอียด'}
                </button>
              </div>

              {showCarSettings && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    value={transportMeta.carModel}
                    onChange={(event) => setTransportMeta((prev) => ({ ...prev, carModel: event.target.value }))}
                    placeholder="รุ่นรถ เช่น Civic, Hilux"
                    className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-400/40"
                  />
                  <input
                    value={transportMeta.fuelPercent}
                    onChange={(event) => setTransportMeta((prev) => ({ ...prev, fuelPercent: event.target.value.replace(/[^0-9]/g, '') }))}
                    placeholder="น้ำมันคงเหลือ (%)"
                    className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-400/40"
                  />
                  <input
                    value={transportMeta.fuelType}
                    onChange={(event) => setTransportMeta((prev) => ({ ...prev, fuelType: event.target.value }))}
                    placeholder="ชนิดน้ำมัน เช่น แก๊สโซฮอล์ 95 / ดีเซล"
                    className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-400/40 sm:col-span-2"
                  />
                </div>
              )}
            </div>
          )}

          {currentQ.id === 'transport' && helpAnswers.transport === 'public' && (
            <div className="mt-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
              <h3 className="mb-3 text-sm font-semibold text-cyan-300">เลือกขนส่งสาธารณะที่อยากใช้ (เลือกได้หลายแบบ)</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { label: 'รถบัส', value: 'รถบัส', icon: <Bus size={14} /> },
                  { label: 'รถตู้', value: 'รถตู้', icon: <Train size={14} /> },
                  { label: 'Grab / Taxi ส่วนตัว', value: 'Grab / Taxi', icon: <CarTaxiFront size={14} /> },
                  { label: 'มอเตอร์ไซค์รับจ้าง', value: 'มอเตอร์ไซค์รับจ้าง', icon: <Bike size={14} /> },
                  { label: 'ไม่มีรถสาธารณะในใจ', value: 'ไม่ระบุ', icon: <Map size={14} /> },
                ].map((option) => {
                  const selected = transportMeta.publicModes.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => togglePublicMode(option.value)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${
                        selected
                          ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-200'
                          : 'border-white/10 bg-[#07090d] text-slate-300 hover:border-cyan-500/40 hover:text-white'
                      }`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  );
                })}
              </div>
              <input
                value={transportMeta.publicOther}
                onChange={(event) => setTransportMeta((prev) => ({ ...prev, publicOther: event.target.value }))}
                placeholder="ขนส่งอื่นๆ ที่อยากใช้ (ถ้ามี)"
                className="mt-3 w-full rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-500/40"
              />
            </div>
          )}

          {/* Companion details */}
          {currentQ.id === 'companion' && helpAnswers.companion === 'friends' && (
            <div className="mt-4 rounded-2xl border border-pink-500/20 bg-pink-500/5 p-4">
              <h3 className="mb-3 text-sm font-semibold text-pink-300">รายละเอียดกลุ่มเพื่อน (ไม่บังคับ)</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={companionMeta.groupTotal}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, groupTotal: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="จำนวนทั้งหมด (คน)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <input
                  value={companionMeta.male}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, male: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="ชาย (คน)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <input
                  value={companionMeta.female}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, female: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="หญิง (คน)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <input
                  value={companionMeta.lgbtq}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, lgbtq: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="LGBTQ+ (คน)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <select
                  value={companionMeta.lgbtqType}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, lgbtqType: event.target.value }))}
                  aria-label="ประเภท LGBTQ+"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none focus:border-pink-400/40 sm:col-span-2"
                >
                  <option value="">ประเภท LGBTQ+ (ไม่ระบุได้)</option>
                  <option value="สาว">สาว</option>
                  <option value="แมน">แมน</option>
                  <option value="หลากหลาย">หลากหลาย</option>
                </select>
              </div>
            </div>
          )}

          {currentQ.id === 'companion' && helpAnswers.companion === 'family' && (
            <div className="mt-4 rounded-2xl border border-pink-500/20 bg-pink-500/5 p-4">
              <h3 className="mb-3 text-sm font-semibold text-pink-300">รายละเอียดครอบครัว (ไม่บังคับ)</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={companionMeta.familyTotal}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, familyTotal: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="สมาชิกทั้งหมด (คน)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <input
                  value={companionMeta.familyAdults}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, familyAdults: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="ผู้ใหญ่ (คน)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <input
                  value={companionMeta.familyChildren}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, familyChildren: event.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder="เด็ก (คน)"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <input
                  value={companionMeta.familyAdultAges}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, familyAdultAges: event.target.value }))}
                  placeholder="อายุผู้ใหญ่รายคน เช่น 38,35"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40"
                />
                <input
                  value={companionMeta.familyChildAges}
                  onChange={(event) => setCompanionMeta((prev) => ({ ...prev, familyChildAges: event.target.value }))}
                  placeholder="อายุเด็กรายคน เช่น 4,7"
                  className="rounded-xl border border-white/10 bg-[#07090d] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-pink-400/40 sm:col-span-2"
                />
              </div>
            </div>
          )}

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
