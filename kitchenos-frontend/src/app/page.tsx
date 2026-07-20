'use client';
import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
  { time: '9:00 AM', revenue: 400 },
  { time: '12:00 PM', revenue: 1240 },
  { time: '3:00 PM', revenue: 800 },
  { time: '6:00 PM', revenue: 2100 },
  { time: '9:00 PM', revenue: 1800 },
];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>CraveKitchen</div>
        <a href="#" className={`${styles.navItem} ${styles.active}`}>Dashboard</a>
        <a href="#" className={styles.navItem}>Menu Management</a>
        <a href="#" className={styles.navItem}>Live Orders</a>
        <a href="/kds" className={styles.navItem}>Open KDS Screen ↗</a>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1>Dashboard Overview</h1>
            <p style={{ color: 'var(--text-secondary-admin)' }}>Real-time updates | Last synced: Just now</p>
          </div>
          <div>
            <span style={{ color: 'var(--status-success)', fontWeight: 'bold' }}>● LIVE</span>
          </div>
        </header>

        <div className={styles.dashboardGrid}>
          <div className={styles.card}>
            <h2>Real-time Sales Analytics</h2>
            <div style={{ width: '100%', height: 300 }}>
              {mounted && (
                <ResponsiveContainer>
                  <LineChart data={dummyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#697386', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#697386', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                    <Tooltip cursor={{stroke: '#E5E7EB', strokeWidth: 1}} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="revenue" stroke="var(--accent-primary)" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className={styles.card}>
            <h2>Live Orders</h2>
            <div className={styles.orderList}>
              <div className={styles.orderItem}>
                <div>
                  <strong>#CK1902</strong> <br/>
                  <small style={{ color: 'var(--text-secondary-admin)' }}>UberEats • 14m ago</small>
                </div>
                <div style={{ textAlign: 'right' }}>
                  $42.50 <br/>
                  <small><span className={`${styles.statusDot} ${styles.statusPrep}`}></span>Prep</small>
                </div>
              </div>
              <div className={styles.orderItem}>
                <div>
                  <strong>#CK1901</strong> <br/>
                  <small style={{ color: 'var(--text-secondary-admin)' }}>DoorDash • 9m ago</small>
                </div>
                <div style={{ textAlign: 'right' }}>
                  $61.00 <br/>
                  <small><span className={`${styles.statusDot} ${styles.statusReady}`}></span>Ready</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
