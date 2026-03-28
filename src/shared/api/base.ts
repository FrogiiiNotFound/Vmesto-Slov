import { API_BASE_URL } from '@shared/utils/constants/api';
import axios from 'axios';
import { useUser } from '@/entities/user';

export const $api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const { data } = await axios.get(`${API_BASE_URL}refresh`, { withCredentials: true });
        localStorage.setItem('token', data.accessToken);
        const { setAccessToken, setIsAuth } = useUser.getState();
        setAccessToken(data.accessToken);
        setIsAuth(true);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return $api(original);
      } catch {
        localStorage.removeItem('token');
        const { setIsAuth } = useUser.getState();
        setIsAuth(false);
      }
    }
    return Promise.reject(error);
  }
);
