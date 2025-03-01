
import React from 'react';
import { Check, Award } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ streak }) => {
  // Definimos algunos logros basados en la racha
  const achievements = [
    { days: 3, name: "¡Buen comienzo!", unlocked: streak >= 3 },
    { days: 7, name: "¡Una semana completa!", unlocked: streak >= 7 },
    { days: 14, name: "¡Consistencia de dos semanas!", unlocked: streak >= 14 },
    { days: 30, name: "¡Un mes de compromiso!", unlocked: streak >= 30 }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center p-4">
        <div className="relative flex items-center justify-center w-24 h-24 mb-2">
          <div className="absolute inset-0 bg-amber-100 dark:bg-amber-900/30 rounded-full"></div>
          <Award className="w-12 h-12 text-amber-500" />
          <div className="absolute bottom-0 right-0 bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {streak}
          </div>
        </div>
        <h3 className="font-bold text-lg">{streak} días consecutivos</h3>
        <p className="text-sm text-muted-foreground text-center">
          ¡Sigue así! Mantén tu racha para desbloquear más logros.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {achievements.map((achievement, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-3 rounded-lg ${
              achievement.unlocked 
                ? 'bg-amber-100 dark:bg-amber-900/30' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            <div className="flex items-center gap-2">
              {achievement.unlocked ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600 text-xs">
                  {achievement.days}
                </span>
              )}
              <span className={achievement.unlocked ? 'font-medium' : 'text-muted-foreground'}>
                {achievement.name}
              </span>
            </div>
            <span className="text-xs font-medium">
              {achievement.unlocked ? 'Completado' : `${streak}/${achievement.days}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakCounter;
