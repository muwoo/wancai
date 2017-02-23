<template>
  <div id="itemList">
    <el-form :inline="true" :model="projectInfo" class="demo-form-inline" style="margin-top: 20px;">
      <el-form-item label='ID' style="width: 140px;">
        <el-input v-model="projectInfo.id" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label='项目名称' style="width: 180px;">
        <el-input v-model="projectInfo.name" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label='项目经理' style="width: 180px;">
        <el-input v-model="projectInfo.projectManager" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label='招聘前台' style="width: 180px;">
        <el-input v-model="projectInfo.recruitManager" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearchItem">搜索项目</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="projects"
      :border='true'
      style="width: 100%;">
      <el-table-column
        prop="id"
        label="ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="projectManager"
        label="项目经理"
        width="200">
      </el-table-column>
      <el-table-column
        prop="recruitManager"
        label="招聘前台"
        width="200">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间"
        width="200">
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
    <el-col :span="24"style="margin-top:10px;">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :total="totalProjectSize" style="float: right;"></el-pagination>
    </el-col>
  </div>
</template>
<script>
  export default {
    name: 'list',
    data() {
      return {
        projectInfo: {
          id: '',
          name: '',
          projectManager: '',
          recruitManager: '',
        },
        projects: [{
          id: 1,
          name: '萧山仓库',
          projectManager: '照日天',
          recruitManager: '王尼玛',
          createdAt: '2015-1-1',
        },
        {
          id: 1,
          name: '萧山仓库',
          projectManager: '照日天',
          recruitManager: '王尼玛',
          createdAt: '2015-1-1',
        },
        {
          id: 1,
          name: '萧山仓库',
          projectManager: '照日天',
          recruitManager: '王尼玛',
          createdAt: '2015-1-1',
        }],
        currentPage: 1,
        totalProjectSize: 100,
      };
    },
    methods: {
      handleSetProjectManager(index, row) {
        console.log(index);
        console.log(row);
      },
      handleProjectManager(index, row) {
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
