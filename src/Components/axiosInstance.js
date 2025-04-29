import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = localStorage.getItem('token');
        console.log("Token from localStorage:", token); 
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        resolve(config);  
      }, 500);  
    });
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error as necessary
    return Promise.reject(error);
  }
);

export default axiosInstance;
