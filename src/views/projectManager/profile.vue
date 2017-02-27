<template>
  <div id="projectManagerProfile">
    <div class="card">
      <div class="top">
        <span>我的信息</span>
      </div>
      <div class="card-body">
        <div class="avatar">
          <img :src="avatar" />
        </div>
        <div class="user-info">
          <span>赵日天</span>
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
          label="项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="projectManager"
          label="项目经理"
          width="180">
        </el-table-column>
        <el-table-column
          prop="recruitManager"
          label="招聘前台">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间">
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  name: 'projectManagerProfile',
  data() {
    return {
      avatar: 'http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=gakki&step_word=&hs=0&pn=17&spn=0&di=130959536210&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=2004972027%2C4085640711&os=243058477%2C3081347444&simid=0%2C0&adpicid=0&lpn=0&ln=1993&fr=&fmq=1488166033679_R&fm=result&ic=0&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=11&oriquery=&objurl=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Fface%2Ffd2f713743763aca6f42e48784dd08dffad5c83c.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bktstktst_z%26e3Bv54AzdH3Fet1j5AzdH3Fweb9cm8clAzdH3F&gsm=0&rpstart=0&rpnum=0',
      projects: [{
        id: 1,
        name: '萧山一号仓',
        projectManager: '赵日天',
        recruitManager: '叶良辰',
        createdAt: '2015-1-1',
      },
      {
        id: 1,
        name: '萧山一号仓',
        projectManager: '赵日天',
        recruitManager: '叶良辰',
        createdAt: '2015-1-1',
      },
      {
        id: 1,
        name: '萧山一号仓',
        projectManager: '赵日天',
        recruitManager: '叶良辰',
        createdAt: '2015-1-1',
      },
      {
        id: 1,
        name: '萧山一号仓',
        projectManager: '赵日天',
        recruitManager: '叶良辰',
        createdAt: '2015-1-1',
      },
      {
        id: 1,
        name: '萧山一号仓',
        projectManager: '赵日天',
        recruitManager: '叶良辰',
        createdAt: '2015-1-1',
      }],
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
