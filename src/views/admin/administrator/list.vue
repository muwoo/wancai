<template>
  <div id="administratorList">
    <el-form :inline="true" :model="adminInfo" style="margin-top: 20px;">
      <el-row>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label='身份证号：' style="width: 100%;">
              <el-input v-model="adminInfo.idCard" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='手机号码：' style="width: 100%;">
              <el-input v-model="adminInfo.phoneNumber" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='姓名：' style="width: 100%;">
                <el-input v-model="adminInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
        </el-col>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="handleSearchItem">搜索名单</el-button>
      </el-form-item>
    </el-form>
    <div class="tips"></div>
    <div class="card-panel"
      v-loading="loading">
      <administratorInfo v-for="info in infos" :projectManager="info"
      @handleEdit="handleEdit(this.event, info)"
      @handleDelete="handleDelete(this.event, info)"
      style="margin-top: 10px;" ></adminInfo>
      <el-col :span="24" style="margin-top:10px;">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
      </el-col>
    </div>
  </div>
</template>
<script>
  import administratorInfo from '../../../components/administratorInfo';

  export default {
    name: 'administratorList',
    components: {
      administratorInfo,
    },
    data() {
      return {
        adminInfo: {
          idCard: '',
          phoneNumber: '',
          name: '',
        },
        infos: [],
        currentPage: 1,
        pageSize: 20,
        pageCount: 0,
        totalProjectSize: 100,
        loading: false,
      };
    },
    methods: {
      handleEdit(event, obj) {
        console.log(obj);
      },
      handleDelete(event, obj) {
        console.log(event);
      },
      handleSearchItem() {
        this.getProjectManagers();
      },
      handleCurrentPageChange(val) {
        this.currentPage = val;
        this.getProjectManagers();
      },
      getProjectManagers() {
        this.loading = true;
        const params = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          idCard: this.adminInfo.idCard,
          phone: this.adminInfo.phone,
          name: this.adminInfo.name,
        };
        // console.log(params);
        this.$http.post('/manager/list', params).then((response) => {
          const {
            data: {
              list, pages, total, pageNum,
            },
          } = response.data;
          this.totalProjectSize = total;
          this.currentPage = pageNum;
          this.pageCount = pages;
          this.infos = list;
          this.loading = false;
        }).catch((error) => {
          console.log(error);
          this.loading = false;
        });
      },
    },
    mounted() {
    },
  };
</script>
<style lang="scss" scoped>
#administratorList {
  .tips {
    border-bottom: 1px solid #d3dce6;
  }
  .card-panel {
    width: 100%;
    height: auto;
  }
}
</style>
