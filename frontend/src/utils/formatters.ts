export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '—';
  try {
    const [year, month, day] = dateStr.split('-');
    if (year && month && day) {
      const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
};

export const getStatusBadgeClass = (status: string): string => {
  switch (status?.toLowerCase()) {
    case 'paid':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20';
    case 'pending':
      return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/20';
    case 'failed':
      return 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/20';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200 ring-slate-600/20';
  }
};

export const getTypeBadgeClass = (type: string): string => {
  switch (type?.toLowerCase()) {
    case 'revenue':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'expense':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};
