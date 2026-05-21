import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const CustomerMenu: React.FC = () => {
  const menuItems = [
    { id: 1, name: 'Truffle Pasta', price: '$24.00', category: 'Mains', desc: 'Handmade pasta with black truffle shavings.' },
    { id: 2, name: 'Ribeye Steak', price: '$42.00', category: 'Mains', desc: '12oz prime ribeye, garlic mash, asparagus.' },
    { id: 3, name: 'Caesar Salad', price: '$14.00', category: 'Starters', desc: 'Crisp romaine, parmesan, house croutons.' },
    { id: 4, name: 'Vegan Burger', price: '$18.00', category: 'Mains', desc: 'Plant-based patty, vegan cheddar, fries.' },
    { id: 5, name: 'Margherita Pizza', price: '$20.00', category: 'Mains', desc: 'San Marzano tomatoes, fresh mozzarella, basil.' },
    { id: 6, name: 'Lemonade', price: '$5.00', category: 'Drinks', desc: 'Freshly squeezed lemon, mint.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>Our Menu</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Explore our delicious offerings and add to your order.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {menuItems.map((item, idx) => (
          <motion.div 
            key={item.id}
            className="glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div className="flex-between">
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', background: 'rgba(59, 130, 246, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '12px' }}>
                {item.category}
              </span>
              <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{item.price}</span>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{item.name}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>

            <button className="glass-button secondary" style={{ marginTop: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Plus size={18} /> Add to Order
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CustomerMenu;
