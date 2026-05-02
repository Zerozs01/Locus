import React from 'react';

interface GradientProgressBarProps {
  show: boolean;
  height?: number;
  className?: string;
}

// Rainbow/region gradient progress bar animation
export const GradientProgressBar: React.FC<GradientProgressBarProps> = ({ show, height = 5, className }) => {
  if (!show) return null;
  return (
    <div
      className={`w-full overflow-hidden ${className || ''}`}
      style={{ height }}
    >
      <div
        className="animate-gradient-move h-full w-full rounded-full"
        style={{
          background:
            'linear-gradient(90deg, #06b6d4, #3b82f6, #a855f7, #ec4899, #eab308, #22c55e, #06b6d4)',
          backgroundSize: '200% 200%',
        }}
      />
      <style>{`
        .animate-gradient-move {
          animation: gradient-move 2s linear infinite;
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};
