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

export const getStaff = async () => {
  try {
    const response = await api.get('/personal/index');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const registerStaff = async (data) => {
    try {
        const response = await api.post('/personal/create', data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateStaff = async (data, id) => {
  console.log(data, id);
    try {
        const response = await api.put(`/personal/edit/${id}`, data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}