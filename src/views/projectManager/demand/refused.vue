<template>
  <div id="projectManagerdemandRefused">
    <el-table
      :data="demands"
      :border='true'
      v-loading="loading"
      style="width: 100%;">
      <el-table-column
        prop="id"
        label="ID"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="job"
        label="岗位"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="title"
        label="需求表名"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        :formatter="formatType"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop="applyReason"
        label="申请原因"
        :formatter="formatReason"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        :formatter="formatCreatedDate"
        label="申请时间"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop="applyNumber"
        label="需求人数"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="处理时间"
        :formatter="formatUpdatedDate"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop="type"
        label="招聘人数"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        label="操作"
        width="400">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleDemandDetail(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="small"
            @click="handleDemandApplyAgain(scope.$index, scope.row)">再次申请</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24"style="margin-top:10px;" v-if="demands.length > 0">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
    </el-col>
  </div>
</template>
<script>
  import util from '../../../common/util';

  export default {
    name: 'projectManagerdemandRefused',
    data() {
      return {
        loading: false,
        demands: [],
        currentPage: 1,
        totalDemandSize: 0,
        pageSize: 20,
        pageCount: 0,
      };
    },
    methods: {
      handleDemandDetail(index, row) {
        this.$router.push({ name: 'projectManagerDemandShow', params: { id: row.id }, query: { id: this.$route.query.id } });
      },
      handleDemandApplyAgain(index, row) {
      },
      handleCurrentPageChange(val) {
        this.currentPage = val;
        this.getDemands();
      },
      handleSearchItem() {
        this.getDemands();
      },
      getDemands() {
        this.loading = true;
        const params = {
          projectId: this.$route.query.id,
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          status: 2,
        };
        this.$http.post(`${this.$managerURL}/demand/listdemand`, params).then((response) => {
          const {
            data: {
              list, pages, total, pageNum,
            },
          } = response.data;
          this.totalProjectSize = total;
          this.currentPage = pageNum;
          this.pageCount = pages;
          this.demands = list;
          this.loading = false;
        }).catch((error) => {
          console.log(error);
          this.loading = false;
          this.$message.error('获取数据失败');
        });
      },
      formatCreatedDate(row, column) {
        // const date = new Date(parseInt(row.createdTime, 0) * 1000);
        const date = new Date(parseInt(row.createdAt, 0));
        return util.formatDate.format(date, 'yyyy-MM-dd hh:mm');
      },
      formatUpdatedDate(row, column) {
        // const date = new Date(parseInt(row.createdTime, 0) * 1000);
        const date = new Date(parseInt(row.updatedAt, 0));
        return util.formatDate.format(date, 'yyyy-MM-dd hh:mm');
      },
      formatType(row, column) {
        return row.type === 1 ? '全职' : '兼职';
      },
      formatReason(row, column) {
        if (row.applyReason === 0) {
          return '离职补缺';
        } else if (row.applyReason === 1) {
          return '新增职位';
        } else if (row.applyReason === 2) {
          return '业务发展扩编';
        } else if (row.applyReason === 3) {
          return '临时补充';
        }
        return '';
      },
    },
    mounted() {
      this.getDemands();
    },
  };
</script>
<style lang="scss" scoped>
</style>
