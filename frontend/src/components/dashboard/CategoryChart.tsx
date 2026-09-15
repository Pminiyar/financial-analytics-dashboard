import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AnalyticsCategoryItem } from '../../types';
import { formatCurrency } from '../../utils/formatters';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChartProps {
  categories: AnalyticsCategoryItem[];
  isLoading?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  Sales: '#2563eb', // Blue
  Services: '#0ea5e9', // Sky
  Software: '#6366f1', // Indigo
  Marketing: '#f59e0b', // Amber
  Operations: '#10b981', // Emerald
  Travel: '#ec4899', // Pink
  Office: '#8b5cf6', // Purple
  Other: '#64748b' // Slate
};

export const CategoryChart: React.FC<CategoryChartProps> = ({
  categories,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="h-80 flex items-center justify-center bg-slate-50/50 rounded-xl animate-pulse">
        <span className="text-sm text-slate-400 font-medium">Loading categories...</span>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center bg-slate-50 rounded-xl">
        <span className="text-sm text-slate-500">No category breakdown available.</span>
      </div>
    );
  }

  // Aggregate by category name (combine revenue and expenses if distinct)
  const categoryMap = new Map<string, number>();
  categories.forEach((c) => {
    categoryMap.set(c.category, (categoryMap.get(c.category) || 0) + c.amount);
  });

  const sortedCategories = Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]);
  const labels = sortedCategories.map(([cat]) => cat);
  const dataValues = sortedCategories.map(([, amt]) => amt);
  const backgroundColors = labels.map((cat) => CATEGORY_COLORS[cat] || '#94a3b8');

  const total = dataValues.reduce((acc, curr) => acc + curr, 0);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 14,
          font: {
            family: 'Inter, sans-serif',
            size: 11,
          },
          color: '#475569',
        },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleFont: { family: 'Inter, sans-serif', size: 13, weight: 600 },
        bodyFont: { family: 'Inter, sans-serif', size: 12 },
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: (context: any) => {
            const val = context.parsed || 0;
            const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
            return ` ${context.label}: ${formatCurrency(val)} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="h-80 w-full flex items-center justify-center relative">
      <Doughnut data={data} options={options as any} />
      {/* Center Label for total volume */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-12">
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Total Volume</span>
        <span className="text-base font-bold text-slate-900 mt-0.5">{formatCurrency(total)}</span>
      </div>
    </div>
  );
};
