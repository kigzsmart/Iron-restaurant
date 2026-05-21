import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ShoppingBag, Check } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  desc: string;
  options?: { name: string; choices: string[] }[];
  addons?: { name: string; price: number }[];
}

const menuItems: MenuItem[] = [
  { 
    id: 1, name: 'Truffle Pasta', price: 24.00, category: 'Mains', desc: 'Handmade pasta with black truffle shavings.',
    addons: [{ name: 'Extra Truffle', price: 5.00 }, { name: 'Gluten Free Pasta', price: 2.00 }]
  },
  { 
    id: 2, name: 'Ribeye Steak', price: 42.00, category: 'Mains', desc: '12oz prime ribeye, garlic mash, asparagus.',
    options: [{ name: 'Doneness', choices: ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done'] }],
    addons: [{ name: 'Peppercorn Sauce', price: 3.00 }, { name: 'Garlic Butter', price: 2.00 }]
  },
  { id: 3, name: 'Caesar Salad', price: 14.00, category: 'Starters', desc: 'Crisp romaine, parmesan, house croutons.' },
  { id: 4, name: 'Vegan Burger', price: 18.00, category: 'Mains', desc: 'Plant-based patty, vegan cheddar, fries.' },
  { id: 5, name: 'Margherita Pizza', price: 20.00, category: 'Mains', desc: 'San Marzano tomatoes, fresh mozzarella, basil.' },
  { 
    id: 6, name: 'Lemonade', price: 5.00, category: 'Drinks', desc: 'Freshly squeezed lemon, mint.',
    options: [{ name: 'Size', choices: ['Regular', 'Large (+$2.00)'] }]
  },
];

const CustomerMenu: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setSelectedItem(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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
          <h1 style={{ marginBottom: '0.5rem' }}>Our Menu</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Explore our delicious offerings and add to your order.</p>
        </div>
        <button className="glass-button">
          <ShoppingBag size={20} />
          Cart ({cartCount})
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {menuItems.map((item, idx) => (
          <motion.div 
            key={item.id}
            className="glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer' }}
            onClick={() => setSelectedItem(item)}
          >
            <div className="flex-between">
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', background: 'rgba(59, 130, 246, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '12px' }}>
                {item.category}
              </span>
              <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>${item.price.toFixed(2)}</span>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{item.name}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>

            <button 
              className="glass-button secondary" 
              style={{ marginTop: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}
              onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
            >
              <Plus size={18} /> Customize & Add
            </button>
          </motion.div>
        ))}
      </div>

      {/* Customisation Modal */}
      <AnimatePresence>
        {selectedItem && (
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
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="glass-panel"
              style={{ width: '100%', maxWidth: '500px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div className="flex-between">
                <h2>{selectedItem.name}</h2>
                <button onClick={() => setSelectedItem(null)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginTop: '-1rem' }}>{selectedItem.desc}</p>

              {selectedItem.options?.map((opt, i) => (
                <div key={i}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>{opt.name}</label>
                  <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', outline: 'none' }}>
                    {opt.choices.map((c, j) => <option key={j} value={c}>{c}</option>)}
                  </select>
                </div>
              ))}

              {selectedItem.addons?.length ? (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Add-ons</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedItem.addons.map((addon, i) => (
                      <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" />
                        <span>{addon.name} (+${addon.price.toFixed(2)})</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="flex-between" style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${selectedItem.price.toFixed(2)}</span>
                <button className="glass-button" onClick={handleAddToCart}>
                  <ShoppingBag size={18} /> Add to Order
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: '50%',
              background: 'var(--success)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
              zIndex: 1000,
              fontWeight: 500
            }}
          >
            <Check size={20} /> Item seamlessly added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomerMenu;
