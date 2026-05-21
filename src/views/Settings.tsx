import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Bell, Store, Shield } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: <Store size={18} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', name: 'Security', icon: <Shield size={18} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}
    >
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>Settings</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your restaurant preferences and account settings.</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Settings Sidebar */}
        <div className="glass-panel" style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                border: 'none',
                background: activeTab === tab.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                fontWeight: activeTab === tab.id ? 500 : 400
              }}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {activeTab === 'general' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Restaurant Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Restaurant Name</label>
                  <input type="text" defaultValue="Iron Restaurant" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Contact Email</label>
                  <input type="email" defaultValue="hello@ironrestaurant.com" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Currency</label>
                  <select style={inputStyle}>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Notification Preferences</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="flex-between">
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0' }}>New Order Alerts</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Receive a notification when a new order is placed.</p>
                  </div>
                  <ToggleSwitch defaultChecked={true} />
                </div>
                <div className="flex-between">
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0' }}>Reservation Alerts</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Receive alerts for upcoming reservations.</p>
                  </div>
                  <ToggleSwitch defaultChecked={true} />
                </div>
                <div className="flex-between">
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0' }}>Daily Summary</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Get a daily email summary of revenue and orders.</p>
                  </div>
                  <ToggleSwitch defaultChecked={false} />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Security Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Current Password</label>
                  <input type="password" placeholder="••••••••" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>New Password</label>
                  <input type="password" placeholder="••••••••" style={inputStyle} />
                </div>
              </div>
            </motion.div>
          )}

          <div style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="glass-button">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Reusable Styles & Components
const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid var(--glass-border)',
  borderRadius: '8px',
  padding: '0.75rem 1rem',
  color: 'white',
  outline: 'none',
  fontFamily: 'inherit'
};

const ToggleSwitch = ({ defaultChecked }: { defaultChecked: boolean }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div 
      onClick={() => setChecked(!checked)}
      style={{ 
        width: '44px', 
        height: '24px', 
        background: checked ? 'var(--primary)' : 'rgba(255,255,255,0.2)', 
        borderRadius: '12px', 
        position: 'relative', 
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ 
        width: '18px', 
        height: '18px', 
        background: 'white', 
        borderRadius: '50%', 
        position: 'absolute', 
        top: '3px', 
        left: checked ? '23px' : '3px', 
        transition: 'all 0.3s ease' 
      }}></div>
    </div>
  );
};

export default Settings;
