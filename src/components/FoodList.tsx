
import React from 'react';
import { useFood, Food } from '@/context/FoodContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Info, Edit, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface FoodItemProps {
  food: Food;
}

interface FoodListProps {
  mealTypeFilter: string | null;
}

const FoodItem: React.FC<FoodItemProps> = ({ food }) => {
  const { removeFood } = useFood();

  const handleDelete = async () => {
    try {
      await removeFood(food.id);
      toast.success(`Se ha eliminado ${food.name}`);
    } catch (error) {
      console.error('Error deleting food:', error);
      toast.error('No se pudo eliminar el alimento');
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Default food image if none is provided
  const foodImage = food.image || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=100&q=60';

  return (
    <div className="flex gap-3 p-3 border-b border-border last:border-0 group hover:bg-secondary/20 transition-colors rounded-md">
      <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
        <img 
          src={foodImage} 
          alt={food.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium">{food.name}</h4>
          <span className="text-sm text-muted-foreground">{formatTime(food.date)}</span>
        </div>
        <div className="flex gap-3 text-sm mt-1">
          <span className="text-muted-foreground">{food.calories} kcal</span>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <span className="text-indigo-600">{food.protein}g P</span>
            <span className="text-emerald-600">{food.carbs}g C</span>
            <span className="text-amber-600">{food.fat}g G</span>
          </div>
        </div>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
        <Link to={`/food/${food.id}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Info className="h-4 w-4" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const FoodList: React.FC<FoodListProps> = ({ mealTypeFilter }) => {
  const { foods, clearFoods, isLoading } = useFood();
  
  // Filter foods by today's date
  const todayFoods = foods.filter(
    food => new Date(food.date).toDateString() === new Date().toDateString()
  );
  
  // Apply meal type filter if specified
  const filteredFoods = mealTypeFilter 
    ? todayFoods.filter(food => food.mealType === mealTypeFilter) 
    : todayFoods;

  const handleClearAll = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los alimentos?')) {
      try {
        await clearFoods();
        toast.success('Se han eliminado todos los alimentos');
      } catch (error) {
        console.error('Error clearing foods:', error);
        toast.error('No se pudieron eliminar los alimentos');
      }
    }
  };

  if (isLoading) {
    return (
      <Card className="glass-card flex flex-col items-center justify-center py-10 animate-appear">
        <div className="text-center p-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Cargando alimentos...</h3>
        </div>
      </Card>
    );
  }

  if (filteredFoods.length === 0) {
    return (
      <Card className="glass-card flex flex-col items-center justify-center py-10 animate-appear">
        <div className="text-center p-8">
          <h3 className="text-lg font-medium mb-2">No hay alimentos registrados hoy</h3>
          <p className="text-muted-foreground mb-6">
            Comienza a registrar tus alimentos usando cualquiera de los métodos disponibles.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-card animate-appear">
      <CardContent className="pt-6">
        <div className="space-y-1">
          {filteredFoods.map((food) => (
            <FoodItem key={food.id} food={food} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodList;
