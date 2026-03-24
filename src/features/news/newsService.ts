import apiClient from '../../services/api';
import { mapArticles } from '../../services/newsMapper';
import { DEFAULT_PAGE_SIZE } from '../../utils/constants';
import type { Article } from '../../services/newsMapper';
import type { Category } from '../../utils/constants';

interface FetchNewsParams {
  category?: Category;
  query?: string;
  page?: number;
}

interface NewsResponse {
  articles: Article[];
  totalResults: number;
}

const CATEGORY_MAP: Record<string, string> = {
  general: 'general',
  technology: 'technology',
  business: 'business',
  sports: 'sports',
  entertainment: 'entertainment',
  health: 'health',
  science: 'science',
};

export const fetchNews = async ({
  category = 'general',
  query = '',
  page = 1,
}: FetchNewsParams): Promise<NewsResponse> => {
  const endpoint = query ? '/search' : '/top-headlines';

  const params = query
    ? { q: query, max: DEFAULT_PAGE_SIZE, page }
    : { category: CATEGORY_MAP[category], max: DEFAULT_PAGE_SIZE, page };

  const { data } = await apiClient.get(endpoint, {
  params: import.meta.env.PROD
    ? { endpoint: endpoint.replace('/', ''), ...params }
    : params,
});

  return {
    articles: mapArticles(data.articles),
    totalResults: data.totalArticles ?? 0,
  };
};