<template>
  <div id="contentSchool">
    <el-row>
    </el-row>
    <el-row>
      <v-editor
      :input-content="inputContent"
      v-model="outputContent"></v-editor>
    </el-row>
    <el-row>
      <el-button type="primary" size="large" @click="submit" style="margin-top: 20px;">提交</el-button>
    </el-row>
  </div>
</template>
<script>
import Editor from '../../../components/editor';

export default {
  name: 'contentSchool',
  data() {
    return {
      inputContent: 'base content',
      outputContent: '',
    };
  },
  methods: {
    submit() {
      console.log(this.outputContent);
    },
  },
  components: {
    'v-editor': Editor,
  },
};
</script>
<style lang="scss" scoped>
</style>
