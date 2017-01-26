import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login';
import Index from '../views/index';
import Admin from '../views/admin';


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
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        title: '管理后台',
      },
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
          meta: {
            title: '登录',
          },
        },
      ],
    },
  ],
});

export default router;
