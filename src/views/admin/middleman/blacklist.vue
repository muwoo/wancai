<template>
  <div id="middleManBlackList">
    <el-form :inline="true" :model="middleManInfo" class="demo-form-inline" style="margin-top: 20px;">
      <el-form-item label='申请ID' style="width: 160px;">
        <el-input v-model="middleManInfo.id" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label='身份证号' style="width: 240px;">
        <el-input v-model="middleManInfo.idCard" placeholder="请输入内容" style="width: 170px;"></el-input>
      </el-form-item>
      <el-form-item label='手机号' style="width: 180px;">
        <el-input v-model="middleManInfo.telphone" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label='姓名' style="width: 160px;">
        <el-input v-model="middleManInfo.name" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      </el-form-item><el-form-item>
        <el-button type="primary" @click="handleSearchMiddleman">搜索经纪人</el-button>
      </el-form-item>
    </el-form>
    <h1 class="tips"></h1>
      <div v-loading="loading">
        <!-- <el-checkbox v-model="isAllSelect" @change="handleAllSelect" style="margin-left: 10px;">全选</el-checkbox>
        <el-button>批量解除</el-button> -->
        <el-row>
          <el-button style="float: right; margin-left: 10px;" @click="NextPage">下一页</el-button>
          <el-button style="float: right" @click="PrePage">上一页</el-button>
        </el-row>
        <middleMan v-for="middleMan in middleMans" :middleMan="middleMan"
        :selectVisible="false"
        @handleWhiteList="handleWhiteList(this.event, middleMan, index)"
        style="margin-top: 10px;" ></middleMan>
      <el-col :span="24" style="margin-top:10px;" v-if="middleMans.length > 0">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
      </el-col>
    </div>
  </div>
</template>

<script>
import middleMan from '../../../components/middleMan';

export default {
  name: 'middleManBlackList',
  components: {
    middleMan,
  },
  data() {
    return {
      middleManInfo: {
        id: '',
        idCard: '',
        phoneNumber: '',
        name: '',
        telphone: '',
      },
      middleMans: [],
      loading: false,
      isAllSelect: false,
      currentSelectArray: [],
      pageSize: 20,
      pageCount: 0,
      currentPage: 1,
      totalMiddleManSize: 0,
    };
  },
  methods: {
    getMiddleMans() {
      this.loading = true;
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        id: this.middleManInfo.id,
        idCard: this.middleManInfo.idCard,
        telphone: this.middleManInfo.telphone,
        name: this.middleManInfo.name,
        status: 4,
      };
      this.$http.post('/broker/list', params).then((response) => {
        const {
          data: {
            list, pages, total, pageNum,
          },
        } = response.data;
        this.totalMiddleManSize = total;
        this.currentPage = pageNum;
        this.pageCount = pages;
        this.middleMans = list;
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
      });
    },
    handleSearchMiddleman() {
      this.getMiddleMans();
    },
    handleWhiteList(event, obj, index) {
      this.handleEditMiddleManStatus(obj, 2, index, '已解除');
    },
    handleAllSelect() {
      console.log('All Select');
    },
    NextPage() {
      if (this.pageCount > this.currentPage) {
        this.currentPage += 1;
        this.getMiddleMans();
      }
    },
    PrePage() {
      if (this.currentPage !== 1 && this.pageCount >= this.currentPage) {
        this.currentPage -= 1;
        this.getMiddleMans();
      }
    },
    handleEditMiddleManStatus(obj, currentStatus, index, msg) {
      const params = {
        id: obj.id,
        status: currentStatus,
      };
      this.$http.post('/broker/updateStatus', params).then((response) => {
        if (response.data.errorCode === 10000) {
          this.$notify({
            title: msg,
            type: 'success',
          });
          this.middleMans.splice(index, 1);
        } else {
          this.$notify.error({
            title: '修改异常',
            type: 'success',
          });
        }
      }).catch((error) => {
      });
    },
    handleCurrentPageChange(val) {
      this.currentPage = val;
      this.getMiddleMans();
    },
  },
  mounted() {
    this.getMiddleMans();
  },
};
</script>

<style lang="scss" scoped>
  #middleManBlackList {
    .tips {
      border-bottom: 1px solid #e5e9f2;
    }
  }
</style>
