<template>
  <div id="projectManagerList">
    <el-form :inline="true" :model="projectManagerInfo" style="margin-top: 20px;">
      <el-row>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label='身份证号：' style="width: 100%;">
              <el-input v-model="projectManagerInfo.idCard" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='手机号码：' style="width: 100%;">
              <el-input v-model="projectManagerInfo.phoneNumber" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='姓名：' style="width: 100%;">
                <el-input v-model="projectManagerInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
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
      <projectManagerInfo v-for="(info, index) in infos" :projectManager="info"
      @handleEdit="handleEdit(this.event, info)"
      @handleDelete="handleDelete(this.event, info, index)"
      style="margin-top: 10px;" ></projectManagerInfo>
      <el-col :span="24" style="margin-top:10px;" v-if="infos.length > 0">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
      </el-col>
    </div>
  </div>
</template>
<script>
  import projectManagerInfo from '../../../components/projectManagerInfo';

  export default {
    name: 'projectManagerList',
    components: {
      projectManagerInfo,
    },
    data() {
      return {
        projectManagerInfo: {
          idCard: '',
          phoneNumber: '',
          name: '',
        },
        infos: [],
        currentPage: 1,
        pageSize: 20,
        pageCount: 0,
        totalProjectSize: 0,
        loading: false,
      };
    },
    methods: {
      handleEdit(event, obj) {
        console.log(obj);
      },
      handleDelete(event, obj, index) {
        this.$http.post(`/manager/delete?id=${obj.id}`).then((response) => {
          if (response.data.errorCode === 10000) {
            this.$notify({
              title: '已删除',
              type: 'success',
            });
            this.infos.splice(index, 1);
          } else {
            this.$notify.error({
              title: '修改异常',
              type: 'success',
            });
          }
        }).catch((err) => {
        });
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
          idCard: this.projectManagerInfo.idCard,
          phone: this.projectManagerInfo.phone,
          name: this.projectManagerInfo.name,
        };
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
      this.getProjectManagers();
    },
  };
</script>
<style lang="scss" scoped>
#projectManagerList {
  .tips {
    border-bottom: 1px solid #d3dce6;
  }
  .card-panel {
    width: 100%;
    height: auto;
  }
}
</style>
