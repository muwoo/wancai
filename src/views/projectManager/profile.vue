<template>
  <div id="projectManagerProfile">
    <div class="card">
      <div class="top">
        <span>我的信息</span>
      </div>
      <div class="card-body">
        <div class="avatar">
          <img :src="currentManager.avatar" />
        </div>
        <div class="user-info">
          <span>{{ currentManager.name }}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="top">
        <span>我的钱包</span>
      </div>
      <div class="card-body">
        <div class="balance">
          <span>余额：4130</span>
        </div>
        <el-button type="primary" size="small">提现</el-button>
        <!-- <el-button type="text" size="small" @click="logout">记 录</el-button>
        <el-button type="text" size="small" @click="logout">银行卡</el-button> -->
      </div>
    </div>
    <div class="card">
      <div class="top">
        <span>我的风险激励金</span>
      </div>
      <div class="card-body">
        <div class="balance">
          <span>余额：4130</span>
        </div>
        <!-- <el-button type="text" size="small">记录</el-button> -->
      </div>
    </div>
      <el-table
        :data="projects"
        height="500"
        border
        style="width: 100%; margin-top: 30px;">
        <el-table-column
          prop="id"
          label="ID"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="项目名称"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="projectManager"
          label="项目经理"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="recruitManager"
          label="招聘前台"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          align="center">
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  name: 'projectManagerProfile',
  data() {
    return {
      currentManager: {
        name: '',
        avatar: '',
      },
      projects: [],
    };
  },
  mounted() {
    const projectManager = JSON.parse(sessionStorage.getItem('project_manager')).data;
    this.$http.get(`${this.$managerURL}/user/detail?id=${projectManager.id}`).then((res) => {
      if (res.data.errorCode === 10000) {
        this.currentManager = res.data.data;
      }
    }).catch((err) => {
    });
  },
};
</script>

<style lang="scss" scoped>
#projectManagerProfile {
  .card {
    height: 200px;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #FFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);

    .top {
      height: 30px;
      background: #eef1f6;
      line-height: 30px;
      > span {
        margin-left: 10px;
        color: #9b9b9b;
      }
    }
    .card-body {
      height: 170px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      .avatar {
        width: 170px;
        height: 100%;
        > img {
          width: 110px;
          height: 110px;
          padding: 30px;
        }
      }
      .user-info {
        height: 110px;
        width: 100px;
        // padding: 30px;
        display: flex;
        flex-direction: column;
      }
      .balance {
        margin-left: 30px;
        width: 100px;
      }
    }
  }

  > div + div {
    margin-top: 40px;
  }
}
</style>
