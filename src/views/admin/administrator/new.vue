<template>
  <div id="administratorNew">
    <el-form :model="administratorInfo" label-width="240px" :rules="administratorInfoRules" ref="administratorInfoForm">
      <el-form-item label='选择角色：' prop="role">
        <el-select v-model="administratorInfo.role" placeholder="请选择">
          <el-option
            v-for="item in roles"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传头像：" prop="avatar">
        <el-upload
          class="avatar-uploader/"
          action="//upload.qiniu.com/"
          :show-file-list='false'
          :on-success="handleAvatarScucess"
          :on-remove="handleRemoveAvatar"
          :on-error="handleUploadFiled"
          :data="upload_form">
          <img v-if="administratorInfo.avatar" :src="administratorInfo.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label='姓名：' prop="name">
        <el-input v-model="administratorInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='手机号码：' prop="phone">
        <el-input v-model="administratorInfo.phone" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='身份证号码：' prop="idCard">
        <el-input v-model="administratorInfo.idCard" placeholder="请输入内容" style="width: 240px;" ></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-radio-group v-model="administratorInfo.sex">
          <el-radio :label='1'>男</el-radio>
          <el-radio :label='0'>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日：" prop="birthday" >
        <el-date-picker
          v-model="administratorInfo.birthday"
          type="date"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label='邮箱：' prop="eMail">
        <el-input v-model="administratorInfo.eMail" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='QQ：' prop="qq">
        <el-input v-model="administratorInfo.qq" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='微信号：' prop="weChat">
        <el-input v-model="administratorInfo.weChat" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='固定电话：' prop="telphone">
        <el-input v-model="administratorInfo.telphone" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='虚拟短号：' prop="cornet">
        <el-input v-model="administratorInfo.cornet" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='密码：' prop="password">
        <el-input v-model="administratorInfo.password" type="password" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='确认密码：' prop="checkPass">
        <el-input v-model="administratorInfo.checkPass" type="password" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">确定新建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'administratorNew',
  data() {
    return {
      administratorInfo: {
        sex: 1,
        avatar: '',
        phone: '',
        idCard: '',
        eMail: '',
        qq: '',
        weChat: '',
        telphone: '',
        cornet: '',
        birthday: '',
        password: '',
        role: 1,
      },
      roles: [],
      upload_form: {},
      publishing: false,
      bucketHost: 'olk6mtom3.bkt.clouddn.com',
      administratorInfoRules: {
        // role: [
        //   { required: true, message: '请选择角色', trigger: 'blur' },
        // ],
        avatar: [
          { required: true, message: '请上传头像', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        idCard: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
          { max: 18, message: '身份证最多18位', trigger: 'blur' },
        ],
//        sex: [
//          { required: true, message: '请选择性别', trigger: 'blur' },
//        ],
        // birthday: [
        //   { required: true, message: '请选择出生年月', trigger: 'blur' },
        // ],
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
        checkPass: [
          { validator: this.validateCheckPass, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleAvatarScucess(response, file) {
      const key = response.key;
      const img = `http://${this.bucketHost}/${key}`;
      this.administratorInfo.avatar = img;
    },
    handleRemoveAvatar() {
      this.administratorInfo.avatar = '';
    },
    handleUploadFiled() {
      this.$notify.error({
        title: '上传出错',
        message: '请重新上传',
      });
    },
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.administratorInfo.checkPass !== '') {
          this.$refs.administratorInfoForm.validateField('checkPass');
        }
        callback();
      }
    },
    validateCheckPass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.administratorInfo.password) {
        callback(new Error('两次输入密码不一致！'));
      } else {
        callback();
      }
    },
    cookRoles(allRoles) {
      for (let i = 0; i < allRoles.length; i += 1) {
        const tmp = allRoles[i];
        this.roles.push({ value: tmp.id, label: tmp.roleName });
      }
    },
    handleSubmit() {
      this.$refs.administratorInfoForm.validate((valid) => {
        if (valid) {
          this.publishing = true;
          this.$http.post('/admin/add', {
            rolesId: this.administratorInfo.role,
            avatar: this.administratorInfo.avatar,
            name: this.administratorInfo.name,
            phone: this.administratorInfo.phone,
            idCard: this.administratorInfo.idCard,
            sex: this.administratorInfo.sex,
            birthday: this.timestamp,
            eMail: this.administratorInfo.eMail,
            qq: this.administratorInfo.qq,
            weChat: this.administratorInfo.weChat,
            telphone: this.administratorInfo.telphone,
            cornet: this.administratorInfo.cornet,
            password: this.administratorInfo.password,
            status: 1,
          }).then((response) => {
            const { error, errorCode } = response.data;
            if (errorCode === 10000) {
              this.$notify({
                title: '新建成功',
                type: 'success',
              });
              this.$router.push('list');
            } else {
              this.$notify.error({
                title: '新建失败',
                type: 'success',
              });
            }
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
  computed: {
    timestamp() {
      if (this.administratorInfo.birthday !== '') {
        return Date.parse(new Date(this.administratorInfo.birthday));
      }
      return '';
    },
  },
  mounted() {
    this.$http.get('/qiniu/token').then((response) => {
      const {
        data: {
          fileName, upToken,
        },
      } = response.data;
      this.upload_form = {
        key: fileName,
        token: upToken,
      };
    }).catch((error) => {
    });
    this.$http.get('/admin/role/list').then((response) => {
      if (response.data.errorCode === 10000) {
        const roles = response.data.data;
        this.cookRoles(roles);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
#administratorNew {
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
