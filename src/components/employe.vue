<template>
  <div id="employe">
    <div>
      <el-button type="primary" v-if="!isEdit" @click="isEditDialogVisible = true">编 辑</el-button>
      <el-button type="primary" @click="handleAddBlack">加入黑名单</el-button>
    </div>
    <div>
      <img class="image" v-for="item in employInfo.idCardImages" @click.prevent="handleClickImage" :src="item"/>
    </div>
    <div>
      <span>{{ employInfo.name }}</span>
    </div>
    <div>
      <span>{{ employInfo.idCardNumber }}</span>
    </div>
    <div>
      <span>{{ employInfo.sex }}</span>
      <span>{{ employInfo.nation }}</span>
    </div>
    <div>
      <span>{{ employInfo.birth }}</span>
    </div>
    <div>
      <span>{{ employInfo.idCardAddress }}</span>
    </div>
    <h1 class="tips"></h1>
    <div><span style="font-size: 16px; font-weight: 800;">基本信息</span></div>
    <div>
      <span>学历：</span>
      <span>{{ employInfo.itemName }}</span>
    </div>
    <div>
      <span>婚姻：</span>
      <span>{{ employInfo.itemName }}</span>
    </div>
    <div>
      <span>健康状况：</span>
      <span>{{ employInfo.itemName }}</span>
    </div>
    <div>
      <span>常住地址：</span>
      <span>{{ employInfo.itemName }}</span>
    </div>
    <h1 class="tips"></h1>
    <div><span style="font-size: 16px; font-weight: 800;">工作经历</span></div>
    <div>
      <span>工作单位：</span>
      <span>{{ employInfo.itemName }}</span>
    </div>
    <div>
      <span>职务：</span>
      <span>{{ employInfo.itemName }}</span>
    </div>
    <div>
      <span>离职原因：</span>
      <span>{{ employInfo.itemName }}</span>
    </div>
    <div>
      <span>起止日期：</span>
      <span>{{ employInfo.itemName }}</span>
    </div>
    <div>
      <span>证明人及电话：</span>
      <span>{{ employInfo.itemName }}</span>
    </div>
    <h1 class="tips"></h1>
    <div><span style="font-size: 16px; font-weight: 800;">教育经历</span></div>
    <div>
      <span>学校或培训单位：</span>
      <span>{{ employInfo.itemName }}</span>
    </div>
    <div>
      <span>起止日期：</span>
      <span>{{ employInfo.itemName }}</span>
    </div>
    <div>
      <span>专业或课程：</span>
      <span>{{ employInfo.itemName }}</span>
    </div>
    <h1 class="tips"></h1>
    <div>
      <span>名单ID：</span>
      <span>{{ employInfo.itemName }}</span>
    </div>
    <div>
      <span>提交时间：</span>
      <span>{{ employInfo.itemName }}</span>
    </div>
    <el-dialog title="修改信息" v-model="isEditDialogVisible">
      <div style="height: 440px; overflow-y: scroll;">
        <el-form :model="employInfo" label-width="130px" :rules="employInfoRules" ref="employeInfo">
          <el-form-item label="学历：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="婚否：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="健康状况：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="常住地址：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="工作单位：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="职务：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="离职原因：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="入职日期：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="离职日期：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="证明人：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="学校或培训单位：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="开始日期：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="结束日期：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="专业或课程：">
            <el-input v-model="employInfo.itemName" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="handleSave" style="margin-top: 20px; text-align: center;">保 存</el-button>
    </el-dialog>
    <bigImage v-model="BigImageVisible" :image="currentImage" :visible="BigImageVisible" @handleWrapperClick="handleBigImageClose"></bigImage>
  </div>

</template>
<script>
  import bigImage from './bigImage';

  export default {
    name: 'employe',
    data() {
      return {
        employInfo: {
          idCardImages: [
            'http://img1.imgtn.bdimg.com/it/u=2173638125,1490913710&fm=15&gp=0.jpg',
            'http://img3.imgtn.bdimg.com/it/u=1951674198,2294779761&fm=23&gp=0.jpg',
          ],
          name: '赵日天',
          idCardNumber: '314123419937129832',
          sex: '男',
          nation: '汉',
          birth: '1900-1-1',
          idCardAddress: '杭州市西湖区文三路xxx号xxx',
          itemName: '辣鸡公司',
        },
        currentImage: '',
        BigImageVisible: false,
        isEditDialogVisible: false,
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
      handleBigImageClose() {
        this.BigImageVisible = false;
      },
      // 编辑
      handleEdit() {

      },
      // 保存
      handleSave() {

      },
      // 拉黑
      handleAddBlack() {

      },
    },
  };
</script>
<style lang="scss" scoped>
  #employe {
    // background: #ECEEF3;
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    left: 0px;
    overflow-y: scroll;
    margin: 10px;
    border: 2px solid #20a0ff;

    display: flex;
    flex-direction: column;

    > div {
      margin-top: 10px;
      margin-left: 38px;
      > img + img {
        margin-left: 10px;
      }
    }
    .el-form {
      > div {
        margin-top: 10px;
        margin-left: 38px;
      }
    }
    .image {
      width: 80px;
      height: 50px;
      margin-top: 10px;
    }
    .tips {
      border-bottom: 1px solid #e5e9f2;
    }
  }
</style>
