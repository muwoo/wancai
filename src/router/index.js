import Vue from 'vue';
import Router from 'vue-router';
import projectManagerLogin from '../views/login/projectManagerLogin';
import adminLogin from '../views/login/adminLogin';
import index from '../views/index';
import admin from '../views/admin';
import projectManager from '../views/projectManager';
import adminPasswordFind from '../views/admin/password_find';
import managerPasswordFind from '../views/projectManager/password_find';

import projectmanagerApplyDemand from '../views/projectManager/applyDemand';
import projectManagerProfile from '../views/projectManager/profile';
import projectManagerDemandPending from '../views/projectManager/demand/pending';
import projectManagerDemandProcessed from '../views/projectManager/demand/processed';
import projectManagerDemandRefused from '../views/projectManager/demand/refused';
import projectManagerDemandCompleted from '../views/projectManager/demand/completed';
import projectManagerDemandCancled from '../views/projectManager/demand/cancled';
import projectManagerDemandEdit from '../views/projectManager/demand/edit';
import projectManagerDemandShow from '../views/projectManager/demand/show';
import managerDemandApplyAgain from '../views/projectManager/demand/applyAgain';

import projectManagerStaffFullTime from '../views/projectManager/staff/fullTime';
import projectManagerStaffPartTime from '../views/projectManager/staff/partTime';
import managerUserShow from '../views/projectManager/staff/show';
import managerUserEdit from '../views/projectManager/staff/edit';

import projectManagerItemDashboard from '../views/projectManager/item/dashboard';

import employe from '../components/employe';
import projectEmploye from '../components/projectEmploye';
import adminProfile from '../views/admin/profile';

import businessRecharge from '../views/admin/finance/business_recharge';
import businessWallet from '../views/admin/finance/business_recharge';
import middlemanWallet from '../views/admin/finance/middleman_wallet';
import middlemanWithdraw from '../views/admin/finance/middleman_withdraw';
import projectManagerWallet from '../views/admin/finance/project_manager_wallet';
import projectManagerWithdraw from '../views/admin/finance/project_manager_withdraw';
import riskIncentive from '../views/admin/finance/riskIncentive';
import staffWallet from '../views/admin/finance/staff_wallet';
import staffWithdraw from '../views/admin/finance/staff_withdraw';

import contentNotice from '../views/admin/content/notice';
import contentProtocol from '../views/admin/content/protocol';
import contentRule from '../views/admin/content/rule';
import contentSchool from '../views/admin/content/school';
import contentAdd from '../views/admin/content/add';
import contentEdit from '../views/admin/content/edit';

import middleManBlackList from '../views/admin/middleman/blacklist';
import middleManPending from '../views/admin/middleman/pending';
import middleManRefused from '../views/admin/middleman/refused';
import middleManSuccess from '../views/admin/middleman/success';

import demandPending from '../views/admin/demand/pending';
import demandProcessed from '../views/admin/demand/processed';
import demandRefused from '../views/admin/demand/refused';
import demandCompleted from '../views/admin/demand/completed';
import demandCancled from '../views/admin/demand/cancled';
import demandShow from '../views/admin/demand/show';
import demandEdit from '../views/admin/demand/edit';

import projectManagerList from '../views/admin/project_manager/list';
import projectManagerNew from '../views/admin/project_manager/new';
import projectManagerEdit from '../views/admin/project_manager/edit';

import businessBlackList from '../views/admin/business/blacklist';
import businessList from '../views/admin/business/list';

import userList from '../views/admin/user/list';
import userBlackList from '../views/admin/user/blacklist';
import adminUserShow from '../views/admin/user/show';
import adminUserEdit from '../views/admin/user/edit';

import administratorList from '../views/admin/administrator/list';
import administratorNew from '../views/admin/administrator/new';
import administratorNewRole from '../views/admin/administrator/new_role';
import administratorRoleList from '../views/admin/administrator/role_list';
import administratorRoleEdit from '../views/admin/administrator/edit';
import administratorRoleEditAdmin from '../views/admin/administrator/editAdmin';

import itemList from '../views/admin/item/list';
import itemGroups from '../views/admin/item/groups';
import partGroups from '../views/admin/item/partgroups';
import itemNew from '../views/admin/item/new';
import itemEdit from '../views/admin/item/edit';
import itemShow from '../views/admin/item/show';

import incomeMiddleMan from '../views/admin/income/middleman';
import incomeProjectManager from '../views/admin/income/project_manager';

import notFound from '../views/404';

import financeShow from "../views/admin/finance/show";


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
    // {
    //   path: '/user/:id',
    //   name: 'employe',
    //   component: employe,
    //   hidden: true,
    //   meta: {
    //     requireAuth: true,
    //     isAdmin: true,
    //   },
    // },
    // {
    //   path: '/project_user/:id',
    //   name: 'projectEmploye',
    //   component: projectEmploye,
    //   hidden: true,
    //   meta: {
    //     requireAuth: true,
    //     isProjectManager: true,
    //   },
    // },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: adminLogin,
      hidden: true,
    },
    {
      path: '/admin/password_find',
      name: 'adminPasswordFind',
      component: adminPasswordFind,
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
      meta: {
        requireAuth: true,
        isAdmin: true,
      },
    },
    {
      path: '/admin/middleman',
      name: 'admin_middleman',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '经纪人',
      children: [
        { path: 'pending', component: middleManPending, alias: '待审核', id: 2 },
        { path: 'success', component: middleManSuccess, alias: '审核通过', id: 3 },
        { path: 'refused', component: middleManRefused, alias: '审核不通过', id: 4 },
        { path: 'blacklist', component: middleManBlackList, alias: '黑名单', id: 5 },
      ],
      meta: {
        requireAuth: true,
        isAdmin: true,
      },
      id: 1,
    },
    {
      path: '/admin/project_manager',
      name: 'admin_project_manager',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '项目经理',
      children: [
        { path: 'list', component: projectManagerList, alias: '项目经理管理', id: 7 },
        { path: 'new', component: projectManagerNew, alias: '添加项目经理', id: 8 },
        { path: 'edit/:id', component: projectManagerEdit, name: 'adminProjectManagerEdit', hidden: true, alias: '修改项目经理' },
      ],
      meta: {
        requireAuth: true,
        isAdmin: true,
      },
      id: 6,
    },
    {
      path: '/admin/business',
      name: 'admin_business',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '商家',
      children: [
        { path: 'list', component: businessList, alias: '商家管理', id: 10 },
        { path: 'blacklist', component: businessBlackList, alias: '黑名单', id: 11 },
      ],
      meta: {
        requireAuth: true,
        isAdmin: true,
      },
      id: 9,
    },
    {
      path: '/admin/administrator',
      name: 'admin_administrator',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '管理员',
      children: [
        { path: 'list', component: administratorList, alias: '管理员管理', id: 13 },
        { path: 'new', component: administratorNew, alias: '新建管理员', id: 14 },
        { path: 'role_list', component: administratorRoleList, alias: '角色管理', name: 'administratorRoleList', id: 15 },
        { path: 'role_new', component: administratorNewRole, alias: '新建角色', id: 16 },
        { path: 'edit/:id', component: administratorRoleEdit, alias: '编辑角色', name: 'adminRoleEdit', hidden: true },
        { path: 'edit_admin/:id', component: administratorRoleEditAdmin, alias: '编辑管理员', name: 'administratorRoleEditAdmin', hidden: true },
      ],
      meta: {
        requireAuth: true,
        isAdmin: true,
      },
      id: 12,
    },
    {
      path: '/admin/user',
      name: 'admin_user',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '人才库',
      children: [
        { path: 'list', component: userList, alias: '人才库管理', id: 18 },
        { path: 'blacklist', component: userBlackList, alias: '黑名单', id: 19 },
        { path: 'show/:id', component: adminUserShow, name: 'adminUserShow', alias: '人才展示', hidden: true },
        { path: 'edit/:id', component: adminUserEdit, name: 'adminUserEdit', alias: '人才修改', hidden: true },
      ],
      meta: {
        requireAuth: true,
        isAdmin: true,
      },
      id: 17,
    },
    {
      path: '/admin/item',
      name: 'admin_item',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '项目管理',
      children: [
        { path: 'new', component: itemNew, alias: '新建项目',name: 'adminItemNew', id: 21 },
        { path: 'list', component: itemList, alias: '项目管理', name: 'adminItemList', id: 22 },
        { path: 'edit/:id', component: itemEdit, name: 'adminItemEdit', alias: '项目编辑', hidden: true },
        { path: 'show/:id', component: itemShow, name: 'adminItemShow', alias: '项目详情', hidden: true },
        { path: 'groups/new', component: itemGroups, name: 'adminItemGroups',alias: '添加班组', hidden: true },
        { path: 'partgroups/new', component: partGroups, name: 'adminItempartGroups',alias: '添加班组', hidden: true },
      ],
      meta: {
        requireAuth: true,
        isAdmin: true,
      },
      id: 20,
    },
    {
      path: '/admin/demand',
      name: 'admin_demand',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '需求管理',
      children: [
        { path: 'pending', component: demandPending, alias: '待处理', id: 24 },
        { path: 'processed', component: demandProcessed, alias: '处理中', id: 25 },
        { path: 'completed', component: demandCompleted, alias: '已结束', id: 26 },
        { path: 'refused', component: demandRefused, alias: '已驳回', id: 27 },
        { path: 'cancled', component: demandCancled, alias: '已取消', id: 47 },
        { path: ':id', component: demandShow, name: 'adminDemandShow', alias: '需求详情', hidden: true },
        { path: 'edit/:id', component: demandEdit, alias: '需求修改', hidden: true },
      ],
      meta: {
        requireAuth: true,
        isAdmin: true,
      },
      id: 23,
    },
    {
      path: '/admin/income',
      name: 'admin_income',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '收入发放',
      children: [
        { path: 'middleman', component: incomeMiddleMan, alias: '经纪人收入', id: 29 },
        { path: 'project_manager', component: incomeProjectManager, alias: '项目经理收入', id: 30 },
      ],
      meta: {
        requireAuth: true,
        isAdmin: true,
      },
      id: 28,
    },
    {
      path: '/admin/finance',
      name: 'admin_finance',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '财务管理',
      children: [
        { path: 'staff_wallet', component: staffWallet, alias: '求职者钱包', id: 32 },
        { path: 'project_manager_wallet', component: projectManagerWallet, alias: '项目经理钱包', id: 33 },
        { path: 'business_wallet', component: businessWallet, alias: '商家钱包', id: 34 },
        { path: 'middleman_wallet', component: middlemanWallet, alias: '经纪人钱包', id: 35 },
        { path: 'staff_withdraw', component: staffWithdraw, alias: '求职者提现', id: 36 },
        { path: 'project_manager_withdraw', component: projectManagerWithdraw, alias: '项目经理提现', id: 37 },
        { path: 'middleman_withdraw', component: middlemanWithdraw, alias: '经纪人提现', id: 37 },
        { path: 'business_recharge', component: businessRecharge, alias: '商家充值', id: 38 },
        { path: 'riskIncentive', component: riskIncentive, alias: '风险激励金', id: 40 },
        {path: 'detail/:id',component:financeShow,name:"adminFinanceShow",alias:"钱包流水"}
      ],
      meta: {
        requireAuth: true,
        isAdmin: true,
      },
      id: 31,
    },
    {
      path: '/admin/content',
      name: 'admin_content',
      component: admin,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '内容管理',
      children: [
        { path: 'notice', component: contentNotice, alias: '公告管理', id: 42 },
        { path: 'school', component: contentSchool, alias: '学堂管理', id: 43 },
        { path: 'rule', component: contentRule, alias: '规则管理', id: 44 },
        { path: 'protocol', component: contentProtocol, alias: '协议与文章管理', id: 45 },
        { path: 'add', component: contentAdd, alias: '新增内容', id: 46 },
        { path: 'edit/:id', component: contentEdit, name: 'contentEdit', alias: '修改内容', hidden: true },
      ],
      meta: {
        requireAuth: true,
        isAdmin: true,
      },
      id: 41,
    },
    {
      path: '/admin/profile',
      name: 'admin_profile',
      component: adminProfile,
      isSingleMenu: true,
      isAdmin: true,
      iconCls: 'el-icon-menu',
      alias: '个人中心',
      meta: {
        requireAuth: true,
        isAdmin: true,
      },
    },
    {
      path: '/project_manager/login',
      name: 'projectManagerLogin',
      component: projectManagerLogin,
      hidden: true,
    },
    {
      path: '/project_manager/password_find',
      name: 'managerPasswordFind',
      component: managerPasswordFind,
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
      meta: {
        requireAuth: true,
        isProjectManager: true,
      },
    },
    {
      path: '/project_manager/demand',
      name: 'project_manager_demand',
      component: projectManager,
      iconCls: 'el-icon-message',
      alias: '需求管理',
      isAdmin: false,
      isProjectManager: true,
      children: [
        { path: 'pending', component: projectManagerDemandPending, alias: '待审核' },
        { path: 'processed', component: projectManagerDemandProcessed, alias: '处理中' },
        { path: 'refused', component: projectManagerDemandRefused, alias: '已驳回' },
        { path: 'completed', component: projectManagerDemandCompleted, alias: '已结束' },
        { path: 'cancled', component: projectManagerDemandCancled, alias: '已取消' },
        { path: 'edit/:id', component: projectManagerDemandEdit, alias: '编辑', name: 'projectManagerDemandEdit', hidden: true },
        { path: 'show/:id', component: projectManagerDemandShow, alias: '详情', name: 'projectManagerDemandShow', hidden: true },
        { path: 'apply_again/:id', component: managerDemandApplyAgain, alias: '再次申请', name: 'managerDemandApplyAgain', hidden: true },
      ],
      meta: {
        requireAuth: true,
        isProjectManager: true,
      },
    },
    {
      path: '/project_manager/sftaff',
      name: 'project_manager_sftaff',
      component: projectManager,
      iconCls: 'el-icon-message',
      alias: '人员管理',
      isAdmin: false,
      isProjectManager: true,
      children: [
        { path: 'full_time', component: projectManagerStaffFullTime, alias: '全职人员管理' },
        { path: 'part_time', component: projectManagerStaffPartTime, alias: '兼职人员管理' },
        { path: 'show/:id', component: managerUserShow, name: 'managerUserShow', alias: '人员信息展示', hidden: true },
        { path: 'edit/:id', component: managerUserEdit, name: 'managerUserEdit', alias: '人员信息修改', hidden: true },
      ],
      meta: {
        requireAuth: true,
        isProjectManager: true,
      },
    },
    {
      path: '/project_manager/item',
      name: 'project_manager_item',
      component: projectManager,
      iconCls: 'el-icon-menu',
      alias: '项目管理',
      isAdmin: false,
      isProjectManager: true,
      children: [
        { path: 'dashboard', component: projectManagerItemDashboard, alias: '项目看板' },
      ],
      meta: {
        requireAuth: true,
        isProjectManager: true,
      },
    },
    {
      path: '*',
      component: notFound,
      hidden: true,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    const adminUser = JSON.parse(sessionStorage.getItem('admin'));
    const projectManagerUser = JSON.parse(sessionStorage.getItem('project_manager'));

    if (to.matched.some(r => r.meta.isAdmin)) {
      if (adminUser) {
        next();
      } else {
        next({
          name: 'adminLogin',
        });
      }
    } else if (to.matched.some(r => r.meta.isProjectManager)) {
      if (projectManagerUser) {
        next();
      } else {
        next({
          name: 'projectManagerLogin',
        });
      }
    }
  } else {
    next();
  }
});

export default router;
