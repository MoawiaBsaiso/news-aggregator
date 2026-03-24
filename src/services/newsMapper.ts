export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
  author: string;
}

export interface RawArticle {
  title: string;
  description: string | null;
  content: string | null;
  url: string;
  image: string | null;
  publishedAt: string;
  source: { name: string; url: string };
}

export const mapArticle = (raw: RawArticle): Article => ({
  id: raw.url,
  title: raw.title ?? 'No title',
  description: raw.description ?? 'No description available',
  content: raw.content ?? '',
  url: raw.url,
  imageUrl: raw.image ?? '/placeholder.png',
  publishedAt: raw.publishedAt,
  source: raw.source?.name ?? 'Unknown',
  author: raw.source?.name ?? 'Unknown',
});

export const mapArticles = (rawList: RawArticle[]): Article[] =>
  rawList
    .filter((a) => a.title !== '[Removed]')
    .filter((a) => a.image !== null)
    .map(mapArticle);