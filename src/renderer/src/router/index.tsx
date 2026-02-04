import { Suspense, lazy } from 'react';
import { createHashRouter, RouteObject } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';

const PageLoading = () => (
  <div className="flex-1 flex items-center justify-center bg-[#050608] text-slate-400">
    Loading...
  </div>
);

const RadarPage = lazy(() => import('../pages/RadarPage').then(m => ({ default: m.RadarPage })));
const ProvinceTacticalPage = lazy(() => import('../pages/ProvinceTacticalPage').then(m => ({ default: m.ProvinceTacticalPage })));
const SettingsPage = lazy(() => import('../pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const GeoArchivePage = lazy(() => import('../pages/GeoArchivePage').then(m => ({ default: m.GeoArchivePage })));
const IntelligencePage = lazy(() => import('../pages/IntelligencePage').then(m => ({ default: m.IntelligencePage })));
const AnalyticsPage = lazy(() => import('../pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const TravelGuidePage = lazy(() => import('../pages/TravelGuidePage').then(m => ({ default: m.TravelGuidePage })));

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
        element: (
          <Suspense fallback={<PageLoading />}>
            <RadarPage />
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
        path: 'archive',
        element: (
          <Suspense fallback={<PageLoading />}>
            <GeoArchivePage />
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
