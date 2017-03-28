<template>
  <div id="adminProfile">
    <el-row class="top">
      <el-col :span="4" class="title">个人中心</el-col>
      <el-col :span="8" :offset="12">
        <el-row type="flex" justify="end" style="padding-right: 20px;">
          创建时间：{{ currentUser.createdAt | formatDate }}
        </el-row>
      </el-col>
    </el-row>
    <el-row class="body">
      <el-col :span="4">
        <el-row class="image-col" type="flex" justify="space-around" align="middle">
          <img class="image"  @click.prevent="handleClickImage" :src="currentUser.avatar"/>
        </el-row>
      </el-col>
      <el-col :span="7" :offset="1" class="content-eol ">
        <el-row class="unit-row">
          <el-col :span="8">
            {{ currentUser.name }}
          </el-col>
          <el-col :span="3">
            {{ currentUser.sex | formatSex }}
          </el-col>
        </el-row>
        <el-row class="unit-row">{{ currentUser.idCard }}</el-row>
        <el-row class="unit-row">生日：{{ currentUser.birthday | formatBirthday }}</el-row>
        <!-- <el-row class="unit-row"></el-row>
        <el-row class="unit-row"></el-row> -->
      </el-col>
      <el-col :span="7" :offset="1" class="content-eol">
        <el-row class="unit-row">手机号码：{{ currentUser.phone }}</el-row>
        <el-row class="unit-row">邮箱：{{ currentUser.eMail }}</el-row>
        <el-row class="unit-row">QQ：{{ currentUser.qq }}</el-row>
        <el-row class="unit-row">微信号：{{ currentUser.weChat }}</el-row>
        <el-row class="unit-row">电话：{{ currentUser.telphone }}</el-row>
        <el-row class="unit-row">短号：{{ currentUser.cornet }}</el-row>
      </el-col>
      <el-col class="btn-row" :span="4">
        <el-button type="primary" size="large" @click.prevent="handleSetPassword">修改密码</el-button>
      </el-col>
    </el-row>
    <bigImage v-model="BigImageVisible" :image="currentImage" :visible="BigImageVisible" @handleWrapperClick="handleBigImageClose"></bigImage>
  </div>
</template>

<script>
  import bigImage from '../../components/bigImage';
  import util from '../../common/util';

  export default {
    name: 'adminProfile',
    data() {
      return {
        BigImageVisible: false,
        currentImage: '',
        currentUser: {
          name: '赵日天',
          createdAt: 1489678919000,
          avatar: '',
          sex: 1,
          idCard: '1235123123',
          birthday: 1489678919000,
          phone: '139123123',
          eMail: '123214@qq.com',
          qq: '1235',
          weChat: 'libra',
          telphone: '123',
          cornet: '321',
        },
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
      handleSetPassword() {

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
    },
    mounted() {
      const admin = JSON.parse(sessionStorage.getItem('admin'));
      if (admin) {
        this.currentUser.name = admin.name.toString() || '';
      }
    },
  };
</script>

<style lang="scss" scoped>
#adminProfile {
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
    .title {
      padding-left: 10px;
      color: #9b9b9b;
      font-size: 18px;
    }
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
    .big-img {
      width: 500px;
      height: 300px;
    }
  }
}
</style>
