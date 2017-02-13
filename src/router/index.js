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

import adminDashboard from '../views/admin/adminDashboard';
import staffCheck from '../views/admin/staffManage/check';
import itemPublish from '../views/admin/itemManage/publish';

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
        { path: '', redirect: 'dashboard', component: adminDashboard, hidden: true },
        { path: 'dashboard', component: adminDashboard, hidden: true },
      ],
    },
    {
      path: '/admin/item_manage',
      name: 'admin_itemManage',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '项目管理',
      children: [
        { path: '', component: adminDashboard, hidden: true },
        { path: 'publish', component: itemPublish, alias: '项目发布' },
        { path: 'adminDashboard', component: adminDashboard, hidden: true },
      ],
    },
    {
      path: '/admin/staff_manage',
      name: 'admin_staffManage',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '人员管理',
      children: [
        { path: 'check', component: staffCheck, alias: '身份审核' },
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
      hidden: true,
      children: [
        { path: '', redirect: 'profile', component: profile, hidden: true },
        { path: 'profile', component: profile, hidden: true },
        { path: 'applyDemand', component: applyDemand, hidden: true },
      ],
    },
    {
      path: '/project_manager/demand_manage',
      name: 'demandManage',
      component: projectManager,
      iconCls: 'el-icon-message',
      alias: '需求管理',
      isAdmin: false,
      children: [
        { path: 'Pending', component: pendingDemand, alias: '待审核' },
        { path: 'Processed', component: processedDemand, alias: '处理中' },
        { path: 'Refused', component: refusedDemand, alias: '已拒绝' },
        { path: 'Final', component: finalDemand, alias: '处理结束' },
      ],
    },
    {
      path: '/project_manager/item_manage',
      name: 'itemManage',
      component: projectManager,
      iconCls: 'el-icon-menu',
      alias: '项目管理',
      isAdmin: false,
      children: [
      ],
    },
    {
      path: '/project_manager/staff_manage',
      name: 'staffManage',
      component: projectManager,
      iconCls: 'el-icon-setting',
      isAdmin: false,
      alias: '全职人员管理',
      children: [
      ],
    },
    {
      path: '/project_manager/tempoary_staff_manage',
      name: 'tempoaryStaffManage',
      component: projectManager,
      iconCls: 'el-icon-setting',
      alias: '兼职人员管理',
      isAdmin: false,
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
