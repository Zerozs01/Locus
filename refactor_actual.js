const fs = require('fs');
const file = 'c:/Users/beelink/Downloads/Code/University/Locus/src/renderer/src/pages/ProvinceTacticalPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix the typing
content = content.replace(/const data: Omit<ProvinceData, 'mapMarkers'> = \{/, 'const data: any = {');

// The dynamic logic string to inject
const dynamicLogic = `  mapMarkers: []
  };

  const mapMarkers: ProvinceData['mapMarkers'] = [];

  const addMarkers = (items, type) => {
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

  const addMarker = (item, type) => {
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
  return data as ProvinceData;`;

// Replace the old mapMarkers assignment
content = content.replace(/mapMarkers:\s*generateMapMarkers([^}]+)\};/m, dynamicLogic);

// Remove the obsolete generateMapMarkers
content = content.replace(/function generateMapMarkers\([\s\S]*?\}\r?\n/, '');

fs.writeFileSync(file, content);
