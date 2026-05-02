/**
 * Fuel Prices Service
 * Fetches oil prices from Bangchak Corporation via Electron main process (bypasses CSP)
 * and manages local database cache
 */

export interface FuelPriceData {
  fuelType: string;
  price: number;
  source: string;
}

// Mapping from Bangchak API fuel types to our display types
const FUEL_TYPE_MAP: Record<string, string> = {
  'Benzine 95': '95',
  'Benzine 91': '91',
  'E20': 'E20',
  'E85': 'E85',
  'B7 Diesel': 'B7',
  'B20 Diesel': 'B20',
  'Diesel': 'Diesel',
  'Premium Diesel': 'Premium',
  'Benzine 98': '98+',
  // New names from API
  'ดีเซล B20': 'B20',
  'ไฮดีเซล S': 'B7',
  'ไฮ พรีเมียม ดีเซล พลัส': 'Premium',
  'ไฮ พรีเมียม 98 พลัส': '98+',
  'แก๊สโซฮอล์ E85 S EVO': 'E85',
  'แก๊สโซฮอล์ E20 S EVO': 'E20',
  'แก๊สโซฮอล์ 91 S EVO': '91',
  'แก๊สโซฮอล์ 95 S EVO': '95',
  'แก๊สโซฮอล์ 95': '95',
  'แก๊สโซฮอล์ 91': '91',
};

/**
 * Fetch raw HTML from Bangchak website via Electron main process
 * This bypasses the browser's CSP restrictions
 */
async function fetchBangchakHtml(): Promise<string> {
  if (!window.api?.fetchBangchak) {
    throw new Error('window.api.fetchBangchak is not defined');
  }
  const result = await window.api.fetchBangchak();
  if (!result.ok) {
    throw new Error(`Bangchak fetch failed: ${result.error || 'HTTP ' + result.status}`);
  }
  return result.data as string;
}

/**
 * Parse fuel prices from Bangchak HTML
 */
function parseFuelPricesFromHtml(content: string): FuelPriceData[] {
  const prices: FuelPriceData[] = [];
  
  // 1. Try to parse as JSON first (New API response)
  try {
    const data = JSON.parse(content);
    const firstItem = Array.isArray(data) ? data[0] : data;
    
    if (firstItem && firstItem.OilList) {
      const oilList = typeof firstItem.OilList === 'string' 
        ? JSON.parse(firstItem.OilList) 
        : firstItem.OilList;
        
      if (Array.isArray(oilList)) {
        for (const item of oilList) {
          const name = item.OilName || item.name;
          const price = item.PriceTomorrow || item.PriceToday || item.price;
          const displayType = FUEL_TYPE_MAP[name] || name;
          
          if (displayType && price > 0) {
            prices.push({
              fuelType: displayType,
              price: parseFloat(price) || 0,
              source: 'Bangchak'
            });
          }
        }
        if (prices.length > 0) return prices;
      }
    }
  } catch (e) {
    // Not JSON or failed to parse, fall back to HTML regex
    console.log('[FuelPrices] Content is not JSON or failed parsing, falling back to regex');
  }

  // 2. Try to find JSON data embedded in the page (Legacy pattern)
  const jsonMatch = content.match(/window\.appData\s*=\s*({.+?});/s);
  if (jsonMatch) {
    try {
      const appData = JSON.parse(jsonMatch[1]);
      if (appData.prices && Array.isArray(appData.prices)) {
        for (const item of appData.prices) {
          const displayType = FUEL_TYPE_MAP[item.name] || item.name;
          prices.push({
            fuelType: displayType,
            price: parseFloat(item.price) || 0,
            source: 'Bangchak'
          });
        }
        return prices;
      }
    } catch (e) {
      console.warn('[FuelPrices] Failed to parse appData JSON:', e);
    }
  }

  // 3. Try to find price data in script tags
  const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
  if (scriptMatch) {
    for (const script of scriptMatch) {
      // Look for fuel price JSON patterns
      const patterns = [
        /"(Benzine \d+|E\d+|B\d+ Diesel|Diesel|Premium[^"]*)"\s*:\s*([\d.]+)/gi,
        /"(\w+)"\s*,\s*"price"\s*:\s*([\d.]+)/gi,
      ];
      for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(script)) !== null) {
          const name = match[1];
          const price = parseFloat(match[2]);
          const displayType = FUEL_TYPE_MAP[name] || name;
          if (displayType && price > 0) {
            prices.push({
              fuelType: displayType,
              price,
              source: 'Bangchak'
            });
          }
        }
      }
    }
  }

  // 4. If still no prices, try regex patterns for common price displays
  if (prices.length === 0) {
    const fuelTypeNames = ['Benzine 95', 'Benzine 91', 'E20', 'E85', 'B7', 'B20', 'Diesel', 'Premium', 'Benzine 98'];
    for (const fuelName of fuelTypeNames) {
      // Look for price near fuel name
      const pattern = new RegExp(`${fuelName}[^\\d]*([\\d.]+)`, 'i');
      const match = content.match(pattern);
      if (match && match[1]) {
        const displayType = FUEL_TYPE_MAP[fuelName] || fuelName;
        prices.push({
          fuelType: displayType,
          price: parseFloat(match[1]),
          source: 'Bangchak'
        });
      }
    }
  }

  return prices;
}

/**
 * Fetch and parse fuel prices from Bangchak
 */
export async function fetchBangchakFuelPrices(): Promise<FuelPriceData[]> {
  const html = await fetchBangchakHtml();
  return parseFuelPricesFromHtml(html);
}

/**
 * Refresh fuel prices - fetches from Bangchak and saves to DB
 */
export async function refreshFuelPrices(): Promise<FuelPriceData[]> {
  let prices: FuelPriceData[] = [];
  
  try {
    prices = await fetchBangchakFuelPrices();
  } catch (err) {
    console.error('[FuelPrices] Bangchak fetch failed:', err);
    // Fallback: try n8n
    try {
      prices = await fetchFuelPricesViaN8n();
    } catch (n8nErr) {
      console.warn('[FuelPrices] n8n fallback also failed:', n8nErr);
    }
  }
  
  // Save to database if we got prices
  if (prices.length > 0 && window.api?.fuelPrices) {
    await window.api.fuelPrices.save(prices);
  }
  
  return prices;
}

/**
 * Fetch fuel prices via n8n webhook agent (fallback method)
 */
export async function fetchFuelPricesViaN8n(): Promise<FuelPriceData[]> {
  try {
    const response = await window.api.n8n.chat({
      message: 'Get current Bangchak fuel prices in Thailand. Return JSON array with fields: fuelType (like "95", "91", "E20", "E85", "B7", "B20", "Diesel", "Premium", "98+"), price (number in THB per liter), source ("Bangchak"). Format: [{"fuelType":"95","price":42.45,"source":"Bangchak"},...]'
    });

    if (response.ok && response.data) {
      const dataStr = typeof response.data === 'string' 
        ? response.data 
        : JSON.stringify(response.data);
      
      const jsonMatch = dataStr.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(p => ({
            fuelType: p.fuelType || p.type || p.name || '',
            price: parseFloat(p.price) || 0,
            source: p.source || 'Bangchak'
          })).filter(p => p.fuelType && p.price > 0);
        }
      }
    }
  } catch (err) {
    console.warn('[FuelPrices] n8n fetch failed:', err);
  }
  return [];
}

export async function getFuelPricesWithRefresh(): Promise<FuelPriceData[]> {
  // If DB API not available, try direct fetch
  if (!window.api?.fuelPrices) {
    console.warn('[FuelPrices] window.api.fuelPrices is not defined. Using direct fetch.');
    try {
      return await fetchBangchakFuelPrices();
    } catch {
      // Fallback to n8n
      return await fetchFuelPricesViaN8n();
    }
  }

  try {
    // Check if cached data is valid (less than 6 hours old)
    const isValid = await window.api.fuelPrices.isValid(6);
    
    if (isValid) {
      const cached = await window.api.fuelPrices.get();
      return cached.map(p => ({
        fuelType: p.fuelType,
        price: p.price,
        source: p.source
      }));
    }

    // Fetch fresh data
    const prices = await refreshFuelPrices();
    if (prices.length > 0) {
      return prices;
    }
    
    // If fetch returned nothing, try stale cache
    const staleCache = await window.api.fuelPrices.get();
    if (staleCache.length > 0) {
      console.warn('[FuelPrices] Returning stale cache (fetch returned empty)');
      return staleCache.map(p => ({
        fuelType: p.fuelType,
        price: p.price,
        source: p.source
      }));
    }
    
    return [];
  } catch (error) {
    // On error, try to return cached data even if stale
    try {
      const cached = await window.api.fuelPrices.get();
      if (cached.length > 0) {
        console.warn('[FuelPrices] Returning stale cache due to error:', error);
        return cached.map(p => ({
          fuelType: p.fuelType,
          price: p.price,
          source: p.source
        }));
      }
    } catch (cacheError) {
      console.warn('[FuelPrices] Stale cache also failed:', cacheError);
    }
    return [];
  }
}
