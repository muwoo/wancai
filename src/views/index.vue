<template>
  <div id="wancai-index">
    <h1>This is Index Page</h1>
    <div>
      <router-link :to="{ name: 'projectManagerLogin' }">项目经理登录</router-link>
    </div>
    <div>
      <router-link :to="{ name: 'adminLogin' }">管理员登录</router-link>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'index',
  };
</script>
