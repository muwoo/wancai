<template>
  <div id="userList">
    <el-form :inline="true" :model="userInfo" style="margin-top: 20px;">
      <el-row>
        <el-col :span="24">
          <!-- <el-col :span="8">
            <el-form-item label='申请ID：' style="width: 100%;">
              <el-input v-model="userInfo.id" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label='姓 名：' style="width: 100%;">
              <el-input v-model="userInfo.name" placeholder="请输入内容" style="width: 100px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label='身份证号：' style="width: 100%;">
              <el-input v-model="userInfo.idCard" placeholder="请输入内容" style="width: 100px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label='手机号：' style="width: 100%;">
              <el-input v-model="userInfo.telphone" placeholder="请输入内容" style="width: 100px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label='性 别：' style="width: 100%;">
              <el-select v-model="userInfo.sex" placeholder="请选择" style="width: 100px;">
                <el-option
                  v-for="item in sex"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearchUser">搜索人才</el-button>
      </el-form-item>
    </el-form>
      <el-table
        :data="users"
        :border='true'
        style="width: 100%;">
        <el-table-column
          prop="idCard"
          label="身份证号"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="telphone"
          align="center"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          :formatter="formatDate"
          align="center"
          width="180"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleUserSet(scope.$index, scope.row)">设置</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleUserDetail(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    <el-col :span="24"style="margin-top:10px;">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :total="totalEmployeeNum" style="float: right;"></el-pagination>
    </el-col>
  </div>
</template>
<script>
  import util from '../../../common/util';

  export default {
    name: 'userList',
    data() {
      return {
        userInfo: {
          id: '',
          idCard: '',
          telphone: '',
          name: '',
          sex: '1',
        },
        users: [{
          id: 1,
          idCard: '15341312321323',
          telphone: '141223232',
          name: 'makcy',
          sex: '男',
          age: 18,
          createdTime: 1489869359000,
        }],
        currentPage: 1,
        totalEmployeeNum: 100,
        defaultActiveTabName: 'first',
        sex: [{
          value: '0',
          label: '女',
        },
        {
          value: '1',
          label: '男',
        },
        {
          value: '',
          label: '不限',
        }],
      };
    },
    methods: {
      // 搜索
      handleSearchUser() {

      },
      // 换页
      handleCurrentPageChange() {

      },
      // 设置
      handleUserSet() {

      },
      // 详情
      handleUserDetail(index, row) {
        window.open(`#/staff/${row.id}`, 'target_blank');
      },
      // 格式化时间
      formatDate(row, column) {
        const date = new Date(parseInt(row.createdTime, 0));
        return util.formatDate.format(date, 'yyyy-MM-dd hh:mm');
      },
    },
  };
</script>
<style lang="scss" scoped>
</style>
