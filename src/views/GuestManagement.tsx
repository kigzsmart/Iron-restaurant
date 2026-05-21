import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MoreHorizontal } from 'lucide-react';

const GuestManagement: React.FC = () => {
  const guests = [
    { id: 1, name: 'Alice Freeman', status: 'Seated', time: '7:00 PM', partySize: 2, contact: '+1 234 567 8900' },
    { id: 2, name: 'Bob Smith', status: 'Waiting', time: '7:30 PM', partySize: 4, contact: '+1 987 654 3210' },
    { id: 3, name: 'Charlie Davis', status: 'Reserved', time: '8:00 PM', partySize: 6, contact: '+1 555 123 4567' },
    { id: 4, name: 'Diana Prince', status: 'Reserved', time: '8:30 PM', partySize: 2, contact: '+1 444 987 6543' },
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
          <h1 style={{ marginBottom: '0.5rem' }}>Guest Management</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage reservations and waitlist.</p>
        </div>
        <button className="glass-button">
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
            <button className="glass-button secondary">All</button>
            <button className="glass-button secondary">Waitlist</button>
            <button className="glass-button secondary">Reservations</button>
          </div>
        </div>

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
            {guests.map((guest, idx) => (
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
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default GuestManagement;
