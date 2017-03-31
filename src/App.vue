<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import Element from 'element-ui';
import AMap from 'vue-amap';
import 'element-ui/lib/theme-default/index.css';
import router from './router';

Vue.use(AMap);
AMap.initAMapApiLoader({
  key: '6bcd28bf614c37b23cbe45d3a74096ba',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
});
Vue.use(Element);

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
