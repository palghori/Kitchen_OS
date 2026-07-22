'use client';
import { useState, useEffect } from 'react';

const mockMenu = [
  {
    id: 'cat-1',
    name: 'Gourmet Burgers',
    items: [
      {
        id: 'item-1',
        name: 'Truffle Mushroom Burger',
        basePrice: 14.99,
        variants: [
          { name: 'Single Patty', price: 14.99 },
          { name: 'Double Patty', price: 18.99 }
        ],
        modifiers: [
          { group: 'Cheese Options', required: true, options: [{ name: 'Cheddar', price: 0 }, { name: 'Swiss', price: 1.5 }] },
          { group: 'Add-ons', required: false, options: [{ name: 'Bacon', price: 2.5 }, { name: 'Extra Truffle Sauce', price: 1.0 }] }
        ]
      }
    ]
  }
];

export default function MenuBuilder() {
  const [categories, setCategories] = useState<any[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kitchen-os-9wgp.onrender.com';

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const url = `${API_URL}/menu?organizationId=default-org-id`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('API failed');
        const data = await res.json();
        
        if (data && data.length > 0) {
          const formattedCategories = data.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            items: cat.items.map((item: any) => ({
              id: item.id,
              name: item.name,
              basePrice: item.basePrice,
              variants: item.variants || [],
              modifiers: (item.modifierGroups || []).map((mg: any) => ({
                group: mg.name,
                required: mg.isRequired,
                options: mg.modifiers || []
              }))
            }))
          }));
          setCategories(formattedCategories);
        } else {
          setCategories(mockMenu);
        }
      } catch (err) {
        console.error('Failed to fetch menu:', err);
        setCategories(mockMenu);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleAddCategory = async () => {
    const name = prompt('Enter category name:');
    if (!name) return;
    try {
      const res = await fetch(`${API_URL}/menu/category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId: 'default-org-id', name })
      });
      if (res.ok) {
        const newCat = await res.json();
        setCategories([...categories, { id: newCat.id, name: newCat.name, items: [] }]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddItem = async (categoryId: string) => {
    const name = prompt('Enter item name:');
    if (!name) return;
    const priceStr = prompt('Enter base price:');
    const basePrice = parseFloat(priceStr || '0');
    try {
      const res = await fetch(`${API_URL}/menu/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId, data: { name, basePrice, variants: [], modifierGroups: [] } })
      });
      if (res.ok) {
        const newItem = await res.json();
        setCategories(categories.map(cat => 
          cat.id === categoryId 
            ? { ...cat, items: [...cat.items, { id: newItem.id, name: newItem.name, basePrice: newItem.basePrice, variants: [], modifiers: [] }] } 
            : cat
        ));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: '32px' }}>Loading menu...</div>;

  return (
    <div style={{ padding: '32px', backgroundColor: '#F7F9FC', minHeight: '100vh', color: '#1A1F36' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px' }}>Menu Builder</h1>
          <p style={{ color: '#697386' }}>Design categories, variants, and modifier trees</p>
        </div>
        <button onClick={handleAddCategory} style={{ padding: '10px 16px', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+ Add Category</button>
      </header>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {categories.map(cat => (
            <div key={cat.id} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>{cat.name}</h2>
                <button onClick={() => handleAddItem(cat.id)} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 500 }}>+ Add Item</button>
              </div>
              
              <div>
                {cat.items.map((item: any) => (
                  <div key={item.id} style={{ borderBottom: '1px solid #E5E7EB', padding: '16px 24px', cursor: 'pointer' }} onClick={() => setExpandedItem(item.id)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 500 }}>{item.name}</span>
                      <span style={{ color: '#697386' }}>${item.basePrice.toFixed(2)}</span>
                    </div>

                    {expandedItem === item.id && (
                      <div style={{ marginTop: '16px', paddingLeft: '24px', borderLeft: '2px solid var(--accent-primary)' }}>
                        <div style={{ marginBottom: '16px' }}>
                          <h4 style={{ fontSize: '14px', color: '#697386', marginBottom: '8px', textTransform: 'uppercase' }}>Variants</h4>
                          {item.variants.map((v: any, i: number) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '14px' }}>
                              <span>{v.name}</span>
                              <span>${v.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        <div>
                          <h4 style={{ fontSize: '14px', color: '#697386', marginBottom: '8px', textTransform: 'uppercase' }}>Modifiers</h4>
                          {item.modifiers.map((mod: any, i: number) => (
                            <div key={i} style={{ marginBottom: '12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <span style={{ fontWeight: 500, fontSize: '14px' }}>{mod.group}</span>
                                {mod.required && <span style={{ fontSize: '10px', background: '#FEF3C7', color: '#92400E', padding: '2px 6px', borderRadius: '4px' }}>REQUIRED</span>}
                              </div>
                              {mod.options.map((opt: any, j: number) => (
                                <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', fontSize: '14px', paddingLeft: '12px' }}>
                                  <span>{opt.name}</span>
                                  <span>+${opt.price.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ width: '350px' }}>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px', position: 'sticky', top: '24px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '16px', fontWeight: 'bold' }}>Quick Actions</h3>
            <button style={{ width: '100%', padding: '10px', background: '#F3F4F6', border: '1px solid #D1D5DB', borderRadius: '4px', marginBottom: '12px', cursor: 'pointer' }}>Import from CSV</button>
            <button style={{ width: '100%', padding: '10px', background: '#F3F4F6', border: '1px solid #D1D5DB', borderRadius: '4px', cursor: 'pointer' }}>Manage Modifiers Library</button>
          </div>
        </div>
      </div>
    </div>
  );
}
