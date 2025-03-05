
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Update prop types to accept meal data
export interface MealTimeAnalysisProps {
  mealData: {
    breakfast: any[];
    lunch: any[];
    dinner: any[];
    snack: any[];
  };
}

const MealTimeAnalysis: React.FC<MealTimeAnalysisProps> = ({ mealData }) => {
  // Calculate total calories per meal type
  const breakfastCalories = mealData.breakfast.reduce((sum, food) => sum + food.calories, 0);
  const lunchCalories = mealData.lunch.reduce((sum, food) => sum + food.calories, 0);
  const dinnerCalories = mealData.dinner.reduce((sum, food) => sum + food.calories, 0);
  const snackCalories = mealData.snack.reduce((sum, food) => sum + food.calories, 0);
  
  const totalCalories = breakfastCalories + lunchCalories + dinnerCalories + snackCalories;
  
  // Prepare data for the pie chart
  const data = [
    { name: 'Desayuno', value: breakfastCalories, color: '#42A5F5' },
    { name: 'Almuerzo', value: lunchCalories, color: '#66BB6A' },
    { name: 'Cena', value: dinnerCalories, color: '#FFA726' },
    { name: 'Snacks', value: snackCalories, color: '#FF7043' },
  ].filter(item => item.value > 0); // Only include meals with calories
  
  if (data.length === 0) {
    return null; // Don't render if no data
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-[#424242]">Distribución de calorías</CardTitle>
        <CardDescription>Análisis por tiempo de comida</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} kcal`, 'Calorías']}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #E0E0E0',
                  backgroundColor: 'white',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <div className="flex flex-col">
            <span className="font-medium text-[#424242]">Total de calorías</span>
            <span className="text-[#757575]">{totalCalories} kcal</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-[#424242]">Comidas registradas</span>
            <span className="text-[#757575]">{
              Object.values(mealData).reduce((sum, meals) => sum + meals.length, 0)
            }</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealTimeAnalysis;
