import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const global = axios.create({
  baseURL: process.env.VUE_APP_API_URL_GLOBAL,
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

export const getReservations = async (startDate='', endDate='') => {
  if (startDate !== '' && endDate !== '') {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    let year = startDate.getFullYear();
    let month = (startDate.getMonth() + 1).toString().padStart(2, '0');
    let day = startDate.getDate().toString().padStart(2, '0');
    startDate = `${year}-${month}-${day}`;
    year = endDate.getFullYear();
    month = (endDate.getMonth() + 1).toString().padStart(2, '0');
    day = endDate.getDate().toString().padStart(2, '0');
    endDate = `${year}-${month}-${day}`;
  }
    try {
      console.log(startDate, endDate);
        const response = await api.get(`/reservas/${startDate}/${endDate}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const createReservation = async (data) => {
    try {
        const response = await global.post('/reservas/create', data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const obtenerHabitaciones = async (data) => {
    try {
      const response = await global.post('/habitaciones/disponibles', data);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
}