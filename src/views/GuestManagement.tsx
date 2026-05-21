import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, MoreHorizontal, UserPlus, Check } from 'lucide-react';

const GuestManagement: React.FC = () => {
  const initialGuests = [
    { id: 1, name: 'Alice Freeman', status: 'Seated', time: '7:00 PM', partySize: 2, contact: '+1 234 567 8900' },
    { id: 2, name: 'Bob Smith', status: 'Waiting', time: '7:30 PM', partySize: 4, contact: '+1 987 654 3210' },
    { id: 3, name: 'Charlie Davis', status: 'Reserved', time: '8:00 PM', partySize: 6, contact: '+1 555 123 4567' },
    { id: 4, name: 'Diana Prince', status: 'Reserved', time: '8:30 PM', partySize: 2, contact: '+1 444 987 6543' },
  ];

  const [guests, setGuests] = useState(initialGuests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [showToast, setShowToast] = useState(false);

  const filteredGuests = guests.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || 
                          (filter === 'Waitlist' && g.status === 'Waiting') || 
                          (filter === 'Reservations' && g.status === 'Reserved');
    return matchesSearch && matchesFilter;
  });

  const handleNewReservation = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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
          <h1 style={{ marginBottom: '0.5rem' }}>Guest Management</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage reservations and waitlist.</p>
        </div>
        <button className="glass-button" onClick={handleNewReservation}>
          <Plus size={20} />
          New Reservation
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'rgba(0,0,0,0.2)', 
            padding: '0.5rem 1rem', 
            borderRadius: '8px',
            border: '1px solid var(--glass-border)',
            width: '300px'
          }}>
            <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
            <input 
              type="text" 
              placeholder="Search guests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'white', 
                outline: 'none',
                width: '100%'
              }} 
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['All', 'Waitlist', 'Reservations'].map(tab => (
              <button 
                key={tab}
                className={filter === tab ? "glass-button" : "glass-button secondary"}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {filteredGuests.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No guests found matching your criteria.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem 0', fontWeight: 500 }}>Guest Name</th>
                <th style={{ padding: '1rem 0', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '1rem 0', fontWeight: 500 }}>Time</th>
                <th style={{ padding: '1rem 0', fontWeight: 500 }}>Party Size</th>
                <th style={{ padding: '1rem 0', fontWeight: 500 }}>Contact</th>
                <th style={{ padding: '1rem 0', fontWeight: 500, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map((guest, idx) => (
                <motion.tr 
                  key={guest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <td style={{ padding: '1rem 0', fontWeight: 500 }}>{guest.name}</td>
                  <td style={{ padding: '1rem 0' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '12px', 
                      fontSize: '0.875rem',
                      background: guest.status === 'Seated' ? 'rgba(16, 185, 129, 0.2)' : 
                                 guest.status === 'Waiting' ? 'rgba(245, 158, 11, 0.2)' : 
                                 'rgba(59, 130, 246, 0.2)',
                      color: guest.status === 'Seated' ? 'var(--success)' : 
                             guest.status === 'Waiting' ? 'var(--warning)' : 
                             'var(--primary)'
                    }}>
                      {guest.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 0', color: 'var(--text-secondary)' }}>{guest.time}</td>
                  <td style={{ padding: '1rem 0', color: 'var(--text-secondary)' }}>{guest.partySize} Pax</td>
                  <td style={{ padding: '1rem 0', color: 'var(--text-secondary)' }}>{guest.contact}</td>
                  <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}>
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

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
              background: 'var(--primary)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
              zIndex: 1000,
              fontWeight: 500
            }}
          >
            <UserPlus size={20} /> New Reservation Modal Opened! (Simulation)
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GuestManagement;
