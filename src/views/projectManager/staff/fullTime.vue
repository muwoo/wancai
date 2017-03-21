<template>
  <div id="projectManagerStaffFullTime">
    <el-form :inline="true" :model="fullTimeStaffInfo" class="demo-form-inline" style="margin-top: 20px;">
      <el-form-item label='申请ID' style="width: 160px;">
        <el-input v-model="fullTimeStaffInfo.id" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label='身份证号' style="width: 240px;">
        <el-input v-model="fullTimeStaffInfo.idCard" placeholder="请输入内容" style="width: 170px;"></el-input>
      </el-form-item>
      <el-form-item label='手机号' style="width: 180px;">
        <el-input v-model="fullTimeStaffInfo.telphone" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label='姓名' style="width: 160px;">
        <el-input v-model="fullTimeStaffInfo.name" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      </el-form-item><el-form-item>
        <el-button type="primary" @c`lick="handleSearchUser">搜索名单</el-button>
      </el-form-item>
    </el-form>
    <h1 class="tips"></h1>
    <div v-loading="loading">
      <el-row>
        <el-button style="float: right; margin-left: 10px;" @click="NextPage">下一页</el-button>
        <el-button style="float: right" @click="PrePage">上一页</el-button>
      </el-row>
      <div class="card-panel">
        <userInfo v-for="userInfo in fullTimeStaffs" :userInfo="userInfo"
        :selectVisible="false"
        @handlePass="handlePass(this.event, userInfo)"
        style="margin-top: 10px;" ></userInfo>
      </div>
      <el-col :span="24"style="margin-top:10px;">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
      </el-col>
    </div>
</template>

<script>
import userInfo from '../../../components/userInfo';

export default {
  name: 'projectManagerStaffFullTime',
  components: {
    userInfo,
  },
  data() {
    return {
      fullTimeStaffInfo: {
        id: '',
        idCard: '',
        phoneNumber: '',
        name: '',
        telphone: '',
      },
      fullTimeStaffs: [{
        id: 1,
        name: '余日天',
        status: 2,
        idCard: 362529123123,
        idCardHand: 'http://wx3.sinaimg.cn/mw690/9bd522c1gy1fdmp0izflgg208w050hdt.gif',
        idCardPositive: 'http://wx1.sinaimg.cn/mw690/006D2KSdly1fdnk5quqn5g308c06nx6p.gif',
        sex: 1,
        workType: 1,
        middleMan: '孟日天',
        nationName: '汉',
        createdTime: 1490086173000,
        birthday: 1490086173000,
        address: '西城广场59号',
        telphone: 136848423,
        planName: 'xxxx计划',
        demandTitle: 'xxxx需求xxxxxxxx',
        interviewList: [{
          time: '11月底前周一至周五下午1点－3点',
          address: '萧山一号仓人事部',
        },
        {
          time: '11月底前周一至周五下午1点－3点',
          address: '萧山一号仓人事部',
        },
        {
          time: '11月底前周一至周五下午1点－3点',
          address: '萧山一号仓人事部',
        }],
      },
      {
        id: 1,
        name: '余日天',
        status: 2,
        idCard: 362529123123,
        idCardHand: 'http://wx3.sinaimg.cn/mw690/9bd522c1gy1fdmp0izflgg208w050hdt.gif',
        idCardPositive: 'http://wx1.sinaimg.cn/mw690/006D2KSdly1fdnk5quqn5g308c06nx6p.gif',
        sex: 1,
        workType: 0,
        middleMan: '孟日天',
        nationName: '汉',
        createdTime: 1490086173000,
        birthday: 1490086173000,
        address: '西城广场59号',
        telphone: 136848423,
        planName: 'xxxx计划',
        demandTitle: 'xxxx需求xxxxxxxx',
        interviewList: [{
          time: '11月底前周一至周五下午1点－3点',
          address: '萧山一号仓人事部',
        },
        {
          time: '11月底前周一至周五下午1点－3点',
          address: '萧山一号仓人事部',
        },
        {
          time: '11月底前周一至周五下午1点－3点',
          address: '萧山一号仓人事部',
        }],
      }],
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
    getFullTimeStaffs() {
      this.loading = true;
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        id: this.fullTimeStaffInfo.id,
        idCard: this.fullTimeStaffInfo.idCard,
        telphone: this.fullTimeStaffInfo.telphone,
        name: this.fullTimeStaffInfo.name,
        status: 4,
      };
      // this.$http.post('/broker/list', params).then((response) => {
      //   const {
      //     data: {
      //       list, pages, total, pageNum,
      //     },
      //   } = response.data;
      //   this.totalMiddleManSize = total;
      //   this.currentPage = pageNum;
      //   this.pageCount = pages;
      //   this.middleMans = list;
      //   this.loading = false;
      // }).catch((error) => {
      //   this.loading = false;
      // });
    },
    handleSearchUser() {
      this.getFullTimeStaffs();
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
        this.getFullTimeStaffs();
      }
    },
    PrePage() {
      if (this.currentPage !== 1 && this.pageCount >= this.currentPage) {
        this.currentPage -= 1;
        this.getFullTimeStaffs();
      }
    },
    handleEditMiddleManStatus(obj, currentStatus, index, msg) {
      // const params = {
      //   id: obj.id,
      //   status: currentStatus,
      // };
      // this.$http.post('/broker/updateStatus', params).then((response) => {
      //   if (response.data.errorCode === 10000) {
      //     this.$notify({
      //       title: msg,
      //       type: 'success',
      //     });
      //     this.middleMans.splice(index, 1);
      //   } else {
      //     this.$notify.error({
      //       title: '修改异常',
      //       type: 'success',
      //     });
      //   }
      // }).catch((error) => {
      // });
    },
    handleCurrentPageChange(val) {
      this.currentPage = val;
      this.getFullTimeStaffs();
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
  #projectManagerStaffFullTime {
    .tips {
      border-bottom: 1px solid #e5e9f2;
    }
    .card-panel {
      width: 100%;
      height: auto;
    }
  }
</style>
