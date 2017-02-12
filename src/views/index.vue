<template>
  <div id="wancai-index">
    <h1>This is Index Page</h1>
    <div>
      <router-link :to="{ name: 'projectManagerLogin' }">ProjectManager_Login</router-link>
    </div>
    <div>
      <router-link :to="{ name: 'adminLogin' }">Admin_Login</router-link>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'index',
  };
</script>
