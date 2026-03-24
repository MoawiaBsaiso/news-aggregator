import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://gnews.io/api/v4',
  params: {
    token: import.meta.env.VITE_GNEWS_API_KEY,
    lang: 'en',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.errors?.[0] || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;