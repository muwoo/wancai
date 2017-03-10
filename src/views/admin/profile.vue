<template>
  <div id="projectManagerProfile">
    <div class="card">
      <div class="top">
        <span>个人中心</span>
      </div>
      <div class="card-body">
        <div class="avatar">
          <!-- <img :src="avatar" /> -->
        </div>
        <div class="user-info">
          <span>{{ currentUser.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adminProfile',
  data() {
    return {
      currentUser: {
        name: '',
      },
    };
  },
  mounted() {
    const admin = JSON.parse(sessionStorage.getItem('admin')).data;
    if (admin) {
      this.currentUser.name = admin.name || '';
    }
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
