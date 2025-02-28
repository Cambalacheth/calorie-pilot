
import React from 'react';
import Layout from '@/components/Layout';
import NutritionSummaryCard from '@/components/NutritionSummaryCard';
import MacronutrientChart from '@/components/MacronutrientChart';
import FoodEntryForm from '@/components/FoodEntryForm';
import FoodList from '@/components/FoodList';
import { useFood } from '@/context/FoodContext';

const Dashboard = () => {
  const { dailyCalories, dailyProtein, dailyCarbs, dailyFat } = useFood();

  return (
    <Layout>
      <div className="container px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NutritionSummaryCard 
              calories={dailyCalories} 
              protein={dailyProtein} 
              carbs={dailyCarbs} 
              fat={dailyFat} 
            />
            <MacronutrientChart 
              protein={dailyProtein}
              carbs={dailyCarbs}
              fat={dailyFat}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FoodEntryForm />
            <FoodList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
