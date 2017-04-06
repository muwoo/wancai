<template>
  <div id="adminDemandShow">
    <h4>隶属，项目ID: {{demandInfo.projectId}}，项目名称：{{demandInfo.projectTitle}}</h4>
    <el-row>
      <el-button type="primary" size="large" v-if="demandInfo.status==0"  style="margin-bottom: 10px;" @click="handleRefusedDemand">驳 回</el-button>
      <el-button type="primary" size="large" v-if="demandInfo.status==1"  style="margin-bottom: 10px;" @click="handleCompletedDemand">结 束</el-button>
      <el-button type="primary" size="large" style="margin-bottom: 10px;" @click="handleEditDemand">修 改</el-button>
    </el-row>
    <el-tabs v-model="defaultTab" type="card" @tab-click="handleTabClick">
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
      <el-tab-pane v-if="demandInfo.status!=0 && demandInfo.status != 3 && demandInfo.status!=4 && demandInfo.status!=2" label="发布计划" name="second">
        <el-form :model="planInfo" lable-width="200px" :rules="planRules" ref="planForm" class="publish">
          <el-form-item label='计划名称：' prop="name">
            <el-input v-model="planInfo.name" placeholder="请输入内容" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label='提交（元）：'>
            <el-input-number v-model="planInfo.submitPrice" :min="0" :max="100000" style="width: 150px;"></el-input-number>
          </el-form-item>
          <el-form-item label='到面（元）：'>
            <el-input-number v-model="planInfo.interviewAlreadyPrice" :min="0" :max="100000" style="width: 150px;"></el-input-number>
          </el-form-item>
          <el-form-item label='面过（元）：'>
            <el-input-number v-model="planInfo.interviewSuccessPrice" :min="0" :max="100000" style="width: 150px;"></el-input-number>
          </el-form-item>
          <el-form-item label='入职（元）：'>
            <el-input-number v-model="planInfo.workSuccessPrice" :min="0" :max="100000" style="width: 150px;"></el-input-number>
          </el-form-item>
          <h1 class="tips"></h1>
          <el-form-item label='满返：' v-for="(scheme, index) in planInfo.schemes" style="margin-top: 20px;">
            <el-col :span="3" style="font-size: 20px;">{{ index + 1 }}、满（天）</el-col>
            <el-col :span="4"><el-input-number v-model="scheme.limitDay" :min="0" :max="100000" style="width: 150px;"></el-input-number></el-col>
            <el-col :span="3" style="font-size: 20px; margin-left: 25px;">返（元）</el-col>
            <el-col :span="4"><el-input-number v-model="scheme.amount" :min="0" :max="100000" style="width: 150px;"></el-input-number></el-col>
          </el-form-item>
          <el-form-item style="margin-left: 80px;">
            <el-button v-if="this.planInfo.schemes.length <= 11" type="text" @click="handleAddScheme">+添加满返方案</el-button>
            <el-button v-if="planInfo.schemes.length > 1" type="text" @click="handleDelScheme">-删减满返方案</el-button>
          </el-form-item>
          <h1 class="tips"></h1>
          <el-form-item label='提成方式：'>
            <el-col :span="5">
              <el-select v-model="planInfo.commissionType" placeholder="请选择">
                <el-option
                  v-for="type in chargeType"
                  :label="type.label"
                  :value="type.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4" :offset="1" v-if="planInfo.commissionType != '0' && planInfo.commissionType != '6'">
              <el-input-number  v-model="planInfo.chargePrice" :min="0" :max="100000" style="width: 150px;">
            </el-col>
            <el-col :span="4" :offset="1" v-if="planInfo.commissionType == '6'">
              <el-input-number  v-model="planInfo.chargePrice" :min="0" :max="100" style="width: 150px;">
            </el-col>
          </el-form-item>
          <el-form-item label='截止日期：'>
            <el-date-picker
              v-model="planInfo.endTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handlePublishPlan(0)">发布普通计划</el-button>
          </el-form-item>
          <el-form-item label='定向经纪人：'>
            <el-tag v-for="(man, index) in planInfo.brokerList" :closable="true" type="primary" @close="handleCloseBrokerTag(index)">{{man.name}}</el-tag>
            <el-button type="primary" size="small" @click="handleSearchBtn">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handlePublishPlan(1)">发布定向计划</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="demandInfo.status!=0 && demandInfo.status!=4 && demandInfo.status!=2" label="人员管理" name="third">
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
      <el-tab-pane v-if="demandInfo.status!=0 && demandInfo.status!=4 && demandInfo.status!=2" label="招聘计划" name="fourth">
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
        <el-col :span="24" style="margin-top:10px;">
          <el-pagination layout="prev, pager, next" @current-change="handlePlanPage" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
        </el-col>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="选择经纪人" v-model="assignBroker">
      <el-input placeholder="请输入内容" v-model="planInfo.searchContent">
        <el-select v-model="planInfo.searchType" slot="prepend" style="width: 150px;">
          <el-option value='1' label='ID'></el-option>
          <el-option value='2' label='姓名'></el-option>
          <el-option value='3' label='身份证'></el-option>
          <el-option value='4' label='手机号'></el-option>
        </el-select>
        <el-button slot="append" icon="search" @click="getSearchBroker"></el-button>
      </el-input>
      <div class="search-table">
        <el-table :data="planInfo.brokerSearchData" v-loading="planInfo.loading">
          <el-table-column property="id" label="id"></el-table-column>
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column property="idCard" label="身份证" width="200"></el-table-column>
          <el-table-column property="telphone" label="手机"  width="200"></el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleConfirmBroker(scope.$index, scope.row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col :span="24" style="margin-top:10px;" v-if="planInfo.brokerSearchData.length > 0">
          <el-pagination layout="prev, pager, next" @current-change="handleBrokerPage" :current-page="planInfo.currentPage" :page-count="planInfo.pageCount" style="float: right;"></el-pagination>
        </el-col>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import util from '../../../common/util';
  import userInfo from '../../../components/userInfo';

  export default {
    name: 'adminDemandShow',
    data() {
      return {
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
        planInfo: {
          name: '',
          submitPrice: 0,
          type: 1,
          interviewAlreadyPrice: 0,
          interviewSuccessPrice: 0,
          workSuccessPrice: 0,
          chargePrice: 0,
          schemes: [{
            commission_id: 5,
            limitDay: 0,
            amount: 0,
          }],
          brokerList: [],
          endTime: '',
          commissionType: '0',
          brokerSearchData: [],
          currentPage: 1,
          pageSize: 20,
          pageCount: 0,
          searchContent: '',
          searchType: '1',
          loading: false,
        },
        defaultTab: 'first',
        defaultUserTab: 'first',
        plans: [],
        users: [],
        currentTab: '',
        currentGetUserType: '',
        currentPage: 1,
        pageSize: 10,
        pageCount: 0,
        totalUserSize: 0,
        loading: false,
        assignBroker: false,
        chargeType: [{
          value: '6',
          label: '计薪（提成百分比）',
        },
        {
          value: '7',
          label: '计时（每小时佣金）',
        },
        {
          value: '8',
          label: '计件（每件佣金）',
        },
        {
          value: '0',
          label: '无',
        }],
        planRules: {
          name: [
            { required: true, message: '请输入计划名称', trigger: 'blur' },
          ],
        },
      };
    },
    components: {
      userInfo,
    },
    methods: {
      handleRefusedDemand() {
        const params = {
          id: this.demandInfo.id,
          status: 2,
        };
        this.$http.post('/demand/modifyStatus', params).then((response) => {
          if (response.data.errorCode === 10000) {
            this.$notify({
              title: '已驳回',
              type: 'success',
            });
            this.$router.go(0);
            // location.reload();
          } else {
            this.$notify.error({
              title: '修改异常',
              type: 'success',
            });
          }
        }).catch((error) => {
        });
      },
      handleCompletedDemand() {
        const params = {
          id: this.demandInfo.id,
          status: 3,
        };
        this.$http.post('/demand/modifyStatus', params).then((response) => {
          if (response.data.errorCode === 10000) {
            // this.$router.go(0);
            this.demandInfo.status = 3;
            this.$notify({
              title: '已结束',
              type: 'success',
            });
            // location.reload();
          } else {
            this.$notify.error({
              title: '修改异常',
              type: 'success',
            });
          }
        }).catch((error) => {
        });
      },
      handleEditDemand() {
        // window.open(`#/demand/edit/${this.demandInfo.id}`, 'target_blank');
        this.$router.push({ name: 'adminDemandEdit', params: { id: this.demandInfo.id } });
      },
      handleTabClick(val) {
        this.currentTab = val.name;
        // if (val.name === 'first') {
        // } else if (val.name === 'second') {
        // } else
        if (val.name === 'third') {
          this.getUsers();
        } else if (val.name === 'fourth') {
          this.getPlans();
        }
      },
      // 计划刷新
      handleRefush(index, row) {
        this.$http.get(`/plan/refreshTime?id=${row.id}`).then((response) => {
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
        this.$http.post('/plan/updateStatus', params).then((response) => {
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
      handlePlanPage(val) {
        if (this.currentTab === 'fourth') {
          this.currentPage = val;
          this.getPlans();
        }
      },
      // 添加方案
      handleAddScheme() {
        this.planInfo.schemes.push({ commission_id: 5, amount: 0, limitDay: 0 });
      },
      // 删减方案
      handleDelScheme() {
        if (this.planInfo.schemes.length > 1) {
          this.planInfo.schemes.pop();
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
      // 发布计划
      handleConfirmBroker(index, row) {
        if (!this.isExistInBrokerList(row)) {
          this.planInfo.brokerList.push({ broker_id: row.id, name: row.name });
          this.planInfo.brokerSearchData.splice(index, 1);
        }
      },
      handleSearchBtn() {
        this.assignBroker = true;
        this.planInfo.brokerList = [];
        this.getSearchBroker();
      },
      handleCloseBrokerTag(index) {
        this.planInfo.brokerList.splice(index, 1);
      },
      handleBrokerPage(val) {
        this.planInfo.currentPage = val;
        this.getSearchBroker();
      },
      handlePublishPlan(planType) {
        this.planInfo.type = planType;
        this.publishPlan();
      },
      isExistInBrokerList(broker) {
        const id = broker.id;
        if (this.planInfo.brokerList.length > 0) {
          for (let i = 0; i < this.planInfo.brokerList.length; i += 1) {
            if (this.planInfo.brokerList[i].broker_id === id) {
              return true;
            }
          }
        }
        return false;
      },
      // 获取数据
      getSearchBroker() {
        let idData = '';
        let idCardData = '';
        let nameData = '';
        let telphoneData = '';
        if (this.planInfo.searchType === '1') {
          idData = this.planInfo.searchContent;
        } else if (this.planInfo.searchType === '2') {
          nameData = this.planInfo.searchContent;
        } else if (this.planInfo.searchType === '3') {
          idCardData = this.planInfo.searchContent;
        } else if (this.planInfo.searchType === '4') {
          telphoneData = this.planInfo.searchContent;
        }
        const params = {
          status: 2,
          pageNum: this.planInfo.currentPage,
          pageSize: this.planInfo.pageSize,
          id: idData,
          idCard: idCardData,
          name: nameData,
          telphone: telphoneData,
        };
        this.planInfo.loading = true;
        this.$http.post('/broker/list', params).then((response) => {
          const {
            data: {
              list, pages, total, pageNum,
            },
          } = response.data;
          this.planInfo.currentPage = pageNum;
          this.planInfo.pageCount = pages;
          this.planInfo.brokerSearchData = list;
          this.planInfo.loading = false;
        }).catch((error) => {
          this.planInfo.loading = false;
        });
      },
      getPlans() {
        this.loading = true;
        this.$http.get(`/demand/plan/list?pageNum=${this.currentPage}&pageSize=${this.pageSize}&demandId=${this.demandInfo.id}`).then((response) => {
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
        this.$http.post('/demand/talent/list', params).then((response) => {
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
      publishPlan() {
        const allCommission = [];
        if (this.planInfo.submitPrice !== 0) {
          allCommission.push({ commission_id: 1, amount: this.planInfo.submitPrice });
        }
        if (this.planInfo.interviewAlreadyPrice !== 0) {
          allCommission.push({ commission_id: 2, amount: this.planInfo.interviewAlreadyPrice });
        }
        if (this.planInfo.interviewSuccessPrice !== 0) {
          allCommission.push({ commission_id: 3, amount: this.planInfo.interviewSuccessPrice });
        }
        if (this.planInfo.workSuccessPrice !== 0) {
          allCommission.push({ commission_id: 4, amount: this.planInfo.workSuccessPrice });
        }
        for (let i = 0; i < this.planInfo.schemes.length; i += 1) {
          if (this.planInfo.schemes[i].amount !== 0) {
            allCommission.push(this.planInfo.schemes[i]);
          }
        }
        if (this.planInfo.commissionType !== '0') {
          const selectId = parseInt(this.planInfo.commissionType, 0);
          if (this.planInfo.chargePrice !== 0) {
            if (selectId === 6) {
              allCommission.push({ commission_id: selectId, percentage: this.planInfo.chargePrice });
            } else {
              allCommission.push({ commission_id: selectId, amount: this.planInfo.chargePrice });
            }
          }
        }
        const params = {
          name: this.planInfo.name,
          demand_id: this.demandInfo.id,
          end_time: this.planInfo.endTime,
          type: this.planInfo.type,
          commissionList: allCommission,
          brokerList: this.planInfo.brokerList,
        };
        this.$refs.planForm.validate((valid) => {
          if (valid) {
            this.$http.post('/plan/add', params).then((response) => {
              if (response.data.errorCode === 10000) {
                this.$message('发布成功');
              } else {
                this.$notify.error({
                  title: `${response.data.moreInfo}`,
                  type: 'success',
                });
              }
            }).catch((err) => {
            });
          }
          return false;
        });
      },
      // ---------人员管理---------
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
        this.$http.post('/talent/updateStatus', params).then((response) => {
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
      // ----格式化表格内容------
      formatStartTime(row, column) {
        const date = new Date(parseInt(row.created_at, 0));
        return util.formatDate.formatUtc(date, 'yyyy-MM-dd hh:mm');
      },
      formatEndTime(row, column) {
        const date = new Date(parseInt(row.end_time, 0));
        return util.formatDate.formatUtc(date, 'yyyy-MM-dd hh:mm');
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
        return util.formatDate.formatUtc(date, 'yyyy-MM-dd hh:mm');
      },
    },
    mounted() {
      this.loading = true;
      this.$http(`/demand/detail?id=${this.$route.params.id}`).then((response) => {
        this.demandInfo = response.data.data;
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
      });
    },
  };
</script>
<style lang="scss" scoped>
  #adminDemandShow {
    .tips {
      border-bottom: 1px solid #bcc4d6;
    }
    .info {
      .el-form-item {
        margin-left: 50px;
      }
    }
    .publish {
      .el-form-item {
        margin-left: 25px;
      }
    }
  }
</style>
