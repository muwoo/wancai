import Vue from 'vue';
import Router from 'vue-router';
import projectManagerLogin from '../views/login/projectManagerLogin';
import adminLogin from '../views/login/adminLogin';
import index from '../views/index';
import admin from '../views/admin';
import projectManager from '../views/projectManager';

import profile from '../views/user/profile';
import applyDemand from '../views/demandManage/applyDemand';
import pendingDemand from '../views/demandManage/pendingDemand';
import processedDemand from '../views/demandManage/processedDemand';
import refusedDemand from '../views/demandManage/refusedDemand';
import finalDemand from '../views/demandManage/finalDemand';

import notFound from '../views/404';

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
      hidden: true, //不显示在导航栏中
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: adminLogin,
      hidden: true,
    },
    {
      path: '/admin/password_find',
      name: 'admin_password_find',
      hidden: true,
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      hidden: true,
      children: [
        // { path: '', component: adminDashboard, hidden: true },
        // { path: '', component: adminDashboard, hidden: true },
      ],
    },
    {
      path: '/project_manager/login',
      name: 'projectManagerLogin',
      component: projectManagerLogin,
      hidden: true,
    },
    {
      path: '/project_manager/password_find',
      name: 'project_manager_password_find',
      hidden: true,
    },
    {
      path: '/project_manager',
      name: 'projectManager',
      component: projectManager,
      iconCls: 'el-icon-message',
      alias: '需求管理',
      children: [
        { path: '', component: profile, hidden: true },
        { path: 'profile', component: profile, hidden: true },
        { path: 'applyDemand', component: applyDemand, hidden: true },
        { path: 'demandPending', component: pendingDemand, alias: '待审核' },
        { path: 'demandProcessed', component: processedDemand, alias: '处理中' },
        { path: 'demandRefused', component: refusedDemand, alias: '已拒绝' },
        { path: 'demandFinal', component: finalDemand, alias: '处理结束' },
      ],
    },
    {
      path: '/item_manage',
      name: 'itemManage',
      component: projectManager,
      iconCls: 'el-icon-menu',
      alias: '项目管理',
      children: [
      ],
    },
    {
      path: '/staff_manage',
      name: 'staffManage',
      component: projectManager,
      iconCls: 'el-icon-setting',
      alias: '全职人员管理',
      children: [
      ],
    },
    {
      path: '/tempoary_staff_manage',
      name: 'tempoaryStaffManage',
      component: projectManager,
      iconCls: 'el-icon-setting',
      alias: '兼职人员管理',
      children: [
      ],
    },
    {
      path: '*',
      component: notFound,
      hidden: true,
    },
  ],
});

export default router;
