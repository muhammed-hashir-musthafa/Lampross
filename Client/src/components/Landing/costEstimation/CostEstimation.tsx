'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CostEstimationProps {
  constructionCost: {
    min: number;
    max: number;
  };
  interiorCost: {
    min: number;
    max: number;
  };
}

const CostEstimation: React.FC<CostEstimationProps> = ({
  constructionCost,
  interiorCost,
}) => {
  const data = [
    { name: 'Foundation', value: 15 },
    { name: 'Structure', value: 25 },
    { name: 'Finishing', value: 20 },
    { name: 'Plumbing', value: 10 },
    { name: 'Electrical', value: 10 },
    { name: 'Windows', value: 8 },
    { name: 'Doors', value: 7 },
    { name: 'Others', value: 5 },
  ];

  const COLORS = ['#FF9999', '#66B2FF', '#99FF99', '#FFCC99', '#FF99CC', '#99CCFF', '#FFB366', '#C2C2F0'];

  const formatCurrency = (amount: number) => {
    return `₹${amount} Lakhs`;
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-5xl shadow-md">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Estimated cost
      </h2>

      <div className="flex items-center space-x-6">
        <div className="flex-1 space-y-6 bg-gray-100 p-4 rounded-lg">
          <div>
            <h3 className="text-sm text-gray-600 mb-2">
              Total Construction cost (without interior)
            </h3>
            <p className="text-xl font-medium">
              {formatCurrency(constructionCost.min)} - {formatCurrency(constructionCost.max)}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-gray-600 mb-2">
              Total Construction cost (interior)
            </h3>
            <p className="text-xl font-medium">
              {formatCurrency(interiorCost.min)} - {formatCurrency(interiorCost.max)}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-gray-600 mb-2">
              Maximum cost
            </h3>
            <p className="text-xl font-medium">
              {formatCurrency(Math.max(constructionCost.max, interiorCost.max))}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-gray-100 p-4 rounded-lg">
          <div className="relative w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="ml-6">
            {data.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center mb-1">
                <div 
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-xs text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostEstimation;
