<template>
  <div id="newProjectManager">
    <el-form :model="projectManagerInfo" label-width="240px" :rules="projectManagerInfoRules" ref="projectManagerInfoForm">
      <el-form-item label="上传头像：" prop="avatar">
        <!-- <el-upload
          action="//jsonplaceholder.typicode.com/posts/"
          type="drag"
          multiple='false'
          :thumbnail-mode="true"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :default-file-list="fileList"
        >
          <i class="el-icon-upload"></i>
          <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> -->
      </el-form-item>
      <el-form-item label='手机号码：' prop="phoneNumber">
        <el-input v-model="projectManagerInfo.phoneNumber" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='姓名：' prop="name">
        <el-input v-model="projectManagerInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='身份证号码：' prop="idCardNumber">
        <el-input v-model="projectManagerInfo.idCardNumber" placeholder="请输入内容" style="width: 240px;" ></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-radio-group v-model="projectManagerInfo.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日：" >
        <el-date-picker
          v-model="projectManagerInfo.birh"
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
      <el-form-item label='微信号：' prop="qq">
        <el-input v-model="projectManagerInfo.weChatNumber" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='固定电话：' prop="qq">
        <el-input v-model="projectManagerInfo.telephone" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='虚拟短号：' prop="qq">
        <el-input v-model="projectManagerInfo.shordPhoneNubmer" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='密码：' prop="qq">
        <el-input v-model="projectManagerInfo.password" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='确认密码：' prop="qq">
        <el-input v-model="projectManagerInfo.confirmPass" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确定</el-button>
        <el-button type="primary">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'newProjectManager',
  data() {
    return {
      projectManagerInfo: {
        avatar: '',
        phoneNumber: '',
        idCardNumber: '',
        mail: '',
        qq: '',
        birth: '',
      },
      projectManagerInfoRules: {

      },
    };
  },
  methods: {
    handlePreview() {

    },
    handleRemove() {

    },
  },
};
</script>

<style lang="scss" scoped>
</style>
