import axios from 'axios';
import { BASE_URL, API_KEY } from '../utils/constants';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;