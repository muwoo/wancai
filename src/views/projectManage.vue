<template>
  <!-- 主面板 -->
  <el-row class="panel">
    <!-- 头部导航 -->
    <el-col :span="24" class="panel-top">
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
    </el-col>
    <!-- 左侧导航 -->
    <el-col :span="24" class="panel-center">
      <aside>
        <el-menu :default-active="currentPath" class="el-menu-vertical-demo" @select="handleSelect" router>
          <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i>{{item.alias}}</template>
              <el-menu-item v-for="child in item.children" v-if="!child.hidden":index="item.path + '/' + child.path">{{child.alias}}</el-menu-item>
            </el-submenu>
            <!-- <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item> -->
          </template>
        </el-menu>
      </aside>
      <!-- 主内容 -->
      <section class="panel-right">
        <router-view></router-view>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import logo from '../components/logo';

export default {
  name: 'project',
  components: {
    logo,
  },
  watch: {
    // '$route'(to, from) {
    //   this.currentPath = to.path;
    // },
  },
  methods: {
    // handleSelect: function(a, b) {
    //
    // },
    handleSelect() {
      console.log(this.$router.options.routes);
    },
    // 退出登录
    logout() {
      const that = this;
      this.$confirm('确认退出吗?', '提示', {

      }).then(() => {
        // sessionStorage.removeItem('projectManager');
        that.$router.replace('/project_manage/login');
      }).catch(() => {

      });
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
 .panel {
   position: absolute;
   top: 0px;
   bottom: 0px;
   width: 100%;

   .panel-top {
     height: 60px;
     background: #EEF1F6;
   }

   .panel-center {
     position: absolute;
     top: 60px;
     bottom: 0px;
     overflow: hidden;
    //  background-color: pink;

     aside {
       width: 230px;
     }
     .panel-right {
       background: #d1a2d6;
       position: absolute;
       right: 0px;
       top: 0px;
       bottom: 0px;
       left: 230px;
       overflow-y: scroll;
       padding: 20px;
     }
   }
 }
</style>
