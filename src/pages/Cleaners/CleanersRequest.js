import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const getRooms = async () => {
  try {
    const response = await api.get('/limpiezas/habitaciones');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getCleaners = async () => {
  try {
    const response = await api.get('/personal/limpieza');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const linkCleanerToRooms = async (data) => {
  try {
    const response = await api.post('/tarjetas/asignarLimpiezas', {
      ...data
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}