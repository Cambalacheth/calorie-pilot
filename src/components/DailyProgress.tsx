
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Update the prop types to match the Dashboard usage
interface DailyProgressProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: Date;
}

const DailyProgress: React.FC<DailyProgressProps> = ({
  calories,
  protein,
  carbs,
  fat,
  date
}) => {
  // User's daily goals (could be from context/state in a real app)
  const calorieGoal = 2000;
  const proteinGoal = 150;
  const carbsGoal = 200;
  const fatGoal = 65;

  // Calculate percentages
  const caloriePercent = Math.min((calories / calorieGoal) * 100, 100);
  const proteinPercent = Math.min((protein / proteinGoal) * 100, 100);
  const carbsPercent = Math.min((carbs / carbsGoal) * 100, 100);
  const fatPercent = Math.min((fat / fatGoal) * 100, 100);

  // Format date to display day of week
  const formattedDay = format(date, 'EEEE', { locale: es });
  const capitalizedDay = formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#424242]">Progreso del Día</h2>
        <span className="text-sm font-medium text-[#757575]">{capitalizedDay}</span>
      </div>
      
      <div className="space-y-4">
        {/* Calories */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-[#424242]">Calorías</span>
            <span className="text-sm text-[#757575]">{calories} / {calorieGoal} kcal</span>
          </div>
          <Progress value={caloriePercent} className="h-2" indicatorClassName="bg-[#FF7043]" />
        </div>
        
        {/* Protein */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-[#424242]">Proteínas</span>
            <span className="text-sm text-[#757575]">{protein} / {proteinGoal} g</span>
          </div>
          <Progress value={proteinPercent} className="h-2" indicatorClassName="bg-[#42A5F5]" />
        </div>
        
        {/* Carbs */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-[#424242]">Carbohidratos</span>
            <span className="text-sm text-[#757575]">{carbs} / {carbsGoal} g</span>
          </div>
          <Progress value={carbsPercent} className="h-2" indicatorClassName="bg-[#66BB6A]" />
        </div>
        
        {/* Fat */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-[#424242]">Grasas</span>
            <span className="text-sm text-[#757575]">{fat} / {fatGoal} g</span>
          </div>
          <Progress value={fatPercent} className="h-2" indicatorClassName="bg-[#FFA726]" />
        </div>
      </div>
    </div>
  );
};

export default DailyProgress;
