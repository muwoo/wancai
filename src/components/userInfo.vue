<template>
  <div id="uesrInfo">
    <el-row class="top">
      <el-col :span="4">
        <el-checkbox v-if="selectVisible" v-model="userInfo.isSelect">名单ID：{{ userInfo.id }}</el-checkbox>
        <span v-else style="padding-left: 5px;">名单ID：{{ userInfo.id }}</span>
      </el-col>
      <el-col :span="13" :offset="1"><span>提交时间：{{ userInfo.createdTime | formatDate }}</span></el-col>
      <el-col :span="5" :offset="1">
        <el-row type="flex" justify="end" style="padding-right: 20px;">
          {{ formatStatus }}
        </el-row>
      </el-col>
    </el-row>
    <el-row class="body">
      <el-col :span="4">
        <el-row class="image-col" type="flex" justify="space-around" align="middle">
          <img class="image" v-if="userInfo.idCardHand" @click.prevent="handleClickImage" :src="userInfo.idCardHand"/>
          <img class="image" v-if="userInfo.idCardPositive" @click.prevent="handleClickImage" :src="userInfo.idCardPositive"/>
        </el-row>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-row class="unit-row">
          <el-col :span="8">
            {{ userInfo.name }}
          </el-col>
          <el-col :span="5">
            {{ userInfo.sex | formatSex }}
          </el-col>
          <el-col :span="11">
            {{ userInfo.nationName }}
          </el-col>
        </el-row>
        <el-row class="unit-row">{{ userInfo.idCard }}</el-row>
        <el-row class="unit-row">出生：{{ userInfo.birthday | formatBirthday }}</el-row>
        <el-row style="height: 40px; line-height: 20px;">
          <el-tooltip :content="userInfo.address" placement="top">
            {{ limitAddress(userInfo.address, 20) }}
          </el-tooltip>
        </el-row>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-row class="unit-row">需求：{{ limitAddress(userInfo.demandTitle, 15) }}</el-row>
        <el-row class="unit-row">计划：{{ limitAddress(userInfo.planName, 15) }}</el-row>
        <el-row class="unit-row">经纪人：{{ userInfo.middleMan }}</el-row>
      </el-col>
      <el-col :span="6" >
        <el-row class="scheme" v-for="interview in userInfo.interviewList">
          <el-row class="unit-row">面试时间：{{ limitAddress(interview.time, 10) }}</el-row>
          <el-row class="unit-row">面试地点：{{ limitAddress(interview.address, 10) }}</el-row>
        </el-row>
      </el-col>
      <el-col class="btn-row" :span="3">
        <el-button type="primary" size="small" @click.prevent="handlePass">详 情</el-button>
        <el-button v-if="userInfo.status==1" type="success" size="small" @click.prevent="handlePass">确认名单</el-button>
        <el-button v-if="userInfo.status==1" type="danger" size="small" @click.prevent="handleRefuse">名单无效</el-button>
        <el-button v-if="userInfo.status==2" type="success" size="small" @click.prevent="handleRefuse">面试通过</el-button>
        <el-button v-if="userInfo.status==2" type="danger" size="small" @click.prevent="handleRefuse">面试不通过</el-button>
        <el-button v-if="userInfo.status==2" type="danger" size="small" @click.prevent="handleRefuse">面试未到</el-button>
        <el-button v-if="userInfo.status==3" type="danger" size="small" @click.prevent="handleRefuse">入职失败</el-button>
        <el-button v-if="userInfo.status==3" type="primary" size="small" @click.prevent="handleRefuse">确认入职</el-button>
        <el-button v-if="userInfo.status==4" type="danger" size="small" @click.prevent="handleBlackList">恢复状态</el-button>
      </el-col>
    </el-row>
    <!-- <el-dialog v-model="BigImageVisible" @close="handleBigImageClose">
      <img class="big-img" :src="currentImage" />
    </el-dialog> -->
    <bigImage v-model="BigImageVisible" :image="currentImage" :visible="BigImageVisible" @handleWrapperClick="handleBigImageClose"></bigImage>
  </div>
</template>
<script>
  import bigImage from './bigImage';
  import util from '../common/util';

  export default {
    name: 'uesrInfo',
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
      handlePass(evt) {
        this.$emit('handlePass', evt);
      },
      handleRefuse(evt) {
        this.$emit('handleRefuse', evt);
      },
      handleBlackList(evt) {
        this.$emit('handleBlackList', evt);
      },
      handleWhiteList(evt) {
        this.$emit('handleWhiteList', evt);
      },
      handleClickImage(evt) {
        this.currentImage = evt.target.src;
        this.BigImageVisible = true;
      },
      limitAddress(str, len) {
        if (str.length > len) {
          return `${str.substr(0, len)}...`;
        }
        return str;
      },
      handleBigImageClose() {
        this.BigImageVisible = false;
      },
    },
    computed: {
      formatStatus() {
        if (this.userInfo.status === 1) {
          return '待确认';
        } else if (this.userInfo.status === 2) {
          return '待面试';
        } else if (this.userInfo.status === 3) {
          return '待入职';
        } else if (this.userInfo.status === 4) {
          return '失败名单';
        }
        return '审核异常';
      },
      formatName() {
      },
    },
    filters: {
      formatDate(time) {
        const date = new Date(parseInt(time, 0));
        return util.formatDate.format(date, 'yyyy-MM-dd hh:mm');
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
#uesrInfo {
 width: 100%;
 height: 190px;
 border:1px solid #eff2f7;
 .top {
   height: 40px;
   background-color: #eff2f7;
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
