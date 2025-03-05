import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, Plus, Utensils, Coffee, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import DailyProgress from "@/components/DailyProgress";
import MacronutrientChart from "@/components/MacronutrientChart";
import MealTimeAnalysis from "@/components/MealTimeAnalysis";
import BottomNavBar from "@/components/BottomNavBar";
import Layout from "@/components/Layout";
import FoodList from "@/components/FoodList";
import { useFood } from "@/context/FoodContext";
import StreakCounter from "@/components/StreakCounter";
import FoodSearch from '@/components/FoodSearch';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const { dailyLogs, dailyCalories, dailyProtein, dailyCarbs, dailyFat, addFood, streak } = useFood();
  const [date, setDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const selectedDateStr = format(date, 'yyyy-MM-dd');
  const selectedDateFormatted = format(date, 'EEEE, d MMMM', { locale: es });
  const isToday = selectedDateStr === format(new Date(), 'yyyy-MM-dd');
  
  const dailyLog = dailyLogs[selectedDateStr] || { date: selectedDateStr, entries: [] };
  
  const breakfastEntries = dailyLog.entries.filter(food => food.mealType === 'breakfast');
  const lunchEntries = dailyLog.entries.filter(food => food.mealType === 'lunch');
  const dinnerEntries = dailyLog.entries.filter(food => food.mealType === 'dinner');
  const snackEntries = dailyLog.entries.filter(food => food.mealType === 'snack' || !food.mealType);

  const handleQuickAddFood = (selectedFood: any) => {
    const newFood = {
      ...selectedFood,
      id: uuidv4(),
      date: date,
    };
    
    addFood(newFood);
    toast.success(`${selectedFood.name} añadido a ${selectedDateFormatted}`);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto p-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#212121]">Mi Diario</h1>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center p-0 h-auto font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-[#FF7043]" />
                  <span className="text-[#424242]">{selectedDateFormatted}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    if (newDate) {
                      setDate(newDate);
                      setIsCalendarOpen(false);
                    }
                  }}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <StreakCounter streak={streak} />
          </div>
        </div>

        {/* Búsqueda rápida para agregar alimentos */}
        <div className="mb-6">
          <FoodSearch 
            onFoodSelect={handleQuickAddFood} 
            placeholder="Buscar y agregar alimento rápidamente..."
          />
        </div>
        
        {/* Progreso Diario */}
        <DailyProgress
          dailyCalories={dailyCalories}
          dailyProtein={dailyProtein}
          dailyCarbs={dailyCarbs}
          dailyFat={dailyFat}
          date={date}
        />

        {/* Macronutrientes */}
        <div className="my-6">
          <MacronutrientChart
            protein={dailyProtein}
            carbs={dailyCarbs}
            fat={dailyFat}
          />
        </div>

        {/* Comidas del día */}
        <div className="space-y-4">
          {/* Desayuno */}
          <MealSection
            title="Desayuno"
            icon={<Coffee className="h-5 w-5" />}
            foodEntries={breakfastEntries}
            onAddClick={() => {
              navigate('/add', { state: { mealType: 'breakfast', date } });
            }}
            date={date}
            mealType="breakfast"
          />
          
          {/* Almuerzo */}
          <MealSection
            title="Almuerzo"
            icon={<Utensils className="h-5 w-5" />}
            foodEntries={lunchEntries}
            onAddClick={() => {
              navigate('/add', { state: { mealType: 'lunch', date } });
            }}
            date={date}
            mealType="lunch"
          />
          
          {/* Cena */}
          <MealSection
            title="Cena"
            icon={<Utensils className="h-5 w-5" />}
            foodEntries={dinnerEntries}
            onAddClick={() => {
              navigate('/add', { state: { mealType: 'dinner', date } });
            }}
            date={date}
            mealType="dinner"
          />
          
          {/* Snacks */}
          <MealSection
            title="Snacks"
            icon={<Apple className="h-5 w-5" />}
            foodEntries={snackEntries}
            onAddClick={() => {
              navigate('/add', { state: { mealType: 'snack', date } });
            }}
            date={date}
            mealType="snack"
          />
        </div>
        
        {/* Análisis de tiempo de comidas (más detallado) */}
        <div className="mt-6">
          <MealTimeAnalysis />
        </div>
      </div>
      <BottomNavBar />
    </Layout>
  );
};

// MealSection Component
interface MealSectionProps {
  title: string;
  icon: React.ReactNode;
  foodEntries: any[];
  onAddClick: () => void;
  date: Date;
  mealType: string;
}

const MealSection: React.FC<MealSectionProps> = ({
  title,
  icon,
  foodEntries,
  onAddClick,
  date,
  mealType,
}) => {
  const formattedDate = format(date, 'yyyy-MM-dd');

  return (
    <Card className="shadow-sm">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center">
          {icon}
          <h2 className="text-lg font-semibold ml-2 text-[#424242]">{title}</h2>
        </div>
        <Button size="sm" onClick={onAddClick}>
          <Plus className="h-4 w-4 mr-2" /> Agregar
        </Button>
      </div>
      <FoodList foodEntries={foodEntries} date={formattedDate} mealType={mealType} />
    </Card>
  );
};

export default Dashboard;
