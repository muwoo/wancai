<template>
  <div class="login">
    <el-row>
      <logo></logo>
    </el-row>
    <div class="body">
      <div class="ads"></div>
      <div class="loginField">
        <el-form :model="loginForm" :rules="loginRules">
          <h3 class="loginTitle">登录</h3>
          <el-form-item prop="account">
            <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="请输入注册手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div class="passwordFind">
            <router-link :to="{ name: 'password_find'}" >忘记密码</router-link>
          </div>
          <el-button type="success" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
        </el-form>
      </div>
    </div>

  </div>
</template>
<script>
  import logo from '../components/logo';

  export default {
    name: 'login',
    components: {
      logo,
    },
    data() {
      return {
        logining: false,
        loginForm: {
          account: '',
          password: '',
        },
        loginRules: {
          account: [
            { required: true, message: '请输入注册手机号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      handleSubmit() {
        // this.$http.post('http://localhost:3000/login').then((response) => {
        //   // success callback
        //
        //   console.log(response.status);
        //   // alert("登录成功");
        // }, (response) => {
        //   // error callback
        //   console.log(response.status);
        //   // alert("登录失败");
        // });

        // console.log(this.loginForm.account);
        // console.log(this.loginForm.password);
      },
    },
  };
</script>
<style lang='scss' scoped>
  $grey: #EFF2F7;
  .login {
    display: flex;
    flex-direction: column;
    // align-items: center;

    .el-row {
      height: rem-calc(90);
      background: $grey;

      .el-col {
        height: 100%;
      }

      .logo {
        padding-left: 2%;
        /*background: #99a9bf;*/
        > div:first-child {
            margin-top: rem-calc(20);
            width: 100%;
            height: rem-calc(40);
            line-height: 36px;

            > span {
              font-size: 26px;
              margin-bottom: 0;
            }
        }
        > div:last-child {
          width: 100%;
          height: 25%;
        }
      }
    }
    .body {
      // margin-top: rem-calc(50);
      // background: $red;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      height: 600px;

      .ads {
        width: 60%;
        background: #99a9bf;
      }
      .loginField {
        width: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
        // background: #00BFFF;
        .el-form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top: 150px;
          width: 50%;

          .loginTitle {
            margin: 0 auto 20px auto;
            text-align: center;
            color: #a7b8ca
          }

          > div:nth-child(3) {
            margin-bottom: 10px;
          }
          .passwordFind {
            text-align: right;
            > a {
              text-decoration: none;
              color: #49a3e5;
            }
          }
        }
      }
      .el-button {
        margin-top: 20px;
      }
    }
  }
</style>
