import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ShoppingBag, Check, Trash2 } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  desc: string;
  options?: { name: string; choices: string[] }[];
  addons?: { name: string; price: number }[];
}

interface CartItem {
  id: string;
  menuItem: MenuItem;
  selections: Record<string, string>;
  selectedAddons: string[];
  totalPrice: number;
}

const menuItems: MenuItem[] = [
  // APPETIZERS
  { 
    id: 1, name: 'Truffle Parmesan Fries', price: 12.00, category: 'Appetizers', desc: 'Crispy thick-cut fries tossed in white truffle oil and parmesan.',
    options: [{ name: 'Dipping Sauce', choices: ['Garlic Aioli', 'Spicy Mayo', 'Ketchup', 'No Sauce'] }],
    addons: [{ name: 'Extra Truffle Oil', price: 2.00 }, { name: 'Add Bacon Bits', price: 3.00 }]
  },
  { id: 2, name: 'Crispy Calamari', price: 16.00, category: 'Appetizers', desc: 'Lightly dusted and fried, served with lemon herb tartare.',
    addons: [{ name: 'Extra Tartare Sauce', price: 1.50 }]
  },

  // MAINS
  { 
    id: 3, name: 'Signature Ribeye Steak', price: 45.00, category: 'Mains', desc: '14oz prime ribeye, garlic mash, grilled asparagus.',
    options: [
      { name: 'Doneness', choices: ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done'] },
      { name: 'Base', choices: ['Garlic Mash', 'Sweet Potato Fries', 'Steamed Veggies'] }
    ],
    addons: [{ name: 'Peppercorn Sauce', price: 3.00 }, { name: 'Garlic Butter', price: 2.00 }, { name: 'Grilled Shrimp (3)', price: 8.00 }]
  },
  { 
    id: 4, name: 'Build-Your-Own Burger', price: 18.00, category: 'Mains', desc: 'Premium beef or plant-based patty on a toasted brioche bun.',
    options: [
      { name: 'Protein', choices: ['Beef Patty', 'Vegan Patty', 'Grilled Chicken'] },
      { name: 'Cheese', choices: ['Cheddar', 'Swiss', 'Vegan Cheddar', 'No Cheese'] }
    ],
    addons: [{ name: 'Extra Patty', price: 6.00 }, { name: 'Avocado', price: 2.50 }, { name: 'Crispy Bacon', price: 3.00 }]
  },
  { 
    id: 5, name: 'Wild Mushroom Risotto', price: 26.00, category: 'Mains', desc: 'Arborio rice, porcini broth, shaved pecorino.',
    addons: [{ name: 'Grilled Chicken', price: 6.00 }, { name: 'Seared Scallops', price: 12.00 }]
  },
  { 
    id: 6, name: 'Spicy Vodka Pasta', price: 22.00, category: 'Mains', desc: 'Rigatoni in a creamy, spicy tomato vodka sauce.',
    options: [{ name: 'Spice Level', choices: ['Mild', 'Medium', 'Hot', 'Extra Hot'] }],
    addons: [{ name: 'Gluten-Free Pasta', price: 2.00 }, { name: 'Burrata', price: 6.00 }]
  },

  // SIDES
  { id: 7, name: 'Charred Asparagus', price: 9.00, category: 'Sides', desc: 'Grilled with lemon zest and olive oil.' },
  { id: 8, name: 'Mac & Cheese', price: 11.00, category: 'Sides', desc: 'Five-cheese blend baked with a breadcrumb crust.',
    addons: [{ name: 'Truffle Oil', price: 3.00 }]
  },

  // DESSERTS
  { 
    id: 9, name: 'Molten Chocolate Cake', price: 14.00, category: 'Desserts', desc: 'Warm chocolate center with a scoop of gelato.',
    options: [{ name: 'Gelato Flavor', choices: ['Vanilla Bean', 'Salted Caramel', 'Pistachio'] }]
  },
  { id: 10, name: 'Classic Tiramisu', price: 12.00, category: 'Desserts', desc: 'Espresso-soaked ladyfingers, mascarpone cream.' },

  // DRINKS
  { 
    id: 11, name: 'Craft Lemonade', price: 6.00, category: 'Drinks', desc: 'Freshly squeezed lemons with organic cane sugar.',
    options: [{ name: 'Size', choices: ['Regular', 'Large (+$2.00)'] }, { name: 'Ice Level', choices: ['Normal Ice', 'Less Ice', 'No Ice'] }]
  },
  { 
    id: 12, name: 'House Cabernet Sauvignon', price: 12.00, category: 'Drinks', desc: 'Full-bodied red wine with notes of blackberry.',
    options: [{ name: 'Serving', choices: ['Glass', 'Bottle (+$35.00)'] }]
  }
];

const CustomerMenu: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Modal State for currently configuring item
  const [currentSelections, setCurrentSelections] = useState<Record<string, string>>({});
  const [currentAddons, setCurrentAddons] = useState<Set<string>>(new Set());

  const openCustomizationModal = (item: MenuItem) => {
    setSelectedItem(item);
    setCurrentSelections({});
    setCurrentAddons(new Set());
  };

  const calculateCurrentItemPrice = () => {
    if (!selectedItem) return 0;
    let price = selectedItem.price;
    // Add size upcharge for Lemonade as a hardcoded example, or calculate based on options if data structure supported it.
    if (currentSelections['Size'] === 'Large (+$2.00)') price += 2;

    currentAddons.forEach(addonName => {
      const addonObj = selectedItem.addons?.find(a => a.name === addonName);
      if (addonObj) price += addonObj.price;
    });
    return price;
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;
    
    const newItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      menuItem: selectedItem,
      selections: { ...currentSelections },
      selectedAddons: Array.from(currentAddons),
      totalPrice: calculateCurrentItemPrice()
    };

    setCartItems(prev => [...prev, newItem]);
    setSelectedItem(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

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
        <button className="glass-button" onClick={() => setShowCart(true)}>
          <ShoppingBag size={20} />
          Cart ({cartItems.length})
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
            onClick={() => openCustomizationModal(item)}
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
              onClick={(e) => { e.stopPropagation(); openCustomizationModal(item); }}
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
                  <select 
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', outline: 'none' }}
                    onChange={e => setCurrentSelections(prev => ({ ...prev, [opt.name]: e.target.value }))}
                  >
                    <option value="" disabled selected>Select an option...</option>
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
                        <input 
                          type="checkbox" 
                          onChange={(e) => {
                            const newSet = new Set(currentAddons);
                            if (e.target.checked) newSet.add(addon.name);
                            else newSet.delete(addon.name);
                            setCurrentAddons(newSet);
                          }}
                        />
                        <span>{addon.name} (+${addon.price.toFixed(2)})</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="flex-between" style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${calculateCurrentItemPrice().toFixed(2)}</span>
                <button className="glass-button" onClick={handleAddToCart}>
                  <ShoppingBag size={18} /> Add to Order
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {showCart && (
          <>
            {/* Backdrop */}
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
              }}
              onClick={() => setShowCart(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="glass-panel"
              style={{
                position: 'fixed',
                top: 0, right: 0, bottom: 0,
                width: '100%', maxWidth: '400px',
                borderRadius: '16px 0 0 16px',
                zIndex: 1001,
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                margin: 0
              }}
            >
              <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h2 style={{ margin: 0 }}>Your Order</h2>
                <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {cartItems.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>Your cart is empty.</p>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.25rem 0' }}>{item.menuItem.name}</h4>
                        {Object.entries(item.selections).map(([k, v]) => (
                          <div key={k} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>- {v}</div>
                        ))}
                        {item.selectedAddons.map(addon => (
                          <div key={addon} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>+ {addon}</div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold' }}>${item.totalPrice.toFixed(2)}</span>
                        <button 
                          onClick={() => setCartItems(prev => prev.filter(c => c.id !== item.id))}
                          style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)', marginTop: 'auto' }}>
                <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>Total</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>${cartTotal.toFixed(2)}</span>
                </div>
                <button className="glass-button" style={{ width: '100%', justifyContent: 'center' }} disabled={cartItems.length === 0}>
                  Checkout
                </button>
              </div>
            </motion.div>
          </>
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
            <Check size={20} /> Item added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomerMenu;
