<template>
  <div id="employeeList">
    <el-form :inline="true" :model="employeeInfo" class="demo-form-inline" style="margin-top: 20px;">
      <el-form-item label='申请ID' style="width: 240px;">
        <el-input v-model="employeeInfo.id" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='身份证号' style="width: 240px;">
        <el-input v-model="employeeInfo.idCardNumber" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='手机号' style="width: 240px;">
        <el-input v-model="employeeInfo.phoneNumber" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='姓名' style="width: 240px;">
        <el-input v-model="employeeInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='性别' style="width: 240px;">
        <el-input v-model="employeeInfo.sex" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='年龄' style="width: 240px;">
        <el-input v-model="employeeInfo.age" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      </el-form-item><el-form-item>
        <el-button type="primary" @click="handleSearchEmployee">搜索名单</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="defaultActiveTabName" @tab-click="handleStatusTagClick">
      <el-tab-pane label="人才库" name="first">
        <!-- <middleMan></middleMan> -->
        人才库
      </el-tab-pane>
      <el-tab-pane label="黑名单" name="second">
        <!-- <middleMan></middleMan> -->
        黑名单
      </el-tab-pane>
    </el-tabs>
    <el-col :span="24"style="margin-top:10px;">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :total="totalEmployeeNum" style="float: right;"></el-pagination>
    </el-col>
  </div>
</template>
<script>
  export default {
    name: 'employeeList',
    data() {
      return {
        employeeInfo: {
          id: '',
          idCardNumber: '',
          phoneNumber: '',
          name: '',
          sex: '',
          age: '',
        },
        currentPage: 1,
        totalEmployeeNum: 100,
      };
    },
    methods: {
      handleSearchEmployee() {

      },
      handleCurrentPageChange() {

      },
    },
  };
</script>
<style lang="scss" scoped>
</style>
