<template>
  <div id="userInfo">
    <el-row class="top">
      <el-col :span="4">
        <el-checkbox v-if="selectVisible" v-model="userInfo.isSelect">名单ID：{{ userInfo.talent.id }}</el-checkbox>
        <span v-else style="padding-left: 5px;">名单ID：{{ userInfo.talent.id }}</span>
      </el-col>
      <el-col :span="13"><span>提交时间：{{ userInfo.talent.createdAt | formatDate }}</span></el-col>
      <el-col :span="5" :offset="1">
        <el-row type="flex" justify="end" style="padding-right: 20px;">
          {{ formatStatus }}
        </el-row>
      </el-col>
    </el-row>
    <el-row class="body">
      <el-col :span="3">
        <el-row class="image-col" type="flex" justify="space-around" align="middle">
          <!-- <img class="image" v-if="userInfo.talent.idCardHand" @click.prevent="handleClickImage" :src="userInfo.idCardHand"/>
          <img class="image" v-if="userInfo.talent.idCardPositive" @click.prevent="handleClickImage" :src="userInfo.idCardPositive"/> -->
          <img class="image" @click.prevent="handleClickImage" src="userInfo.talent.avatar" />
        </el-row>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-row class="unit-row">
          <el-col :span="8">
            {{ userInfo.talent.name }}
          </el-col>
          <el-col :span="5">
            {{ userInfo.talent.sex | formatSex }}
          </el-col>
          <el-col :span="11">
            {{ userInfo.talent.nation }}
          </el-col>
        </el-row>
        <el-row class="unit-row">{{ userInfo.talent.idCard }}</el-row>
        <el-row class="unit-row">出生：{{ userInfo.talent.birthday }}</el-row>
        <el-row style="height: 40px; line-height: 20px;">
          <el-tooltip :content="userInfo.talent.address" placement="top">
            {{ limitContent(userInfo.talent.address, 20) }}
          </el-tooltip>
        </el-row>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-row class="unit-row"><el-tooltip :content="userInfo.demandName" placement="top">需求：{{ limitContent(userInfo.demandName, 15) }}</el-tooltip></el-row>
        <el-row class="unit-row"><el-tooltip :content="userInfo.planName" placement="top">计划：{{ limitContent(userInfo.planName, 15) }}</el-tooltip></el-row>
        <el-row class="unit-row">经纪人：{{ userInfo.brokerName }}</el-row>
      </el-col>
      <el-col :span="7" >
        <el-row class="scheme">
          <div v-if="userInfo.type==1" v-for="interview in userInfo.listDemandInterview">
            <el-row class="unit-row"><el-tooltip :content="interview.interviewTime" placement="top">面试时间：{{ limitContent(interview.interviewTime, 20) }}</el-tooltip></el-row>
            <el-row class="unit-row"><el-tooltip :content="interview.interviewAddress" placement="top">面试地点：{{ limitContent(interview.interviewAddress, 20) }}</el-tooltip></el-row>
          </div>
          <div v-if="userInfo.type==0" v-for="(scheme, index) in userInfo.listSchedulingInformation">
            <el-row class="unit-row"><el-tooltip :content="limitScheme(scheme)" placement="top">班次{{ index + 1 }}：{{ limitContent(limitScheme(scheme), 36) }}</el-tooltip></el-row>
            <!-- <el-row class="unit-row">班次{{ index + 1 }}：{{ scheme.startTime | formatDate }} - {{ scheme.endTime | formatDate }}</el-row> -->
          </div>
        </el-row>
      </el-col>
      <el-col class="btn-row" :span="3">
        <el-button type="primary" size="small" @click.prevent="handleDetail">详 情</el-button>
        <el-button v-if="userInfo.talentStatus==0" type="success" size="small" @click.prevent="handleConfirmInfo">确认名单</el-button>
        <el-button v-if="userInfo.talentStatus==0" type="danger" size="small" @click.prevent="handleInvalidInfo">名单无效</el-button>
        <el-button v-if="userInfo.talentStatus==2 && userInfo.type==1" type="success" size="small" @click.prevent="handleInterviewPass">面试通过</el-button>
        <el-button v-if="userInfo.talentStatus==2 && userInfo.type==1" type="danger" size="small" @click.prevent="handleInterviewRefused">面试不通过</el-button>
        <el-button v-if="userInfo.talentStatus==2 && userInfo.type==1" type="danger" size="small" @click.prevent="handleInterviewAbsent">面试未到</el-button>
        <el-button v-if="userInfo.talentStatus==2 && userInfo.type==0" type="danger" size="small" @click.prevent="handlePartTimeAbsent">放鸽子</el-button>
        <el-button v-if="userInfo.talentStatus==2 && userInfo.type==0" type="primary" size="small" @click.prevent="handleSignIn">已考勤</el-button>
        <el-button v-if="userInfo.talentStatus==3 && userInfo.type==1" type="danger" size="small" @click.prevent="handleWorkFailed">入职失败</el-button>
        <el-button v-if="userInfo.talentStatus==3 && userInfo.type==1" type="primary" size="small" @click.prevent="handleConfirmWork">确认入职</el-button>
        <el-button v-if="userInfo.talentStatus==7 && userInfo.type==1" type="danger" size="small" @click.prevent="handleDimission">已离职</el-button>
        <el-button v-if="userInfo.talentStatus==1 || userInfo.talentStatus==4 || userInfo.talentStatus==5 || userInfo.talentStatus==6 || userInfo.talentStatus==8 || userInfo.talentStatus==9" type="danger" size="small" @click.prevent="handleRevertStatus">恢复状态</el-button>
      </el-col>
    </el-row>
    <bigImage v-model="BigImageVisible" :image="currentImage" :visible="BigImageVisible" @handleWrapperClick="handleBigImageClose"></bigImage>
  </div>
</template>
<script>
  import bigImage from './bigImage';
  import util from '../common/util';

  export default {
    name: 'userInfo',
    data() {
      return {
        BigImageVisible: false,
        currentImage: '',
      };
    },
    props: {
      userInfo: Object,
      selectVisible: {
        type: Boolean,
        default: true,
      },
    },
    components: {
      bigImage,
    },
    methods: {
      handleDetail(evt) {
        this.$emit('handleDetail', evt);
      },
      handleConfirmInfo(evt) {
        this.$emit('handleConfirmInfo', evt);
      },
      handleInvalidInfo(evt) {
        this.$emit('handleInvalidInfo', evt);
      },
      handleInterviewPass(evt) {
        this.$emit('handleInterviewPass', evt);
      },
      handleInterviewRefused(evt) {
        this.$emit('handleInterviewRefused', evt);
      },
      handleInterviewAbsent(evt) {
        this.$emit('handleInterviewAbsent', evt);
      },
      handlePartTimeAbsent(evt) {
        this.$emit('handlePartTimeAbsent', evt);
      },
      handleConfirmWork(evt) {
        this.$emit('handleConfirmWork', evt);
      },
      handleWorkFailed(evt) {
        this.$emit('handleWorkFailed', evt);
      },
      handleSignIn(evt) {
        this.$emit('handleSignIn', evt);
      },
      handleDimission(evt) {
        this.$emit('handleDimission', evt);
      },
      handleRevertStatus(evt) {
        this.$emit('handleRevertStatus', evt);
      },
      handleClickImage(evt) {
        this.currentImage = evt.target.src;
        this.BigImageVisible = true;
      },
      limitScheme(scheme) {
        return `${this.formatDate(scheme.startTime)} - ${this.formatDate(scheme.endTime)}`;
      },
      limitContent(str, len) {
        if (str.length > len) {
          return `${str.substr(0, len)}...`;
        }
        return str;
      },
      handleBigImageClose() {
        this.BigImageVisible = false;
      },
      formatDate(time) {
        const date = new Date(parseInt(time, 0));
        return util.formatDate.formatUtc(date, 'yyyy-MM-dd hh:mm');
      },
    },
    computed: {
      formatStatus() {
        if (this.userInfo.talentStatus === 0) {
          return '待确认';
        } else if (this.userInfo.talentStatus === 1) {
          return '名单无效';
        } else if (this.userInfo.talentStatus === 2) {
          return '待面试';
        } else if (this.userInfo.talentStatus === 3) {
          return '待入职';
        } else if (this.userInfo.talentStatus === 4) {
          return '面试不通过';
        } else if (this.userInfo.talentStatus === 5) {
          return '面试未到';
        } else if (this.userInfo.talentStatus === 6) {
          return '入职失败';
        } else if (this.userInfo.talentStatus === 7) {
          return '入职中';
        } else if (this.userInfo.talentStatus === 8) {
          return '已离职';
        } else if (this.userInfo.talentStatus === 9) {
          return '放鸽子';
        } else if (this.userInfo.talentStatus === 10) {
          return '已考勤';
        } else if (this.userInfo.talentStatus === 12) {
          return '取消提交';
        }
        return '审核异常';
      },
      formatName() {
      },
    },
    filters: {
      formatDate(time) {
        const date = new Date(parseInt(time, 0));
        return util.formatDate.formatUtc(date, 'yyyy-MM-dd hh:mm');
      },
      formatSex(sex) {
        return sex === 1 ? '男' : '女';
      },
      formatBirthday(time) {
        if (time === undefined) {
          return '无';
        }
        const date = new Date(parseInt(time, 0));
        return util.formatDate.format(date, 'yyyy-MM-dd');
      },
    },
  };
</script>
<style lang="scss" scoped>
#userInfo {
 width: 100%;
 height: 190px;
 border:1px solid #eff2f7;
 .top {
   height: 40px;
  //  background-color: #eff2f7;
   background-color: #dcdcdc;
  //  border:1px solid #FFFFFF;

   .el-col {
     height: 100%;
     line-height: 40px;
     font-size: 14px;
   }
   .el-checkbox {
     width: 100%;
     height: 100%;
     padding-left: 10px;
   }
 }
 .body {
   background-color: #FFF;
   height: 150px;
   .el-col {
     height: 100%;
     font-size: 14px;
   }
   .image-col {
     height: 100%;
     width: 100%;
     .image {
       width: 40%;
       height: 50px;
     }
   }
   .unit-row {
     height: 30px;
     line-height: 30px;
   }
   .scheme {
     height: 150px;
    //  overflow: auto;
     overflow-y: scroll;
   }
   .btn-row {
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;

     > button + button {
       margin-top: 10px;
     }
   }
   .big-img {
     width: 500px;
     height: 300px;
   }
 }
}
</style>
