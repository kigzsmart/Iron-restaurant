import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Clock, X, FileText, CalendarCheck } from 'lucide-react';

interface TableData {
  id: string;
  capacity: number;
  status: 'occupied' | 'available' | 'reserved';
  time: string;
  pax: number;
  orders?: string[];
}

const FloorManagement: React.FC = () => {
  const [tables, setTables] = useState<TableData[]>([
    { id: 'T01', capacity: 2, status: 'occupied', time: '45m', pax: 2, orders: ['1x Truffle Pasta', '2x Lemonade'] },
    { id: 'T02', capacity: 2, status: 'available', time: '', pax: 0 },
    { id: 'T03', capacity: 4, status: 'reserved', time: 'in 15m', pax: 4 },
    { id: 'T04', capacity: 4, status: 'occupied', time: '1h 20m', pax: 3, orders: ['3x Vegan Burger', '1x Fries'] },
    { id: 'T05', capacity: 6, status: 'available', time: '', pax: 0 },
    { id: 'T06', capacity: 6, status: 'occupied', time: '10m', pax: 5, orders: ['2x Margherita Pizza'] },
    { id: 'T07', capacity: 2, status: 'available', time: '', pax: 0 },
    { id: 'T08', capacity: 8, status: 'occupied', time: '5m', pax: 8, orders: ['8x Ribeye Steak', '4x Red Wine'] },
  ]);

  const [selectedTable, setSelectedTable] = useState<TableData | null>(null);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'occupied': return 'var(--danger)';
      case 'available': return 'var(--success)';
      case 'reserved': return 'var(--warning)';
      default: return 'var(--text-muted)';
    }
  };

  const markTableAvailable = () => {
    if (!selectedTable) return;
    setTables(prev => prev.map(t => t.id === selectedTable.id ? { ...t, status: 'available', pax: 0, time: '', orders: [] } : t));
    setSelectedTable(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}
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
            onClick={() => setSelectedTable(table)}
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

      {/* Table Details Modal */}
      <AnimatePresence>
        {selectedTable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={() => setSelectedTable(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="glass-panel"
              style={{ width: '100%', maxWidth: '400px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div className="flex-between">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <h2 style={{ margin: 0 }}>Table {selectedTable.id}</h2>
                  <span style={{ 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '12px', 
                    fontSize: '0.75rem',
                    background: selectedTable.status === 'occupied' ? 'rgba(239, 68, 68, 0.2)' : 
                                selectedTable.status === 'reserved' ? 'rgba(245, 158, 11, 0.2)' : 
                                'rgba(16, 185, 129, 0.2)',
                    color: getStatusColor(selectedTable.status),
                    textTransform: 'capitalize'
                  }}>
                    {selectedTable.status}
                  </span>
                </div>
                <button onClick={() => setSelectedTable(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="flex-between" style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <User size={18} /> Capacity
                  </div>
                  <span style={{ fontWeight: 500 }}>{selectedTable.capacity} Persons</span>
                </div>

                {selectedTable.status === 'occupied' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      <FileText size={18} /> Current Order
                    </div>
                    {selectedTable.orders?.map((order, i) => (
                      <div key={i} style={{ fontSize: '0.875rem' }}>• {order}</div>
                    ))}
                  </div>
                )}

                {selectedTable.status === 'reserved' && (
                  <div className="flex-between" style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                      <CalendarCheck size={18} /> Reservation In
                    </div>
                    <span style={{ fontWeight: 500 }}>{selectedTable.time}</span>
                  </div>
                )}
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                {selectedTable.status !== 'available' && (
                  <button className="glass-button secondary" style={{ flex: 1 }} onClick={markTableAvailable}>
                    Clear Table
                  </button>
                )}
                {selectedTable.status === 'available' && (
                  <button className="glass-button" style={{ flex: 1 }} onClick={() => {
                    setTables(prev => prev.map(t => t.id === selectedTable.id ? { ...t, status: 'occupied', pax: 2, time: 'Just now', orders: [] } : t));
                    setSelectedTable(null);
                  }}>
                    Seat Guests
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FloorManagement;
