
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FoodList from '@/components/FoodList';

interface MealSectionProps {
  title: string;
  icon: React.ReactNode;
  foods: any[];
  date: Date;
  mealType: string;
}

const MealSection: React.FC<MealSectionProps> = ({
  title,
  icon,
  foods,
  date,
  mealType,
}) => {
  const navigate = useNavigate();
  const formattedDate = date.toISOString().split('T')[0];

  const handleAddClick = () => {
    navigate('/add', { state: { mealType, date } });
  };

  return (
    <Card className="shadow-sm">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center">
          {icon}
          <h2 className="text-lg font-semibold ml-2 text-[#424242]">{title}</h2>
        </div>
        <Button size="sm" onClick={handleAddClick}>
          <Plus className="h-4 w-4 mr-2" /> Agregar
        </Button>
      </div>
      <FoodList 
        foods={foods} 
        date={formattedDate} 
        mealType={mealType} 
      />
    </Card>
  );
};

export default MealSection;
