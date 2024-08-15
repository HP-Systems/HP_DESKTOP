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

export const getNFC = async () => {
  try {
    const response = await api.get('/tarjetas');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const registerNFC = async (data) => {
    try {
        const response = await api.post('/tarjetas/create', data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateNFC = async (data, id) => {
  console.log(data, id);
    try {
        const response = await api.put(`tarjetas/edit/${id}`, data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateStatusNFC = async (data, id) => {
    try {
        const response = await api.post(`tarjetas/status/${id}`, data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const obtainTiposNFC = async () => {
    try {
        const response = await api.get('tarjetas/tipos');
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}