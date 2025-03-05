
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFood } from '@/context/FoodContext';
import { toast } from 'sonner';

interface FoodListProps {
  foods: any[];
  date: string;
  mealType: string;
}

const FoodList: React.FC<FoodListProps> = ({ foods, date, mealType }) => {
  const { removeFood } = useFood();

  if (foods.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        No hay alimentos registrados
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await removeFood(id);
      toast.success('Alimento eliminado');
    } catch (error) {
      console.error('Error deleting food:', error);
      toast.error('Error al eliminar el alimento');
    }
  };

  return (
    <div className="divide-y divide-gray-100">
      {foods.map((food) => (
        <div key={food.id} className="p-3 flex items-center justify-between">
          <div className="flex items-center">
            {food.image && (
              <img 
                src={food.image} 
                alt={food.name} 
                className="w-10 h-10 rounded object-cover mr-3"
              />
            )}
            <div>
              <p className="font-medium text-[#424242]">{food.name}</p>
              <p className="text-xs text-[#757575]">
                {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | G: {food.fat}g
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-[#9E9E9E] hover:text-red-500"
            onClick={() => handleDelete(food.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
