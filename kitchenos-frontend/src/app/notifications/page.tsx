'use client';
import { useState } from 'react';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'INVENTORY', title: 'Critical Stock Alert', message: 'Truffle Mayo is below the 5-unit reorder point.', time: '10 mins ago', isRead: false },
    { id: '2', type: 'ORDER', title: 'Prep Time Exceeded', message: 'Order #4502 (Burger Co) has exceeded the 15m prep target.', time: '1 hour ago', isRead: false },
    { id: '3', type: 'HR', title: 'Late Clock-in', message: 'John Doe missed the 08:00 AM shift start at Downtown Hub.', time: '3 hours ago', isRead: true },
    { id: '4', type: 'FINANCE', title: 'Invoice Overdue', message: 'Invoice INV-9912 to Sysco Foods is 2 days past due.', time: '1 day ago', isRead: true },
    { id: '5', type: 'SYSTEM', title: 'Vendor Delivery Arrived', message: 'PO-2023-089 has been received at the loading dock.', time: '2 days ago', isRead: true }
  ]);

  const [filter, setFilter] = useState('ALL');

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const filteredNotifications = filter === 'ALL' ? notifications : notifications.filter(n => n.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'INVENTORY': return { icon: '📦', color: '#F59E0B', bg: '#FEF3C7' };
      case 'ORDER': return { icon: '🔥', color: '#DC2626', bg: '#FEE2E2' };
      case 'HR': return { icon: '👥', color: '#2563EB', bg: '#DBEAFE' };
      case 'FINANCE': return { icon: '💰', color: '#10B981', bg: '#D1FAE5' };
      default: return { icon: '⚙️', color: '#6B7280', bg: '#F3F4F6' };
    }
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', color: '#111827', padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Notification Center</h1>
          <p style={{ color: '#6B7280', marginTop: '4px' }}>Centralized operational alerts</p>
        </div>
        <button 
          onClick={markAllAsRead}
          style={{ backgroundColor: 'transparent', color: '#2563EB', padding: '8px 16px', borderRadius: '6px', border: '1px solid #2563EB', fontWeight: 500, cursor: 'pointer' }}
        >
          Mark all as read
        </button>
      </header>

      <div style={{ display: 'flex', gap: '32px' }}>
        
        {/* Filter Sidebar */}
        <div style={{ width: '240px', flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['ALL', 'ORDER', 'INVENTORY', 'HR', 'FINANCE', 'SYSTEM'].map(t => (
              <button 
                key={t}
                onClick={() => setFilter(t)}
                style={{ 
                  textAlign: 'left', padding: '12px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 500,
                  backgroundColor: filter === t ? '#E0E7FF' : 'transparent',
                  color: filter === t ? '#4F46E5' : '#4B5563'
                }}
              >
                {t === 'ALL' ? 'All Alerts' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts Feed */}
        <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
          {filteredNotifications.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#6B7280' }}>
              No alerts in this category.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filteredNotifications.map(n => {
                const styleObj = getIcon(n.type);
                return (
                  <div key={n.id} style={{ 
                    padding: '20px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'flex-start', gap: '16px',
                    backgroundColor: n.isRead ? '#fff' : '#F8FAFC'
                  }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0, backgroundColor: styleObj.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                      {styleObj.icon}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                        <div style={{ fontWeight: 600, color: n.isRead ? '#4B5563' : '#111827' }}>{n.title}</div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{n.time}</div>
                      </div>
                      <div style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.5' }}>
                        {n.message}
                      </div>
                    </div>
                    
                    {!n.isRead && (
                      <button 
                        onClick={() => markAsRead(n.id)}
                        style={{ padding: '6px 12px', backgroundColor: 'transparent', color: '#2563EB', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}
                      >
                        Dismiss
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
