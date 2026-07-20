'use client';

export default function SecurityDashboard() {
  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Enterprise Security Command Center</h1>
        <p style={{ color: '#6B7280' }}>Manage SSO, 2FA, Device Tracking, and Role-Based Access Control.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        
        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>Global Security Policies</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #F3F4F6' }}>
            <div>
              <strong style={{ display: 'block' }}>Require 2FA for all Staff</strong>
              <span style={{ fontSize: '13px', color: '#6B7280' }}>Enforce TOTP authenticator app usage.</span>
            </div>
            <input type="checkbox" defaultChecked style={{ width: '24px', height: '24px' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #F3F4F6' }}>
            <div>
              <strong style={{ display: 'block' }}>Single Sign-On (SSO)</strong>
              <span style={{ fontSize: '13px', color: '#6B7280' }}>Allow login via Google Workspace or Okta.</span>
            </div>
            <button style={{ backgroundColor: '#4F46E5', color: '#fff', padding: '6px 12px', borderRadius: '6px', border: 'none', fontWeight: 500 }}>Configure SSO</button>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>Active Device Sessions</h2>
          
          {[
            { device: 'MacBook Pro - Chrome', ip: '192.168.1.1', location: 'Mumbai, India', active: true },
            { device: 'iPhone 14 - Safari', ip: '10.0.0.5', location: 'Delhi, India', active: false }
          ].map((s, i) => (
            <div key={i} style={{ padding: '16px', border: '1px solid #E5E7EB', borderRadius: '8px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ display: 'block' }}>{s.device}</strong>
                <span style={{ fontSize: '13px', color: '#6B7280' }}>{s.ip} • {s.location}</span>
              </div>
              {s.active ? 
                <span style={{ color: '#10B981', fontWeight: 500, fontSize: '13px' }}>Current Session</span> :
                <button style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Revoke</button>
              }
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
