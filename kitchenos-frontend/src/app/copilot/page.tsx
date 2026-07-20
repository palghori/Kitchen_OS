'use client';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function CopilotUI() {
  const [messages, setMessages] = useState<{ role: 'USER' | 'AI', content: string }[]>([
    { role: 'AI', content: "Hello! I am KitchenOS Copilot. I have real-time access to your Orders, Inventory, Finance, and Kitchen metrics. What would you like to optimize today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    // Add User Message
    const newMessages = [...messages, { role: 'USER' as const, content: text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Mock API Call to CopilotService
    setTimeout(() => {
      let aiResponse = "I'm analyzing the data right now...";
      const lowerMsg = text.toLowerCase();

      if (lowerMsg.includes('profit decreased') || lowerMsg.includes('why profit')) {
        aiResponse = `Based on the latest financial snapshot, your Net Profit Margin has dropped to **29.4%**. \n\nThe primary drivers are:\n1. **Labor Costs**: Spiked by 12% this week ($28,000).\n2. **Inventory Waste**: We logged $450 in wasted Truffle Mayo.\n\n*Recommendation*: Optimize the prep schedule for Truffle Mayo to reduce spoilage, and review overtime hours for the Downtown Kitchen.`;
      } 
      else if (lowerMsg.includes('ordered') || lowerMsg.includes('ingredients')) {
        aiResponse = `You have 2 items critically low on stock:\n- **Truffle Mayo**\n- **Angus Beef Patties**\n\nI recommend generating a Purchase Request immediately. Would you like me to draft a PO to Sysco Foods?`;
      }
      else if (lowerMsg.includes('brand performs best')) {
        aiResponse = `**Pizza Express** is currently your top performer, generating 42% of total revenue this month.\n\nConversely, **Healthy Bowls** is underperforming. \n\n*Recommendation*: Consider running a targeted promotion for Healthy Bowls on Swiggy and Zomato during the 6PM-8PM peak window.`;
      }
      else if (lowerMsg.includes('tomorrow') || lowerMsg.includes('predict')) {
        aiResponse = `**Demand Prediction for Tomorrow (Sunday):**\n\nBased on historical 30-day trends and tomorrow's weather forecast (Rain), expect a **15% surge** in delivery orders.\n\n*Staffing Recommendation*: Increase prep cooks by +2 for the 5PM-9PM shift to maintain our 12-minute Avg Prep Time target.`;
      }
      else if (lowerMsg.includes('pricing')) {
        aiResponse = `Looking at your COGS (Cost of Goods Sold):\n\nThe **Truffle Mushroom Burger** currently has a food cost of $6.05 and is selling for $14.99 (Margin: 59%). To hit your enterprise target of 70% gross margin, I recommend increasing the price to **$19.99**, or negotiating a better bulk rate for Truffle Mayo.`;
      }
      else {
        aiResponse = `I see you're asking about operational data. I'm actively monitoring your Order Volume, Inventory levels, and P&L. How can I assist you in optimizing your kitchen today?`;
      }

      setMessages([...newMessages, { role: 'AI', content: aiResponse }]);
      setIsTyping(false);
    }, 1200);
  };

  const suggestedPrompts = [
    "Why did profit decrease this week?",
    "Predict tomorrow's demand.",
    "What ingredients should be ordered?",
    "Recommend pricing for burgers."
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F7F9FC', color: '#1A1F36', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Sidebar */}
      <div style={{ width: '280px', backgroundColor: '#1E293B', color: '#F8FAFC', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '32px', background: 'linear-gradient(90deg, #38BDF8, #818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          KitchenOS Copilot
        </h2>
        <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.05em', marginBottom: '16px' }}>Suggested Actions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {suggestedPrompts.map((prompt, i) => (
            <button 
              key={i} 
              onClick={() => handleSend(prompt)}
              style={{ textAlign: 'left', padding: '12px', backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '8px', color: '#E2E8F0', cursor: 'pointer', transition: 'background 0.2s', fontSize: '13px' }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
                  backgroundColor: msg.role === 'AI' ? '#818CF8' : '#F1F5F9',
                  color: msg.role === 'AI' ? '#fff' : '#64748B'
                }}>
                  {msg.role === 'AI' ? 'AI' : 'US'}
                </div>
                <div style={{ 
                  padding: '16px', borderRadius: '12px', fontSize: '15px', lineHeight: '1.6', flex: 1,
                  backgroundColor: msg.role === 'AI' ? '#fff' : '#E0E7FF',
                  border: msg.role === 'AI' ? '1px solid #E2E8F0' : 'none',
                  color: '#1E293B',
                  boxShadow: msg.role === 'AI' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
                }}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#818CF8', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AI</div>
                <div style={{ padding: '16px', backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', color: '#94A3B8' }}>
                  Analyzing operational data...
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
        </div>

        {/* Input Area */}
        <div style={{ padding: '24px 40px', backgroundColor: '#fff', borderTop: '1px solid #E2E8F0' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask anything about your kitchen operations..."
              style={{ width: '100%', padding: '16px 24px', paddingRight: '120px', borderRadius: '9999px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
            />
            <button 
              onClick={() => handleSend(input)}
              style={{ position: 'absolute', right: '8px', top: '8px', padding: '10px 24px', backgroundColor: '#38BDF8', color: '#fff', border: 'none', borderRadius: '9999px', fontWeight: 600, cursor: 'pointer' }}
            >
              Ask AI
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
