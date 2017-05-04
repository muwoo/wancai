<template>
  <div id="adminFinanceShow">
    <h4>隶属，项目ID: {{finaceInfo.projectId}}，项目名称：{{finaceInfo.projectTitle}}</h4>
    <h5>ID_________ 姓名_____________<el-button type="primary"  @click="dialogFormVisible = true" >增加</el-button></h5>

    <el-table
      :data="tableData"
      border
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="accountId"
        label="流水号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type1"
        label="类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="金额">
      </el-table-column>

      <el-table-column
        prop="remark"
        label="备注信息">
      </el-table-column>

    <el-table-column
      prop="updatedAt"
      label="时间">
    </el-table-column>

    <el-table-column
      prop="balance"
      label="余额">
    </el-table-column>
    </el-table>


    <el-dialog title="收货地址" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="form.money" auto-complete="off" placeholder="金额"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" auto-complete="off" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  export default {
    name:"adminFinanceShow",
    data(){
      return {
        finaceInfo:{
          projectId:"",
          projectTitle:""
        },
        loading:false,
        tableData:[],
        form:{},
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px'
      }
    },
    methods: {
      handleAdd(){
        this.dialogFormVisible = false;
        const param = {};
        this.$http.post('/wallet/record/add/', param).then((response) => {

        }).catch((error) => {
          console.log(error);
          this.loading = false;
          this.$message.error('获取数据失败');
        });
      }
    },
    mounted (){
      this.loading = true;
     // this.$http("/bos/wallet/record/list?id=${this.$route.params.id}&type=0").then((response) => {
      this.$http(`/wallet/record/list?type=0&id=${this.$route.params.id}`).then((response) => {
        this.tableData = response.data.data.list;
        this.finaceInfo = {
          projectId:this.$route.params.id,
          projectTitle:response.data.data.projectTitle||"无数据"
        };
        this.apps();
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
      });
    }
  }
</script>
