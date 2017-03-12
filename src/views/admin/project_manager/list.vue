<template>
  <div id="projectManagerList">
    <el-form :inline="true" :model="projectManagerInfo" style="margin-top: 20px;">
      <el-row>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label='身份证号：' style="width: 100%;">
              <el-input v-model="projectManagerInfo.idCard" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='手机号码：' style="width: 100%;">
              <el-input v-model="projectManagerInfo.phoneNumber" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label='姓名：' style="width: 100%;">
              <el-input v-model="projectManagerInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="handleSearchItem">搜索名单</el-button>
      </el-form-item>
    </el-form>
    <div class="tips"></div>
    <div class="card-panel">
      <projectManagerInfo v-for="info in infos" :projectManager="info"
      @handleEdit="handleEdit(this.event, info)"
      @handleDelete="handleDelete(this.event, info)"
      style="margin-top: 10px;" ></projectManagerInfo>
    </div>
  </div>
</template>
<script>
  import projectManagerInfo from '../../../components/projectManagerInfo';

  export default {
    name: 'projectManagerList',
    components: {
      projectManagerInfo,
    },
    data() {
      return {
        projectManagerInfo: {
          idCard: '',
          phoneNumber: '',
          name: '',
        },
        infos: [{
          id: 111,
          createdAt: 1487218088000,
          idCardImages: [
            'http://img1.imgtn.bdimg.com/it/u=2173638125,1490913710&fm=15&gp=0.jpg',
            'http://img3.imgtn.bdimg.com/it/u=1951674198,2294779761&fm=23&gp=0.jpg',
          ],
          name: '赵日天',
          sex: '男',
          nation: '汉族',
          idCard: '352341233214112232',
          birth: '91年4月',
          address: '浙江省杭州市西湖区文三西路999号',
          phoneNumber: '13111111111',
          mail: '123456@qq.com',
          qq: '123456',
          weChat: 'librazhoux',
          telePhone: '183000000',
          shortPhone: '45123',
        },
        {
          id: 111,
          createdAt: 1487218088000,
          idCardImages: [
            'http://img1.imgtn.bdimg.com/it/u=2173638125,1490913710&fm=15&gp=0.jpg',
            'http://img3.imgtn.bdimg.com/it/u=1951674198,2294779761&fm=23&gp=0.jpg',
          ],
          name: '赵日天',
          sex: '男',
          nation: '汉族',
          idCard: '352341233214112232',
          birth: '91年4月',
          address: '浙江省杭州市西湖区文三西路999号',
          phoneNumber: '13111111111',
          mail: '123456@qq.com',
          qq: '123456',
          weChat: 'librazhoux',
          telePhone: '183000000',
          shortPhone: '45123',
        }],
      };
    },
    methods: {
      handleEdit(event, obj) {
        console.log(obj);
      },
      handleDelete(event, obj) {
        console.log(event);
      },
      handleSearchItem() {

      },
    },
  };
</script>
<style lang="scss" scoped>
#projectManagerList {
  .tips {
    border-bottom: 1px solid #d3dce6;
  }
  .card-panel {
    width: 100%;
    height: 800px;
    // overflow: hidden;
    // overflow-y: scroll;
  }
}
</style>
