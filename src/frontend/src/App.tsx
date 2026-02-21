import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import HomePage from './pages/HomePage';
import FlashcardsPage from './pages/FlashcardsPage';
import PracticeTestPage from './pages/PracticeTestPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';
import Layout from './components/Layout';
import { Toaster } from '@/components/ui/sonner';
import { useNotifications } from './hooks/useNotifications';

function RootComponent() {
  useNotifications();
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

const rootRoute = createRootRoute({
  component: RootComponent
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage
});

const flashcardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/flashcards',
  component: FlashcardsPage
});

const practiceTestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/practice-test',
  component: PracticeTestPage
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/progress',
  component: ProgressPage
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  flashcardsRoute,
  practiceTestRoute,
  progressRoute,
  settingsRoute
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
