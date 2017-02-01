<template>
  <div id="admin">
    <!-- 头部导航 -->
    <div class="header">
      <el-row>
          <el-col :span="24">
            <el-menu default-active="5" class="el-menu-demo" mode="horizontal" @select="">
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
    </div>
    <div class="mainLeft">
      <div class="recruit-btn">
        <el-button type="primary" size="large" @click.native.prevent="" >+招聘需求申请表</el-button>
      </div>
      <el-col>
        <!-- <el-menu default-active="2"  @open="handleOpen" @close="handleClose"> -->
        <el-menu default-active="2">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>需求管理</template>
              <el-menu-item index="1-1">待审核</el-menu-item>
              <el-menu-item index="1-2">处理中</el-menu-item>
              <el-menu-item index="1-3">已驳回</el-menu-item>
              <el-menu-item index="1-4">处理结束</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>全职人员管理</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>兼职人员管理</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
              <el-menu-item index="3-3">选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>项目管理</template>
              <el-menu-item index="4-1">选项1</el-menu-item>
              <el-menu-item index="4-2">选项2</el-menu-item>
              <el-menu-item index="4-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'Admin',
  };
</script>
<style lang="scss" scoped>
.header {
  z-index: 1000;
  .el-menu-demo {
    padding-left: 300px!important;
  }
}
.mainLeft {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 200px;
  flex: 0 0 200px;

  .recruit-btn {
    .el-button {
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: center;
      width: 17%;
    }
  }
  .el-col {
    width: 17%;
  }
}
</style>
