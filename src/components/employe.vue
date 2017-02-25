<template>
  <div id="employe">
    <div>
      <el-button type="primary" v-if="!isEdit" @click="handleEdit">编 辑</el-button>
      <el-button type="primary" v-if="isEdit" @click="handleSave">保 存</el-button>
      <el-button type="primary" @click="handleAddBlack">加入黑名单</el-button>
    </div>
    <div>
      <span>{{ employInfo.idCardNumber }}</span>
    </div>
    <div>
      <img class="image" v-for="item in employInfo.idCardImages" @click.prevent="handleClickImage" :src="item"/>
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
    <el-form :model="employInfo" :rules="employInfoRules" ref="employeInfo">
    </el-form>
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
          sex: '男',
          nation: '汉',
          birth: '1900-1-1',
          idCardAddress: '杭州市西湖区文三路xxx号xxx',
        },
        currentImage: '',
        BigImageVisible: false,
        isEdit: false,
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
    .image {
      width: 80px;
      height: 50px;
    }
    .tips {
      border-bottom: 1px solid #e5e9f2;
    }
  }
</style>
