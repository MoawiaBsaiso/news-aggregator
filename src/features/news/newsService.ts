import apiClient from '../../services/api';
import { mapArticles } from '../../services/newsMapper';
import { DEFAULT_PAGE_SIZE, DEFAULT_COUNTRY } from '../../utils/constants';
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

export const fetchNews = async ({
  category = 'general',
  query = '',
  page = 1,
}: FetchNewsParams): Promise<NewsResponse> => {
  const endpoint = query ? '/everything' : '/top-headlines';

  const params = query
    ? { q: query, pageSize: DEFAULT_PAGE_SIZE, page }
    : { category, country: DEFAULT_COUNTRY, pageSize: DEFAULT_PAGE_SIZE, page };

  const { data } = await apiClient.get(endpoint, { params });

  return {
    articles: mapArticles(data.articles),
    totalResults: data.totalResults,
  };
};