import React, { useMemo, useState } from 'react';
import { CalendarDays, Sparkles, ChevronRight, Moon, Sun, Flag, ChevronLeft, CalendarRange, CalendarDays as CalendarMonthIcon, CalendarClock } from 'lucide-react';
import { HOLIDAYS, Holiday } from '../data/holidayData';

const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const THAI_DAYS = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];

const formatLocalDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface PremiumCalendarCardProps {
  onDateClick?: (date: string, events: Holiday[]) => void;
}

export const PremiumCalendarCard: React.FC<PremiumCalendarCardProps> = ({ onDateClick }) => {
  const [viewMode, setViewMode] = useState<'week' | 'month' | 'year'>('month');
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const monthDays: Array<{ date: Date; key: string; inMonth: boolean; holidays: Holiday[]; isToday: boolean }> = [];
  const startPad = monthStart.getDay();
  const endPad = 6 - monthEnd.getDay();

  for (let i = startPad; i > 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth(), 1 - i);
    const dateKey = formatLocalDateKey(d);
    monthDays.push({ date: d, key: `${d.toISOString()}-prev`, inMonth: false, isToday: false, holidays: HOLIDAYS.filter((holiday) => holiday.date === dateKey) });
  }

  for (let day = 1; day <= monthEnd.getDate(); day += 1) {
    const d = new Date(now.getFullYear(), now.getMonth(), day);
    const dStr = d.toISOString().split('T')[0];
    monthDays.push({
      date: d,
      key: dStr,
      inMonth: true,
      isToday: dStr === todayStr,
      holidays: HOLIDAYS.filter((holiday) => holiday.date === dStr),
    });
  }

  for (let i = 1; i <= endPad; i += 1) {
    const d = new Date(now.getFullYear(), now.getMonth() + 1, i);
    const dateKey = formatLocalDateKey(d);
    monthDays.push({ date: d, key: `${d.toISOString()}-next`, inMonth: false, isToday: false, holidays: HOLIDAYS.filter((holiday) => holiday.date === dateKey) });
  }
  
  const monthEvents = useMemo(() => {
    return HOLIDAYS.filter((holiday) => {
      const d = new Date(`${holiday.date}T00:00:00`);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    });
  }, [todayStr]);

  const weekDays = useMemo(() => {
    const current = new Date(now);
    const dayOffset = current.getDay();
    current.setDate(current.getDate() - dayOffset);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(current);
      date.setDate(current.getDate() + index);
      const dateKey = date.toISOString().split('T')[0];
      return {
        date,
        key: dateKey,
        inMonth: date.getMonth() === now.getMonth(),
        isToday: dateKey === todayStr,
        holiday: HOLIDAYS.find((holiday) => holiday.date === dateKey),
      };
    });
  }, [todayStr]);

  const yearMonths = useMemo(() => {
    return Array.from({ length: 12 }, (_, monthIndex) => {
      const monthEventsCount = HOLIDAYS.filter((holiday) => {
        const d = new Date(`${holiday.date}T00:00:00`);
        return d.getFullYear() === now.getFullYear() && d.getMonth() === monthIndex;
      }).length;
      return {
        monthIndex,
        label: THAI_MONTHS[monthIndex],
        count: monthEventsCount,
        isCurrent: monthIndex === now.getMonth(),
      };
    });
  }, []);

  const formatThaiDate = (date: Date) => {
    return `${date.getDate()} ${THAI_MONTHS[date.getMonth()]} ${date.getFullYear() + 543}`;
  };

  const getHolidayIcon = (type: Holiday['type']) => {
    switch (type) {
      case 'religious': return <Sun size={14} className="text-amber-400" />;
      case 'chinese': return <Moon size={14} className="text-rose-400" />;
      case 'public': return <Flag size={14} className="text-blue-400" />;
      default: return <Sparkles size={14} className="text-purple-400" />;
    }
  };

  return (
    <div className="group flex flex-col gap-2 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-2 mt-6 transition-all hover:border-white/20 hover:bg-white/[0.05] shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300 shadow-inner">
            <CalendarDays size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">ปฏิทินกิจกรรม</h3>
            <p className="truncate text-[13px] font-bold text-white">{formatThaiDate(now)}</p>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-slate-500 transition-colors group-hover:text-white">
          <ChevronRight size={16} />
        </div>
      </div>

      {/* Mode switch */}
      <div className="grid grid-cols-3 gap-1 rounded-2xl border border-white/5 bg-white/[0.02] p-0.5">
        <button
          type="button"
          onClick={() => setViewMode('week')}
          className={`flex items-center justify-center gap-2 rounded-xl py-1.5 text-[10px] font-black uppercase tracking-[0.18em] transition-colors ${viewMode === 'week' ? 'bg-white text-black' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}
        >
          <CalendarRange size={14} />
          Week
        </button>
        <button
          type="button"
          onClick={() => setViewMode('month')}
          className={`flex items-center justify-center gap-2 rounded-xl py-1.5 text-[10px] font-black uppercase tracking-[0.18em] transition-colors ${viewMode === 'month' ? 'bg-white text-black' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}
        >
          <CalendarMonthIcon size={14} />
          Month
        </button>
        <button
          type="button"
          onClick={() => setViewMode('year')}
          className={`flex items-center justify-center gap-2 rounded-xl py-1.5 text-[10px] font-black uppercase tracking-[0.18em] transition-colors ${viewMode === 'year' ? 'bg-white text-black' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}
        >
          <CalendarClock size={14} />
          Year
        </button>
      </div>

      {viewMode === 'month' && (
        <div className="grid grid-cols-7 gap-1">
          {THAI_DAYS.map((day) => (
            <div key={day} className="px-1 py-1 text-center text-[9px] font-black uppercase tracking-[0.22em] text-slate-600">
              {day.slice(0, 3)}
            </div>
          ))}
          {monthDays.map(({ key, date, holidays, inMonth, isToday }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                if (!holidays.length) return;
                onDateClick?.(formatLocalDateKey(date), holidays);
              }}
              disabled={holidays.length === 0}
              className={`group relative flex min-h-[2.25rem] flex-col items-start justify-start rounded-xl border px-2 py-1.5 text-left transition-all ${
                inMonth ? 'border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]' : 'border-white/0 bg-transparent opacity-25'
              } ${isToday ? 'ring-1 ring-indigo-500/60 bg-indigo-500/10' : ''} ${holidays.length > 0 ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <span className={`text-[10px] font-black leading-none ${isToday ? 'text-white' : inMonth ? 'text-slate-300' : 'text-slate-600'}`}>
                {date.getDate()}
              </span>
              {holidays.length > 0 && (
                <span className="mt-1 flex h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]" title={holidays.map((holiday) => holiday.name).join(', ')} />
              )}
            </button>
          ))}
        </div>
      )}

      {viewMode === 'week' && (
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map(({ key, date, holiday, isToday, inMonth }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                if (!holiday) return;
                onDateClick?.(formatLocalDateKey(date), HOLIDAYS.filter((entry) => entry.date === formatLocalDateKey(date)));
              }}
              className={`rounded-2xl border px-2 py-2 text-left transition-all ${
                isToday ? 'border-indigo-500/60 bg-indigo-500/10' : inMonth ? 'border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]' : 'border-white/0 bg-transparent opacity-25'
              }`}
            >
              <div className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">{THAI_DAYS[date.getDay()].slice(0, 3)}</div>
              <div className={`mt-1 text-[12px] font-black ${isToday ? 'text-white' : 'text-slate-300'}`}>{date.getDate()}</div>
              <div className="mt-1 min-h-[12px] text-[8px] font-bold text-slate-500">{holiday ? holiday.name.slice(0, 6) : '—'}</div>
            </button>
          ))}
        </div>
      )}

      {viewMode === 'year' && (
        <div className="grid grid-cols-3 gap-2">
          {yearMonths.map((month) => (
            <button
              key={month.monthIndex}
              type="button"
              className={`rounded-2xl border px-3 py-3 text-left transition-all ${month.isCurrent ? 'border-indigo-500/50 bg-indigo-500/10' : 'border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]'}`}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{month.label.slice(0, 3)}</div>
              <div className="mt-1 text-[13px] font-bold text-white">{month.count} events</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
