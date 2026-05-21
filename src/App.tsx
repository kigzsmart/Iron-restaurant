import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

// Manager Views
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import KitchenManagement from './views/KitchenManagement';
import FloorManagement from './views/FloorManagement';
import GuestManagement from './views/GuestManagement';
import AIAssistant from './components/AIAssistant';

// Customer Views
import CustomerSidebar from './components/CustomerSidebar';
import CustomerMenu from './views/customer/CustomerMenu';
import CustomerOrder from './views/customer/CustomerOrder';

const AnimatedRoutes = ({ mode }: { mode: 'manager' | 'customer' }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {mode === 'manager' ? (
          <>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/kitchen" element={<KitchenManagement />} />
            <Route path="/floor" element={<FloorManagement />} />
            <Route path="/guests" element={<GuestManagement />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/menu" replace />} />
            <Route path="/menu" element={<CustomerMenu />} />
            <Route path="/my-order" element={<CustomerOrder />} />
            <Route path="*" element={<Navigate to="/menu" replace />} />
          </>
        )}
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [mode, setMode] = useState<'manager' | 'customer'>('manager');

  const toggleMode = () => {
    setMode(prev => prev === 'manager' ? 'customer' : 'manager');
  };

  return (
    <Router>
      <div className="app-layout">
        {mode === 'manager' ? <Sidebar /> : <CustomerSidebar />}
        <main className="view-container" style={{ position: 'relative' }}>
          
          {/* View Switcher Toggle */}
          <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', zIndex: 10 }}>
            <motion.button 
              className="glass-button secondary" 
              onClick={toggleMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={16} />
              Switch to {mode === 'manager' ? 'Customer' : 'Manager'} View
            </motion.button>
          </div>

          <div style={{ paddingTop: '3rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <AnimatedRoutes mode={mode} />
          </div>
        </main>
        {mode === 'manager' && <AIAssistant />}
      </div>
    </Router>
  );
};

export default App;
