import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import LoadingSpinner from './components/LoadingSpinner';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// Eager load Home for critical path performance
import Home from './pages/Home';

// Lazy load other pages
const About = lazy(() => import('./pages/About'));
const PracticeAreaTemplate = lazy(() => import('./pages/PracticeAreaTemplate'));
import { LeadModalProvider } from './context/LeadModalContext';

const App = () => {
  return (
    <HelmetProvider>
      <HashRouter>
        <LeadModalProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="sobre" element={<About />} />
                <Route path="area/:slug" element={<PracticeAreaTemplate />} />
                {/* Fallback routing */}
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          </Suspense>
        </LeadModalProvider>
      </HashRouter>
    </HelmetProvider>
  );
};

export default App;