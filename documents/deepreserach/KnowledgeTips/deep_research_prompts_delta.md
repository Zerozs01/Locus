# Deep Research Delta Prompts (Knowledge/Supply/Planner)

## Goal
Use this when base portal data already exists and we only want to enrich missing fields:
- knowledgeTips
- supplyPoints
- plannerHints

This avoids re-running full research for transport/routes/foods/accommodation/dangers.

## How to Use
1. Open Deep Research mode.
2. Pick one round below.
3. Ask for output JSON only.
4. If output is too long, force split into parts.
5. Send JSON back for import.

---

## Prompt Template

```text
ผมมีข้อมูลจังหวัดไทยพื้นฐานแล้ว และต้องการเฉพาะข้อมูลเสริมเพิ่ม 3 ฟิลด์นี้เท่านั้น
กรุณาตอบเป็น JSON สำหรับจังหวัดต่อไปนี้:

[PUT PROVINCE LIST HERE]

ให้แต่ละจังหวัดมีเฉพาะ:

1) knowledgeTips (5-10 รายการ)
- title: หัวข้อสั้น
- content: คำแนะนำเฉพาะจังหวัด 1-3 ประโยค
- type: "safety" | "season" | "route" | "culture" | "food" | "budget"

2) supplyPoints (4-12 รายการ)
- type: "bank" | "gas" | "toilet" | "pharmacy" | "clinic" | "police" | "ev_charger" | "other"
- label: ชื่อจุด/ประเภทจุดบริการ
- area: พื้นที่ที่พบได้บ่อย
- note: หมายเหตุสั้น
- openHours: เวลาเปิด-ปิด (ถ้าไม่ทราบใส่ null)
- mapUrl: URL อ้างอิง (ถ้าไม่ชัวร์ใส่ "")

3) plannerHints
- commonOrigins: 3-8 จุด
- commonDestinations: 5-12 จุด
- transitHubs: 2-8 จุด
- routeNotes: 2-6 ข้อ

รูปแบบ JSON:
{
  "Bangkok": {
    "knowledgeTips": [...],
    "supplyPoints": [...],
    "plannerHints": {
      "commonOrigins": [...],
      "commonDestinations": [...],
      "transitHubs": [...],
      "routeNotes": [...]
    }
  }
}

ข้อจำกัด:
- ห้ามส่ง field อื่นนอกเหนือจาก 3 ฟิลด์นี้
- ห้ามแต่ง URL/ข้อมูลทางการแพทย์/เบอร์ฉุกเฉิน ถ้าไม่มั่นใจให้เว้นว่างหรือ null
- ใช้ข้อมูลล่าสุด 2024-2026
```

---

## Round A - Central (15)

```text
Bangkok, Nonthaburi, Pathum Thani, Samut Prakan, Ayutthaya, Nakhon Pathom,
Samut Sakhon, Samut Songkhram, Suphan Buri, Sing Buri, Ang Thong,
Lop Buri, Saraburi, Chai Nat, Nakhon Nayok
```

## Round B - North (17)

```text
Chiang Mai, Chiang Rai, Lampang, Lamphun, Mae Hong Son,
Nan, Phayao, Phrae, Uttaradit, Sukhothai, Tak,
Kamphaeng Phet, Phitsanulok, Phichit, Phetchabun,
Nakhon Sawan, Uthai Thani
```

## Round C - Isan Upper (10)

```text
Khon Kaen, Udon Thani, Nong Khai, Nong Bua Lam Phu, Loei,
Sakon Nakhon, Nakhon Phanom, Mukdahan, Kalasin, Bueng Kan
```

## Round D - Isan Lower (10)

```text
Nakhon Ratchasima, Buri Ram, Surin, Si Sa Ket, Ubon Ratchathani,
Roi Et, Maha Sarakham, Yasothon, Amnat Charoen, Chaiyaphum
```

## Round E - East + West (11)

```text
Chon Buri, Rayong, Chanthaburi, Trat, Sa Kaeo, Chachoengsao,
Prachin Buri, Kanchanaburi, Ratchaburi, Phetchaburi, Prachuap Khiri Khan
```

## Round F - South (14)

```text
Surat Thani, Phuket, Krabi, Phang Nga,
Nakhon Si Thammarat, Songkhla, Trang, Satun, Phatthalung,
Chumphon, Ranong, Yala, Pattani, Narathiwat
```
