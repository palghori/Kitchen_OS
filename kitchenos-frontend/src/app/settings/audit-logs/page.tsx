export default function AuditLogs() {
  const logs = [
    { id: '1', action: 'CREATE_INVITATION', resource: '/invitations', user: 'admin@cravekitchen.com', date: '2026-07-18 10:45 AM' },
    { id: '2', action: 'UPDATE_MENU', resource: '/kitchens/123/menu', user: 'manager@cravekitchen.com', date: '2026-07-18 09:12 AM' },
    { id: '3', action: 'DELETE_ORDER', resource: '/orders/456', user: 'manager@cravekitchen.com', date: '2026-07-17 08:30 PM' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Security & Audit Logs</h1>
      <p style={{ marginBottom: '24px', color: 'var(--text-secondary-admin)' }}>View the immutable history of all critical actions performed across the organization.</p>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
            <th style={{ padding: '12px 24px', fontWeight: 500 }}>Date</th>
            <th style={{ padding: '12px 24px', fontWeight: 500 }}>User</th>
            <th style={{ padding: '12px 24px', fontWeight: 500 }}>Action</th>
            <th style={{ padding: '12px 24px', fontWeight: 500 }}>Resource</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
              <td style={{ padding: '16px 24px' }}>{log.date}</td>
              <td style={{ padding: '16px 24px' }}>{log.user}</td>
              <td style={{ padding: '16px 24px', fontFamily: 'monospace' }}>{log.action}</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary-admin)' }}>{log.resource}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
