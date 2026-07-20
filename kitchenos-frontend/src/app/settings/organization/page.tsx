export default function OrganizationSettings() {
  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Organization Settings</h1>
      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Tenant Name</label>
          <input type="text" defaultValue="CraveKitchen Co." style={{ padding: '8px 12px', width: '100%', border: '1px solid #D1D5DB', borderRadius: '4px' }} />
        </div>
        <button style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer' }}>Save Changes</button>
      </div>
    </div>
  );
}
