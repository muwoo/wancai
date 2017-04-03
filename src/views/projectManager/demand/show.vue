<template>
  <div id="projectManagerDemandShow">
    <el-steps :space="240" :active="1" :center=true :align-center=true>
      <el-step title="申请成功"></el-step>
      <el-step title="招聘前台审核"></el-step>
      <el-step title="前台发布招聘计划"></el-step>
      <el-step title="经纪人提交求职者名单"></el-step>
    </el-steps>
    <el-tabs v-model="defaultTabName" @tab-click="handleTabClick">
      <el-tab-pane label="需求信息" name="first" v-loading="loading">
        <el-form class="info" lable-width="200px" :model="demandInfo">
          <h3 class="tips">岗位信息</h3>
          <el-form-item label="岗位名称：">{{ demandInfo.title }}</el-form-item>
          <el-form-item label="岗位类型：">{{ demandInfo.type | formatType }}</el-form-item>
          <el-form-item label="工种：">{{ demandInfo.workTypeName }}</el-form-item>
          <el-form-item label="薪资：">{{ demandInfo.salary }}</el-form-item>
          <el-form-item label="结算方式：">{{ demandInfo.settlementTypeName }}</el-form-item>
          <el-form-item label="需求人数：">{{ demandInfo.applyNumber }}</el-form-item>
          <el-form-item v-if="demandInfo.type == 1" label="到岗时间：">{{ demandInfo.workTime }}</el-form-item>
          <div v-if="demandInfo.type == 1" v-for="interview in demandInfo.listDemandInterview">
            <h1 class="tips"></h1>
            <el-form-item label="面试时间：">{{ interview.interviewTime }}</el-form-item>
            <el-form-item label="面试地点：">{{ interview.interviewAddress }}</el-form-item>
          </div>
          <div v-if="demandInfo.type == 0" v-for="schedule in demandInfo.listSchedulingInformation">
            <h1 class="tips"></h1>
            <el-form-item label="排班信息：">{{ schedule.startTime | formatDate }} 至 {{ schedule.endTime | formatDate }}</el-form-item>
            <el-form-item label="班次需求人数：">{{ schedule.applyNumber }}</el-form-item>
          </div>
          <h3 class="tips">岗位要求</h3>
          <el-form-item label="性别：">{{ demandInfo.sex | formatSex }}</el-form-item>
          <el-form-item label="年龄：">{{ demandInfo.minAge }}岁 至 {{ demandInfo.maxAge }}岁</el-form-item>
          <el-form-item label="学历：">{{ demandInfo.educationName }}</el-form-item>
          <el-form-item label="专业：">{{ demandInfo.profession }}</el-form-item>
          <el-form-item label="婚否：">{{ demandInfo.isMarry | formatMarry }}</el-form-item>
          <el-form-item label="工作经验：">{{ demandInfo.workExperienceName }}</el-form-item>
          <el-form-item label="工作要求：">{{ demandInfo.request }}</el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="招聘计划" name="second">
        <el-table
         :data="plans"
         border
         style="width: 100%"
         v-loading="loading">
         <el-table-column type="expand">
           <template scope="props">
             <el-form>
                <el-form-item label="需求人数：">
                  <span>{{ props.row.applyNumber }}</span>
                </el-form-item>
                <el-form-item label="定向经纪人：" v-if="props.row.brokerList.length > 0">
                  <span v-for="(man, index) in props.row.brokerList">{{ index + 1}}、{{ man.brokerName }} </span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="ID"
            align="center"
            width="100"
            prop="id">
          </el-table-column>
          <el-table-column
            label="计划名称"
            width="150"
            align="center"
            prop="name">
          </el-table-column>
          <el-table-column
            label="类型"
            width="100"
            align="center"
            :formatter="formatPlanType"
            prop="type">
          </el-table-column>
          <el-table-column
            label="发布时间"
            width="180"
            align="center"
            :formatter="formatStartTime"
            prop="created_at">
          </el-table-column>
          <el-table-column
            label="截止时间"
            width="180"
            align="center"
            :formatter="formatEndTime"
            prop="end_time">
          </el-table-column>
          <el-table-column
            label="招聘人数"
            width="100"
            align="center"
            prop="alreadyNumber">
          </el-table-column>
          <el-table-column
            label="状态"
            width="100"
            :formatter="formatPlanStatus"
            align="center"
            prop="status">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template scope="scope">
              <el-button
                v-if="scope.row.status === 1"
                size="small"
                @click="handleRefush(scope.$index, scope.row)">刷新</el-button>
              <el-button
                v-if="scope.row.status === 1"
                type="danger"
                size="small"
                @click="handleEarlyEnd(scope.$index, scope.row)">提前结束</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col :span="24" style="margin-top:10px;" v-if="this.plans.length > 0">
          <el-pagination layout="prev, pager, next" @current-change="handlePlanPage" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="人员管理" name="third">
        <el-tabs v-model="defaultUserTab" @tab-click="handleUserTabClick">
          <el-tab-pane label="全部" name="first" v-loading="loading">
            <userInfo v-for="(info, index) in users" :userInfo="info"
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
          </el-tab-pane>
          <el-tab-pane label="待确认" name="second" v-loading="loading">
            <userInfo v-for="(info, index) in users" :userInfo="info"
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
          </el-tab-pane>
          <el-tab-pane v-if="demandInfo.type == 1" label="待面试" name="third" v-loading="loading">
            <userInfo v-for="(info, index) in users" :userInfo="info"
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
          </el-tab-pane>
          <el-tab-pane v-else label="待考勤" name="third">
            <userInfo v-for="(info, index) in users" :userInfo="info"
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
          </el-tab-pane>
          <el-tab-pane v-if="demandInfo.type == 1" label="待入职" name="fourth" v-loading="loading">
            <userInfo v-for="(info, index) in users" :userInfo="info"
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
          </el-tab-pane>
          <el-tab-pane v-if="demandInfo.type == 1" label="入职中" name="fifth" v-loading="loading">
            <userInfo v-for="(info, index) in users" :userInfo="info"
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
          </el-tab-pane>
          <el-tab-pane v-else label="已考勤" name="fourth" v-loading="loading">
            <userInfo v-for="(info, index) in users" :userInfo="info"
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
          </el-tab-pane>
          <el-tab-pane v-if="demandInfo.type == 1" label="已结束" name="sixth" v-loading="loading">
            <userInfo v-for="(info, index) in users" :userInfo="info"
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
          </el-tab-pane>
          <el-tab-pane v-if="demandInfo.type == 0" label="已结束" name="fifth" v-loading="loading">
            <userInfo v-for="(info, index) in users" :userInfo="info"
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
          </el-tab-pane>
          <el-col :span="24" style="margin-top:10px;" v-if="users.length > 0">
            <el-pagination layout="prev, pager, next" @current-change="handleUserPage" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
          </el-col>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import util from '../../../common/util';
  import userInfo from '../../../components/userInfo';

  export default {
    name: 'projectManagerDemandShowt',
    components: {
      userInfo,
    },
    data() {
      return {
        defaultTabName: 'first',
        defaultUserTab: 'first',
        plans: [],
        users: [],
        loading: false,
        currentPage: 1,
        pageSize: 10,
        pageCount: 0,
        currentGetUserType: '',
        demandInfo: {
          id: '',
          projectTitle: '',
          type: '1',
          workType: '',
          applyNumber: 0,
          isMarry: 0,
          wrokExperience: '',
          sex: 1,
          request: '',
          salary: '',
          status: '',
        },
      };
    },
    filters: {
      formatType(type) {
        return type === 1 ? '全职' : '兼职';
      },
      formatSex(sex) {
        if (sex === 1) {
          return '男';
        } else if (sex === 0) {
          return '女';
        }
        return '不限';
      },
      formatMarry(isMarry) {
        if (isMarry === 1) {
          return '已婚';
        } else if (isMarry === 0) {
          return '未婚';
        }
        return '不限';
      },
      formatDate(time) {
        const date = new Date(parseInt(time, 0));
        return util.formatDate.format(date, 'yyyy-MM-dd hh:mm');
      },
    },
    methods: {
      handleTabClick(val) {
        this.currentTab = val.name;
        // if (val.name === 'first') {
        // } else if (val.name === 'second') {
        // } else
        if (val.name === 'second') {
          this.getPlans();
        } else if (val.name === 'third') {
          this.getUsers();
        }
      },
      handlePlanPage(val) {
        if (this.currentTab === 'second') {
          this.currentPage = val;
          this.getPlans();
        }
      },
      // ------人员管理-------
      handleUserTabClick(val) {
        this.loading = true;
        this.currentPage = 1;
        if (this.demandInfo.type === 1) {
          if (val.name === 'first') {
            this.currentGetUserType = '';
          } else if (val.name === 'second') {
            this.currentGetUserType = 0;
          } else if (val.name === 'third') {
            this.currentGetUserType = 2;
          } else if (val.name === 'fourth') {
            this.currentGetUserType = 3;
          } else if (val.name === 'fifth') {
            this.currentGetUserType = 7;
          } else if (val.name === 'sixth') {
            this.currentGetUserType = 11;
          }
        }
        if (this.demandInfo.type === 0) {
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
        }
        this.getUsers();
      },
      handleUserPage(val) {
        if (this.currentTab === 'third') {
          this.currentPage = val;
          this.getUsers(this.currentGetUserType);
        }
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
            this.users.splice(index, 1);
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
            this.users.splice(index, 1);
          } else {
            this.$notify.error({
              title: '修改异常',
              type: 'success',
            });
          }
        }).catch((error) => {
        });
      },
      // 计划刷新
      handleRefush(index, row) {
        this.$http.get(`${this.$managerURL}/plan/refreshTime?id=${row.id}`).then((response) => {
          if (response.data.errorCode === 10000) {
            this.$notify({
              title: '刷新成功',
              type: 'success',
            });
            this.getPlans();
          } else {
            this.$notify.error({
              title: `${response.data.moreInfo}`,
              type: 'success',
            });
          }
        }).catch((error) => {
        });
      },
      // 计划提前结束
      handleEarlyEnd(index, row) {
        const params = {
          id: row.id,
          status: 0,
        };
        this.$http.post(`${this.$managerURL}/plan/updateStatus`, params).then((response) => {
          if (response.data.errorCode === 10000) {
            this.$notify({
              title: '提前结束',
              type: 'success',
            });
            this.getPlans();
          } else {
            this.$notify.error({
              title: '结束异常',
              type: 'success',
            });
          }
        }).catch((error) => {
        });
      },
      getPlans() {
        this.loading = true;
        this.$http.get(`${this.$managerURL}/demand/plan/list?pageNum=${this.currentPage}&pageSize=${this.pageSize}&demandId=${this.demandInfo.id}`).then((response) => {
          const {
            data: {
              list, pages, pageNum,
            },
          } = response.data;
          this.plans = list;
          this.currentPage = pageNum;
          this.pageCount = pages;
          this.loading = false;
        }).catch((err) => {
          this.loading = false;
        });
      },
      getUsers() {
        const params = {
          talentStatus: this.currentGetUserType,
          demandId: this.demandInfo.id,
          pageNum: this.currentPage,
          pageSize: this.pageSize,
        };
        this.loading = true;
        this.$http.post(`${this.$managerURL}/demand/talent/list`, params).then((response) => {
          const {
            data: {
              list, pages, pageNum,
            },
          } = response.data;
          this.currentPage = pageNum;
          this.pageCount = pages;
          this.users = list;
          this.loading = false;
        }).catch((error) => {
          this.loading = false;
        });
      },
      formatStartTime(row, column) {
        const date = new Date(parseInt(row.created_at, 0));
        return util.formatDate.format(date, 'yyyy-MM-dd hh:mm');
      },
      formatEndTime(row, column) {
        const date = new Date(parseInt(row.end_time, 0));
        return util.formatDate.format(date, 'yyyy-MM-dd hh:mm');
      },
      formatPlanStatus(row, column) {
        if (row.status === 1) {
          return '发布中';
        } else if (row.status === 0) {
          return '已过期';
        }
        return '';
      },
      formatPlanType(row, column) {
        return row.type === 0 ? '普通' : '定向';
      },
    },
    mounted() {
      this.loading = true;
      this.$http(`${this.$managerURL}/demand/detail?id=${this.$route.params.id}`).then((response) => {
        this.demandInfo = response.data.data;
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
      });
    },
  };
</script>
<style lang="scss" scoped>
#projectManagerDemandShow {
}
</style>
