<template>
  <div id="middleMan">
    <el-row class="top">
      <el-col :span="4"><el-checkbox v-model="middleMan.isSelect">申请ID：{{ middleMan.id }}</el-checkbox></el-col>
      <el-col :span="13" :offset="1"><span>提交时间：{{ middleMan.createdTime | formatDate }}</span></el-col>
      <el-col :span="5" :offset="1">
        <el-row type="flex" justify="end" style="padding-right: 20px;">
          {{ formatStatus }}
        </el-row>
      </el-col>
    </el-row>
    <el-row class="body">
      <el-col :span="4">
        <el-row class="image-col" type="flex" justify="space-around" align="middle">
          <img class="image" v-if="middleMan.idCardHand" @click.prevent="handleClickImage" :src="middleMan.idCardHand"/>
          <img class="image" v-if="middleMan.idCardPositive" @click.prevent="handleClickImage" :src="middleMan.idCardPositive"/>
        </el-row>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-row class="unit-row">
          <el-col :span="8">
            {{ middleMan.name }}
          </el-col>
          <el-col :span="5">
            {{ middleMan.sex | formatSex }}
          </el-col>
          <el-col :span="11">
            {{ middleMan.nationName }}
          </el-col>
        </el-row>
        <el-row class="unit-row">{{ middleMan.idCard }}</el-row>
        <el-row class="unit-row">{{ middleMan.birthday | formatBirthday }}</el-row>
        <el-row style="height: 40px; line-height: 20px;">
          <el-tooltip :content="middleMan.address" placement="top">
            {{ limitAddress(middleMan.origin) }}
          </el-tooltip>
        </el-row>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-row style="height: 40px; line-height: 20px;">所在城市：{{ middleMan.cityName }}</el-row>
        <el-row class="unit-row">职业：{{ middleMan.occupation }}</el-row>
        <el-row class="unit-row">单位：{{ middleMan.company }}</el-row>
        <el-row class="unit-row">手机：{{ middleMan.telphone }}</el-row>
      </el-col>
      <el-col :span="5" :offset="1" >
        <el-row style="height: 40px; line-height: 20px;">主要招聘渠道：{{ middleMan.recruitChannel }}</el-row>
        <el-row class="unit-row">招聘能力：</el-row>
        <el-row class="unit-row">全职，月招聘能力：{{ middleMan.fullTimeNumber }}</el-row>
        <el-row class="unit-row">兼职，日招聘能力：{{ middleMan.partTimeNumber }}</el-row>
      </el-col>
      <el-col class="btn-row" :span="3">
        <el-button v-if="middleMan.status==1" type="success" size="large" @click.prevent="handlePass" style="width: 80px;">通 过</el-button>
        <el-button v-if="middleMan.status==1" type="primary" size="large" @click.prevent="handleRefuse" style="width: 80px; margin-left: 0px;">不通过</el-button>
        <el-button v-if="middleMan.status==2" type="danger" size="large" @click.prevent="handleBlackList" style="width: 80px;">拉 黑</el-button>
        <el-button v-if="middleMan.status==4" type="primary" size="large" @click.prevent="handleWhiteList" style="width: 80px;">解 除</el-button>
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
    name: 'middleMan',
    data() {
      return {
        BigImageVisible: false,
        currentImage: '',
      };
    },
    props: [
      'middleMan',
    ],
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
        if (this.middleMan.status === 1) {
          return '待审核';
        } else if (this.middleMan.status === 2) {
          return '审核通过';
        } else if (this.middleMan.status === 3) {
          return '审核未通过';
        } else if (this.middleMan.status === 4) {
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
#middleMan {
 width: 100%;
 height: 190px;
 // margin-left: 10px;
 // margin-right: 10px;
 // padding-right: 10px;
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
  //  background-color: pink;
   .el-col {
     height: 100%;
     font-size: 14px;
    //  line-height: 40px;
   }
   .image-col {
     height: 100%;
     width: 100%;
    //  padding-top: 10px;
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
  //  .el-dialog {
  //    width: 500px;
  //    height: 300px;
  //  }
   .big-img {
     width: 500px;
     height: 300px;
   }
 }
}
</style>
