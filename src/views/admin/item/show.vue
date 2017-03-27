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
        <el-tab-pane label="招聘需求管理" name="second">
          <el-tabs v-model="defaultDemandTab" @tab-click="handleDemandTabClick">
            <el-tab-pane label="待审核" name="first">
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
                      type="danger"
                      @click="handleRefusedDemand(scope.$index, scope.row)">驳回</el-button>
                    <el-button
                      size="small"
                      type="primary"
                      @click="handleProcessedDemand(scope.$index, scope.row)">处理</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-col :span="24"style="margin-top:10px;">
                <el-pagination v-if="demands.length > 0" layout="prev, pager, next" @current-change="handleDemandPageChange" :current-page="currentDemandPage" :page-count="demandPageCount" style="float: right;"></el-pagination>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="处理中" name="second">
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
                      @click="handleApplyDemand(scope.$index, scope.row)">发布招聘计划</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleEndDemand(scope.$index, scope.row)">结束</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-col :span="24"style="margin-top:10px;">
                <el-pagination v-if="demands.length > 0" layout="prev, pager, next" @current-change="handleDemandPageChange" :current-page="currentDemandPage" :page-count="demandPageCount" style="float: right;"></el-pagination>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="已驳回" name="third">
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
                  </template>
                </el-table-column>
              </el-table>
              <el-col :span="24"style="margin-top:10px;">
                <el-pagination v-if="demands.length > 0" layout="prev, pager, next" @current-change="handleDemandPageChange" :current-page="currentDemandPage" :page-count="demandPageCount" style="float: right;"></el-pagination>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="已结束" name="fourth">
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
                  </template>
                </el-table-column>
              </el-table>
              <el-col :span="24"style="margin-top:10px;">
                <el-pagination v-if="demands.length > 0" layout="prev, pager, next" @current-change="handleDemandPageChange" :current-page="currentDemandPage" :page-count="demandPageCount" style="float: right;"></el-pagination>
              </el-col>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="全职管理" name="third">
          <el-tabs v-model="defaultDemandTab" @tab-click="handleUserTabClick">
            <el-row v-if="fullTimeStaffs.length > 0">
              <el-button style="float: right; margin-left: 10px;" @click="NextPage">下一页</el-button>
              <el-button style="float: right" @click="PrePage">上一页</el-button>
            </el-row>
            <el-tab-pane label="全部" name="first">
              <userInfo v-for="(info, index) in fullTimeStaffs" :userInfo="info"
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
              <el-col :span="24"style="margin-top:10px;" v-if="fullTimeStaffs.length > 0">
                <el-pagination layout="prev, pager, next" @current-change="handleFullTimeStaffPageChange" :current-page="currentFullTimeStaffPage" :page-count="fullTimeStaffPageCount" style="float: right;"></el-pagination>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="待确认" name="second">
              <userInfo v-for="(info, index) in fullTimeStaffs" :userInfo="info"
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
              <el-col :span="24"style="margin-top:10px;" v-if="fullTimeStaffs.length > 0">
                <el-pagination layout="prev, pager, next" @current-change="handleFullTimeStaffPageChange" :current-page="currentFullTimeStaffPage" :page-count="fullTimeStaffPageCount" style="float: right;"></el-pagination>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="待面试" name="third">
              <userInfo v-for="(info, index) in fullTimeStaffs" :userInfo="info"
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
              <el-col :span="24"style="margin-top:10px;" v-if="fullTimeStaffs.length > 0">
                <el-pagination layout="prev, pager, next" @current-change="handleFullTimeStaffPageChange" :current-page="currentFullTimeStaffPage" :page-count="fullTimeStaffPageCount" style="float: right;"></el-pagination>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="待入职" name="fourth">
              <userInfo v-for="(info, index) in fullTimeStaffs" :userInfo="info"
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
              <el-col :span="24"style="margin-top:10px;" v-if="fullTimeStaffs.length > 0">
                <el-pagination layout="prev, pager, next" @current-change="handleFullTimeStaffPageChange" :current-page="currentFullTimeStaffPage" :page-count="fullTimeStaffPageCount" style="float: right;"></el-pagination>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="入职中" name="fifth">
              <userInfo v-for="(info, index) in fullTimeStaffs" :userInfo="info"
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
              <el-col :span="24"style="margin-top:10px;" v-if="fullTimeStaffs.length > 0">
                <el-pagination layout="prev, pager, next" @current-change="handleFullTimeStaffPageChange" :current-page="currentFullTimeStaffPage" :page-count="fullTimeStaffPageCount" style="float: right;"></el-pagination>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="已结束" name="sixth">
              <userInfo v-for="(info, index) in fullTimeStaffs" :userInfo="info"
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
              <el-col :span="24"style="margin-top:10px;" v-if="fullTimeStaffs.length > 0">
                <el-pagination layout="prev, pager, next" @current-change="handleFullTimeStaffPageChange" :current-page="currentFullTimeStaffPage" :page-count="fullTimeStaffPageCount" style="float: right;"></el-pagination>
              </el-col>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="兼职管理" name="fourth">兼职管理</el-tab-pane>
        <el-tab-pane label="考情管理" name="fifth">考情管理</el-tab-pane>
        <el-tab-pane label="全职工资管理" name="sixth">全职工资管理</el-tab-pane>
        <el-tab-pane label="兼职工资管理" name="seventh">兼职工资管理</el-tab-pane>
        <el-tab-pane label="项目收支管理" name="eighth">项目收支管理</el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
  import util from '../../../common/util';
  import userInfo from '../../../components/userInfo';

  export default {
    name: 'itemShow',
    components: {
      userInfo,
    },
    data() {
      return {
        itemInfo: {
          id: '',
          title: '',
        },
        demands: [],
        fullTimeStaffs: [],
        currentTab: 'first',
        defaultTab: 'first',
        defaultDemandTab: 'first',
        loading: false,
        currentDemandPage: 1,
        demandPageCount: 0,
        currentUserType: 1,
        currentUserStatus: 0,
        currentFullTimeStaffPage: 1,
        fullTimeStaffPageCount: 0,
        currentPartTimeStaffPage: 1,
        partTimeStaffPageCount: 0,
        pageSize: 10,
      };
    },
    methods: {
      // Tab切换
      handleTabClick(val) {
        this.currentTab = val.name;
        if (this.currentTab === 'second') {
          this.getDemands(0);
        } else if (this.currentTab === 'third') {
          this.currentUserType = 1;
          this.currentUserStatus = 0;
          this.getUsers();
        } else if (this.currentTab === 'third') {
          this.currentUserType = 0;
          this.currentUserStatus = 0;
          this.getUsers();
        }
      },
      handleDemandTabClick(val) {
        if (val.name === 'first') {
          this.getDemands(0);
        } else if (val.name === 'second') {
          this.getDemands(1);
        } else if (val.name === 'third') {
          this.getDemands(2);
        } else if (val.name === 'fourth') {
          this.getDemands(3);
        } else if (val.name === 'fifth') {
          this.getDemands(4);
        }
      },
      handleUserTabClick(val) {
        if (val.name === 'first') {
          this.currentUserStatus = '';
        } else if (val.name === 'second') {
          this.currentUserStatus = 0;
        } else if (val.name === 'third') {
          this.currentUserStatus = 2;
        } else if (val.name === 'fourth') {
          this.currentUserStatus = 3;
        } else if (val.name === 'fifth') {
          this.currentUserStatus = 7;
        } else if (val.name === 'sixth') {
          this.currentUserStatus = 11;
        }
        this.getUsers();
      },
      NextPage() {
        if (this.currentUserType === 1) {
          if (this.fullTimeStaffPageCount > this.currentFullTimeStaffPage) {
            this.currentFullTimeStaffPage += 1;
            this.getUsers();
          }
        }
        if (this.currentUserType === 0) {
          if (this.partTimeStaffPageCount > this.currentPartTimeStaffPage) {
            this.currentPartTimeStaffPage += 1;
            this.getUsers();
          }
        }
      },
      PrePage() {
        if (this.currentUserType === 1) {
          if (this.currentFullTimeStaffPage !== 1 &&
            this.fullTimeStaffPageCount >= this.currentFullTimeStaffPage) {
            this.currentFullTimeStaffPage -= 1;
            this.getUsers();
          }
        }
        if (this.currentUserType === 0) {
          if (this.currentPartTimeStaffPage !== 1 &&
            this.partTimeStaffPageCount >= this.currentPartTimeStaffPage) {
            this.currentPartTimeStaffPage -= 1;
            this.getUsers();
          }
        }
      },
      handleDemandPageChange(val) {
        this.currentDemandPage = val;
      },
      handleFullTimeStaffPageChange(val) {
        this.currentFullTimeStaffPage = val;
      },
      handlePartTimeStaffPageChange(val) {
        this.currentPartTimeStaffPage = val;
      },
      handleDemandDetail(index, row) {
        this.$router.push({ name: 'adminDemandShow', params: { id: row.id } });
      },
      handleRefusedDemand(index, row) {
        this.handleEditDemandStatus(row, 2, index, '已驳回');
      },
      handleEndDemand(index, row) {
        this.handleEditDemandStatus(row, 3, index, '已结束');
      },
      handleProcessedDemand(index, row) {
        this.handleEditDemandStatus(row, 1, index, '已处理');
      },
      handleApplyDemand(index, row) {
        this.$router.push({ name: 'adminDemandShow', params: { id: row.id } });
      },
      handleEditDemandStatus(obj, currentStatus, index, msg) {
        const params = {
          id: obj.id,
          status: currentStatus,
        };
        this.$http.post('/demand/modifyStatus', params).then((response) => {
          if (response.data.errorCode === 10000) {
            this.$notify({
              title: msg,
              type: 'success',
            });
            this.demands.splice(index, 1);
          } else {
            this.$notify.error({
              title: '修改异常',
              type: 'success',
            });
          }
        }).catch((error) => {
        });
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
        this.$http.post(`/talent/restoreStatus?id=${obj.id}`).then((response) => {
          if (response.data.errorCode === 10000) {
            this.$notify({
              title: '已恢复',
              type: 'success',
            });
            this.fullTimeStaffs.splice(index, 1);
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
        this.$http.post('/talent/updateStatus', params).then((response) => {
          if (response.data.errorCode === 10000) {
            this.$notify({
              title: msg,
              type: 'success',
            });
            this.fullTimeStaffs.splice(index, 1);
          } else {
            this.$notify.error({
              title: '修改异常',
              type: 'success',
            });
          }
        }).catch((error) => {
        });
      },
      // 数据获取
      getDemands(Demandstatus) {
        this.loading = true;
        const params = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          projectId: this.$route.params.id,
          status: Demandstatus,
        };
        this.$http.post('/demand/list', params).then((response) => {
          const {
            data: {
              list, pages, pageNum,
            },
          } = response.data;
          this.currentDemandPage = pageNum;
          this.demandPageCount = pages;
          this.demands = list;
          this.loading = false;
        }).catch((err) => {
          this.loading = false;
          this.$message.error('获取数据失败');
        });
      },
      getUsers() {
        const projectId = this.$route.params.id;
        let params = {};
        if (this.currentUserType === 1) {
          params = {
            pageNum: this.currentFullTimeStaffPage,
            pageCount: this.fullTimeStaffPageCount,
            pageSize: this.pageSize,
            projectId: this.$route.params.id,
            talentStatus: this.currentUserStatus,
            type: this.currentUserType,
          };
        }
        if (this.currentUserType === 0) {
          params = {
            pageNum: this.currentPartTimeStaffPage,
            pageCount: this.partTimeStaffPageCount,
            pageSize: this.pageSize,
            projectId: this.$route.params.id,
            talentStatus: this.currentUserStatus,
            type: this.currentUserType,
          };
        }
        this.loading = true;
        this.$http.post('/project/talent/list', params).then((response) => {
          const {
            data: {
              list, pages, pageNum,
            },
          } = response.data;
          this.currentFullTimeStaffPage = pageNum;
          this.fullTimeStaffPageCount = pages;
          this.fullTimeStaffs = list;
          this.loading = false;
        }).catch((error) => {
          this.loading = false;
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
