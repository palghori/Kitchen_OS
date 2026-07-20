'use client';
import { useState } from 'react';

export default function CRMDashboard() {
  const [customers, setCustomers] = useState([
    { id: 'CUST-1', name: 'Sarah Jenkins', phone: '+1 555-0192', email: 'sarah.j@example.com', ltv: 850.50, loyaltyPoints: 850, walletBalance: 15.00, segment: 'VIP', lastOrder: '2 days ago' },
    { id: 'CUST-2', name: 'Michael Chen', phone: '+1 555-8834', email: 'm.chen@example.com', ltv: 125.00, loyaltyPoints: 125, walletBalance: 0.00, segment: 'REGULAR', lastOrder: '14 days ago' },
    { id: 'CUST-3', name: 'Jessica Alba', phone: '+1 555-2231', email: 'jalba@example.com', ltv: 65.00, loyaltyPoints: 65, walletBalance: 0.00, segment: 'NEW', lastOrder: '5 days ago' },
    { id: 'CUST-4', name: 'David Smith', phone: '+1 555-9921', email: 'dsmith@example.com', ltv: 450.00, loyaltyPoints: 120, walletBalance: 5.00, segment: 'AT_RISK', lastOrder: '45 days ago' }
  ]);

  const [activeTab, setActiveTab] = useState('directory');

  const getSegmentBadge = (segment: string) => {
    switch(segment) {
      case 'VIP': return <span style={{ padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, backgroundColor: '#FEF3C7', color: '#92400E' }}>⭐ VIP</span>;
      case 'AT_RISK': return <span style={{ padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, backgroundColor: '#FEE2E2', color: '#991B1B' }}>⚠️ Churn Risk</span>;
      case 'NEW': return <span style={{ padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, backgroundColor: '#DBEAFE', color: '#1E40AF' }}>New</span>;
      default: return <span style={{ padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, backgroundColor: '#F3F4F6', color: '#374151' }}>Regular</span>;
    }
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', color: '#111827', padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Restaurant CRM</h1>
          <p style={{ color: '#6B7280', marginTop: '4px' }}>Customer Intelligence & Loyalty</p>
        </div>
        <button style={{ backgroundColor: '#4F46E5', color: '#fff', padding: '10px 20px', borderRadius: '6px', border: 'none', fontWeight: 500, cursor: 'pointer' }}>
          Generate Coupon
        </button>
      </header>

      {/* AI Insights Panel */}
      <div style={{ backgroundColor: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: '12px', padding: '24px', marginBottom: '32px', display: 'flex', gap: '24px', alignItems: 'center' }}>
        <div style={{ fontSize: '32px' }}>🧠</div>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#3730A3', marginBottom: '4px' }}>AI Retention Strategy</h2>
          <p style={{ fontSize: '14px', color: '#4338CA', margin: 0 }}>You have <strong>12 customers</strong> marked as "Churn Risk" this week. AI recommends sending a <strong>20% OFF</strong> win-back email campaign.</p>
        </div>
        <button style={{ marginLeft: 'auto', backgroundColor: '#3730A3', color: '#fff', padding: '8px 16px', borderRadius: '6px', border: 'none', fontWeight: 500, cursor: 'pointer' }}>
          Launch Campaign
        </button>
      </div>

      <div style={{ borderBottom: '1px solid #E5E7EB', marginBottom: '24px' }}>
        <nav style={{ display: 'flex', gap: '32px' }}>
          {['directory', 'segments', 'feedback'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ 
                padding: '12px 0', backgroundColor: 'transparent', border: 'none', borderBottom: activeTab === tab ? '2px solid #4F46E5' : '2px solid transparent',
                color: activeTab === tab ? '#4F46E5' : '#6B7280', fontWeight: activeTab === tab ? 600 : 400, cursor: 'pointer', textTransform: 'capitalize'
              }}
            >
              {tab === 'directory' ? 'Customer Directory' : tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'directory' && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <tr>
                <th style={{ padding: '16px 24px', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Customer</th>
                <th style={{ padding: '16px 24px', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Segment</th>
                <th style={{ padding: '16px 24px', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Lifetime Value</th>
                <th style={{ padding: '16px 24px', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Loyalty Points</th>
                <th style={{ padding: '16px 24px', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Wallet</th>
                <th style={{ padding: '16px 24px', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Last Order</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #E5E7EB', cursor: 'pointer', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontSize: '13px', color: '#6B7280' }}>{c.email}</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>{getSegmentBadge(c.segment)}</td>
                  <td style={{ padding: '16px 24px', fontWeight: 600, color: '#111827' }}>${c.ltv.toFixed(2)}</td>
                  <td style={{ padding: '16px 24px' }}>{c.loyaltyPoints}</td>
                  <td style={{ padding: '16px 24px', color: '#10B981', fontWeight: 500 }}>${c.walletBalance.toFixed(2)}</td>
                  <td style={{ padding: '16px 24px', color: '#6B7280', fontSize: '14px' }}>{c.lastOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
