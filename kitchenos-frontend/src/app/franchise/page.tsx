'use client';

export default function FranchiseDashboard() {
  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Global Franchise Management</h1>
          <p style={{ color: '#6B7280' }}>Multi-city, multi-kitchen hierarchical monitoring.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ backgroundColor: '#fff', border: '1px solid #D1D5DB', padding: '10px 20px', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}>Run Global Audit</button>
          <button style={{ backgroundColor: '#111827', color: '#fff', padding: '10px 20px', borderRadius: '6px', border: 'none', fontWeight: 500, cursor: 'pointer' }}>+ Add Region</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {[
          { label: 'Total Kitchens', value: '142' },
          { label: 'Active Regions', value: '12' },
          { label: 'Global Revenue (MTD)', value: '$1.4M' },
          { label: 'Compliance Score', value: '98.5%', color: '#10B981' }
        ].map((stat, i) => (
          <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px' }}>
            <div style={{ color: '#6B7280', fontSize: '13px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '8px' }}>{stat.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: stat.color || '#111827' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>Regional Performance</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '13px' }}>
              <th style={{ paddingBottom: '12px' }}>Region</th>
              <th style={{ paddingBottom: '12px' }}>Manager</th>
              <th style={{ paddingBottom: '12px' }}>Kitchens</th>
              <th style={{ paddingBottom: '12px' }}>Revenue</th>
              <th style={{ paddingBottom: '12px' }}>Compliance</th>
            </tr>
          </thead>
          <tbody>
            {[
              { region: 'North America (East)', manager: 'Sarah Jenkins', kitchens: 45, rev: '$450k', comp: '99%' },
              { region: 'North America (West)', manager: 'David Chen', kitchens: 38, rev: '$380k', comp: '96%' },
              { region: 'Europe (UK)', manager: 'Emma Watson', kitchens: 12, rev: '$120k', comp: '100%' },
              { region: 'Asia (India)', manager: 'Rahul Sharma', kitchens: 47, rev: '$450k', comp: '98%' }
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '16px 0', fontWeight: 600 }}>{r.region}</td>
                <td style={{ padding: '16px 0', color: '#4B5563' }}>{r.manager}</td>
                <td style={{ padding: '16px 0' }}>{r.kitchens}</td>
                <td style={{ padding: '16px 0', fontWeight: 600 }}>{r.rev}</td>
                <td style={{ padding: '16px 0', color: '#10B981', fontWeight: 500 }}>{r.comp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
