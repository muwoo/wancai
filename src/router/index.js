import Vue from 'vue';
import Router from 'vue-router';
import projectManageLogin from '../views/login/projectManageLogin';
import adminLogin from '../views/login/adminLogin';
import index from '../views/index';
import admin from '../views/admin';
import projectManage from '../views/projectManage';

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
      name: 'adminLogin',
      component: adminLogin,
      meta: {
        title: '后台登录',
      },
    },
    {
      path: '/admin/password_find',
      name: 'admin_password_find',
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      meta: {
        title: '管理后台',
      },
      children: [
        // { path: '', component: },
      ],
    },
    {
      path: '/project_manage/login',
      name: 'projectManageLogin',
      component: projectManageLogin,
      meta: {
        title: '项目经理登录',
      },
    },
    {
      path: '/project_manage/password_find',
      name: 'project_manage_password_find',
    },
    {
      path: '/project_manage',
      name: 'projectManage',
      component: projectManage,
      meta: {
        title: '项目管理',
      },
      children: [
        { path: 'projectManage', component: profile },
        { path: 'demandPending', component: pendingDemand },
        { path: 'demandProcessed', component: processedDemand },
        { path: 'demandRefused', component: refusedDemand },
        { path: 'demandFinal', component: finalDemand },
      ],
    },
  ],
});

export default router;
