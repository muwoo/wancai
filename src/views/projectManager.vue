<template>
  <!-- 主面板 -->
  <el-row class="panel">
    <!-- 头部导航 -->
    <el-col :span="24" class="panel-top">
      <logo></logo>
      <el-col :span="15">
        <el-menu :default-active="currentPath" class="el-menu-demo" mode="horizontal" @select="handleSelectProject">
          <el-submenu index="/project_manager/item/dashboard">
            <template slot="title">{{ currentProject.title }}</template>
            <el-menu-item v-for="item in allProjects" :index="item.id + ''">{{item.title}}</el-menu-item>
          </el-submenu>
          <el-menu-item index="/project_manager/profile">我的中心</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4" class="welcome">
        <span> {{ currentUser.name }}，您好</span>
        <el-button type="primary" size="small" @click="logout">退 出</el-button>
      </el-col>
    </el-col>
    <!-- 左侧导航 -->
    <el-col :span="24" class="panel-center">
      <aside>
        <div class="recruit-btn">
          <el-button type="primary" size="large" @click.prevent="handleApplyDemand" >+ 招聘需求申请表</el-button>
        </div>
        <el-menu :default-active="currentPath" :unique-opened='true' class="el-menu-vertical-demo" @select="handleSelect">
          <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden && item.isProjectManager">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i>{{item.alias}}</template>
              <el-menu-item v-for="child in item.children" v-if="!child.hidden" :index="item.path + '/' + child.path">{{child.alias}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </aside>
      <!-- 主内容 -->
      <section :class="classScreenObject">
        <router-view></router-view>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import logo from '../components/logo';

export default {
  name: 'projectManager',
  data() {
    return {
      currentPath: '',
      allProjects: [],
      currentProject: { id: '', title: '请选择项目' },
      currentUser: {
        name: '',
      },
      isLeftNav: true,
    };
  },
  components: {
    logo,
  },
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      this.currentPath = to.path;
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      const queryId = this.currentProject.id;
      this.$router.replace(`${key}?id=${queryId}`);
    },
    handleApplyDemand() {
      this.$router.replace(`/project_manager/applyDemand?id=${this.currentProject.id}`);
    },
    handleSelectProject(path) {
      if (path !== '/project_manager/profile') {
        for (let i = 0; i < this.allProjects.length; i += 1) {
          if (this.allProjects[i].id.toString() === path) {
            this.currentProject = this.allProjects[i];
          }
        }
        this.$router.push(`/project_manager/item/dashboard?id=${path}`);
        this.isLeftNav = true;
      } else {
        this.$router.replace('/project_manager/profile');
        this.isLeftNav = false;
      }
      // this.$message(this.currentProject.title);
    },
    setCurrentProject() {
      const id = this.$route.query.id;
      for (let i = 0; i < this.allProjects.length; i += 1) {
        if (this.allProjects[i].id.toString() === id) {
          this.currentProject = this.allProjects[i];
        }
      }
    },
    // 退出登录
    logout() {
      const that = this;
      this.$confirm('确认退出吗?', '提示', {
      }).then(() => {
        sessionStorage.removeItem('project_manager');
        that.$router.replace('/project_manager/login');
      }).catch(() => {

      });
    },
  },
  computed: {
    classScreenObject() {
      return {
        'panel-right': this.isLeftNav,
        'panel-full-screen': !this.isLeftNav,
      };
    },
  },
  mounted() {
    this.currentPath = this.$route.path;
    if (this.currentPath === '/project_manager/profile') {
      this.isLeftNav = false;
    }
    const projectManager = JSON.parse(sessionStorage.getItem('project_manager'));
    this.currentUser.name = projectManager.data.username || '';

    this.$http.post('/project/currentList', {
      pageNum: 1,
      pageSize: 50,
    }).then((response) => {
      const {
        data: {
          list,
        },
      } = response.data;
      this.allProjects = list;
      this.setCurrentProject();
    }).catch((error) => {
      console.log(error);
    });
  },
};
</script>

<style lang="scss" scoped>
 .panel {
   position: absolute;
   top: 0px;
   bottom: 0px;
   width: 100%;
   background: #eef1f6;

   .panel-top {
     height: 60px;
     background: #EEF1F6;
     line-height: 60px;
     .welcome {
     }
   }

   .panel-center {
     position: absolute;
     top: 60px;
     bottom: 0px;
     overflow: hidden;
     background-color: #eef1f6;

     aside {
       width: 230px;
      // width: 0px;
       .recruit-btn {
         background: #FFFFFF;
          .el-button {
            margin-top: 10px;
            margin-bottom: 10px;
            text-align: center;
            width: 100%;
          }
        }
     }
     .panel-right {
       background: #FFFFFF;
      //  border:5px solid #4bb3ff;
      //  border:1px solid #20a0ff;
       position: absolute;
       right: 0px;
       top: 0px;
       bottom: 0px;
       left: 230px;
       overflow-y: scroll;
       padding: 10px;
     }
     .panel-full-screen {
       background: #FFFFFF;
      //  border:5px solid #4bb3ff;
      //  border:1px solid #20a0ff;
       position: absolute;
       right: 0px;
       top: 0px;
       bottom: 0px;
       left: 0px;
       overflow-y: scroll;
       padding: 10px;
     }
   }
 }
</style>
