<template>
  <div id="uesrInfo">
    <el-row class="top">
      <el-col :span="4">
        <el-checkbox v-if="selectVisible" v-model="userInfo.isSelect">申请ID：{{ userInfo.id }}</el-checkbox>
        <span v-else style="padding-left: 5px;">申请ID：{{ userInfo.id }}</span>
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
      <el-col :span="5" :offset="1">
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
        <el-row class="unit-row">{{ userInfo.birthday | formatBirthday }}</el-row>
        <el-row style="height: 40px; line-height: 20px;">
          <el-tooltip :content="userInfo.address" placement="top">
            {{ limitAddress(userInfo.origin) }}
          </el-tooltip>
        </el-row>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-row style="height: 40px; line-height: 20px; padding-top: 5px;">所在城市：{{ userInfo.cityName }}</el-row>
        <el-row class="unit-row">职业：{{ userInfo.occupation }}</el-row>
        <el-row class="unit-row">单位：{{ userInfo.company }}</el-row>
        <el-row class="unit-row">手机：{{ userInfo.telphone }}</el-row>
      </el-col>
      <el-col :span="5" :offset="1" >
        <el-row style="height: 40px; line-height: 20px; padding-top: 5px;">主要招聘渠道：{{ userInfo.recruitChannel }}</el-row>
        <el-row class="unit-row">招聘能力：</el-row>
        <el-row class="unit-row">全职，月招聘能力：{{ userInfo.fullTimeNumber }}</el-row>
        <el-row class="unit-row">兼职，日招聘能力：{{ userInfo.partTimeNumber }}</el-row>
      </el-col>
      <el-col class="btn-row" :span="3">
        <el-button v-if="userInfo.status==1" type="success" size="large" @click.prevent="handlePass" style="width: 80px;">通 过</el-button>
        <el-button v-if="userInfo.status==1" type="primary" size="large" @click.prevent="handleRefuse" style="width: 80px; margin-left: 0px;">不通过</el-button>
        <el-button v-if="userInfo.status==2" type="danger" size="large" @click.prevent="handleBlackList" style="width: 80px;">拉 黑</el-button>
        <el-button v-if="userInfo.status==4" type="primary" size="large" @click.prevent="handleWhiteList" style="width: 80px;">解 除</el-button>
      </el-col>
    </el-row>
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
      limitAddress(str) {
        if (str.length > 20) {
          return `${str.substr(0, 20)}...`;
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
          return '待审核';
        } else if (this.userInfo.status === 2) {
          return '审核通过';
        } else if (this.userInfo.status === 3) {
          return '审核未通过';
        } else if (this.userInfo.status === 4) {
          return '已拉黑';
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
 background-color: #FFFFFF;
 .top {
   height: 40px;
   background-color: #eff2f7;
   border:1px solid #FFFFFF;

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
