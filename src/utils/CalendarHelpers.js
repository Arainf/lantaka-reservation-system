import { format, parseISO } from 'date-fns';

export const formatEventDate = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'PPpp');
};

export const getEventColor = (status) => {
  const colors = {
    confirmed: '#10B981',
    pending: '#F59E0B',
    cancelled: '#EF4444',
    default: '#6B7280'
  };
  return colors[status] || colors.default;
};

export const validateEventDates = (start, end) => {
  if (!start || !end) return false;
  return new Date(start) < new Date(end);
};