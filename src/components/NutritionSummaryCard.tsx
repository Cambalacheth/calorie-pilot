
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface NutritionSummaryCardProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  calorieGoal?: number;
  proteinGoal?: number;
  carbsGoal?: number;
  fatGoal?: number;
}

const NutritionSummaryCard: React.FC<NutritionSummaryCardProps> = ({
  calories,
  protein,
  carbs,
  fat,
  calorieGoal = 2000,
  proteinGoal = 150,
  carbsGoal = 200,
  fatGoal = 65
}) => {
  const caloriePercentage = Math.min(Math.round((calories / calorieGoal) * 100), 100);
  const proteinPercentage = Math.min(Math.round((protein / proteinGoal) * 100), 100);
  const carbsPercentage = Math.min(Math.round((carbs / carbsGoal) * 100), 100);
  const fatPercentage = Math.min(Math.round((fat / fatGoal) * 100), 100);

  return (
    <Card className="glass-card overflow-hidden animate-appear">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex justify-between items-center">
          <span>Resumen Nutricional</span>
          <span className="text-sm font-normal text-muted-foreground">Objetivo Diario</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Calorías</span>
            <span>
              {calories.toFixed(0)} / {calorieGoal} kcal
            </span>
          </div>
          <Progress value={caloriePercentage} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-indigo-600">Proteínas</span>
            <span>
              {protein.toFixed(1)} / {proteinGoal} g
            </span>
          </div>
          <Progress value={proteinPercentage} className="h-2 bg-slate-100" 
            indicatorClassName="bg-indigo-600" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-emerald-600">Carbohidratos</span>
            <span>
              {carbs.toFixed(1)} / {carbsGoal} g
            </span>
          </div>
          <Progress value={carbsPercentage} className="h-2 bg-slate-100"
            indicatorClassName="bg-emerald-600" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-amber-600">Grasas</span>
            <span>
              {fat.toFixed(1)} / {fatGoal} g
            </span>
          </div>
          <Progress value={fatPercentage} className="h-2 bg-slate-100"
            indicatorClassName="bg-amber-600" />
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionSummaryCard;
