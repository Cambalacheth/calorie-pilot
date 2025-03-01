
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Layout from '@/components/Layout';
import { useFood } from '@/context/FoodContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, Trophy, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import MacronutrientChart from '@/components/MacronutrientChart';
import CalorieHistoryChart from '@/components/CalorieHistoryChart';
import StreakCounter from '@/components/StreakCounter';

const ProgressPage = () => {
  const { dailyProtein, dailyCarbs, dailyFat, dailyCalories } = useFood();
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

  // Metas de usuario (normalmente vendrían de un contexto o estado de usuario)
  const calorieGoal = 2000;
  const proteinGoal = 150;
  const carbsGoal = 200;
  const fatGoal = 65;

  // Cálculo de porcentajes para progreso
  const caloriePercentage = Math.min(Math.round((dailyCalories / calorieGoal) * 100), 100);
  const proteinPercentage = Math.min(Math.round((dailyProtein / proteinGoal) * 100), 100);
  const carbsPercentage = Math.min(Math.round((dailyCarbs / carbsGoal) * 100), 100);
  const fatPercentage = Math.min(Math.round((dailyFat / fatGoal) * 100), 100);

  // Insights de IA simulados (en un app real, estos vendrían de un análisis de datos)
  const insights = [
    "Tu consumo de proteínas ha mejorado un 15% esta semana.",
    "Has mantenido un balance calórico consistente los últimos 3 días.",
    "Podrías beneficiarte de aumentar tu ingesta de fibra."
  ];

  return (
    <Layout>
      <div className="container px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Progreso</h1>
            <p className="text-muted-foreground">Visualiza tu evolución nutricional</p>
          </div>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>

        {/* Time Range Selector */}
        <Tabs 
          defaultValue="week" 
          onValueChange={(value) => setTimeRange(value as 'day' | 'week' | 'month')}
          className="w-full mb-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="day">Diario</TabsTrigger>
            <TabsTrigger value="week">Semanal</TabsTrigger>
            <TabsTrigger value="month">Mensual</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 gap-6 mb-6 animate-fade-in">
          {/* Calorie History Chart */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Evolución de Calorías</CardTitle>
            </CardHeader>
            <CardContent>
              <CalorieHistoryChart timeRange={timeRange === 'day' ? 'week' : timeRange} />
            </CardContent>
          </Card>

          {/* Macronutrient Distribution */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Distribución de Macronutrientes</CardTitle>
            </CardHeader>
            <CardContent>
              <MacronutrientChart 
                protein={dailyProtein}
                carbs={dailyCarbs}
                fat={dailyFat}
              />
            </CardContent>
          </Card>

          {/* Daily Summary */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Resumen del Día</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Calorías</span>
                  <span>
                    {dailyCalories.toFixed(0)} / {calorieGoal} kcal
                  </span>
                </div>
                <Progress value={caloriePercentage} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-indigo-600">Proteínas</span>
                  <span>
                    {dailyProtein.toFixed(1)} / {proteinGoal} g
                  </span>
                </div>
                <Progress value={proteinPercentage} className="h-2 bg-slate-100" 
                  indicatorClassName="bg-indigo-600" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-emerald-600">Carbohidratos</span>
                  <span>
                    {dailyCarbs.toFixed(1)} / {carbsGoal} g
                  </span>
                </div>
                <Progress value={carbsPercentage} className="h-2 bg-slate-100"
                  indicatorClassName="bg-emerald-600" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-amber-600">Grasas</span>
                  <span>
                    {dailyFat.toFixed(1)} / {fatGoal} g
                  </span>
                </div>
                <Progress value={fatPercentage} className="h-2 bg-slate-100"
                  indicatorClassName="bg-amber-600" />
              </div>
            </CardContent>
          </Card>

          {/* Streak Counter */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                Logros y Racha
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StreakCounter streak={5} />
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="glass-card bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950 dark:to-blue-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                Insights IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-500 mt-0.5 shrink-0" />
                    <p>{insight}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProgressPage;
