<template>
  <div id="middleManCheck">
    <el-form :inline="true" :model="middleManInfo" class="demo-form-inline" style="margin-top: 20px;">
      <el-form-item label='申请ID' style="width: 160px;">
        <el-input v-model="middleManInfo.id" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label='身份证号' style="width: 240px;">
        <el-input v-model="middleManInfo.id" placeholder="请输入内容" style="width: 170px;"></el-input>
      </el-form-item>
      <el-form-item label='手机号' style="width: 180px;">
        <el-input v-model="middleManInfo.phoneNumber" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label='姓名' style="width: 160px;">
        <el-input v-model="middleManInfo.name" placeholder="请输入内容" style="width: 100px;"></el-input>
      </el-form-item>
      </el-form-item><el-form-item>
        <el-button type="primary" @click="handleSearchMiddleman">搜索经纪人</el-button>
      </el-form-item>
    </el-form>
    <h1 class="tips"></h1>
      <div>
        <el-checkbox v-model="isAllSelect" @change="handleAllSelect" style="margin-left: 10px;">全选</el-checkbox>
        <el-button>批量通过</el-button>
        <el-button>批量不通过</el-button>
        <el-button style="float: right">下一页</el-button>
        <el-button style="float: right">上一页</el-button>
        <middleMan v-for="middleMan in middleMans" :middleMan="middleMan"
        @handlePass="handlePass(this.event, middleMan)"
        @handleRefuse="handleRefuse"
        @handleBlackList="handleBlackList"
        @handleWhiteList="handleWhiteList"
        style="margin-top: 10px;" ></middleMan>
      <el-col :span="24"style="margin-top:10px;">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :total="totalItemSize" style="float: right;"></el-pagination>
      </el-col>
    </div>
  </div>
</template>

<script>
import middleMan from '../../../components/middleMan';

export default {
  name: 'middleManPending',
  components: {
    middleMan,
  },
  data() {
    return {
      middleManInfo: {
        id: '',
        idCard: '',
        phoneNumber: '',
        name: '',
      },
      middleMans: [{
        isSelect: false,
        id: 111,
        committedAt: 1487218088,
        status: 0,
        idCardImages: [
          'http://img1.imgtn.bdimg.com/it/u=2173638125,1490913710&fm=15&gp=0.jpg',
          'http://img3.imgtn.bdimg.com/it/u=1951674198,2294779761&fm=23&gp=0.jpg',
        ],
        name: '赵日天',
        sex: '男',
        nation: '汉族',
        idCardNumber: '352341233214112232',
        birth: '91年4月',
        address: '浙江省杭州市西湖区文三西路999号xxx小区15栋203浙江省杭州市西湖区文三西路999号xxx小区15栋203',
        city: '杭州市西湖区',
        job: '职业经纪人',
        company: '万才网',
        phoneNumber: '13111111111',
        channel: '网络招聘',
        fullTimeStaffNum: 0,
        partTimeStaffNum: 0,
      },
      {
        isSelect: false,
        id: 444,
        committedAt: 1487218088,
        status: 0,
        idCardImages: [
          'http://img1.imgtn.bdimg.com/it/u=2173638125,1490913710&fm=15&gp=0.jpg',
          'http://img3.imgtn.bdimg.com/it/u=1951674198,2294779761&fm=23&gp=0.jpg',
        ],
        name: '赵日天',
        sex: '男',
        nation: '汉族',
        idCardNumber: '352341233214112232',
        birth: '91年4月',
        address: '浙江省杭州市西湖区文三西路999号xxx小区',
        city: '杭州市西湖区',
        job: '职业经纪人',
        company: '万才网',
        phoneNumber: '13111111111',
        channel: '网络招聘',
        fullTimeStaffNum: 0,
        partTimeStaffNum: 0,
      },
      {
        isSelect: false,
        id: 555,
        committedAt: 1487218088,
        status: 0,
        idCardImages: [
          'http://img1.imgtn.bdimg.com/it/u=2173638125,1490913710&fm=15&gp=0.jpg',
          'http://img3.imgtn.bdimg.com/it/u=1951674198,2294779761&fm=23&gp=0.jpg',
        ],
        name: '赵日天',
        sex: '男',
        nation: '汉族',
        idCardNumber: '352341233214112232',
        birth: '91年4月',
        address: '浙江省杭州市西湖区文三西路999号xxx小区15栋203浙江省杭州市西湖区文三西路999号xxx小区15栋203',
        city: '杭州市西湖区',
        job: '职业经纪人',
        company: '万才网',
        phoneNumber: '13111111111',
        channel: '网络招聘',
        fullTimeStaffNum: 0,
        partTimeStaffNum: 0,
      },
      {
        isSelect: false,
        id: 333,
        committedAt: 1487218088,
        status: 0,
        idCardImages: [
          'http://img1.imgtn.bdimg.com/it/u=2173638125,1490913710&fm=15&gp=0.jpg',
          'http://img3.imgtn.bdimg.com/it/u=1951674198,2294779761&fm=23&gp=0.jpg',
        ],
        name: '赵日天',
        sex: '男',
        nation: '汉族',
        idCardNumber: '352341233214112232',
        birth: '91年4月',
        address: '浙江省杭州市西湖区文三西路999号xxx小区15栋203浙江省杭州市西湖区文三西路999号xxx小区15栋203',
        city: '杭州市西湖区',
        job: '职业经纪人',
        company: '万才网',
        phoneNumber: '13111111111',
        channel: '网络招聘',
        fullTimeStaffNum: 0,
        partTimeStaffNum: 0,
      },
      {
        isSelect: false,
        id: 333,
        committedAt: 1487218088,
        status: 0,
        idCardImages: [
          'http://img1.imgtn.bdimg.com/it/u=2173638125,1490913710&fm=15&gp=0.jpg',
          'http://img3.imgtn.bdimg.com/it/u=1951674198,2294779761&fm=23&gp=0.jpg',
        ],
        name: '赵日天',
        sex: '男',
        nation: '汉族',
        idCardNumber: '352341233214112232',
        birth: '91年4月',
        address: '浙江省杭州市西湖区文三西路999号xxx小区15栋203浙江省杭州市西湖区文三西路999号xxx小区15栋203',
        city: '杭州市西湖区',
        job: '职业经纪人',
        company: '万才网',
        phoneNumber: '13111111111',
        channel: '网络招聘',
        fullTimeStaffNum: 0,
        partTimeStaffNum: 0,
      }],
      defaultActiveTabName: 'first',
      isAllSelect: false,
      currentSelectArray: [],
      totalItemSize: 100,
      currentPage: 2,
    };
  },
  methods: {
    getMiddleMans() {

    },
    handleSearchMiddleman() {

    },
    handleStatusTagClick() {

    },
    handlePass(event, obj) {
      console.log(obj.id);
      console.log(event);
      // console.log(id);
    },
    handleRefuse(evt) {
      console.log(evt);
    },
    handleBlackList(evt) {
      console.log(evt.target.value);
    },
    handleWhiteList(evt) {
      console.log(evt.target.value);
    },
    handleAllSelect() {
      console.log('All Select');
    },
    handleCurrentPageChange(val) {
      this.currentPage = val;
      console.log(val);
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
  #middleManCheck {
    .tips {
      border-bottom: 1px solid #e5e9f2;
    }
  }
</style>
