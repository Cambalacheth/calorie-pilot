
import React, { createContext, useState, useContext, useEffect } from 'react';

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
  addFood: (food: Food) => void;
  removeFood: (id: string) => void;
  dailyLogs: Record<string, FoodLog>;
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  clearFoods: () => void;
  streak: number;
  activeDates: string[];
}

const FoodContext = createContext<FoodContextProps | undefined>(undefined);

export const FoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foods, setFoods] = useState<Food[]>([
    // Sample data for testing UI
    {
      id: '1',
      name: 'Ensalada de pollo',
      calories: 350,
      protein: 30,
      carbs: 15,
      fat: 12,
      date: new Date(),
      mealType: 'lunch',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=60'
    },
    {
      id: '2',
      name: 'Yogur con frutas',
      calories: 180,
      protein: 10,
      carbs: 25,
      fat: 5,
      date: new Date(),
      mealType: 'breakfast',
      image: 'https://images.unsplash.com/photo-1583531352515-8884af319dc0?auto=format&fit=crop&w=100&q=60'
    },
    {
      id: '3',
      name: 'Pasta con salsa',
      calories: 450,
      protein: 15,
      carbs: 65,
      fat: 8,
      date: new Date(),
      mealType: 'dinner',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=100&q=60'
    }
  ]);
  const [dailyLogs, setDailyLogs] = useState<Record<string, FoodLog>>({});
  const [streak, setStreak] = useState<number>(5); // Simulamos una racha de 5 días
  const [activeDates, setActiveDates] = useState<string[]>([]); // Fechas con entradas registradas

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // Actualiza las fechas activas cuando cambian los alimentos
  useEffect(() => {
    const dates = foods.map(food => formatDate(food.date));
    const uniqueDates = [...new Set(dates)].sort();
    setActiveDates(uniqueDates);
    
    // Calculamos la racha basada en las fechas consecutivas
    // En una app real, este cálculo sería más complejo
    if (uniqueDates.length > 0) {
      // Simulamos una racha basada en la cantidad de fechas únicas
      // En una implementación real, verificaríamos fechas consecutivas
      setStreak(Math.min(uniqueDates.length, 5)); 
    } else {
      setStreak(0);
    }
  }, [foods]);

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
  const todayEntries = dailyLogs[today]?.entries || foods.filter(food => formatDate(food.date) === today);
  
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
      activeDates
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
