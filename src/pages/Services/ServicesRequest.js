import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// const global = axios.create({
//   baseURL: process.env.VUE_APP_API_URL_GLOBAL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const obtenerServicios = async () => {
  try {
    const response = await api.get('/servicios/solicitados');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const completarServicio = async (id) => {
  try {
    const response = await api.get(`/servicios/completar/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
