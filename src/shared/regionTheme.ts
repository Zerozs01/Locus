export type RegionId = 'north' | 'northeast' | 'central' | 'west' | 'east' | 'south';

export const regionTheme = {
  north: {
    label: 'ภาคเหนือ',
    engLabel: 'Northern',
    text: 'text-rose-400',
    textHover: 'group-hover:text-rose-400',
    bg: 'bg-rose-500/20',
    border: 'border-rose-500/30',
    hoverBorder: 'hover:border-rose-500/50',
    hoverGlow: 'hover:shadow-rose-500/20',
    chatBg: 'bg-rose-600/20',
    chatHover: 'hover:bg-rose-600/30',
    chatBorder: 'border-rose-500/30',
    chatText: 'text-rose-300',
    gradient: 'bg-gradient-to-br from-rose-600/20 to-rose-900/10',
    heroGradient: 'from-rose-500 to-orange-600',
    mapActive: '#f43f5e',
    mapDimmed: '#7f1d1d'
  },
  northeast: {
    label: 'ภาคอีสาน',
    engLabel: 'Northeastern',
    text: 'text-pink-400',
    textHover: 'group-hover:text-pink-400',
    bg: 'bg-pink-500/20',
    border: 'border-pink-500/30',
    hoverBorder: 'hover:border-pink-400/50',
    hoverGlow: 'hover:shadow-pink-400/20',
    chatBg: 'bg-pink-600/20',
    chatHover: 'hover:bg-pink-600/30',
    chatBorder: 'border-pink-500/30',
    chatText: 'text-pink-300',
    gradient: 'bg-gradient-to-br from-pink-600/20 to-pink-900/10',
    heroGradient: 'from-pink-500 to-purple-600',
    mapActive: '#fbcfe8',
    mapDimmed: '#831843'
  },
  central: {
    label: 'ภาคกลาง',
    engLabel: 'Central',
    text: 'text-cyan-400',
    textHover: 'group-hover:text-cyan-400',
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500/30',
    hoverBorder: 'hover:border-cyan-400/50',
    hoverGlow: 'hover:shadow-cyan-400/20',
    chatBg: 'bg-cyan-600/20',
    chatHover: 'hover:bg-cyan-600/30',
    chatBorder: 'border-cyan-500/30',
    chatText: 'text-cyan-300',
    gradient: 'bg-gradient-to-br from-cyan-600/20 to-cyan-900/10',
    heroGradient: 'from-cyan-500 to-blue-600',
    mapActive: '#06b6d4',
    mapDimmed: '#164e63'
  },
  west: {
    label: 'ภาคตะวันตก',
    engLabel: 'Western',
    text: 'text-purple-400',
    textHover: 'group-hover:text-purple-400',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/30',
    hoverBorder: 'hover:border-purple-400/50',
    hoverGlow: 'hover:shadow-purple-400/20',
    chatBg: 'bg-purple-600/20',
    chatHover: 'hover:bg-purple-600/30',
    chatBorder: 'border-purple-500/30',
    chatText: 'text-purple-300',
    gradient: 'bg-gradient-to-br from-purple-600/20 to-purple-900/10',
    heroGradient: 'from-purple-500 to-indigo-600',
    mapActive: '#a855f7',
    mapDimmed: '#581c87'
  },
  east: {
    label: 'ภาคตะวันออก',
    engLabel: 'Eastern',
    text: 'text-green-400',
    textHover: 'group-hover:text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
    hoverBorder: 'hover:border-green-400/50',
    hoverGlow: 'hover:shadow-green-400/20',
    chatBg: 'bg-green-600/20',
    chatHover: 'hover:bg-green-600/30',
    chatBorder: 'border-green-500/30',
    chatText: 'text-green-300',
    gradient: 'bg-gradient-to-br from-green-600/20 to-green-900/10',
    heroGradient: 'from-green-500 to-teal-600',
    mapActive: '#22c55e',
    mapDimmed: '#14532d'
  },
  south: {
    label: 'ภาคใต้',
    engLabel: 'Southern',
    text: 'text-orange-400',
    textHover: 'group-hover:text-orange-400',
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30',
    hoverBorder: 'hover:border-orange-400/50',
    hoverGlow: 'hover:shadow-orange-400/20',
    chatBg: 'bg-orange-600/20',
    chatHover: 'hover:bg-orange-600/30',
    chatBorder: 'border-orange-500/30',
    chatText: 'text-orange-300',
    gradient: 'bg-gradient-to-br from-orange-600/20 to-orange-900/10',
    heroGradient: 'from-orange-500 to-red-600',
    mapActive: '#f97316',
    mapDimmed: '#7c2d12'
  }
} as const;

export const mapBaseColors: { default: string; hover: string } = {
  default: '#475569',
  hover: '#64748b'
};

export const regionIds = Object.keys(regionTheme) as RegionId[];
