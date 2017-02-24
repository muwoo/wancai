<template>
  <div class="u-mask" @click.prevent="handleWrapperClick" v-show="visible">
    <div class="u-image">
      <img :src="image" />
    </div>
  </div>
</template>
<script>
  export default {
    name: 'bigImage',
    methods: {
      handleWrapperClick(evt) {
        this.$emit('handleWrapperClick', evt);
      },
    },
    props: {
      image: {
        default: '',
        type: String,
      },
      visible: {
        default: false,
      },
    },
  };
</script>
<style lang="scss" scoped>
  .u-mask {
    // opacity: 0.6!important;
    // filter: alpha(opacity=60);
    // background: #000000;
    background-color: rgba(0,0,0,0.6);
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 20;
    .u-image {
      > img {
        z-index: 99;
      }
    }
  }
</style>
