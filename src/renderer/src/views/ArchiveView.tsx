import { useState, useMemo, useEffect } from 'react';
import { 
  Database, Search, Filter, ArrowUpDown, MapPin, Users, Maximize, 
  Shield, Wallet, X, ChevronDown, Scale, Grid, List, SlidersHorizontal,
  Sparkles, TrendingUp, TrendingDown, Check
} from 'lucide-react';

interface Province {
  id: string;
  name: string;
  region_id: string;
  image: string;
  dist: number;
  tam: number;
  population?: string;
  area?: string;
  dailyCost?: string;
  safety?: number;
}

interface Region {
  id: string;
  name: string;
  engName: string;
  color: string;
  subProvinces: Province[];
}

// Region colors for tags
const regionColors: Record<string, { bg: string; text: string; border: string }> = {
  north: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30' },
  northeast: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
  central: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  west: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  east: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  south: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
};

const regionNames: Record<string, string> = {
  north: 'ภาคเหนือ',
  northeast: 'ภาคอีสาน',
  central: 'ภาคกลาง',
  west: 'ภาคตะวันตก',
  east: 'ภาคตะวันออก',
  south: 'ภาคใต้',
};

type SortOption = 'name' | 'cost-high' | 'cost-low' | 'safety-high' | 'safety-low' | 'pop-high' | 'pop-low';

export function ArchiveView(): JSX.Element {
  const [regions, setRegions] = useState<Region[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [compareList, setCompareList] = useState<Province[]>([]);
  const [showComparePanel, setShowComparePanel] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Fetch data from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (window.api && window.api.db) {
          const data = await window.api.db.getRegions();
          setRegions(data);
        }
      } catch (error) {
        console.error('Failed to load regions:', error);
      }
    };
    fetchData();
  }, []);

  // Get all provinces with region info
  const allProvinces = useMemo(() => {
    return regions.flatMap(region => 
      (region.subProvinces || []).map(prov => ({
        ...prov,
        regionId: region.id,
        regionName: region.name,
        regionEngName: region.engName,
        regionColor: region.color
      }))
    );
  }, [regions]);

  // Parse cost string to number for sorting
  const parseCost = (cost?: string): number => {
    if (!cost) return 300;
    const match = cost.match(/(\d+)/);
    return match ? parseInt(match[1]) : 300;
  };

  // Parse population string to number
  const parsePopulation = (pop?: string): number => {
    if (!pop) return 0;
    const match = pop.match(/([\d.]+)([KM]?)/i);
    if (!match) return 0;
    const num = parseFloat(match[1]);
    const unit = match[2].toUpperCase();
    if (unit === 'M') return num * 1000000;
    if (unit === 'K') return num * 1000;
    return num;
  };

  // Filter and sort provinces
  const filteredProvinces = useMemo(() => {
    let result = [...allProvinces];

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query)
      );
    }

    // Filter by region
    if (selectedRegions.length > 0) {
      result = result.filter(p => selectedRegions.includes(p.regionId));
    }

    // Sort
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'cost-high':
        result.sort((a, b) => parseCost(b.dailyCost) - parseCost(a.dailyCost));
        break;
      case 'cost-low':
        result.sort((a, b) => parseCost(a.dailyCost) - parseCost(b.dailyCost));
        break;
      case 'safety-high':
        result.sort((a, b) => (b.safety || 80) - (a.safety || 80));
        break;
      case 'safety-low':
        result.sort((a, b) => (a.safety || 80) - (b.safety || 80));
        break;
      case 'pop-high':
        result.sort((a, b) => parsePopulation(b.population) - parsePopulation(a.population));
        break;
      case 'pop-low':
        result.sort((a, b) => parsePopulation(a.population) - parsePopulation(b.population));
        break;
    }

    return result;
  }, [allProvinces, searchQuery, selectedRegions, sortBy]);

  // Toggle region filter
  const toggleRegion = (regionId: string) => {
    setSelectedRegions(prev => 
      prev.includes(regionId) 
        ? prev.filter(r => r !== regionId)
        : [...prev, regionId]
    );
  };

  // Toggle compare
  const toggleCompare = (province: Province & { regionId: string }) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === province.id);
      if (exists) {
        return prev.filter(p => p.id !== province.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), province];
      }
      return [...prev, province];
    });
  };

  const isInCompare = (id: string) => compareList.some(p => p.id === id);

  const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
    { value: 'name', label: 'ชื่อ A-Z', icon: <ArrowUpDown size={14} /> },
    { value: 'cost-low', label: 'ค่าครองชีพ ต่ำ→สูง', icon: <TrendingUp size={14} /> },
    { value: 'cost-high', label: 'ค่าครองชีพ สูง→ต่ำ', icon: <TrendingDown size={14} /> },
    { value: 'safety-high', label: 'ปลอดภัยมาก→น้อย', icon: <Shield size={14} /> },
    { value: 'safety-low', label: 'ปลอดภัยน้อย→มาก', icon: <Shield size={14} /> },
    { value: 'pop-high', label: 'ประชากรมาก→น้อย', icon: <Users size={14} /> },
    { value: 'pop-low', label: 'ประชากรน้อย→มาก', icon: <Users size={14} /> },
  ];

  return (
    <div className="h-full flex flex-col bg-[#020305] overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-8 py-6 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Database size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Geo-Archive</h1>
              <p className="text-sm text-slate-500">Province gallery with smart filters • {filteredProvinces.length} of {allProvinces.length} provinces</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Compare Button */}
            {compareList.length > 0 && (
              <button
                onClick={() => setShowComparePanel(true)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white text-sm font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                <Scale size={16} />
                เปรียบเทียบ ({compareList.length})
              </button>
            )}

            {/* View Mode Toggle */}
            <div className="flex bg-white/5 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                <List size={18} />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-xl transition-all ${showFilters ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-slate-500 hover:text-white'}`}
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      {showFilters && (
        <div className="shrink-0 px-8 py-4 border-b border-white/5 bg-[#0a0c10]/50 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[250px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="ค้นหาจังหวัด..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            {/* Region Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={16} className="text-slate-500" />
              {Object.entries(regionColors).map(([regionId, colors]) => (
                <button
                  key={regionId}
                  onClick={() => toggleRegion(regionId)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    selectedRegions.includes(regionId)
                      ? `${colors.bg} ${colors.text} ${colors.border}`
                      : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                  }`}
                >
                  {regionNames[regionId]}
                </button>
              ))}
              {selectedRegions.length > 0 && (
                <button
                  onClick={() => setSelectedRegions([])}
                  className="px-2 py-1 text-xs text-slate-500 hover:text-white transition-colors"
                >
                  ล้างทั้งหมด
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative ml-auto">
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 hover:bg-white/10 transition-all"
              >
                <ArrowUpDown size={16} />
                {sortOptions.find(o => o.value === sortBy)?.label}
                <ChevronDown size={14} className={`transition-transform ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isFilterDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#0f1115] border border-white/10 rounded-xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => { setSortBy(option.value); setIsFilterDropdownOpen(false); }}
                      className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors ${
                        sortBy === option.value ? 'bg-purple-500/20 text-purple-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {option.icon}
                      {option.label}
                      {sortBy === option.value && <Check size={14} className="ml-auto" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Province Grid/List */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {filteredProvinces.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <Search size={48} className="mb-4 opacity-50" />
            <p className="text-lg">ไม่พบจังหวัดที่ตรงกับเงื่อนไข</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedRegions([]); }}
              className="mt-4 px-4 py-2 bg-white/5 rounded-xl text-sm hover:bg-white/10 transition-colors"
            >
              ล้างตัวกรอง
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {filteredProvinces.map((province) => {
              const colors = regionColors[province.regionId] || regionColors.central;
              const inCompare = isInCompare(province.id);
              
              return (
                <div
                  key={province.id}
                  className={`group relative bg-[#0f1115] border rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer ${
                    inCompare ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={province.image}
                      alt={province.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent" />
                    
                    {/* Region Tag */}
                    <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-[10px] font-bold ${colors.bg} ${colors.text} backdrop-blur-sm`}>
                      {regionNames[province.regionId]}
                    </div>

                    {/* Compare Toggle */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleCompare(province); }}
                      className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        inCompare 
                          ? 'bg-cyan-500 text-white' 
                          : 'bg-black/50 text-white/50 hover:bg-cyan-500/50 hover:text-white backdrop-blur-sm'
                      }`}
                    >
                      <Scale size={14} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="font-bold text-white text-sm mb-2 truncate">{province.name}</h3>
                    
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Wallet size={10} className="text-emerald-400" />
                        <span>{province.dailyCost || '300 ฿'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Shield size={10} className="text-blue-400" />
                        <span>{province.safety || 80}%</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Users size={10} className="text-yellow-400" />
                        <span>{province.population || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Maximize size={10} className="text-orange-400" />
                        <span>{province.area || 'N/A'} km²</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // List View
          <div className="space-y-2 w-full">
            {filteredProvinces.map((province) => {
              const colors = regionColors[province.regionId] || regionColors.central;
              const inCompare = isInCompare(province.id);
              
              return (
                <div
                  key={province.id}
                  className={`group flex items-center gap-4 p-4 bg-[#0f1115] border rounded-xl transition-all hover:bg-[#12151a] cursor-pointer w-full ${
                    inCompare ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Image */}
                  <img
                    src={province.image}
                    alt={province.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white text-lg truncate">{province.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${colors.bg} ${colors.text}`}>
                        {regionNames[province.regionId]}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 mt-2 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {province.dist} อำเภอ</span>
                      <span className="flex items-center gap-1.5"><Users size={14} className="text-yellow-400" /> {province.population || 'N/A'}</span>
                      <span className="flex items-center gap-1.5"><Maximize size={14} className="text-orange-400" /> {province.area || 'N/A'} km²</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-8 text-sm flex-shrink-0">
                    <div className="text-center min-w-[80px]">
                      <div className="text-emerald-400 font-bold text-lg">{province.dailyCost || '300 ฿'}</div>
                      <div className="text-[11px] text-slate-500">ค่าครองชีพ</div>
                    </div>
                    <div className="text-center min-w-[80px]">
                      <div className="text-blue-400 font-bold text-lg">{province.safety || 80}%</div>
                      <div className="text-[11px] text-slate-500">ความปลอดภัย</div>
                    </div>
                  </div>

                  {/* Compare Toggle */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCompare(province); }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                      inCompare 
                        ? 'bg-cyan-500 text-white' 
                        : 'bg-white/5 text-slate-500 hover:bg-cyan-500/20 hover:text-cyan-400'
                    }`}
                  >
                    <Scale size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Compare Panel Overlay */}
      {showComparePanel && compareList.length > 0 && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center animate-in fade-in duration-200" onClick={() => setShowComparePanel(false)}>
          <div 
            className="bg-[#0a0c10] border border-white/10 rounded-3xl p-8 max-w-5xl w-full mx-8 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Scale size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">เปรียบเทียบจังหวัด</h2>
              </div>
              <button
                onClick={() => setShowComparePanel(false)}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Compare Grid */}
            <div className={`grid gap-6 ${compareList.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {compareList.map((province) => {
                const colors = regionColors[(province as any).regionId] || regionColors.central;
                
                return (
                  <div key={province.id} className="bg-[#0f1115] border border-white/10 rounded-2xl overflow-hidden">
                    {/* Image */}
                    <div className="relative h-40">
                      <img src={province.image} alt={province.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent" />
                      <button
                        onClick={() => toggleCompare(province as Province & { regionId: string })}
                        className="absolute top-3 right-3 w-8 h-8 bg-red-500/80 rounded-lg flex items-center justify-center text-white hover:bg-red-500 transition-all"
                      >
                        <X size={16} />
                      </button>
                      <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-lg text-xs font-bold ${colors.bg} ${colors.text}`}>
                        {regionNames[(province as any).regionId]}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-4">{province.name}</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-slate-400 text-sm flex items-center gap-2"><Wallet size={14} className="text-emerald-400" /> ค่าครองชีพ</span>
                          <span className="text-white font-bold">{province.dailyCost || '300 ฿'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-slate-400 text-sm flex items-center gap-2"><Shield size={14} className="text-blue-400" /> ความปลอดภัย</span>
                          <span className="text-white font-bold">{province.safety || 80}%</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-slate-400 text-sm flex items-center gap-2"><Users size={14} className="text-yellow-400" /> ประชากร</span>
                          <span className="text-white font-bold">{province.population || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-slate-400 text-sm flex items-center gap-2"><Maximize size={14} className="text-orange-400" /> พื้นที่</span>
                          <span className="text-white font-bold">{province.area || 'N/A'} km²</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-slate-400 text-sm flex items-center gap-2"><MapPin size={14} className="text-purple-400" /> อำเภอ</span>
                          <span className="text-white font-bold">{province.dist}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-slate-400 text-sm flex items-center gap-2"><Grid size={14} className="text-pink-400" /> ตำบล</span>
                          <span className="text-white font-bold">{province.tam}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Summary Placeholder */}
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Sparkles size={16} />
                <span className="text-sm font-bold">AI Summary</span>
              </div>
              <p className="text-slate-400 text-sm">
                Coming soon: AI จะวิเคราะห์และสรุปความแตกต่างของจังหวัดที่เลือกเปรียบเทียบให้อัตโนมัติ
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Compare Bar */}
      {compareList.length > 0 && !showComparePanel && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0f1115] border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-4 shadow-2xl animate-in slide-in-from-bottom-4 duration-300 z-50">
          <div className="flex items-center gap-2">
            {compareList.map((p) => (
              <div key={p.id} className="relative group">
                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border-2 border-cyan-500" />
                <button
                  onClick={() => toggleCompare(p as Province & { regionId: string })}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={10} className="text-white" />
                </button>
              </div>
            ))}
          </div>
          <div className="text-sm text-slate-400">
            {compareList.length}/3 จังหวัด
          </div>
          <button
            onClick={() => setShowComparePanel(true)}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white text-sm font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
          >
            เปรียบเทียบ
          </button>
          <button
            onClick={() => setCompareList([])}
            className="p-2 text-slate-500 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
