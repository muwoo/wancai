<template>
  <div id="contentAdd">
    <el-form :model="contentInfo" label-width="100px" :rules="contentInfoRules" ref="contentInfoForm">
      <el-form-item label='类型' prop='type'>
        <el-select v-model="contentInfo.type" placeholder="请选择">
          <el-option
            v-for="item in contentTypes"
            :value="item.value"
            :label="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='标题' prop='title'>
        <el-input v-model="contentInfo.title" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item>
        <v-editor
        :input-content="contentInfo.inputContent"
        v-model="contentInfo.outputContent"></v-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="submit" style="margin-top: 20px;width: 140px;">提 交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Editor from '../../../components/editor';

export default {
  name: 'contentAdd',
  data() {
    return {
      contentInfo: {
        inputContent: '',
        outputContent: '',
        type: 0,
      },
      contentTypes: [{
        value: 0,
        label: '公告',
      },
      {
        value: 1,
        label: '学堂',
      },
      {
        value: 2,
        label: '规则',
      },
      {
        value: 3,
        label: '协议与文章',
      }],
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
