import { useState, useEffect, useCallback } from 'react';
import {
  Package,
  Plus,
  Minus,
  Trash2,
  X,
  Pill,
  Droplets,
  Utensils,
  Flame,
  Shield,
  Wrench,
  AlertTriangle
} from 'lucide-react';

export type ResourceCategory = 'food' | 'water' | 'medical' | 'tools' | 'fuel' | 'defense';

export interface ResourceItem {
  id: string;
  name: string;
  category: ResourceCategory;
  quantity: number;
  unit: string;
  caloriesPerUnit?: number; // สำหรับ food
  weight?: number; // กรัม
}

const CATEGORY_CONFIG: Record<ResourceCategory, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  food:    { label: 'อาหาร',     icon: <Utensils size={14} />, color: 'text-amber-400',   bg: 'bg-amber-500/20' },
  water:   { label: 'น้ำ',       icon: <Droplets size={14} />, color: 'text-blue-400',    bg: 'bg-blue-500/20' },
  medical: { label: 'ยา/การแพทย์', icon: <Pill size={14} />,     color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  tools:   { label: 'เครื่องมือ',  icon: <Wrench size={14} />,   color: 'text-slate-400',   bg: 'bg-slate-500/20' },
  fuel:    { label: 'เชื้อเพลิง',  icon: <Flame size={14} />,    color: 'text-orange-400',  bg: 'bg-orange-500/20' },
  defense: { label: 'อาวุธ/ป้องกัน', icon: <Shield size={14} />,  color: 'text-red-400',     bg: 'bg-red-500/20' },
};

const PRESET_ITEMS: Omit<ResourceItem, 'id'>[] = [
  { name: 'ข้าวสาร', category: 'food', quantity: 0, unit: 'กก.', caloriesPerUnit: 3600, weight: 1000 },
  { name: 'บะหมี่กึ่งสำเร็จรูป', category: 'food', quantity: 0, unit: 'ซอง', caloriesPerUnit: 350, weight: 60 },
  { name: 'ปลากระป๋อง', category: 'food', quantity: 0, unit: 'กระป๋อง', caloriesPerUnit: 200, weight: 155 },
  { name: 'น้ำดื่มบรรจุขวด', category: 'water', quantity: 0, unit: 'ลิตร', weight: 1000 },
  { name: 'เม็ดฟอกน้ำ', category: 'water', quantity: 0, unit: 'เม็ด', weight: 5 },
  { name: 'ยาแก้ปวด (Paracetamol)', category: 'medical', quantity: 0, unit: 'เม็ด', weight: 1 },
  { name: 'ยาปฏิชีวนะ', category: 'medical', quantity: 0, unit: 'แผง', weight: 10 },
  { name: 'ผ้าพันแผล', category: 'medical', quantity: 0, unit: 'ม้วน', weight: 50 },
  { name: 'มีดพก', category: 'tools', quantity: 0, unit: 'เล่ม', weight: 200 },
  { name: 'ไฟฉาย', category: 'tools', quantity: 0, unit: 'อัน', weight: 300 },
  { name: 'ถ่านไฟฉาย AA', category: 'tools', quantity: 0, unit: 'ก้อน', weight: 23 },
  { name: 'แก๊สกระป๋อง', category: 'fuel', quantity: 0, unit: 'กระป๋อง', weight: 220 },
  { name: 'ไม้ขีดไฟ', category: 'fuel', quantity: 0, unit: 'กล่อง', weight: 30 },
];

const generateId = () => `res_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

interface ResourceInventoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResourceInventory({ isOpen, onClose }: ResourceInventoryProps) {
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [filterCategory, setFilterCategory] = useState<ResourceCategory | 'all'>('all');
  const [showAddPreset, setShowAddPreset] = useState(false);

  // Load on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('locus_resource_inventory');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // default empty
    }
  }, []);

  // Auto-save
  const saveItems = useCallback((newItems: ResourceItem[]) => {
    setItems(newItems);
    localStorage.setItem('locus_resource_inventory', JSON.stringify(newItems));
  }, []);

  const addPresetItem = (preset: Omit<ResourceItem, 'id'>) => {
    // ถ้ามีอยู่แล้วให้เพิ่ม qty แทน
    const existing = items.find(i => i.name === preset.name);
    if (existing) {
      saveItems(items.map(i => i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      saveItems([...items, { ...preset, id: generateId(), quantity: 1 }]);
    }
    setShowAddPreset(false);
  };

  const updateQuantity = (id: string, delta: number) => {
    saveItems(items.map(i => {
      if (i.id !== id) return i;
      const newQty = Math.max(0, i.quantity + delta);
      return { ...i, quantity: newQty };
    }));
  };

  const removeItem = (id: string) => {
    saveItems(items.filter(i => i.id !== id));
  };

  const filteredItems = filterCategory === 'all' 
    ? items 
    : items.filter(i => i.category === filterCategory);

  // สรุปรวม
  const totalCalories = items.reduce((sum, i) => sum + (i.caloriesPerUnit || 0) * i.quantity, 0);
  const totalWeight = items.reduce((sum, i) => sum + (i.weight || 0) * i.quantity, 0);
  const totalWater = items.filter(i => i.category === 'water' && i.unit === 'ลิตร').reduce((sum, i) => sum + i.quantity, 0);
  const survivalDays = Math.floor(Math.min(totalCalories / 2000, totalWater / 3)); // 2000 kcal/day, 3L water/day

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-start justify-end animate-in fade-in duration-200">
      <div 
        className="w-[420px] h-full bg-[#0a0c10] border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 px-6 py-5 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Package size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Resource Inventory</h2>
                <p className="text-xs text-slate-500">บันทึกทรัพยากร & เสบียง</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Survival Summary */}
        <div className="shrink-0 px-6 py-4 border-b border-white/5 bg-[#0f1115]/50">
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className={`text-xl font-black ${survivalDays > 7 ? 'text-emerald-400' : survivalDays > 3 ? 'text-amber-400' : 'text-red-400'}`}>
                {survivalDays}
              </div>
              <div className="text-[9px] text-slate-500 uppercase">วันรอด</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-amber-400">{(totalCalories / 1000).toFixed(1)}k</div>
              <div className="text-[9px] text-slate-500 uppercase">kcal</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-blue-400">{totalWater}L</div>
              <div className="text-[9px] text-slate-500 uppercase">น้ำ</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-slate-300">{(totalWeight / 1000).toFixed(1)}</div>
              <div className="text-[9px] text-slate-500 uppercase">กก.</div>
            </div>
          </div>
          {survivalDays < 3 && (
            <div className="mt-3 flex items-center gap-2 text-red-400 bg-red-500/10 rounded-lg px-3 py-2">
              <AlertTriangle size={14} />
              <span className="text-xs font-medium">เสบียงไม่พอ 3 วัน! ต้องหาเพิ่มเติมด่วน</span>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="shrink-0 px-6 py-3 border-b border-white/5 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              filterCategory === 'all' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
            }`}
          >
            ทั้งหมด ({items.length})
          </button>
          {(Object.entries(CATEGORY_CONFIG) as [ResourceCategory, typeof CATEGORY_CONFIG[ResourceCategory]][]).map(([key, cfg]) => {
            const count = items.filter(i => i.category === key).length;
            return (
              <button
                key={key}
                onClick={() => setFilterCategory(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  filterCategory === key ? `${cfg.bg} ${cfg.color} border border-current/30` : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                }`}
              >
                {cfg.icon}
                {cfg.label} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2 custom-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-slate-500">
              <Package size={32} className="mb-2 opacity-40" />
              <p className="text-sm">ยังไม่มีรายการ</p>
              <p className="text-xs">กดปุ่ม + ด้านล่างเพื่อเพิ่ม</p>
            </div>
          ) : (
            filteredItems.map(item => {
              const cfg = CATEGORY_CONFIG[item.category];
              return (
                <div key={item.id} className="flex items-center gap-3 bg-[#0f1115] rounded-xl border border-white/5 p-3 hover:border-white/10 transition-all group">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cfg.bg} ${cfg.color}`}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-500">
                      {item.caloriesPerUnit && `${item.caloriesPerUnit * item.quantity} kcal`}
                      {item.weight && ` • ${((item.weight * item.quantity) / 1000).toFixed(1)} กก.`}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-400 transition-all"
                    >
                      <Plus size={12} />
                    </button>
                    <span className="text-[10px] text-slate-500 w-10">{item.unit}</span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Add Button / Preset Picker */}
        <div className="shrink-0 px-6 py-4 border-t border-white/5">
          {showAddPreset ? (
            <div className="bg-[#0f1115] rounded-xl border border-white/10 p-3 max-h-[240px] overflow-y-auto space-y-1 custom-scrollbar">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-bold">เลือกรายการ:</span>
                <button onClick={() => setShowAddPreset(false)} className="text-slate-500 hover:text-white">
                  <X size={14} />
                </button>
              </div>
              {PRESET_ITEMS.map((preset, idx) => {
                const cfg = CATEGORY_CONFIG[preset.category];
                const alreadyAdded = items.some(i => i.name === preset.name);
                return (
                  <button
                    key={idx}
                    onClick={() => addPresetItem(preset)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/5 transition-colors"
                  >
                    <div className={`w-6 h-6 rounded flex items-center justify-center ${cfg.bg} ${cfg.color}`}>
                      {cfg.icon}
                    </div>
                    <span className="text-sm text-white flex-1">{preset.name}</span>
                    {alreadyAdded && <span className="text-[10px] text-emerald-400">+1</span>}
                  </button>
                );
              })}
            </div>
          ) : (
            <button
              onClick={() => setShowAddPreset(true)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-slate-300 font-medium transition-all"
            >
              <Plus size={16} />
              เพิ่มรายการเสบียง
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
