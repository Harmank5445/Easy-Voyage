import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, addDays, differenceInDays } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
}

export function generateDateRange(startDate: Date, endDate: Date): Date[] {
  const dateArray: Date[] = [];
  const totalDays = differenceInDays(endDate, startDate) + 1;
  
  for (let i = 0; i < totalDays; i++) {
    dateArray.push(addDays(startDate, i));
  }
  
  return dateArray;
}

export function getRandomItemFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}