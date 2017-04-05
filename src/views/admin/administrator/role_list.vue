<template>
  <div id="administratorRoleList">
    <el-row>
      <el-col :span="24">
        <el-table
          :data="roles"
          :border='true'
          style="width: 100%;">
          <el-table-column
            prop="createdAt"
            :formatter='formatCreatedDate'
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名称">
          </el-table-column>
          <el-table-column
            prop="description"
            label="备注">
          </el-table-column>
          <el-table-column
            label="操作"
            width="240">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleSetLimit(scope.$index, scope.row)">修改权限</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import util from '../../../common/util';

export default {
  name: 'administratorRoleList',
  data() {
    return {
      roles: [],
    };
  },
  methods: {
    handleSetLimit(index, row) {
      this.$router.push({ name: 'adminRoleEdit', params: { id: row.id } });
    },
    handleDelete(index, row) {
      const params = {
        id: row.id,
      };
      this.$http.post('/admin/role/delete', params).then((response) => {
        if (response.data.errorCode === 10000) {
          this.$notify({
            title: '删除成功',
            type: 'success',
          });
          this.getRoleList();
        }
      });
    },
    formatCreatedDate(row, column) {
      const date = new Date(parseInt(row.createdAt, 0));
      return util.formatDate.formatUtc(date, 'yyyy-MM-dd hh:mm');
    },
    getRoleList() {
      this.$http.get('/admin/role/list').then((response) => {
        if (response.data.errorCode === 10000) {
          this.roles = response.data.data;
        }
      });
    },
  },
  mounted() {
    this.getRoleList();
  },
};
</script>

<style lang="scss" scoped>
  #administratorRoleList {
    .new-btn {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
</style>
