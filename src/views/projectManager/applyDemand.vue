<template>
  <div id="apply-demand">
    <el-steps :space="500" :active="1" :center=true :align-center=true>
      <el-step title="填写需求表"></el-step>
      <el-step title="招聘前台审核"></el-step>
      <el-step title="招聘前台发布招聘"></el-step>
    </el-steps>
    <el-form ref="form" :model="demandInfo">
      <el-form-item label="表名" style="width: 500px;">
        <el-input v-model="demandInfo.tableName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="类型：">
        <el-radio-group v-model="demandInfo.workType">
          <el-radio label="兼职"></el-radio>
          <el-radio label="全职"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="岗位：" style="width: 300px;">
        <el-input v-model="demandInfo.workName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="申请原因：">
        <el-radio-group v-model="demandInfo.applyReason">
          <el-radio label="离职补缺"></el-radio>
          <el-radio label="业务发展扩编"></el-radio>
          <el-radio label="临时补充"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-form refs="form" :model="demandInfo" lable-width="80px">
      <el-form-item label="工种">
        <el-select v-model="demandInfo.staffTypeValueDefault" placeholder="请选择">
         <el-option
           v-for="item in demandInfo.staffType"
           :label="item.label"
           :value="item.staffTypeValue">
         </el-option>
       </el-select>
      </el-form-item>
      <el-form-item label="薪资" style="width: 500px;">
        <el-input v-model="demandInfo.money" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="结算方式：">
        <el-select v-model="demandInfo.moneyClearTypeValue" placeholder="请选择">
          <el-option
            v-for="item in demandInfo.moneyClearType"
            :label="item.label"
            :value="item.moneyClearTypeValue">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="需求人数：">
         <el-input-number v-model="demandInfo.needStaffNum" :min="0" :max="10000"></el-input-number>
      </el-form-item>
      <el-form-item label="到岗时间：">
        <el-input v-model="demandInfo.reportTime" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="面试时间：">
        <el-input v-model="demandInfo.interviewTime" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="面试地点：">
        <el-input v-model="demandInfo.interviewArea" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <!-- <el-form ref="form" :model="demandInfo">
      <el-form-item label="性别：">
        <el-radio-group v-model="demandInfo.type">
          <el-radio label="不限"></el-radio>
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄：">
         <el-input-number :min="18" :max="100"></el-input-number>
         <a>至</a>
         <el-input-number :min="18" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="学历：">
        <el-select v-model="value" placeholder="请选择">
           <el-option
             v-for="item in options"
             :label="item.label"
             :value="item.value">
           </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业：">
          <el-input v-model="demandInfo.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="婚否：">
        <el-radio-group v-model="demandInfo.type">
          <el-radio label="不限"></el-radio>
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="工作经验：">
        <el-select v-model="value" placeholder="请选择">
           <el-option
             v-for="item in options"
             :label="item.label"
             :value="item.value">
           </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="1：">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="textarea2">
        </el-input>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
export default {
  name: 'applyDemand',
  data() {
    return {
      demandInfo: {
        workType: '兼职',
        titile: '',
        applyReason: '离职补缺',
        staffType: [{
          staffTypeValue: 1,
          label: '工种1',
        }, {
          staffTypeValue: 2,
          label: '工种2',
        }],
        moneyClearType: [{
          moneyClearTypeValue: 1,
          label: '日结',
        }, {
          moneyClearTypeValue: 2,
          label: '月结',
        }],
        money: '',
        needStaffNum: 0,
        reportTime: '',
        interviewArea: '',
        interviewTime: '',
        staffTypeValueDefault: '1',
        moneyClearTypeValue: '日结',
      },
      workInfo: {

      },
    };
  },
};
</script>

<style lang="scss" scoped>
#apply-demand {
  position: absolute;
  border:1px solid #20a0ff;
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
}
</style>
