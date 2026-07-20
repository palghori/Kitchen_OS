'use client';
import { useState } from 'react';

export default function ProcurementHub() {
  const [activeTab, setActiveTab] = useState('orders');

  const recommendations = [
    { ingredient: 'Truffle Mayo', currentStock: 2, reorderPoint: 5, recommendedOrderQuantity: 8, preferredSupplier: 'Sysco Foods', estimatedUnitCost: 45.00 },
    { ingredient: 'Angus Beef Patties', currentStock: 50, reorderPoint: 100, recommendedOrderQuantity: 150, preferredSupplier: 'Prime Meats Inc', estimatedUnitCost: 2.50 }
  ];

  const purchaseOrders = [
    { id: 'PO-2023-089', supplier: 'Sysco Foods', totalAmount: 450.00, expectedDate: '2023-10-25', status: 'ISSUED' },
    { id: 'PO-2023-088', supplier: 'Prime Meats Inc', totalAmount: 1250.00, expectedDate: '2023-10-24', status: 'FULFILLED' }
  ];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', color: '#111827', padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Procurement Hub</h1>
          <p style={{ color: '#6B7280', marginTop: '4px' }}>Manage Vendors, Purchase Orders, and Receiving</p>
        </div>
        <button style={{ backgroundColor: '#2563EB', color: '#fff', padding: '10px 20px', borderRadius: '6px', border: 'none', fontWeight: 500, cursor: 'pointer' }}>
          + Draft Purchase Order
        </button>
      </header>

      {/* AI Recommendations Panel */}
      <div style={{ backgroundColor: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: '8px', padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '20px' }}>✨</span>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#3730A3' }}>AI Purchase Recommendations</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {recommendations.map((rec, i) => (
            <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #E0E7FF', borderRadius: '6px', padding: '16px' }}>
              <div style={{ fontWeight: 600, marginBottom: '8px' }}>{rec.ingredient}</div>
              <div style={{ fontSize: '13px', color: '#4B5563', marginBottom: '4px' }}>Current Stock: <span style={{ color: '#DC2626', fontWeight: 500 }}>{rec.currentStock}</span> (Reorder: {rec.reorderPoint})</div>
              <div style={{ fontSize: '13px', color: '#4B5563', marginBottom: '12px' }}>Suggested Order: <span style={{ fontWeight: 600 }}>{rec.recommendedOrderQuantity} units</span> @ ${rec.estimatedUnitCost.toFixed(2)}/ea</div>
              <button style={{ width: '100%', padding: '8px', backgroundColor: '#4F46E5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Auto-Draft PO to {rec.preferredSupplier}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderBottom: '1px solid #E5E7EB', marginBottom: '24px' }}>
        <nav style={{ display: 'flex', gap: '32px' }}>
          {['orders', 'vendors', 'invoices'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ 
                padding: '12px 0', backgroundColor: 'transparent', border: 'none', borderBottom: activeTab === tab ? '2px solid #2563EB' : '2px solid transparent',
                color: activeTab === tab ? '#2563EB' : '#6B7280', fontWeight: activeTab === tab ? 600 : 400, cursor: 'pointer', textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'orders' && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <tr>
                <th style={{ padding: '12px 24px', color: '#6B7280', fontWeight: 500, fontSize: '13px' }}>PO Number</th>
                <th style={{ padding: '12px 24px', color: '#6B7280', fontWeight: 500, fontSize: '13px' }}>Supplier</th>
                <th style={{ padding: '12px 24px', color: '#6B7280', fontWeight: 500, fontSize: '13px' }}>Expected Date</th>
                <th style={{ padding: '12px 24px', color: '#6B7280', fontWeight: 500, fontSize: '13px' }}>Total Amount</th>
                <th style={{ padding: '12px 24px', color: '#6B7280', fontWeight: 500, fontSize: '13px' }}>Status</th>
                <th style={{ padding: '12px 24px', color: '#6B7280', fontWeight: 500, fontSize: '13px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map(po => (
                <tr key={po.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 500 }}>{po.id}</td>
                  <td style={{ padding: '16px 24px' }}>{po.supplier}</td>
                  <td style={{ padding: '16px 24px' }}>{po.expectedDate}</td>
                  <td style={{ padding: '16px 24px' }}>${po.totalAmount.toFixed(2)}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: 500,
                      backgroundColor: po.status === 'FULFILLED' ? '#D1FAE5' : '#FEF3C7',
                      color: po.status === 'FULFILLED' ? '#065F46' : '#92400E'
                    }}>
                      {po.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {po.status === 'ISSUED' && (
                      <button style={{ color: '#2563EB', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                        Log GRN
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
