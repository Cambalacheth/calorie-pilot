
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

  // Fetch foods from Supabase
  useEffect(() => {
    const fetchFoods = async () => {
      setIsLoading(true);
      try {
        const { data: userData } = await supabase.auth.getUser();
        // For now, use a default user ID if not authenticated
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
            image: item.image_url
          }));
          setFoods(formattedFoods);
          
          // Process the daily logs
          const logs: Record<string, FoodLog> = {};
          formattedFoods.forEach(food => {
            const dateStr = formatDate(food.date);
            if (!logs[dateStr]) {
              logs[dateStr] = { date: dateStr, entries: [] };
            }
            logs[dateStr].entries.push(food);
          });
          setDailyLogs(logs);
          
          // Calculate active dates and streak
          const dates = formattedFoods.map(food => formatDate(food.date));
          const uniqueDates = [...new Set(dates)].sort();
          setActiveDates(uniqueDates);
          
          // Calculate streak (simplified for now)
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

  // Calculate streak based on unique dates
  const calculateStreak = (uniqueDates: string[]) => {
    if (uniqueDates.length === 0) {
      setStreak(0);
      return;
    }
    
    // For now, just use the count of unique dates as a simple streak
    // In a real app, we'd check for consecutive days
    setStreak(Math.min(uniqueDates.length, 5));
  };

  // Add food to Supabase
  const addFood = async (food: Food) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      // For now, use a default user ID if not authenticated
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
          user_id: userId  // Add the user_id field
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding food:', error);
        return;
      }

      // Convert the returned data to our Food format
      const newFood: Food = {
        id: data.id,
        name: data.name,
        calories: data.calories,
        protein: Number(data.protein),
        carbs: Number(data.carbs),
        fat: Number(data.fat),
        date: new Date(data.date),
        mealType: data.meal_type,
        image: data.image_url
      };

      // Update state
      setFoods(prevFoods => [newFood, ...prevFoods]);
      
      // Update daily logs
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
      
      // Update active dates and streak
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

  // Remove food from Supabase
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

      // Update state
      setFoods(prevFoods => prevFoods.filter(food => food.id !== id));
      
      // Update daily logs
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
      
      // Check if we need to update active dates
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

  // Clear all foods from Supabase
  const clearFoods = async () => {
    try {
      const { error } = await supabase
        .from('foods')
        .delete()
        .gte('id', '0'); // This will delete all records

      if (error) {
        console.error('Error clearing foods:', error);
        return;
      }

      // Update state
      setFoods([]);
      setDailyLogs({});
      setActiveDates([]);
      setStreak(0);
    } catch (error) {
      console.error('Error in clear foods:', error);
    }
  };

  // Calculate daily totals
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
      isLoading
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
