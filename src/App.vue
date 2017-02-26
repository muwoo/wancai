<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import Element from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-default/index.css';

Vue.use(Element);
const axiosInstance = axios.create({
  baseURL: 'http://localhost:9090',
  // baseURL: 'http://120.77.253.107:8089',
  // headers: {
  //   'X-CSRF-TOKEN': '2d81ad05-4d06-4eb5-a8f2-8b513c9f480f',
  // },
});

Vue.prototype.$http = axiosInstance;

export default {
  name: 'app',
};
</script>

<style lang="scss">
// $header_grey: #EFF2F7;
#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
body {
  /*background-color: #324057;*/
  margin: 0px;
  padding: 0px;
  /*background: url(assets/bg1.jpg) center !important;
  background-size: cover;*/
  // background: #1F2D3D;
  // font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  /*font-weight: 400;*/
  // font-size:14px;
  -webkit-font-smoothing: antialiased;
}
</style>
