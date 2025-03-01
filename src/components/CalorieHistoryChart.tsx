
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFood, Food } from '@/context/FoodContext';
import { subDays, subMonths, subYears, format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { es } from 'date-fns/locale';

interface CalorieHistoryChartProps {
  timeRange: 'week' | 'month' | 'year';
}

const CalorieHistoryChart: React.FC<CalorieHistoryChartProps> = ({ timeRange }) => {
  const { foods } = useFood();
  
  // Generate data based on time range
  const generateData = () => {
    const today = new Date();
    let startDate: Date;
    let dateFormat: string;
    
    switch (timeRange) {
      case 'week':
        startDate = subDays(today, 6);
        dateFormat = 'EEE';
        break;
      case 'month':
        startDate = subDays(today, 29);
        dateFormat = 'dd MMM';
        break;
      case 'year':
        startDate = subMonths(today, 11);
        dateFormat = 'MMM';
        break;
    }
    
    // Generate date intervals
    const dates = [];
    let current = new Date(startDate);
    
    while (current <= today) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + (timeRange === 'year' ? 30 : 1));
    }
    
    // Map dates to data points
    return dates.map(date => {
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      
      const dayFoods = foods.filter(
        food => new Date(food.date) >= dayStart && new Date(food.date) <= dayEnd
      );
      
      return {
        date: format(date, dateFormat, { locale: es }),
        calories: dayFoods.reduce((sum, food) => sum + food.calories, 0),
        protein: dayFoods.reduce((sum, food) => sum + food.protein, 0),
        carbs: dayFoods.reduce((sum, food) => sum + food.carbs, 0),
        fat: dayFoods.reduce((sum, food) => sum + food.fat, 0),
      };
    });
  };
  
  const data = generateData();
  
  if (data.every(day => day.calories === 0)) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-secondary/30 rounded-lg p-4">
        <p className="text-muted-foreground text-center">
          No hay datos suficientes para mostrar el gráfico.
        </p>
      </div>
    );
  }
  
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 15 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'calories') return [`${value} kcal`, 'Calorías'];
              return [`${value}g`, name === 'protein' ? 'Proteínas' : name === 'carbs' ? 'Carbohidratos' : 'Grasas'];
            }}
          />
          <Legend 
            formatter={(value) => {
              if (value === 'calories') return 'Calorías';
              if (value === 'protein') return 'Proteínas';
              if (value === 'carbs') return 'Carbohidratos';
              if (value === 'fat') return 'Grasas';
              return value;
            }}
          />
          <Bar yAxisId="left" dataKey="calories" fill="#8884d8" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="protein" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="carbs" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="fat" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CalorieHistoryChart;
