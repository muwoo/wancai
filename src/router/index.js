import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login';
import Index from '../views/index';


Vue.use(Router);
const router = new Router({
  // history mode
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录',
      },
    },
  ],
});

export default router;
