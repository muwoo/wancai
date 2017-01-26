import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login';


Vue.use(Router);
const router = new Router({
  // history mode
  mode: 'hash',
  routes: [
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
