'use client';
import { useState } from 'react';

export default function MarketingHub() {
  const [campaigns, setCampaigns] = useState([
    { id: '1', name: 'Diwali VIP Promo', segment: 'VIP', channels: ['WhatsApp', 'Push'], status: 'ACTIVE', sent: 120, conversions: 18, revenue: 1450.00 },
    { id: '2', name: 'Win-back Churn Risk', segment: 'AT_RISK', channels: ['Email'], status: 'DRAFT', sent: 0, conversions: 0, revenue: 0 },
    { id: '3', name: 'Weekend Burger Combo', segment: 'REGULAR', channels: ['Push', 'Instagram'], status: 'COMPLETED', sent: 450, conversions: 62, revenue: 2100.00 }
  ]);

  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [aiDraft, setAiDraft] = useState('');
  const [discountCode, setDiscountCode] = useState('');

  const generateAI = () => {
    setAiDraft('Hi there! Celebrate this Diwali with KitchenOS. Use code DIWALI-VIP-20 for 20% off your entire order today!');
    setDiscountCode('DIWALI-VIP-20');
    setWizardStep(2);
  };

  const launchCampaign = () => {
    setCampaigns([{ id: '4', name: 'New AI Campaign', segment: 'VIP', channels: ['WhatsApp'], status: 'ACTIVE', sent: 0, conversions: 0, revenue: 0 }, ...campaigns]);
    setShowWizard(false);
    setWizardStep(1);
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', color: '#111827', padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>AI Marketing Automation</h1>
          <p style={{ color: '#6B7280', marginTop: '4px' }}>Multi-channel campaigns and generative AI copy</p>
        </div>
        <button 
          onClick={() => setShowWizard(true)}
          style={{ backgroundColor: '#DB2777', color: '#fff', padding: '10px 20px', borderRadius: '6px', border: 'none', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span>✨</span> Generate Campaign
        </button>
      </header>

      {/* Analytics Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {[
          { label: 'Active Campaigns', value: '2' },
          { label: 'Total Messages Sent', value: '1,240' },
          { label: 'Average Conversion', value: '14.2%' },
          { label: 'Revenue Generated', value: '$8,450.00', color: '#10B981' }
        ].map((stat, i) => (
          <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px' }}>
            <div style={{ color: '#6B7280', fontSize: '13px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '8px' }}>{stat.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: stat.color || '#111827' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
            <tr>
              <th style={{ padding: '16px 24px', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Campaign Name</th>
              <th style={{ padding: '16px 24px', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Segment</th>
              <th style={{ padding: '16px 24px', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Channels</th>
              <th style={{ padding: '16px 24px', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px 24px', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Sent</th>
              <th style={{ padding: '16px 24px', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '16px 24px', fontWeight: 500 }}>{c.name}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, backgroundColor: '#F3F4F6' }}>
                    {c.segment}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', color: '#4B5563', fontSize: '14px' }}>{c.channels.join(', ')}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600,
                    backgroundColor: c.status === 'ACTIVE' ? '#D1FAE5' : c.status === 'COMPLETED' ? '#DBEAFE' : '#F3F4F6',
                    color: c.status === 'ACTIVE' ? '#065F46' : c.status === 'COMPLETED' ? '#1E40AF' : '#4B5563'
                  }}>
                    {c.status}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', color: '#4B5563' }}>{c.sent}</td>
                <td style={{ padding: '16px 24px', fontWeight: 600, color: '#10B981' }}>${c.revenue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI Wizard Modal */}
      {showWizard && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '12px', width: '500px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>✨ AI Campaign Generator</h2>
            <p style={{ color: '#6B7280', marginBottom: '24px' }}>Select an audience and prompt the AI.</p>
            
            {wizardStep === 1 && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Target Segment</label>
                  <select style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }}>
                    <option>VIP Customers</option>
                    <option>Churn Risk</option>
                    <option>All Customers</option>
                  </select>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Campaign Prompt</label>
                  <textarea 
                    placeholder="e.g. Write a friendly WhatsApp message for Diwali offering 20% off..."
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', minHeight: '100px' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button onClick={() => setShowWizard(false)} style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={generateAI} style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#DB2777', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>Generate Copy</button>
                </div>
              </>
            )}

            {wizardStep === 2 && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#DB2777' }}>AI Suggested Copy</label>
                  <textarea 
                    value={aiDraft}
                    onChange={(e) => setAiDraft(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #FBCFE8', backgroundColor: '#FDF2F8', minHeight: '100px', color: '#831843' }}
                  />
                </div>
                <div style={{ marginBottom: '24px', display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Discount Code</label>
                    <input type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                  </div>
                  <div style={{ width: '120px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Channels</label>
                    <div style={{ fontSize: '14px', marginTop: '10px' }}>📱 WhatsApp</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button onClick={() => setWizardStep(1)} style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#fff', cursor: 'pointer' }}>Back</button>
                  <button onClick={launchCampaign} style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#4F46E5', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>Blast Campaign</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
