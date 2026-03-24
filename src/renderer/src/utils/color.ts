const clampByte = (value: number) => Math.max(0, Math.min(255, Math.round(value)));
const clampUnit = (value: number) => Math.max(0, Math.min(1, value));

const normalizeHex = (hex: string) => {
  const raw = hex.replace('#', '').trim();
  if (raw.length === 3) {
    return raw
      .split('')
      .map((char) => `${char}${char}`)
      .join('');
  }

  return raw.slice(0, 6);
};

export const hexToRgb = (hex: string) => {
  const normalized = normalizeHex(hex);
  const value = Number.parseInt(normalized, 16);

  if (Number.isNaN(value)) {
    return { r: 255, g: 255, b: 255 };
  }

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
};

const toHex = (value: number) => clampByte(value).toString(16).padStart(2, '0');

export const mixHex = (source: string, target: string, weight: number) => {
  const ratio = clampUnit(weight);
  const start = hexToRgb(source);
  const end = hexToRgb(target);

  return `#${toHex(start.r + (end.r - start.r) * ratio)}${toHex(start.g + (end.g - start.g) * ratio)}${toHex(start.b + (end.b - start.b) * ratio)}`;
};

export const toRgba = (hex: string, alpha: number) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${clampUnit(alpha)})`;
};
