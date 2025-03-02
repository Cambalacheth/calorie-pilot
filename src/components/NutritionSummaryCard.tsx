
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

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
  calorieGoal: propCalorieGoal,
  proteinGoal: propProteinGoal,
  carbsGoal: propCarbsGoal,
  fatGoal: propFatGoal
}) => {
  const { user } = useAuth();
  const [calorieGoal, setCalorieGoal] = useState(propCalorieGoal || 2000);
  const [proteinGoal, setProteinGoal] = useState(propProteinGoal || 150);
  const [carbsGoal, setCarbsGoal] = useState(propCarbsGoal || 200);
  const [fatGoal, setFatGoal] = useState(propFatGoal || 65);

  useEffect(() => {
    // If props provided, use those values
    if (propCalorieGoal) setCalorieGoal(propCalorieGoal);
    if (propProteinGoal) setProteinGoal(propProteinGoal);
    if (propCarbsGoal) setCarbsGoal(propCarbsGoal);
    if (propFatGoal) setFatGoal(propFatGoal);
  }, [propCalorieGoal, propProteinGoal, propCarbsGoal, propFatGoal]);

  useEffect(() => {
    const fetchUserGoals = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('calorie_goal, protein_goal, carbs_goal, fat_goal')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          // Only update state if props aren't provided
          if (!propCalorieGoal && data.calorie_goal) setCalorieGoal(data.calorie_goal);
          if (!propProteinGoal && data.protein_goal) setProteinGoal(data.protein_goal);
          if (!propCarbsGoal && data.carbs_goal) setCarbsGoal(data.carbs_goal);
          if (!propFatGoal && data.fat_goal) setFatGoal(data.fat_goal);
        }
      } catch (error) {
        console.error('Error fetching profile goals:', error);
      }
    };
    
    fetchUserGoals();
  }, [user, propCalorieGoal, propProteinGoal, propCarbsGoal, propFatGoal]);

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
