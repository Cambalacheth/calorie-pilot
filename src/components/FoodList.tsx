
import React from 'react';
import { useFood, Food } from '@/context/FoodContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const FoodItem: React.FC<{ food: Food }> = ({ food }) => {
  const { removeFood } = useFood();

  const handleDelete = () => {
    removeFood(food.id);
    toast.success(`Se ha eliminado ${food.name}`);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex items-center justify-between p-3 border-b border-border last:border-0 group hover:bg-secondary/20 transition-colors rounded-md">
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
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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

const FoodList: React.FC = () => {
  const { foods, clearFoods } = useFood();
  const todayFoods = foods.filter(
    food => new Date(food.date).toDateString() === new Date().toDateString()
  );

  const handleClearAll = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los alimentos?')) {
      clearFoods();
      toast.success('Se han eliminado todos los alimentos');
    }
  };

  if (todayFoods.length === 0) {
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
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Alimentos de hoy</CardTitle>
        <Button variant="ghost" size="sm" onClick={handleClearAll} className="h-8">
          <Trash2 className="h-4 w-4 mr-2" />
          Limpiar
        </Button>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-1">
          {todayFoods.map((food) => (
            <FoodItem key={food.id} food={food} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodList;
