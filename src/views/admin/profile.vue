<template>
  <div id="adminProfile">
    <el-row class="top">
      <el-col :span="4" class="title">个人中心</el-col>
      <el-col :span="6" :offset="1" class="title">角色：{{ currentUser.roleName }}</el-col>
      <el-col :span="8" :offset="5">
        <el-row type="flex" justify="end" style="padding-right: 20px;">
          创建时间：{{ currentUser.createdAt | formatDate }}
        </el-row>
      </el-col>
    </el-row>
    <el-row class="body">
      <el-col :span="4">
        <el-row class="image-col" type="flex" justify="space-around" align="middle">
          <img class="image"  @click.prevent="handleClickImage" :src="currentUser.avatar"/>
        </el-row>
      </el-col>
      <el-col :span="7" :offset="1" class="content-eol ">
        <el-row class="unit-row">
          {{ currentUser.username }}
          {{ currentUser.sex | formatSex }}
        </el-row>
        <el-row class="unit-row">{{ currentUser.idCard }}</el-row>
        <el-row class="unit-row">生日：{{ currentUser.birthday | formatBirthday }}</el-row>
      </el-col>
      <el-col :span="7" :offset="1" class="content-eol">
        <el-row class="unit-row">手机号码：{{ currentUser.phone }}</el-row>
        <el-row class="unit-row">邮箱：{{ currentUser.eMail }}</el-row>
        <el-row class="unit-row">QQ：{{ currentUser.qq }}</el-row>
        <el-row class="unit-row">微信号：{{ currentUser.weChat }}</el-row>
        <el-row class="unit-row">电话：{{ currentUser.telephone }}</el-row>
        <el-row class="unit-row">短号：{{ currentUser.cornet }}</el-row>
      </el-col>
      <el-col class="btn-row" :span="4">
        <el-button type="primary" size="large" @click.prevent="handleSetPassword">修改密码</el-button>
      </el-col>
    </el-row>
    <bigImage v-model="BigImageVisible" :image="currentImage" :visible="BigImageVisible" @handleWrapperClick="handleBigImageClose"></bigImage>
    <el-dialog title="修改密码" v-model="modifyPasswordVisible">
      <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm">
        <el-form-item prop="oldPassword" label="原密码" :label-width="formLabelWidth">
          <el-input v-model="passwordForm.oldPassword" auto-complete="off" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="passwordForm.newPassword" auto-complete="off" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="再次输入新密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="passwordForm.confirmPassword" auto-complete="off" style="width: 250px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyPasswordVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNewPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import bigImage from '../../components/bigImage';
  import util from '../../common/util';

  export default {
    name: 'adminProfile',
    data() {
      return {
        BigImageVisible: false,
        modifyPasswordVisible: false,
        formLabelWidth: '120px',
        currentImage: '',
        currentUser: {
          username: '',
          createdAt: '',
          avatar: '',
          sex: 1,
          idCard: '',
          birthday: '',
          phone: '',
          eMail: '',
          qq: '',
          weChat: '',
          telephone: '',
          cornet: '',
        },
        passwordForm: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
        passwordRules: {
          oldPassword: [
            { required: true, message: '请输入原密码', trigger: 'blur' },
          ],
          newPassword: [
            { validator: this.validatePass, trigger: 'blur' },
          ],
          confirmPassword: [
            { validator: this.validateCheckPass, trigger: 'blur' },
          ],
        },
      };
    },
    components: {
      bigImage,
    },
    methods: {
      validatePass(rule, value, callback) {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.passwordForm.confirmPassword !== '') {
            this.$refs.passwordForm.validateField('confirmPassword');
          }
          callback();
        }
      },
      validateCheckPass(rule, value, callback) {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致！'));
        } else {
          callback();
        }
      },
      handleClickImage(evt) {
        this.currentImage = evt.target.src;
        this.BigImageVisible = true;
      },
      handleSetPassword() {
        this.modifyPasswordVisible = true;
      },
      handleBigImageClose() {
        this.BigImageVisible = false;
      },
      submitNewPassword() {
        this.$refs.passwordForm.validate((valid) => {
          if (valid) {
            this.modifyPasswordVisible = false;
            const params = {
              password: this.passwordForm.oldPassword,
              newPassword: this.passwordForm.newPassword,
            };
            this.$http.post('/user/updatePassword', params).then((res) => {
              if (res.data.errorCode === 10000) {
                this.$notify({
                  title: '修改成功',
                  type: 'success',
                });
                sessionStorage.removeItem('admin');
                this.$router.replace('/admin/login');
              } else {
                this.$notify.error({
                  title: `${res.data.moreInfo}`,
                  type: 'success',
                });
              }
            });
          }
          return false;
        });
      },
      logout() {
        const that = this;
        this.$confirm('确认退出吗?', '提示', {

        }).then(() => {
          sessionStorage.removeItem('admin');
          that.$router.replace('/admin/login');
        }).catch(() => {

        });
      },
    },
    filters: {
      formatDate(time) {
        const date = new Date(parseInt(time, 0));
        return util.formatDate.formatUtc(date, 'yyyy-MM-dd hh:mm');
      },
      formatSex(sex) {
        return sex === 1 ? '男' : '女';
      },
      formatBirthday(time) {
        if (time === undefined) {
          return '无';
        }
        const date = new Date(parseInt(time, 0));
        return util.formatDate.format(date, 'yyyy-MM-dd');
      },
    },
    mounted() {
      const admin = JSON.parse(sessionStorage.getItem('admin'));
      this.$http.get(`admin/user/detail?id=${admin.id}`).then((res) => {
        if (res.data.errorCode === 10000) {
          this.currentUser = res.data.data;
        } else {
          this.$notify.error({
            title: '获取个人信息异常',
            type: 'success',
          });
        }
      });
    },
  };
</script>

<style lang="scss" scoped>
#adminProfile {
  width: 100%;
  height: 190px;
  // margin-left: 10px;
  // margin-right: 10px;
  // padding-right: 10px;
  background-color: #FFFFFF;
  .top {
    height: 40px;
    background-color: #eff2f7;
    border:1px solid #FFFFFF;
    .title {
      padding-left: 10px;
      color: #9b9b9b;
      font-size: 18px;
    }
    .el-col {
      height: 100%;
      line-height: 40px;
      font-size: 14px;
    }
    .el-checkbox {
      width: 100%;
      height: 100%;
      padding-left: 10px;
    }
  }
  .body {
    height: 150px;
   //  background-color: pink;
    .el-col {
      height: 100%;
      font-size: 14px;
     //  line-height: 40px;
    }
    .image-col {
      height: 100%;
      width: 100%;
     //  padding-top: 10px;
      .image {
        width: 40%;
        height: 50px;
      }
    }
    .unit-row {
      height: 15px;
      line-height: 15px;
      margin-top: 5px;
      width: auto;
    }
    .content-eol {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
    }
    .btn-row {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      > button + button {
        margin-top: 10px;
      }
    }
    .big-img {
      width: 500px;
      height: 300px;
    }
  }
}
</style>
