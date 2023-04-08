import axios from 'axios';

const client = axios.create({ baseURL: import.meta.env.VITE_BASE_URL  });
export const request = async (options: any) => {
  const token = localStorage.getItem('authToken')
  client.defaults.headers.common.Authorization = `Bearer ${token}`;

  const onSuccess = (response: any) => {
    return response;
  };
  const onError = (error: any) => {
    throw error.response;
  };

  return client({ ...options })
    .then(onSuccess)
    .catch(onError);
};