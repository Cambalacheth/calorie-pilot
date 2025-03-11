
import React from 'react';
import MealSection from '@/components/MealSection';
import { Coffee, Utensils, Apple } from 'lucide-react';

interface MealSectionsProps {
  breakfastEntries: any[];
  lunchEntries: any[];
  dinnerEntries: any[];
  snackEntries: any[];
  date: Date;
}

const MealSections: React.FC<MealSectionsProps> = ({
  breakfastEntries,
  lunchEntries,
  dinnerEntries,
  snackEntries,
  date
}) => {
  return (
    <div className="space-y-4">
      <MealSection
        title="Desayuno"
        icon={<Coffee className="h-5 w-5" />}
        foods={breakfastEntries}
        date={date}
        mealType="breakfast"
      />
      
      <MealSection
        title="Almuerzo"
        icon={<Utensils className="h-5 w-5" />}
        foods={lunchEntries}
        date={date}
        mealType="lunch"
      />
      
      <MealSection
        title="Cena"
        icon={<Utensils className="h-5 w-5" />}
        foods={dinnerEntries}
        date={date}
        mealType="dinner"
      />
      
      <MealSection
        title="Snacks"
        icon={<Apple className="h-5 w-5" />}
        foods={snackEntries}
        date={date}
        mealType="snack"
      />
    </div>
  );
};

export default MealSections;
