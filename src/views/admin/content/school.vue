<template>
  <div id="contentSchool">
    <v-editor
    :input-content="inputContent"
    v-model="outputContent"></v-editor>
    <el-button @click="submit">提交</el-button>
  </div>
</template>
<script>
import Editor from '../../../components/editor';

export default {
  name: 'contentSchool',
  data() {
    return {
      // input content to editor
      inputContent: 'base on wangeditor',
      // output content from editor
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
