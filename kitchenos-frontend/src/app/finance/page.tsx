'use client';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function FinanceDashboard() {
  const [pnl] = useState({
    revenue: { gross: 125000, gst: 18750, net: 106250 },
    cogs: { foodCost: 35000 },
    expenses: { labor: 28000, rent: 8000, marketing: 4000, total: 40000 },
    profitability: { netProfit: 31250, profitMargin: 29.41 }
  });

  const cashflowData = [
    { name: 'Mon', in: 4000, out: 2400 },
    { name: 'Tue', in: 3000, out: 1398 },
    { name: 'Wed', in: 2000, out: 9800 },
    { name: 'Thu', in: 2780, out: 3908 },
    { name: 'Fri', in: 1890, out: 4800 },
    { name: 'Sat', in: 2390, out: 3800 },
    { name: 'Sun', in: 3490, out: 4300 },
  ];

  const MetricCard = ({ title, value, type = 'default' }: { title: string, value: string, type?: 'success' | 'warning' | 'danger' | 'default' }) => {
    let color = '#1A1F36';
    if (type === 'success') color = '#10B981';
    if (type === 'danger') color = '#EF4444';
    if (type === 'warning') color = '#F59E0B';

    return (
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px' }}>
        <h3 style={{ fontSize: '14px', color: '#697386', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h3>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color }}>{value}</div>
      </div>
    );
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#F7F9FC', minHeight: '100vh', color: '#1A1F36' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px' }}>Financial Intelligence</h1>
          <p style={{ color: '#697386' }}>Real-time Profit & Loss and Cashflow Analysis</p>
        </div>
        <div>
          <select style={{ padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '4px', marginRight: '16px' }}>
            <option>All Brands</option>
            <option>Burger Co.</option>
            <option>Pizza Express</option>
          </select>
          <select style={{ padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '4px' }}>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Year to Date</option>
          </select>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <MetricCard title="Gross Revenue" value={`$${pnl.revenue.gross.toLocaleString()}`} />
        <MetricCard title="Net Revenue (Post-GST)" value={`$${pnl.revenue.net.toLocaleString()}`} />
        <MetricCard title="Food Cost (COGS)" value={`$${pnl.cogs.foodCost.toLocaleString()}`} type="warning" />
        <MetricCard title="Net Profit" value={`$${pnl.profitability.netProfit.toLocaleString()}`} type="success" />
      </div>

      <div style={{ display: 'flex', gap: '32px' }}>
        <div style={{ flex: 2 }}>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '24px' }}>Weekly Cashflow (In vs Out)</h2>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashflowData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#F3F4F6' }} />
                  <Bar dataKey="in" fill="#10B981" radius={[4, 4, 0, 0]} name="Cash In" />
                  <Bar dataKey="out" fill="#EF4444" radius={[4, 4, 0, 0]} name="Cash Out" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '24px' }}>P&L Summary</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #E5E7EB' }}>
              <span style={{ color: '#697386' }}>Net Revenue</span>
              <span style={{ fontWeight: 500 }}>${pnl.revenue.net.toLocaleString()}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #E5E7EB' }}>
              <span style={{ color: '#697386' }}>Food Cost</span>
              <span style={{ fontWeight: 500, color: '#EF4444' }}>-${pnl.cogs.foodCost.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #E5E7EB' }}>
              <span style={{ color: '#697386' }}>Labor Cost</span>
              <span style={{ fontWeight: 500, color: '#EF4444' }}>-${pnl.expenses.labor.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #E5E7EB' }}>
              <span style={{ color: '#697386' }}>Other Expenses</span>
              <span style={{ fontWeight: 500, color: '#EF4444' }}>-${(pnl.expenses.rent + pnl.expenses.marketing).toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', marginTop: '8px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Net Profit</span>
              <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#10B981' }}>${pnl.profitability.netProfit.toLocaleString()}</span>
            </div>

            <div style={{ background: '#F3F4F6', padding: '16px', borderRadius: '4px', marginTop: '16px', textAlign: 'center' }}>
              <div style={{ color: '#697386', fontSize: '14px', marginBottom: '4px' }}>Profit Margin</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: pnl.profitability.profitMargin > 20 ? '#10B981' : '#F59E0B' }}>
                {pnl.profitability.profitMargin}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
