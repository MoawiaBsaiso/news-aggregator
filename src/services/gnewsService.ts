import axios from 'axios';
import type { Article } from './newsMapper';
import type { Category } from '../utils/constants';

const GNEWS_BASE = 'https://gnews.io/api/v4';
const GNEWS_KEY = import.meta.env.VITE_GNEWS_API_KEY as string;

const CATEGORY_MAP: Record<string, string> = {
  general: 'general',
  technology: 'technology',
  business: 'business',
  sports: 'sports',
  entertainment: 'entertainment',
  health: 'health',
  science: 'science',
};

interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: { name: string; url: string };
}

const mapGNewsArticle = (raw: GNewsArticle): Article => ({
  id: raw.url,
  title: raw.title ?? 'No title',
  description: raw.description ?? '',
  content: raw.content ?? '',
  url: raw.url,
  imageUrl: raw.image ?? '/placeholder.png',
  publishedAt: raw.publishedAt,
  source: raw.source?.name ?? 'Unknown',
  author: raw.source?.name ?? 'Unknown',
});

export const fetchGNews = async ({
  category = 'general',
  query = '',
  page = 1,
}: {
  category?: Category;
  query?: string;
  page?: number;
}): Promise<{ articles: Article[]; totalResults: number }> => {
  const endpoint = query ? '/search' : '/top-headlines';

  const params = query
    ? { q: query, lang: 'en', max: 12, page, token: GNEWS_KEY }
    : { category: CATEGORY_MAP[category], lang: 'en', max: 12, page, token: GNEWS_KEY };

  const { data } = await axios.get(`${GNEWS_BASE}${endpoint}`, { params });

  return {
    articles: data.articles
      .filter((a: GNewsArticle) => a.title !== '[Removed]')
      .map(mapGNewsArticle),
    totalResults: data.totalArticles ?? 0,
  };
};