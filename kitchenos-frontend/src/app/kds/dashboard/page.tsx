'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '10 AM', throughput: 24 },
  { name: '11 AM', throughput: 45 },
  { name: '12 PM', throughput: 90 },
  { name: '1 PM', throughput: 110 },
  { name: '2 PM', throughput: 60 },
];

export default function ChefDashboard() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    // In prod: fetch from GET /kds/metrics
    setMetrics({
      averagePrepTimeMinutes: 8.5,
      totalOrdersToday: 245,
      delayedOrders: 12,
      throughputPerHour: 35,
    });
  }, []);

  return (
    <div style={{ padding: '32px', backgroundColor: '#F7F9FC', minHeight: '100vh', color: '#1A1F36' }}>
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
           <h1 style={{ fontSize: '24px' }}>Chef Performance Dashboard</h1>
           <p style={{ color: '#697386' }}>Real-time shift analytics</p>
        </div>
        <div>
           <a href="/kds" style={{ padding: '10px 16px', background: 'var(--surface-admin)', border: '1px solid #E5E7EB', borderRadius: '4px', textDecoration: 'none', color: '#1A1F36' }}>Back to KDS Board</a>
        </div>
      </header>

      {metrics && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ color: '#697386', marginBottom: '8px' }}>Avg Prep Time</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{metrics.averagePrepTimeMinutes}m</div>
          </div>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ color: '#697386', marginBottom: '8px' }}>Total Orders</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{metrics.totalOrdersToday}</div>
          </div>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ color: '#697386', marginBottom: '8px' }}>Delayed (&gt;10m)</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#EF4444' }}>{metrics.delayedOrders}</div>
          </div>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ color: '#697386', marginBottom: '8px' }}>Throughput / hr</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{metrics.throughputPerHour}</div>
          </div>
        </div>
      )}

      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '24px' }}>Hourly Throughput</h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#697386'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#697386'}} />
              <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="throughput" fill="#635BFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
