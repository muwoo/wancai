<template>
  <div id="wancai-index">
    <h1>This is Index Page</h1>
    <router-link :to="{ name: 'projectManageLogin' }">Login</router-link>
  </div>
</template>
<script>
  export default{
    name: 'index',
  };
</script>
