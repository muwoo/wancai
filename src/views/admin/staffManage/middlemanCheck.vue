<template>
  <div id="middlemanCheck">
    <el-form :inline="true" :model="middlemanInfo" class="demo-form-inline">
      <el-form-item label='申请ID' style="width: 240px;">
        <el-input v-model="middlemanInfo.id" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='身份证号' style="width: 240px;">
        <el-input v-model="middlemanInfo.id" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='手机号' style="width: 240px;">
        <el-input v-model="middlemanInfo.phoneNumber" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='姓名' style="width: 240px;">
        <el-input v-model="middlemanInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      </el-form-item><el-form-item>
        <el-button type="primary" @click="handleSearchMiddleman">搜索经纪人</el-button>
      </el-form-item>
    </el-form>
    <h1 class="tips"></h1>
  </div>
</template>

<script>
export default {
  name: 'middlemancheck',
  data() {
    return {
      middlemanInfo: {
        id: '',
        idCard: '',
        phoneNumber: '',
        name: '',
      },
    };
  },
  methods: {
    handleSearchMiddleman() {

    },
  },
};
</script>

<style lang="scss" scoped>
  #middlemanCheck {
    .tips {
      border-bottom: 1px solid #e5e9f2;
    }
  }
</style>
