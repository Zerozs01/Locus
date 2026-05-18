export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  nameEn: string;
  type: 'public' | 'religious' | 'chinese' | 'other';
  isHoliday: boolean;
}

export const HOLIDAYS: Holiday[] = [
  // 2026 Thai Public Holidays
  { date: '2026-01-01', name: 'วันขึ้นปีใหม่', nameEn: "New Year's Day", type: 'public', isHoliday: true },
  { date: '2026-03-03', name: 'วันมาฆบูชา', nameEn: 'Makha Bucha Day', type: 'religious', isHoliday: true },
  { date: '2026-04-06', name: 'วันจักรี', nameEn: 'Chakri Memorial Day', type: 'public', isHoliday: true },
  { date: '2026-04-13', name: 'วันสงกรานต์', nameEn: 'Songkran Festival', type: 'public', isHoliday: true },
  { date: '2026-04-14', name: 'วันสงกรานต์', nameEn: 'Songkran Festival', type: 'public', isHoliday: true },
  { date: '2026-04-15', name: 'วันสงกรานต์', nameEn: 'Songkran Festival', type: 'public', isHoliday: true },
  { date: '2026-05-01', name: 'วันแรงงานแห่งชาติ', nameEn: 'Labour Day', type: 'public', isHoliday: true },
  { date: '2026-05-04', name: 'วันฉัตรมงคล', nameEn: 'Coronation Day', type: 'public', isHoliday: true },
  { date: '2026-05-31', name: 'วันวิสาขบูชา', nameEn: 'Visakha Bucha Day', type: 'religious', isHoliday: true },
  { date: '2026-06-01', name: 'วันหยุดชดเชยวันวิสาขบูชา', nameEn: 'Visakha Bucha Day (Observed)', type: 'public', isHoliday: true },
  { date: '2026-06-03', name: 'วันเฉลิมพระชนมพรรษาพระราชินี', nameEn: "HM Queen Suthida's Birthday", type: 'public', isHoliday: true },
  { date: '2026-07-28', name: 'วันเฉลิมพระชนมพรรษาพระเจ้าอยู่หัว', nameEn: "HM King Maha Vajiralongkorn's Birthday", type: 'public', isHoliday: true },
  { date: '2026-07-29', name: 'วันอาสาฬหบูชา', nameEn: 'Asarnha Bucha Day', type: 'religious', isHoliday: true },
  { date: '2026-07-30', name: 'วันเข้าพรรษา', nameEn: 'Buddhist Lent Day', type: 'religious', isHoliday: true },
  { date: '2026-08-12', name: 'วันแม่แห่งชาติ', nameEn: "Mother's Day", type: 'public', isHoliday: true },
  { date: '2026-10-13', name: 'วันคล้ายวันสวรรคต ร.9', nameEn: 'HM King Bhumibol Memorial Day', type: 'public', isHoliday: true },
  { date: '2026-10-23', name: 'วันปิยมหาราช', nameEn: 'King Chulalongkorn Day', type: 'public', isHoliday: true },
  { date: '2026-12-05', name: 'วันพ่อแห่งชาติ', nameEn: "Father's Day", type: 'public', isHoliday: true },
  { date: '2026-12-10', name: 'วันรัฐธรรมนูญ', nameEn: 'Constitution Day', type: 'public', isHoliday: true },
  { date: '2026-12-31', name: 'วันสิ้นปี', nameEn: "New Year's Eve", type: 'public', isHoliday: true },

  // 2026 Chinese Festivals
  { date: '2026-02-17', name: 'วันตรุษจีน', nameEn: 'Chinese New Year', type: 'chinese', isHoliday: false },
  { date: '2026-03-03', name: 'วันไหว้พระจันทร์เสี้ยว (เทศกาลโคมไฟ)', nameEn: 'Lantern Festival', type: 'chinese', isHoliday: false },
  { date: '2026-04-05', name: 'วันเช็งเม้ง', nameEn: 'Qingming Festival', type: 'chinese', isHoliday: false },
  { date: '2026-06-19', name: 'เทศกาลไหว้บ๊ะจ่าง', nameEn: 'Dragon Boat Festival', type: 'chinese', isHoliday: false },
  { date: '2026-09-25', name: 'เทศกาลไหว้พระจันทร์', nameEn: 'Mid-Autumn Festival', type: 'chinese', isHoliday: false },

  // 2027 Thai Public Holidays
  { date: '2027-01-01', name: 'วันขึ้นปีใหม่', nameEn: "New Year's Day", type: 'public', isHoliday: true },
  { date: '2027-02-21', name: 'วันมาฆบูชา', nameEn: 'Makha Bucha Day', type: 'religious', isHoliday: true },
  { date: '2027-04-06', name: 'วันจักรี', nameEn: 'Chakri Memorial Day', type: 'public', isHoliday: true },
  { date: '2027-04-13', name: 'วันสงกรานต์', nameEn: 'Songkran Festival', type: 'public', isHoliday: true },
  { date: '2027-04-14', name: 'วันสงกรานต์', nameEn: 'Songkran Festival', type: 'public', isHoliday: true },
  { date: '2027-04-15', name: 'วันสงกรานต์', nameEn: 'Songkran Festival', type: 'public', isHoliday: true },
  { date: '2027-05-01', name: 'วันแรงงานแห่งชาติ', nameEn: 'Labour Day', type: 'public', isHoliday: true },
  { date: '2027-05-04', name: 'วันฉัตรมงคล', nameEn: 'Coronation Day', type: 'public', isHoliday: true },
  { date: '2027-05-20', name: 'วันวิสาขบูชา', nameEn: 'Visakha Bucha Day', type: 'religious', isHoliday: true },
  { date: '2027-06-03', name: 'วันเฉลิมพระชนมพรรษาพระราชินี', nameEn: "HM Queen Suthida's Birthday", type: 'public', isHoliday: true },
  { date: '2027-07-19', name: 'วันอาสาฬหบูชา', nameEn: 'Asarnha Bucha Day', type: 'religious', isHoliday: true },
  { date: '2027-07-28', name: 'วันเฉลิมพระชนมพรรษาพระเจ้าอยู่หัว', nameEn: "HM King Maha Vajiralongkorn's Birthday", type: 'public', isHoliday: true },
  { date: '2027-08-12', name: 'วันแม่แห่งชาติ', nameEn: "Mother's Day", type: 'public', isHoliday: true },
  { date: '2027-10-13', name: 'วันคล้ายวันสวรรคต ร.9', nameEn: 'HM King Bhumibol Memorial Day', type: 'public', isHoliday: true },
  { date: '2027-10-23', name: 'วันปิยมหาราช', nameEn: 'King Chulalongkorn Day', type: 'public', isHoliday: true },
  { date: '2027-12-05', name: 'วันพ่อแห่งชาติ', nameEn: "Father's Day", type: 'public', isHoliday: true },
  { date: '2027-12-10', name: 'วันรัฐธรรมนูญ', nameEn: 'Constitution Day', type: 'public', isHoliday: true },
  { date: '2027-12-31', name: 'วันสิ้นปี', nameEn: "New Year's Eve", type: 'public', isHoliday: true },

  // 2027 Chinese Festivals
  { date: '2027-02-06', name: 'วันตรุษจีน', nameEn: 'Chinese New Year', type: 'chinese', isHoliday: false },
  { date: '2027-02-20', name: 'วันเทศกาลโคมไฟ', nameEn: 'Lantern Festival', type: 'chinese', isHoliday: false },
  { date: '2027-04-05', name: 'วันเช็งเม้ง', nameEn: 'Qingming Festival', type: 'chinese', isHoliday: false },
  { date: '2027-06-09', name: 'เทศกาลไหว้บ๊ะจ่าง', nameEn: 'Dragon Boat Festival', type: 'chinese', isHoliday: false },
  { date: '2027-09-15', name: 'เทศกาลไหว้พระจันทร์', nameEn: 'Mid-Autumn Festival', type: 'chinese', isHoliday: false },
];
