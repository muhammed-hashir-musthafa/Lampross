"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface SalesData {
  month: string;
  value: number;
}

interface SalesChartProps {
  data: SalesData[];
  performanceChange: string;
  label?: string; // Optional if it's not always required
  height?: number;
}

export const SalesChart = ({
  data,
  performanceChange,
  label,
  height = 200,
}: SalesChartProps) => {
  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {label || "Sales Performance"}
        </h2>
        <select className="p-2 border rounded-lg">
          <option>This week</option>
          <option>This Month</option>
        </select>
      </div>

      <div style={{ height }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barCategoryGap={0}
            barGap={0}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis axisLine={false} tickLine={false} tick={false} />
            <Bar
              dataKey="value"
              fill="#4F46E5"
              radius={[4, 4, 0, 0]}
              barSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <span className="text-2xl font-bold text-gray-900">
          {performanceChange}
        </span>
        <p className="text-gray-500 text-sm mt-1">
          Your sales performance is {performanceChange} better compared to last
          month
        </p>
      </div>
    </div>
  );
};
