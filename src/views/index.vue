<template>
  <div id="wancai-index">
    <h1>This is Index Page</h1>
    <router-link :to="{ name: 'login' }">Login</router-link>
  </div>
</template>
<script>
  export default{
    name: 'Index',
  };
</script>
