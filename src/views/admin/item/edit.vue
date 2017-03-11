<template>
  <div id="itemPublish" v-loading="loading">
    <el-form :model="itemPublishInfo" :rules="itemPublishRules" ref="itemPublishForm">
      <h1 class="tips">基本信息</h1>
      <el-form-item label="项目名称：" class="form-item" prop="title">
        <el-input v-model="itemPublishInfo.title" placeholder="请输入内容" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="项目地址：" class="form-item" prop="address">
        <el-input v-model="itemPublishInfo.address" placeholder="请输入内容" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="项目介绍：" class="form-item" prop="introduction">
        <el-input type="textarea" :rows="2" v-model="itemPublishInfo.introduction" placeholder="请输入内容" style="width: 400px;"></el-input>
      </el-form-item>
      <h1 class="tips">匹配负责人</h1>
      <el-form-item label="招聘前台：" class="form-item" prop="recruitManager.name">
        <span>{{ itemPublishInfo.recruitManager.name }}</span>
        <el-button type="primary" @click="handleFindRecruitManager">查找</el-button>
      </el-form-item>
      <el-form-item label="项目负责人：" class="form-item" prop="projectManager.name">
        <span>{{ itemPublishInfo.projectManager.name }}</span>
        <el-button type="primary" @click="handleFindProjectManager">查找</el-button>
      </el-form-item>
      <h1 class="tips"></h1>
      <el-form-item style="width: 500px;">
        <el-button type="primary" @click.native.prevent="handleSubmit" :loading="publishing">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'itemEdit',
    data() {
      return {
        itemPublishInfo: {
          id: '',
          title: '',
          address: '',
          introduction: '',
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
        loading: false,
        itemPublishRules: {
          title: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入项目地址', trigger: 'blur' },
          ],
          introduction: [
            { required: true, message: '请输入项目描述', trigger: 'blur' },
          ],
          // recruitManager: [
          //   { required: true, message: '请选择招聘前台', trigger: 'blur' },
          // ],
          // projectManager: [
          //   { required: true, message: '请选择项目经理', trigger: 'blur' },
          // ],
        },
      };
    },
    methods: {
      handleFindRecruitManager() {

      },
      handleFindProjectManager() {

      },
      handleSubmit() {
        this.$refs.itemPublishForm.validate((valid) => {
          if (valid) {
            this.publishing = true;
            this.$http.post('project/modify', {
              id: this.itemPublishInfo.id,
              managerId: 1,
              recruitFronts: 1,
              title: this.itemPublishInfo.itemName,
              address: this.itemPublishInfo.address,
              introduction: this.itemPublishInfo.introduction,
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            }).then((response) => {
              console.log(response);
              // eslint-disable-next-line
              const { error, errorCode, moreInfo } = response.data;
              if (errorCode === 10000) {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                });
                this.getProject();
                // this.$router.push('list');
              } else {
                this.$message({
                  message: '修改失败',
                  type: 'danger',
                });
              }
              this.publishing = false;
            }).catch((error) => {
              this.publishing = false;
              console.log(error);
            });
          }
          return false;
        });
      },
      getProject() {
        const id = this.$route.params.id;
        this.itemPublishInfo.id = id;
        this.loading = true;
        this.$http.get(`project/detail?id=${id}`).then((response) => {
          console.log(response);
          if (response.data.errorCode === 10000) {
            const {
              data: {
                title, address, introduction,
              },
            } = response.data;
            // console.log(data);
            this.itemPublishInfo.title = title;
            this.itemPublishInfo.address = address;
            this.itemPublishInfo.introduction = introduction;
          } else {
            // 获取数据异常，跳回list界面
          }
          this.loading = false;
        }).catch((error) => {
          this.loading = false;
          this.$message.error('数据异常');
        });
      },
    },
    mounted() {
      this.getProject();
    },
  };
</script>
<style lang="scss" scoped>
</style>
