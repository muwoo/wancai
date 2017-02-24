<template>
  <div id="newRole">
    <el-form :model="roleInfo" label-width="240px" ref="roleForm">
      <el-form-item label="角色名称">
        <el-input v-model="roleInfo.name" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="roleInfo.comment" placeholder="请输入内容" style="width: 340px;"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-tree
          :data="authItems"
          :props="props"
          :load="loadNode"
          lazy
          show-checkbox
          @check-change="handleCheckChange"
          style="width: 250px;">
        </el-tree>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'newRole',
  data() {
    return {
      roleInfo: {
        name: '',
        comment: '',
        auth: '',
      },
      authItems: [{
        name: '经纪人管理',
      },
      {
        name: '管理员管理',
      }],
      props: {
        label: 'name',
        children: 'zones',
      },
    };
  },
  methods: {
    handleCheckChange() {

    },
  },
};
</script>

<style lang="scss" scoped>
  #newRole {
  }
</style>
