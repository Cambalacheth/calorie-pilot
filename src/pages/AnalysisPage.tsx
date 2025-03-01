
import React from 'react';
import Layout from '@/components/Layout';
import { useFood } from '@/context/FoodContext';
import MacronutrientChart from '@/components/MacronutrientChart';
import NutrientQualityScore from '@/components/NutrientQualityScore';
import AIInsightsCard from '@/components/AIInsightsCard';
import MealTimeAnalysis from '@/components/MealTimeAnalysis';
import NutrientAverageSummary from '@/components/NutrientAverageSummary';

const AnalysisPage = () => {
  const { dailyCalories, dailyProtein, dailyCarbs, dailyFat } = useFood();

  // Sample data - in a real app, this would come from the backend/API
  const qualityScore = 78;
  const qualityFactors = [
    {
      name: 'Variedad de alimentos',
      score: 85,
      description: 'Buena variedad de alimentos que aportan diferentes nutrientes.'
    },
    {
      name: 'Balance de macronutrientes',
      score: 72,
      description: 'Proporción adecuada de proteínas, carbohidratos y grasas.'
    },
    {
      name: 'Micronutrientes',
      score: 65,
      description: 'Podrías mejorar tu ingesta de vitamina D y hierro.'
    },
    {
      name: 'Consumo de azúcares',
      score: 90,
      description: 'Bajo consumo de azúcares añadidos. ¡Excelente!'
    }
  ];

  const aiInsights = [
    {
      type: 'warning' as const,
      content: 'Tu consumo de sodio es un 25% mayor al recomendado.',
      detail: 'Considera reducir alimentos procesados y usar menos sal en tus comidas.'
    },
    {
      type: 'trend' as const,
      content: 'Has aumentado tu consumo de proteínas un 15% esta semana.',
      detail: 'Esto puede ayudar a mantener la masa muscular y promover la saciedad.'
    },
    {
      type: 'suggestion' as const,
      content: 'Agregar más verduras verdes mejoraría tu ingesta de folato.',
      detail: 'Espinacas, brócoli y espárragos son excelentes fuentes de este nutriente.'
    },
    {
      type: 'info' as const,
      content: 'Si mantienes este ritmo, alcanzarás tus metas en ~6 semanas.',
      detail: 'Basado en tu perfil y patrones de alimentación recientes.'
    }
  ];

  const mealAnalysis = [
    {
      meal: 'desayuno',
      calories: 450,
      protein: 22,
      carbs: 48,
      fat: 18,
      fiber: 5,
      insights: [
        'Buen aporte de proteínas para el desayuno.',
        'Podrías aumentar la fibra añadiendo frutas o cereales integrales.',
        'Nivel moderado de grasas, principalmente de fuentes saludables.'
      ]
    },
    {
      meal: 'almuerzo',
      calories: 680,
      protein: 35,
      carbs: 75,
      fat: 25,
      fiber: 8,
      insights: [
        'Excelente balance de macronutrientes.',
        'Buena proporción de proteína para el desarrollo muscular.',
        'Considera reducir ligeramente los carbohidratos refinados.'
      ]
    },
    {
      meal: 'cena',
      calories: 520,
      protein: 30,
      carbs: 40,
      fat: 22,
      fiber: 6,
      insights: [
        'La cena tiene un buen equilibrio proteína-carbohidratos.',
        'Nivel adecuado de grasas, pero vigila las grasas saturadas.',
        'Podrías incluir más vegetales para aumentar el volumen con menos calorías.'
      ]
    },
    {
      meal: 'snacks',
      calories: 250,
      protein: 10,
      carbs: 30,
      fat: 12,
      fiber: 3,
      insights: [
        'Tus snacks podrían tener más proteína para mayor saciedad.',
        'Considera opciones con menos azúcares añadidos.',
        'Buenas opciones podrían ser yogur griego, nueces o hummus con vegetales.'
      ]
    }
  ];

  const micronutrients = {
    vitamins: [
      { name: 'Vitamina C', value: 85, unit: 'mg', percentage: 110 },
      { name: 'Vitamina D', value: 5, unit: 'µg', percentage: 50 },
      { name: 'Vitamina B12', value: 4.5, unit: 'µg', percentage: 188 },
      { name: 'Folato', value: 320, unit: 'µg', percentage: 80 }
    ],
    minerals: [
      { name: 'Hierro', value: 12, unit: 'mg', percentage: 67 },
      { name: 'Calcio', value: 850, unit: 'mg', percentage: 85 },
      { name: 'Potasio', value: 2800, unit: 'mg', percentage: 60 },
      { name: 'Magnesio', value: 310, unit: 'mg', percentage: 74 }
    ]
  };

  return (
    <Layout>
      <div className="container max-w-4xl px-4 py-6 mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Análisis Nutricional</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NutrientAverageSummary 
            calories={dailyCalories || 1900}
            protein={dailyProtein || 97}
            carbs={dailyCarbs || 193}
            fat={dailyFat || 67}
            fiber={22}
            vitamins={micronutrients.vitamins}
            minerals={micronutrients.minerals}
          />
          
          <NutrientQualityScore score={qualityScore} factors={qualityFactors} />
        </div>
        
        <MacronutrientChart 
          protein={dailyProtein || 97} 
          carbs={dailyCarbs || 193} 
          fat={dailyFat || 67} 
        />
        
        <MealTimeAnalysis mealData={mealAnalysis} />
        
        <AIInsightsCard 
          insights={aiInsights} 
          title="Análisis IA y Predicciones" 
        />
      </div>
    </Layout>
  );
};

export default AnalysisPage;
