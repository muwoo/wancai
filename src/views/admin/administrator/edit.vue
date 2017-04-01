<template>
  <div id="administratorRoleEdit">
    <el-form :model="roleInfo" label-width="240px" ref="roleForm">
      <el-form-item label="角色名称：">
        <el-input v-model="roleInfo.name" placeholder="请输入内容" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="roleInfo.description" placeholder="请输入内容" style="width: 340px;"></el-input>
      </el-form-item>
      <el-form-item label="权限：">
        <el-tree
          :data="authItems"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          :default-checked-keys="defaultCheckedKeys"
          :default-expanded-keys="defaultExpandedKeys"
          ref="tree"
          style="width: 400px;"
          v-loading="loading">
        </el-tree>
      </el-form-item>
      <el-form-item label=''>
        <el-button type="primary" @click="handleSubmit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'administratorRoleEdit',
  data() {
    return {
      roleInfo: {
        name: '',
        description: '',
        auths: '',
      },
      authItems: [],
      defaultProps: {
        label: 'permission',
        children: 'children',
      },
      defaultCheckedKeys: [],
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
      this.$http.post('/admin/role/modify', params).then((response) => {
        if (response.data.errorCode === 10000) {
          this.$notify({
            title: '修改成功',
            type: 'success',
          });
          this.getCurrentPermissions();
        }
      }).catch((error) => {
        console.log(error);
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
    setCheckedKeys(array) {
      this.defaultCheckedKeys = [];
      for (let i = 0; i < array.length; i += 1) {
        for (let j = 0; j < array[i].children.length; j += 1) {
          this.defaultCheckedKeys.push(array[i].children[j].id);
        }
      }
    },
    getArray(array) {
      const newArray = [];
      for (let i = 0; i < array.length; i += 1) {
        const id = array[i];
        newArray.push(id);
      }
      return newArray;
    },
    getCurrentPermissions() {
      this.$http.get(`/admin/role/detail?id=${this.$route.params.id}`).then((res) => {
        if (res.data.errorCode === 10000) {
          this.roleInfo.description = res.data.data.description;
          this.roleInfo.name = res.data.data.roleName;
          this.roleInfo.auths = res.data.data.permissionList;
          this.setCheckedKeys(this.roleInfo.auths);
        } else {
          this.$notify.error({
            title: '获取权限异常',
            type: 'success',
          });
        }
      });
    },
  },
  mounted() {
    const that = this;
    this.loading = true;
    this.getCurrentPermissions();
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
  #administratorRoleEdit {
  }
</style>
