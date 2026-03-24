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
  subStyle
}: DetailCardProps) => (
  <div className={`
    ${bgClass ?? ''} ${className ?? ''} flex min-h-[80px] cursor-pointer flex-col justify-between rounded-xl border p-3 shadow-sm transition-all duration-300 group hover:-translate-y-0.5
  `} style={style}>
     <div className="mb-2 flex items-start justify-between gap-3">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-black/20 ${textClass ?? ''} ${iconClassName ?? ''} group-hover:scale-105 transition-transform`} style={iconStyle}>
           {React.cloneElement(icon, { size: 13 })}
        </div>
        <span className={`text-[8px] font-semibold uppercase tracking-[0.24em] text-right text-white/55 ${labelClassName ?? ''}`} style={labelStyle}>{label}</span>
     </div>
     <div>
        <div className={`text-sm font-black leading-tight ${valueClassName ?? ''}`} style={valueStyle}>{value}</div>
        <div className={`mt-0.5 text-[8px] truncate opacity-80 ${subClassName ?? ''}`} style={subStyle}>{sub}</div>
     </div>
  </div>
);
