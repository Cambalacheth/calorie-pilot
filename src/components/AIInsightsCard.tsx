
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, TrendingUp, Zap, Info } from 'lucide-react';

type InsightType = 'warning' | 'trend' | 'suggestion' | 'info';

interface AIInsight {
  type: InsightType;
  content: string;
  detail?: string;
}

interface AIInsightsCardProps {
  insights: AIInsight[];
  title?: string;
}

const AIInsightsCard: React.FC<AIInsightsCardProps> = ({ 
  insights, 
  title = "Análisis IA" 
}) => {
  const getIcon = (type: InsightType) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'trend':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'suggestion':
        return <Zap className="h-5 w-5 text-purple-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBgColor = (type: InsightType) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-50';
      case 'trend':
        return 'bg-blue-50';
      case 'suggestion':
        return 'bg-purple-50';
      case 'info':
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg ${getBgColor(insight.type)} flex gap-3 transition-transform hover:translate-x-1`}
          >
            {getIcon(insight.type)}
            <div>
              <p className="text-sm font-medium">{insight.content}</p>
              {insight.detail && (
                <p className="text-xs text-muted-foreground mt-1">{insight.detail}</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AIInsightsCard;
