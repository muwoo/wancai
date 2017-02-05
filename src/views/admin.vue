<template>
  <div id="admin">
    <!-- 头部导航 -->
    <header>
      <el-row>
        <logo></logo>
        <el-col :span="20">
          <el-menu default-active="2" class="el-menu-demo" mode="horizontal" @select="1-1">
            <el-submenu index="1">
              <template slot="title">我的项目</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">我的中心</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </header>

    <!-- 左侧内容区 -->
    <main>
      <div class="main-left">
        <div class="recruit-btn">
          <el-button type="primary" size="large" @click.native.prevent="" >+招聘需求申请表</el-button>
        </div>
        <el-col>
          <!-- <el-menu default-active="2"  @open="handleOpen" @close="handleClose"> -->
          <el-menu router="true">
            <el-submenu index="demandManage">
              <template slot="title"><i class="el-icon-message"></i>需求管理</template>
                <el-menu-item index="/admin/demandPending">待审核</el-menu-item>
                <el-menu-item index="/admin/demandProcessed">处理中</el-menu-item>
                <el-menu-item index="/admin/demandRefused">已驳回</el-menu-item>
                <el-menu-item index="/admin/demandFinal">处理结束</el-menu-item>
            </el-submenu>
            <el-submenu index="itemManage">
              <template slot="title"><i class="el-icon-menu"></i>全职人员管理</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="staffManage">
              <template slot="title"><i class="el-icon-setting"></i>兼职人员管理</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
                <el-menu-item index="3-3">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="temporaryStaffManage">
              <template slot="title"><i class="el-icon-setting"></i>项目管理</template>
                <el-menu-item index="4-1">选项1</el-menu-item>
                <el-menu-item index="4-2">选项2</el-menu-item>
                <el-menu-item index="4-3">选项3</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </div>
      <!-- 右侧内容区 -->
      <div class="main-right">
        <!-- <transition name="fade">
          <router-view></router-view>
        </transition> -->
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
<script>
  import logo from '../components/logo';

  export default{
    name: 'admin',
    components: {
      logo,
    },
  };
</script>
<style lang="scss" scoped>
header {
  z-index: 1000;
  .el-menu-demo {
    // padding-left: 300px!important;
  }
  .el-row {
    background: #EEF1F6;
  }
}
main {
  // display: -webkit-flex;
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 1400px;
  // background-color: #FCFCFC;
  .main-left {
    // -webkit-box-flex: 0;
    // -ms-flex: 0 0 200px;
    // flex: 0 0 200px;
    display: flex;
    flex-direction: column;

    width: 17%;
    .recruit-btn {
      .el-button {
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center;
        width: 100%;
      }
    }
    .el-col {
      width: auto;
    }
  }
  .main-right {
    display: flex;
    flex-direction: column;
    width: 83%;
    background: #FFF123;
  }
}
</style>
