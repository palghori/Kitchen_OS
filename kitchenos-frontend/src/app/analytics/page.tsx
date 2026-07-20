'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, Legend } from 'recharts';

export default function ExecutiveDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Mock fetching data from API
    setData({
      kpis: { totalRevenue: 145000, totalOrders: 4200, activeBrands: 5, totalEmployees: 24, avgPrepTime: '12m 45s' },
      peakHours: Array.from({ length: 24 }).map((_, i) => ({ hour: `${i.toString().padStart(2, '0')}:00`, orders: Math.floor(Math.random() * (i > 10 && i < 14 || i > 18 && i < 22 ? 150 : 20)) })),
      brandPerformance: [{ name: 'Burger Co.', revenue: 45000 }, { name: 'Pizza Express', revenue: 55000 }, { name: 'Healthy Bowls', revenue: 35000 }],
      revenueTrend: [
        { date: 'Mon', revenue: 12000, profit: 4000 }, { date: 'Tue', revenue: 15000, profit: 5500 }, { date: 'Wed', revenue: 14000, profit: 4800 },
        { date: 'Thu', revenue: 18000, profit: 6200 }, { date: 'Fri', revenue: 24000, profit: 9000 }, { date: 'Sat', revenue: 28000, profit: 11000 },
        { date: 'Sun', revenue: 22000, profit: 8000 },
      ]
    });
  }, []);

  if (!data) return <div style={{ background: '#0F172A', color: 'white', minHeight: '100vh', padding: '32px' }}>Loading...</div>;

  return (
    <div style={{ backgroundColor: '#0F172A', minHeight: '100vh', color: '#F8FAFC', padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header & Filters */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #38BDF8, #818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Executive Command Center
          </h1>
          <p style={{ color: '#94A3B8', marginTop: '4px' }}>Real-time aggregated intelligence across all locations.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <select style={{ background: '#1E293B', color: '#F8FAFC', border: '1px solid #334155', padding: '8px 16px', borderRadius: '6px', outline: 'none' }}>
            <option>All Kitchens</option>
            <option>Downtown Hub</option>
            <option>Westside Hub</option>
          </select>
          <select style={{ background: '#1E293B', color: '#F8FAFC', border: '1px solid #334155', padding: '8px 16px', borderRadius: '6px', outline: 'none' }}>
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>Year to Date</option>
          </select>
        </div>
      </header>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {[
          { label: 'Gross Revenue', value: `$${data.kpis.totalRevenue.toLocaleString()}`, color: '#38BDF8' },
          { label: 'Total Orders', value: data.kpis.totalOrders.toLocaleString(), color: '#818CF8' },
          { label: 'Active Brands', value: data.kpis.activeBrands, color: '#F472B6' },
          { label: 'Total Staff', value: data.kpis.totalEmployees, color: '#A78BFA' },
          { label: 'Avg Prep Time', value: data.kpis.avgPrepTime, color: '#34D399' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: '#1E293B', border: '1px solid #334155', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ color: '#94A3B8', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{kpi.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: kpi.color }}>{kpi.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>
        {/* Revenue & Profit Trend */}
        <div style={{ gridColumn: 'span 2', background: '#1E293B', border: '1px solid #334155', padding: '24px', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Revenue vs. Profit Trend</h2>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.revenueTrend}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34D399" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#94A3B8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '8px' }} itemStyle={{ color: '#F8FAFC' }} />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="#38BDF8" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" name="Revenue" />
                <Area type="monotone" dataKey="profit" stroke="#34D399" strokeWidth={3} fillOpacity={1} fill="url(#colorProf)" name="Net Profit" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Brand Performance */}
        <div style={{ background: '#1E293B', border: '1px solid #334155', padding: '24px', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Brand Performance</h2>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.brandPerformance} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94A3B8" tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" tickLine={false} axisLine={false} width={100} />
                <Tooltip cursor={{ fill: '#334155' }} contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '8px' }} />
                <Bar dataKey="revenue" fill="#818CF8" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Peak Hours Heat Map Area */}
      <div style={{ background: '#1E293B', border: '1px solid #334155', padding: '24px', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Order Volume Heat Map (24h)</h2>
        <div style={{ height: '250px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="hour" stroke="#94A3B8" tickLine={false} axisLine={false} interval={1} />
              <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#334155' }} contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '8px' }} />
              <Bar dataKey="orders" fill="#F472B6" radius={[4, 4, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
