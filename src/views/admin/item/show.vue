<template>
  <div id="itemShow" v-loading="loading">
      <h4>项目ID: {{itemInfo.id}}，项目名称：{{itemInfo.title}}</h4>
      <el-tabs v-model="defaultTab" type="card" @tab-click="handleTabClick">
        <el-tab-pane label="项目信息" name="first">
          <el-form class="info" lable-width="200px">
            <h3 class="tips">基本信息</h3>
            <el-form-item label="项目名称：">{{ itemInfo.title }}</el-form-item>
            <el-form-item label="项目地址：">{{ itemInfo.address }}</el-form-item>
            <el-form-item label="项目介绍：">{{ itemInfo.introduction }}</el-form-item>
            <h3 class="tips">匹配负责人</h3>
            <el-form-item label="招聘前台：">{{ }}</el-form-item>
            <el-form-item label="项目经理：">{{ }}</el-form-item>
            <h3 class="tips">财务设置</h3>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="招聘需求管理" name="second">招聘需求管理</el-tab-pane>
        <el-tab-pane label="全职管理" name="third">全职管理</el-tab-pane>
        <el-tab-pane label="兼职管理" name="fourth">兼职管理</el-tab-pane>
        <el-tab-pane label="考情管理" name="fifth">考情管理</el-tab-pane>
        <el-tab-pane label="全职工资管理" name="sixth">全职工资管理</el-tab-pane>
        <el-tab-pane label="兼职工资管理" name="seventh">兼职工资管理</el-tab-pane>
        <el-tab-pane label="项目收支管理" name="eighth">项目收支管理</el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
  export default {
    name: 'itemShow',
    data() {
      return {
        itemInfo: {
          id: '',
          title: '',
        },
        defaultTab: 'first',
        loading: false,
      };
    },
    methods: {
      handleTabClick(val) {

      },
    },
    mounted() {
      this.loading = true;
      this.$http(`/project/detail?id=${this.$route.params.id}`).then((response) => {
        this.itemInfo = response.data.data;
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
      });
    },
  };
</script>
<style lang="scss" scoped>
#itemShow {
  .tips {
    border-bottom: 1px solid #bcc4d6;
  }
}
</style>
