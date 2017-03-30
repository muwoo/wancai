<template>
  <div id="editor" v-html="inputContent" @input="outputContent"></div>
</template>
<script>
/* eslint-disable */
import WangEditor from 'wangeditor';

export default {
  props: ['inputContent', 'uploadUrl', 'uploadParams'],
  data() {
    return {
      content: '',
    };
  },
  methods: {
    createEditor() {
      const self = this;

      const editor = new WangEditor('editor');
      editor.config.menus = ['source', '|', 'eraser', 'bold', 'underline', 'italic', 'strikethrough', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright',
        '|', 'link', 'unlink', 'table', 'img', 'video', 'insertcode', '|', 'undo', 'redo', 'fullscreen',
      ];
      editor.config.uploadImgUrl = this.uploadImgUrl;
      editor.config.uploadParams = this.uploadParams;
      editor.config.uploadHeaders = {
        'Accept' : '*/*'
      };
      editor.onchange = function () {
        self.formatContent(this.$txt.html());
      };
      editor.create();
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
