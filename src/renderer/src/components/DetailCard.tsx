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
    ${bgClass ?? ''} ${className ?? ''} flex min-h-[74px] cursor-pointer flex-col justify-between rounded-xl border p-2.5 shadow-sm transition-all duration-300 group hover:-translate-y-0.5
  `} style={style}>
     <div className="mb-1.5 flex items-center gap-2">
        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border bg-black/20 ${textClass ?? ''} ${iconClassName ?? ''} group-hover:scale-105 transition-transform`} style={iconStyle}>
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
