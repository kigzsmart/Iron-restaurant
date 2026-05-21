import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, ChefHat } from 'lucide-react';

const CustomerOrder: React.FC = () => {
  const currentOrder = {
    status: 'cooking',
    items: [
      { name: 'Ribeye Steak', qty: 1, price: 42.00 },
      { name: 'Caesar Salad', qty: 1, price: 14.00 },
      { name: 'Lemonade', qty: 2, price: 10.00 }
    ],
    total: 66.00,
    estimatedTime: '15 mins'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Your Order</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Table 12</p>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          {/* Status Tracker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '500px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--success)' }}>
              <CheckCircle size={32} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Received</span>
            </div>
            <div style={{ flex: 1, height: '4px', background: 'var(--success)', borderRadius: '2px' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)' }}>
              <ChefHat size={32} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Cooking</span>
            </div>
            <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <Clock size={32} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Ready</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '0.5rem' }}>Order Details</h3>
          
          {currentOrder.items.map((item, idx) => (
            <div key={idx} className="flex-between">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.875rem' }}>{item.qty}x</span>
                <span style={{ fontWeight: 500 }}>{item.name}</span>
              </div>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
          
          <div className="flex-between" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', marginTop: '1rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Total</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>${currentOrder.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="glass-button" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
          Call Waiter
        </button>
      </div>
    </motion.div>
  );
};

export default CustomerOrder;
