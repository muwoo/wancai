<template>
  <div id="administratorNewRole">
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
          show-checkbox
          node-key="id"
          :props="defaultProps"
          :default-checked-keys="[1, 2, 3]"
          :default-expanded-keys="[1, 2, 3]"
          ref="tree"
          style="width: 250px;">
        </el-tree>
      </el-form-item>
      <el-form-item label=''>
        <el-button type="primary" @click="handleSubmit">确认新建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'administratorNewRole',
  data() {
    return {
      roleInfo: {
        name: '',
        comment: '',
        auth: '',
      },
      authItems: [{
        id: 1,
        label: '经纪人',
        children: [{
          id: 4,
          label: '待审核',
        },
        {
          id: 9,
          label: '已拉黑',
        }],
      },
      {
        id: 2,
        label: '项目管理',
        children: [{
          id: 5,
          label: '新建项目',
        },
        {
          id: 6,
          label: '项目列表',
        }],
      },
      {
        id: 3,
        label: '项目经理管理',
        children: [{
          id: 7,
          label: '新建项目经理',
        },
        {
          id: 8,
          label: '项目经理列表',
        }],
      }],
      defaultProps: {
        label: 'label',
        children: 'children',
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
  },
};
</script>

<style lang="scss" scoped>
  #administratorNewRole {
  }
</style>
