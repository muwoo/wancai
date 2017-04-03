<template>
  <div id="projectEmploye">
    <div>
      <!-- <el-button type="primary" v-if="isEditInfo" @click="isEditDialogVisible = true">编 辑</el-button> -->
      <el-button type="primary" v-if="employInfo.isBlacklist == 0" @click="handleAddBlack">加入黑名单</el-button>
    </div>
    <div>
      <img class="image" @click.prevent="handleClickImage" :src="employInfo.idCardPositive"/>
      <!-- <img class="image" v-for="item in employInfo.idCardImages" @click.prevent="handleClickImage" :src="item"/> -->
    </div>
    <div>
      <span>{{ employInfo.name }}</span>
    </div>
    <div>
      <span>{{ employInfo.idCard }}</span>
    </div>
    <div>
      <span>{{ employInfo.sex | formatSex }}</span>
      <span>{{ employInfo.nation }}</span>
    </div>
    <div>
      <span>{{ employInfo.birth }}</span>
    </div>
    <div>
      <span>{{ employInfo.origin }}</span>
    </div>
    <h1 class="tips"></h1>
    <div><span style="font-size: 16px; font-weight: 800;">基本信息</span></div>
    <div>
      <span>电话：</span>
      <span>{{ employInfo.telphone }}</span>
    </div>
    <div>
      <span>学历：</span>
      <span>{{ employInfo.education }}</span>
    </div>
    <div>
      <span>婚姻：</span>
      <span>{{ employInfo.marriage | formatMarry }}</span>
    </div>
    <div>
      <span>健康状况：</span>
      <span>{{ employInfo.healthy | formatHealthy }}</span>
    </div>
    <div>
      <span>常住地址：</span>
      <span>{{ employInfo.address }}</span>
    </div>
    <h1 class="tips"></h1>
    <div><span style="font-size: 16px; font-weight: 800;">工作经历</span></div>
    <div v-for="work in employInfo.listWorkExperience">
      <div>
        <span>工作单位：</span>
        <span>{{ work.company }}</span>
      </div>
      <div>
        <span>职务：</span>
        <span>{{ work.job }}</span>
      </div>
      <div>
        <span>离职原因：</span>
        <span>{{ work.leaveReason }}</span>
      </div>
      <div>
        <span>起止日期：</span>
        <span>{{ work.startTime | formatDate }}</span>
        <span> 至 </span>
        <span>{{ work.endTime | formatDate }}</span>
      </div>
      <div>
        <span>证明人及电话：</span>
        <span>{{ work.witness }}</span>
        <span v-if="work.witnessPhone"> - </span>
        <span>{{ work.witnessPhone }}</span>
      </div>
      <h1 class="tips" v-if="employInfo.listWorkExperience.length > 1"></h1>
    </div>
    <h1 class="tips"></h1>
    <div><span style="font-size: 16px; font-weight: 800;">教育经历</span></div>
    <div v-for="edu in employInfo.listEducationExperience">
      <div>
        <span>学校或培训单位：</span>
        <span>{{ edu.school }}</span>
      </div>
      <div>
        <span>起止日期：</span>
        <span>{{ edu.startTime | formatDate }}</span>
        <span> - </span>
        <span>{{ edu.endTime | formatDate }}</span>
      </div>
      <div>
        <span>专业或课程：</span>
        <span>{{ edu.major }}</span>
      </div>
      <h1 class="tips" v-if="employInfo.listEducationExperience > 1"></h1>
    </div>
    <h1 class="tips"></h1>
    <div>
      <span>名单ID：</span>
      <span>{{ employInfo.id }}</span>
    </div>
    <div>
      <span>提交时间：</span>
      <span>{{ employInfo.createdAt | formatDate }}</span>
    </div>
    <el-dialog title="修改信息" v-model="isEditDialogVisible">
      <div style="height: 440px; overflow-y: scroll;">
        <el-form :model="employInfo" label-width="130px" :rules="employInfoRules" ref="employeInfo">
          <el-form-item label="学历：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="婚否：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="健康状况：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="常住地址：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="工作单位：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="职务：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="离职原因：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="入职日期：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="离职日期：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="证明人：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="学校或培训单位：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="开始日期：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="结束日期：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="专业或课程：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="handleSave" style="margin-top: 20px; text-align: center;">保 存</el-button>
    </el-dialog>
    <bigImage v-model="BigImageVisible" :image="currentImage" :visible="BigImageVisible" @handleWrapperClick="handleBigImageClose"></bigImage>
  </div>

</template>
<script>
  import bigImage from './bigImage';
  import util from '../common/util';

  export default {
    name: 'projectEmploye',
    data() {
      return {
        employInfo: {
          idCardPositive: '',
          name: '赵日天',
          address: '',
          origin: '',
          createdAt: '',
          healthy: '',
          id: '',
          idCard: '',
          isBlacklist: '',
          listEducationExperience: [],
          listFamily: [],
          listWorkExperience: [],
          marriage: '',
          nation: '',
          sex: '',
          telphone: '',
        },
        currentImage: '',
        BigImageVisible: false,
        isEditDialogVisible: false,
        isEditInfo: true,
        employInfoRules: [],
      };
    },
    components: {
      bigImage,
    },
    methods: {
      handleClickImage(evt) {
        this.currentImage = evt.target.src;
        this.BigImageVisible = true;
      },
      handleBigImageClose() {
        this.BigImageVisible = false;
      },
      // 编辑
      handleEdit() {

      },
      // 保存
      handleSave() {

      },
      // 拉黑
      handleAddBlack() {
        this.$http.post(`${this.$managerURL}/talent/updateblacklist?id=${this.employInfo.id}`).then((response) => {
          if (response.data.errorCode === 10000) {
            this.$notify({
              title: '已拉黑',
              type: 'success',
            });
            this.employInfo.isBlacklist = 1;
          } else {
            this.$notify.error({
              title: '拉黑异常',
              type: 'success',
            });
          }
        }).catch((err) => {

        });
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
        return util.formatDate.format(date, 'yyyy-MM-dd');
      },
      formatHealthy(isHealthy) {
        return isHealthy === 1 ? '健康' : '不健康';
      },
    },
    mounted() {
      const id = this.$route.params.id;
      this.$http.get(`${this.$managerURL}/talent/detail?id=${id}`).then((response) => {
        if (response.data.errorCode === 10000) {
          this.employInfo = response.data.data;
        }
      });
    },
  };
</script>
<style lang="scss" scoped>
  #projectEmploye {
    // background: #ECEEF3;
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    left: 0px;
    overflow-y: scroll;
    margin: 10px;
    border: 2px solid #20a0ff;

    display: flex;
    flex-direction: column;

    > div {
      margin-top: 10px;
      margin-left: 38px;
      > img + img {
        margin-left: 10px;
      }
    }
    .el-form {
      > div {
        margin-top: 10px;
        margin-left: 38px;
      }
    }
    .image {
      width: 80px;
      height: 50px;
      margin-top: 10px;
    }
    .tips {
      border-bottom: 1px solid #e5e9f2;
    }
  }
</style>
