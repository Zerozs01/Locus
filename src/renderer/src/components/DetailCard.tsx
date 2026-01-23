import React from 'react';

export interface DetailCardProps {
  icon: React.ReactElement;
  label: string;
  value: string;
  sub: string;
  bgClass?: string;
  textClass?: string;
}

export const DetailCard = ({ icon, label, value, sub, bgClass, textClass }: DetailCardProps) => (
  <div className={`
    ${bgClass} border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-all group cursor-pointer flex flex-col justify-between shadow-sm hover:-translate-y-1 min-h-[80px]
  `}>
     <div className="flex justify-between items-start mb-1">
        <div className={`p-1.5 rounded-lg bg-black/20 ${textClass} group-hover:scale-110 transition-transform`}>
           {React.cloneElement(icon, { size: 14 })}
        </div>
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider text-right">{label}</span>
     </div>
     <div>
        <div className="text-sm font-black text-white leading-tight">{value}</div>
        <div className="text-[8px] text-slate-300 mt-0.5 truncate opacity-80">{sub}</div>
     </div>
  </div>
);
