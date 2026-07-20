'use client';
import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('organization');

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', color: '#111827', padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Settings</h1>
        <p style={{ color: '#6B7280', marginTop: '4px' }}>Manage Organization, Roles, and Audit Logs</p>
      </header>

      <div style={{ display: 'flex', gap: '32px' }}>
        
        {/* Sidebar */}
        <div style={{ width: '240px', flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['organization', 'users & roles', 'audit logs'].map(t => (
              <button 
                key={t}
                onClick={() => setActiveTab(t)}
                style={{ 
                  textAlign: 'left', padding: '12px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 500,
                  backgroundColor: activeTab === t ? '#E0E7FF' : 'transparent',
                  color: activeTab === t ? '#4F46E5' : '#4B5563', textTransform: 'capitalize'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '32px' }}>
          
          {activeTab === 'organization' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Organization Details</h2>
              <div style={{ display: 'grid', gap: '16px', maxWidth: '500px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Organization Name</label>
                  <input type="text" defaultValue="Burger Co. Enterprises" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Admin Email</label>
                  <input type="email" defaultValue="admin@burgerco.com" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                </div>
                <button style={{ backgroundColor: '#2563EB', color: '#fff', padding: '10px', borderRadius: '6px', border: 'none', fontWeight: 500, cursor: 'pointer', width: 'fit-content' }}>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'users & roles' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Team Members</h2>
                <button style={{ backgroundColor: '#2563EB', color: '#fff', padding: '8px 16px', borderRadius: '6px', border: 'none', fontWeight: 500, cursor: 'pointer' }}>
                  + Invite User
                </button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '13px' }}>
                    <th style={{ paddingBottom: '12px' }}>Name</th>
                    <th style={{ paddingBottom: '12px' }}>Role</th>
                    <th style={{ paddingBottom: '12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {['Alice - ADMIN', 'Bob - MANAGER', 'Charlie - STAFF'].map((u, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '16px 0', fontWeight: 500 }}>{u.split(' - ')[0]}</td>
                      <td style={{ padding: '16px 0' }}>
                        <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', backgroundColor: '#F3F4F6' }}>{u.split(' - ')[1]}</span>
                      </td>
                      <td style={{ padding: '16px 0', color: '#10B981' }}>Active</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'audit logs' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Security Audit Logs</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { action: 'POST /orders', user: 'Bob', time: '10 mins ago' },
                  { action: 'DELETE /inventory/batch-99', user: 'Alice', time: '1 hour ago' },
                  { action: 'POST /marketing/launch/promo', user: 'Alice', time: '2 hours ago' }
                ].map((log, i) => (
                  <div key={i} style={{ padding: '16px', border: '1px solid #E5E7EB', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontFamily: 'monospace' }}>{log.action}</div>
                      <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Performed by: {log.user}</div>
                    </div>
                    <div style={{ fontSize: '13px', color: '#9CA3AF' }}>{log.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
