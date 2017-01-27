<template>
  <div>
    <el-row class="bg-grey">
      <el-col :span="4" class="logo">
        <div class="title-content"><span class="logo-title">万才网</span></div>
        <div class="name-content"><span>项目管理控制台</span></div>
      </el-col>
    </el-row>
    <el-form>
      <h3 class="login-title">登录</h3>
      <el-form-item prop="account">
        <el-input type="text" auto-complete="off" placeholder="请输入注册手机号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'Login',
  };
</script>
<style scoped>
  .el-row {
    height: 90px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    height: 100%;
  }
  .bg-grey {
    background: #EFF2F7;
  }
  .logo {
    padding-left: 2%;
    /*background: #99a9bf;*/
  }
  .title-content {
    margin-top: 10%;
    width: 100%;
    height: 40%;
    line-height: 36px;
  }
  .name-content {
    width: 100%;
    height: 25%;
  }
  .logo-title {
    font-size: 26px;
    margin-bottom: 0;
  }
  .login-title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #a7b8ca
  }
  .el-form {
    width: 300px;
    /*padding: 35px 35px 150px 35px;*/
    margin-left: 200px;
  }
</style>
