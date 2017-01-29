<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import Element from 'element-ui';
import VueResource from 'vue-resource';
import 'element-ui/lib/theme-default/index.css';

Vue.use(Element);
Vue.use(VueResource);

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
