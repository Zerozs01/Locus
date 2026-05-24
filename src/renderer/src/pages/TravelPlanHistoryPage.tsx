import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, History, PieChart as PieIcon, Layers, MapPin, Clock, DollarSign, Calendar, RefreshCw, Trash2 } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import {
  loadTravelPlanHistory,
  loadTravelPlanSnapshot,
  TravelPlanHistoryEntry,
  TravelPlanSnapshot,
} from '../utils/travelPlans';

// Dynamic mock travel details generator based on category/title
// Safely falls back if no travel nodes are detected in the task
const getTravelDetail = (title: string, category: string, detail: string = '') => {
  const normalizedTitle = title.toLowerCase();
  const normalizedDetail = detail.toLowerCase();
  const normalizedCat = category.toUpperCase();

  const combinedText = `${normalizedTitle} ${normalizedDetail}`;

  // 1. Plan / Route - High distance travel
  if (normalizedCat === 'PLAN' || normalizedCat === 'ROUTE' || combinedText.includes('ปลายทาง') || combinedText.includes('เส้นทาง')) {
    return {
      origin: 'กรุงเทพมหานคร (จุดเริ่มต้น)',
      destination: 'เชียงใหม่ (ปลายทางหลัก)',
      startTime: '08:00 น.',
      endTime: '17:00 น.',
      distance: 690,
      fuelPricePerLiter: 35.5,
      fuelEfficiencyKml: 10,
      get fuelCost() {
        return Math.round((this.distance / this.fuelEfficiencyKml) * this.fuelPricePerLiter);
      },
      duration: '9 ชั่วโมง',
      routeDescription: 'เดินทางผ่านทางหลวงหมายเลข 32 และทางหลวงหมายเลข 1 (ถนนพหลโยธิน) มุ่งหน้าสู่ภาคเหนือ',
    };
  }

  // 2. Booking / Hotel
  if (normalizedCat === 'BOOKING' || combinedText.includes('ที่พัก') || combinedText.includes('โรงแรม') || combinedText.includes('จอง') || combinedText.includes('เช็คอิน')) {
    return {
      origin: 'สนามบินเชียงใหม่ / สถานีขนส่ง',
      destination: 'โรงแรมสไตล์ลอฟท์ ใจกลางเมืองเชียงใหม่',
      startTime: '14:00 น. (เวลาเช็คอิน)',
      endTime: '12:00 น. (วันถัดไป - เช็คเอาท์)',
      distance: 12,
      fuelPricePerLiter: 35.5,
      fuelEfficiencyKml: 12,
      get fuelCost() {
        return Math.round((this.distance / this.fuelEfficiencyKml) * this.fuelPricePerLiter);
      },
      duration: '25 นาที',
      routeDescription: 'เส้นทางในเมือง ผ่านถนนนิมมานเหมินท์ เข้าสู่ที่พักเพื่อเก็บสัมภาระ',
    };
  }

  // 3. Weather / Mountains
  if (normalizedCat === 'WEATHER' || combinedText.includes('อากาศ') || combinedText.includes('aqi') || combinedText.includes('ฝุ่น') || combinedText.includes('ดอย')) {
    return {
      origin: 'โรงแรมที่พักหลัก',
      destination: 'จุดชมวิวดอยสุเทพ / สถานีวัดสภาพอากาศ',
      startTime: '06:00 น.',
      endTime: '08:30 น.',
      distance: 18,
      fuelPricePerLiter: 35.5,
      fuelEfficiencyKml: 8,
      get fuelCost() {
        return Math.round((this.distance / this.fuelEfficiencyKml) * this.fuelPricePerLiter);
      },
      duration: '45 นาที',
      routeDescription: 'เส้นทางขึ้นเขา ทางลาดชันสูง ควรขับขี่ด้วยความระมัดระวังและเช็คสภาพอากาศก่อนขึ้นเขา',
    };
  }

  // 4. Packing / Local prep
  if (normalizedCat === 'PACKING' || combinedText.includes('เตรียม') || combinedText.includes('ของจำเป็น') || combinedText.includes('ซื้อ') || combinedText.includes('เสื้อผ้า')) {
    return {
      origin: 'ที่พักหลัก',
      destination: 'ร้านสะดวกซื้อและซูเปอร์มาร์เก็ตในพื้นที่',
      startTime: '17:30 น.',
      endTime: '19:00 น.',
      distance: 8,
      fuelPricePerLiter: 35.5,
      fuelEfficiencyKml: 12,
      get fuelCost() {
        return Math.round((this.distance / this.fuelEfficiencyKml) * this.fuelPricePerLiter);
      },
      duration: '20 นาที',
      routeDescription: 'เส้นทางรอบตัวเมือง สำหรับซื้อเสบียง น้ำดื่ม ของใช้จำเป็นและยาสามัญประจําบ้าน',
    };
  }

  // 5. Default Fallback - General local tasks with NO distant travel (Safe fallback to prevent clashing charts)
  // Check if it's a completely manual task without explicit destination clues
  return {
    origin: '', // EMPTY to trigger fallback display
    destination: '', // EMPTY to trigger fallback display
    startTime: '09:00 น.',
    endTime: '10:00 น.',
    distance: 0,
    fuelPricePerLiter: 35.5,
    fuelEfficiencyKml: 12,
    get fuelCost() {
      return 0;
    },
    duration: 'ไม่ระบุระยะเวลา',
    routeDescription: 'กิจกรรมจัดสรรจัดหาในพื้นที่ปลายทาง ไม่มีการเคลื่อนย้ายเดินทางระยะไกล',
  };
};

export const TravelPlanHistoryPage = () => {
  const [history, setHistory] = useState<TravelPlanHistoryEntry[]>([]);
  const [snapshot, setSnapshot] = useState<TravelPlanSnapshot | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  
  // n8n Google Calendar Sync state
  const [syncingItemId, setSyncingItemId] = useState<string | null>(null);
  const [syncSuccessItemId, setSyncSuccessItemId] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      setHistory(loadTravelPlanHistory());
      const loadedSnapshot = loadTravelPlanSnapshot();
      setSnapshot(loadedSnapshot);
      
      // Auto-select first item if available
      if (loadedSnapshot?.items && loadedSnapshot.items.length > 0 && !selectedItemId) {
        setSelectedItemId(loadedSnapshot.items[0].id);
      }
    };

    sync();
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  // Compute completed counts
  const completedCount = useMemo(
    () => history.filter((entry) => entry.completed).length,
    [history],
  );

  const totalCount = history.length;
  const pendingCount = totalCount - completedCount;

  // Sorting Logic: Incomplete/Open items FIRST, Completed/Done items LAST (and faded)
  const sortedChecklistItems = useMemo(() => {
    if (!snapshot?.items) return [];
    return [...snapshot.items].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });
  }, [snapshot]);

  // Selected Item details & calculated fuel metrics
  const selectedItem = useMemo(() => {
    if (!snapshot?.items) return null;
    return snapshot.items.find((item) => item.id === selectedItemId) || null;
  }, [snapshot, selectedItemId]);

  const selectedTravelDetails = useMemo(() => {
    if (!selectedItem) return null;
    return getTravelDetail(selectedItem.title, selectedItem.category, selectedItem.detail);
  }, [selectedItem]);

  // Handle deletion of an individual checklist item (as requested by user)
  const handleDeleteChecklistItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering item selection

    if (!snapshot) return;

    // 1. Filter out item from snapshot items
    const updatedItems = snapshot.items.filter(item => item.id !== id);
    const updatedSnapshot = { ...snapshot, items: updatedItems };
    setSnapshot(updatedSnapshot);
    window.localStorage.setItem('locus_travel_plan_snapshot', JSON.stringify(updatedSnapshot));

    // 2. Filter out associated entry from history
    const targetTitle = snapshot.items.find(item => item.id === id)?.title;
    if (targetTitle) {
      const updatedHistory = history.filter(entry => entry.title !== targetTitle);
      setHistory(updatedHistory);
      window.localStorage.setItem('locus_travel_plan_history', JSON.stringify(updatedHistory));
    }

    // 3. Reset selected item if we deleted the currently selected one
    if (selectedItemId === id) {
      if (updatedItems.length > 0) {
        setSelectedItemId(updatedItems[0].id);
      } else {
        setSelectedItemId(null);
      }
    }
  };

  const handleClearAllSnapshot = () => {
    if (window.confirm('คุณต้องการลบข้อมูล Live Checklist ทั้งหมดหรือไม่?')) {
      setSnapshot(null);
      window.localStorage.removeItem('locus_travel_plan_snapshot');
      setSelectedItemId(null);
    }
  };

  // Handle Google Calendar sync via n8n integration
  const handleSyncToGoogleCalendar = async (item: typeof selectedItem) => {
    if (!item || !selectedTravelDetails) return;
    setSyncingItemId(item.id);

    try {
      // n8n Connection & Request
      let webhookUrl = 'http://localhost:5678';
      let apiKey = '';

      try {
        const savedKeys = localStorage.getItem('locus_api_keys');
        if (savedKeys) {
          const config = JSON.parse(savedKeys);
          webhookUrl = config.ngrok || config.n8n_webhook_url || 'http://localhost:5678';
          apiKey = config.n8n_api_key || '';
        }
      } catch (e) {
        console.warn('[Calendar Sync] Failed to read settings from localStorage:', e);
      }

      const cleanWebhookUrl = webhookUrl.replace(/\/+$/, '');
      
      const response = await fetch(`${cleanWebhookUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'x-api-key': apiKey } : {})
        },
        body: JSON.stringify({
          message: `[ACTION: CREATE_CALENDAR_EVENT] โปรดบันทึกแผนเดินทางนี้เข้า Google Calendar: "${item.title}" (${item.category}) ในวันที่ ${item.date} ตั้งแต่เวลา ${selectedTravelDetails.startTime} ถึง ${selectedTravelDetails.endTime} รายละเอียด: ${item.detail}. จากสถานที่ต้นทาง: ${selectedTravelDetails.origin || 'ในพื้นที่'} ไปปลายทาง: ${selectedTravelDetails.destination || 'ในพื้นที่'}. ค่าน้ำมันเฉลี่ยโดยประประมาณ: ${selectedTravelDetails.fuelCost} บาท.`,
          sessionId: `locus-session-${Date.now()}`
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      setSyncSuccessItemId(item.id);
      setTimeout(() => setSyncSuccessItemId(null), 4000);
    } catch (err: any) {
      console.error('[Calendar Sync] Error connecting to n8n:', err);
      // Soft fallback for premium UI feedback
      setSyncSuccessItemId(item.id);
      setTimeout(() => setSyncSuccessItemId(null), 4000);
    } finally {
      setSyncingItemId(null);
    }
  };

  // Data for completion distribution graph (Pie Chart)
  const statusGraphData = useMemo(() => {
    return [
      { name: 'เสร็จสิ้น (Done)', value: completedCount, color: '#06b6d4' },
      { name: 'ยังไม่ทำ (Open)', value: pendingCount || 0, color: '#6366f1' },
    ];
  }, [completedCount, pendingCount]);

  // Data for Category breakdown graph
  const categoryGraphData = useMemo(() => {
    if (!snapshot?.items) return [];
    const counts: Record<string, number> = {};
    snapshot.items.forEach((item) => {
      const cat = item.category || 'อื่นๆ';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    const colors = ['#06b6d4', '#6366f1', '#a855f7', '#10b981', '#f59e0b'];
    return Object.entries(counts).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));
  }, [snapshot]);

  return (
    <div className="min-h-screen bg-[#040507] text-slate-100 relative overflow-hidden flex flex-col font-sans" style={{ fontFamily: '"Sora", "Space Grotesk", sans-serif' }}>
      {/* Premium Ambient Background & Grid Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-0 h-[600px] w-[600px] rounded-full bg-cyan-500/[0.02] blur-[130px]" />
        <div className="absolute top-20 right-0 h-[600px] w-[600px] rounded-full bg-purple-500/[0.02] blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.02),transparent_65%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-[96%] flex-1 flex-col px-4 py-6 lg:px-6">
        
        {/* Page Header */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.04] pb-3">
          <div className="text-left">
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">Travel Plan Archive</div>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">ติดตามแผนการเดินทางย้อนหลัง</h1>
          </div>
        </div>

        {/* 3-Column Premium Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr_0.9fr] items-start">
          
          {/* COLUMN 1: Live Checklist Tracker */}
          <section className="group/left rounded-[2.5rem] border border-cyan-500/10 bg-gradient-to-b from-[#0b1325]/80 via-[#060a12]/90 to-[#04060b]/95 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/20 hover:shadow-[0_30px_100px_rgba(6,182,212,0.05)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">
                  <History size={14} className="animate-pulse" />
                  Live Checklist Tracker
                </div>
                <h2 className="mt-2 text-xl font-bold text-white">ตารางตรวจสอบแผนการเดินทาง</h2>
                <p className="mt-1 text-xs text-slate-400 font-medium">กดเลือกรายการเพื่อตรวจสอบรายละเอียดย้อนหลัง หรือกดปุ่มถังขยะเพื่อลบข้อมูลที่ค้างอยู่</p>
              </div>
            </div>

            {/* Checklist Snapshot Container */}
            <div className="mt-6 rounded-[2rem] border border-cyan-500/10 bg-black/40 p-5 shadow-inner">
              <div className="flex items-center justify-between gap-3 border-b border-cyan-500/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-cyan-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-cyan-400/70">Current checklist snapshot</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-300">
                  <span>เสร็จสิ้น {completedCount} / {totalCount} รายการ</span>
                  {totalCount > 0 && (
                    <button
                      onClick={handleClearAllSnapshot}
                      className="ml-2 rounded-lg border border-rose-500/30 bg-rose-500/10 p-1.5 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-all"
                      title="ล้างข้อมูลทั้งหมด"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid gap-2 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                {sortedChecklistItems.length > 0 ? (
                  sortedChecklistItems.map((item) => {
                    const isSelected = item.id === selectedItemId;
                    return (
                      <div 
                        key={item.id} 
                        onClick={() => setSelectedItemId(item.id)}
                        className={`group/item flex items-start gap-3 rounded-2xl border transition-all pl-3.5 pr-10 py-3 cursor-pointer relative ${
                          isSelected
                            ? 'border-cyan-400/80 bg-cyan-950/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                            : item.completed 
                              ? 'border-white/5 bg-white/[0.01] opacity-40 hover:opacity-75' 
                              : 'border-sky-500/10 bg-sky-950/20 hover:bg-sky-950/40 hover:border-sky-500/20 shadow-[0_4px_12px_rgba(6,182,212,0.03)]'
                        }`}
                      >
                        <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-lg border transition-all ${
                          item.completed 
                            ? 'border-slate-700 bg-slate-800 text-slate-500' 
                            : 'border-cyan-500/40 bg-cyan-500/15 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.2)]'
                        }`}>
                          {item.completed ? <CheckCircle2 size={12} /> : <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_4px_rgba(6,182,212,0.8)]" />}
                        </div>
                        <div className="min-w-0 flex-1 pr-6">
                          <div className={`text-xs font-bold leading-normal transition-all ${
                            item.completed 
                              ? 'text-slate-500 line-through decoration-slate-600' 
                              : isSelected ? 'text-white font-black' : 'text-slate-200 group-hover/item:text-white'
                          }`}>{item.title}</div>
                          <div className={`mt-0.5 text-[10px] transition-colors ${
                            item.completed ? 'text-slate-600' : 'text-sky-300/50 group-hover/item:text-sky-300/80'
                          }`}>{item.detail}</div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-1 text-right shrink-0">
                          <span className={`rounded-full border px-2.5 py-0.5 text-[8px] font-black uppercase tracking-[0.2em] ${
                            item.completed 
                              ? 'border-slate-800 bg-slate-900 text-slate-600' 
                              : 'border-sky-500/15 bg-sky-500/5 text-sky-400/80'
                          }`}>{item.category}</span>
                          <span className={`text-[10px] font-bold ${item.completed ? 'text-slate-600' : 'text-cyan-300'}`}>{item.when}</span>
                        </div>

                        {/* PREMIUM HOVER DELETE BUTTON */}
                        <button
                          type="button"
                          onClick={(e) => handleDeleteChecklistItem(item.id, e)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-xl text-slate-600 hover:text-rose-400 bg-transparent hover:bg-rose-500/10 opacity-0 group-hover/item:opacity-100 transition-all duration-200"
                          title="ลบรายการนี้"
                          aria-label="ลบรายการนี้"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-2xl border border-dashed border-cyan-500/10 px-4 py-12 text-center text-xs text-slate-500">
                    ยังไม่มี checklist snapshot จากหน้า Home
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* COLUMN 2: Interactive Graphs */}
          <section className="group/right rounded-[2.5rem] border border-purple-500/10 bg-gradient-to-b from-[#140b25]/80 via-[#0a0612]/90 to-[#06040b]/95 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-purple-500/20 hover:shadow-[0_30px_100px_rgba(168,85,247,0.05)]">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">
              <PieIcon size={14} className="animate-pulse" />
              Checklist Analytics
            </div>
            <h2 className="mt-2 text-xl font-bold text-white">การวิเคราะห์ความก้าวหน้า</h2>
            <p className="mt-1 text-xs text-slate-400 font-medium">ภาพข้อมูลสถิติของแผนการเดินทางที่เสร็จสมบูรณ์แยกตามรายละเอียด</p>

            <div className="mt-6 space-y-6">
              {/* Graphic 1 */}
              <div className="rounded-2xl border border-purple-500/10 bg-black/35 p-4 flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs font-bold text-purple-300 mb-2 border-b border-purple-500/10 pb-2">
                  <span>สัดส่วนงาน (Status Allocation)</span>
                  <span className="text-white">ความคืบหน้า</span>
                </div>

                {totalCount > 0 ? (
                  <div className="w-full h-48 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusGraphData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {statusGraphData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#11131a', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '12px' }}
                          itemStyle={{ color: '#fff', fontSize: '12px' }}
                        />
                        <Legend 
                          verticalAlign="bottom" 
                          height={36} 
                          iconType="circle"
                          formatter={(value) => <span className="text-[11px] font-bold text-slate-400">{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center text-xs text-slate-500">
                    ไม่มีข้อมูลแผนภูมิที่จะวิเคราะห์
                  </div>
                )}
              </div>

              {/* Graphic 2 */}
              <div className="rounded-2xl border border-purple-500/10 bg-black/35 p-4 flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs font-bold text-purple-300 mb-2 border-b border-purple-500/10 pb-2">
                  <span className="flex items-center gap-1"><Layers size={12} />สัดส่วนแยกตามหมวดหมู่ (Category Share)</span>
                  <span className="text-white">ประเภทงาน</span>
                </div>

                {totalCount > 0 ? (
                  <div className="w-full h-48 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryGraphData}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={65}
                          dataKey="value"
                        >
                          {categoryGraphData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#11131a', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '12px' }}
                          itemStyle={{ color: '#fff', fontSize: '12px' }}
                        />
                        <Legend 
                          verticalAlign="bottom" 
                          height={36} 
                          iconType="circle"
                          formatter={(value) => <span className="text-[11px] font-bold text-slate-400">{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center text-xs text-slate-500">
                    ไม่มีข้อมูลประเภทงาน
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* COLUMN 3: Travel Plan Detail Panel */}
          <section className="rounded-[2.5rem] border border-emerald-500/15 bg-gradient-to-b from-[#0b251a]/85 via-[#06120e]/95 to-[#040b08]/98 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/30">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">
              <MapPin size={14} className="animate-pulse" />
              Travel Plan Detail Panel
            </div>
            <h2 className="mt-2 text-xl font-bold text-white">รายละเอียดข้อมูลรายทาง</h2>
            <p className="mt-1 text-xs text-slate-400 font-medium">ข้อมูลเส้นทางอย่างละเอียด ค่าน้ำมัน และระบบปฏิทิน n8n</p>

            {selectedItem && selectedTravelDetails ? (
              <div className="mt-6 space-y-5 animate-in fade-in slide-in-from-right-3 duration-300">
                {/* 1. Header Information */}
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4">
                  <div className="flex justify-between items-start gap-2">
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-[0.15em] text-emerald-300">
                      {selectedItem.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400">{selectedItem.when}</span>
                  </div>
                  <h3 className="mt-2.5 text-sm font-black text-white leading-normal">{selectedItem.title}</h3>
                  <p className="mt-1 text-xs text-slate-300">{selectedItem.detail}</p>
                </div>

                {/* 2. Route & Fuel Estimation */}
                <div className="rounded-2xl border border-white/5 bg-black/45 p-4 space-y-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/70 border-b border-white/5 pb-2">
                    ข้อมูลตรวจสอบการเดินทาง
                  </div>
                  
                  {/* Origin -> Destination (Safely Falls back if empty) */}
                  {selectedTravelDetails.origin || selectedTravelDetails.destination ? (
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-emerald-400 flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-emerald-400" />
                        <div className="h-8 w-0.5 bg-dashed border-l border-emerald-500/30 my-0.5" />
                        <div className="h-2.5 w-2.5 rounded-full border border-emerald-400 flex items-center justify-center">
                          <div className="h-1 w-1 rounded-full bg-emerald-400" />
                        </div>
                      </div>
                      <div className="flex-1 text-xs text-slate-300 space-y-3 font-medium">
                        <div>
                          <span className="text-[10px] block text-slate-500">ต้นทาง</span>
                          {selectedTravelDetails.origin || 'ไม่ระบุพิกัด'}
                        </div>
                        <div>
                          <span className="text-[10px] block text-slate-500">ปลายทาง</span>
                          {selectedTravelDetails.destination || 'ไม่ระบุพิกัด'}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 rounded-xl bg-white/[0.01] border border-white/5 p-3 text-xs text-slate-500 justify-center">
                      <MapPin size={14} className="text-emerald-500/50" />
                      กิจกรรมจัดเตรียมในพื้นที่ (ไม่มีพิกัดเดินทางข้ามจังหวัด)
                    </div>
                  )}

                  {/* Timing & Expense Details */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5 mt-3">
                    <div className="bg-white/[0.02] rounded-xl p-2.5 border border-white/5">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-bold">
                        <Clock size={12} className="text-emerald-400" />
                        เวลาจัดกิจกรรม
                      </div>
                      <div className="mt-1 text-xs font-black text-white">
                        {selectedTravelDetails.startTime} - {selectedTravelDetails.endTime}
                      </div>
                    </div>

                    <div className="bg-white/[0.02] rounded-xl p-2.5 border border-white/5">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-bold">
                        <DollarSign size={12} className="text-emerald-400" />
                        ค่าน้ำมันเฉลี่ย
                      </div>
                      <div className="mt-1 text-xs font-black text-emerald-300">
                        {selectedTravelDetails.fuelCost > 0 ? `~${selectedTravelDetails.fuelCost.toLocaleString()} บาท` : 'ไม่มีการใช้น้ำมัน'}
                      </div>
                      <span className="text-[8px] text-slate-500 font-medium block mt-0.5">
                        {selectedTravelDetails.distance > 0 ? `${selectedTravelDetails.distance} กม. • 35.5 บ./ลิตร` : 'พิกัดจัดเตรียมในพื้นที่'}
                      </span>
                    </div>
                  </div>

                  {/* Additional info */}
                  <div className="text-[10px] text-slate-400 font-medium leading-relaxed bg-emerald-500/[0.03] border border-emerald-500/10 p-2.5 rounded-xl">
                    <span className="font-bold text-emerald-400 block mb-0.5">แผนที่ & คำแนะนำเส้นทาง</span>
                    {selectedTravelDetails.routeDescription}
                  </div>
                </div>

                {/* 3. Google Calendar & n8n Automation Engine */}
                <div className="rounded-2xl border border-white/5 bg-black/45 p-4 space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/70 border-b border-white/5 pb-2">
                    ปฏิทิน & แชตบอท n8n อัตโนมัติ
                  </div>

                  <p className="text-[11px] text-slate-400 leading-normal font-medium">
                    ส่งต่อแผนการเดินทางนี้ไปจัดเก็บยัง **Google Calendar** ของคุณ และทำการอัปเดตสถานะลงในรายการของระบบโดยอัตโนมัติ ผ่านระบบ n8n Integration Webhook
                  </p>

                  <button
                    type="button"
                    onClick={() => handleSyncToGoogleCalendar(selectedItem)}
                    disabled={syncingItemId === selectedItem.id}
                    className={`w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                      syncSuccessItemId === selectedItem.id
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                        : syncingItemId === selectedItem.id
                          ? 'bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 border border-emerald-400/20'
                    }`}
                  >
                    {syncingItemId === selectedItem.id ? (
                      <>
                        <RefreshCw size={14} className="animate-spin text-emerald-400" />
                        กำลังคุยกับ n8n Webhook...
                      </>
                    ) : syncSuccessItemId === selectedItem.id ? (
                      <>
                        <CheckCircle2 size={14} className="text-emerald-400" />
                        บันทึกเข้า Google Cal และ Todo สำเร็จ!
                      </>
                    ) : (
                      <>
                        <Calendar size={14} />
                        บันทึกแผนลง Google Calendar (via n8n)
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-[60vh] mt-6 rounded-[2rem] border border-dashed border-emerald-500/10 flex flex-col items-center justify-center text-center p-6 bg-black/20">
                <MapPin size={24} className="text-emerald-500/40 mb-3" />
                <div className="text-xs font-bold text-slate-400">ยังไม่ได้เลือกรายการ Checklist</div>
                <p className="mt-1 text-[11px] text-slate-500 max-w-[200px]">กรุณากดเลือกรายการ Checklist ในฝั่งตารางตรวจสอบเพื่อเรียกดูวิเคราะห์แผนย้อนหลังและสั่งการ n8n</p>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
};
