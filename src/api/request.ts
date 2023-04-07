import axios from 'axios';
import { decryptData } from '../utils/crypto';


const client = axios.create({ baseURL: import.meta.env.VITE_BASE_URL  });
export const request = async (options: any) => {
  const header = localStorage.getItem('token') ? decryptData(localStorage.getItem('token'),import.meta.env.VITE_SALT) : ''
  client.defaults.headers.common.Authorization = `Bearer ${header}`;

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