import axios from 'axios';
import secureLocalStorage from "react-secure-storage";


const client = axios.create({ baseURL: import.meta.env.VITE_BASE_URL  });
export const request = async (options: any) => {
  client.defaults.headers.common.Authorization = `Bearer ${secureLocalStorage.getItem('token')}`;

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