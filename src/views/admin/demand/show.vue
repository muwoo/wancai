<template>
  <div id="adminDemandShow">
    <h4>隶属，项目ID: {{demandInfo.projectId}}，项目名称：{{demandInfo.projectTitle}}</h4>
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
      <el-tab-pane label="发布计划" name="second">
        <el-form :model="planInfo" lable-width="200px" :rules="planRules" ref="planForm" class="publish">
          <el-form-item label='计划名称：' prop="name">
            <el-input v-model="planInfo.name" placeholder="请输入内容" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label='提交（元）：' prop="name">
            <el-input-number v-model="planInfo.submitPrice" :min="0" :max="100000" style="width: 150px;"></el-input-number>
          </el-form-item>
          <el-form-item label='到面（元）：' prop="name">
            <el-input-number v-model="planInfo.interviewAlreadyPrice" :min="0" :max="100000" style="width: 150px;"></el-input-number>
          </el-form-item>
          <el-form-item label='面过（元）：' prop="name">
            <el-input-number v-model="planInfo.interviewSuccessPrice" :min="0" :max="100000" style="width: 150px;"></el-input-number>
          </el-form-item>
          <el-form-item label='入职（元）：' prop="name">
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
          <el-form-item label='提成方式：' prop="name">
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
          <el-form-item label='截止日期：'prop="name">
            <el-date-picker
              v-model="planInfo.endTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handlePublishPlan(0)">发布普通计划</el-button>
          </el-form-item>
          <el-form-item label='定向经纪人：'prop="name">
            <el-tag v-for="(man, index) in planInfo.brokerList" :closable="true" type="primary" @close="handleCloseBrokerTag(index)">{{man.name}}</el-tag>
            <el-button type="primary" size="small" @click="handleSearchBtn">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handlePublishPlan(1)">发布定向计划</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="人员管理" name="third">
        <el-tabs v-model="defaultUserTab" @tab-click="handleUserTabClick">
          <el-tab-pane label="全部" name="first" v-loading="loading">
            <userInfo v-for="info in users" :userInfo="info"
            :selectVisible="false"
            @handleSetStatus="handleSetStatus()"
            style="margin-top: 10px;" >
            </userInfo>
            <!-- <el-col :span="24" style="margin-top:10px;">
              <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
            </el-col> -->
          </el-tab-pane>
          <el-tab-pane label="待确认" name="second" v-loading="loading">
            <!-- <userInfo v-for="info in users" :userInfo="info"
            :selectVisible="false"
            @handleSetStatus="handleSetStatus()"
            style="margin-top: 10px;" >
            </userInfo> -->
          </el-tab-pane>
          <el-tab-pane v-if="demandInfo.workType == 1" label="待面试" name="third" v-loading="loading">
            <!-- <userInfo v-for="info in users" :userInfo="info"
            :selectVisible="false"
            @handleSetStatus="handleSetStatus()"
            style="margin-top: 10px;" >
            </userInfo> -->
          </el-tab-pane>
          <el-tab-pane v-else label="待考勤" name="third">
            <!-- <userInfo v-for="info in users" :userInfo="info"
            :selectVisible="false"
            @handleSetStatus="handleSetStatus()"
            style="margin-top: 10px;" >
            </userInfo> -->
          </el-tab-pane>
          <el-tab-pane v-if="demandInfo.workType == 1" label="待入职" name="fourth" v-loading="loading">
            <!-- <userInfo v-for="info in users" :userInfo="info"
            :selectVisible="false"
            @handleSetStatus="handleSetStatus()"
            style="margin-top: 10px;" >
            </userInfo> -->
          </el-tab-pane>
          <el-tab-pane v-else label="已考勤" name="fourth" v-loading="loading">
            <!-- <userInfo v-for="info in users" :userInfo="info"
            :selectVisible="false"
            @handleSetStatus="handleSetStatus()"
            style="margin-top: 10px;" >
            </userInfo> -->
          </el-tab-pane>
          <el-tab-pane v-if="demandInfo.workType == 1" label="已结束" name="fifth" v-loading="loading">
            <!-- <userInfo v-for="info in users" :userInfo="info"
            :selectVisible="false"
            @handleSetStatus="handleSetStatus()"
            style="margin-top: 10px;" >
            </userInfo> -->
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="招聘计划" name="fourth">
        <el-table
         :data="plans"
         border
         style="width: 100%">
         <el-table-column type="expand">
           <template scope="props">
             <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="定向人数">
                  <span>{{ props.row.type }}</span>
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
            prop="title">
          </el-table-column>
          <el-table-column
            label="类型"
            width="100"
            align="center"
            :formatter="formatType"
            prop="type">
          </el-table-column>
          <el-table-column
            label="发布时间"
            width="180"
            align="center"
            :formatter="formatStartTime"
            prop="type">
          </el-table-column>
          <el-table-column
            label="截止时间"
            width="180"
            align="center"
            :formatter="formatEndTime"
            prop="type">
          </el-table-column>
          <el-table-column
            label="招聘人数"
            width="100"
            align="center"
            prop="type">
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
            align="center"
            width="200">
            <template scope="scope">
              <el-button
                v-if="scope.row.status === 0"
                size="small"
                @click="handleRefush(scope.$index, scope.row)">刷新</el-button>
              <el-button
                v-if="scope.row.status === 0"
                size="small"
                @click="handleEarlyEnd(scope.$index, scope.row)">提前结束</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        <el-col :span="24" style="margin-top:10px;">
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
          // {
          //   id: 1,
          //   name: '周潇',
          //   idCard: '32145123123',
          //   telphone: '12412312',
          // },
          // {
          //   id: 1,
          //   name: '张三',
          //   idCard: '32145123123',
          //   telphone: '12412312',
          // },
          // {
          //   id: 1,
          //   name: '李四',
          //   idCard: '32145123123',
          //   telphone: '12412312',
          // }
          searchContent: '',
          searchType: '1',
          loading: false,
        },
        defaultTab: 'first',
        defaultUserTab: 'first',
        plans: [{
          id: 1,
          title: 'title_name',
          type: 1,
          startTime: 1489926599000,
          endTime: 1489926599000,
          status: 0,
        },
        {
          id: 1,
          title: 'title_name',
          type: 1,
          startTime: 1489926599000,
          endTime: 1489926599000,
          status: 1,
        }],
        users: [],
        currentPage: 1,
        pageSize: 20,
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
      };
    },
    components: {
      userInfo,
    },
    methods: {
      handleTabClick(val) {
        if (val.name === 'first') {
          console.log('first');
        } else if (val.name === 'second') {
          console.log('second');
        } else if (val.name === 'third') {
          this.getUsers();
        } else if (val.name === 'fourth') {
          // this.getPlans();
        }
      },
      // 计划刷新
      handleRefush(row, column) {

      },
      // 计划提前结束
      handleEarlyEnd(row, column) {

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
        if (val.name === 'first') {
          this.getUsers();
        } else if (val.name === 'second') {
          this.getUsers(0);
        } else if (val.name === 'third') {
          this.getUsers(1);
        } else if (val.name === 'fourth') {
          this.getUsers(2);
        } else if (val.name === 'fifth') {
          this.getUsers(3);
        }
      },
      // 发布计划
      handleConfirmBroker(index, row) {
        this.planInfo.brokerList.push({ broker_id: row.id, name: row.name });
        this.planInfo.brokerSearchData.splice(index, 1);
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
          pageNum: 1,
          pageSize: 20,
          id: idData,
          idCard: idCardData,
          name: nameData,
          telphone: telphoneData,
        };
        this.planInfo.loading = false;
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
        this.$http.get(`/plan/common/list?pageNum=${1}&pageSize=${10}`).then((response) => {
          console.log(response);
        });
      },
      getUsers(userStatus = '') {
        const params = {
          talentStatus: userStatus,
          demandId: this.demandInfo.id,
          pageNum: 1,
          pageSize: 10,
        };
        this.loading = true;
        this.$http.post('/demand/talent/list', params).then((response) => {
          const {
            data: {
              list, pages, total, pageNum,
            },
          } = response.data;
          this.totalProjectSize = total;
          this.currentPage = pageNum;
          this.pageCount = pages;
          this.users = list;
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
            allCommission.push({ commission_id: selectId, amount: this.planInfo.chargePrice });
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
        this.$http.post('/plan/add', params).then((response) => {
          console.log(response);
        }).catch((err) => {

        });
      },
      // ----格式化表格内容------
      formatStartTime(row, column) {
        const date = new Date(parseInt(row.startTime, 0));
        return util.formatDate.format(date, 'yyyy-MM-dd hh:mm');
      },
      formatEndTime(row, column) {
        const date = new Date(parseInt(row.endTime, 0));
        return util.formatDate.format(date, 'yyyy-MM-dd hh:mm');
      },
      formatPlanStatus(row, column) {
        if (row.status === 0) {
          return '发布中';
        } else if (row.status === 1) {
          return '已过期';
        }
        return '';
      },
      formatType(row, column) {
        return row.status === 1 ? '全职' : '兼职';
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
        return util.formatDate.format(date, 'yyyy-MM-dd hh:mm');
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
