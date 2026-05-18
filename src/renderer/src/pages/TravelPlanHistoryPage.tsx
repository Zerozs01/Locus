import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, History, Sparkles } from 'lucide-react';
import {
  formatTravelPlanDate,
  loadTravelPlanHistory,
  loadTravelPlanSnapshot,
  TravelPlanHistoryEntry,
  TravelPlanSnapshot,
} from '../utils/travelPlans';

const STATUS_LABELS: Record<TravelPlanHistoryEntry['type'], string> = {
  'checklist-toggle': 'Checklist',
  'draft-saved': 'Draft saved',
};

export const TravelPlanHistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<TravelPlanHistoryEntry[]>([]);
  const [snapshot, setSnapshot] = useState<TravelPlanSnapshot | null>(null);

  useEffect(() => {
    const sync = () => {
      setHistory(loadTravelPlanHistory());
      setSnapshot(loadTravelPlanSnapshot());
    };

    sync();
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const completedCount = useMemo(
    () => history.filter((entry) => entry.completed).length,
    [history],
  );

  const groupedHistory = useMemo(() => {
    const groups = new Map<string, TravelPlanHistoryEntry[]>();
    history.forEach((entry) => {
      const key = entry.createdAt.slice(0, 10);
      const items = groups.get(key) || [];
      items.push(entry);
      groups.set(key, items);
    });
    return Array.from(groups.entries()).map(([date, items]) => ({
      date,
      items,
    }));
  }, [history]);

  return (
    <div className="min-h-screen bg-[#06070b] text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-bold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={16} />
            กลับหน้า Home
          </button>
          <div className="text-right">
            <div className="text-[10px] font-black uppercase tracking-[0.32em] text-slate-500">Travel Plan Archive</div>
            <h1 className="mt-1 text-2xl font-black text-white">ติดตามแผนการเดินทางย้อนหลัง</h1>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">
                  <History size={14} />
                  Travel history
                </div>
                <h2 className="mt-2 text-xl font-bold text-white">บันทึก checklist และ draft ล่าสุด</h2>
                <p className="mt-1 text-sm text-slate-500">ดูว่ามีอะไรถูกเพิ่ม ถูกติ๊กเสร็จ หรือบันทึก draft ไว้บ้าง</p>
              </div>
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-right">
                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">Total records</div>
                <div className="text-2xl font-black text-white">{history.length}</div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Current snapshot</div>
                <div className="mt-2 text-2xl font-black text-white">{snapshot?.items.length ?? 0}</div>
                <div className="mt-1 text-xs text-slate-500">รายการที่ยังอยู่ในหน้าหลัก</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Completed actions</div>
                <div className="mt-2 text-2xl font-black text-emerald-300">{completedCount}</div>
                <div className="mt-1 text-xs text-slate-500">รายการที่ถูกติ๊กว่าเสร็จ</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Last update</div>
                <div className="mt-2 text-sm font-bold text-white">{history[0] ? formatTravelPlanDate(history[0].createdAt) : 'ยังไม่มีข้อมูล'}</div>
                <div className="mt-1 text-xs text-slate-500">อัปเดตล่าสุดจาก Home</div>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-500">Current checklist snapshot</div>
                  <div className="mt-1 text-sm text-slate-400">สถานะล่าสุดของรายการที่ใช้อยู่ในหน้า Home</div>
                </div>
                <CalendarDays size={18} className="text-cyan-300" />
              </div>

              <div className="mt-4 grid gap-2">
                {(snapshot?.items || []).length > 0 ? (
                  snapshot!.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-3 py-3">
                      <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-lg border ${item.completed ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300' : 'border-white/10 bg-white/5 text-slate-600'}`}>
                        {item.completed ? <CheckCircle2 size={12} /> : <div className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={`text-sm font-bold ${item.completed ? 'text-slate-300 line-through decoration-slate-500/60' : 'text-white'}`}>{item.title}</div>
                        <div className="mt-1 text-xs text-slate-500">{item.detail}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-right">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">{item.category}</span>
                        <span className="text-xs font-bold text-cyan-300">{item.when}</span>
                        <span className="text-[10px] text-slate-500">{item.date}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center text-sm text-slate-500">
                    ยังไม่มี checklist snapshot จากหน้า Home
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-amber-300">
                  <Sparkles size={14} />
                  History feed
                </div>
                <h2 className="mt-2 text-xl font-bold text-white">ลำดับเหตุการณ์ที่เกิดขึ้น</h2>
                <p className="mt-1 text-sm text-slate-500">ตรวจย้อนหลังว่ารายการถูกเพิ่มหรือถูกเช็คเมื่อไร</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">Visible days</div>
                <div className="text-2xl font-black text-white">{groupedHistory.length}</div>
              </div>
            </div>

            <div className="mt-5 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {groupedHistory.length > 0 ? (
                groupedHistory.map((group) => (
                  <div key={group.date} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-bold text-white">{formatTravelPlanDate(`${group.date}T09:00:00`)}</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">{group.items.length} events</div>
                    </div>
                    <div className="mt-3 space-y-2">
                      {group.items.map((entry) => (
                        <div key={entry.id} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-3 py-3">
                          <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl ${entry.completed ? 'bg-emerald-500/15 text-emerald-300' : 'bg-cyan-500/15 text-cyan-300'}`}>
                            <Clock3 size={14} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="text-sm font-bold text-white">{entry.title}</div>
                              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">{STATUS_LABELS[entry.type]}</span>
                            </div>
                            <div className="mt-1 text-xs text-slate-500">{entry.detail}</div>
                          </div>
                          <div className="flex flex-col items-end gap-1 text-right">
                            <span className={`rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.22em] ${entry.completed ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/30 bg-amber-500/10 text-amber-300'}`}>
                              {entry.completed ? 'Done' : 'Open'}
                            </span>
                            <span className="text-[10px] text-slate-500">{entry.when}</span>
                            <span className="text-[10px] text-slate-500">{entry.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-white/10 px-4 py-12 text-center text-sm text-slate-500">
                  ยังไม่มีประวัติการใช้งาน travel plan
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
