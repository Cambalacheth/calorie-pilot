
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import { Button } from '@/components/ui/button';
import DailyProgress from "@/components/DailyProgress";
import BottomNavBar from "@/components/BottomNavBar";
import Layout from "@/components/Layout";
import { useFood } from "@/context/FoodContext";
import FoodSearch from '@/components/FoodSearch';
import QuickScanButton from '@/components/QuickScanButton';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import DashboardHeader from '@/components/DashboardHeader';
import MealSections from '@/components/MealSections';
import DashboardCharts from '@/components/DashboardCharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const { dailyLogs, dailyCalories, dailyProtein, dailyCarbs, dailyFat, addFood, streak } = useFood();
  const [date, setDate] = useState<Date>(new Date());
  
  const selectedDateStr = format(date, 'yyyy-MM-dd');
  const isToday = selectedDateStr === format(new Date(), 'yyyy-MM-dd');
  
  const dailyLog = dailyLogs[selectedDateStr] || { date: selectedDateStr, entries: [] };
  
  const breakfastEntries = dailyLog.entries.filter(food => food.mealType === 'breakfast');
  const lunchEntries = dailyLog.entries.filter(food => food.mealType === 'lunch');
  const dinnerEntries = dailyLog.entries.filter(food => food.mealType === 'dinner');
  const snackEntries = dailyLog.entries.filter(food => food.mealType === 'snack' || !food.mealType);

  // Prepare meal data for MealTimeAnalysis component
  const mealData = [
    ...breakfastEntries.map(entry => ({
      meal: 'desayuno',
      calories: entry.calories,
      protein: entry.protein,
      carbs: entry.carbs,
      fat: entry.fat,
      fiber: entry.fiber || 0,
      insights: entry.insights || []
    })),
    ...lunchEntries.map(entry => ({
      meal: 'almuerzo',
      calories: entry.calories,
      protein: entry.protein,
      carbs: entry.carbs,
      fat: entry.fat,
      fiber: entry.fiber || 0,
      insights: entry.insights || []
    })),
    ...dinnerEntries.map(entry => ({
      meal: 'cena',
      calories: entry.calories,
      protein: entry.protein,
      carbs: entry.carbs,
      fat: entry.fat,
      fiber: entry.fiber || 0,
      insights: entry.insights || []
    })),
    ...snackEntries.map(entry => ({
      meal: 'snacks',
      calories: entry.calories,
      protein: entry.protein,
      carbs: entry.carbs,
      fat: entry.fat,
      fiber: entry.fiber || 0,
      insights: entry.insights || []
    }))
  ];

  const handleQuickAddFood = (selectedFood: any) => {
    const newFood = {
      ...selectedFood,
      id: uuidv4(),
      date: date,
    };
    
    addFood(newFood);
    toast.success(`${selectedFood.name} añadido a ${format(date, 'EEEE, d MMMM', { locale: 'es' })}`);
  };

  const handleQuickScan = (barcode: string) => {
    navigate(`/add?barcode=${barcode}`);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto p-4 pb-20">
        <DashboardHeader 
          date={date} 
          setDate={setDate} 
          streak={streak} 
        />

        <div className="mb-6">
          <FoodSearch 
            onFoodSelect={handleQuickAddFood} 
            placeholder="Buscar y agregar alimento rápidamente..."
          />
        </div>
        
        <DailyProgress
          calories={dailyCalories}
          protein={dailyProtein}
          carbs={dailyCarbs}
          fat={dailyFat}
          date={date}
        />

        <DashboardCharts 
          dailyProtein={dailyProtein}
          dailyCarbs={dailyCarbs}
          dailyFat={dailyFat}
          mealData={mealData}
        />

        <MealSections
          breakfastEntries={breakfastEntries}
          lunchEntries={lunchEntries}
          dinnerEntries={dinnerEntries}
          snackEntries={snackEntries}
          date={date}
        />
        
        <QuickScanButton onScan={handleQuickScan} />
      </div>
      <BottomNavBar />
    </Layout>
  );
};

export default Dashboard;
