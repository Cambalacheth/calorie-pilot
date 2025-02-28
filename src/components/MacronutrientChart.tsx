
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface MacronutrientChartProps {
  protein: number;
  carbs: number;
  fat: number;
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b'];

const MacronutrientChart: React.FC<MacronutrientChartProps> = ({ protein, carbs, fat }) => {
  const data = [
    { name: 'Proteínas', value: protein, color: COLORS[0] },
    { name: 'Carbohidratos', value: carbs, color: COLORS[1] },
    { name: 'Grasas', value: fat, color: COLORS[2] },
  ].filter(item => item.value > 0);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-secondary/30 rounded-lg p-4">
        <p className="text-muted-foreground text-center">
          No hay datos suficientes para mostrar el gráfico.
        </p>
      </div>
    );
  }

  const total = protein + carbs + fat;

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="#fff" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontWeight="medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="glass-card p-2 rounded-md text-sm">
          <p className="font-medium" style={{ color: item.color }}>{`${item.name}: ${item.value}g`}</p>
          <p className="text-muted-foreground text-xs">{`${((item.value / total) * 100).toFixed(1)}% del total`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-72 glass-card rounded-lg p-4">
      <h3 className="text-lg font-medium mb-2 text-center">Distribución de Macronutrientes</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            animationDuration={500}
            animationBegin={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            wrapperStyle={{
              paddingTop: '10px',
              fontSize: '12px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MacronutrientChart;
