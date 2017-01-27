import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login';
import Index from '../views/index';
import Admin from '../views/admin';


Vue.use(Router);
const router = new Router({
  // history | hash mode
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/admin/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录',
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        title: '管理后台',
      },
      children: [
      ],
    },
  ],
});

export default router;
