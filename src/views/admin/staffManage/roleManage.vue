<template>
  <div id="roleManage">
    <el-row>
      <el-col :span="24" class="new-btn">
        <el-row type="flex" justify="end">
          <el-button type="primary">创建角色</el-button>
        </el-row>
      </el-col>
      <el-col :span="24">
        <el-table
          :data="roles"
          :border='true'
          style="width: 100%;">
          <el-table-column
            prop="createdAt"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色名称">
          </el-table-column>
          <el-table-column
            prop="comment"
            label="备注">
          </el-table-column>
          <el-table-column
            label="操作"
            width="240">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleSetLiamit(scope.$index, scope.row)">修改权限</el-button>
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
export default {
  name: 'roleManage',
  data() {
    return {
      roles: [{
        name: '超级管理员',
        createdAt: '2015-1-1',
        comment: '傻逼专用分组',
      }],
    };
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
  #roleManage {
    .new-btn {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
</style>
