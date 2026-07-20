export default function EmployeeSettings() {
  const employees = [
    { id: 1, email: 'admin@cravekitchen.com', role: 'OWNER', status: 'ACTIVE' },
    { id: 2, email: 'manager@cravekitchen.com', role: 'MANAGER', status: 'ACTIVE' },
    { id: 3, email: 'cook@cravekitchen.com', role: 'STAFF', status: 'INVITED' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px' }}>Employee Management</h1>
        <button style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer' }}>+ Invite User</button>
      </div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
            <th style={{ padding: '12px 24px', fontWeight: 500 }}>Email</th>
            <th style={{ padding: '12px 24px', fontWeight: 500 }}>Role</th>
            <th style={{ padding: '12px 24px', fontWeight: 500 }}>Status</th>
            <th style={{ padding: '12px 24px', fontWeight: 500 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
              <td style={{ padding: '16px 24px' }}>{emp.email}</td>
              <td style={{ padding: '16px 24px' }}>{emp.role}</td>
              <td style={{ padding: '16px 24px' }}>
                <span style={{ padding: '4px 8px', background: emp.status === 'ACTIVE' ? '#D1FAE5' : '#FEF3C7', color: emp.status === 'ACTIVE' ? '#065F46' : '#92400E', borderRadius: '9999px', fontSize: '12px', fontWeight: 600 }}>{emp.status}</span>
              </td>
              <td style={{ padding: '16px 24px' }}><a href="#" style={{ color: 'var(--accent-primary)' }}>Edit</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
