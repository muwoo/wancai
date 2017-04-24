import axios from 'axios';
import router from './router';
/* eslint-disable */
const axiosInstance = axios.create({

baseURL: 'http://120.77.253.107:9093/bos',
//baseURL: 'http://192.168.31.226:9093/bos',
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  response => {
    switch (response.data.errorCode) {
      case 10001:
        sessionStorage.removeItem('admin');
        sessionStorage.removeItem('project_manager');
        if (router.currentRoute.matched.some(r => r.meta.isAdmin)) {
          router.replace({ name: 'adminLogin' });
        } else if (router.currentRoute.matched.some(r => r.meta.isProjectManager)){
          router.replace({ name: 'projectManagerLogin' });
        }
        break;
    }
    return response;
  },
  error => {
    if (error.toString() === 'Error: Network Error') {
      sessionStorage.removeItem('admin');
      sessionStorage.removeItem('project_manager');
      if (router.currentRoute.matched.some(r => r.meta.isAdmin)) {
        router.replace({ name: 'adminLogin' });
      } else if (router.currentRoute.matched.some(r => r.meta.isProjectManager)){
        router.replace({ name: 'projectManagerLogin' });
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
