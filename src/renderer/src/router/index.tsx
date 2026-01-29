import { createHashRouter, RouteObject } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { RadarPage } from '../pages/RadarPage';
import { ProvinceTacticalPage } from '../pages/ProvinceTacticalPage';
import { SettingsPage } from '../pages/SettingsPage';
import { GeoArchivePage } from '../pages/GeoArchivePage';
import { IntelligencePage } from '../pages/IntelligencePage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { TravelGuidePage } from '../pages/TravelGuidePage';

/**
 * Locus Navigation Routes
 * 
 * Using HashRouter for Electron compatibility (file:// protocol)
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <RadarPage />,
      },
      {
        path: 'province/:regionId/:provinceId',
        element: <ProvinceTacticalPage />,
      },
      {
        path: 'archive',
        element: <GeoArchivePage />,
      },
      {
        path: 'intelligence',
        element: <IntelligencePage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'travel-guide/:regionId',
        element: <TravelGuidePage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
];

export const router = createHashRouter(routes);
