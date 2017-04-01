<template>
  <div id="administratorList">
    <el-form :inline="true" :model="adminInfo" style="margin-top: 20px;">
      <el-row>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label='身份证号：' style="width: 100%;">
              <el-input v-model="adminInfo.idCard" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='手机号码：' style="width: 100%;">
              <el-input v-model="adminInfo.phoneNumber" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='姓名：' style="width: 100%;">
                <el-input v-model="adminInfo.name" placeholder="请输入内容" style="width: 150px;"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label='选择角色：' prop="role" style="width: 500px;">
              <el-select v-model="adminInfo.roleId" placeholder="请选择">
                <el-option
                  v-for="item in adminInfo.roles"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="handleSearchItem">搜索管理员</el-button>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <div class="tips"></div>
    <div class="card-panel"
      v-loading="loading">
      <administratorInfo v-for="(info, index) in infos" :administrator="info"
      @handleEdit="handleEdit(this.event, info)"
      @handleDelete="handleDelete(this.event, info, index)"
      style="margin-top: 10px;" ></administratorInfo>
    </div>
    <el-col :span="24" style="margin-top:10px;">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-count="pageCount" style="float: right;"></el-pagination>
    </el-col>
  </div>
</template>
<script>
  import administratorInfo from '../../../components/administratorInfo';

  export default {
    name: 'administratorList',
    components: {
      administratorInfo,
    },
    data() {
      return {
        adminInfo: {
          idCard: '',
          phoneNumber: '',
          name: '',
          roleId: 0,
          roles: [{ value: 0, label: '不限' }],
        },
        infos: [],
        currentPage: 1,
        pageSize: 10,
        pageCount: 0,
        loading: false,
      };
    },
    methods: {
      handleEdit(event, obj) {
        this.$router.push({ name: 'administratorRoleEditAdmin', params: { id: obj.id } });
      },
      handleDelete(event, obj, index) {
        this.$http.post(`/admin/delete?id=${obj.id}`).then((response) => {
          if (response.data.errorCode === 10000) {
            this.$notify({
              title: '已删除',
              type: 'success',
            });
            this.infos.splice(index, 1);
          } else {
            this.$notify.error({
              title: '修改异常',
              type: 'success',
            });
          }
        }).catch((err) => {
        });
      },
      handleSearchItem() {
        this.getAdministrators();
      },
      handleCurrentPageChange(val) {
        this.currentPage = val;
        this.getAdministrators();
      },
      getAdministrators() {
        this.loading = true;
        const roleType = this.adminInfo.roleId === 0 ? '' : this.adminInfo.roleId;
        const params = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          idCard: this.adminInfo.idCard,
          phone: this.adminInfo.phone,
          name: this.adminInfo.name,
          rolesId: roleType,
        };
        // console.log(params);
        this.$http.post('/admin/user/list', params).then((response) => {
          const {
            data: {
              list, pages, pageNum,
            },
          } = response.data;
          this.currentPage = pageNum;
          this.pageCount = pages;
          this.infos = list;
          this.loading = false;
          console.log(this.infos);
        }).catch((error) => {
          console.log(error);
          this.loading = false;
        });
      },
      cookRoles(allRoles) {
        for (let i = 0; i < allRoles.length; i += 1) {
          const tmp = allRoles[i];
          this.adminInfo.roles.push({ value: tmp.id, label: tmp.roleName });
        }
      },
    },
    mounted() {
      this.getAdministrators();
      this.$http.get('/admin/role/list').then((response) => {
        if (response.data.errorCode === 10000) {
          const roles = response.data.data;
          this.cookRoles(roles);
        }
      });
    },
  };
</script>
<style lang="scss" scoped>
#administratorList {
  .tips {
    border-bottom: 1px solid #d3dce6;
  }
  .card-panel {
    width: 100%;
    height: auto;
  }
}
</style>
