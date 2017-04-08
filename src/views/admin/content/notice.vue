<template>
  <div id="contentNotice">
    <el-table
      :data="notices"
      :border='true'
      style="width: 100%;">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        :formatter="formatDate"
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
          <el-button
            size="small"
            type="danger"
            @click="handleDetail(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col v-if="notices.length > 0" :span="24"style="margin-top:10px;">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
    </el-col>
  </div>
</template>
<script>
import util from '../../../common/util';

export default {
  name: 'contentNotice',
  data() {
    return {
      notices: [],
      currentPage: 1,
      pageSize: 20,
      pageCount: 0,
      loading: false,
    };
  },
  methods: {
    handleModify(index, row) {
      this.$router.push({ name: 'contentEdit', params: { id: row.id } });
    },
    handleDelete(index, row) {
      this.$http.post(`/news/delete?id=${row.id}`).then((res) => {
        if (res.data.errorCode === 10000) {
          this.$notify({
            title: '删除成功',
            type: 'success',
          });
          this.notices.splice(index, 1);
        } else {
          this.$notify.error({
            title: '删除异常',
            type: 'success',
          });
        }
      });
    },
    handleDetail(index, row) {
      window.open(row.url, 'target_blank');
    },
    handleCurrentPageChange(val) {
      this.currentPage = val;
      this.getContent();
    },
    formatDate(row, column) {
      const date = new Date(parseInt(row.createdAt, 0));
      return util.formatDate.formatUtc(date, 'yyyy-MM-dd hh:mm');
    },
    getContent() {
      this.loading = true;
      this.$http.get(`/news/list?type=${1}&pageNum=${this.currentPage}&pageSize=${this.pageSize}`).then((res) => {
        if (res.data.errorCode === 10000) {
          const {
            data: {
              list, pages, pageNum,
            },
          } = res.data;
          this.loading = false;
          this.notices = list;
          this.pageCount = pages;
        } else {
          this.$notify.error({
            title: '数据异常',
            type: 'success',
          });
          this.loading = false;
        }
      });
    },
  },
  mounted() {
    this.getContent();
  },
};
</script>
<style lang="scss" scoped>
</style>
