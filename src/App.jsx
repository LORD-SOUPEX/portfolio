import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const AnsiblePage = lazy(() => import('./pages/AnsiblePage'));
const TerraformPage = lazy(() => import('./pages/TerraformPage'));
const FullstackPage = lazy(() => import('./pages/FullstackPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212' }}>
    <div className="loader">Chargement...</div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/ansible" element={<AnsiblePage />} />
            <Route path="/terraform" element={<TerraformPage />} />
            <Route path="/fullstack" element={<FullstackPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
