const isElectronEnv = () => typeof window !== 'undefined' && !!(window as any).electron
const isHttpUrl = (value: string) => /^https?:\/\//i.test(value)
const isSpecialScheme = (value: string) => /^(data:|blob:|file:|locus:)/i.test(value)
const isRelativeAsset = (value: string) => value.startsWith('/') || value.startsWith('./') || value.startsWith('../')

const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0f1115"/>
      <stop offset="1" stop-color="#1a1d24"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <circle cx="400" cy="300" r="90" fill="#111827" stroke="#1f2937" stroke-width="2"/>
  <path d="M360 290h80m-80 30h80" stroke="#334155" stroke-width="8" stroke-linecap="round"/>
</svg>`

const fallbackImage = `data:image/svg+xml;utf8,${encodeURIComponent(fallbackSvg)}`

export const getCachedImageUrl = (url: string) => {
  if (!url) return fallbackImage
  if (isSpecialScheme(url) || isRelativeAsset(url)) return url
  if (!isElectronEnv()) return url
  if (!isHttpUrl(url)) return fallbackImage
  return `locus://image?url=${encodeURIComponent(url)}`
}
