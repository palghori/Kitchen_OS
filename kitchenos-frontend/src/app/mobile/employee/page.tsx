'use client';
import { useState } from 'react';

export default function EmployeeMobilePortal() {
  const [clockedIn, setClockedIn] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, desc: 'Sanitize prep station', done: false },
    { id: 2, desc: 'Check fridge temp (Log 1)', done: false },
    { id: 3, desc: 'Restock sauce dispensers', done: false }
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* App Bar */}
      <div style={{ backgroundColor: '#111827', color: '#fff', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>KitchenOS <span style={{ color: '#10B981' }}>Staff</span></div>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>JD</div>
      </div>

      <div style={{ padding: '16px', paddingBottom: '80px' }}>
        
        {/* Welcome & Clock In */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', textAlign: 'center', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '20px', marginBottom: '4px' }}>Good morning, John!</h1>
          <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '24px' }}>Downtown Hub • Line Cook</p>
          
          <button 
            onClick={() => setClockedIn(!clockedIn)}
            style={{ 
              width: '180px', height: '180px', borderRadius: '50%', border: 'none', 
              backgroundColor: clockedIn ? '#FEE2E2' : '#D1FAE5',
              color: clockedIn ? '#DC2626' : '#059669',
              fontSize: '24px', fontWeight: 'bold', cursor: 'pointer',
              boxShadow: clockedIn ? '0 0 20px rgba(220, 38, 38, 0.4)' : '0 0 20px rgba(16, 185, 129, 0.4)',
              transition: 'all 0.3s'
            }}
          >
            {clockedIn ? 'CLOCK OUT' : 'CLOCK IN'}
          </button>
          
          <div style={{ marginTop: '24px', color: '#6B7280', fontSize: '14px' }}>
            {clockedIn ? 'Current shift: 08:00 AM - 04:00 PM' : 'Your shift starts at 08:00 AM'}
          </div>
        </div>

        {/* Performance Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>Avg Prep Time</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>04:12 <span style={{ fontSize: '14px', color: '#10B981', fontWeight: 'normal' }}>min</span></div>
          </div>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ color: '#6B7280', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>Orders Prepared</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>142</div>
          </div>
        </div>

        {/* Daily Tasks */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>Opening Tasks</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tasks.map(task => (
              <label key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={task.done} 
                  onChange={() => toggleTask(task.id)}
                  style={{ width: '20px', height: '20px', accentColor: '#10B981' }} 
                />
                <span style={{ fontSize: '15px', color: task.done ? '#9CA3AF' : '#111827', textDecoration: task.done ? 'line-through' : 'none' }}>
                  {task.desc}
                </span>
              </label>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Nav Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-around', padding: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#10B981', cursor: 'pointer' }}>
          <div style={{ fontSize: '20px', marginBottom: '2px' }}>⏱</div>
          <div style={{ fontSize: '10px', fontWeight: 'bold' }}>Punch</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9CA3AF', cursor: 'pointer' }}>
          <div style={{ fontSize: '20px', marginBottom: '2px' }}>📅</div>
          <div style={{ fontSize: '10px', fontWeight: 'bold' }}>Schedule</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9CA3AF', cursor: 'pointer' }}>
          <div style={{ fontSize: '20px', marginBottom: '2px' }}>🏖</div>
          <div style={{ fontSize: '10px', fontWeight: 'bold' }}>Time Off</div>
        </div>
      </div>

    </div>
  );
}
