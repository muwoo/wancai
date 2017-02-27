<template>
  <div id="projectManagerProfile">
    <div class="card">
      <div class="top">
        <span>我的信息</span>
      </div>
      <div class="card-body">

      </div>
    </div>
    <div class="card">
      <div class="top">
        <span>我的钱包</span>
      </div>
      <div class="card-body">

      </div>
    </div>
    <div class="card">
      <div class="top">
        <span>我的风险激励金</span>
      </div>
      <div class="card-body">

      </div>
    </div>
    <div class="card">
      <div class="top">
        <span>我的项目</span>
      </div>
      <div class="card-body">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'projectManagerProfile',
  data() {
    return {

    };
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
    }
  }

  > div + div {
    margin-top: 40px;
  }
}
</style>
