import axios from 'axios';

const client = axios.create({ baseURL: "http://localhost:3000" });
export const request = async (options: any) => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

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