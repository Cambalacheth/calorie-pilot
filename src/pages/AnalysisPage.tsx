
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Layout from '@/components/Layout';
import MacronutrientChart from '@/components/MacronutrientChart';
import { useFood } from '@/context/FoodContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, BarChartHorizontal, Calendar } from 'lucide-react';
import CalorieHistoryChart from '@/components/CalorieHistoryChart';
import TopFoodsChart from '@/components/TopFoodsChart';

const AnalysisPage = () => {
  const { dailyProtein, dailyCarbs, dailyFat } = useFood();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  return (
    <Layout>
      <div className="container px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Análisis Nutricional</h1>
            <p className="text-muted-foreground">Visualiza tus patrones alimenticios</p>
          </div>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6">
          <Tabs 
            defaultValue="week" 
            onValueChange={(value) => setTimeRange(value as 'week' | 'month' | 'year')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="month">Mes</TabsTrigger>
              <TabsTrigger value="year">Año</TabsTrigger>
            </TabsList>

            {/* We'll use the same content for all tabs but with different timeRange */}
            <TabsContent value="week" className="mt-0">
              <AnalysisContent timeRange="week" />
            </TabsContent>
            <TabsContent value="month" className="mt-0">
              <AnalysisContent timeRange="month" />
            </TabsContent>
            <TabsContent value="year" className="mt-0">
              <AnalysisContent timeRange="year" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

// Separate component for the analysis content to avoid repetition
const AnalysisContent: React.FC<{ timeRange: 'week' | 'month' | 'year' }> = ({ timeRange }) => {
  const { dailyProtein, dailyCarbs, dailyFat } = useFood();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
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

      {/* Top Foods */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Alimentos Más Consumidos</CardTitle>
        </CardHeader>
        <CardContent>
          <TopFoodsChart timeRange={timeRange} />
        </CardContent>
      </Card>

      {/* Calorie Trend */}
      <Card className="glass-card md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Tendencia de Calorías y Macronutrientes</CardTitle>
        </CardHeader>
        <CardContent>
          <CalorieHistoryChart timeRange={timeRange} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisPage;
