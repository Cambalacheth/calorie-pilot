
import React from 'react';
import MacronutrientChart from '@/components/MacronutrientChart';
import MealTimeAnalysis from '@/components/MealTimeAnalysis';

interface DashboardChartsProps {
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  mealData: {
    meal: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    insights: string[];
  }[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ 
  dailyProtein, 
  dailyCarbs, 
  dailyFat,
  mealData
}) => {
  return (
    <>
      <div className="my-6">
        <MacronutrientChart
          protein={dailyProtein}
          carbs={dailyCarbs}
          fat={dailyFat}
        />
      </div>

      <div className="mt-6">
        <MealTimeAnalysis
          mealData={mealData}
        />
      </div>
    </>
  );
};

export default DashboardCharts;
