<template>
  <div id="itemList">
    <el-form :inline="true" :model="projectInfo" class="demo-form-inline" style="margin-top: 20px;">
      <el-form-item label='ID' style="width: 140px;">
        <el-input v-model="projectInfo.id" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label='项目名称' style="width: 180px;">
        <el-input v-model="projectInfo.name" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearchItem">搜索项目</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="projects"
      :border='true'
      v-loading="loading"
      style="width: 100%;">
      <el-table-column
        prop="id"
        label="ID"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="title"
        label="项目名称"
        align="center"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="projectManager"
        label="项目经理"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="recruitManager"
        label="招聘前台"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        :formatter="formatDate"
        label="创建时间"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleSetProjectManager(scope.$index, scope.row)">设置</el-button>
          <el-button
            size="small"
            @click="handleProjectManager(scope.$index, scope.row)">详情</el-button>
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
    name: 'itemList',
    data() {
      return {
        projectInfo: {
          id: '',
          name: '',
          projectManager: '',
          recruitManager: '',
        },
        projects: [],
        currentPage: 1,
        pageSize: 20,
        pageCount: 0,
        totalProjectSize: 100,
        loading: false,
      };
    },
    methods: {
      handleSetProjectManager(index, row) {
        this.$router.push({ name: 'adminItemEdit', params: { id: row.id } });
      },
      handleProjectManager(index, row) {
        console.log(index);
        console.log(row);
      },
      handleSearchItem() {

      },
      handleCurrentPageChange(val) {
        this.currentPage = val;
        this.getProjects();
      },
      getProjects() {
        this.loading = true;
        this.$http.get(`/project/list?pageNum=${this.currentPage}&pageSize=${this.pageSize}`).then((response) => {
          const {
            data: {
              list, pages, total, pageNum,
            },
          } = response.data;
          this.totalProjectSize = total;
          this.currentPage = pageNum;
          this.pageCount = pages;
          this.projects = list;
          this.loading = false;
        }).catch((error) => {
          console.log(error);
          this.loading = false;
          this.$message.error('获取数据失败');
        });
      },
      formatDate(row, column) {
        // const date = new Date(parseInt(row.createdTime, 0) * 1000);
        const date = new Date(parseInt(row.createdTime, 0));
        return util.formatDate.format(date, 'yyyy-MM-dd hh:mm');
      },
    },
    mounted() {
      this.getProjects();
    },
  };
</script>
<style lang="scss" scoped>
</style>
