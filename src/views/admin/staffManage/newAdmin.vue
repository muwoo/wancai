<template>
  <div id="newAdmin">
    <el-form :model="adminInfo" label-width="240px" :rules="adminInfoRules" ref="adminInfoForm">
      <el-form-item label='选择角色：' prop="role">
        <el-select v-model="adminInfo.role" placeholder="请选择">
          <el-option
            v-for="item in roles"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
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
        <el-input v-model="adminInfo.phoneNumber" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='姓名：' prop="name">
        <el-input v-model="adminInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='身份证号码：' prop="idCardNumber">
        <el-input v-model="adminInfo.idCardNumber" placeholder="请输入内容" style="width: 240px;" ></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-radio-group v-model="adminInfo.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日：">
        <el-date-picker
          v-model="adminInfo.birh"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label='邮箱：' prop="mail">
        <el-input v-model="adminInfo.mail" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='QQ：' prop="qq">
        <el-input v-model="adminInfo.qq" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='微信号：' prop="qq">
        <el-input v-model="adminInfo.weChatNumber" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='固定电话：' prop="qq">
        <el-input v-model="adminInfo.telephone" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='虚拟短号：' prop="qq">
        <el-input v-model="adminInfo.shordPhoneNubmer" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='密码：' prop="qq">
        <el-input v-model="adminInfo.password" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label='确认密码：' prop="qq">
        <el-input v-model="adminInfo.confirmPass" placeholder="请输入内容" style="width: 240px;"></el-input>
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
  name: 'newAdmin',
  data() {
    return {
      adminInfo: {
        role: '',
        avatar: '',
        phoneNumber: '',
        idCardNumber: '',
        mail: '',
        qq: '',
        birth: '',
      },
      adminInfoRules: {

      },
      roles: [{
        value: 0,
        label: '一类管理员',
      },
      {
        value: 1,
        label: '二类管理员',
      }],
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
