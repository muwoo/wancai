<template>
  <el-row class="panel">
    <el-col :span="24" class="panel-top">
      <logo></logo>
    </el-col>
    <el-col :span="14"  class="panel-ads">
    </el-col>
    <el-col :span="10"  class="panel-login" >
      <el-form :label-position='labelPosition' :model="verifyForm" :rules="verifyFormRules" ref="verifyForm" label-width="100px">
        <h3 class="loginTitle"></h3>
        <el-form-item label="身份证号：" prop="idCard">
          <el-input type="text" v-model="verifyForm.idCard" auto-complete="off" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="verifyForm.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="password">
          <el-input type="password" v-model="verifyForm.password" auto-complete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="再次输入：" prop="checkPass">
          <el-input type="password" v-model="verifyForm.checkPass" auto-complete="off" placeholder="请再次输入"></el-input>
        </el-form-item>
        <el-button type="success" @click.native.prevent="handleModify" :loading="confirming">提 交</el-button>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import logo from '../../components/logo';

export default {
  name: 'managerPasswordFind',
  components: {
    logo,
  },
  data() {
    return {
      confirming: false,
      labelPosition: 'left',
      verifyForm: {
        idCard: '',
        phone: '',
        password: '',
        checkPass: '',
      },
      verifyFormRules: {
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        password: [
          { validator: this.validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { validator: this.validateCheckPass, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleModify() {
      this.$refs.verifyForm.validate((valid) => {
        if (valid) {
          this.confirming = true;
          const params = {
            idCard: this.verifyForm.idCard,
            phone: this.verifyForm.phone,
            newPassword: this.verifyForm.password,
          };
          this.$http.post(`${this.$managerURL}/user/forgetPassword`, params).then((res) => {
            if (res.data.errorCode === 10000) {
              this.$message('修改通过');
              this.confirming = false;
              this.$router.replace({ name: 'projectManagerLogin' });
            } else {
              this.$message.error(res.data.moreInfo);
              this.confirming = false;
            }
          });
        }
        return false;
      });
    },
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.verifyForm.checkPass !== '') {
          this.$refs.verifyForm.validateField('checkPass');
        }
        callback();
      }
    },
    validateCheckPass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.verifyForm.password) {
        callback(new Error('两次输入密码不一致！'));
      } else {
        callback();
      }
    },
  },
};
</script>
<style lang='scss' scoped>
  .panel {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .panel-top {
      height: 60px;
      background: #EEF1F6;
    }
    .panel-ads {
      position: absolute;
      // background: #d1a2d6;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
    }
    .panel-login {
      // background: #d1a2d6;
      position: absolute;
      right: 0px;
      top: 60px;
      bottom: 0px;
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
        .passwordFind {
          text-align: right;
          // margin-top: 10px;
          margin-bottom: 10px;
          > a {
            text-decoration: none;
            color: #49a3e5;
          }
        }
      }
    }
  }
</style>
