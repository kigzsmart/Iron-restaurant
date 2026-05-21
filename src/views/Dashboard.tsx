import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Total Revenue', value: '$4,289.00', icon: <DollarSign size={24} color="var(--success)" />, change: '+12.5%' },
    { title: 'Active Orders', value: '24', icon: <Clock size={24} color="var(--warning)" />, change: '+4.2%' },
    { title: 'Total Guests', value: '142', icon: <Users size={24} color="var(--primary)" />, change: '+18.1%' },
    { title: 'Occupancy Rate', value: '86%', icon: <TrendingUp size={24} color="var(--accent)" />, change: '+2.4%' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <div className="flex-between">
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back! Here's what's happening today.</p>
        </div>
        <button className="glass-button">Generate Report</button>
      </div>

      <div className="grid-3">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            className="glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{stat.title}</h3>
              {stat.icon}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <h2 style={{ fontSize: '2rem' }}>{stat.value}</h2>
              <span style={{ color: 'var(--success)', fontSize: '0.875rem', fontWeight: 500 }}>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="glass-card" style={{ minHeight: '300px' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Revenue Analytics</h3>
          <div style={{ 
            height: '200px', 
            background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 100%)',
            borderBottom: '2px solid var(--primary)',
            borderRadius: '8px 8px 0 0',
            position: 'relative'
          }}>
            {/* Placeholder for a chart */}
            <div className="flex-center" style={{ height: '100%', color: 'var(--text-muted)' }}>
              Chart visualization would go here
            </div>
          </div>
        </div>
        
        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: i !== 4 ? '1px solid var(--glass-border)' : 'none' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>Table {i + 12} order completed</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{i * 10} minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
