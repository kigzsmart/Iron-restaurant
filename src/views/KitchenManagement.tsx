import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle } from 'lucide-react';

interface Order {
  id: string;
  status: 'new' | 'cooking' | 'ready';
  items: string[];
  time: string;
  table: string;
}

const KitchenManagement: React.FC = () => {
  const columns: { id: 'new' | 'cooking' | 'ready', title: string, color: string }[] = [
    { id: 'new', title: 'New Orders', color: 'var(--primary)' },
    { id: 'cooking', title: 'Cooking', color: 'var(--warning)' },
    { id: 'ready', title: 'Ready to Serve', color: 'var(--success)' }
  ];

  const [orders, setOrders] = useState<Order[]>([
    { 
      id: '1042', status: 'new', time: '2 mins ago', table: '12',
      items: [
        '1x Signature Ribeye Steak\n  - Medium Rare\n  - Base: Sweet Potato Fries\n  + Peppercorn Sauce', 
        '1x Craft Lemonade\n  - Size: Large\n  - Less Ice'
      ] 
    },
    { 
      id: '1043', status: 'new', time: 'Just now', table: '04',
      items: [
        '2x Build-Your-Own Burger\n  - Protein: Beef Patty\n  - Cheese: Swiss\n  + Crispy Bacon',
        '1x Truffle Parmesan Fries\n  - Dipping Sauce: Garlic Aioli'
      ] 
    },
    { 
      id: '1039', status: 'cooking', time: '12 mins ago', table: '08',
      items: [
        '1x Spicy Vodka Pasta\n  - Spice Level: Extra Hot\n  + Burrata',
        '1x House Cabernet Sauvignon\n  - Serving: Bottle'
      ] 
    },
    { 
      id: '1035', status: 'ready', time: '18 mins ago', table: '15',
      items: [
        '2x Molten Chocolate Cake\n  - Gelato: Salted Caramel', 
        '1x Classic Tiramisu'
      ] 
    },
  ]);

  const moveOrder = (orderId: string, currentStatus: string) => {
    let nextStatus: 'new' | 'cooking' | 'ready' = 'cooking';
    if (currentStatus === 'new') nextStatus = 'cooking';
    if (currentStatus === 'cooking') nextStatus = 'ready';

    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
  };

  const removeOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

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
                {orders.filter(o => o.status === col.id).length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
              <AnimatePresence>
                {orders.filter(o => o.status === col.id).map((order) => (
                  <motion.div 
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="glass-card"
                    style={{ padding: '1rem' }}
                  >
                    <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: 'bold' }}>#{order.id}</span>
                      <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>Table {order.table}</span>
                    </div>
                    
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {order.items.map((item, i) => (
                        <li key={i} style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-secondary)', marginTop: '0.4rem', flexShrink: 0 }}></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex-between" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', borderTop: '1px solid var(--glass-border)', paddingTop: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={14} />
                        {order.time}
                      </div>
                      
                      {col.id !== 'ready' ? (
                        <button 
                          onClick={() => moveOrder(order.id, order.status)}
                          style={{ background: 'none', border: 'none', color: 'var(--success)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 500 }}
                        >
                          <CheckCircle size={14} />
                          Move
                        </button>
                      ) : (
                        <button 
                          onClick={() => removeOrder(order.id)}
                          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 500 }}
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default KitchenManagement;
