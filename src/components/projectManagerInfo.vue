<template>
  <div id="projectManagerInfo">
    <el-row class="top">
      <el-col :span="4">ID：{{ projectManager.id }}</el-col>
      <el-col :span="8" :offset="12">
        <el-row type="flex" justify="end" style="padding-right: 20px;">
          创建时间：{{ projectManager.createdAt | formatDate }}
        </el-row>
      </el-col>
    </el-row>
    <el-row class="body">
      <el-col :span="4">
        <el-row class="image-col" type="flex" justify="space-around" align="middle">
          <img class="image"  @click.prevent="handleClickImage" :src="projectManager.avatar | formatQiniuURL"/>
        </el-row>
      </el-col>
      <el-col :span="7" :offset="1" class="content-eol ">
        <el-row class="unit-row">
          <el-col :span="8">
            {{ projectManager.name }}
          </el-col>
          <el-col :span="3">
            {{ projectManager.sex | formatSex }}
          </el-col>
        </el-row>
        <el-row class="unit-row">{{ projectManager.idCard }}</el-row>
        <el-row class="unit-row">生日：{{ projectManager.birthday | formatBirthday }}</el-row>
        <!-- <el-row class="unit-row"></el-row>
        <el-row class="unit-row"></el-row> -->
      </el-col>
      <el-col :span="7" :offset="1" class="content-eol">
        <el-row class="unit-row">手机号码：{{ projectManager.phone }}</el-row>
        <el-row class="unit-row">邮箱：{{ projectManager.eMail }}</el-row>
        <el-row class="unit-row">QQ：{{ projectManager.qq }}</el-row>
        <el-row class="unit-row">微信号：{{ projectManager.weChat }}</el-row>
        <el-row class="unit-row">电话：{{ projectManager.telphone }}</el-row>
        <el-row class="unit-row">短号：{{ projectManager.cornet }}</el-row>
      </el-col>
      <el-col class="btn-row" :span="3" :offset="1">
        <el-button type="primary" size="large" @click.prevent="handleEdit" style="width: 80px;">修 改</el-button>
        <el-button type="danger" size="large" @click.prevent="handleDelete" style="width: 80px; margin-left: 0px;">删 除</el-button>
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
    name: 'projectManagerInfo',
    data() {
      return {
        BigImageVisible: false,
        currentImage: '',
      };
    },
    props: [
      'projectManager',
    ],
    components: {
      bigImage,
    },
    methods: {
      handleEdit(evt) {
        this.$emit('handleEdit', evt);
      },
      handleDelete(evt) {
        this.$emit('handleDelete', evt);
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
      formatQiniuURL(url) {
        return `${url}?imageView/2/w/640/h/960`;
      },
    },
  };
</script>
<style lang="scss" scoped>
#projectManagerInfo {
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
     height: 15px;
     line-height: 15px;
     margin-top: 5px;
   }
   .content-eol {
     display: flex;
     flex-direction: column;
     align-items: start;
     justify-content: center;
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
