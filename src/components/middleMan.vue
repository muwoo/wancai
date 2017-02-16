<template>
  <div id="middleMan">
    <el-row class="top">
      <el-col :span="4"><el-checkbox v-model="isSelect">申请ID：{{ middleMan.id }}</el-checkbox></el-col>
      <el-col :span="13" :offset="1">提交时间：{{ middleMan.committedAt }}</el-col>
      <el-col :span="5" :offset="1">{{ middleMan.formatStatus }}</el-col>
    </el-row>
    <el-row class="body">
      <el-col :span="4">
        <el-row class="image-col" type="flex" justify="space-around" align="middle" style="background-color: pink;">
          <img class="image" v-for="item in middleMan.idCardImages" @click.native="handleClickImage" :src="item"/>
        </el-row>
      </el-col>
      <el-col :span="5" :offset="1" style="background-color: yellow;">
        <el-row style="height: 30px;">{{ middleMan.name }}</el-row>
        <el-row style="height: 30px;">{{ middleMan.idCardNumber }}</el-row>
        <el-row style="height: 30px;">{{ middleMan.birth }}</el-row>
        <el-row style="height: 30px;">{{ middleMan.address }}</el-row>
      </el-col>
      <el-col :span="4" :offset="1" style="background-color: yellow;">
        <el-row style="height: 30px;">所在城市：{{ middleMan.city }}</el-row>
        <el-row style="height: 30px;">当前职业：{{ middleMan.job }}</el-row>
        <el-row style="height: 30px;">单位：{{ middleMan.company }}</el-row>
        <el-row style="height: 30px;">手机：{{ middleMan.phoneNumber }}</el-row>
      </el-col>
      <el-col :span="4" :offset="1" style="background-color: yellow;">
        <el-row style="height: 30px;">主要招聘渠道：{{ middleMan.city }}</el-row>
        <el-row style="height: 30px;">招聘能力</el-row>
        <el-row style="height: 30px;">全职，月招聘能力：{{ middleMan.fullTimeStaffNum }}</el-row>
        <el-row style="height: 30px;">兼职，日招聘能力：{{ middleMan.partTimeStaffNum }}</el-row>
      </el-col>
      <el-col class="btn-row" :span="3" :offset="1" style="background-color: yellow;">
        <el-button v-if="middleMan.status==0" type="success" size="large" @click.prevent="handlePass" >通过</el-button>
        <el-button v-if="middleMan.status==0" type="primary" size="large" @click.prevent="handleRefuse" >不通过</el-button>
        <el-button v-if="middleMan.status==1" type="danger" size="large" @click.prevent="handleBlackList" >拉黑</el-button>
        <el-button v-if="middleMan.status==2" type="primary" size="large" @click.prevent="handleWhiteList" >解除</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'middleMan',
    props: [
      'middleMan',
    ],
    // props: {
    //   isSelect: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   id: {
    //     type: Number,
    //     default: 0,
    //   },
    //   committedAt: {
    //     type: Number,
    //     default: 0,
    //   },
    //   status: {
    //     type: Number,
    //     default: 0,
    //   },
    //   idCardImages: {
    //     type: Array,
    //     default: () => [],
    //   },
    //   name: {
    //     type: String,
    //     default: '',
    //   },
    //   sex: {
    //     type: String,
    //     default: '未知',
    //   },
    //   nation: {
    //     type: String,
    //     default: '',
    //   },
    //   idCardNumber: {
    //     type: String,
    //     default: '',
    //   },
    //   birth: {
    //     type: Number,
    //     default: 0,
    //   },
    //   address: {
    //     type: String,
    //     default: '',
    //   },
    //   city: {
    //     type: String,
    //     default: '',
    //   },
    //   job: {
    //     type: String,
    //     default: '',
    //   },
    //   company: {
    //     type: String,
    //     default: '',
    //   },
    //   phoneNumber: {
    //     type: String,
    //     default: '',
    //   },
    //   channel: {
    //     type: String,
    //     default: '',
    //   },
    //   fullTimeStaffNum: {
    //     type: Number,
    //     default: 0,
    //   },
    //   partTimeStaffNum: {
    //     type: Number,
    //     default: 0,
    //   },
    // },
    methods: {
      handleClickImage() {
      },
      handlePass(evt) {
        this.$emit('handlePass', evt);
      },
      handleRefuse() {

      },
      handleBlackList() {

      },
      handleWhiteList() {

      },
    },
    computed: {
      formatStatus() {
        if (this.status === 0) {
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
 height: 200px;
 margin-left: 10px;
 margin-right: 10px;
 background-color: #FFFFFF;
 .top {
   height: 40px;
   background-color: #eff2f7;
   border:1px solid #FFFFFF;

   .el-col {
     height: 100%;
     line-height: 40px;
   }
   .el-checkbox {
     width: 100%;
     height: 100%;
     padding-left: 10px;
   }
 }
 .body {
   height: 160px;
  //  background-color: pink;
   .el-col {
     height: 100%;
    //  line-height: 40px;
   }
   .image-col {
     height: 100%;
     width: 100%;
    //  padding-top: 10px;
     .image {
       width: 100px;
       height: 50px;
     }
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
 }
}
</style>
