
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MealNutrientAnalysis {
  meal: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  insights: string[];
}

interface MealTimeAnalysisProps {
  mealData: MealNutrientAnalysis[];
}

const MealTimeAnalysis: React.FC<MealTimeAnalysisProps> = ({ mealData }) => {
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Análisis por Tiempo de Comida</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={mealData[0]?.meal || "desayuno"}>
          <TabsList className="grid w-full grid-cols-4">
            {mealData.map(meal => (
              <TabsTrigger key={meal.meal} value={meal.meal}>
                {meal.meal}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {mealData.map(meal => (
            <TabsContent key={meal.meal} value={meal.meal} className="pt-3">
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Calorías</p>
                  <p className="font-medium">{meal.calories} kcal</p>
                </div>
                <div className="text-center text-indigo-600">
                  <p className="text-xs text-muted-foreground">Proteínas</p>
                  <p className="font-medium">{meal.protein}g</p>
                </div>
                <div className="text-center text-emerald-600">
                  <p className="text-xs text-muted-foreground">Carbos</p>
                  <p className="font-medium">{meal.carbs}g</p>
                </div>
                <div className="text-center text-amber-600">
                  <p className="text-xs text-muted-foreground">Grasas</p>
                  <p className="font-medium">{meal.fat}g</p>
                </div>
              </div>
              
              <div className="space-y-2 pt-2 border-t">
                <p className="text-sm font-medium">Observaciones:</p>
                <ul className="text-sm space-y-1">
                  {meal.insights.map((insight, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MealTimeAnalysis;
