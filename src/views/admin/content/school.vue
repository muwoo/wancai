<template>
  <div id="contentSchool">
    <el-row>
      <v-editor
      :input-content="inputContent"
      v-model="outputContent"></v-editor>
    </el-row>
    <el-row>
      <el-button type="primary" size="large" @click="submit" style="margin-top: 20px;">提 交</el-button>
    </el-row>
  </div>
</template>
<script>
import Editor from '../../../components/editor';

export default {
  name: 'contentSchool',
  data() {
    return {
      inputContent: '',
      outputContent: '',
      // uploadUrl: '//upload.qiniu.com/',
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
