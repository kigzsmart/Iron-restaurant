import React from 'react';
import { motion } from 'framer-motion';
import { User, Clock } from 'lucide-react';

const FloorManagement: React.FC = () => {
  const tables = [
    { id: 'T01', capacity: 2, status: 'occupied', time: '45m', pax: 2 },
    { id: 'T02', capacity: 2, status: 'available', time: '', pax: 0 },
    { id: 'T03', capacity: 4, status: 'reserved', time: 'in 15m', pax: 4 },
    { id: 'T04', capacity: 4, status: 'occupied', time: '1h 20m', pax: 3 },
    { id: 'T05', capacity: 6, status: 'available', time: '', pax: 0 },
    { id: 'T06', capacity: 6, status: 'occupied', time: '10m', pax: 5 },
    { id: 'T07', capacity: 2, status: 'available', time: '', pax: 0 },
    { id: 'T08', capacity: 8, status: 'occupied', time: '5m', pax: 8 },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'occupied': return 'var(--danger)';
      case 'available': return 'var(--success)';
      case 'reserved': return 'var(--warning)';
      default: return 'var(--text-muted)';
    }
  };

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
          <h1 style={{ marginBottom: '0.5rem' }}>Floor Management</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Interactive table and seating arrangement.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success)' }}></div>
            Available
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--danger)' }}></div>
            Occupied
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--warning)' }}></div>
            Reserved
          </div>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {tables.map((table, idx) => (
          <motion.div
            key={table.id}
            className="glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            style={{ 
              position: 'relative', 
              overflow: 'hidden', 
              borderTop: `4px solid ${getStatusColor(table.status)}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <div className="flex-between" style={{ width: '100%' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{table.id}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
                <User size={16} />
                <span>{table.capacity}</span>
              </div>
            </div>

            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px dashed ${getStatusColor(table.status)}`
            }}>
              {table.status === 'occupied' && (
                <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold' }}>{table.pax}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pax</span>
                </div>
              )}
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', height: '20px' }}>
              {table.status !== 'available' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <Clock size={14} />
                  {table.time}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FloorManagement;
