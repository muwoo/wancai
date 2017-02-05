import Vue from 'vue';
import Router from 'vue-router';
import login from '../views/login';
import index from '../views/index';
import admin from '../views/admin';

import profile from '../views/user/profile';
import pendingDemand from '../views/demandManage/pendingDemand';
import processedDemand from '../views/demandManage/processedDemand';
import refusedDemand from '../views/demandManage/refusedDemand';
import finalDemand from '../views/demandManage/finalDemand';

Vue.use(Router);
const router = new Router({
  // history | hash mode
  // mode: 'history',
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/admin/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录',
      },
    },
    {
      path: '/admin/password_find',
      name: 'password_find',
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      meta: {
        title: '管理后台',
      },
      children: [
        { path: '', component: profile },
        { path: 'demandPending', component: pendingDemand },
        { path: 'demandProcessed', component: processedDemand },
        { path: 'demandRefused', component: refusedDemand },
        { path: 'demandFinal', component: finalDemand },
        // { path: '', component: },
      ],
    },
  ],
});

export default router;
