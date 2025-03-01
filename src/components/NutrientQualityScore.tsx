
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NutrientQualityScoreProps {
  score: number; // 0-100
  factors: {
    name: string;
    score: number; // 0-100
    description: string;
  }[];
}

const NutrientQualityScore: React.FC<NutrientQualityScoreProps> = ({ score, factors }) => {
  // Helper to get grade letter
  const getGradeLetter = (value: number): string => {
    if (value >= 90) return 'A+';
    if (value >= 80) return 'A';
    if (value >= 70) return 'B+';
    if (value >= 60) return 'B';
    if (value >= 50) return 'C+';
    if (value >= 40) return 'C';
    if (value >= 30) return 'D+';
    if (value >= 20) return 'D';
    return 'F';
  };

  // Get color based on score
  const getScoreColor = (value: number): string => {
    if (value >= 70) return 'text-emerald-600';
    if (value >= 40) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Calidad Nutricional</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Puntuación global</p>
            <p className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}/100</p>
          </div>
          <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
            {getGradeLetter(score)}
          </div>
        </div>

        <div className="space-y-3 mt-2">
          <p className="text-sm font-medium">Factores de calidad</p>
          {factors.map((factor, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm">{factor.name}</span>
                <span className={`text-sm font-medium ${getScoreColor(factor.score)}`}>
                  {getGradeLetter(factor.score)}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${factor.score >= 70 ? 'bg-emerald-500' : factor.score >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${factor.score}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{factor.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NutrientQualityScore;
