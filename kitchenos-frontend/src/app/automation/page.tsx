'use client';
import { useState } from 'react';

export default function AutomationBuilder() {
  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>No-Code Automation Builder</h1>
        <p style={{ color: '#6B7280' }}>Design custom IF/THEN rules for your kitchen operations.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Available Triggers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Inventory < 10kg', 'Order Delayed > 15m', 'Revenue > ₹50k', 'Vendor Delivery Arrived'].map(t => (
              <div key={t} style={{ padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px', cursor: 'grab', backgroundColor: '#F3F4F6' }}>
                {t}
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px dashed #4F46E5', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', alignSelf: 'flex-start' }}>Active Rule Canvas</h2>
          
          <div style={{ padding: '16px', border: '1px solid #E5E7EB', borderRadius: '8px', width: '100%', maxWidth: '400px', backgroundColor: '#FEF3C7', borderLeft: '4px solid #F59E0B' }}>
            <strong style={{ display: 'block', fontSize: '12px', color: '#B45309' }}>IF (Trigger)</strong>
            Inventory &lt; 10 kg
          </div>
          
          <div style={{ height: '40px', width: '2px', backgroundColor: '#D1D5DB' }}></div>
          
          <div style={{ padding: '16px', border: '1px solid #E5E7EB', borderRadius: '8px', width: '100%', maxWidth: '400px', backgroundColor: '#EEF2FF', borderLeft: '4px solid #4F46E5' }}>
            <strong style={{ display: 'block', fontSize: '12px', color: '#4338CA' }}>THEN (Action)</strong>
            Notify Purchase Manager
          </div>
          
          <button style={{ marginTop: '32px', backgroundColor: '#4F46E5', color: '#fff', padding: '10px 20px', borderRadius: '6px', border: 'none', fontWeight: 500, cursor: 'pointer' }}>
            Save Automation Rule
          </button>
        </div>
      </div>
    </div>
  );
}
