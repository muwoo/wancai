<template>
  <!-- 主面板 -->
  <el-row class="panel">
    <!-- 头部导航 -->
    <el-col :span="24" class="panel-top">
      <el-col :span="5" class="logo">
        <span>万才网管理后台</span>
      </el-col>
      <el-col :span="12">
        <el-menu :default-active="currentPath" class="el-menu-demo" mode="horizontal" theme="dark" router>
          <template v-for="(item, index) in $router.options.routes" v-if="item.isAdmin && !item.leaf">
            <el-menu-item v-for="child in item.children" v-if="!child.hidden && child.isHeader" :index="item.path + '/' + child.path" >{{child.alias}}</el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col :span="7" class="welcome">
        <span>周潇，你好~</span>
        <el-button type="primary" size="small" @click="logout">退 出</el-button>
      </el-col>
    </el-col>
    <!-- 左侧导航 -->
    <el-col :span="24" class="panel-center">
      <aside>
        <el-menu :default-active="currentPath" :unique-opened='true' theme="dark" router>
          <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden && item.isAdmin">
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
    };
  },
  components: {
    logo,
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
        // sessionStorage.removeItem('projectManager');
        that.$router.replace('/admin/login');
      }).catch(() => {

      });
    },
  },
  mounted() {
    // this.initialCurrentProject();
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
     background:#324057;
     line-height: 60px;
     text-align: center;
     .logo {
       height: 60px;
       width: 230px;
       > span {
         font-size: 24px;
         color: #FFFFFF;
       }
     }
     .welcome {
       padding-left: 30px;
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
