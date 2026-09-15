import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { AnalyticsTrendItem } from '../../types';
import { formatCurrency } from '../../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RevenueExpenseChartProps {
  trends: AnalyticsTrendItem[];
  isLoading?: boolean;
}

export const RevenueExpenseChart: React.FC<RevenueExpenseChartProps> = ({
  trends,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="h-80 flex items-center justify-center bg-slate-50/50 rounded-xl animate-pulse">
        <span className="text-sm text-slate-400 font-medium">Loading trend data...</span>
      </div>
    );
  }

  if (!trends || trends.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center bg-slate-50 rounded-xl">
        <span className="text-sm text-slate-500">No trend analytics recorded yet.</span>
      </div>
    );
  }

  const data = {
    labels: trends.map((t) => t.period),
    datasets: [
      {
        label: 'Revenue',
        data: trends.map((t) => t.revenue),
        backgroundColor: '#2563eb', // Blue-600
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
      {
        label: 'Expenses',
        data: trends.map((t) => t.expenses),
        backgroundColor: '#f43f5e', // Rose-500
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          font: {
            family: 'Inter, sans-serif',
            size: 12,
            weight: 500,
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
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return ` ${label}: ${formatCurrency(value)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            family: 'Inter, sans-serif',
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: '#f1f5f9',
        },
        ticks: {
          color: '#64748b',
          font: {
            family: 'Inter, sans-serif',
            size: 11,
          },
          callback: (value: any) => `$${value >= 1000 ? `${value / 1000}k` : value}`,
        },
      },
    },
  };

  return (
    <div className="h-80 w-full">
      <Bar data={data} options={options as any} />
    </div>
  );
};
