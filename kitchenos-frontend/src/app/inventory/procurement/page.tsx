'use client';
import { useState } from 'react';

export default function ProcurementUI() {
  const [requests] = useState([
    { id: 'PO-2026-001', supplier: 'Sysco Foods', amount: 1250.00, status: 'PENDING', date: '2026-07-18' },
    { id: 'PO-2026-002', supplier: 'Local Veg Co.', amount: 450.75, status: 'APPROVED', date: '2026-07-17' },
    { id: 'PO-2026-003', supplier: 'Meat Master', amount: 3200.00, status: 'RECEIVED', date: '2026-07-15' },
  ]);

  return (
    <div style={{ padding: '32px', backgroundColor: '#F7F9FC', minHeight: '100vh', color: '#1A1F36' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px' }}>Procurement & Purchase Requests</h1>
          <p style={{ color: '#697386' }}>Manage supplier orders and restock</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="/inventory" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #D1D5DB', borderRadius: '4px', textDecoration: 'none', color: '#1A1F36' }}>Back to Inventory</a>
          <button style={{ padding: '10px 16px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+ Draft PO</button>
        </div>
      </header>

      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#697386' }}>
              <th style={{ padding: '12px 0' }}>PO Number</th>
              <th style={{ padding: '12px 0' }}>Supplier</th>
              <th style={{ padding: '12px 0' }}>Date</th>
              <th style={{ padding: '12px 0' }}>Total Amount</th>
              <th style={{ padding: '12px 0' }}>Status</th>
              <th style={{ padding: '12px 0' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '16px 0', fontFamily: 'monospace', fontWeight: 500 }}>{req.id}</td>
                <td style={{ padding: '16px 0' }}>{req.supplier}</td>
                <td style={{ padding: '16px 0' }}>{req.date}</td>
                <td style={{ padding: '16px 0' }}>${req.amount.toFixed(2)}</td>
                <td style={{ padding: '16px 0' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600,
                    background: req.status === 'RECEIVED' ? '#D1FAE5' : req.status === 'PENDING' ? '#FEF3C7' : '#DBEAFE',
                    color: req.status === 'RECEIVED' ? '#065F46' : req.status === 'PENDING' ? '#92400E' : '#1E40AF'
                  }}>
                    {req.status}
                  </span>
                </td>
                <td style={{ padding: '16px 0', color: 'var(--accent-primary)', cursor: 'pointer' }}>View Details</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
