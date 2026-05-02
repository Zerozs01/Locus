import React, { type CSSProperties } from 'react';

export interface DetailCardProps {
  icon: React.ReactElement;
  label: string;
  value: string;
  sub: string;
  bgClass?: string;
  textClass?: string;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
  subClassName?: string;
  style?: CSSProperties;
  iconStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  valueStyle?: CSSProperties;
  subStyle?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const DetailCard = ({
  icon,
  label,
  value,
  sub,
  bgClass,
  textClass,
  className,
  iconClassName,
  labelClassName,
  valueClassName,
  subClassName,
  style,
  iconStyle,
  labelStyle,
  valueStyle,
  subStyle,
  onClick
}: DetailCardProps) => (
  <div onClick={onClick} className={`
    ${bgClass ?? ''} ${className ?? ''} flex min-h-[74px] flex-col justify-between rounded-xl border p-2.5 shadow-sm transition-all duration-300 group
    ${onClick ? 'cursor-pointer hover:-translate-y-1 hover:bg-cyan-500/10 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden' : 'hover:-translate-y-0.5 cursor-default'}
  `} style={style}>
     {onClick && <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
     <div className="mb-1.5 flex items-center gap-2">
        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border bg-black/20 ${textClass ?? ''} ${iconClassName ?? ''} transition-all duration-300 group-hover:scale-110 ${onClick ? 'group-hover:text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]' : ''}`} style={iconStyle}>
           {React.cloneElement(icon, { size: 12 })}
        </div>
        <span className={`flex-1 text-[10.5px] font-bold uppercase tracking-wider text-left text-white/60 leading-tight ${labelClassName ?? ''}`} style={labelStyle}>{label}</span>
     </div>
     <div>
        <div className={`${valueClassName || 'text-[0.95rem]'} font-black leading-tight`} style={valueStyle}>{value}</div>
        <div className={`mt-0.5 text-[8px] truncate opacity-80 leading-none ${subClassName ?? ''}`} style={subStyle}>{sub}</div>
     </div>
  </div>
);
