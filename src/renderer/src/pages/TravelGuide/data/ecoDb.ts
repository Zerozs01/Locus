export type EcoCategory = 'fauna' | 'flora' | 'terrain' | 'climate';
export type EcoTag = 'danger' | 'edible' | 'medicinal' | 'common' | 'rare' | 'protected' | 'seasonal' | 'extreme';

export interface EcoEntity {
  id: string;
  name: string;
  category: EcoCategory;
  tags: EcoTag[];
  desc: string;
  season?: string; // e.g. "พ.ค. - ต.ค."
}

// Master Database of Environment Entities
export const ecoDatabase: EcoEntity[] = [
  // สัตว์ (Fauna)
  { id: 'f_elephant', name: 'ช้างป่า', category: 'fauna', tags: ['danger', 'protected', 'rare'], desc: 'มักพบในพื้นที่ป่าทึบและอุทยานแห่งชาติ ควรหลีกเลี่ยงการเข้าใกล้ โดยเฉพาะช่วงกลางคืน' },
  { id: 'f_snake_cobra', name: 'งูเห่า / งูจงอาง', category: 'fauna', tags: ['danger', 'common'], desc: 'พบได้ทั้งในป่าและชุมชนที่มีแหล่งน้ำหรือพงหญ้า มีพิษร้ายแรง' },
  { id: 'f_snake_green', name: 'งูเขียวหางไหม้', category: 'fauna', tags: ['danger', 'common'], desc: 'ชอบเกาะตามกิ่งไม้เตี้ยๆ มีพิษ หากถูกกัดจะปวดบวม' },
  { id: 'f_monkey', name: 'ลิงแสม / ลิงวอก', category: 'fauna', tags: ['common', 'danger'], desc: 'พบตามวัด แหล่งท่องเที่ยวป่า และภูเขา อาจดุร้ายหรือแย่งสิ่งของได้' },
  { id: 'f_boar', name: 'หมูป่า', category: 'fauna', tags: ['danger', 'edible'], desc: 'พบในป่าลึกหรือดอยสูง หากเข้าใกล้ลูกน้อยแม่หมูอาจเข้าโจมตี' },
  { id: 'f_jellyfish_box', name: 'แมงกะพรุนกล่อง', category: 'fauna', tags: ['danger', 'seasonal'], desc: 'พบตามชายหาดหรือเกาะบางแห่งช่วงฤดูมรสุม มีพิษรุนแรงถึงชีวิต' },
  { id: 'f_dog_stray', name: 'สุนัขจรจัด', category: 'fauna', tags: ['danger', 'common'], desc: 'พบได้แทบทุกพื้นที่ชุมชนและตรอกซอกซอย ระวังพิษสุนัขบ้า' },
  { id: 'f_boar_hunt', name: 'หมูป่า (ล่าได้)', category: 'fauna', tags: ['edible', 'common'], desc: 'พบในป่าลึก ชาวบ้านในบางพื้นที่นิยมล่ามาประกอบอาหาร' },

  // พืช (Flora)
  { id: 'fl_mushroom_poison', name: 'เห็ดพิษป่า', category: 'flora', tags: ['danger', 'seasonal'], desc: 'มักขึ้นในช่วงหน้าฝน หน้าตาคล้ายเห็ดกินได้ หากไม่ชำนาญห้ามรับประทาน' },
  { id: 'fl_bamboo', name: 'ไผ่ป่า / หน่อไม้', category: 'flora', tags: ['edible', 'common'], desc: 'พืชอเนกประสงค์ ใช้ทำที่พักชั่วคราวได้ และหน่ออ่อนนำมาประกอบอาหารได้' },
  { id: 'fl_yanang', name: 'ใบย่านาง', category: 'flora', tags: ['medicinal', 'edible', 'common'], desc: 'พืชสมุนไพรฤทธิ์เย็น ใช้ถอนพิษไข้ แก้ร้อนใน และนำมาคั้นน้ำใส่แกง' },
  { id: 'fl_nettle', name: 'ตำแย / หมามุ่ย', category: 'flora', tags: ['danger', 'common'], desc: 'หากสัมผัสจะเกิดอาการคัน ปวดแสบปวดร้อน พบบ่อยตามชายป่ารกร้าง' },
  { id: 'fl_kratom', name: 'กระท่อม', category: 'flora', tags: ['medicinal', 'common'], desc: 'ส่วนใบใช้เคี้ยวเพื่อเพิ่มกำลังวังชาในการทำงาน ทนแดด ช่วยรักษาอาการปวดเมื่อย' },
  { id: 'fl_seaweed', name: 'สาหร่ายทะเล (ทานได้)', category: 'flora', tags: ['edible', 'common'], desc: 'พบได้ตามชายฝั่งทะเล นำมาประกอบอาหารพื้นบ้านได้' },

  // พื้นที่ (Terrain)
  { id: 't_rainforest', name: 'ป่าดิบชื้น', category: 'terrain', tags: ['extreme', 'common'], desc: 'ป่าร่มครึ้ม ต้นไม้สูง ทากและแมลงเยอะ มักพบน้ำตกและลำธาร' },
  { id: 't_mountain', name: 'ภูเขาสูง / ดอย', category: 'terrain', tags: ['common', 'extreme'], desc: 'พื้นที่ลาดชัน อุณหภูมิกลางคืนต่ำ เดินทางลำบากในหน้าฝน' },
  { id: 't_urban', name: 'เขตเมืองหนาแน่น', category: 'terrain', tags: ['common'], desc: 'เต็มไปด้วยตึกและถนน มีมลพิษจากการจราจร แต่มีเสบียงและโรงพยาบาลครบ' },
  { id: 't_mangrove', name: 'ป่าชายเลน', category: 'terrain', tags: ['protected', 'common'], desc: 'พื้นที่ริมฝั่งทะเลที่มีโคลนและรากไม้ซับซ้อน เป็นแหล่งอนุบาลสัตว์น้ำ' },
  { id: 't_cave', name: 'ถ้ำหินปูน', category: 'terrain', tags: ['danger', 'extreme'], desc: 'มืดและอับชื้น ระวังน้ำป่าหน้าฝน อาจเจอก๊าซพิษหรือค้างคาว' },

  // สภาพอากาศ (Climate)
  { id: 'c_heat_stroke', name: 'เพดานความร้อนจัด', category: 'climate', tags: ['danger', 'seasonal', 'extreme'], desc: 'สภาพอากาศแล้งและร้อนจัดเกิน 40°C เสี่ยงโรคลมแดด ควรงดกิจกรรมกลางแจ้ง' },
  { id: 'c_flash_flood', name: 'น้ำป่าหลาก', category: 'climate', tags: ['danger', 'extreme', 'seasonal'], desc: 'ฝนตกหนักสะสม มวลน้ำหลากจากภูเขาอย่างฉับพลัน ห้ามตั้งแคมป์ริมลำธาร' },
  { id: 'c_pm25', name: 'หมอกควัน / PM2.5', category: 'climate', tags: ['danger', 'seasonal'], desc: 'ฝุ่นควันหนาแน่น ทัศนวิสัยต่ำ ส่งผลกระทบต่อระบบหายใจรุนแรง' },
  { id: 'c_monsoon', name: 'พายุลมมรสุม', category: 'climate', tags: ['danger', 'extreme', 'seasonal'], desc: 'ลมกระโชกแรง คลื่นทะเลสูง 2-3 เมตร ห้ามนำเรือเล็กออกจากฝั่ง' },
];

export const getEcoEntities = (ids: string[]) => ids.map(id => ecoDatabase.find(e => e.id === id)).filter(Boolean) as EcoEntity[];
export const expandEcoTags = (tags: EcoTag[]) => {
  const map: Record<EcoTag, { label: string; color: string }> = {
    danger: { label: 'อันตราย', color: 'text-red-400 bg-red-500/20 border-red-500/30' },
    edible: { label: 'กินได้', color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30' },
    medicinal: { label: 'ใช้ยาได้', color: 'text-sky-400 bg-sky-500/20 border-sky-500/30' },
    common: { label: 'เจอบ่อย', color: 'text-slate-300 bg-slate-500/20 border-slate-500/30' },
    rare: { label: 'หายาก', color: 'text-amber-400 bg-amber-500/20 border-amber-500/30' },
    protected: { label: 'คุ้มครอง', color: 'text-purple-400 bg-purple-500/20 border-purple-500/30' },
    seasonal: { label: 'ตามฤดู', color: 'text-teal-400 bg-teal-500/20 border-teal-500/30' },
    extreme: { label: 'รุนแรง', color: 'text-orange-400 bg-orange-500/20 border-orange-500/30' },
  };
  return tags.map(t => ({ id: t, ...map[t] }));
}
