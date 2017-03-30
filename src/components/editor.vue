<template>
  <div id="editor" v-html="inputContent" @input="outputContent"></div>
</template>
<script>
import WangEditor from 'wangeditor';
/* eslint-disable */
export default {
  props: ['inputContent'],
  data() {
    return {
      content: '',
      token: '',
    };
  },
  methods: {
    createEditor() {
      const self = this;
      const editor = new WangEditor('editor');
      this.$http.get('/qiniu/token').then((response) => {
        const {
          data: {
            fileName, upToken,
          },
        } = response.data;
        if (response.data.errorCode === 10000) {
          editor.config.menus = ['source', '|', 'eraser', 'bold', 'underline', 'italic', 'strikethrough', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright',
            '|', 'link', 'unlink', 'table', 'img', 'video', 'insertcode', '|', 'undo', 'redo', 'fullscreen',
          ];
          editor.config.uploadImgUrl = '//upload.qiniu.com/';
          editor.config.uploadParams = {
            token: upToken,
            key: Math.random().toString(36).substring(4, 33),
          };
          editor.onchange = function () {
            self.formatContent(this.$txt.html());
          };
          editor.create();
        } else {
          this.$notify.error({
            title: '编辑器初始化失败',
            type: 'success',
          });
        }
      }).catch((error) => {
      });
    },
    formatContent(content) {
        // handle
        // ...
      this.content = content;
      this.outputContent();
    },
    outputContent() {
      this.$emit('input', this.content);
    },
  },
  mounted() {
    this.createEditor();
  },
};
</script>
<style lang="scss" scoped>
#editor{
  height: 500px;
  .wangEditor-container{
      border-radius: 2px;
      overflow: hidden;
      border: 1px solid #CCC;
  }
}

</style>
