export const API_KEY = import.meta.env.VITE_NEWS_API_KEY as string;
export const BASE_URL = 'https://newsapi.org/v2';

export const CATEGORIES = [
  'general',
  'technology',
  'business',
  'sports',
  'entertainment',
  'health',
  'science',
] as const;

export type Category = typeof CATEGORIES[number];

export const DEFAULT_PAGE_SIZE = 12;
export const DEFAULT_COUNTRY = 'us';