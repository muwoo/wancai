<template>
  <div id="demand-list">
    <el-tabs v-model="defaultActiveName" @tab-click="handleTabChange">
      <el-tab-pane label="待审核" name="first">
        <el-table
          :data="projects"
          border
          style="width: 100%; margin-top: 30px;">
          <el-table-column
            prop="id"
            label="ID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="岗位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="tableName"
            label="需求表名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="100">
          </el-table-column>
          <el-table-column
            prop="reason"
            label="申请原因">
          </el-table-column>
          <el-table-column
            prop="applyedAt"
            label="申请时间">
          </el-table-column>
          <el-table-column
            prop="demandPeopleNum"
            label="需求人数">
          </el-table-column>
          <el-table-column
            prop="dealtAt"
            label="处理时间">
          </el-table-column>
          <el-table-column
            prop="recruitPeopleNum"
            label="招聘人数">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button
                size="small"
                type="text"
                @click="handleDetail(scope.$index, scope.row)">详情</el-button>
              <el-button
                size="small"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button
                size="small"
                type="text"
                @click="handleCancel(scope.$index, scope.row)">取消申请</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="处理中" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="已驳回" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="已结束" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'demandList',
  data() {
    return {
      defaultActiveName: 'first',
      projects: [{
        id: 1,
        name: '搬砖工',
        tableName: '11月份需求',
        type: '兼职',
        reason: '缺钱花',
        applyedAt: '2015-1-1',
        demandPeopleNum: 10,
        applyPeopleNum: 123,
        dealtAt: '2015-1-1',
        recruitPeopleNum: 10,
      }],
    };
  },
  methods: {
    handleTabChange() {

    },
  },
};
</script>

<style lang="scss" scoped>
#demand-list {

}
</style>
