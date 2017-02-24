<template>
  <div id="middleMan">
    <el-row class="top">
      <el-col :span="4"><el-checkbox v-model="middleMan.isSelect">申请ID：{{ middleMan.id }}</el-checkbox></el-col>
      <el-col :span="13" :offset="1"><span>提交时间：{{ middleMan.committedAt }}</span></el-col>
      <el-col :span="5" :offset="1">
        <el-row type="flex" justify="end" style="padding-right: 20px;">
          {{ formatStatus }}
        </el-row>
      </el-col>
    </el-row>
    <el-row class="body">
      <el-col :span="4">
        <el-row class="image-col" type="flex" justify="space-around" align="middle">
          <img class="image" v-for="item in middleMan.idCardImages" @click.prevent="handleClickImage" :src="item"/>
        </el-row>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-row class="unit-row">{{ middleMan.name }}</el-row>
        <el-row class="unit-row">{{ middleMan.idCardNumber }}</el-row>
        <el-row class="unit-row">{{ middleMan.birth }}</el-row>
        <el-row style="height: 40px; line-height: 20px;">
          <el-tooltip :content="middleMan.address" placement="top">
            {{ limitAddress(middleMan.address) }}
          </el-tooltip>
        </el-row>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-row style="height: 40px; line-height: 20px;">所在城市：{{ middleMan.city }}</el-row>
        <el-row class="unit-row">职业：{{ middleMan.job }}</el-row>
        <el-row class="unit-row">单位：{{ middleMan.company }}</el-row>
        <el-row class="unit-row">手机：{{ middleMan.phoneNumber }}</el-row>
      </el-col>
      <el-col :span="4" :offset="1" >
        <el-row style="height: 40px; line-height: 20px;">主要招聘渠道：{{ middleMan.city }}</el-row>
        <el-row class="unit-row">招聘能力：</el-row>
        <el-row class="unit-row">全职，月招聘能力：{{ middleMan.fullTimeStaffNum }}</el-row>
        <el-row class="unit-row">兼职，日招聘能力：{{ middleMan.partTimeStaffNum }}</el-row>
      </el-col>
      <el-col class="btn-row" :span="3" :offset="1">
        <el-button v-if="middleMan.status==0" type="success" size="large" @click.prevent="handlePass" style="width: 80px;">通 过</el-button>
        <el-button v-if="middleMan.status==0" type="primary" size="large" @click.prevent="handleRefuse" style="width: 80px; margin-left: 0px;">不通过</el-button>
        <el-button v-if="middleMan.status==1" type="danger" size="large" @click.prevent="handleBlackList" style="width: 80px;">拉 黑</el-button>
        <el-button v-if="middleMan.status==2" type="primary" size="large" @click.prevent="handleWhiteList" style="width: 80px;">解 除</el-button>
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
        return `${str.substr(0, 20)}...`;
      },
      handleBigImageClose() {
        this.BigImageVisible = false;
        console.log('hello');
      },
    },
    computed: {
      formatStatus() {
        if (this.middleMan.status === 0) {
          return '待审核';
        }
        return '审核异常';
      },
      formatName() {
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
