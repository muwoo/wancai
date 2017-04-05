<template>
  <div id="itemEdit">
    <el-form :model="itemPublishInfo" :rules="itemPublishRules" ref="itemPublishForm">
      <h1 class="tips">基本信息</h1>
      <el-form-item label="项目名称：" class="form-item" prop="title">
        <el-input v-model="itemPublishInfo.title" placeholder="请输入内容" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="项目地址：" class="form-item" prop="address">
        <el-input v-model="itemPublishInfo.address" placeholder="请在地图上进行选择" style="width: 400px;"></el-input>
        <el-button v-if="!isMapShow" type='primary' @click="handleShowMap">展开地图</el-button>
        <el-button v-if="isMapShow" type='primary' @click="handleShowMap">收起地图</el-button>
      </el-form-item>
      <div v-if="isMapShow">
        <el-input v-model="mapConfig.keyword" placeholder="搜索地点，并进行选择" style="width: 440px; margin-bottom: 5px;"></el-input>
        <baidu-map class="map-container"
        :scroll-wheel-zoom="true"
        :center="mapConfig.center"
        :zoom="mapConfig.zoom">
          <bm-view class="bm-view">
          </bm-view>
          <bm-local-search
            :keyword="mapConfig.keyword"
            :auto-viewport="true"
            :location="mapConfig.location"
            @infohtmlset="infohtmlset">
          </bm-local-search>
        </baidu-map>
      </div>
      <el-form-item label="项目介绍：" class="form-item" prop="introduction">
        <el-input type="textarea" :rows="2" v-model="itemPublishInfo.introduction" placeholder="请输入内容" style="width: 400px;"></el-input>
      </el-form-item>
      <h1 class="tips">匹配负责人</h1>
      <el-form-item label="招聘前台：" class="form-item" prop="recruitManager.name">
        <span>{{ itemPublishInfo.recruitManager.username }}</span>
        <el-button type="primary" @click="handleFindRecruitManager" size="small">查找</el-button>
      </el-form-item>
      <el-form-item label="项目负责人：" class="form-item" prop="projectManager.name">
        <span>{{ itemPublishInfo.projectManager.name }}</span>
        <el-button type="primary" @click="handleFindProjectManager" size="small">查找</el-button>
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
      <el-button type="primary" @click.native.prevent="handleSubmit" :loading="publishing">确认修改</el-button>
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
    <el-dialog title="选择招聘前台" v-model="findRecruitManager">
      <el-input placeholder="请输入内容" v-model="searchContent">
        <el-select v-model="searchType" slot="prepend" placeholder="请选择" style="width: 150px;">
          <el-option value='1' label='ID'></el-option>
          <el-option value='2' label='姓名'></el-option>
          <el-option value='3' label='身份证'></el-option>
          <el-option value='4' label='手机号'></el-option>
        </el-select>
        <el-button slot="append" icon="search" @click="getSearchRecruit"></el-button>
      </el-input>
      <div class="search-table">
        <el-table :data="searchData">
          <el-table-column property="id" label="id"></el-table-column>
          <el-table-column property="username" label="姓名"></el-table-column>
          <el-table-column property="idCard" label="身份证" width="200"></el-table-column>
          <el-table-column property="phone" label="手机"  width="200"></el-table-column>
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
    <el-dialog title="选择项目负责人" v-model="findProjectManager">
      <el-input placeholder="请输入内容" v-model="searchContent">
        <el-select v-model="searchType" slot="prepend" placeholder="请选择" style="width: 150px;">
          <el-option value='1' label='ID'></el-option>
          <el-option value='2' label='姓名'></el-option>
          <el-option value='3' label='身份证'></el-option>
          <el-option value='4' label='手机号'></el-option>
        </el-select>
        <el-button slot="append" icon="search" @click="getSearchProject"></el-button>
      </el-input>
      <div class="search-table">
        <el-table :data="searchData" v-loading="loading">
          <el-table-column property="id" label="id"></el-table-column>
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column property="idCard" label="身份证" width="200"></el-table-column>
          <el-table-column property="phone" label="手机"  width="200"></el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleConfirmProjectManager(scope.$index, scope.row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col :span="24" style="margin-top:10px;">
          <el-pagination layout="prev, pager, next" @current-change="handlePageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
        </el-col>
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
        id: '',
        title: '',
        address: '',
        latitude: 30.2419557,
        longitude: 120.1273834,
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
      mapConfig: {
        location: '',
        keyword: '',
        center: { lng: 120.1273834, lat: 30.2419557 },
        zoom: 12,
      },
      currentPage: 1,
      pageSize: 20,
      pageCount: 0,
      loading: false,
      searchData: [],
      isProfitRateEdit: false,
      editTeamOfGroupVisible: false,
      publishing: false,
      findRecruitManager: false,
      findProjectManager: false,
      searchContent: '',
      searchType: '1',
      isMapShow: false,
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
    infohtmlset(poi) {
      this.itemPublishInfo.address = `${poi.city}${poi.address}${poi.title}`;
      this.itemPublishInfo.latitude = poi.point.lat;
      this.itemPublishInfo.longitude = poi.point.lng;
      this.isMapShow = false;
    },
    handleShowMap() {
      this.isMapShow = !this.isMapShow;
    },
    handleSubmit() {
      this.$refs.itemPublishForm.validate((valid) => {
        if (valid) {
          this.publishing = true;
          console.log(this.projectManager);
          this.$http.post('/project/modify', {
            id: this.itemPublishInfo.id,
            managerId: this.itemPublishInfo.projectManager.id,
            recruitFronts: this.itemPublishInfo.recruitManager.id,
            title: this.itemPublishInfo.title,
            address: this.itemPublishInfo.address,
            introduction: this.itemPublishInfo.introduction,
            longitude: this.itemPublishInfo.longitude,
            latitude: this.itemPublishInfo.latitude,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((response) => {
            console.log(response);
            // eslint-disable-next-line
            console.log(response.data);
            const { error, errorCode, moreInfo } = response.data;
            if (errorCode === 10000) {
              this.$message({
                message: '修改成功',
                type: 'success',
              });
              this.$router.push({ name: 'adminItemList' });
            } else {
              this.$notify.error({
                title: `${moreInfo}`,
                type: 'success',
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
    handlePageChange(val) {
      if (this.findProjectManager) {
        this.currentPage = val;
        this.getSearchProject();
      }
      if (this.findRecruitManager) {
        this.currentPage = val;
        this.getSearchRecruit();
      }
    },
    handleFindProjectManager() {
      this.findProjectManager = true;
      this.searchData = [];
      this.getSearchProject();
    },
    handleFindRecruitManager() {
      this.findRecruitManager = true;
      this.searchData = [];
      this.getSearchRecruit();
    },
    getSearchRecruit() {
      this.searchData = [];
      let idData = '';
      let idCardData = '';
      let nameData = '';
      let telphoneData = '';
      if (this.searchType === '1') {
        idData = this.searchContent;
      } else if (this.searchType === '2') {
        nameData = this.searchContent;
      } else if (this.searchType === '3') {
        idCardData = this.searchContent;
      } else if (this.searchType === '4') {
        telphoneData = this.searchContent;
      }
      const params = {
        rolesId: 4,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        id: idData,
        idCard: idCardData,
        name: nameData,
        phone: telphoneData,
      };
      this.loading = true;
      this.$http.post('/admin/user/list', params).then((response) => {
        const {
          data: {
            list, pages, total, pageNum,
          },
        } = response.data;
        this.currentPage = pageNum;
        this.pageCount = pages;
        this.searchData = list;
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
      });
    },
    getSearchProject() {
      this.searchData = [];
      let idData = '';
      let idCardData = '';
      let nameData = '';
      let telphoneData = '';
      if (this.searchType === '1') {
        idData = this.searchContent;
      } else if (this.searchType === '2') {
        nameData = this.searchContent;
      } else if (this.searchType === '3') {
        idCardData = this.searchContent;
      } else if (this.searchType === '4') {
        telphoneData = this.searchContent;
      }
      const params = {
        status: 0,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        id: idData,
        idCard: idCardData,
        name: nameData,
        phone: telphoneData,
      };
      this.loading = true;
      this.$http.post('/manager/list', params).then((response) => {
        const {
          data: {
            list, pages, total, pageNum,
          },
        } = response.data;
        this.currentPage = pageNum;
        this.pageCount = pages;
        this.searchData = list;
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
      });
    },
    handleConfirmProjectManager(index, row) {
      this.itemPublishInfo.projectManager = row;
      this.findProjectManager = false;
    },
    handleConfirmRecruitManager(index, row) {
      this.itemPublishInfo.recruitManager = row;
      this.findRecruitManager = false;
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
              title, address, introduction, projectManager, recruitManager,
            },
          } = response.data;
          // console.log(data);
          this.itemPublishInfo.title = title;
          this.itemPublishInfo.address = address;
          this.itemPublishInfo.introduction = introduction;
          this.itemPublishInfo.projectManager = projectManager;
          this.itemPublishInfo.recruitManager = recruitManager;
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
#itemEdit {
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
  .map-container {
    .bm-view {
      width: 100%;
      height: 400px;
    }
  }
}
</style>
