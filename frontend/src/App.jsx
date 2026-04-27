import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Tech } from './pages/Tech';

// App Section
import { AppLayout } from './layouts/AppLayout';
import { Dash } from './pages/app/Dash';
import { LiveMap } from './pages/app/LiveMap';
import { Signals } from './pages/app/Signals';
import { Emergency } from './pages/app/Emergency';
import { Analytics } from './pages/app/Analytics';

function App() {
  const location = useLocation();
  const isAppRoute = location.pathname.startsWith('/app');

  return (
    <div className={`flex flex-col min-h-screen w-full overflow-hidden ${isAppRoute ? '' : 'bg-gray-50 dark:bg-[#0c1017] transition-colors duration-300'}`}>
      {!isAppRoute && <Navbar />}
      
      <div className={`flex-1 relative flex flex-col ${!isAppRoute && 'overflow-x-hidden'}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname.split('/')[1] || '/'}>
            <Route path="/" element={<Home />} />
            <Route path="/tech" element={<Tech />} />
            
            {/* Redirect old dashboard link to the new app index */}
            <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
            
            <Route path="/app" element={<AppLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dash />} />
                <Route path="map" element={<LiveMap />} />
                <Route path="signals" element={<Signals />} />
                <Route path="emergency" element={<Emergency />} />
                <Route path="analytics" element={<Analytics />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
