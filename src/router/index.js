import Vue from 'vue';
import Router from 'vue-router';
import projectManagerLogin from '../views/login/projectManagerLogin';
import adminLogin from '../views/login/adminLogin';
import index from '../views/index';
import admin from '../views/admin';
import projectManager from '../views/projectManager';

import adminProfile from '../views/admin/profile';
import projectManagerProfile from '../views/projectManager/profile';
import applyDemand from '../views/projectManager/demandManage/applyDemand';
import pendingDemand from '../views/projectManager/demandManage/pendingDemand';
import processedDemand from '../views/projectManager/demandManage/processedDemand';
import refusedDemand from '../views/projectManager/demandManage/refusedDemand';
import finalDemand from '../views/projectManager/demandManage/finalDemand';

import adminDashboard from '../views/admin/adminDashboard';
import middleManCheck from '../views/admin/staffManage/middleManCheck';
import itemPublish from '../views/admin/itemManage/publish';
import itemList from '../views/admin/itemManage/list';
import employeeList from '../views/admin/staffManage/employeeList';
import newProjectManager from '../views/admin/staffManage/newProjectManager';
import newAdmin from '../views/admin/staffManage/newAdmin';

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
      isAdmin: true,
      hidden: true,
      children: [
        { path: '', redirect: 'profile', component: adminProfile, hidden: true },
        { path: 'profile', component: adminProfile, isHeader: true, alias: '个人中心' },
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
        { path: 'publish', component: itemPublish, alias: '新建项目' },
        { path: 'list', component: itemList, alias: '管理项目' },
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
        { path: 'middleman', component: middleManCheck, alias: '经纪人管理' },
        { path: 'employeeList', component: employeeList, alias: '人才库' },
        { path: 'new_projectManager', component: newProjectManager, alias: '创建项目经理' },
        { path: 'new_admin', component: newAdmin, alias: '创建管理员' },
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
        { path: '', redirect: 'profile', component: projectManagerProfile, hidden: true },
        { path: 'profile', component: projectManagerProfile, hidden: true },
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
