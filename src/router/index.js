import Vue from 'vue';
import Router from 'vue-router';
import projectManageLogin from '../views/login/projectManageLogin';
import adminLogin from '../views/login/adminLogin';
import index from '../views/index';
import admin from '../views/admin';
import projectManage from '../views/projectManage';

import profile from '../views/user/profile';
import applyDemand from '../views/demandManage/applyDemand';
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
        // { path: '', component: },
      ],
    },
    {
      path: '/project_manage/login',
      name: 'projectManageLogin',
      component: projectManageLogin,
      hidden: true,
    },
    {
      path: '/project_manage/password_find',
      name: 'project_manage_password_find',
      hidden: true,
    },
    {
      path: '/project_manage',
      name: 'projectManage',
      component: projectManage,
      iconCls: 'el-icon-message',
      alias: '需求管理',
      children: [
        { path: 'projectManage', component: profile, hidden: true },
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
      component: projectManage,
      iconCls: 'el-icon-menu',
      alias: '项目管理',
      children: [
      ],
    },
    {
      path: '/staff_manage',
      name: 'staffManage',
      component: projectManage,
      iconCls: 'el-icon-setting',
      alias: '全职人员管理',
      children: [
      ],
    },
    {
      path: '/tempoary_staff_manage',
      name: 'tempoaryStaffManage',
      component: projectManage,
      iconCls: 'el-icon-setting',
      alias: '兼职人员管理',
      children: [
      ],
    },
  ],
});

export default router;
