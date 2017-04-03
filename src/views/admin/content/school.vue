<template>
  <div id="contentSchool">
    <el-table
      :data="schools"
      :border='true'
      style="width: 100%;">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="240">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleModify(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'contentSchool',
  data() {
    return {
      schools: [],
    };
  },
  methods: {
    handleModify(index, row) {

    },
    handleDelete(index, row) {
      // this.$http.post().then((res) => {
      //   if (res.data.errorCode === 10000) {
      //     this.$notify({
      //       title: '删除成功',
      //       type: 'success',
      //     });
      //   } else {
      //     this.$notify.error({
      //       title: '删除异常',
      //       type: 'success',
      //     });
      //   }
      // });
    },
  },
  mounted() {
    // this.$http.get().then((res) => {
    //   if (res.data.errorCode === 10000) {
    //     console.log(res);
    //   } else {
    //     this.$notify.error({
    //       title: '数据异常',
    //       type: 'success',
    //     });
    //   }
    // });
  },
};
</script>
<style lang="scss" scoped>
</style>
