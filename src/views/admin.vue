<template>
  <!-- 主面板 -->
  <el-row class="panel">
    <!-- 头部导航 -->
    <el-col :span="24" class="panel-top">
      <el-col :span="5" class="logo">
        <span>万才网管理后台</span>
      </el-col>
      <el-col :span="4" :offset="15" class="welcome">
        <span>欢迎~ {{ currentUser.name }}</span>
        <el-button type="primary" size="small" @click="logout">退 出</el-button>
      </el-col>
    </el-col>
    <!-- 左侧导航 -->
    <el-col :span="24" class="panel-center">
      <aside>
        <el-menu :default-active="currentPath" :unique-opened='true' theme="dark" router>
          <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden && item.isAdmin">
            <el-menu-item v-if="!item.hidden && item.isSingleMenu":index="item.path"><i :class="item.iconCls"></i>{{item.alias}}</el-menu-item>
            <el-submenu :index="index+''" v-if="!item.leaf && !item.isSingleMenu">
              <template slot="title"><i :class="item.iconCls"></i>{{item.alias}}</template>
              <el-menu-item v-for="child in item.children" v-if="!child.hidden":index="item.path + '/' + child.path">{{child.alias}}</el-menu-item>
            </el-submenu>
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

export default {
  name: 'project',
  data() {
    return {
      currentPath: '',
      currentUser: {
        name: '',
      },
    };
  },
  components: {
  },
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      this.currentPath = to.path;
      console.log(this.currentPath);
      // console.log(this.currentPath);
      // console.log(this.$route.query);
    },

  },
  methods: {
    // 退出登录
    logout() {
      const that = this;
      this.$confirm('确认退出吗?', '提示', {

      }).then(() => {
        sessionStorage.removeItem('admin');
        that.$router.replace('/admin/login');
      }).catch(() => {

      });
    },
  },
  mounted() {
    this.currentPath = this.$route.path;
    const admin = JSON.parse(sessionStorage.getItem('admin'));
    if (admin) {
      this.currentUser.name = admin.name || '';
    } else {
      this.$router.replace('/admin/login');
    }
  },
};
</script>

<style lang="scss" scoped>
 .panel {
   position: absolute;
   top: 0px;
   bottom: 0px;
   width: 100%;
   background:#324057;

   .panel-top {
     height: 60px;
     background: #324057;
     line-height: 60px;
    //  text-align: center;
     .logo {
       height: 60px;
      //  width: 230px;
       > span {
         font-size: 24px;
         color: #FFFFFF;
         padding-left: 31px;
       }
     }
     .welcome {
      //  padding-left: 30px;
       > span {
         color: #FFFFFF;
       }
     }
   }

   .panel-center {
     position: absolute;
     top: 60px;
     bottom: 0px;
     overflow: hidden;
    //  background-color: pink;

     aside {
       width: 230px;
       height: 1000px;
      //  overflow-y: scroll;
     }
     .panel-right {
       background: #ECEEF3;
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
   }
 }
</style>
