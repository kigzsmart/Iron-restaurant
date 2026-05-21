import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import KitchenManagement from './views/KitchenManagement';
import FloorManagement from './views/FloorManagement';
import GuestManagement from './views/GuestManagement';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  return (
    <Router>
      <div id="root">
        <Sidebar />
        <main className="view-container">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/kitchen" element={<KitchenManagement />} />
              <Route path="/floor" element={<FloorManagement />} />
              <Route path="/guests" element={<GuestManagement />} />
            </Routes>
          </AnimatePresence>
        </main>
        <AIAssistant />
      </div>
    </Router>
  );
};

export default App;
