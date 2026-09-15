import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  description,
  icon,
  iconBgColor = 'bg-blue-50 text-blue-600',
  trend
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-card hover:shadow-subtle transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${iconBgColor} flex items-center justify-center`}>
          {icon}
        </div>
      </div>

      <div className="mb-2">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">{description}</span>
        {trend && (
          <span
            className={`inline-flex items-center font-semibold px-2 py-0.5 rounded-full ${
              trend.isNeutral
                ? 'bg-slate-100 text-slate-600'
                : trend.isPositive
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            {trend.isNeutral ? (
              <Minus className="w-3 h-3 mr-1" />
            ) : trend.isPositive ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
};
