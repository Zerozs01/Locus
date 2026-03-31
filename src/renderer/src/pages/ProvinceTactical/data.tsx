import { Region, Province } from '../../data/regions';
import { ProvinceData } from './types';
import { Plane, Bus, Train, Car } from 'lucide-react';
import thailandGeo from '../../data/thailand-geo.json';

// Thai names mapping
const thaiProvinceNames: Record<string, string> = {
  'Chiang Mai': 'เชียงใหม่', 'Chiang Rai': 'เชียงราย', 'Nan': 'น่าน', 'Phrae': 'แพร่', 
  'Mae Hong Son': 'แม่ฮ่องสอน', 'Lamphun': 'ลำพูน', 'Lampang': 'ลำปาง',
  'Khon Kaen': 'ขอนแก่น', 'Korat': 'โคราช', 'Ubon': 'อุบลราชธานี', 'Udon Thani': 'อุดรธานี',
  'Bangkok': 'กรุงเทพฯ', 'Bangkok Metropolis': 'กรุงเทพมหานคร',
  'Phuket': 'ภูเก็ต', 'Krabi': 'กระบี่', 'Surat Thani': 'สุราษฎร์ธานี',
  'Chon Buri': 'ชลบุรี', 'Rayong': 'ระยอง', 'Kanchanaburi': 'กาญจนบุรี',
};

const provinceSlogans: Record<string, string> = {
  'Chiang Mai': 'ดอยสุเทพคู่บ้าน ศาสนาพุทธล้านนา',
  'Chiang Rai': 'เหนือสุดแดนสยาม ชายแดนสามแผ่นดิน',
  'Phuket': 'ไข่มุกแห่งอันดามัน',
  'Bangkok': 'กรุงเทพฯ ดุจเทพสร้าง',
  'Khon Kaen': 'พระธาตุขามแก่น เสียงแคนดอกคูน',
};

// Province-specific emergency contacts with real phone numbers
const provinceEmergencyData: Record<string, Array<{ agency: string; phone: string; description?: string }>> = {
  'Chiang Mai': [
    { agency: 'สภ.เมืองเชียงใหม่', phone: '053-276-458', description: 'Mueang Chiang Mai Police Station' },
    { agency: 'ตำรวจท่องเที่ยวเชียงใหม่', phone: '053-248-974', description: 'Tourist Police Division' },
    { agency: 'รพ.มหาราชนครเชียงใหม่', phone: '053-945-555', description: 'Maharaj Nakorn Hospital (24h ER)' },
    { agency: 'หน่วยกู้ชีพเชียงใหม่', phone: '053-112-155', description: 'Emergency Medical Service' },
  ],
  'Chiang Rai': [
    { agency: 'สภ.เมืองเชียงราย', phone: '053-744-571', description: 'Mueang Chiang Rai Police Station' },
    { agency: 'ตำรวจภูธรจังหวัดเชียงราย', phone: '053-711-444', description: 'Provincial Police' },
    { agency: 'รพ.เชียงรายประชานุเคราะห์', phone: '053-711-300', description: 'Chiangrai Prachanukroh Hospital' },
  ],
  'Phuket': [
    { agency: 'ตำรวจภูธรจังหวัดภูเก็ต', phone: '076-212-046', description: 'Phuket Provincial Police' },
    { agency: 'สภ.ถลาง', phone: '076-313-919', description: 'Thalang Police Station' },
    { agency: 'สภ.ป่าตอง', phone: '076-342-716', description: 'Patong Police Station' },
    { agency: 'รพ.วชิระภูเก็ต', phone: '076-361-234', description: 'Vachira Phuket Hospital (24h ER)' },
  ],
  'Bangkok': [
    { agency: 'สายด่วน สตช.', phone: '1599', description: 'Royal Thai Police Hotline' },
    { agency: 'กู้ชีพกรุงเทพฯ', phone: '1554', description: 'Bangkok EMS' },
    { agency: 'ศูนย์บริการข้อมูล กทม.', phone: '1555', description: 'BMA Call Center' },
    { agency: 'สายด่วนจราจร', phone: '1197', description: 'Traffic Police Hotline' },
  ],
  'Khon Kaen': [
    { agency: 'สภ.เมืองขอนแก่น', phone: '043-221-162', description: 'Mueang Khon Kaen Police Station' },
    { agency: 'ตำรวจท่องเที่ยวขอนแก่น', phone: '043-465-385', description: 'Khon Kaen Tourist Police' },
    { agency: 'รพ.ขอนแก่น', phone: '043-009-900', description: 'Khon Kaen Hospital' },
  ],
  'Udon Thani': [
    { agency: 'สภ.เมืองอุดรธานี', phone: '042-221-077', description: 'Mueang Udon Thani Police Station' },
  ],
  'Surat Thani': [
    { agency: 'สภ.เมืองสุราษฎร์ธานี', phone: '077-272-095', description: 'Mueang Surat Thani Police Station' },
    { agency: 'ตำรวจท่องเที่ยวสุราษฎร์ธานี', phone: '077-200-037', description: 'Surat Thani Tourist Police' },
    { agency: 'รพ.สุราษฎร์ธานี', phone: '077-952-900', description: 'Suratthani Hospital (ER ext. 6120)' },
  ],
  'Songkhla': [
    { agency: 'สภ.เมืองสงขลา', phone: '074-307-092', description: 'Mueang Songkhla Police Station' },
    { agency: 'ตำรวจท่องเที่ยวหาดใหญ่', phone: '074-220-778', description: 'Hat Yai Tourist Police' },
    { agency: 'รพ.สงขลา', phone: '074-338-100', description: 'Songkhla Hospital' },
  ],
  'Bangkok Metropolis': [
     { agency: 'กองบัญชาการตำรวจนครบาล', phone: '02-280-5005', description: 'Metropolitan Police Bureau' },
     { agency: 'รพ.ตํารวจ', phone: '02-207-6000', description: 'Police General Hospital' },
     { agency: 'ศูนย์เอราวัณ (กทม.)', phone: '1669', description: 'Erawan Emergency Medical Center' },
     { agency: 'สวพ.91', phone: '1644', description: 'Traffic Police & Lost Items' },
  ],
  // Batch 2: Major Tourist & Regional Hubs
  'Chon Buri': [
    { agency: 'สภ.เมืองชลบุรี', phone: '038-287-111', description: 'Mueang Chonburi Police Station' },
    { agency: 'ตำรวจท่องเที่ยวพัทยา', phone: '061-146-1155', description: 'Pattaya Tourist Police' },
    { agency: 'รพ.ชลบุรี', phone: '038-931-000', description: 'Chonburi Hospital (ER ext. 1520)' },
  ],
  'Rayong': [
    { agency: 'สภ.เมืองระยอง', phone: '038-611-111', description: 'Mueang Rayong Police Station' },
    { agency: 'ตำรวจท่องเที่ยวระยอง', phone: '038-651-669', description: 'Rayong Tourist Police' },
    { agency: 'รพ.ระยอง', phone: '038-998-555', description: 'Rayong Hospital' },
  ],
  'Kanchanaburi': [
    { agency: 'สภ.เมืองกาญจนบุรี', phone: '034-620-711', description: 'Mueang Kanchanaburi Police Station' },
    { agency: 'ตำรวจท่องเที่ยวกาญจนบุรี', phone: '034-512-795', description: 'Tourist Police' },
    { agency: 'รพ.พหลพลพยุหเสนา', phone: '034-622-999', description: 'Phaholpolpayuhasena Hospital' },
  ],
  'Prachuap Khiri Khan': [
    { agency: 'สภ.เมืองประจวบฯ', phone: '032-603-991', description: 'Provincial Police Station' },
    { agency: 'ตำรวจท่องเที่ยวหัวหิน', phone: '032-516-219', description: 'Hua Hin Tourist Police' },
    { agency: 'รพ.ประจวบคีรีขันธ์', phone: '032-601-800', description: 'Prachuap Khiri Khan Hospital' },
  ],
  'Nan': [
    { agency: 'สภ.เมืองน่าน', phone: '054-710-033', description: 'Mueang Nan Police Station' },
    { agency: 'รพ.น่าน', phone: '054-719-000', description: 'Nan Hospital' },
  ],
  'Krabi': [
    { agency: 'สภ.เมืองกระบี่', phone: '075-611-082', description: 'Mueang Krabi Police Station' },
    { agency: 'ตำรวจท่องเที่ยวกระบี่', phone: '075-637-208', description: 'Krabi Tourist Police' },
    { agency: 'รพ.กระบี่', phone: '075-626-700', description: 'Krabi Hospital' },
  ],
  'Phang Nga': [
    { agency: 'สภ.เมืองพังงา', phone: '076-412-073', description: 'Mueang Phang Nga Police Station' },
    { agency: 'รพ.พังงา', phone: '076-412-032', description: 'Phang Nga Hospital' },
  ],
  'Nakhon Ratchasima': [
    { agency: 'สภ.เมืองนครราชสีมา', phone: '044-259-420', description: 'Mueang Nakhon Ratchasima Police Station' },
    { agency: 'รพ.มหาราชนครราชสีมา', phone: '044-235-000', description: 'Maharaj Nakhon Ratchasima Hospital' },
  ],
  'Ubon Ratchathani': [
    { agency: 'สภ.เมืองอุบลราชธานี', phone: '045-254-621', description: 'Mueang Ubon Ratchathani Police Station' },
    { agency: 'รพ.สรรพสิทธิประสงค์', phone: '045-319-200', description: 'Sappasitthiprasong Hospital' },
  ],
  // Batch 3: Cultural & Cross-Border Hubs
  'Phra Nakhon Si Ayutthaya': [
    { agency: 'สภ.พระนครศรีอยุธยา', phone: '035-243-444', description: 'Phra Nakhon Si Ayutthaya Police Station' },
    { agency: 'ตำรวจท่องเที่ยวอยุธยา', phone: '035-242-352', description: 'Ayutthaya Tourist Police' },
    { agency: 'รพ.พระนครศรีอยุธยา', phone: '035-241-555', description: 'Phra Nakhon Si Ayutthaya Hospital' },
  ],
  'Sukhothai': [
    { agency: 'สภ.เมืองสุโขทัย', phone: '055-613-112', description: 'Mueang Sukhothai Police Station' },
    { agency: 'รพ.สุโขทัย', phone: '055-611-333', description: 'Sukhothai Hospital' },
  ],
  'Mae Hong Son': [
    { agency: 'สภ.เมืองแม่ฮ่องสอน', phone: '053-695-019', description: 'Mueang Mae Hong Son Police Station' },
    { agency: 'รพ.ศรีสังวาลย์', phone: '1669', description: 'Srisangwan Hospital' },
  ],
  'Phitsanulok': [
    { agency: 'สภ.เมืองพิษณุโลก', phone: '055-258-777', description: 'Mueang Phitsanulok Police Station' },
    { agency: 'รพ.พุทธชินราช', phone: '055-270-300', description: 'Buddhachinaraj Phitsanulok Hospital' },
  ],
  'Nakhon Si Thammarat': [
    { agency: 'สภ.เมืองนครศรีธรรมราช', phone: '075-356-005', description: 'Mueang Nakhon Si Thammarat Police Station' },
    { agency: 'รพ.มหาราชนครศรีธรรมราช', phone: '075-340-250', description: 'Maharaj Nakhon Si Thammarat Hospital' },
  ],
  'Trang': [
    { agency: 'ตำรวจภูธรจังหวัดตรัง', phone: '075-572-022', description: 'Trang Provincial Police' },
    { agency: 'รพ.ตรัง', phone: '075-201-500', description: 'Trang Hospital' },
  ],
  'Satun': [
    { agency: 'สภ.เมืองสตูล', phone: '191', description: 'Satun Police' },
    { agency: 'รพ.สตูล', phone: '074-723-500', description: 'Satun Hospital' },
  ],
  'Nong Khai': [
    { agency: 'สภ.เมืองหนองคาย', phone: '042-412-710', description: 'Mueang Nong Khai Police Station' },
    { agency: 'รพ.หนองคาย', phone: '1669', description: 'Nong Khai Hospital' },
  ],
  'Buriram': [
    { agency: 'สภ.เมืองบุรีรัมย์', phone: '044-612-240', description: 'Mueang Buriram Police Station' },
    { agency: 'รพ.บุรีรัมย์', phone: '044-615-002', description: 'Buriram Hospital' },
  ],
  'Lop Buri': [
    { agency: 'สภ.เมืองลพบุรี', phone: '036-421-189', description: 'Mueang Lopburi Police Station' },
    { agency: 'รพ.อานันทมหิดล', phone: '036-785-911', description: 'Ananda Mahidol Hospital' },
  ],
  // Batch 4: Northeast (Isan)
  'Loei': [
    { agency: 'สภ.เมืองเลย', phone: '042-811-254', description: 'Mueang Loei Police Station' },
    { agency: 'ตำรวจท่องเที่ยวเลย', phone: '042-861-164', description: 'Loei Tourist Police' },
    { agency: 'รพ.เลย', phone: '042-835-600', description: 'Loei Hospital' },
  ],
  'Sakon Nakhon': [
    { agency: 'สภ.เมืองสกลนคร', phone: '042-711-506', description: 'Mueang Sakon Nakhon Police Station' },
    { agency: 'รพ.สกลนคร', phone: '042-712-301', description: 'Sakon Nakhon Hospital' },
  ],
  'Nakhon Phanom': [
    { agency: 'สภ.เมืองนครพนม', phone: '042-511-266', description: 'Mueang Nakhon Phanom Police Station' },
    { agency: 'ตำรวจท่องเที่ยวนครพนม', phone: '042-515-773', description: 'Tourist Police' },
    { agency: 'รพ.นครพนม', phone: '042-523-111', description: 'Nakhon Phanom Hospital' },
  ],
  'Mukdahan': [
    { agency: 'ตำรวจภูธรจังหวัดมุกดาหาร', phone: '042-611-455', description: 'Mukdahan Provincial Police' },
    { agency: 'รพ.มุกดาหาร', phone: '042-611-040', description: 'Mukdahan Hospital' },
  ],
  'Surin': [
    { agency: 'สภ.เมืองสุรินทร์', phone: '044-511-007', description: 'Mueang Surin Police Station' },
    { agency: 'รพ.สุรินทร์', phone: '044-511-757', description: 'Surin Hospital' },
  ],
  'Sisaket': [
    { agency: 'ตำรวจภูธรจังหวัดศรีสะเกษ', phone: '045-611-555', description: 'Sisaket Provincial Police' },
    { agency: 'รพ.ศรีสะเกษ', phone: '045-611-503', description: 'Sisaket Hospital' },
  ],
  'Roi Et': [
    { agency: 'สภ.เมืองร้อยเอ็ด', phone: '043-511-777', description: 'Mueang Roi Et Police Station' },
    { agency: 'รพ.ร้อยเอ็ด', phone: '043-511-712', description: 'Roi Et Hospital' },
  ],
  'Kalasin': [
    { agency: 'ตำรวจภูธรจังหวัดกาฬสินธุ์', phone: '043-812-528', description: 'Kalasin Provincial Police' },
    { agency: 'รพ.กาฬสินธุ์', phone: '043-811-010', description: 'Kalasin Hospital' },
  ],
  'Yasothon': [
    { agency: 'ตำรวจภูธรจังหวัดยโสธร', phone: '045-711-684', description: 'Yasothon Provincial Police' },
    { agency: 'รพ.ยโสธร', phone: '045-711-020', description: 'Yasothon Hospital' },
  ],
  'Maha Sarakham': [
    { agency: 'ตำรวจภูธรจังหวัดมหาสารคาม', phone: '043-711-098', description: 'Maha Sarakham Provincial Police' },
    { agency: 'รพ.มหาสารคาม', phone: '043-712-000', description: 'Mahasarakham Hospital' },
  ],
};

const provinceDataAliases: Record<string, string> = {
  'Bangkok Metropolis': 'Bangkok',
  'Buri Ram': 'Buriram',
  'Si Sa Ket': 'Sisaket',
  'Phangnga': 'Phang Nga'
};

function normalizeProvinceDataKey(provinceName: string): string {
  return provinceDataAliases[provinceName] || provinceName;
}

function getProvinceEmergencyContacts(provinceName: string): Array<{ agency: string; phone: string; description?: string }> {
  const normalizedName = normalizeProvinceDataKey(provinceName);

  // Return province-specific contacts if available, otherwise return generic contacts
  if (provinceEmergencyData[normalizedName]) {
    return provinceEmergencyData[normalizedName];
  }
  
  // Default contacts for provinces without specific data
  return [
    { agency: `สถานีตำรวจภูธร${provinceName}`, phone: '191', description: 'Provincial Police Station' },
    { agency: `โรงพยาบาล${provinceName}`, phone: '1669', description: 'Provincial Hospital' },
  ];
}

// Placeholder for provinceEssentialData, assuming it will be defined elsewhere
const provinceEssentialData: Record<string, Partial<ProvinceData>> = {
  'Chiang Mai': {
    immigration: { name: 'Chiang Mai Immigration Office', address: '71 Moo 3, Suthep, Mueang Chiang Mai', phone: '053-201-755', coordinates: { lat: 18.767, lng: 98.975 } },
    tatOffice: { name: 'TAT Chiang Mai Office', phone: '053-248-604', coordinates: { lat: 18.788, lng: 99.003 } },
    touristPolice: { name: 'Chiang Mai Tourist Police', phone: '1155', address: 'Charoen Prathet Rd', coordinates: { lat: 18.784, lng: 99.002 } },
    transportHubs: {
      airport: { name: 'Chiang Mai International Airport (CNX)', phone: '053-922-000', coordinates: { lat: 18.767, lng: 98.962 } },
      busTerminal: { name: 'Arcade Bus Terminal 3', phone: '053-242-664', coordinates: { lat: 18.800, lng: 99.017 } },
      trainStation: { name: 'Chiang Mai Railway Station', phone: '053-245-363', coordinates: { lat: 18.785, lng: 99.013 } },
    },
  },
  'Phuket': {
    immigration: { name: 'Phuket Immigration Office', address: '482 Phuket Rd, Talat Yai', phone: '076-221-905', coordinates: { lat: 7.868, lng: 98.393 } },
    tatOffice: { name: 'TAT Phuket Office', phone: '076-211-036', coordinates: { lat: 7.882, lng: 98.390 } },
    touristPolice: { name: 'Phuket Tourist Police', phone: '1155', address: 'Yaowarat Rd', coordinates: { lat: 7.886, lng: 98.388 } },
    transportHubs: {
      airport: { name: 'Phuket International Airport (HKT)', phone: '076-351-166', coordinates: { lat: 8.113, lng: 98.306 } },
      busTerminal: { name: 'Phuket Bus Terminal 2', phone: '076-261-494', coordinates: { lat: 7.917, lng: 98.396 } },
    },
  },
  'Bangkok': {
    immigration: { name: 'Immigration Bureau (Chaengwattana)', address: '120 Moo 3, Chaengwattana Rd', phone: '1178', coordinates: { lat: 13.890, lng: 100.570 } },
    tatOffice: { name: 'TAT Head Office', phone: '1672', coordinates: { lat: 13.760, lng: 100.540 } },
    touristPolice: { name: 'Tourist Police HQ', phone: '1155', address: 'Suvarnabhumi Airport', coordinates: { lat: 13.690, lng: 100.750 } },
    transportHubs: {
      airport: { name: 'Suvarnabhumi Airport (BKK)', phone: '02-132-1888', coordinates: { lat: 13.690, lng: 100.750 } },
      busTerminal: { name: 'Mo Chit 2 Bus Terminal', phone: '02-936-2852', coordinates: { lat: 13.810, lng: 100.550 } },
      trainStation: { name: 'Krung Thep Aphiwat Central Terminal', phone: '1690', coordinates: { lat: 13.800, lng: 100.540 } },
    },
  },
  'Bangkok Metropolis': {
    immigration: { name: 'Immigration Division 1 (Chaeng Watthana)', address: '120 Chaeng Watthana 7 Rd.', phone: '02-141-9889', coordinates: { lat: 13.896, lng: 100.565 } },
    tatOffice: { name: 'TAT Head Office', phone: '1672', coordinates: { lat: 13.750, lng: 100.560 } },
    touristPolice: { name: 'Tourist Police HQ (Suvarnabhumi)', phone: '1155', address: 'Suvarnabhumi Airport', coordinates: { lat: 13.690, lng: 100.750 } },
    transportHubs: {
      airport: { name: 'Suvarnabhumi Airport (BKK)', phone: '02-132-1888', coordinates: { lat: 13.690, lng: 100.750 } },
      busTerminal: { name: 'Mo Chit Bus Terminal (Chatuchak)', phone: '02-936-2841', coordinates: { lat: 13.813, lng: 100.548 } },
      trainStation: { name: 'Krung Thep Aphiwat Central Terminal', phone: '1690', coordinates: { lat: 13.803, lng: 100.540 } },
    },
  },
  'Khon Kaen': {
    immigration: { name: 'Khon Kaen Immigration Office', address: '197 Moo 13 Mittraphap Rd, Non Thon', phone: '043-306-642' },
    tatOffice: { name: 'TAT Khon Kaen Office', phone: '043-227-714' },
    touristPolice: { name: 'Khon Kaen Tourist Police', phone: '043-465-385', address: 'Khon Kaen' },
    transportHubs: {
      airport: { name: 'Khon Kaen Airport', phone: '043-468-170' },
      busTerminal: { name: 'Khon Kaen Bus Terminal 3', phone: '043-471-585' },
      trainStation: { name: 'Khon Kaen Railway Station', phone: '043-221-112' },
    }
  },
  'Udon Thani': {
    immigration: { name: 'Udon Thani Immigration Office', address: 'Udon Thani', phone: '042-249-982' },
    tatOffice: { name: 'TAT Udon Thani Office', phone: '042-325-407' },
    transportHubs: {
      airport: { name: 'Udonthani Int\'l Airport', phone: '042-244-426' },
    }
  },
  'Surat Thani': {
    immigration: { name: 'Surat Thani Immigration Office', address: '41/12 Moo 2, Thung Rang, Kanchanadit', phone: '077-380-881' },
    tatOffice: { name: 'TAT Surat Thani Office', phone: '077-288-817' },
    touristPolice: { name: 'Surat Thani Tourist Police', phone: '077-200-037', address: 'Surat Thani' },
    transportHubs: {
      airport: { name: 'Surat Thani Int\'l Airport', phone: '077-441-230' },
      busTerminal: { name: 'Surat Thani Bus Terminal', phone: '077-287-988' },
      trainStation: { name: 'Surat Thani Railway Station (Phunphin)', phone: '077-311-213' },
    }
  },
  'Songkhla': {
    immigration: { name: 'Songkhla Immigration Office', address: '103 Phetkasem Rd, Hat Yai', phone: '074-257-019' },
    tatOffice: { name: 'TAT Hat Yai Office', phone: '074-231-055' },
    touristPolice: { name: 'Hat Yai Tourist Police', phone: '074-220-778', address: 'Hat Yai' },
    transportHubs: {
      airport: { name: 'Hat Yai Int\'l Airport', phone: '074-227-000' },
      trainStation: { name: 'Hat Yai Junction Railway Station', phone: '074-238-001' },
    }
  },
  
  // Batch 2: Major Tourist & Regional Hubs
  'Chon Buri': {
    immigration: { name: 'Chonburi Immigration (Pattaya)', address: '75/265 Moo 12, Jomtien Beach Rd', phone: '038-252-750' },
    tatOffice: { name: 'TAT Pattaya Office', phone: '038-427-667' },
    touristPolice: { name: 'Pattaya Tourist Police', phone: '1155 / 061-146-1155', address: 'Pattaya' },
  },
  'Rayong': {
    immigration: { name: 'Rayong Immigration Office', address: '5 Moo 5, Sukhumvit Rd, Huay Pong', phone: '038-684-544' },
    touristPolice: { name: 'Rayong Tourist Police', phone: '038-651-669', address: 'Rayong' },
    transportHubs: {
      airport: { name: 'U-Tapao Rayong-Pattaya Int\'l Airport', phone: '038-245-595' },
    }
  },
  'Kanchanaburi': {
    immigration: { name: 'Kanchanaburi Immigration Office', address: '100/22, Mae Nam Mae Klong Rd', phone: '034-564-279' },
    touristPolice: { name: 'Kanchanaburi Tourist Police', phone: '034-512-795', address: 'Kanchanaburi' },
    transportHubs: {
      trainStation: { name: 'Kanchanaburi Railway Station', phone: '1690' },
    }
  },
  'Prachuap Khiri Khan': {
    immigration: { name: 'Prachuap/Hua Hin Immigration', address: '439 Moo 1, Thap Tai, Hua Hin', phone: '032-520-617' },
    touristPolice: { name: 'Hua Hin Tourist Police', phone: '032-516-219', address: 'Hua Hin' },
    transportHubs: {
      airport: { name: 'Hua Hin Airport', phone: '032-520-169' },
      trainStation: { name: 'Hua Hin Railway Station', phone: '1690' },
    }
  },
  'Chiang Rai': {
    immigration: { name: 'Chiang Rai Immigration Office', address: '117 Moo 10, Wiang Phang Kham, Mae Sai', phone: '053-731-008' },
    touristPolice: { name: 'Chiang Rai Tourist Police', phone: '053-152-547', address: 'Chiang Rai' },
    transportHubs: {
      airport: { name: 'Chiang Rai Int\'l Airport (Mae Fah Luang)', phone: '053-798-000' },
    }
  },
  'Nan': {
    immigration: { name: 'Nan Immigration Office', address: '557 Moo 11, Nan-Phayao Rd', phone: '054-716-138' },
    touristPolice: { name: 'Tourist Police Nan', phone: '1155', address: 'Nan' },
    transportHubs: {
      airport: { name: 'Nan Nakhon Airport', phone: '054-710-270' },
    }
  },
  'Krabi': {
    immigration: { name: 'Krabi Immigration Office', address: 'Krabi Province', phone: '075-663-543' },
    tatOffice: { name: 'TAT Krabi Office', phone: '075-622-163' },
    touristPolice: { name: 'Krabi Tourist Police', phone: '075-637-208', address: 'Ao Nang' },
    transportHubs: {
      airport: { name: 'Krabi Int\'l Airport', phone: '075-701-470' },
    }
  },
  'Phang Nga': {
    immigration: { name: 'Phang Nga Immigration Office', address: '88 Moo 1, Phetkasem Rd, Bang Toei', phone: '076-679-306' },
    tatOffice: { name: 'TAT Phang Nga Office', phone: '076-413-400' },
    touristPolice: { name: 'Phang Nga Tourist Police', phone: '1155', address: 'Khao Lak' },
  },
  'Nakhon Ratchasima': {
    immigration: { name: 'Nakhon Ratchasima Immigration', address: 'Nakhon Ratchasima', phone: '044-221-661' },
    touristPolice: { name: 'Nakhon Ratchasima Tourist Police', phone: '044-370-356', address: 'Nakhon Ratchasima' },
    transportHubs: {
      trainStation: { name: 'Nakhon Ratchasima Railway Station', phone: '1690' },
    }
  },
  'Ubon Ratchathani': {
    immigration: { name: 'Ubon Ratchathani Immigration', address: '189 Moo 10, Sirindhorn', phone: '045-366-000' },
    touristPolice: { name: 'Ubon Tourist Police', phone: '045-251-451', address: 'Ubon Ratchathani' },
    transportHubs: {
      airport: { name: 'Ubon Ratchathani Airport', phone: '045-245-612' },
    }
  },
  
  // Batch 3: Cultural & Cross-Border Hubs
  'Phra Nakhon Si Ayutthaya': {
    immigration: { name: 'Ayutthaya Immigration Office', address: '134 Uthong Rd., Ho Rattanachai', phone: '035-328-411' },
    tatOffice: { name: 'TAT Ayutthaya Office', phone: '035-246-076' },
    touristPolice: { name: 'Ayutthaya Tourist Police', phone: '035-242-352', address: 'Ayutthaya' },
    transportHubs: {
      busTerminal: { name: 'Ayutthaya Bus Terminal', phone: 'N/A' },
      trainStation: { name: 'Ayutthaya Railway Station', phone: '1690' },
    }
  },
  'Sukhothai': {
    immigration: { name: 'Sukhothai Immigration Office', address: 'Nikorn Kasem Rd., Thani', phone: '055-610-112' },
    tatOffice: { name: 'TAT Sukhothai Office', phone: '055-616-228' },
    transportHubs: {
      airport: { name: 'Sukhothai Airport', phone: '055-647-230' },
    }
  },
  'Mae Hong Son': {
    immigration: { name: 'Mae Hong Son Immigration Office', address: '202 Moo 11, Pang Mu', phone: '053-612-106' },
    tatOffice: { name: 'TAT Mae Hong Son Office', phone: '053-612-982' },
    touristPolice: { name: 'Mae Hong Son Tourist Police', phone: '053-699-444', address: 'Mae Hong Son' },
    transportHubs: {
      airport: { name: 'Mae Hong Son Airport', phone: '053-611-273' },
    }
  },
  'Phitsanulok': {
    immigration: { name: 'Phitsanulok Immigration Office', address: '887/4-5 Borom Trailokkanart Rd.', phone: '055-247-722' },
    tatOffice: { name: 'TAT Phitsanulok Office', phone: '055-252-742' },
    touristPolice: { name: 'Phitsanulok Tourist Police', phone: '055-002-399', address: 'Phitsanulok' },
    transportHubs: {
      airport: { name: 'Phitsanulok Airport', phone: '055-258-070' },
    }
  },
  'Nakhon Si Thammarat': {
    immigration: { name: 'Nakhon Si Thammarat Immigration', address: '99/34 Wachirawut Rd., Tha Wang', phone: '075-450-491' },
    tatOffice: { name: 'TAT Nakhon Si Thammarat Office', phone: '075-346-515' },
    transportHubs: {
      airport: { name: 'Nakhon Si Thammarat Airport', phone: '075-802-191' },
    }
  },
  'Trang': {
    immigration: { name: 'Trang Immigration Office', address: '270 Trang-Khaphum Rd., Kantang', phone: '075-251-030' },
    tatOffice: { name: 'TAT Trang Office', phone: '075-215-867' },
    touristPolice: { name: 'Trang Tourist Police', phone: '093-580-6596', address: 'Trang' },
    transportHubs: {
      airport: { name: 'Trang Airport', phone: '075-210-224' },
    }
  },
  'Satun': {
    immigration: { name: 'Satun Immigration Office', address: '1 Buri Wanich Rd., Phiman', phone: '074-711-080' },
    transportHubs: {
      busTerminal: { name: 'Satun Bus Terminal', phone: 'N/A' },
    }
  },
  'Nong Khai': {
    immigration: { name: 'Nong Khai Immigration Office', address: '106 Moo 7, Chalerm Phra Kiat Rd.', phone: '042-990-935' },
    tatOffice: { name: 'TAT Udon Thani (covers Nong Khai)', phone: '042-325-406' },
    touristPolice: { name: 'Tourist Police Udon Thani (covers Nong Khai)', phone: '042-328-189', address: 'Udon Thani/Nong Khai' },
  },
  'Buriram': {
    immigration: { name: 'Buriram Immigration Office', address: 'Buriram Provincial Govt Center', phone: '044-666-903' },
    tatOffice: { name: 'TAT Buriram Office', phone: '044-634-268' },
    touristPolice: { name: 'Tourist Police (Regional)', phone: '044-370-356', address: 'N/A' },
    transportHubs: {
      airport: { name: 'Buriram Airport', phone: '044-606-155' },
    }
  },
  'Lop Buri': {
    immigration: { name: 'Lopburi Immigration Office', address: '88/88 Phrapiya Rd., Talay Chupson', phone: '036-424-686' },
    touristPolice: { name: 'Lopburi Tourist Police', phone: '036-424-515', address: 'Lopburi' },
  },
  
  // Batch 4: Northeast (Isan)
  'Loei': {
    immigration: { name: 'Loei Immigration Office', address: 'Mueang Loei', phone: '042-812-862' },
    tatOffice: { name: 'TAT Loei Office', phone: '042-812-812' },
    touristPolice: { name: 'Loei Tourist Police', phone: '042-861-164', address: 'Loei' },
    transportHubs: {
      airport: { name: 'Loei Airport', phone: '042-811-520' },
      busTerminal: { name: 'Loei Bus Terminal', phone: '1490' },
    }
  },
  'Sakon Nakhon': {
    immigration: { name: 'Sakon Nakhon Immigration Office', address: 'Opposite Rajabhat Univ.', phone: '042-717-040' },
    tatOffice: { name: 'TAT Nakhon Phanom (covers Sakon)', phone: '042-513-490' },
    transportHubs: {
      airport: { name: 'Sakon Nakhon Airport', phone: '042-724-044' },
    }
  },
  'Nakhon Phanom': {
    immigration: { name: 'Nakhon Phanom Immigration Office', address: 'Mueang Nakhon Phanom', phone: '042-550-111' },
    tatOffice: { name: 'TAT Nakhon Phanom Office', phone: '042-513-490' },
    touristPolice: { name: 'Nakhon Phanom Tourist Police', phone: '042-515-773', address: 'Nakhon Phanom' },
    transportHubs: {
      airport: { name: 'Nakhon Phanom Airport', phone: '042-531-586' },
    }
  },
  'Mukdahan': {
    immigration: { name: 'Mukdahan Immigration Office', address: 'Mueang Mukdahan', phone: '042-674-090' },
    tatOffice: { name: 'TAT Nakhon Phanom (covers Mukdahan)', phone: '042-513-490' },
  },
  'Surin': {
    immigration: { name: 'Surin Immigration Office', address: 'Mueang Surin', phone: '044-512-544' },
    tatOffice: { name: 'TAT Surin Office', phone: '044-514-447' },
    transportHubs: {
      trainStation: { name: 'Surin Railway Station', phone: '1690' },
    }
  },
  'Sisaket': {
    immigration: { name: 'Sisaket Immigration Office', address: 'Mueang Sisaket', phone: '045-618-411' },
    tatOffice: { name: 'TAT Surin (covers Sisaket)', phone: '044-514-447' },
    transportHubs: {
      trainStation: { name: 'Sisaket Railway Station', phone: '1690' },
    }
  },
  'Roi Et': {
    immigration: { name: 'Roi Et Immigration Office', address: 'Mueang Roi Et', phone: '043-511-700' },
    tatOffice: { name: 'TAT Khon Kaen (covers Roi Et)', phone: '043-227-714' },
    transportHubs: {
      airport: { name: 'Roi Et Airport', phone: '043-518-246' },
    }
  },
  'Kalasin': {
    immigration: { name: 'Kalasin Immigration Office', address: 'Mueang Kalasin', phone: '043-812-591' },
    tatOffice: { name: 'TAT Khon Kaen (covers Kalasin)', phone: '043-227-714' },
  },
  'Yasothon': {
    immigration: { name: 'Yasothon Immigration Office', address: 'Mueang Yasothon', phone: '045-711-333' },
    tatOffice: { name: 'TAT Ubon Ratchathani (covers Yasothon)', phone: '045-243-770' },
  },
  'Maha Sarakham': {
    immigration: { name: 'Maha Sarakham Immigration Office', address: 'Mueang Maha Sarakham', phone: '043-971-035' },
    tatOffice: { name: 'TAT Khon Kaen (covers Maha Sarakham)', phone: '043-227-714' },
  },
  
  // Batch 5: Central & Lower North
  'Nakhon Sawan': {
    immigration: { name: 'Nakhon Sawan Immigration', address: '153 Moo 9, Nakhon Sawan Tok', phone: '056-881-518' },
    tatOffice: { name: 'TAT Nakhon Sawan Office', phone: '056-221-811' },
    touristPolice: { name: 'Tourist Police Hotline', phone: '1155', address: 'Nakhon Sawan' },
    transportHubs: {
      busTerminal: { name: 'Nakhon Sawan Bus Terminal', phone: '1490' },
      trainStation: { name: 'Nakhon Sawan Railway Station', phone: '1690' },
    }
  },
  'Phichit': {
    immigration: { name: 'Phichit Immigration', address: '52/36 Nok Thang Rotfai Rd', phone: '056-613-428' },
    tatOffice: { name: 'TAT Nakhon Sawan (covers Phichit)', phone: '056-221-811' },
    touristPolice: { name: 'Tourist Police Hotline', phone: '1155', address: 'N/A' },
    transportHubs: {
      trainStation: { name: 'Phichit Railway Station', phone: '1690' },
    }
  },
  'Kamphaeng Phet': {
    immigration: { name: 'Kamphaeng Phet Immigration', address: '208 Moo 3, Song Tham', phone: '055-712-209' },
    tatOffice: { name: 'TAT Sukhothai (covers Kamphaeng Phet)', phone: '055-616-228' },
    touristPolice: { name: 'Tourist Police Hotline', phone: '1155', address: 'N/A' },
  },
  'Uthai Thani': {
    immigration: { name: 'Uthai Thani Immigration', address: '191 Moo 1, Tha Pho', phone: '056-510-623' },
    tatOffice: { name: 'TAT Uthai Thani Office', phone: '056-514-651' },
    touristPolice: { name: 'Tourist Police Hotline', phone: '1155', address: 'N/A' },
  },
  'Chai Nat': {
    immigration: { name: 'Chai Nat Immigration', address: 'Nai Mueang', phone: '056-410-802' },
    tatOffice: { name: 'TAT Suphan Buri (covers Chai Nat)', phone: '035-525-867' },
    touristPolice: { name: 'Tourist Police Hotline', phone: '1155', address: 'N/A' },
  },
  'Sing Buri': {
    immigration: { name: 'Sing Buri Immigration', address: '115 Moo 3, Phrom Buri', phone: '036-510-960' },
    tatOffice: { name: 'TAT Lop Buri (covers Sing Buri)', phone: '036-770-096' },
    touristPolice: { name: 'Tourist Police Hotline', phone: '1155', address: 'N/A' },
  },
  'Ang Thong': {
    immigration: { name: 'Ang Thong Immigration', address: '1 Moo 8, San Chao Rong Thong', phone: '035-610-773' },
    tatOffice: { name: 'TAT Suphan Buri (covers Ang Thong)', phone: '035-525-867' },
    touristPolice: { name: 'Tourist Police Hotline', phone: '1155', address: 'N/A' },
  },
  'Saraburi': {
    immigration: { name: 'Saraburi Immigration', address: '1 Moo 7, Suan Dok Mai', phone: '036-225-368' },
    tatOffice: { name: 'TAT Lop Buri (covers Saraburi)', phone: '036-770-096' },
    touristPolice: { name: 'Tourist Police Hotline', phone: '1155', address: 'N/A' },
  },
  'Suphan Buri': {
    immigration: { name: 'Suphan Buri Immigration', address: '99/328 Moo 5, Phai Khwang', phone: '035-440-464' },
    tatOffice: { name: 'TAT Suphan Buri Office', phone: '035-525-867' },
    touristPolice: { name: 'Tourist Police Hotline', phone: '1155', address: 'N/A' },
  },
  'Nakhon Nayok': {
    immigration: { name: 'Nakhon Nayok Immigration', address: 'Mueang Nakhon Nayok', phone: '037-315-689' }, // Search filled
    tatOffice: { name: 'TAT Nakhon Nayok Office', phone: '037-312-282' },
    touristPolice: { name: 'Tourist Police Hotline', phone: '1155', address: 'N/A' },
  },
};



export function generateProvinceData(province: Province, region: Region): ProvinceData {
  const coords = getProvinceCoords(province.name);
  const dataKey = normalizeProvinceDataKey(province.name);
  const isBangkokProfile = dataKey === 'Bangkok' || dataKey === 'Bangkok Metropolis';
  
  // Get Real Essential Contacts
  const essentialData = provinceEssentialData[dataKey] || {};

  const data: any = {
    thaiName: thaiProvinceNames[province.name] || province.name,
    slogan: provinceSlogans[dataKey] || provinceSlogans[province.name] || '',
    weather: { temp: '32°', condition: 'Sunny', humidity: '65%' },
    safetyIndex: 92,
    dailyCost: '800 ฿',
    
    // Spread essential data
    immigration: essentialData.immigration,
    tatOffice: essentialData.tatOffice,
    touristPolice: essentialData.touristPolice,
    transportHubs: essentialData.transportHubs,

    attractions: isBangkokProfile
      ? [
          { name: 'สยามพารากอน', type: 'Landmark', rating: 4.8, description: 'โหนดเชิงพาณิชย์หลักใจกลางสยาม', openHours: '10:00 - 22:00', price: 'Free entry', coordinates: { lat: 13.7466, lng: 100.5347 } },
          { name: 'สยามสแควร์', type: 'Landmark District', rating: 4.7, description: 'พื้นที่กิจกรรมเมืองและจุดเชื่อมการเดินเท้า', openHours: 'All day', price: 'Free', coordinates: { lat: 13.7449, lng: 100.5335 } },
          { name: 'เซ็นทรัลเวิลด์', type: 'Landmark', rating: 4.6, description: 'แลนด์มาร์กเชิงพาณิชย์และจุดรวมเส้นทางหลัก', openHours: '10:00 - 22:00', price: 'Free entry', coordinates: { lat: 13.7467, lng: 100.5393 } },
          { name: 'เยาวราช', type: 'Landmark District', rating: 4.5, description: 'โซนเมืองเก่าความหนาแน่นสูง ใช้ประเมิน crowd/route', openHours: 'All day', price: 'Free', coordinates: { lat: 13.7396, lng: 100.5104 } },
        ]
      : [
          { name: `${province.name} Old City`, type: 'Landmark', rating: 4.8, description: 'แลนด์มาร์กหลักสำหรับอ้างอิงตำแหน่งและรวมพลในเขตเมืองเก่า', openHours: '6:00 - 18:00', price: 'Free', coordinates: { lat: coords.lat + 0.0050, lng: coords.lng + 0.0030 } },
          { name: `Wat ${province.name}`, type: 'Temple', rating: 4.7, description: 'จุดสูงหรือพื้นที่เปิดโล่งที่ใช้เป็น orientation node ได้ดี', openHours: '5:00 - 17:00', price: '30 ฿', coordinates: { lat: coords.lat + 0.0100, lng: coords.lng + 0.0050 } },
          { name: `${province.name} Night Market`, type: 'Market Hub', rating: 4.5, description: 'คลัสเตอร์อาหารและของใช้พื้นฐาน ใช้ประเมิน supply density ได้', openHours: '17:00 - 23:00', price: 'Free', coordinates: { lat: coords.lat - 0.0080, lng: coords.lng + 0.0120 } },
          { name: `${province.name} National Park`, type: 'Nature Edge', rating: 4.6, description: 'พื้นที่ธรรมชาติสำหรับ day trip และใช้เป็น fallback edge นอกเมือง', openHours: '8:00 - 16:30', price: '200 ฿', coordinates: { lat: coords.lat + 0.0250, lng: coords.lng - 0.0150 } },
        ],
    
    activities: [
      { name: 'Landmark scan', icon: '🧭' },
      { name: 'Meal stop planning', icon: '🍜' },
      { name: 'Fuel top-up', icon: '⛽' },
      { name: 'Market restock', icon: '🛍️' },
      { name: 'Trail scouting', icon: '🥾' },
      { name: 'Fallback check', icon: '🛡️' },
    ],
    
    seasons: [
      { name: 'Cool Season', months: 'Nov - Feb', rating: 'best', description: 'มองเห็นชัด เดินทางไกลสบาย เหมาะกับ pre-trip route' },
      { name: 'Hot Season', months: 'Mar - May', rating: 'good', description: 'ต้องบริหารน้ำและช่วงเวลาเคลื่อนที่ให้ดี' },
      { name: 'Rainy Season', months: 'Jun - Oct', rating: 'avoid', description: 'เสี่ยงน้ำท่วม ทางลื่น และ route disruption สูง' },
    ],
    
    accommodation: {
      budget: [
        { name: `${province.name} Backpackers`, price: '250-400 ฿', rating: 4.2, area: 'Old City', coordinates: { lat: coords.lat + 0.002, lng: coords.lng - 0.001 } },
        { name: 'Green Hostel', price: '300-500 ฿', rating: 4.0, area: 'City Center', coordinates: { lat: coords.lat - 0.001, lng: coords.lng + 0.003 } },
      ],
      midRange: [
        { name: `${province.name} Boutique`, price: '1,200-2,000 ฿', rating: 4.5, area: 'Old City', coordinates: { lat: coords.lat + 0.003, lng: coords.lng + 0.002 } },
        { name: 'Riverside Hotel', price: '1,500-2,500 ฿', rating: 4.4, area: 'Riverside', coordinates: { lat: coords.lat - 0.005, lng: coords.lng - 0.008 } },
      ],
      luxury: [
        { name: `${province.name} Grand Resort`, price: '5,000-12,000 ฿', rating: 4.8, area: 'Mountain View', coordinates: { lat: coords.lat + 0.02, lng: coords.lng - 0.01 } },
        { name: 'Royal Heritage', price: '8,000-15,000 ฿', rating: 4.9, area: 'Old City', coordinates: { lat: coords.lat + 0.001, lng: coords.lng + 0.001 } },
      ],
    },
    
    stayAreas: [
      { name: 'Old City', description: 'เดินทางง่าย ใกล้ landmark หลัก เหมาะตั้งฐานสำหรับสำรวจเมือง', forWho: 'First-timers', coordinates: { lat: coords.lat + 0.002, lng: coords.lng + 0.001 } },
      { name: 'Riverside', description: 'สงบกว่าใจกลางเมือง แต่ต้องเช็กความเสี่ยงน้ำและ route access', forWho: 'Slow pace', coordinates: { lat: coords.lat - 0.005, lng: coords.lng - 0.01 } },
      { name: 'Night Bazaar Area', description: 'ใกล้ตลาดและของกิน เหมาะสำหรับ restock ระยะสั้น', forWho: 'Supply access', coordinates: { lat: coords.lat - 0.002, lng: coords.lng + 0.008 } },
    ],
    
    localDishes: [
      { name: getLocalDish(region.id, 0), description: 'เมนูหลักหาได้ง่าย ใช้เป็น baseline มื้อหลักของพื้นที่', price: '40-60 ฿' },
      { name: getLocalDish(region.id, 1), description: 'อาหารท้องถิ่นที่เจอได้ตามร้านทั่วไป', price: '50-80 ฿' },
      { name: getLocalDish(region.id, 2), description: 'street food ที่เติมพลังได้เร็วระหว่างเดินทาง', price: '30-50 ฿' },
      { name: getLocalDish(region.id, 3), description: 'ของหวานหรือ snack สำหรับพัก route ระยะสั้น', price: '20-40 ฿' },
    ],
    
    restaurants: [
      { name: `The ${province.name} Kitchen`, cuisine: 'Local Thai', price: '$$', rating: 4.6, specialty: 'Reliable hot meals', coordinates: { lat: coords.lat + 0.004, lng: coords.lng - 0.002 } },
      { name: 'River View Terrace', cuisine: 'Thai-International', price: '$$$', rating: 4.5, specialty: 'Comfort stop / longer break', coordinates: { lat: coords.lat - 0.006, lng: coords.lng - 0.009 } },
      { name: 'Local Flavors', cuisine: 'Street Food Style', price: '$', rating: 4.4, specialty: 'Fast meal turnaround', coordinates: { lat: coords.lat + 0.001, lng: coords.lng + 0.005 } },
    ],
    
    cafes: [
      { name: 'Coffee Mountain', vibe: 'Quiet rest stop', wifi: true, specialty: 'Thai drip coffee', coordinates: { lat: coords.lat + 0.008, lng: coords.lng - 0.003 } },
      { name: 'Art House Cafe', vibe: 'Workspace + charging', wifi: true, specialty: 'Pour over', coordinates: { lat: coords.lat + 0.002, lng: coords.lng + 0.006 } },
      { name: 'Garden Brew', vibe: 'Outdoor short break', wifi: true, specialty: 'Cold brew', coordinates: { lat: coords.lat - 0.003, lng: coords.lng + 0.004 } },
    ],
    
    nightMarkets: [
      { name: `${province.name} Walking Street`, openHours: 'Sun 16:00-22:00', bestFor: 'Street food + light resupply', coordinates: { lat: coords.lat - 0.001, lng: coords.lng + 0.002 } },
      { name: 'Night Bazaar', openHours: 'Daily 18:00-23:00', bestFor: 'Food, essentials, urban activity pulse', coordinates: { lat: coords.lat - 0.002, lng: coords.lng + 0.008 } },
    ],
    
    // Shopping Malls
    malls: [
      { name: `Central ${province.name}`, address: 'Downtown Area', openHours: '10:00-21:00', features: ['Cinema', 'Food Court', 'Supermarket', 'ATM'], coordinates: { lat: coords.lat + 0.003, lng: coords.lng + 0.005 } },
      { name: `Maya Lifestyle`, address: 'Near Night Bazaar', openHours: '10:00-22:00', features: ['Rooftop Bar', 'Fashion', 'Electronics'], coordinates: { lat: coords.lat - 0.002, lng: coords.lng + 0.009 } },
      { name: 'Airport Plaza', address: 'Near Airport', openHours: '10:30-21:30', features: ['Department Store', 'Dining', 'Entertainment'], coordinates: { lat: coords.lat + 0.018, lng: coords.lng + 0.012 } },
    ],
    
    gettingThere: [
      { type: 'By Air', name: `${province.name} International Airport`, duration: '1h from BKK', price: '800-3,000 ฿', frequency: '20+ daily flights', icon: <Plane size={20} /> },
      { type: 'By Bus', name: 'Mo Chit Terminal', duration: '9-10 hours', price: '400-700 ฿', frequency: 'Every 30 min', icon: <Bus size={20} /> },
      { type: 'By Train', name: 'Hua Lamphong', duration: '12-14 hours', price: '250-1,500 ฿', frequency: '5 trains daily', icon: <Train size={20} /> },
    ],
    
    gettingAround: [
      { name: 'Songthaew', price: '20-40 ฿', description: 'shared rides ในเมือง เหมาะกับ hop สั้น', icon: <Car size={18} /> },
      { name: 'Grab/Bolt', price: '50-150 ฿', description: 'เรียกรถแบบ on-demand เมื่อ route หลักสะดุด', icon: <Car size={18} /> },
      { name: 'Motorbike Rental', price: '200-300 ฿/day', description: 'คล่องตัวสำหรับ scout route ระยะกลาง', icon: <Car size={18} /> },
      { name: 'Bicycle', price: '50-100 ฿/day', description: 'เหมาะกับ short-radius movement ในเขตเมืองเก่า', icon: <Car size={18} /> },
    ],
    
    dayTrips: [
      { destination: 'Doi Inthanon', distance: '100 km', highlights: "Thailand's highest peak, waterfalls" },
      { destination: 'Elephant Sanctuary', distance: '60 km', highlights: 'Ethical elephant experience' },
      { destination: 'Hot Springs', distance: '40 km', highlights: 'Natural hot springs, relaxation' },
    ],
    
    hospitals: [
      { name: `${province.name} Hospital`, type: 'Public', address: 'City Center', phone: '053-xxx-xxx', coordinates: { lat: coords.lat + 0.004, lng: coords.lng - 0.003 } },
      { name: `${province.name} Ram Hospital`, type: 'Private', address: 'Near Airport', phone: '053-xxx-xxx', coordinates: { lat: coords.lat + 0.016, lng: coords.lng + 0.01 } },
    ],
    
    // Provincial Emergency Contacts with real numbers
    emergencyContacts: getProvinceEmergencyContacts(province.name),
    
    safetyTips: [
      { level: 'good', title: 'Stable Planning Window', description: 'ช่วงกลางวันและเส้นทางหลักยังเหมาะกับการเดินทางปกติ' },
      { level: 'warning', title: 'Traffic / Crowd Caution', description: 'เลี่ยงจุดคอขวดช่วงเย็นหรือเทศกาล โดยเฉพาะทางเข้าเมืองหลัก' },
      { level: 'info', title: 'Backup Route Recommended', description: 'ควรมีอย่างน้อย 1 fallback node สำหรับน้ำมัน เงินสด หรืออาหาร' },
    ],
    
    // NEW: Banks & Currency Exchange
    banks: [
      { 
        name: 'Bangkok Bank', 
        type: 'bank', 
        address: `${province.name} Central Branch, Main Road`, 
        openHours: 'Mon-Fri 08:30-15:30', 
        services: ['ATM', 'Currency Exchange', 'Wire Transfer'],
        coordinates: { lat: coords.lat + 0.002, lng: coords.lng + 0.003 }
      },
      { 
        name: 'Kasikorn Bank', 
        type: 'bank', 
        address: `${province.name} Old City Branch`, 
        openHours: 'Mon-Fri 08:30-15:30', 
        services: ['ATM', 'Currency Exchange'],
        coordinates: { lat: coords.lat - 0.003, lng: coords.lng + 0.001 }
      },
      { 
        name: 'SuperRich Exchange', 
        type: 'exchange', 
        address: 'Night Bazaar Area', 
        openHours: 'Daily 09:00-21:00', 
        services: ['Best Rates', 'Multiple Currencies'],
        coordinates: { lat: coords.lat + 0.001, lng: coords.lng - 0.002 }
      },
    ],
    
    // NEW: Gas Stations
    gasStations: [
      { 
        name: 'PTT Station - Highway', 
        brand: 'PTT', 
        is24h: true, 
        address: `Highway 11, Near ${province.name} Airport`, 
        services: ['Cafe Amazon', 'Jiffy', 'EV Charging', 'Car Wash'],
        coordinates: { lat: coords.lat + 0.015, lng: coords.lng + 0.01 }
      },
      { 
        name: 'Shell - City Center', 
        brand: 'Shell', 
        is24h: true, 
        address: 'Main Road, City Center', 
        services: ['Shell Select', 'V-Power'],
        coordinates: { lat: coords.lat - 0.005, lng: coords.lng + 0.008 }
      },
      { 
        name: 'Bangchak - Outer Ring', 
        brand: 'Bangchak', 
        is24h: false, 
        address: 'Outer Ring Road (06:00-22:00)', 
        services: ['Inthanin Coffee', 'Mini Mart'],
        coordinates: { lat: coords.lat + 0.02, lng: coords.lng - 0.01 }
      },
    ],
    
    // NEW: Pharmacies
    pharmacies: [
      { 
        name: 'Boots - Central Mall', 
        chain: 'Boots', 
        is24h: false, 
        address: `Central ${province.name}, Ground Floor`, 
        phone: '053-xxx-111',
        coordinates: { lat: coords.lat + 0.001, lng: coords.lng + 0.002 }
      },
      { 
        name: 'Watsons - Night Bazaar', 
        chain: 'Watsons', 
        is24h: false, 
        address: 'Night Bazaar Road', 
        phone: '053-xxx-222',
        coordinates: { lat: coords.lat - 0.002, lng: coords.lng - 0.001 }
      },
      { 
        name: 'Fascino 24h Pharmacy', 
        chain: 'Fascino', 
        is24h: true, 
        address: 'Near Hospital, Open 24 hours', 
        phone: '053-xxx-333',
        coordinates: { lat: coords.lat + 0.003, lng: coords.lng - 0.003 }
      },
      { 
        name: 'Pure Pharmacy', 
        chain: 'Independent', 
        is24h: true, 
        address: 'Old City Gate, Open 24 hours', 
        phone: '053-xxx-444',
        coordinates: { lat: coords.lat - 0.001, lng: coords.lng + 0.004 }
      },
    ],
    
    mapMarkers: [],
  };

  const mapMarkers: ProvinceData['mapMarkers'] = [];

  const addMarkers = (items: any[] | undefined, type: 'attraction' | 'restaurant' | 'hotel' | 'hospital' | 'transport') => {
    if (!items) return;
    items.forEach(item => {
      if (item.coordinates) {
        mapMarkers.push({
          lat: item.coordinates.lat,
          lng: item.coordinates.lng,
          title: item.name,
          type
        });
      }
    });
  };

  const addMarker = (item: any | undefined, type: 'attraction' | 'restaurant' | 'hotel' | 'hospital' | 'transport') => {
    if (item && item.coordinates) {
      mapMarkers.push({
        lat: item.coordinates.lat,
        lng: item.coordinates.lng,
        title: item.name,
        type
      });
    }
  };

  addMarkers(data.attractions, 'attraction');
  addMarkers(data.malls, 'attraction');
  addMarkers(data.restaurants, 'restaurant');
  addMarkers(data.cafes, 'restaurant');
  addMarkers(data.nightMarkets, 'restaurant');
  
  if (data.accommodation) {
    addMarkers(data.accommodation.budget, 'hotel');
    addMarkers(data.accommodation.midRange, 'hotel');
    addMarkers(data.accommodation.luxury, 'hotel');
  }
  
  addMarkers(data.stayAreas, 'hotel');
  addMarkers(data.hospitals, 'hospital');
  addMarkers(data.pharmacies, 'hospital');
  addMarkers(data.banks, 'attraction'); 
  addMarkers(data.gasStations, 'transport');

  addMarker(data.immigration, 'attraction');
  addMarker(data.tatOffice, 'attraction');
  addMarker(data.touristPolice, 'hospital');
  
  if (data.transportHubs) {
    addMarker(data.transportHubs.airport, 'transport');
    addMarker(data.transportHubs.busTerminal, 'transport');
    addMarker(data.transportHubs.trainStation, 'transport');
  }

  data.mapMarkers = mapMarkers;
  return data as ProvinceData;
}

function getProvinceCoords(name: string): { lat: number; lng: number } {
  const coords: Record<string, { lat: number; lng: number }> = {
    'Chiang Mai': { lat: 18.7883, lng: 98.9853 },
    'Chiang Rai': { lat: 19.9105, lng: 99.8406 },
    'Bangkok': { lat: 13.7563, lng: 100.5018 },
    'Bangkok Metropolis': { lat: 13.7563, lng: 100.5018 },
    'Phuket': { lat: 7.8804, lng: 98.3923 },
  };
  if (coords[name]) return coords[name];

  const feature: any = thailandGeo.features.find(
    (f: any) => f.properties.name === name || f.properties.name === name.replace(' Metropolis', '')
  );

  if (feature && feature.geometry && feature.geometry.coordinates.length > 0) {
    let latSum = 0;
    let lngSum = 0;
    let count = 0;
    
    const polygon = feature.geometry.type === 'MultiPolygon' 
      ? feature.geometry.coordinates[0][0] 
      : feature.geometry.coordinates[0];
      
    if (Array.isArray(polygon)) {
      for (const coord of polygon) {
        if (Array.isArray(coord) && coord.length >= 2) {
          lngSum += coord[0];
          latSum += coord[1];
          count++;
        }
      }
    }
    
    if (count > 0) {
      return { lat: latSum / count, lng: lngSum / count };
    }
  }

  return { lat: 13.7563, lng: 100.5018 };
}

function getLocalDish(regionId: string, index: number): string {
  const dishes: Record<string, string[]> = {
    'north': ['Khao Soi', 'Sai Oua', 'Kaeng Hung Le', 'Khanom Jeen Nam Ngiao'],
    'northeast': ['Som Tam', 'Larb', 'Kai Yang', 'Sticky Rice'],
    'central': ['Pad Thai', 'Tom Yum', 'Green Curry', 'Mango Sticky Rice'],
    'south': ['Massaman Curry', 'Kanom Jeen', 'Roti', 'Thai Tea'],
    'east': ['Seafood', 'Pla Pao', 'Som Tam', 'Kai Yang'],
    'west': ['Kaeng Pa', 'Moo Hong', 'Nam Prik', 'Khao Chae'],
  };
  const regionDishes = dishes[regionId] || dishes['central'];
  return regionDishes[index] || 'Local Specialty';
}


