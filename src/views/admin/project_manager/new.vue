<template>
  <div id="projectManagerNew">
    <el-form :model="projectManagerInfo" label-width="240px" :rules="projectManagerInfoRules" ref="projectManagerInfoForm">
      <!-- <el-form-item label="上传头像：" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="//up.qbox.me/"
          :show-file-list='false'
          :on-success="handleAvatarScucess"
          :before-upload="beforeAvatarUpload"
          :data="upload_form">
          <img v-if="projectManagerInfo.imageUrl" :src="projectManagerInfo.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item> -->
      <el-form-item label='手机号码：' prop="phoneNumber">
        <el-input v-model="projectManagerInfo.phoneNumber" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='姓名：' prop="name">
        <el-input v-model="projectManagerInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='身份证号码：' prop="idCardNumber">
        <el-input v-model="projectManagerInfo.idCardNumber" placeholder="请输入内容" style="width: 240px;" ></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio-group v-model="projectManagerInfo.sex">
          <el-radio :label='1'>男</el-radio>
          <el-radio :label='0'>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日：" prop="birh" >
        <el-date-picker
          v-model="projectManagerInfo.birthday"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label='邮箱：' prop="mail">
        <el-input v-model="projectManagerInfo.mail" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='QQ：' prop="qq">
        <el-input v-model="projectManagerInfo.qq" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='微信号：' prop="weChatNumber">
        <el-input v-model="projectManagerInfo.weChatNumber" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='固定电话：' prop="telephone">
        <el-input v-model="projectManagerInfo.telephone" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='虚拟短号：' prop="shordPhoneNubmer">
        <el-input v-model="projectManagerInfo.shordPhoneNubmer" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='密码：' prop="password">
        <el-input v-model="projectManagerInfo.password" type="password" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='确认密码：' prop="confirmPass">
        <el-input v-model="projectManagerInfo.confirmPass" type="password" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确 定</el-button>
        <el-button type="primary">修 改</el-button>
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
        sex: '1',
        imageUrl: '',
        phoneNumber: '',
        idCardNumber: '',
        mail: '',
        qq: '',
        birthday: '',
      },
      projectManagerInfoRules: {

      },
      upload_form: {},
    };
  },
  methods: {
    // handleAvatarScucess(response, file) {
    //   let key = response.key
    //   let name = file.name
    //   let prefix = this.supportWebp ? 'webp/' : ''
    //   let img = `![${name}](${this.bucketHost}/${prefix}${encodeURI(key)})`
    //
    //   this.projectManagerInfo.imageUrl = img;
    // },
    // beforeAvatarUpload(file) {
    //   const name = file.name;
    //   this.upload_form = {
    //     key: name,
    //     token: ,
    //   };
    // },
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
