<template>
  <div id="itemPublish">
    <el-form :model="itemPublishInfo" :rules="itemPublishRules" ref="itemPublishForm">
      <h1 class="tips">基本信息</h1>
      <el-form-item label="项目名称：" class="form-item" prop="itemName">
        <el-input v-model="itemPublishInfo.itemName" placeholder="请输入内容" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="项目地址：" class="form-item" prop="address">
        <el-input v-model="itemPublishInfo.address" placeholder="请输入内容" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="项目介绍：" class="form-item" prop="description">
        <el-input type="textarea" :rows="2" v-model="itemPublishInfo.description" placeholder="请输入内容" style="width: 400px;"></el-input>
      </el-form-item>
      <h1 class="tips">匹配负责人</h1>
      <el-form-item label="招聘前台：" class="form-item" prop="recruitManager">
        <span>{{ itemPublishInfo.recruitManager }}</span>
        <el-button type="primary" @click="handleFindRecruitManager">查找</el-button>
      </el-form-item>
      <el-form-item label="项目负责人：" class="form-item" prop="projectManager">
        <span>{{ itemPublishInfo.projectManager }}</span>
        <el-button type="primary" @click="handleFindProjectManager">查找</el-button>
      </el-form-item>
      <!-- <h1 class="tips">财务设置</h1>
      <el-form-item label="利润提成（%）：" style="width: 500px;">
        <template v-if="isProfitRateEdit">
          <el-input v-model="itemPublishInfo.profitRate"  type="number" style="width: 100px;"></el-input>
          <el-button type="primary" @click.prevent="handleEditProfitRate">确认</el-button>
        </template>
        <template v-else>
          <span>{{ itemPublishInfo.profitRate }}</span>
          <el-button type="primary" @click.prevent="handleEditProfitRate">修改</el-button>
        </template>
      </el-form-item>
      <el-form-item label="公司分成比例（%）：" style="width: 500px;">
        <el-input-number v-model="itemPublishInfo.shareRate" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="风险激励金总额（元）：" style="width: 500px;">
        <el-input-number v-model="itemPublishInfo.riskIncentives" :min="0" :max="999999"></el-input-number>
      </el-form-item>
      <el-form-item label="月缴纳比例（%）：" style="width: 500px;">
        <el-input-number v-model="itemPublishInfo.monthPaymentRate" :min="0" :max="100"></el-input-number>
      </el-form-item>
    <h1 class="tips">班组设置</h1>
    <template>
      <el-form-item style="width: 100%;">
        <el-table
          :data="itemPublishInfo.teamOfGroupData"
          :border='true'
          style="width: 970px">
          <el-table-column
            prop="oneLevelJob"
            label="一级岗位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="twoLevelJob"
            label="二级岗位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="incomeMode"
            label="收入模式"
            width="120">
          </el-table-column>
          <el-table-column
            prop="getOrderPrice"
            label="接单价"
            width="120">
          </el-table-column>
          <el-table-column
            prop="giveOrderPrice"
            label="放单价"
            width="120">
          </el-table-column>
          <el-table-column
            prop="lastEditTimeAt"
            label="最后修改时间"
            width="200">
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleTeamOfGroupEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleTeamOfGroupDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="text" @click="editTeamOfGroupVisible = true">添加班组</el-button>
      </el-form-item>
    </template> -->
    <h1 class="tips"></h1>
    <el-form-item style="width: 500px;">
      <el-button type="primary" @click.native.prevent="handleSubmit" :loading="publishing">确认新建</el-button>
    </el-form-item>
    </el-form>
     <!-- 添加班组界面 -->
    <!-- <el-dialog title="添加班组" v-model="editTeamOfGroupVisible">
      <el-form :model="editTeamOfGroupForm">
        <el-form-item label="一级岗位">
          <el-input v-model="editTeamOfGroupForm.oneLevelJob" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="二级岗位">
          <el-input v-model="editTeamOfGroupForm.twoLevelJob" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="二级岗位" :label-width="120">
          <el-select v-model="editTeamOfGroupForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收入模式" >
          <el-input v-model="editTeamOfGroupForm.incomeMode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="接单价" >
          <el-input v-model="editTeamOfGroupForm.getOrderPrice" type="number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="放单价" :label-width="120">
          <el-input v-model="editTeamOfGroupForm.giveOrderPrice" type="number" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editTeamOfGroupVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTeamOfGroupVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->
    <el-dialog title="选择负责人" v-model="findRecruitManager">
      <el-input placeholder="请输入内容" v-model="searchContent">
        <el-select v-model="searchType" slot="prepend" placeholder="请选择" style="width: 200px;">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="search" @click="handleSearch"></el-button>
      </el-input>
      <div class="search-table">
        <el-table :data="RecruitManagerSearchData">
          <el-table-column property="id" label="id"></el-table-column>
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column property="idCardNumber" label="身份证" width="200"></el-table-column>
          <el-table-column property="phoneNumber" label="手机"></el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleConfirmRecruitManager(scope.$index, scope.row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog title="选择负责人" v-model="findProjectManager">
      <el-input placeholder="请输入内容" v-model="searchContent">
        <el-select v-model="searchType" slot="prepend" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="search" @click="handleSearch"></el-button>
      </el-input>
      <div class="search-table">
        <el-table :data="ProjectManagerSearchData">
          <el-table-column property="id" label="id"></el-table-column>
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column property="idCardNumber" label="身份证" width="200"></el-table-column>
          <el-table-column property="phoneNumber" label="手机" width="200"></el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleConfirmProjectManager(scope.$index, scope.row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'itemNew',
  data() {
    return {
      itemPublishInfo: {
        itemName: '',
        address: '',
        description: '',
        recruitManager: '',
        projectManager: '',
        profitRate: 100,
        shareRate: 0,
        riskIncentives: 0,
        monthPaymentRate: 0,
        teamOfGroupData: [{
          oneLevelJob: '接单员',
          twoLevelJob: '分拣员',
          incomeMode: '计件',
          getOrderPrice: 22,
          giveOrderPrice: 19,
          lastEditTimeAt: new Date(parseInt(Date.now(), 10)).toLocaleString().replace(/:\d{1,2}$/, ' '),
        }],
      },
      editTeamOfGroupForm: {
        id: 0,
        oneLevelJob: '',
        twoLevelJob: '',
        incomeMode: '',
        getOrderPrice: 0,
        giveOrderPrice: 0,
      },
      RecruitManagerSearchData: [{
        id: 1,
        name: '李四',
        idCardNumber: 123211233341232213,
        phoneNumber: 183549123,
      }],
      ProjectManagerSearchData: [{
        id: 1,
        name: '张三',
        idCardNumber: 384123413123123123,
        phoneNumber: 183549123,
      }],
      isProfitRateEdit: false,
      editTeamOfGroupVisible: false,
      publishing: false,
      findRecruitManager: false,
      findProjectManager: false,
      searchContent: '',
      searchType: '',
      itemPublishRules: {
        itemName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入项目地址', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入项目描述', trigger: 'blur' },
        ],
        recruitManager: [
          { required: true, message: '请选择招聘前台', trigger: 'blur' },
        ],
        projectManager: [
          { required: true, message: '请选择项目经理', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    // handleEditProfitRate() {
    //   this.isProfitRateEdit = !this.isProfitRateEdit;
    //   if (this.itemPublishInfo.profitRate > 100 || this.itemPublishInfo.profitRate === '') {
    //     this.itemPublishInfo.profitRate = 100;
    //   } else if (this.itemPublishInfo.profitRate < 0) {
    //     this.itemPublishInfo.profitRate = 0;
    //   }
    // },
    // handleTeamOfGroupEdit(index, row) {
    //   console.log(index);
    //   console.log(row);
    // },
    // handleTeamOfGroupDelete(index, row) {
    //   console.log(index);
    //   console.log(row);
    // },
    handleSubmit() {
      this.$refs.itemPublishForm.validate((valid) => {
        if (valid) {
          this.publishing = true;
        }
        return false;
      });
    },
    handleFindProjectManager() {
      this.findProjectManager = true;
    },
    handleFindRecruitManager() {
      this.findRecruitManager = true;
    },
    handleSearch() {
      this.$message('search content');
    },
    handleConfirmProjectManager(index, row) {
      this.itemPublishInfo.projectManager = row.name;
      this.findProjectManager = false;
    },
    handleConfirmRecruitManager(index, row) {
      this.itemPublishInfo.recruitManager = row.name;
      this.findRecruitManager = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#itemPublish {
  .tips {
    border-bottom: 1px solid #e5e9f2;
  }
  .form-item {
    width: 600px;
    margin-left: 100px;
  }
  .search-table {
    margin-top: 30px;
    height: 340px;
    overflow-y: scroll;
  }
}
</style>
