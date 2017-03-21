<template>
  <div id="adminDemandShow">
    <h4>项目ID: {{demandInfo.id}}，项目名称：{{demandInfo.projectTitle}}</h4>
    <el-tabs v-model="defaultTab" type="card" @tab-click="handleTabClick">
      <el-tab-pane label="需求信息" name="first">
        <el-form class="info" lable-width="200px" :model="demandInfo">
          <h3 class="tips">岗位信息</h3>
          <el-form-item label="岗位类型：">{{ demandInfo.workType }}</el-form-item>
          <el-form-item label="工种：">{{ demandInfo.workType }}</el-form-item>
          <el-form-item label="薪资：">{{ demandInfo.workType }}</el-form-item>
          <el-form-item label="结算方式：">{{ demandInfo.workType }}</el-form-item>
          <el-form-item label="需求人数：">{{ demandInfo.workType }}</el-form-item>
          <el-form-item label="到岗时间：">{{ demandInfo.workType }}</el-form-item>
          <h3 class="tips">岗位要求</h3>
          <el-form-item label="性别：">{{ demandInfo.workType }}</el-form-item>
          <el-form-item label="年龄：">{{ demandInfo.workType }}</el-form-item>
          <el-form-item label="学历：">{{ demandInfo.workType }}</el-form-item>
          <el-form-item label="专业：">{{ demandInfo.workType }}</el-form-item>
          <el-form-item label="婚否：">{{ demandInfo.workType }}</el-form-item>
          <el-form-item label="工作经验：">{{ demandInfo.workType }}</el-form-item>
          <el-form-item label="工作要求：">{{ demandInfo.workType }}</el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="发布计划" name="second">
        <el-form :model="planInfo" lable-width="200px" ref="planInfoForm">
          <el-form-item label='计划名称：' prop="name">
            <el-input v-model="planInfo.name" placeholder="请输入内容" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item v-for="scheme in planInfo.schemes" label='佣金方案：'prop="name">
            <el-col :span="3">
              <el-select v-model="scheme.type" placeholder="请选择">
                <el-option
                  v-for="type in schemeType"
                  :label="type.label"
                  :value="type.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="1" style="text-align: center;">至</el-col>
            <el-col :span="6">
               <el-input-number v-model="scheme.num" :min="1" :max="100000"></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="text" @click="handleAddScheme">+添加方案</el-button>
            <el-button v-if="planInfo.schemes.length > 1" type="text" @click="handleDelScheme">-删减方案</el-button>
          </el-form-item>
          <el-form-item label='起始日期：'prop="name">
            <el-col :span="4">
              <el-date-picker
                v-model="planInfo.startTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-col>
            <el-col :span="1" style="text-align: center;">至</el-col>
            <el-col :span="4">
              <el-date-picker
                v-model="planInfo.endTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">发布普通计划</el-button>
          </el-form-item>
          <el-form-item label='定向经纪人：'prop="name">
            <el-button type="primary" size="small">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">发布定向计划</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="人员管理" name="third">人员管理</el-tab-pane>
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
  </div>
</template>
<script>
  import util from '../../../common/util';

  export default {
    name: 'adminDemandShow',
    data() {
      return {
        demandInfo: {
          id: '',
          projectTitle: '',
          workType: 1,
        },
        planInfo: {
          name: '',
          schemes: [{
            type: '1',
            num: 1,
          }],
        },
        defaultTab: 'first',
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
        currentPage: 1,
        pageSize: 20,
        pageCount: 0,
        loading: false,
        schemeType: [{
          value: '0',
          label: '月结',
        },
        {
          value: '1',
          label: '周结',
        },
        {
          value: '',
          label: '不限',
        }],
      };
    },
    methods: {
      handleTabClick(val) {
        if (val.name === 'first') {
          console.log('first');
        } else if (val.name === 'second') {
          console.log('second');
        } else if (val.name === 'third') {
          console.log('third');
        } else if (val.name === 'fourth') {
          // this.getPlans();
        }
      },
      getPlans() {
        this.$http.get(`/plan/common/list?pageNum=${1}&pageSize=${10}`).then((response) => {
          console.log(response);
        });
      },
      // 计划刷新
      handleRefush(row, column) {

      },
      // 计划提前结束
      handleEarlyEnd(row, column) {

      },
      // 添加方案
      handleAddScheme() {
        this.planInfo.schemes.push({ type: '1', num: 1 });
      },
      // 删减方案
      handleDelScheme() {
        if (this.planInfo.schemes.length > 1) {
          this.planInfo.schemes.pop();
        }
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
    mounted() {
      this.$http(`/demand/detail?id=${this.$route.params.id}`).then((response) => {
        if (response.data.errorCode === 10000) {
          this.demandInfo = response.data.data;
        }
      });
    },
  };
</script>
<style lang="scss" scoped>
  #adminDemandShow {
    .tips {
      border-bottom: 1px solid #e5e9f2;
    }
    .info {
      .el-form-item {
        margin-left: 50px;
      }
    }
  }
</style>
