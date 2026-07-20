'use client';
import { useState } from 'react';

export default function InventoryDashboard() {
  const [stock] = useState([
    { id: '1', item: 'Angus Beef Patties', batch: 'B-291', qty: 45, unit: 'kg', expiry: '2026-07-20', status: 'CRITICAL' },
    { id: '2', item: 'Truffle Mayo', batch: 'B-288', qty: 12, unit: 'kg', expiry: '2026-08-15', status: 'LOW_STOCK' },
    { id: '3', item: 'Brioche Buns', batch: 'B-301', qty: 500, unit: 'unit', expiry: '2026-07-22', status: 'HEALTHY' }
  ]);

  return (
    <div style={{ padding: '32px', backgroundColor: '#F7F9FC', minHeight: '100vh', color: '#1A1F36' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px' }}>Inventory Management</h1>
          <p style={{ color: '#697386' }}>Real-time stock valuation and tracking</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button style={{ padding: '10px 16px', background: '#fff', border: '1px solid #D1D5DB', borderRadius: '4px', cursor: 'pointer' }}>Record Waste</button>
          <a href="/inventory/procurement" style={{ padding: '10px 16px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '4px', textDecoration: 'none' }}>Procurement ↗</a>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
          <div style={{ color: '#697386', marginBottom: '8px' }}>Total Stock Value</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>$12,450.50</div>
        </div>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '2px solid #F59E0B' }}>
          <div style={{ color: '#697386', marginBottom: '8px' }}>Low Stock Items</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#D97706' }}>3 Alerts</div>
        </div>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '2px solid #EF4444' }}>
          <div style={{ color: '#697386', marginBottom: '8px' }}>Expiring Batches (&lt; 7 Days)</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#EF4444' }}>5 Batches</div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '24px' }}>Active Stock (FIFO View)</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#697386' }}>
              <th style={{ padding: '12px 0' }}>Item</th>
              <th style={{ padding: '12px 0' }}>Batch Number</th>
              <th style={{ padding: '12px 0' }}>Quantity</th>
              <th style={{ padding: '12px 0' }}>Expiry Date</th>
              <th style={{ padding: '12px 0' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {stock.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '16px 0', fontWeight: 500 }}>{s.item}</td>
                <td style={{ padding: '16px 0', fontFamily: 'monospace' }}>{s.batch}</td>
                <td style={{ padding: '16px 0' }}>{s.qty} {s.unit}</td>
                <td style={{ padding: '16px 0', color: s.status === 'CRITICAL' ? '#EF4444' : 'inherit' }}>{s.expiry}</td>
                <td style={{ padding: '16px 0' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600,
                    background: s.status === 'HEALTHY' ? '#D1FAE5' : s.status === 'LOW_STOCK' ? '#FEF3C7' : '#FEE2E2',
                    color: s.status === 'HEALTHY' ? '#065F46' : s.status === 'LOW_STOCK' ? '#92400E' : '#991B1B'
                  }}>
                    {s.status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
