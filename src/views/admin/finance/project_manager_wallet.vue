<template>
  <div id="projectManagerWallet">
    <h1>项目经理钱包</h1>

    <el-form :inline="true" :model="userInfo" style="margin-top: 20px;">
      <el-row>
        <el-col :span="24">

          <el-col :span="6">
            <el-form-item label='身份证号：' style="width: 100%;">
              <el-input v-model="userInfo.idCard" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label='手机号：' style="width: 100%;">
              <el-input v-model="userInfo.telphone" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-button type="primary" @click="handleSearchWallet">查询记录</el-button>
          </el-col>
        </el-col>
      </el-row>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      v-loading="loading"
      :default-sort = "{prop: 'name', order: 'descending'}"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="idCard"
        label="身份证号"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="telphone"
        label="注册手机号">
      </el-table-column>

      <el-table-column
        prop="balance"
        label="余额">
      </el-table-column>



      <el-table-column
        prop="tag"
        label="操作"
        width="100">
        <template scope="scope">
          <el-button
            type="text"
            @click="handleFinanceList(scope.$index, scope.row)"
            size="small">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" style="margin-top:10px;">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
    </el-col>
  </div>
</template>
<script>
  import util from '../../../common/util';
  export default {
    name: 'projectManagerWallet',
    data (){
      return {
        loading: false,
        userInfo:{
          idCard:"",
          telphone:""
        },
        currentPage: 1,
        pageSize: 20,
        pageCount: 1,
        tableData: []
      }
    },
    methods: {

      handleSearchWallet(){
        this.getDemands();
      },

      handleFinanceList(index, row){
        console.log ("adminFinance");
        console.log (this.$router);
        console.log (row);
        this.$router.push({name: 'adminFinanceShow', params: {id: row.id}});
      },

      handleCurrentPageChange(val) {
        console.log ("handleCurrentPageChange");
        this.currentPage = val;
        this.getDemands();
      },

      getDemands(){
        this.loading = true;
        const param = {
          pageNum:1,
          pageSize:20,
          idCard:this.userInfo.idCard,
          telphone:this.userInfo.telphone
        };
        this.$http.post('/wallet/broker/', param).then((response) => {
          const {
            data: {
              list,
              pages,
              total,
              pageNum,
            },
          } = response.data;
          this.totalProjectSize = total;
          this.currentPage = pageNum;
          this.pageCount = pages;
          this.tableData = list;
          this.loading = false;
          console.log ("ajax login...");
        }).catch((error) => {
          console.log(error);
          this.loading = false;
          this.$message.error('获取数据失败');
        });
      },
    },
    mounted(){
      this.getDemands();
    },
  };
</script>
<style lang="scss" scoped>
</style>
