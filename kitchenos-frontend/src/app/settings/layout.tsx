import styles from './layout.module.css';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '32px' }}>Settings</div>
        <a href="/settings/organization" className={styles.navItem}>Organization</a>
        <a href="/settings/employees" className={styles.navItem}>Employees</a>
        <a href="/settings/audit-logs" className={styles.navItem}>Audit Logs</a>
        <a href="/" className={styles.navItem} style={{ marginTop: 'auto' }}>← Back to Dashboard</a>
      </aside>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
