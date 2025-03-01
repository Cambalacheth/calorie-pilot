
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import NutritionSummaryCard from '@/components/NutritionSummaryCard';
import MacronutrientChart from '@/components/MacronutrientChart';
import FoodList from '@/components/FoodList';
import { useFood } from '@/context/FoodContext';
import { Button } from '@/components/ui/button';
import { Calendar, Camera, Settings, Bell, ChevronDown, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import DailyProgress from '@/components/DailyProgress';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { dailyCalories, dailyProtein, dailyCarbs, dailyFat } = useFood();
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);

  const today = new Date();
  const formattedDate = format(today, "'Today,' MMMM d", { locale: es });

  const handleMealTypeFilter = (type: string) => {
    setSelectedMealType(prevType => prevType === type ? null : type);
  };

  const calorieGoal = 2000;
  const remainingCalories = Math.max(calorieGoal - dailyCalories, 0);

  return (
    <div className="min-h-screen bg-emerald-800 text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Cal AI</h1>
          <span className="ml-2 bg-emerald-700/50 text-white px-1.5 py-0.5 rounded-md text-xs font-medium">AI</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-emerald-700">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-emerald-700">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <div className="p-2 text-center text-sm text-emerald-200">
        {formattedDate}
      </div>

      {/* Main Circular Progress */}
      <div className="flex flex-col items-center justify-center px-4 py-8">
        <div className="relative w-60 h-60 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="5" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="rgba(255,255,255,0.8)" 
              strokeWidth="5" 
              strokeDasharray={`${(dailyCalories / calorieGoal) * 283} 283`} 
              strokeLinecap="round" 
              transform="rotate(-90 50 50)" 
            />
          </svg>
          <div className="absolute text-center">
            <div className="text-4xl font-bold">{remainingCalories}</div>
            <div className="text-sm opacity-80">KCAL LEFT</div>
          </div>
          
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center text-xs">
            <div className="font-bold text-sm">0</div>
            <div className="opacity-70">BURNED</div>
          </div>
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-xs">
            <div className="font-bold text-sm">{dailyCalories}</div>
            <div className="opacity-70">EARNED</div>
          </div>
        </div>
        
        {/* Macronutrients Display */}
        <div className="w-full mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="uppercase text-xs opacity-70">Carbs</div>
            <div className="font-semibold">{dailyCarbs.toFixed(1)}g</div>
            <div className="h-1 bg-white/20 rounded mt-1">
              <div 
                className="h-full bg-white rounded" 
                style={{ width: `${Math.min((dailyCarbs / 200) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="uppercase text-xs opacity-70">Protein</div>
            <div className="font-semibold">{dailyProtein.toFixed(1)}g</div>
            <div className="h-1 bg-white/20 rounded mt-1">
              <div 
                className="h-full bg-white rounded" 
                style={{ width: `${Math.min((dailyProtein / 150) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="uppercase text-xs opacity-70">Fat</div>
            <div className="font-semibold">{dailyFat.toFixed(1)}g</div>
            <div className="h-1 bg-white/20 rounded mt-1">
              <div 
                className="h-full bg-white rounded" 
                style={{ width: `${Math.min((dailyFat / 65) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="text-emerald-100 mt-4">
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>
      
      {/* White Content Area */}
      <div className="flex-1 bg-white text-slate-800 rounded-t-3xl p-4">
        <div className="flex justify-between items-center mt-2 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium">{format(today, "EEEE, MMMM d")}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-emerald-600">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Meal Cards */}
        <div className="space-y-3">
          <Card className="shadow-sm">
            <CardContent className="p-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <img src="/lovable-uploads/0a8a6a5b-8c67-43e2-8540-2330a7747ec9.png" alt="Breakfast" className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium">Add breakfast</div>
                  <div className="text-xs text-slate-500">Recommended: 640 - 675 kcal</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-emerald-600">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <img src="/lovable-uploads/0a8a6a5b-8c67-43e2-8540-2330a7747ec9.png" alt="Lunch" className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium">Add lunch</div>
                  <div className="text-xs text-slate-500">Recommended: 697 - 703 kcal</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-emerald-600">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <img src="/lovable-uploads/0a8a6a5b-8c67-43e2-8540-2330a7747ec9.png" alt="Dinner" className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium">Add dinner</div>
                  <div className="text-xs text-slate-500">Recommended: 597 - 603 kcal</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-emerald-600">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3">
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto">
            <Calendar className="h-5 w-5 text-slate-400" />
            <span className="text-xs text-slate-400">Diary</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center -mt-6">
              <PlusCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs text-slate-400 mt-1">Add</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto">
            <Camera className="h-5 w-5 text-slate-400" />
            <span className="text-xs text-slate-400">Scan</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
