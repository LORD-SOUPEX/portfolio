import { Outlet, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import useScrollReveal from '../../hooks/useScrollReveal';

const ParticleCanvas = lazy(() => import('../ui/ParticleCanvas'));

export default function Layout() {
  const { pathname } = useLocation();
  
  // Initialize scroll reveal animations
  useScrollReveal();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Determine page class for accent color overrides
  const getPageClass = () => {
    if (pathname === '/ansible') return 'page-ansible';
    if (pathname === '/terraform') return 'page-terraform';
    if (pathname === '/fullstack') return 'page-fullstack';
    return '';
  };

  return (
    <div className={getPageClass()}>
      <ScrollProgress />
      <Navbar />
      <Suspense fallback={null}>
        <ParticleCanvas />
      </Suspense>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
