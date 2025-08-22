import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { DashboardSummary } from '../types/studentDashboard';

interface Props {
  summary: DashboardSummary;
}

const MyProgressChart: React.FC<Props> = ({ summary }) => {
  const data = [
    { name: 'To Start', value: summary.toStart, color: '#F87171' },
    { name: 'In Progress', value: summary.inProgress, color: '#3B82F6' },
    { name: 'Completed', value: summary.completed, color: '#10B981' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md h-full flex flex-col items-center transition-colors duration-200">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">My Progress</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 mt-4">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{entry.name} ({entry.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProgressChart;
