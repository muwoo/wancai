<template>
  <div id="apply-demand">
    <el-steps :space="240" :active="1" :center=true :align-center=true>
      <el-step title="填写需求表"></el-step>
      <el-step title="招聘前台审核"></el-step>
      <el-step title="招聘前台发布招聘计划"></el-step>
      <el-step title="招聘经纪人提交求职者名单"></el-step>
    </el-steps>
    00px" :model="demandI    <el-form ref="form" label-width="1nfo">
      <h1 class="tips">需求表</h1>
      <el-form-item label="表名：" style="width: 400px;">
        <el-input v-model="demandInfo.tableName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="类型：">
        <el-radio-group v-model="demandInfo.workType" @change="handleWorkTypeChange">
          <el-radio :label="0">兼职</el-radio>
          <el-radio :label="1">全职</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="岗位：" style="width: 300px;">
        <el-input v-model="demandInfo.workName" placeholder="请输入内容"></el-input>
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
    <el-form v-if="isFullTime" refs="form" :model="demandInfo" label-width="100px">
      <el-form-item label="工种：" style="width: 400px;">
        <el-select v-model="demandInfo.profession" placeholder="请选择">
         <el-option
           v-for="item in staffType"
           :label="item.label"
           :value="item.value">
         </el-option>
       </el-select>
      </el-form-item>
      <el-form-item label="薪资：" style="width: 400px;">
        <el-input v-model="demandInfo.money" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="结算方式：" style="width: 400px;">
        <el-select v-model="demandInfo.clearType" placeholder="请选择">
          <el-option
            v-for="item in moneyClearType"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="需求人数：" style="width: 400px;">
         <el-input-number v-model="demandInfo.needStaffNum" :min="0" :max="10000"></el-input-number>
      </el-form-item>
      <el-form-item label="到岗时间：" style="width: 400px;">
        <el-input v-model="demandInfo.reportTime" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="面试时间：" style="width: 400px;">
        <el-input v-model="demandInfo.interviewTime" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <el-form v-if="isPartTime" refs="form" :model="demandInfo" label-width="100px">
      <el-form-item label="工种：" style="width: 400px;">
        <el-select v-model="demandInfo.profession" placeholder="请选择">
         <el-option
           v-for="item in staffType"
           :label="item.label"
           :value="item.value">
         </el-option>
       </el-select>
      </el-form-item>
      <el-form-item label="薪资：" style="width: 400px;">
        <el-input v-model="demandInfo.money" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="结算方式：" style="width: 400px;">
        <el-select v-model="demandInfo.clearType" placeholder="请选择">
          <el-option
            v-for="item in moneyClearType"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排班信息：" style="width: 800px;">
        <el-col :span="13">
          <el-date-picker
            v-model="demandInfo.partTimeDate"
            type="datetimerange"
            placeholder="选择时间范围">
          </el-date-picker>
        </el-col>
        <el-col :span="3" style="text-align: left;">需求人数：</el-col>
        <el-col :span="8">
          <el-input-number v-model="demandInfo.minOld" :min="0" :max="10000" style="width: 140px;"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="text">+添加排班信息</el-button>
        <el-button type="text">-删减排班信息</el-button>
      </el-form-item>
    </el-form>
    <h1 class="tips">岗位要求</h1>
    <el-form ref="form" :model="demandInfo" label-width="100px">
      <el-form-item label="性别：">
        <el-radio-group v-model="demandInfo.sex">
          <el-radio :label="2">不限</el-radio>
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄：" style="width: 400px;">
        <el-col :span="11">
          <el-form-item prop="minOld" style="width: 100%; margin-left: 0;">
            <el-input-number v-model="demandInfo.minOld" :min="18" :max="100" style="width: 100%;"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center">至</el-col>
        <el-col :span="11">
          <el-form-item prop="maxOld" style="width: 100%; margin-left: 0;">
            <el-input-number v-model="demandInfo.maxOld" :min="demandInfo.minOld" :max="100" style="width: 100%;"></el-input-number>
          </el-form-item>
        </el-col>
     </el-form-item>
      <el-form-item label="学历：">
        <el-select v-model="demandInfo.degree" placeholder="请选择" @change="handleDegreeChange">
           <el-option
             v-for="item in degreeType"
             :label="item.label"
             :value="item.value">
           </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业：" style="width: 400px;">
          <el-input v-model="demandInfo.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="婚否：">
        <el-radio-group v-model="demandInfo.marryType">
          <el-radio :label="2">不限</el-radio>
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="工作经验：">
        <el-select v-model="demandInfo.experience" placeholder="请选择">
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
          v-model="demandInfo.workContent"
          style="width: 400px;">
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'applyDemand',
  data() {
    return {
      demandInfo: {
        workType: 0,
        titile: '',
        applyReason: 0,
        minOld: 18,
        maxOld: 100,
        degree: '5',
        money: '',
        needStaffNum: 0,
        reportTime: '',
        interviewArea: '',
        interviewTime: '',
        profession: '1',
        clearType: '1',
        workContent: '',
        marryType: 2,
        sex: 2,
        experience: '6',
        partTimeDate: [],
      },
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
        value: '0',
        label: '初中',
      },
      {
        value: '1',
        label: '中专技校',
      },
      {
        value: '2',
        label: '大专',
      },
      {
        value: '3',
        label: '本科',
      },
      {
        value: '4',
        label: '硕士及以上',
      },
      {
        value: '5',
        label: '不限',
      }],
      workExperience: [{
        label: '1年以下',
        value: '0',
      },
      {
        label: '1-3年',
        value: '1',
      },
      {
        label: '3-5年',
        value: '2',
      },
      {
        label: '6-8年',
        value: '3',
      },
      {
        label: '8-10年',
        value: '4',
      },
      {
        label: '10年以上',
        value: '5',
      },
      {
        label: '不限',
        value: '6',
      }],
      isFullTime: false,
      isPartTime: true,
    };
  },
  methods: {
    handleWorkTypeChange(val) {
      if (val === 0) {
        this.isFullTime = false;
        this.isPartTime = true;
      } else {
        this.isFullTime = true;
        this.isPartTime = false;
      }
    },
    handleDegreeChange(val) {
      console.log(this.demandInfo.degree);
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
