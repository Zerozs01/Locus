import { Region, Province } from '../../data/regions';

export type FlyToHandler = (lat: number, lng: number, title?: string) => void;

export interface ProvinceData {
  thaiName: string;
  slogan: string;
  weather: { temp: string; condition: string; humidity: string };
  safetyIndex: number;
  dailyCost: string;
  attractions: Array<{ name: string; type: string; rating: number; description?: string; openHours?: string; price?: string; coordinates?: { lat: number; lng: number } }>;
  activities: Array<{ name: string; icon: string }>;
  seasons: Array<{ name: string; months: string; rating: 'best' | 'good' | 'avoid'; description: string }>;
  accommodation: {
    budget: Array<{ name: string; price: string; rating: number; area: string; coordinates?: { lat: number; lng: number } }>;
    midRange: Array<{ name: string; price: string; rating: number; area: string; coordinates?: { lat: number; lng: number } }>;
    luxury: Array<{ name: string; price: string; rating: number; area: string; coordinates?: { lat: number; lng: number } }>;
  };
  stayAreas: Array<{ name: string; description: string; forWho: string; coordinates?: { lat: number; lng: number } }>;
  localDishes: Array<{ name: string; description: string; price: string }>;
  restaurants: Array<{ name: string; cuisine: string; price: string; rating: number; specialty?: string; coordinates?: { lat: number; lng: number } }>;
  cafes: Array<{ name: string; vibe: string; wifi: boolean; specialty: string; coordinates?: { lat: number; lng: number } }>;
  nightMarkets: Array<{ name: string; openHours: string; bestFor: string; coordinates?: { lat: number; lng: number } }>;
  malls: Array<{ name: string; address: string; openHours: string; features: string[]; coordinates?: { lat: number; lng: number } }>;
  gettingThere: Array<{ type: string; name: string; duration: string; price: string; frequency: string; icon: React.ReactNode }>;
  gettingAround: Array<{ name: string; price: string; description: string; icon: React.ReactNode }>;
  dayTrips: Array<{ destination: string; distance: string; highlights: string }>;
  hospitals: Array<{ name: string; type: string; address: string; phone: string; coordinates?: { lat: number; lng: number } }>;
  emergencyContacts: Array<{ agency: string; phone: string; description?: string }>;
  safetyTips: Array<{ level: 'good' | 'warning' | 'info'; title: string; description: string }>;
  banks: Array<{ name: string; type: 'bank' | 'exchange'; address: string; openHours: string; services: string[]; coordinates?: { lat: number; lng: number } }>;
  gasStations: Array<{ name: string; brand: string; is24h: boolean; address: string; services: string[]; coordinates?: { lat: number; lng: number } }>;
  pharmacies: Array<{ name: string; chain: string; is24h: boolean; address: string; phone: string; coordinates?: { lat: number; lng: number } }>;
  // New Essential Contacts
  immigration?: { name: string; address: string; phone: string; coordinates?: { lat: number; lng: number } };
  tatOffice?: { name: string; phone: string; coordinates?: { lat: number; lng: number } };
  touristPolice?: { name: string; phone: string; address: string; coordinates?: { lat: number; lng: number } };
  transportHubs?: {
    airport?: { name: string; phone: string; coordinates?: { lat: number; lng: number } };
    busTerminal?: { name: string; phone: string; coordinates?: { lat: number; lng: number } };
    trainStation?: { name: string; phone: string; coordinates?: { lat: number; lng: number } };
  };
  mapMarkers: Array<{ lat: number; lng: number; title: string; type: 'attraction' | 'restaurant' | 'hotel' | 'hospital' | 'transport' }>;
}
