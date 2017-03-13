<template>
  <div id="projectManagerNew">
    <el-form :model="projectManagerInfo" label-width="240px" :rules="projectManagerInfoRules" ref="projectManagerInfoForm">
      <!--<el-form-item label="上传头像：" prop="avatar">-->
        <!--<el-upload-->
          <!--class="avatar-uploader"-->
          <!--action="//up.qbox.me/"-->
          <!--:show-file-list='false'-->
          <!--:on-success="handleAvatarScucess"-->
          <!--:before-upload="beforeAvatarUpload"-->
          <!--:data="upload_form">-->
          <!--<img v-if="projectManagerInfo.imageUrl" :src="projectManagerInfo.imageUrl" class="avatar">-->
          <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <!--</el-upload>-->
      <!--</el-form-item>-->
      <el-form-item label='姓名：' prop="name">
        <el-input v-model="projectManagerInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='手机号码：' prop="phone">
        <el-input v-model="projectManagerInfo.phone" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='身份证号码：' prop="idCard">
        <el-input v-model="projectManagerInfo.idCard" placeholder="请输入内容" style="width: 240px;" ></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio-group v-model="projectManagerInfo.sex">
          <el-radio :label='1'>男</el-radio>
          <el-radio :label='0'>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日：" prop="birhday" >
        <el-date-picker
          v-model="projectManagerInfo.birthday"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label='邮箱：' prop="eMail">
        <el-input v-model="projectManagerInfo.eMail" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='QQ：' prop="qq">
        <el-input v-model="projectManagerInfo.qq" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='微信号：' prop="weChat">
        <el-input v-model="projectManagerInfo.weChat" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='固定电话：' prop="telphone">
        <el-input v-model="projectManagerInfo.telphone" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='虚拟短号：' prop="cornet">
        <el-input v-model="projectManagerInfo.cornet" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='密码：' prop="password">
        <el-input v-model="projectManagerInfo.password" type="password" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='确认密码：' prop="confirmPass">
        <el-input v-model="projectManagerInfo.confirmPass" type="password" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">确定新建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'projectManagerNew',
  data() {
    return {
      projectManagerInfo: {
        sex: 1,
        imageUrl: '',
        phoneNumber: '',
        idCardNumber: '',
        mail: '',
        qq: '',
        birthday: '',
      },
      projectManagerInfoRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        idCard: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        birthday: [
          { required: true, message: '请选择出生年月', trigger: 'blur' },
        ],
        eMail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        weChat: [
          { required: true, message: '请输入微信号', trigger: 'blur' },
        ],
        qq: [
          { required: true, message: '请输入QQ号', trigger: 'blur' },
        ],
        telphone: [
          { required: true, message: '请输入固定电话', trigger: 'blur' },
        ],
        cornet: [
          { required: true, message: '请输入虚拟短号', trigger: 'blur' },
        ],
        password: [
          { validator: this.validatePass, trigger: 'blur' },
        ],
        confirmPass: [
          { validator: this.validateCheckPass, trigger: 'blur' },
        ],
      },
      upload_form: {},
      publishing: false,
    };
  },
  methods: {
//    handleAvatarScucess(response, file) {
//    },
//    beforeAvatarUpload(file) {
//    },
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.projectManagerInfo.checkPass !== '') {
          this.$refs.projectManagerInfoForm.validateField('checkPass');
        }
        callback();
      }
    },
    validateCheckPass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.projectManagerInfo.password) {
        callback(new Error('两次输入密码不一致！'));
      } else {
        callback();
      }
    },
    handleSubmit() {
      this.$refs.projectManagerInfoForm.validate((valid) => {
        if (valid) {
          this.publishing = true;
          this.$http.post('/manager/add', {
            name: '',
            phone: '',
            idCard: '',
            sex: '',
            birthday: '',
            eMail: '',
            qq: '',
            weChat: '',
            telephone: '',
            cornet: '',
            password: '',
          }).then((response) => {
            console.log(response);
            this.publishing = false;
          }).catch((error) => {
            console.log(error);
            this.publish = false;
          });
        }
        return false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#projectManagerNew {
  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
  }
  .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
