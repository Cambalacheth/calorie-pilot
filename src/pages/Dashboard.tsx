
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import NutritionSummaryCard from '@/components/NutritionSummaryCard';
import MacronutrientChart from '@/components/MacronutrientChart';
import FoodEntryForm from '@/components/FoodEntryForm';
import FoodList from '@/components/FoodList';
import { useFood } from '@/context/FoodContext';
import { Button } from '@/components/ui/button';
import { Calendar, Camera, Edit3, FileBarChart, Mic, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import DailyProgress from '@/components/DailyProgress';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { dailyCalories, dailyProtein, dailyCarbs, dailyFat } = useFood();
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);

  const mealTypes = [
    { id: 'breakfast', label: 'Desayuno' },
    { id: 'lunch', label: 'Almuerzo' },
    { id: 'dinner', label: 'Cena' },
    { id: 'snack', label: 'Snacks' }
  ];

  const handleMealTypeFilter = (type: string) => {
    setSelectedMealType(prevType => prevType === type ? null : type);
  };

  const today = new Date();
  const formattedDate = format(today, "EEEE, d 'de' MMMM", { locale: es });

  return (
    <Layout>
      <div className="container px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Calorie Pilot</h1>
            <span className="ml-2 bg-primary/20 text-primary px-1.5 py-0.5 rounded-md text-xs font-medium">IA</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium hidden md:inline">{formattedDate}</span>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Daily Progress */}
        <div className="mb-6">
          <DailyProgress 
            calories={dailyCalories} 
            calorieGoal={2000} 
          />
        </div>

        {/* Quick Access Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2 shadow-sm" variant="secondary">
            <Camera className="h-5 w-5" />
            <span>Subir foto</span>
          </Button>
          <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2 shadow-sm" variant="secondary">
            <Mic className="h-5 w-5" />
            <span>Grabar voz</span>
          </Button>
          <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2 shadow-sm" variant="secondary">
            <Edit3 className="h-5 w-5" />
            <span>Escribir manualmente</span>
          </Button>
          <Link to="/analysis" className="block">
            <Button className="h-auto py-4 w-full flex flex-col items-center justify-center gap-2 shadow-sm" variant="secondary">
              <FileBarChart className="h-5 w-5" />
              <span>Ver análisis</span>
            </Button>
          </Link>
        </div>

        {/* Meal Type Filter */}
        <div className="flex overflow-x-auto gap-2 mb-4 pb-2">
          {mealTypes.map(type => (
            <Button 
              key={type.id}
              variant={selectedMealType === type.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleMealTypeFilter(type.id)}
              className="flex-shrink-0"
            >
              {type.label}
            </Button>
          ))}
        </div>

        {/* Daily Foods List */}
        <div className="relative mb-6">
          <h2 className="text-lg font-medium mb-3">Comidas de Hoy</h2>
          <FoodList mealTypeFilter={selectedMealType} />
          
          <div className="fixed bottom-6 right-6 z-10">
            <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Additional Stats */}
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
      </div>
    </Layout>
  );
};

export default Dashboard;
