<template>
  <div id="administratorNewRole">
    <el-form :model="roleInfo" label-width="240px" ref="roleForm">
      <el-form-item label="角色名称">
        <el-input v-model="roleInfo.name" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="roleInfo.description" placeholder="请输入内容" style="width: 340px;"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-tree
          :data="authItems"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          :default-checked-keys="defualtCheckedKeys"
          :default-expanded-keys="defaultExpandedKeys"
          ref="tree"
          style="width: 400px;"
          v-loading="loading">
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
        description: '',
        auth: '',
      },
      authItems: [],
      defaultProps: {
        label: 'permission',
        children: 'children',
      },
      defualtCheckedKeys: [],
      defaultExpandedKeys: [],
      loading: false,
    };
  },
  methods: {
    handleSubmit() {
      const params = {
        id: this.$route.params.id,
        roleName: this.roleInfo.name,
        description: this.roleInfo.description,
        arr: this.getFinalCheckKeys(),
      };
      this.$http.post('/admin/role/add', params).then((response) => {
        if (response.data.errorCode === 10000) {
          this.$notify({
            title: '新建成功',
            type: 'success',
          });
          this.$router.push('role_list');
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getFinalCheckKeys(array) {
      // eslint-disable-next-line
      const childArray = this.$refs.tree.getCheckedNodes().map((node) => {
        return node.id;
      });
      // eslint-disable-next-line
      const parentArray = this.$refs.tree.getCheckedNodes().map((node) => {
        return node.parentId;
      });

      const finalArray = childArray.concat(parentArray);
      const uniqFinalArray = Array.from(new Set(finalArray));
      // eslint-disable-next-line
      return uniqFinalArray.filter((arr) => {
        return arr !== 0;
      });
    },
    getParentKeys(array) {
      this.defaultExpandedKeys = [];
      for (let i = 0; i < array.length; i += 1) {
        const id = array[i].id;
        if (id !== '') {
          this.defaultExpandedKeys.push(id);
        }
      }
      this.defualtCheckedKeys = this.defaultExpandedKeys;
    },
  },
  mounted() {
    this.loading = true;
    this.$http.get('/admin/permissions/list').then((response) => {
      if (response.data.errorCode === 10000) {
        this.authItems = response.data.data;
        this.getParentKeys(this.authItems);
      } else {
        this.$notify.error({
          title: '获取权限列表异常',
          type: 'success',
        });
      }
      this.loading = false;
    }).catch((err) => {
      this.loading = false;
    });
  },
};
</script>

<style lang="scss" scoped>
  #administratorNewRole {
  }
</style>
