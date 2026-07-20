'use client';
import { useState } from 'react';

export default function RecipeIntelligence() {
  const [recipe] = useState({
    name: 'Truffle Mushroom Burger (Single Patty)',
    basePrice: 14.99,
    prepTimeMinutes: 8,
    calories: 850,
    ingredients: [
      { name: 'Brioche Bun', quantity: 1, unit: 'unit', costContribution: 0.85 },
      { name: 'Angus Beef Patty', quantity: 0.25, unit: 'kg', costContribution: 3.50 },
      { name: 'Truffle Mayo', quantity: 0.05, unit: 'kg', costContribution: 1.20 },
      { name: 'Swiss Cheese', quantity: 2, unit: 'slices', costContribution: 0.60 },
      { name: 'Sautéed Mushrooms', quantity: 0.1, unit: 'kg', costContribution: 0.90 },
    ]
  });

  const totalFoodCost = recipe.ingredients.reduce((acc, curr) => acc + curr.costContribution, 0);
  const profitMargin = ((recipe.basePrice - totalFoodCost) / recipe.basePrice) * 100;
  const isCritical = profitMargin < 30; // Anything under 30% margin is critical for this brand

  return (
    <div style={{ padding: '32px', backgroundColor: '#F7F9FC', minHeight: '100vh', color: '#1A1F36' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px' }}>Recipe Intelligence</h1>
          <p style={{ color: '#697386' }}>Dynamic food cost & margin tracking</p>
        </div>
        <div>
          <select style={{ padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '4px' }}>
            <option>Truffle Mushroom Burger</option>
            <option>Spicy Chicken Sandwich</option>
          </select>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '32px' }}>
        <div style={{ flex: 2 }}>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Ingredient Breakdown</h2>
              <button style={{ padding: '6px 12px', background: '#F3F4F6', border: '1px solid #D1D5DB', borderRadius: '4px', cursor: 'pointer' }}>+ Add Ingredient</button>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#697386' }}>
                  <th style={{ padding: '12px 0', fontWeight: 500 }}>Ingredient</th>
                  <th style={{ padding: '12px 0', fontWeight: 500 }}>Quantity</th>
                  <th style={{ padding: '12px 0', fontWeight: 500, textAlign: 'right' }}>Cost Contribution</th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map((ing, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '16px 0' }}>{ing.name}</td>
                    <td style={{ padding: '16px 0' }}>{ing.quantity} {ing.unit}</td>
                    <td style={{ padding: '16px 0', textAlign: 'right', fontWeight: 500 }}>${ing.costContribution.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} style={{ padding: '16px 0', fontWeight: 'bold', textAlign: 'right' }}>Total Food Cost:</td>
                  <td style={{ padding: '16px 0', fontWeight: 'bold', textAlign: 'right', fontSize: '18px' }}>${totalFoodCost.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: '#fff', border: isCritical ? '2px solid #EF4444' : '1px solid #E5E7EB', borderRadius: '8px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', color: '#697386', marginBottom: '8px' }}>Profit Margin</h3>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: isCritical ? '#EF4444' : '#10B981' }}>
              {profitMargin.toFixed(1)}%
            </div>
            {isCritical && (
              <div style={{ marginTop: '12px', padding: '8px', background: '#FEF2F2', color: '#B91C1C', borderRadius: '4px', fontSize: '14px' }}>
                ⚠️ Critical Margin: Below 30% target. Consider adjusting selling price or ingredient portions.
              </div>
            )}
          </div>

          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#697386' }}>Selling Price</span>
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>${recipe.basePrice.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#697386' }}>Target Margin (30%)</span>
              <span style={{ fontWeight: 'bold', color: '#10B981' }}>${(totalFoodCost / 0.7).toFixed(2)} recommended</span>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', color: '#697386', marginBottom: '16px' }}>Nutritional Facts</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Calories</span>
              <span style={{ fontWeight: 'bold' }}>{recipe.calories} kcal</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Prep Time</span>
              <span style={{ fontWeight: 'bold' }}>{recipe.prepTimeMinutes} mins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
