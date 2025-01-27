"use client";

import type React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface CostEstimationProps {
  costData: {
    constructionCost: {
      min: number;
      max: number;
    };
    interiorCost: {
      min: number;
      max: number;
    };
    costBreakdown: {
      [key: string]: number;
    };
    maxCost: string;
  };
}

const CostEstimation: React.FC<CostEstimationProps> = ({ costData }) => {
  const { constructionCost, interiorCost, costBreakdown, maxCost } = costData;

  const data = Object.entries(costBreakdown).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#FF9999",
    "#66B2FF",
    "#99FF99",
    "#FFCC99",
    "#FF99CC",
    "#99CCFF",
    "#FFB366",
    "#C2C2F0",
  ];

  const formatCurrency = (amount: number) => {
    return `₹${amount} Lakhs`;
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-5xl shadow-md mx-auto">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Estimated cost</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6 bg-gray-100 p-4 rounded-lg">
          <div>
            <h3 className="text-sm text-gray-600 mb-2">
              Total Construction cost (without interior)
            </h3>
            <p className="text-xl font-medium">
              {formatCurrency(constructionCost.min)} -{" "}
              {formatCurrency(constructionCost.max)}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-gray-600 mb-2">
              Total Construction cost (interior)
            </h3>
            <p className="text-xl font-medium">
              {formatCurrency(interiorCost.min)} -{" "}
              {formatCurrency(interiorCost.max)}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-gray-600 mb-2">Maximum cost</h3>
            <p className="text-xl font-medium">{maxCost}</p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center bg-gray-100 p-4 rounded-lg">
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
