
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useFood } from '@/context/FoodContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { foods, removeFood } = useFood();
  
  const food = foods.find(f => f.id === id);
  
  if (!food) {
    return (
      <Layout>
        <div className="container px-4 py-8">
          <Card className="glass-card max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl font-medium">Alimento no encontrado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                El alimento que estás buscando no existe o ha sido eliminado.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al panel
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }
  
  const handleDelete = () => {
    removeFood(food.id);
    toast.success(`Se ha eliminado ${food.name}`);
    navigate('/dashboard');
  };
  
  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Layout>
      <div className="container px-4 py-8">
        <Card className="glass-card max-w-2xl mx-auto animate-appear">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
            </div>
            <CardTitle className="text-2xl font-bold mt-4">{food.name}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {formatDateTime(food.date)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground">Calorías</div>
                <div className="text-3xl font-bold">{food.calories}</div>
                <div className="text-xs text-muted-foreground">kcal</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-center">
                <div className="text-sm font-medium text-indigo-600">Proteínas</div>
                <div className="text-3xl font-bold">{food.protein}</div>
                <div className="text-xs text-muted-foreground">g</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-center">
                <div className="text-sm font-medium text-emerald-600">Carbos</div>
                <div className="text-3xl font-bold">{food.carbs}</div>
                <div className="text-xs text-muted-foreground">g</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-center">
                <div className="text-sm font-medium text-amber-600">Grasas</div>
                <div className="text-3xl font-bold">{food.fat}</div>
                <div className="text-xs text-muted-foreground">g</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-white/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-sm font-medium text-muted-foreground">% Proteínas</div>
                  <div className="text-2xl font-bold text-indigo-600">
                    {Math.round((food.protein * 4 / food.calories) * 100) || 0}%
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-sm font-medium text-muted-foreground">% Carbos</div>
                  <div className="text-2xl font-bold text-emerald-600">
                    {Math.round((food.carbs * 4 / food.calories) * 100) || 0}%
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-sm font-medium text-muted-foreground">% Grasas</div>
                  <div className="text-2xl font-bold text-amber-600">
                    {Math.round((food.fat * 9 / food.calories) * 100) || 0}%
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FoodDetail;
