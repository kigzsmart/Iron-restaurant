import React from 'react';
import { NavLink } from 'react-router-dom';
import { Utensils, ReceiptText } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerSidebar: React.FC = () => {
  const menuItems = [
    { path: '/menu', name: 'Menu', icon: <Utensils size={20} /> },
    { path: '/my-order', name: 'My Order', icon: <ReceiptText size={20} /> },
  ];

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="glass-panel"
      style={{
        width: '250px',
        height: 'calc(100vh - 2rem)',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem',
      }}
    >
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--success), var(--primary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          IR
        </div>
        <h2 style={{ fontSize: '1.25rem', margin: 0 }} className="text-gradient">Guest View</h2>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              textDecoration: 'none',
              color: isActive ? 'white' : 'var(--text-secondary)',
              background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              transition: 'all 0.2s ease'
            })}
          >
            {item.icon}
            <span style={{ fontWeight: 500 }}>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </motion.div>
  );
};

export default CustomerSidebar;
