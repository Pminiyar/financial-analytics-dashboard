import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  text,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
      {text && <p className="text-sm font-medium text-slate-500 mt-2.5">{text}</p>}
    </div>
  );
};

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-card animate-pulse">
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 bg-slate-200 rounded-md w-24"></div>
            <div className="w-8 h-8 bg-slate-200 rounded-xl"></div>
          </div>
          <div className="h-7 bg-slate-200 rounded-md w-36 mb-2"></div>
          <div className="h-3 bg-slate-100 rounded-md w-20"></div>
        </div>
      ))}
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 6
}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-card animate-pulse">
      <div className="h-12 bg-slate-100 border-b border-slate-200 flex items-center px-6 gap-4">
        {Array.from({ length: columns }).map((_, j) => (
          <div key={j} className="h-4 bg-slate-200 rounded-md flex-1"></div>
        ))}
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-14 flex items-center px-6 gap-4">
            {Array.from({ length: columns }).map((_, j) => (
              <div key={j} className="h-4 bg-slate-100 rounded-md flex-1"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
