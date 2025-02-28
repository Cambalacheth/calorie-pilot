
import React, { createContext, useState, useContext } from 'react';

export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: Date;
  image?: string;
}

export interface FoodLog {
  date: string;
  entries: Food[];
}

interface FoodContextProps {
  foods: Food[];
  addFood: (food: Food) => void;
  removeFood: (id: string) => void;
  dailyLogs: Record<string, FoodLog>;
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  clearFoods: () => void;
}

const FoodContext = createContext<FoodContextProps | undefined>(undefined);

export const FoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [dailyLogs, setDailyLogs] = useState<Record<string, FoodLog>>({});

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const addFood = (food: Food) => {
    setFoods(prevFoods => [...prevFoods, food]);
    
    const dateStr = formatDate(food.date);
    setDailyLogs(prevLogs => {
      const existingLog = prevLogs[dateStr] || { date: dateStr, entries: [] };
      return {
        ...prevLogs,
        [dateStr]: {
          ...existingLog,
          entries: [...existingLog.entries, food]
        }
      };
    });
  };

  const removeFood = (id: string) => {
    const foodToRemove = foods.find(food => food.id === id);
    if (!foodToRemove) return;

    setFoods(prevFoods => prevFoods.filter(food => food.id !== id));
    
    const dateStr = formatDate(foodToRemove.date);
    setDailyLogs(prevLogs => {
      if (!prevLogs[dateStr]) return prevLogs;
      
      return {
        ...prevLogs,
        [dateStr]: {
          ...prevLogs[dateStr],
          entries: prevLogs[dateStr].entries.filter(food => food.id !== id)
        }
      };
    });
  };

  const clearFoods = () => {
    setFoods([]);
    setDailyLogs({});
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
      clearFoods
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
