
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NutrientAverageSummaryProps {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  vitamins?: { name: string; value: number; unit: string; percentage: number }[];
  minerals?: { name: string; value: number; unit: string; percentage: number }[];
}

const NutrientAverageSummary: React.FC<NutrientAverageSummaryProps> = ({
  calories,
  carbs,
  protein,
  fat,
  fiber,
  vitamins = [],
  minerals = [],
}) => {
  return (
    <Card className="glass-card overflow-hidden animate-appear">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Promedio Diario</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Calorías</p>
            <p className="text-lg font-semibold">{calories} kcal</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Fibra</p>
            <p className="text-lg font-semibold">{fiber}g</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border/40">
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Proteínas</p>
            <p className="text-lg font-semibold text-indigo-600">{protein}g</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Carbohidratos</p>
            <p className="text-lg font-semibold text-emerald-600">{carbs}g</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Grasas</p>
            <p className="text-lg font-semibold text-amber-600">{fat}g</p>
          </div>
        </div>

        {(vitamins.length > 0 || minerals.length > 0) && (
          <div className="pt-2 border-t border-border/40">
            <p className="text-sm font-medium mb-2">Micronutrientes</p>
            
            {vitamins.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-1">Vitaminas</p>
                <div className="grid grid-cols-2 gap-2">
                  {vitamins.map((vitamin, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex justify-between">
                        <span>{vitamin.name}</span>
                        <span>{vitamin.value}{vitamin.unit} ({vitamin.percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                        <div 
                          className="h-1 rounded-full bg-indigo-500"
                          style={{ width: `${Math.min(vitamin.percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {minerals.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Minerales</p>
                <div className="grid grid-cols-2 gap-2">
                  {minerals.map((mineral, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex justify-between">
                        <span>{mineral.name}</span>
                        <span>{mineral.value}{mineral.unit} ({mineral.percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                        <div 
                          className="h-1 rounded-full bg-emerald-500"
                          style={{ width: `${Math.min(mineral.percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NutrientAverageSummary;
