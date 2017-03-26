<template>
  <div id="apply-demand">
    <el-steps :space="240" :active="1" :center=true :align-center=true>
      <el-step title="填写需求表"></el-step>
      <el-step title="招聘前台审核"></el-step>
      <el-step title="招聘前台发布招聘计划"></el-step>
      <el-step title="招聘经纪人提交求职者名单"></el-step>
    </el-steps>
    <el-form ref="applyDemandForm" label-width="100px">
      <h1 class="tips">需求表</h1>
      <el-form-item label="表名：" style="width: 400px;">
        <el-input v-model="demandInfo.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="类型：">
        <el-radio-group v-model="demandInfo.type">
          <el-radio :label="0">兼职</el-radio>
          <el-radio :label="1">全职</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="岗位：" style="width: 300px;">
        <el-input v-model="demandInfo.job" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="申请原因：">
        <el-radio-group v-model="demandInfo.applyReason">
          <el-radio :label="0">离职补缺</el-radio>
          <el-radio :label="1">新增职位</el-radio>
          <el-radio :label="2">业务发展扩编</el-radio>
          <el-radio :label="3">临时补充</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <h1 class="tips">岗位信息</h1>
    <el-form v-if="demandInfo.type === 1" refs="applyDemandForm" :model="demandInfo" label-width="100px">
      <el-form-item label="工种：" style="width: 400px;">
        <el-select v-model="demandInfo.workType" placeholder="请选择">
         <el-option
           v-for="item in staffType"
           :label="item.label"
           :value="item.value">
         </el-option>
       </el-select>
      </el-form-item>
      <el-form-item label="薪资：" style="width: 400px;">
        <el-input v-model="demandInfo.salary" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="结算方式：" style="width: 400px;">
        <el-select v-model="demandInfo.settlementType" placeholder="请选择">
          <el-option
            v-for="item in moneyClearType"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="需求人数：" style="width: 400px;">
         <el-input-number v-model="demandInfo.applyNumber" :min="0" :max="10000"></el-input-number>
      </el-form-item>
      <el-form-item label="到岗时间：" style="width: 400px;">
        <el-input v-model="demandInfo.workTime" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item v-for="interview in demandInfo.listDemandInterview" label="面试时间：">
        <el-col :span="9">
          <el-input v-model="interview.interviewTime" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="3" style="text-align: right;">面试地点：</el-col>
        <el-col :span="12">
          <el-input v-model="interview.interviewAddress" placeholder="请输入内容"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="handleAddInterview">+添加面试安排</el-button>
        <el-button v-if="demandInfo.listDemandInterview.length > 1" type="text" @click="handleDelInterview">-删减面试安排</el-button>
      </el-form-item>
    </el-form>
    <el-form v-if="demandInfo.type === 0" ref="applyDemandForm" :model="demandInfo" label-width="100px">
      <el-form-item label="工种：" style="width: 400px;">
        <el-select v-model="demandInfo.workType" placeholder="请选择">
         <el-option
           v-for="item in staffType"
           :label="item.label"
           :value="item.value">
         </el-option>
       </el-select>
      </el-form-item>
      <el-form-item label="薪资：" style="width: 400px;">
        <el-input v-model="demandInfo.salary" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="结算方式：" style="width: 400px;">
        <el-select v-model="demandInfo.settlementType" placeholder="请选择">
          <el-option
            v-for="item in moneyClearType"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-for="schedule in demandInfo.listSchedulingInformation" label="排班信息：" style="width: 800px;">
        <el-col :span="7">
          <el-date-picker
            v-model="schedule.startTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-col>
        <el-col :span="1">至</el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="schedule.endTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-col>
        <el-col :span="3" style="text-align: left;">需求人数：</el-col>
        <el-col :span="6">
          <el-input-number v-model="schedule.applyNumber" :min="0" :max="10000" style="width: 140px;"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="handleAddSchedule">+添加排班信息</el-button>
        <el-button v-if="demandInfo.listSchedulingInformation.length > 1" type="text" @click="handleDelSchedule">-删减排班信息</el-button>
      </el-form-item>
    </el-form>
    <h1 class="tips">岗位要求</h1>
    <el-form ref="applyDemandForm" :model="demandInfo" label-width="100px">
      <el-form-item label="性别：">
        <el-radio-group v-model="demandInfo.sex">
          <el-radio :label="2">不限</el-radio>
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄：" style="width: 400px;">
        <el-col :span="11">
          <el-form-item prop="minAge" style="width: 100%; margin-left: 0;">
            <el-input-number v-model="demandInfo.minAge" :min="18" :max="demandInfo.maxAge" style="width: 100%;"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center">至</el-col>
        <el-col :span="11">
          <el-form-item prop="maxAge" style="width: 100%; margin-left: 0;">
            <el-input-number v-model="demandInfo.maxAge" :min="demandInfo.minAge" :max="100" style="width: 100%;"></el-input-number>
          </el-form-item>
        </el-col>
     </el-form-item>
      <el-form-item label="学历：">
        <el-select v-model="demandInfo.education" placeholder="请选择">
           <el-option
             v-for="item in degreeType"
             :label="item.label"
             :value="item.value">
           </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业：" style="width: 400px;">
        <el-input v-model="demandInfo.profession" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="婚否：">
        <el-radio-group v-model="demandInfo.isMarry">
          <el-radio :label="2">不限</el-radio>
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="工作经验：">
        <el-select v-model="demandInfo.workExperience" placeholder="请选择">
           <el-option
             v-for="item in workExperience"
             :label="item.label"
             :value="item.value">
           </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="要求内容：">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="demandInfo.request"
          style="width: 400px;">
        </el-input>
      </el-form-item>
    </el-form>
    <h1 class="tips"></h1>
    <el-col :span="11" type="flex" align="center">
      <el-button type="primary" @click="handleSubmit" :loading="publishing">提交申请</el-button>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'applyDemand',
  data() {
    return {
      demandInfo: {
        type: 0,
        title: '',
        job: '',
        applyReason: 0,
        workType: '1',
        settlementType: '1',
        salary: '',
        applyNumber: 0,
        education: '1',
        profession: '',
        minAge: 18,
        maxAge: 100,
        personNum: 0,
        workExperience: '1',
        request: '',
        isMarry: 2,
        sex: 2,
        listDemandInterview: [{
          interviewTime: '',
          interviewAddress: '',
          latitude: 0,
          longitude: 0,
        }],
        listSchedulingInformation: [{
          startTime: '',
          endTime: '',
          applyNumber: 0,
        }],
      },
      publishing: false,
      staffType: [{
        value: '1',
        label: '快递员',
      },
      {
        value: '2',
        label: '物流专员',
      },
      {
        value: '3',
        label: '分拣员',
      },
      {
        value: '4',
        label: '装卸／搬运工',
      },
      {
        value: '5',
        label: '单证员',
      },
      {
        value: '6',
        label: '调度员',
      },
      {
        value: '7',
        label: '物料管理',
      },
      {
        value: '8',
        label: '国际货运',
      },
      {
        value: '9',
        label: '仓库管理员',
      },
      {
        value: '10',
        label: '司机',
      },
      {
        value: '11',
        label: '仓库主管',
      }],
      moneyClearType: [{
        value: '1',
        label: '日结',
      },
      {
        value: '2',
        label: '周结',
      },
      {
        value: '3',
        label: '月结',
      },
      {
        value: '4',
        label: '完工结',
      }],
      degreeType: [{
        value: '1',
        label: '不限',
      },
      {
        value: '2',
        label: '初中',
      },
      {
        value: '3',
        label: '中专技校',
      },
      {
        value: '4',
        label: '高中',
      },
      {
        value: '5',
        label: '大专',
      },
      {
        value: '6',
        label: '本科',
      },
      {
        value: '7',
        label: '硕士及以上',
      }],
      workExperience: [
        {
          label: '不限',
          value: '1',
        },
        {
          label: '1年以下',
          value: '2',
        },
        {
          label: '1-3年',
          value: '3',
        },
        {
          label: '3-5年',
          value: '4',
        },
        {
          label: '6-8年',
          value: '5',
        },
        {
          label: '8-10年',
          value: '6',
        },
        {
          label: '10年以上',
          value: '7',
        }],
    };
  },
  methods: {
    handleAddSchedule() {
      this.demandInfo.listSchedulingInformation.push({ startTime: '', endTime: '', applyNumber: 0 });
    },
    handleDelSchedule() {
      if (this.demandInfo.listSchedulingInformation.length > 1) {
        this.demandInfo.listSchedulingInformation.pop();
      }
    },
    handleAddInterview() {
      this.demandInfo.listDemandInterview.push({ interviewTime: '', interviewAddress: '', latitude: 0, longitude: 0 });
    },
    handleDelInterview() {
      if (this.demandInfo.listDemandInterview.length > 1) {
        this.demandInfo.listDemandInterview.pop();
      }
    },
    handleSubmit() {
      this.$refs.applyDemandForm.validate((valid) => {
        if (valid) {
          this.publishing = false;
          const params = {
            projectId: this.$route.query.id,
            title: this.demandInfo.title,
            type: this.demandInfo.type,
            job: this.demandInfo.job,
            applyReason: this.demandInfo.applyReason,
            workType: this.demandInfo.workType,
            settlementType: this.demandInfo.settlementType,
            salary: this.demandInfo.salary,
            applyNumber: this.demandInfo.applyNumber,
            education: this.demandInfo.education,
            profession: this.demandInfo.profession,
            workExperience: this.demandInfo.workExperience,
            request: this.demandInfo.request,
            sex: this.demandInfo.sex,
            maxAge: this.demandInfo.maxAge,
            minAge: this.demandInfo.minAge,
            workTime: this.demandInfo.workTime,
            isMarry: this.demandInfo.isMarry,
            listDemandInterview: this.demandInfo.listDemandInterview,
            listSchedulingInformation: this.demandInfo.listSchedulingInformation,
          };
          console.log(params);
          this.$http.post('/demand/add', params).then((response) => {
            console.log(response);
          }).catch((error) => {
            console.log(error);
          });
        }
        return false;
      });
    },
  },
  filters: {
    formatScheduleDate(date) {
      return new Date(date);
    },
  },
};
</script>

<style lang="scss" scoped>
#apply-demand {
  position: absolute;
  // border:1px solid #20a0ff;
  right: 0px;
  top: 0px;
  bottom: 0px;
  left: 0px;
  margin: 10px;

  .el-steps {
    margin-top: 40px;
  }
  .el-form-item {
    margin-left: 130px;
  }
  .tips {
    border-bottom: 1px solid #e5e9f2;
  }
}
</style>
