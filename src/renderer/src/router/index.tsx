import { Suspense, lazy } from 'react';
import { createHashRouter, RouteObject } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';

const PageLoading = () => (
  <div className="flex-1 flex items-center justify-center bg-[#050608] text-slate-400">
    Loading...
  </div>
);

const ExplorePage = lazy(() => import('../pages/GeoArchivePage').then(m => ({ default: m.GeoArchivePage })));
const ThaiMapPage = lazy(() => import('../pages/ThreatRadarPage').then(m => ({ default: m.ThreatRadarPage })));
const ProvinceTacticalPage = lazy(() => import('../pages/ProvinceTactical').then(m => ({ default: m.ProvinceTacticalPage })));
const SettingsPage = lazy(() => import('../pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const IntelligencePage = lazy(() => import('../pages/IntelligencePage').then(m => ({ default: m.IntelligencePage })));
const AnalyticsPage = lazy(() => import('../pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const TravelGuidePage = lazy(() => import('../pages/TravelGuide').then(m => ({ default: m.TravelGuidePage })));

/**
 * Locus Navigation Routes
 * 
 * Using HashRouter for Electron compatibility (file:// protocol)
 * 
 * Route hierarchy:
 *   /            → Explore Hub (intent-first landing)
 *   /map         → Thai Map (region dashboard + interactive map)
 *   /province    → Province Detail
 *   /intelligence→ AI Chat
 *   /analytics   → Situation Feed
 *   /travel-guide→ Travel Guide
 *   /settings    → Settings
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoading />}>
            <ExplorePage />
          </Suspense>
        ),
      },
      {
        path: 'map',
        element: (
          <Suspense fallback={<PageLoading />}>
            <ThaiMapPage />
          </Suspense>
        ),
      },
      {
        path: 'province/:regionId/:provinceId',
        element: (
          <Suspense fallback={<PageLoading />}>
            <ProvinceTacticalPage />
          </Suspense>
        ),
      },
      {
        path: 'intelligence',
        element: (
          <Suspense fallback={<PageLoading />}>
            <IntelligencePage />
          </Suspense>
        ),
      },
      {
        path: 'analytics',
        element: (
          <Suspense fallback={<PageLoading />}>
            <AnalyticsPage />
          </Suspense>
        ),
      },
      {
        path: 'travel-guide/:regionId',
        element: (
          <Suspense fallback={<PageLoading />}>
            <TravelGuidePage />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<PageLoading />}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createHashRouter(routes);
