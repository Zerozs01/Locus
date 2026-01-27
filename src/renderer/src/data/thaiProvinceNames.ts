/**
 * Thai Province Names Mapping
 * English name -> Thai name
 */
export const thaiProvinceNames: Record<string, string> = {
  // ภาคเหนือ (North)
  'Chiang Mai': 'เชียงใหม่',
  'Chiang Rai': 'เชียงราย',
  'Nan': 'น่าน',
  'Phrae': 'แพร่',
  'Mae Hong Son': 'แม่ฮ่องสอน',
  'Lamphun': 'ลำพูน',
  'Lampang': 'ลำปาง',
  'Phayao': 'พะเยา',
  'Uttaradit': 'อุตรดิตถ์',

  // ภาคอีสาน (Northeast)
  'Khon Kaen': 'ขอนแก่น',
  'Nakhon Ratchasima': 'นครราชสีมา',
  'Ubon Ratchathani': 'อุบลราชธานี',
  'Udon Thani': 'อุดรธานี',
  'Buri Ram': 'บุรีรัมย์',
  'Surin': 'สุรินทร์',
  'Si Sa Ket': 'ศรีสะเกษ',
  'Roi Et': 'ร้อยเอ็ด',
  'Kalasin': 'กาฬสินธุ์',
  'Maha Sarakham': 'มหาสารคาม',
  'Nakhon Phanom': 'นครพนม',
  'Sakon Nakhon': 'สกลนคร',
  'Mukdahan': 'มุกดาหาร',
  'Yasothon': 'ยโสธร',
  'Amnat Charoen': 'อำนาจเจริญ',
  'Nong Khai': 'หนองคาย',
  'Loei': 'เลย',
  'Nong Bua Lam Phu': 'หนองบัวลำภู',
  'Bueng Kan': 'บึงกาฬ',
  'Chaiyaphum': 'ชัยภูมิ',

  // ภาคกลาง (Central)
  'Bangkok Metropolis': 'กรุงเทพมหานคร',
  'Nonthaburi': 'นนทบุรี',
  'Samut Prakan': 'สมุทรปราการ',
  'Pathum Thani': 'ปทุมธานี',
  'Nakhon Pathom': 'นครปฐม',
  'Samut Sakhon': 'สมุทรสาคร',
  'Phra Nakhon Si Ayutthaya': 'พระนครศรีอยุธยา',
  'Ang Thong': 'อ่างทอง',
  'Lop Buri': 'ลพบุรี',
  'Sing Buri': 'สิงห์บุรี',
  'Chai Nat': 'ชัยนาท',
  'Saraburi': 'สระบุรี',
  'Suphan Buri': 'สุพรรณบุรี',
  'Nakhon Nayok': 'นครนายก',
  'Prachin Buri': 'ปราจีนบุรี',
  'Sa Kaeo': 'สระแก้ว',
  'Kamphaeng Phet': 'กำแพงเพชร',
  'Phichit': 'พิจิตร',
  'Phitsanulok': 'พิษณุโลก',
  'Sukhothai': 'สุโขทัย',
  'Tak': 'ตาก',
  'Nakhon Sawan': 'นครสวรรค์',
  'Uthai Thani': 'อุทัยธานี',
  'Phetchabun': 'เพชรบูรณ์',

  // ภาคตะวันตก (West)
  'Kanchanaburi': 'กาญจนบุรี',
  'Ratchaburi': 'ราชบุรี',
  'Phetchaburi': 'เพชรบุรี',
  'Prachuap Khiri Khan': 'ประจวบคีรีขันธ์',
  'Samut Songkhram': 'สมุทรสงคราม',

  // ภาคตะวันออก (East)
  'Chon Buri': 'ชลบุรี',
  'Rayong': 'ระยอง',
  'Chanthaburi': 'จันทบุรี',
  'Trat': 'ตราด',
  'Chachoengsao': 'ฉะเชิงเทรา',

  // ภาคใต้ (South)
  'Phuket': 'ภูเก็ต',
  'Surat Thani': 'สุราษฎร์ธานี',
  'Krabi': 'กระบี่',
  'Nakhon Si Thammarat': 'นครศรีธรรมราช',
  'Songkhla': 'สงขลา',
  'Pattani': 'ปัตตานี',
  'Yala': 'ยะลา',
  'Narathiwat': 'นราธิวาส',
  'Chumphon': 'ชุมพร',
  'Ranong': 'ระนอง',
  'Phang Nga': 'พังงา',
  'Trang': 'ตรัง',
  'Satun': 'สตูล',
  'Phatthalung': 'พัทลุง',
};

/**
 * Get Thai name for a province
 */
export function getThaiProvinceName(englishName: string): string {
  return thaiProvinceNames[englishName] || englishName;
}

/**
 * Search province by query (supports both Thai and English)
 */
export function searchProvince(query: string, provinceName: string): boolean {
  const q = query.toLowerCase();
  const eng = provinceName.toLowerCase();
  const thai = thaiProvinceNames[provinceName] || '';
  
  return eng.includes(q) || thai.includes(q);
}
