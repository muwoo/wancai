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
  baseURL: 'http://120.77.253.107:9090',
  // headers: {
  //   'Access-Control-Allow-Origin': 'http://localhost:8080',
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
</style>
