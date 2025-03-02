
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import NutritionSummaryCard from '@/components/NutritionSummaryCard';
import MacronutrientChart from '@/components/MacronutrientChart';
import FoodList from '@/components/FoodList';
import { useFood } from '@/context/FoodContext';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Camera, 
  Settings, 
  Bell, 
  ChevronDown, 
  PlusCircle,
  BarChart2,
  NotebookPen,
  Brain,
  BookOpenText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { format, subDays, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import DailyProgress from '@/components/DailyProgress';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { foods, dailyCalories, dailyProtein, dailyCarbs, dailyFat } = useFood();
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [settingsUpdated, setSettingsUpdated] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userGoals, setUserGoals] = useState({
    calorieGoal: 2000,
    proteinGoal: 150,
    carbsGoal: 200,
    fatGoal: 65
  });

  const formattedDate = format(selectedDate, "'Hoy,' MMMM d", { locale: es });
  const displayDate = format(selectedDate, "EEEE, MMMM d", { locale: es });
  
  const handlePreviousDay = () => {
    setSelectedDate(prev => subDays(prev, 1));
  };
  
  const handleNextDay = () => {
    setSelectedDate(prev => addDays(prev, 1));
  };

  const handleMealTypeFilter = (type: string) => {
    setSelectedMealType(prevType => prevType === type ? null : type);
  };

  // Fetch user goals from Supabase
  useEffect(() => {
    const fetchUserGoals = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('calorie_goal, protein_goal, carbs_goal, fat_goal')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setUserGoals({
            calorieGoal: data.calorie_goal || 2000,
            proteinGoal: data.protein_goal || 150,
            carbsGoal: data.carbs_goal || 200,
            fatGoal: data.fat_goal || 65
          });
        }
      } catch (error) {
        console.error('Error fetching profile goals:', error);
      }
    };
    
    fetchUserGoals();
  }, [user, settingsUpdated]);

  // Function to handle settings button click
  const handleSettingsClick = () => {
    navigate('/settings');
  };

  // Function to handle notifications button click
  const handleNotificationsClick = () => {
    toast.info('Notificaciones próximamente', {
      description: 'La función de notificaciones estará disponible pronto.'
    });
  };
  
  // Listen for settings changes via custom event
  useEffect(() => {
    const handleSettingsChange = () => {
      setSettingsUpdated(prev => prev + 1);
    };
    
    window.addEventListener('settings-updated', handleSettingsChange);
    
    return () => {
      window.removeEventListener('settings-updated', handleSettingsChange);
    };
  }, []);

  const calorieGoal = userGoals.calorieGoal;
  const remainingCalories = Math.max(calorieGoal - dailyCalories, 0);
  
  // Filter foods by meal type
  const getFoodsByMealType = (mealType: string) => {
    return foods.filter(food => 
      food.mealType === mealType && 
      format(new Date(food.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );
  };
  
  const breakfastFoods = getFoodsByMealType('breakfast');
  const lunchFoods = getFoodsByMealType('lunch');
  const dinnerFoods = getFoodsByMealType('dinner');
  const snackFoods = getFoodsByMealType('snack');

  const handleAddFood = (mealType: string) => {
    navigate(`/add-food?mealType=${mealType}`);
  };

  return (
    <div className="min-h-screen bg-emerald-800 text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Cal AI</h1>
          <span className="ml-2 bg-emerald-700/50 text-white px-1.5 py-0.5 rounded-md text-xs font-medium">AI</span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-emerald-700"
            onClick={handleSettingsClick}
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-emerald-700"
            onClick={handleNotificationsClick}
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <div className="p-2 text-center text-sm text-emerald-200">
        {formattedDate}
      </div>

      {/* Main Circular Progress */}
      <div className="flex flex-col items-center justify-center px-4 py-6">
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
            <div className="text-sm opacity-80">KCAL RESTANTES</div>
          </div>
          
          {/* Moved outside the circle to prevent overlapping */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-center text-xs bg-emerald-700/70 px-3 py-1 rounded-full">
            <div className="font-bold text-sm">0</div>
            <div className="opacity-70">QUEMADAS</div>
          </div>
          
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center text-xs bg-emerald-700/70 px-3 py-1 rounded-full">
            <div className="font-bold text-sm">{dailyCalories}</div>
            <div className="opacity-70">CONSUMIDAS</div>
          </div>
        </div>
        
        {/* Macronutrients Display */}
        <div className="w-full mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="uppercase text-xs opacity-70">Carbos</div>
            <div className="font-semibold">{dailyCarbs.toFixed(1)}g</div>
            <div className="h-1 bg-white/20 rounded mt-1">
              <div 
                className="h-full bg-white rounded" 
                style={{ width: `${Math.min((dailyCarbs / userGoals.carbsGoal) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="uppercase text-xs opacity-70">Proteína</div>
            <div className="font-semibold">{dailyProtein.toFixed(1)}g</div>
            <div className="h-1 bg-white/20 rounded mt-1">
              <div 
                className="h-full bg-white rounded" 
                style={{ width: `${Math.min((dailyProtein / userGoals.proteinGoal) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="uppercase text-xs opacity-70">Grasa</div>
            <div className="font-semibold">{dailyFat.toFixed(1)}g</div>
            <div className="h-1 bg-white/20 rounded mt-1">
              <div 
                className="h-full bg-white rounded" 
                style={{ width: `${Math.min((dailyFat / userGoals.fatGoal) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* White Content Area */}
      <div className="flex-1 bg-white text-slate-800 rounded-t-3xl p-4 pb-20">
        {/* Date Navigation */}
        <div className="flex justify-between items-center mt-2 mb-4">
          <Button variant="ghost" size="sm" onClick={handlePreviousDay} className="text-emerald-600">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium">{displayDate}</span>
          </div>
          
          <Button variant="ghost" size="sm" onClick={handleNextDay} className="text-emerald-600">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Meal Sections */}
        <div className="space-y-4">
          {/* Breakfast Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium text-slate-700">Desayuno</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-emerald-600 h-auto py-1"
                onClick={() => handleAddFood('breakfast')}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">Añadir</span>
              </Button>
            </div>
            
            {breakfastFoods.length > 0 ? (
              <div className="space-y-2">
                {breakfastFoods.map(food => (
                  <Card key={food.id} className="shadow-sm overflow-hidden">
                    <CardContent className="p-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg w-12 h-12 flex items-center justify-center overflow-hidden">
                          {food.image ? (
                            <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                          ) : (
                            <img src="/lovable-uploads/0a8a6a5b-8c67-43e2-8540-2330a7747ec9.png" alt="Food" className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{food.name}</div>
                          <div className="flex gap-2 text-xs text-slate-500">
                            <span>{food.calories} kcal</span>
                            <span className="text-indigo-600">{food.protein}g P</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="shadow-sm">
                <CardContent className="p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <img src="/lovable-uploads/0a8a6a5b-8c67-43e2-8540-2330a7747ec9.png" alt="Breakfast" className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">Añadir desayuno</div>
                      <div className="text-xs text-slate-500">Recomendado: 640 - 675 kcal</div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-emerald-600"
                    onClick={() => handleAddFood('breakfast')}
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Lunch Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium text-slate-700">Almuerzo</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-emerald-600 h-auto py-1"
                onClick={() => handleAddFood('lunch')}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">Añadir</span>
              </Button>
            </div>
            
            {lunchFoods.length > 0 ? (
              <div className="space-y-2">
                {lunchFoods.map(food => (
                  <Card key={food.id} className="shadow-sm overflow-hidden">
                    <CardContent className="p-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 p-2 rounded-lg w-12 h-12 flex items-center justify-center overflow-hidden">
                          {food.image ? (
                            <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                          ) : (
                            <img src="/lovable-uploads/0a8a6a5b-8c67-43e2-8540-2330a7747ec9.png" alt="Food" className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{food.name}</div>
                          <div className="flex gap-2 text-xs text-slate-500">
                            <span>{food.calories} kcal</span>
                            <span className="text-indigo-600">{food.protein}g P</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="shadow-sm">
                <CardContent className="p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <img src="/lovable-uploads/0a8a6a5b-8c67-43e2-8540-2330a7747ec9.png" alt="Lunch" className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">Añadir almuerzo</div>
                      <div className="text-xs text-slate-500">Recomendado: 697 - 703 kcal</div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-emerald-600"
                    onClick={() => handleAddFood('lunch')}
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Dinner Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium text-slate-700">Cena</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-emerald-600 h-auto py-1"
                onClick={() => handleAddFood('dinner')}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">Añadir</span>
              </Button>
            </div>
            
            {dinnerFoods.length > 0 ? (
              <div className="space-y-2">
                {dinnerFoods.map(food => (
                  <Card key={food.id} className="shadow-sm overflow-hidden">
                    <CardContent className="p-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg w-12 h-12 flex items-center justify-center overflow-hidden">
                          {food.image ? (
                            <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                          ) : (
                            <img src="/lovable-uploads/0a8a6a5b-8c67-43e2-8540-2330a7747ec9.png" alt="Food" className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{food.name}</div>
                          <div className="flex gap-2 text-xs text-slate-500">
                            <span>{food.calories} kcal</span>
                            <span className="text-indigo-600">{food.protein}g P</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="shadow-sm">
                <CardContent className="p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <img src="/lovable-uploads/0a8a6a5b-8c67-43e2-8540-2330a7747ec9.png" alt="Dinner" className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">Añadir cena</div>
                      <div className="text-xs text-slate-500">Recomendado: 597 - 603 kcal</div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-emerald-600"
                    onClick={() => handleAddFood('dinner')}
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Snacks Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium text-slate-700">Snacks</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-emerald-600 h-auto py-1"
                onClick={() => handleAddFood('snack')}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">Añadir</span>
              </Button>
            </div>
            
            {snackFoods.length > 0 ? (
              <div className="space-y-2">
                {snackFoods.map(food => (
                  <Card key={food.id} className="shadow-sm overflow-hidden">
                    <CardContent className="p-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-lg w-12 h-12 flex items-center justify-center overflow-hidden">
                          {food.image ? (
                            <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                          ) : (
                            <img src="/lovable-uploads/0a8a6a5b-8c67-43e2-8540-2330a7747ec9.png" alt="Food" className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{food.name}</div>
                          <div className="flex gap-2 text-xs text-slate-500">
                            <span>{food.calories} kcal</span>
                            <span className="text-indigo-600">{food.protein}g P</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="shadow-sm">
                <CardContent className="p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <img src="/lovable-uploads/0a8a6a5b-8c67-43e2-8540-2330a7747ec9.png" alt="Snack" className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">Añadir snack</div>
                      <div className="text-xs text-slate-500">Recomendado: 100 - 200 kcal</div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-emerald-600"
                    onClick={() => handleAddFood('snack')}
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#FFF8E1] text-[#212121] border-t shadow-lg flex justify-around items-center px-2 z-10">
        <Link to="/dashboard" className="flex flex-col items-center py-2 px-3 text-center">
          <NotebookPen className="h-6 w-6 text-[#FF7043]" />
          <span className="text-xs mt-1 font-medium">Diario</span>
        </Link>
        
        <Link to="/analysis" className="flex flex-col items-center py-2 px-3 text-center">
          <BarChart2 className="h-6 w-6" />
          <span className="text-xs mt-1">Progreso</span>
        </Link>
        
        <div className="flex flex-col items-center -mt-5">
          <Link 
            to="/add-food" 
            className="w-14 h-14 rounded-full bg-[#FF7043] flex items-center justify-center shadow-lg border-4 border-[#FFF8E1]"
          >
            <PlusCircle className="h-8 w-8 text-white" />
          </Link>
          <span className="text-xs mt-1">Añadir</span>
        </div>
        
        <Link to="/nutrient-analysis" className="flex flex-col items-center py-2 px-3 text-center">
          <Brain className="h-6 w-6" />
          <span className="text-xs mt-1">Análisis</span>
        </Link>
        
        <Link to="/recipes" className="flex flex-col items-center py-2 px-3 text-center">
          <BookOpenText className="h-6 w-6" />
          <span className="text-xs mt-1">Recetas</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
