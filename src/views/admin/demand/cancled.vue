<template>
  <div id="demandCancled">
    <el-form :inline="true" :model="demandInfo" class="demo-form-inline" style="margin-top: 20px;">
      <el-row>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label='需求类型：' style="width: 100%;">
              <el-select v-model="demandInfo.type" style="width: 100px;">
                <el-option
                  v-for="item in workType"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='需求ID：' style="width: 100%;">
              <el-input v-model="demandInfo.id" placeholder="请输入内容" style="width: 100px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='身份证号' style="width: 100%;">
              <el-input v-model="demandInfo.idCard" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label='姓 名：' style="width: 100%;">
              <el-input v-model="demandInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='需求表名：' style="width: 100%;">
              <el-input v-model="demandInfo.title" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='手机号码' style="width: 100%;">
              <el-input v-model="demandInfo.telphone" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      </el-form-item><el-form-item>
        <el-button type="primary" @click="handleSearchItem">搜索名单</el-button>
      </el-form-item>
    </el-form>
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
        prop="projectManagerName"
        label="申请人"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="需求表名"
        align="center"
        width="200">
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
        label="操作"
        width="400">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleDemandDetail(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24"style="margin-top:10px;">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
    </el-col>
  </div>
</template>
<script>
  export default {
    name: 'demandCancled',
    data() {
      return {
        demandInfo: {
          id: '',
          type: '',
          name: '',
          title: '',
          idCard: '',
          telphone: '',
        },
        loading: false,
        demands: [],
        currentPage: 1,
        totalDemandSize: 100,
        pageSize: 20,
        pageCount: 0,
        workType: [{
          value: '0',
          label: '兼职',
        },
        {
          value: '1',
          label: '全职',
        },
        {
          value: '',
          label: '不限',
        }],
      };
    },
    methods: {
      handleDemandDetail(index, row) {
        this.$router.push({ name: 'adminDemandShow', params: { id: row.id } });
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
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          status: 4,
          name: this.demandInfo.name,
          type: this.demandInfo.type,
          telphone: this.demandInfo.telphone,
          id: this.demandInfo.id,
          idCard: this.demandInfo.idCard,
          title: this.demandInfo.title,
        };
        this.$http.post('/demand/list', params).then((response) => {
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
