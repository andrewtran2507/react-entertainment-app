import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    api_key: process.env.REACT_APP_API_KEY,
  },
});

// Lately wwe can add an interceptor

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      return Promise.reject(error);
    }
  },
);

export default instance;
