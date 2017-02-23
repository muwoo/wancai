<template>
  <div id="employeeList">
    <el-form :inline="true" :model="employeeInfo" style="margin-top: 20px;">
      <el-row>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label='申请ID：' style="width: 100%;">
              <el-input v-model="employeeInfo.id" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='身份证号：' style="width: 100%;">
              <el-input v-model="employeeInfo.idCardNumber" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='手机号：' style="width: 100%;">
              <el-input v-model="employeeInfo.phoneNumber" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label='姓 名：' style="width: 100%;">
              <el-input v-model="employeeInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='性 别：' style="width: 100%;">
              <el-input v-model="employeeInfo.sex" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='年 龄：' style="width: 100%;">
              <el-input v-model="employeeInfo.age" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      </el-form-item><el-form-item>
        <el-button type="primary" @click="handleSearchEmployee">搜索名单</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="defaultActiveTabName" @tab-click="handleStatusTagClick">
      <el-tab-pane label="人才库" name="first">
        <el-table
          :data="employees"
          :border='true'
          style="width: 100%;">
          <el-table-column
            prop="idCardNumber"
            label="身份证号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="phoneNumber"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="createdAt"
            label="创建时间">
          </el-table-column>
          <el-table-column
            label="操作"
            width="240">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleSetProjectManager(scope.$index, scope.row)">设置</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleProjectManager(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        employees: [{
          id: '',
          idCardNumber: '15341312321323',
          phoneNumber: '141223232',
          name: 'makcy',
          sex: '男',
          age: 18,
          createdAt: '2015-1-1',
        }],
        currentPage: 1,
        totalEmployeeNum: 100,
        defaultActiveTabName: 'first',
      };
    },
    methods: {
      handleSearchEmployee() {

      },
      handleCurrentPageChange() {

      },
      handleStatusTagClick() {

      },
    },
  };
</script>
<style lang="scss" scoped>
</style>
