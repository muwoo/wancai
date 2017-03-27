<template>
  <div id="adminProjectManagerEdit">
    <el-form :model="projectManagerInfo" label-width="240px" :rules="projectManagerInfoRules" ref="projectManagerInfoForm">
      <el-form-item label="上传头像：" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="//upload.qiniu.com/"
          :show-file-list='false'
          :on-success="handleAvatarScucess"
          :on-remove="handleRemoveAvatar"
          :on-error="handleUploadFiled"
          :data="upload_form">
          <img v-if="projectManagerInfo.avatar" :src="projectManagerInfo.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label='姓名：' prop="name">
        <el-input v-model="projectManagerInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='手机号码：' prop="phone">
        <el-input v-model="projectManagerInfo.phone" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='身份证号码：' prop="idCard">
        <el-input v-model="projectManagerInfo.idCard" placeholder="请输入内容" style="width: 240px;" ></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-radio-group v-model="projectManagerInfo.sex">
          <el-radio :label='1'>男</el-radio>
          <el-radio :label='0'>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日：" prop="birhday" >
        <el-date-picker
          v-model="projectManagerInfo.birthday"
          type="date"
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
      <!-- <el-form-item label='密码：' prop="password">
        <el-input v-model="projectManagerInfo.password" type="password" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='确认密码：' prop="checkPass">
        <el-input v-model="projectManagerInfo.checkPass" type="password" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="handleEdit">确定修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'adminProjectManagerEdit',
    data() {
      return {
        projectManagerInfo: {
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
        },
        upload_form: {},
        publishing: false,
        bucketHost: 'olk6mtom3.bkt.clouddn.com',
        projectManagerInfoRules: {
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
          // password: [
          //   { validator: this.validatePass, trigger: 'blur' },
          // ],
          // checkPass: [
          //   { validator: this.validateCheckPass, trigger: 'blur' },
          // ],
        },
      };
    },
    methods: {
      handleAvatarScucess(response, file) {
        const key = response.key;
        // const name = file.name;
        // const img = `${this.bucketHost}/${encodeURI(key)}`;
        const img = `http://${this.bucketHost}/${key}`;
        this.projectManagerInfo.avatar = img;
      },
      handleRemoveAvatar() {
        this.projectManagerInfo.avatar = '';
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
      handleEdit() {
        this.$refs.projectManagerInfoForm.validate((valid) => {
          if (valid) {
            this.publishing = true;
            const managerId = this.$route.params.id;
            this.$http.post('manager/modify', {
              id: managerId,
              avatar: this.projectManagerInfo.avatar,
              name: this.projectManagerInfo.name,
              phone: this.projectManagerInfo.phone,
              idCard: this.projectManagerInfo.idCard,
              sex: this.projectManagerInfo.sex,
              birthday: this.timestamp,
              eMail: this.projectManagerInfo.eMail,
              qq: this.projectManagerInfo.qq,
              weChat: this.projectManagerInfo.weChat,
              telphone: this.projectManagerInfo.telphone,
              // cornet: this.projectManagerInfo.cornet,
              // password: this.projectManagerInfo.password,
            }).then((response) => {
              const { error, errorCode } = response.data;
              if (errorCode === 10000) {
                this.$notify({
                  title: '修改成功',
                  type: 'success',
                });
              } else {
                this.$notify.error({
                  title: '修改异常',
                  type: 'success',
                });
              }
              this.publishing = false;
              this.$router.replace('/admin/project_manager/list');
            }).catch((error) => {
              console.log(error);
              this.publish = false;
            });
          }
          return false;
        });
      },
      getProjectManager() {
        const id = this.$route.params.id;
        this.projectManagerInfo.id = id;
        this.loading = true;
        this.$http.get(`/manager/detail?id=${id}`).then((response) => {
          if (response.data.errorCode === 10000) {
            this.projectManagerInfo = response.data.data;
          } else {
            // 获取数据异常，跳回list界面
          }
          this.loading = false;
        }).catch((error) => {
          this.loading = false;
          this.$message.error('数据异常');
        });
      },
    },
    computed: {
      timestamp() {
        if (this.projectManagerInfo.birthday !== '') {
          return Date.parse(new Date(this.projectManagerInfo.birthday));
        }
        return '';
      },
    },
    mounted() {
      this.getProjectManager();
    },
  };
</script>
<style lang="scss" scoped>
#adminProjectManagerEdit {
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
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
}
</style>
