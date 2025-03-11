import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: Date;
  image?: string;
  mealType?: string; // breakfast, lunch, dinner, snack
  userId?: string; // Add userId to the interface
  fiber?: number; // Added fiber property
  insights?: string[]; // Added insights property
}

export interface FoodLog {
  date: string;
  entries: Food[];
}

interface FoodContextProps {
  foods: Food[];
  addFood: (food: Food) => Promise<void>;
  removeFood: (id: string) => Promise<void>;
  dailyLogs: Record<string, FoodLog>;
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  clearFoods: () => Promise<void>;
  streak: number;
  activeDates: string[];
  isLoading: boolean;
  searchFoods: (term: string) => Food[];
}

const FoodContext = createContext<FoodContextProps | undefined>(undefined);

export const FoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [dailyLogs, setDailyLogs] = useState<Record<string, FoodLog>>({});
  const [streak, setStreak] = useState<number>(0);
  const [activeDates, setActiveDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchFoods = async () => {
      setIsLoading(true);
      try {
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id || '00000000-0000-0000-0000-000000000000';
        
        const { data, error } = await supabase
          .from('foods')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching foods:', error);
          return;
        }

        if (data) {
          const formattedFoods: Food[] = data.map(item => ({
            id: item.id,
            name: item.name,
            calories: item.calories,
            protein: Number(item.protein),
            carbs: Number(item.carbs),
            fat: Number(item.fat),
            date: new Date(item.date),
            mealType: item.meal_type,
            image: item.image_url,
            userId: item.user_id,
            fiber: item.fiber,
            insights: item.insights
          }));
          setFoods(formattedFoods);
          
          const logs: Record<string, FoodLog> = {};
          formattedFoods.forEach(food => {
            const dateStr = formatDate(food.date);
            if (!logs[dateStr]) {
              logs[dateStr] = { date: dateStr, entries: [] };
            }
            logs[dateStr].entries.push(food);
          });
          setDailyLogs(logs);
          
          const dates = formattedFoods.map(food => formatDate(food.date));
          const uniqueDates = [...new Set(dates)].sort();
          setActiveDates(uniqueDates);
          
          calculateStreak(uniqueDates);
        }
      } catch (error) {
        console.error('Error in fetch foods:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const calculateStreak = (uniqueDates: string[]) => {
    if (uniqueDates.length === 0) {
      setStreak(0);
      return;
    }
    
    setStreak(Math.min(uniqueDates.length, 5));
  };

  const addFood = async (food: Food) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id || '00000000-0000-0000-0000-000000000000';
      
      const { data, error } = await supabase
        .from('foods')
        .insert({
          id: food.id || uuidv4(),
          name: food.name,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat,
          date: formatDate(food.date),
          meal_type: food.mealType || 'snack',
          image_url: food.image,
          user_id: userId,
          fiber: food.fiber,
          insights: food.insights
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding food:', error);
        return;
      }

      const newFood: Food = {
        id: data.id,
        name: data.name,
        calories: data.calories,
        protein: Number(data.protein),
        carbs: Number(data.carbs),
        fat: Number(data.fat),
        date: new Date(data.date),
        mealType: data.meal_type,
        image: data.image_url,
        userId: data.user_id,
        fiber: data.fiber,
        insights: data.insights
      };

      setFoods(prevFoods => [newFood, ...prevFoods]);
      
      const dateStr = formatDate(newFood.date);
      setDailyLogs(prevLogs => {
        const existingLog = prevLogs[dateStr] || { date: dateStr, entries: [] };
        return {
          ...prevLogs,
          [dateStr]: {
            ...existingLog,
            entries: [...existingLog.entries, newFood]
          }
        };
      });
      
      const newDateStr = formatDate(newFood.date);
      if (!activeDates.includes(newDateStr)) {
        const newActiveDates = [...activeDates, newDateStr].sort();
        setActiveDates(newActiveDates);
        calculateStreak(newActiveDates);
      }
    } catch (error) {
      console.error('Error in add food:', error);
    }
  };

  const removeFood = async (id: string) => {
    try {
      const foodToRemove = foods.find(food => food.id === id);
      if (!foodToRemove) return;

      const { error } = await supabase
        .from('foods')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error removing food:', error);
        return;
      }

      setFoods(prevFoods => prevFoods.filter(food => food.id !== id));
      
      const dateStr = formatDate(foodToRemove.date);
      setDailyLogs(prevLogs => {
        if (!prevLogs[dateStr]) return prevLogs;
        
        const updatedEntries = prevLogs[dateStr].entries.filter(food => food.id !== id);
        
        if (updatedEntries.length === 0) {
          const { [dateStr]: _, ...rest } = prevLogs;
          return rest;
        }
        
        return {
          ...prevLogs,
          [dateStr]: {
            ...prevLogs[dateStr],
            entries: updatedEntries
          }
        };
      });
      
      const dateToCheck = formatDate(foodToRemove.date);
      const foodsOnDate = foods.filter(
        food => formatDate(food.date) === dateToCheck && food.id !== id
      );
      
      if (foodsOnDate.length === 0) {
        const newActiveDates = activeDates.filter(date => date !== dateToCheck);
        setActiveDates(newActiveDates);
        calculateStreak(newActiveDates);
      }
    } catch (error) {
      console.error('Error in remove food:', error);
    }
  };

  const clearFoods = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id || '00000000-0000-0000-0000-000000000000';
      
      const { error } = await supabase
        .from('foods')
        .delete()
        .eq('user_id', userId);

      if (error) {
        console.error('Error clearing foods:', error);
        return;
      }

      setFoods([]);
      setDailyLogs({});
      setActiveDates([]);
      setStreak(0);
    } catch (error) {
      console.error('Error in clear foods:', error);
    }
  };

  const searchFoods = (term: string): Food[] => {
    if (!term.trim()) return [];
    
    const uniqueFoodMap = new Map<string, Food>();
    foods.forEach(food => {
      const lowerName = food.name.toLowerCase();
      if (!uniqueFoodMap.has(lowerName) || new Date(food.date) > new Date(uniqueFoodMap.get(lowerName)!.date)) {
        uniqueFoodMap.set(lowerName, food);
      }
    });
    
    const uniqueFoods = Array.from(uniqueFoodMap.values());
    
    return uniqueFoods
      .filter(food => food.name.toLowerCase().includes(term.toLowerCase()))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  const today = formatDate(new Date());
  const todayEntries = dailyLogs[today]?.entries || [];
  
  const dailyCalories = todayEntries.reduce((sum, food) => sum + food.calories, 0);
  const dailyProtein = todayEntries.reduce((sum, food) => sum + food.protein, 0);
  const dailyCarbs = todayEntries.reduce((sum, food) => sum + food.carbs, 0);
  const dailyFat = todayEntries.reduce((sum, food) => sum + food.fat, 0);

  return (
    <FoodContext.Provider value={{
      foods,
      addFood,
      removeFood,
      dailyLogs,
      dailyCalories,
      dailyProtein,
      dailyCarbs,
      dailyFat,
      clearFoods,
      streak,
      activeDates,
      isLoading,
      searchFoods
    }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = (): FoodContextProps => {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};
