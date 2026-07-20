'use client';

export default function DeveloperPortal() {
  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Developer Platform</h1>
          <p style={{ color: '#6B7280' }}>Manage API Keys, Webhooks, and view Swagger Documentation.</p>
        </div>
        <button style={{ backgroundColor: '#10B981', color: '#fff', padding: '10px 20px', borderRadius: '6px', border: 'none', fontWeight: 500, cursor: 'pointer' }}>
          Generate New API Key
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '14px', color: '#6B7280', textTransform: 'uppercase' }}>API Calls Today</h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px' }}>14,205 <span style={{ fontSize: '14px', color: '#10B981', fontWeight: 'normal' }}>/ 50k limit</span></div>
        </div>
        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '14px', color: '#6B7280', textTransform: 'uppercase' }}>Active Webhooks</h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px' }}>3</div>
        </div>
        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '14px', color: '#6B7280', textTransform: 'uppercase' }}>Avg Latency</h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px' }}>42ms</div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>API Keys</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '13px' }}>
              <th style={{ paddingBottom: '12px' }}>Name</th>
              <th style={{ paddingBottom: '12px' }}>Token Prefix</th>
              <th style={{ paddingBottom: '12px' }}>Last Used</th>
              <th style={{ paddingBottom: '12px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
              <td style={{ padding: '16px 0', fontWeight: 500 }}>Production POS Integration</td>
              <td style={{ padding: '16px 0', fontFamily: 'monospace' }}>sk_live_8f92...</td>
              <td style={{ padding: '16px 0', color: '#6B7280' }}>2 minutes ago</td>
              <td style={{ padding: '16px 0' }}><button style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Revoke</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
