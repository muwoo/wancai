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
        title: '',
        inputContent: '',
        outputContent: '',
        type: 1,
      },
      contentTypes: [{
        value: 1,
        label: '公告',
      },
      {
        value: 2,
        label: '学堂',
      },
      {
        value: 3,
        label: '规则',
      },
      {
        value: 4,
        label: '协议与文章',
      }],
      contentInfoRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submit() {
      const params = {
        title: this.contentInfo.title,
        type: this.contentInfo.type,
        content: this.contentInfo.outputContent,
      };
      console.log(this.contentInfo.outputContent);
      // this.$http.post('/news/add', params).then((response) => {
      //   if (response.data.errorCode === 10000) {
      //     this.$notify({
      //       title: '新建成功',
      //       type: 'success',
      //     });
      //   } else {
      //     this.$notify.error({
      //       title: '新建失败',
      //       type: 'success',
      //     });
      //   }
      // });
    },
    cookHtml(bodyContent) {
      return `<!DOCTYPE html><head><meta charset="UTF-8"><title>${this.contentInfo.title}</title></head><body>${this.contentInfo.outputContent}</body></html>`;
    },
  },
  components: {
    'v-editor': Editor,
  },
};
</script>
<style lang="scss" scoped>
</style>
