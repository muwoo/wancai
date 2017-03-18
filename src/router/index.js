import Vue from 'vue';
import Router from 'vue-router';
import projectManagerLogin from '../views/login/projectManagerLogin';
import adminLogin from '../views/login/adminLogin';
import index from '../views/index';
import admin from '../views/admin';
import projectManager from '../views/projectManager';

import projectmanagerApplyDemand from '../views/projectManager/applyDemand';
import projectManagerProfile from '../views/projectManager/profile';
import projectManagerDemandPending from '../views/projectManager/demand/pending';
import projectManagerDemandProcessed from '../views/projectManager/demand/processed';
import projectManagerDemandRefused from '../views/projectManager/demand/refused';
import projectManagerDemandCompleted from '../views/projectManager/demand/completed';

import projectManagerStaffFullTime from '../views/projectManager/staff/fullTime';
import projectManagerStaffPartTime from '../views/projectManager/staff/partTime';

import projectManagerItemDashboard from '../views/projectManager/item/dashboard';

import employe from '../components/employe';
import adminProfile from '../views/admin/profile';

import contentNotice from '../views/admin/content/notice';
import contentProtocol from '../views/admin/content/protocol';
import contentRule from '../views/admin/content/rule';
import contentSchool from '../views/admin/content/school';

import middleManBlackList from '../views/admin/middleman/blacklist';
import middleManPending from '../views/admin/middleman/pending';
import middleManRefused from '../views/admin/middleman/refused';
import middleManSuccess from '../views/admin/middleman/success';

import demandPending from '../views/admin/demand/pending';
import demandProcessed from '../views/admin/demand/processed';
import demandRefused from '../views/admin/demand/refused';
import demandCompleted from '../views/admin/demand/completed';
import demandCancled from '../views/admin/demand/cancled';

import projectManagerList from '../views/admin/project_manager/list';
import projectManagerNew from '../views/admin/project_manager/new';

import businessBlackList from '../views/admin/business/blacklist';
import businessList from '../views/admin/business/list';

import userList from '../views/admin/user/list';
import userBlackList from '../views/admin/user/blacklist';

import administratorList from '../views/admin/administrator/list';
import administratorNew from '../views/admin/administrator/new';
import administratorNewRole from '../views/admin/administrator/new_role';
import administratorRoleList from '../views/admin/administrator/role_list';

import itemList from '../views/admin/item/list';
import itemNew from '../views/admin/item/new';
import itemEdit from '../views/admin/item/edit';

import incomeMiddleMan from '../views/admin/income/middleman';
import incomeProjectManager from '../views/admin/income/project_manager';

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
      path: '/staff/:id',
      name: 'employe',
      component: employe,
      hidden: true,
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
      path: '/admin/middleman',
      name: 'admin_middleman',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '经纪人',
      children: [
        { path: 'pending', component: middleManPending, alias: '待审核' },
        { path: 'success', component: middleManSuccess, alias: '审核通过' },
        { path: 'refused', component: middleManRefused, alias: '审核不通过' },
        { path: 'blacklist', component: middleManBlackList, alias: '黑名单' },
      ],
    },
    {
      path: '/admin/project_manager',
      name: 'admin_project_manager',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '项目经理',
      children: [
        { path: 'list', component: projectManagerList, alias: '项目经理管理' },
        { path: 'new', component: projectManagerNew, alias: '添加项目经理' },
      ],
    },
    {
      path: '/admin/business',
      name: 'admin_business',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '商家',
      children: [
        { path: 'list', component: businessList, alias: '商家管理' },
        { path: 'blacklist', component: businessBlackList, alias: '黑名单' },
      ],
    },
    {
      path: '/admin/administrator',
      name: 'admin_administrator',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '管理员',
      children: [
        { path: 'list', component: administratorList, alias: '管理员管理' },
        { path: 'new', component: administratorNew, alias: '新建管理员' },
        { path: 'role_list', component: administratorRoleList, alias: '角色管理' },
        { path: 'role_new', component: administratorNewRole, alias: '新建角色' },
      ],
    },
    {
      path: '/admin/user',
      name: 'admin_user',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '人才库',
      children: [
        { path: 'list', component: userList, alias: '人才库管理' },
        { path: 'blacklist', component: userBlackList, alias: '黑名单' },
      ],
    },
    {
      path: '/admin/item',
      name: 'admin_item',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '项目管理',
      children: [
        { path: 'publish', component: itemNew, alias: '新建项目' },
        { path: 'list', component: itemList, alias: '项目管理' },
        { path: 'edit/:id', component: itemEdit, name: 'adminItemEdit', alias: '项目编辑', hidden: true },
      ],
    },
    {
      path: '/admin/demand',
      name: 'admin_demand',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '需求管理',
      children: [
        { path: 'pending', component: demandPending, alias: '待处理' },
        { path: 'processed', component: demandProcessed, alias: '处理中' },
        { path: 'completed', component: demandCompleted, alias: '已结束' },
        { path: 'refused', component: demandRefused, alias: '已驳回' },
        { path: 'cancled', component: demandCancled, alias: '已取消' },
      ],
    },
    {
      path: '/admin/income',
      name: 'admin_income',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '收入发放',
      children: [
        { path: 'middleman', component: incomeMiddleMan, alias: '经纪人收入' },
        { path: 'project_manager', component: incomeProjectManager, alias: '项目经理收入' },
      ],
    },
    {
      path: '/admin/content',
      name: 'admin_content',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '内容管理',
      children: [
        { path: 'notice', component: contentNotice, alias: '公告管理' },
        { path: 'school', component: contentSchool, alias: '学堂管理' },
        { path: 'rule', component: contentRule, alias: '规则管理' },
        { path: 'protocol', component: contentProtocol, alias: '协议与文章管理' },
      ],
    },
    {
      path: '/admin/profile',
      name: 'admin_profile',
      component: adminProfile,
      isSingleMenu: true,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '个人中心',
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
        { path: 'applyDemand', component: projectmanagerApplyDemand, hidden: true },
      ],
    },
    {
      path: '/project_manager/demand',
      name: 'project_manager_demand',
      component: projectManager,
      iconCls: 'el-icon-message',
      alias: '需求管理',
      isAdmin: false,
      children: [
        { path: 'pending', component: projectManagerDemandPending, alias: '待审核' },
        { path: 'processed', component: projectManagerDemandProcessed, alias: '处理中' },
        { path: 'refused', component: projectManagerDemandRefused, alias: '已驳回' },
        { path: 'completed', component: projectManagerDemandCompleted, alias: '已结束' },
      ],
    },
    {
      path: '/project_manager/sftaff',
      name: 'project_manager_sftaff',
      component: projectManager,
      iconCls: 'el-icon-message',
      alias: '人员管理',
      isAdmin: false,
      children: [
        { path: 'full_time', component: projectManagerStaffFullTime, alias: '全职人员管理' },
        { path: 'part_time', component: projectManagerStaffPartTime, alias: '兼职人员管理' },
      ],
    },
    {
      path: '/project_manager/item',
      name: 'project_manager_item',
      component: projectManager,
      iconCls: 'el-icon-menu',
      alias: '项目管理',
      isAdmin: false,
      children: [
        { path: 'dashboard', component: projectManagerItemDashboard, alias: '项目看板' },
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
