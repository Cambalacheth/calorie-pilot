
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFood } from '@/context/FoodContext';
import { subDays, subMonths, subYears } from 'date-fns';

interface TopFoodsChartProps {
  timeRange: 'week' | 'month' | 'year';
}

const TopFoodsChart: React.FC<TopFoodsChartProps> = ({ timeRange }) => {
  const { foods } = useFood();
  
  // Get foods within the selected time range
  const getFilteredFoods = () => {
    const today = new Date();
    let startDate: Date;
    
    switch (timeRange) {
      case 'week':
        startDate = subDays(today, 7);
        break;
      case 'month':
        startDate = subMonths(today, 1);
        break;
      case 'year':
        startDate = subYears(today, 1);
        break;
    }
    
    return foods.filter(food => new Date(food.date) >= startDate);
  };

  // Count food occurrences
  const getFoodCounts = () => {
    const filteredFoods = getFilteredFoods();
    const foodCounts: Record<string, { name: string, count: number, calories: number }> = {};
    
    filteredFoods.forEach(food => {
      if (!foodCounts[food.name]) {
        foodCounts[food.name] = { name: food.name, count: 0, calories: 0 };
      }
      foodCounts[food.name].count += 1;
      foodCounts[food.name].calories += food.calories;
    });
    
    return Object.values(foodCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Get top 5
  };

  const topFoods = getFoodCounts();
  
  if (topFoods.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-secondary/30 rounded-lg p-4">
        <p className="text-muted-foreground text-center">
          No hay datos suficientes para mostrar el gráfico.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={topFoods}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.2} />
          <XAxis type="number" />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={100}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value, name) => [
              name === 'count' ? `${value} veces` : `${value} kcal total`, 
              name === 'count' ? 'Frecuencia' : 'Calorías'
            ]}
          />
          <Bar dataKey="count" fill="#4f46e5" radius={[0, 4, 4, 0]} name="Frecuencia" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopFoodsChart;
