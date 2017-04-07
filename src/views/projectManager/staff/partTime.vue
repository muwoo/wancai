<template>
  <div id="projectManagerStaffPartTime">
    <el-form :inline="true" :model="partTimeStaffInfo" class="demo-form-inline" style="margin-top: 20px;">
      <el-form-item label='申请ID' style="width: 160px;">
        <el-input v-model="partTimeStaffInfo.id" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label='身份证号' style="width: 240px;">
        <el-input v-model="partTimeStaffInfo.idCard" placeholder="请输入内容" style="width: 170px;"></el-input>
      </el-form-item>
      <el-form-item label='手机号' style="width: 180px;">
        <el-input v-model="partTimeStaffInfo.telphone" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label='姓名' style="width: 160px;">
        <el-input v-model="partTimeStaffInfo.name" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      </el-form-item><el-form-item>
        <el-button type="primary" @click="handleSearchUser">搜索名单</el-button>
      </el-form-item>
    </el-form>
    <h1 class="tips"></h1>
    <el-tabs v-model="defaultTabName" @tab-click="handleTabClick" v-loading="loading">
      <el-row v-if="partTimeStaffs.length > 0">
        <el-button style="float: right; margin-left: 10px;" @click="NextPage">下一页</el-button>
        <el-button style="float: right" @click="PrePage">上一页</el-button>
      </el-row>
      <el-tab-pane label="全部" name="first">
        <userInfo v-for="(info, index) in partTimeStaffs" :userInfo="info"
        :selectVisible="false"
        @handleDetail="handleDetail(this.event, info)"
        @handleConfirmInfo="handleConfirmInfo(this.event, info, index)"
        @handleInvalidInfo="handleInvalidInfo(this.event, info, index)"
        @handleInterviewPass="handleInterviewPass(this.event, info, index)"
        @handleInterviewRefused="handleInterviewRefused(this.event, info, index)"
        @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)"
        @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)"
        @handleWorkFailed="handleWorkFailed(this.event, info, index)"
        @handleConfirmWork="handleConfirmWork(this.event, info, index)"
        @handleDimission="handleDimission(this.event, info, index)"
        @handleSignIn="handleSignIn(this.event, info, index)"
        @handleRevertStatus="handleRevertStatus(this.event, info, index)"
        style="margin-top: 10px;" >
        </userInfo>
        <el-col :span="24"style="margin-top:10px;" v-if="partTimeStaffs.length > 0">
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="待确认" name="second">
        <userInfo v-for="(info, index) in partTimeStaffs" :userInfo="info"
        :selectVisible="false"
        @handleDetail="handleDetail(this.event, info)"
        @handleConfirmInfo="handleConfirmInfo(this.event, info, index)"
        @handleInvalidInfo="handleInvalidInfo(this.event, info, index)"
        @handleInterviewPass="handleInterviewPass(this.event, info, index)"
        @handleInterviewRefused="handleInterviewRefused(this.event, info, index)"
        @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)"
        @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)"
        @handleWorkFailed="handleWorkFailed(this.event, info, index)"
        @handleConfirmWork="handleConfirmWork(this.event, info, index)"
        @handleDimission="handleDimission(this.event, info, index)"
        @handleSignIn="handleSignIn(this.event, info, index)"
        @handleRevertStatus="handleRevertStatus(this.event, info, index)"
        style="margin-top: 10px;" >
        </userInfo>
        <el-col :span="24"style="margin-top:10px;" v-if="partTimeStaffs.length > 0">
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="待考勤" name="third">
        <userInfo v-for="(info, index) in partTimeStaffs" :userInfo="info"
        :selectVisible="false"
        @handleDetail="handleDetail(this.event, info)"
        @handleConfirmInfo="handleConfirmInfo(this.event, info, index)"
        @handleInvalidInfo="handleInvalidInfo(this.event, info, index)"
        @handleInterviewPass="handleInterviewPass(this.event, info, index)"
        @handleInterviewRefused="handleInterviewRefused(this.event, info, index)"
        @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)"
        @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)"
        @handleWorkFailed="handleWorkFailed(this.event, info, index)"
        @handleConfirmWork="handleConfirmWork(this.event, info, index)"
        @handleDimission="handleDimission(this.event, info, index)"
        @handleSignIn="handleSignIn(this.event, info, index)"
        @handleRevertStatus="handleRevertStatus(this.event, info, index)"
        style="margin-top: 10px;" >
        </userInfo>
        <el-col :span="24"style="margin-top:10px;" v-if="partTimeStaffs.length > 0">
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="已考勤" name="fourth">
        <userInfo v-for="(info, index) in partTimeStaffs" :userInfo="info"
        :selectVisible="false"
        @handleDetail="handleDetail(this.event, info)"
        @handleConfirmInfo="handleConfirmInfo(this.event, info, index)"
        @handleInvalidInfo="handleInvalidInfo(this.event, info, index)"
        @handleInterviewPass="handleInterviewPass(this.event, info, index)"
        @handleInterviewRefused="handleInterviewRefused(this.event, info, index)"
        @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)"
        @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)"
        @handleWorkFailed="handleWorkFailed(this.event, info, index)"
        @handleConfirmWork="handleConfirmWork(this.event, info, index)"
        @handleDimission="handleDimission(this.event, info, index)"
        @handleSignIn="handleSignIn(this.event, info, index)"
        @handleRevertStatus="handleRevertStatus(this.event, info, index)"
        style="margin-top: 10px;" >
        </userInfo>
        <el-col :span="24"style="margin-top:10px;" v-if="partTimeStaffs.length > 0">
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="已结束" name="fifth">
        <userInfo v-for="(info, index) in partTimeStaffs" :userInfo="info"
        :selectVisible="false"
        @handleDetail="handleDetail(this.event, info)"
        @handleConfirmInfo="handleConfirmInfo(this.event, info, index)"
        @handleInvalidInfo="handleInvalidInfo(this.event, info, index)"
        @handleInterviewPass="handleInterviewPass(this.event, info, index)"
        @handleInterviewRefused="handleInterviewRefused(this.event, info, index)"
        @handleInterviewAbsent="handleInterviewAbsent(this.event, info, index)"
        @handlePartTimeAbsent="handlePartTimeAbsent(this.event, info, index)"
        @handleWorkFailed="handleWorkFailed(this.event, info, index)"
        @handleConfirmWork="handleConfirmWork(this.event, info, index)"
        @handleDimission="handleDimission(this.event, info, index)"
        @handleSignIn="handleSignIn(this.event, info, index)"
        @handleRevertStatus="handleRevertStatus(this.event, info, index)"
        style="margin-top: 10px;" >
        </userInfo>
        <el-col :span="24"style="margin-top:10px;" v-if="partTimeStaffs.length > 0">
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
        </el-col>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import userInfo from '../../../components/userInfo';

export default {
  name: 'projectManagerStaffPartTime',
  components: {
    userInfo,
  },
  data() {
    return {
      partTimeStaffInfo: {
        id: '',
        idCard: '',
        phoneNumber: '',
        name: '',
        telphone: '',
      },
      partTimeStaffs: [],
      defaultTabName: 'first',
      loading: false,
      isAllSelect: false,
      currentSelectArray: [],
      pageSize: 10,
      pageCount: 0,
      currentPage: 1,
      currentGetUserType: '',
    };
  },
  methods: {
    getPartTimeStaffs() {
      const projectId = this.$route.query.id;
      this.loading = true;
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        projectId: this.$route.query.id,
        idCard: this.partTimeStaffInfo.idCard,
        telphone: this.partTimeStaffInfo.telphone,
        name: this.partTimeStaffInfo.name,
        talentStatus: this.currentGetUserType,
        type: 0,
      };
      this.loading = true;
      this.$http.post(`${this.$managerURL}/project/talent/list`, params).then((response) => {
        const {
          data: {
            list, pages, pageNum,
          },
        } = response.data;
        this.currentPage = pageNum;
        this.pageCount = pages;
        this.partTimeStaffs = list;
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
      });
    },
    handleTabClick(val) {
      this.loading = true;
      if (val.name === 'first') {
        this.currentGetUserType = '';
      } else if (val.name === 'second') {
        this.currentGetUserType = 0;
      } else if (val.name === 'third') {
        this.currentGetUserType = 2;
      } else if (val.name === 'fourth') {
        this.currentGetUserType = 10;
      } else if (val.name === 'fifth') {
        this.currentGetUserType = 11;
      }
      this.getPartTimeStaffs();
    },
    handleCurrentPageChange(val) {
      this.currentPage = val;
      this.getPartTimeStaffs();
    },
    handleDetail(event, obj) {
      window.open(`#/user/${obj.talent.id}`, 'target_blank');
    },
    handleInvalidInfo(event, obj, index) {
      this.handleEditUserStatus(obj, 1, index, '名单无效');
    },
    handleConfirmInfo(event, obj, index) {
      this.handleEditUserStatus(obj, 2, index, '确认名单');
    },
    handleInterviewPass(event, obj, index) {
      this.handleEditUserStatus(obj, 3, index, '面试通过');
    },
    handleInterviewRefused(event, obj, index) {
      this.handleEditUserStatus(obj, 4, index, '面试不通过');
    },
    handleInterviewAbsent(event, obj, index) {
      this.handleEditUserStatus(obj, 5, index, '面试未到');
    },
    handleWorkFailed(event, obj, index) {
      this.handleEditUserStatus(obj, 6, index, '入职失败');
    },
    handleConfirmWork(event, obj, index) {
      this.handleEditUserStatus(obj, 7, index, '确认入职');
    },
    handleDimission(event, obj, index) {
      this.handleEditUserStatus(obj, 8, index, '确认离职');
    },
    handlePartTimeAbsent(event, obj, index) {
      this.handleEditUserStatus(obj, 9, index, '放鸽子');
    },
    handleSignIn(event, obj, index) {
      this.handleEditUserStatus(obj, 10, index, '已考勤');
    },
    handleRevertStatus(event, obj, index) {
      this.$http.post(`${this.$managerURL}/talent/restoreStatus?id=${obj.id}`).then((response) => {
        if (response.data.errorCode === 10000) {
          this.$notify({
            title: '已恢复',
            type: 'success',
          });
          this.partTimeStaffs.splice(index, 1);
        } else {
          this.$notify.error({
            title: '修改异常',
            type: 'success',
          });
        }
      }).catch((err) => {

      });
    },
    handleEditUserStatus(obj, currentStatus, index, msg) {
      const params = {
        id: obj.id,
        talentStatus: currentStatus,
      };
      this.$http.post(`${this.$managerURL}/talent/updateStatus`, params).then((response) => {
        if (response.data.errorCode === 10000) {
          this.$notify({
            title: msg,
            type: 'success',
          });
          this.partTimeStaffs.splice(index, 1);
        } else {
          this.$notify.error({
            title: '修改异常',
            type: 'success',
          });
        }
      }).catch((error) => {
      });
    },
    handleSearchUser() {
      this.getPartTimeStaffs();
    },
    handleAllSelect() {
      console.log('All Select');
    },
    NextPage() {
      if (this.pageCount > this.currentPage) {
        this.currentPage += 1;
        this.getPartTimeStaffs();
      }
    },
    PrePage() {
      if (this.currentPage !== 1 && this.pageCount >= this.currentPage) {
        this.currentPage -= 1;
        this.getPartTimeStaffs();
      }
    },
  },
  mounted() {
    this.getPartTimeStaffs();
  },
};
</script>

<style lang="scss" scoped>
  #projectManagerStaffPartTime {
    .tips {
      border-bottom: 1px solid #e5e9f2;
    }
    .card-panel {
      width: 100%;
      height: auto;
    }
  }
</style>
