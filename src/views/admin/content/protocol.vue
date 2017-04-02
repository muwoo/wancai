<template>
  <div id="contentProtocol">
    <label>关键词：<input v-model="keyword"></label>
    <label>地区：<input v-model="location"></label>
    <baidu-map class="map-container"
    :scroll-wheel-zoom="true"
    :center="center"
    :zoom="zoom">
      <bm-view class="bm-view">
      </bm-view>
      <bm-local-search
        :keyword="keyword"
        :auto-viewport="true"
        :location="location"
        @markersset="markersset"
        @infohtmlset="infohtmlset">
      </bm-local-search>
    </baidu-map>
    <!-- <el-input v-model="keyword" style="width: 200px;"></el-input>
    <baidu-map class="map-container"
    :scroll-wheel-zoom="true"
    :center="{lng: 116.404, lat: 39.915}"
    >
      <bm-view class="bm-view">
      </bm-view>
      <bm-local-search :keyword="keyword" :auto-viewport="true"></bm-local-search>
    </baidu-map> -->
  </div>
</template>
<script>
  export default {
    name: 'contentProtocol',
    data() {
      return {
        location: '',
        keyword: '',
        center: { lng: 121.59996, lat: 31.197646 },
        zoom: 12,
      };
    },
    methods: {
      markersset(pois) {
        // console.log(pois);
      },
      infohtmlset(poi) {
        console.log(poi);
        // alert(poi);
      },
    },
  };
</script>
<style lang="scss" scoped>
#contentProtocol {
  .map-container {
    .bm-view {
      width: 100%;
      height: 400px;
    }
  }
  .bm-view {
    width: 400px;
    height: 300px;
  }
}
</style>
