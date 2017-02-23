<template>
  <div id="demandList">
    <el-form :inline="true" :model="demandInfo" class="demo-form-inline" style="margin-top: 20px;">
      <el-form-item label='项目经理ID' style="width: 240px;">
        <el-input v-model="demandInfo.projectManagerId" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='需求类型' style="width: 240px;">
        <el-input v-model="demandInfo.type" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='需求ID' style="width: 240px;">
        <el-input v-model="demandInfo.id" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='姓 名' style="widthz: 240px;">
        <el-input v-model="demandInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='申请原因' style="widthz: 240px;">
        <el-input v-model="demandInfo.reason" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='需求表名' style="widthz: 240px;">
        <el-input v-model="demandInfo.tableName" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='身份证号' style="widthz: 240px;">
        <el-input v-model="demandInfo.idCardNumber" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='申请时间' style="widthz: 240px;">
        <el-input v-model="demandInfo.applyedAt" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label='手机号码' style="widthz: 240px;">
        <el-input v-model="demandInfo.phoneNumber" placeholder="请输入内容" style="width: 150px;"></el-input>
      </el-form-item>
      </el-form-item><el-form-item>
        <el-button type="primary" @click="handleSearchItem">搜索名单</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="demands"
      :border='true'
      style="width: 100%;">
      <el-table-column
        prop="id"
        label="ID"
        width="200">
      </el-table-column>
      <el-table-column
        prop="name"
        label="申请人"
        width="200">
      </el-table-column>
      <el-table-column
        prop="tableName"
        label="需求表名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="200">
      </el-table-column>
      <el-table-column
        prop="reason"
        label="申请原因">
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleDemanDetail(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="small"
            @click="handleApplyDemand(scope.$index, scope.row)">发布招聘计划</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleEndDemand(scope.$index, scope.row)">结束</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleCancelDemand(scope.$index, scope.row)">取消申请</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24"style="margin-top:10px;">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :total="totalProjectSize" style="float: right;"></el-pagination>
    </el-col>
  </div>
</template>
<script>
  export default {
    name: 'demandList',
    data() {
      return {
        demandInfo: {
          id: '',
          type: '',
          projectManagerId: '',
          name: '',
          reason: '',
          tableName: '',
          idCardNumber: '',
          applyedAt: '',
          phoneNumber: '',
        },
        demands: [],
        currentPage: 1,
        totalProjectSize: 100,
      };
    },
    methods: {
      handleDemanDetail(index, row) {
        console.log(index);
        console.log(row);
      },
      handleApplyDemand(index, row) {
        console.log(index);
        console.log(row);
      },
      handleEndDemand(index, row) {
        console.log(index);
        console.log(row);
      },
      handleCancelDemand(index, row) {
        console.log(index);
        console.log(row);
      },
      handleCurrentPageChange(val) {
        console.log(val);
      },
      handleSearchItem() {

      },
    },
  };
</script>
<style lang="scss" scoped>
</style>
