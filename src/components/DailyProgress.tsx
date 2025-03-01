
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DailyProgressProps {
  calories: number;
  calorieGoal: number;
}

const DailyProgress: React.FC<DailyProgressProps> = ({ calories, calorieGoal }) => {
  const percentage = Math.min(Math.round((calories / calorieGoal) * 100), 100);
  const remaining = Math.max(calorieGoal - calories, 0);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative flex items-center justify-center w-36 h-36">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="hsl(var(--secondary))" 
                strokeWidth="10" 
              />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="10" 
                strokeDasharray={`${percentage * 2.83} 283`} 
                strokeLinecap="round" 
                transform="rotate(-90 50 50)" 
              />
            </svg>
            <div className="absolute text-center">
              <div className="text-2xl font-bold">{percentage}%</div>
              <div className="text-xs text-muted-foreground">del objetivo</div>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Consumidas</p>
                <p className="text-2xl font-bold text-primary">{calories} kcal</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Objetivo</p>
                <p className="text-2xl font-bold">{calorieGoal} kcal</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Restantes</p>
                <p className="text-2xl font-bold text-emerald-500">{remaining} kcal</p>
              </div>
            </div>
            
            <Progress value={percentage} className="h-2 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyProgress;
