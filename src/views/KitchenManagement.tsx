import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle } from 'lucide-react';

const KitchenManagement: React.FC = () => {
  const columns = [
    { id: 'new', title: 'New Orders', color: 'var(--primary)' },
    { id: 'cooking', title: 'Cooking', color: 'var(--warning)' },
    { id: 'ready', title: 'Ready to Serve', color: 'var(--success)' }
  ];

  const mockOrders = [
    { id: '1042', status: 'new', items: ['2x Truffle Pasta', '1x Caesar Salad'], time: '2 mins ago', table: '12' },
    { id: '1043', status: 'new', items: ['1x Ribeye Steak', '1x Garlic Mash'], time: 'Just now', table: '04' },
    { id: '1039', status: 'cooking', items: ['3x Vegan Burger', '3x Sweet Potato Fries'], time: '12 mins ago', table: '08' },
    { id: '1035', status: 'ready', items: ['1x Margherita Pizza', '2x Lemonade'], time: '18 mins ago', table: '15' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}
    >
      <div className="flex-between">
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Kitchen Management</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Real-time order tracking and fulfillment.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', flex: 1 }}>
        {columns.map(col => (
          <div key={col.id} className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: col.color }}></div>
              <h3 style={{ fontSize: '1rem' }}>{col.title}</h3>
              <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem' }}>
                {mockOrders.filter(o => o.status === col.id).length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
              {mockOrders.filter(o => o.status === col.id).map((order, idx) => (
                <motion.div 
                  key={order.id}
                  className="glass-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  style={{ cursor: 'grab', padding: '1rem' }}
                >
                  <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 'bold' }}>#{order.id}</span>
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>Table {order.table}</span>
                  </div>
                  
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {order.items.map((item, i) => (
                      <li key={i} style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-secondary)' }}></span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex-between" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', borderTop: '1px solid var(--glass-border)', paddingTop: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={14} />
                      {order.time}
                    </div>
                    {col.id !== 'ready' && (
                      <button style={{ background: 'none', border: 'none', color: 'var(--success)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <CheckCircle size={14} />
                        Move
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default KitchenManagement;
