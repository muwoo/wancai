import axios from 'axios';
import router from './router';
/* eslint-disable */
const axiosInstance = axios.create({
  baseURL: 'http://192.168.31.253:9090',
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => {
    // console.log(router.currentRoute);
    switch (response.data.errorCode) {
      case 10001:
        router.replace({ name: 'adminLogin' });
        break;
    }
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);


export default axiosInstance;
