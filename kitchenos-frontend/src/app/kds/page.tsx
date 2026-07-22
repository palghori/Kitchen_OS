'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './page.module.css';
import io from 'socket.io-client';

const COLUMNS = ['PREPARING', 'COOKING', 'PACKING', 'READY'];

export default function AdvancedKDS() {
  const [orders, setOrders] = useState([
    { id: '#mock1', brand: 'SPICY TACO CO.', brandColor: '#F97316', status: 'PREPARING', items: [{ name: 'Chicken Tacos', qty: 3 }], createdAt: Date.now() - 1000 * 60 * 12 }, // 12 mins ago (delayed)
    { id: '#mock2', brand: 'BURGER HAVEN', brandColor: '#EF4444', status: 'COOKING', items: [{ name: 'Cheeseburger', qty: 2 }], createdAt: Date.now() - 1000 * 60 * 3 }, // 3 mins ago
  ]);
  const [now, setNow] = useState<number | null>(null);
  
  // Audio ref for sounds
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    document.body.classList.add('kds-theme');
    setNow(Date.now());
    const timerInterval = setInterval(() => setNow(Date.now()), 1000);
    
    const socketUrl = process.env.NEXT_PUBLIC_API_URL || 'https://kitchen-os-9wgp.onrender.com';
    const socket = io(socketUrl);
    socket.on('connect', () => console.log('Connected to Order Management Engine'));

    socket.on('order_created', (newOrder: any) => {
      playDing();
      setOrders(prev => [...prev, {
        id: newOrder.id.substring(0, 8),
        brand: newOrder.brand?.name || 'NEW BRAND',
        brandColor: '#10B981', 
        status: newOrder.status,
        items: newOrder.items || [],
        createdAt: Date.now() // Start timer immediately
      }]);
    });

    socket.on('order_status_updated', (data: any) => {
      setOrders(prev => prev.map(order => 
        order.id === data.orderId.substring(0, 8) ? { ...order, status: data.status } : order
      ).filter(order => order.status !== 'DELIVERED' && order.status !== 'CANCELLED'));
    });

    return () => {
      clearInterval(timerInterval);
      socket.disconnect();
      document.body.classList.remove('kds-theme');
    };
  }, []);

  const playDing = () => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1);
    } catch (e) {
      console.error('Audio play failed', e);
    }
  };

  const getElapsedTime = (createdAt: number) => {
    if (now === null) return '0m 00s';
    const diff = Math.floor((now - createdAt) / 1000);
    const m = Math.floor(diff / 60);
    const s = diff % 60;
    return `${m}m ${s.toString().padStart(2, '0')}s`;
  };

  const handleDragStart = (e: React.DragEvent, orderId: string) => {
    e.dataTransfer.setData('orderId', orderId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // allow drop
  };

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    const orderId = e.dataTransfer.getData('orderId');
    if (!orderId) return;
    
    // Optimistic UI update
    setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: targetStatus } : order
    ));
    
    // In prod: API call to PATCH /orders/:id/status
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <h1>≡ LIVE KITCHEN BOARD</h1>
          <span style={{ color: '#94A3B8' }}>{orders.length} Active</span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="/kds/dashboard" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Chef Dashboard ↗</a>
          <span style={{ color: 'var(--status-success)' }}>● ONLINE</span>
        </div>
      </header>

      <div className={styles.kanbanBoard}>
        {COLUMNS.map(col => (
          <div 
            key={col} 
            className={styles.column}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col)}
          >
            <div className={styles.columnHeader}>{col}</div>
            <div className={styles.ticketList}>
              {orders.filter(o => o.status === col).sort((a,b) => a.createdAt - b.createdAt).map(order => {
                const isDelayed = now !== null && (now - order.createdAt) > 10 * 60 * 1000; // 10 mins threshold
                return (
                  <div 
                    key={order.id} 
                    className={`${styles.ticket} ${isDelayed ? styles.delayed : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, order.id)}
                  >
                    <div className={styles.brandBanner} style={{ color: order.brandColor }}>
                      {order.brand}
                    </div>
                    <div className={styles.ticketHeader}>
                      <div className={styles.ticketId}>{order.id}</div>
                      <div className={`${styles.timer} ${isDelayed ? styles.delayedText : ''}`}>
                        {getElapsedTime(order.createdAt)}
                      </div>
                    </div>
                    <div className={styles.itemList}>
                      {order.items.map((item, idx) => (
                        <div key={idx} className={styles.item}>
                          <span>{item.name}</span>
                          <span style={{ fontWeight: 'bold' }}>{(item as any).quantity || (item as any).qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
