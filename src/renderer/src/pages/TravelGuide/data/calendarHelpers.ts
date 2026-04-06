export interface TravelCondition {
  date: string;
  isHoliday: boolean;
  holidayName?: string;
  isRaining: boolean;
  trafficRisk: 'low' | 'medium' | 'high';
  suggestedTransports: string[]; // e.g., 'BTS', 'BEM'
  advice: string;
}

export function getTravelConditionForDate(dateStr: string, region: string): TravelCondition {
  // Mock logic: 
  // - Weekends/Holidays = high traffic, suggest Rail
  // - Weekdays = high traffic morning/evening, suggest Rail
  // - Just some random rain logic based on date
  
  const d = new Date(dateStr);
  const day = d.getDay(); // 0 = Sun, 6 = Sat
  const isWeekend = day === 0 || day === 6;
  
  // Fake holiday data for 2026 (Songkran etc)
  let isHoliday = isWeekend;
  let holidayName = isWeekend ? 'วันหยุดสุดสัปดาห์' : undefined;
  
  const m = d.getMonth() + 1;
  const dt = d.getDate();
  if (m === 4 && dt >= 13 && dt <= 15) {
    isHoliday = true;
    holidayName = 'วันสงกรานต์';
  } else if (m === 1 && dt === 1) {
    isHoliday = true;
    holidayName = 'ปีใหม่';
  }

  // Fake rain (e.g., if date is even number in rainy season)
  let isRaining = false;
  if (m >= 6 && m <= 10) {
    isRaining = dt % 3 === 0; // 33% chance of rain in rainy season
  }

  let trafficRisk: 'low' | 'medium' | 'high' = 'medium';
  if (isHoliday && region === 'central') trafficRisk = 'low'; // BKK empty on long holidays
  if (isHoliday && region !== 'central') trafficRisk = 'high'; // Other provinces packed
  if (!isHoliday && region === 'central') trafficRisk = 'high'; // BKK normal days = bad traffic
  if (isRaining) trafficRisk = 'high';

  let advice = '';
  const suggestedTransports: string[] = [];
  
  if (region === 'central') {
    if (trafficRisk === 'high') {
      advice = 'จราจรติดขัด แนะนำเดินทางด้วยรถไฟฟ้า หรือเรือ';
      suggestedTransports.push('BTS', 'BEM', 'ARL', 'เรือด่วน', 'แสนแสบ');
    } else {
      advice = 'การจราจรค่อนข้างคล่องตัว สามารถเรียกรถหรือนั่งรถเมล์ได้สะดวก';
      suggestedTransports.push('Grab', 'Bolt', 'ขสมก.');
    }
  } else {
    if (isRaining) {
      advice = 'ระวังฝนตกระหว่างเดินทาง ควรใช้รถส่วนตัว รถเช่า หรือรถตู้';
      suggestedTransports.push('รถเช่า', 'รถตู้');
    } else {
      advice = 'อากาศดี เหมาะแก่การเดินทางทุกรูปแบบ';
      suggestedTransports.push('รถทัวร์', 'รถตู้');
    }
  }

  if (isHoliday && holidayName) {
    advice = `ตรงกับเทศกาล/วันหยุด (${holidayName}) - ${advice}`;
  }

  return {
    date: dateStr,
    isHoliday,
    holidayName,
    isRaining,
    trafficRisk,
    suggestedTransports,
    advice
  };
}
