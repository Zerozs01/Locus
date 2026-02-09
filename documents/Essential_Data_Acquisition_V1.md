# Essential Data Acquisition Log (V1)

This document summarizes the process, prompts, and data batches used to acquire "Essential Data" (Immigration, Transport, Tourism, Emergency) for the Locus application.

**System Update Date:** 2026-02-08

## 1. Objective

To enrich the "Essentials" tab of each province with verified contact information critical for tourists, especially foreigners. The goal is to cover all 77 provinces.

## 2. Key Data Points

For each province, we require the following data points:

- **Immigration Office**: Name, Address, Phone (Verified).
- **Transport Hubs**: Airport, Bus Terminal, Train Station (Call Center or Local Number).
- **Tourist Services**: TAT Office, Tourist Police (Local Number).
- **Local Emergency**: Provincial Police Station (Not 191), Provincial Hospital (ER Number).

## 3. JSON Data Schema

The data is collected in the following JSON format to be directly integratable into `ProvinceTacticalPage.tsx`.

```json
{
  "ProvinceName": {
    "region": "RegionName",
    "immigration_office": {
      "name": "Full Name (English/Thai)",
      "address": "Full Address",
      "phone": "Phone Number",
      "coordinates": "Lat, Lng (Optional)"
    },
    "transport_hubs": {
      "airport": { "name": "Name", "phone": "Phone" },
      "bus_terminal": { "name": "Name", "phone": "Phone" },
      "train_station": { "name": "Name", "phone": "Phone" }
    },
    "tourist_services": {
      "tat_office": { "name": "Name", "phone": "Phone" },
      "tourist_police": { "name": "Name", "phone": "Phone" }
    },
    "local_emergency": {
      "provincial_police_station": { "name": "Name", "phone": "Phone" },
      "provincial_hospital": { "name": "Name", "er_phone": "Phone" }
    }
  }
}
```

## 4. Execution Batches (Completed)

### Batch 1: Primary Hubs (Pilot)

- **Provinces:** Chiang Mai, Phuket, Bangkok Metropolis
- **Status:** **Completed & Integrated**
- **Note:** Manually verified initial data structure.

### Batch 2: Major Tourist & Regional Hubs

- **Provinces:**
  1.  Chon Buri (Pattaya)
  2.  Rayong
  3.  Kanchanaburi
  4.  Prachuap Khiri Khan (Hua Hin)
  5.  Chiang Rai
  6.  Nan
  7.  Krabi
  8.  Phang Nga
  9.  Nakhon Ratchasima (Korat)
  10. Ubon Ratchathani
- **Status:** **Completed & Integrated**

### Batch 3: Cultural & Cross-Border Hubs

- **Provinces:**
  1.  Phra Nakhon Si Ayutthaya
  2.  Sukhothai
  3.  Mae Hong Son
  4.  Phitsanulok
  5.  Nakhon Si Thammarat
  6.  Trang
  7.  Satun
  8.  Nong Khai
  9.  Buriram
  10. Lop Buri
- **Status:** **Completed & Integrated**

### Batch 4: Northeast (Isan)

- **Provinces:**
  1.  Loei (Chiang Khan)
  2.  Sakon Nakhon
  3.  Nakhon Phanom
  4.  Mukdahan
  5.  Surin
  6.  Sisaket
  7.  Roi Et
  8.  Kalasin
  9.  Yasothon
  10. Maha Sarakham
- **Status:** **Completed & Integrated**

## 5. Future Batches (To Do)

Use the prompt below to gather data for the remaining provinces.

**Proposed Batch 5: Central & Lower North**

- Nakhon Sawan, Phichit, Kamphaeng Phet, Uthai Thani, Chai Nat, Sing Buri, Ang Thong, Saraburi, Suphan Buri, Nakhon Nayok.

**Prompt Template:**

```text
Requesting "Essential Data" in the original JSON format for the following Thai provinces [Batch X]:

1. [Province 1]
2. [Province 2]
...

Required Fields:
- Immigration Office (Name, Address, Phone)
- Transport Hubs (Airport, Bus Terminal, Train Station - use "N/A" if none)
- Tourist Services (TAT Office, Tourist Police)
- Local Emergency (Provincial Police Station - local number, Provincial Hospital - ER number)

Focus on verified contact numbers and official names.
```
