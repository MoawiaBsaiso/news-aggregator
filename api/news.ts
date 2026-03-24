import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { endpoint, ...params } = req.query;

  try {
    const { data } = await axios.get(
      `https://gnews.io/api/v4/${endpoint}`,
      {
        params: {
          ...params,
          token: process.env.VITE_GNEWS_API_KEY,
          lang: 'en',
        },
      }
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'API error';
    res.status(500).json({ error: message });
  }
}