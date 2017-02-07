<template>
  <!-- 主面板 -->
  <el-row class="panel">
    <!-- 头部导航 -->
    <el-col :span="24" class="panel-top">
      <logo></logo>
      <el-col :span="20">
        <el-menu :default-active="currentPath" class="el-menu-demo" mode="horizontal" @select="handleSelectProject">
          <el-submenu :index="currentPath">
            <template slot="title">{{ currentProject.name }}</template>
            <el-menu-item v-for="item in allProjects" :index="item.id + ''">{{item.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item index="/project_manage/profile">我的中心</el-menu-item>
        </el-menu>
      </el-col>
    </el-col>
    <!-- 左侧导航 -->
    <el-col :span="24" class="panel-center">
      <aside>
        <div class="recruit-btn">
          <el-button type="primary" size="large" @click.prevent="handleApplyDemand" >+招聘需求申请表</el-button>
        </div>
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
  data() {
    return {
      currentPath: '/profile',
      allProjects: [
        { id: 1, name: '萧山仓库' },
        { id: 2, name: '余杭仓库' },
        { id: 3, name: '下沙仓库' },
      ],
      currentProject: { id: '', name: '空项目' },
    };
  },
  components: {
    logo,
  },
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      this.currentPath = to.path;
      // this.$message(this.currentPath);
      // console.log(this.currentPath);
      // console.log(this.$route.query);
    },
  },
  methods: {
    // handleSelect: function(a, b) {
    //
    // },
    initialCurrentProject() {
      if (this.allProjects.length > 0) {
        this.currentProject = this.allProjects[0];
      } else {
        this.currentProject = { id: '', name: '无项目' };
      }
    },
    handleSelect() {
      // console.log(this.$router.options.routes);
    },
    handleApplyDemand() {
      this.$router.replace('/project_manage/applyDemand');
    },
    handleSelectProject(id) {
      if (id !== '/project_manage/profile') {
        for (let i = 0; i < this.allProjects.length; i += 1) {
          if (this.allProjects[i].id.toString() === id) {
            this.currentProject = this.allProjects[i];
          }
        }
      }
      // console.log('Hello World');
      this.$message(this.currentProject.name);
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
    this.initialCurrentProject();
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
       .recruit-btn {
          .el-button {
            margin-top: 10px;
            margin-bottom: 10px;
            text-align: center;
            width: 100%;
          }
        }
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
