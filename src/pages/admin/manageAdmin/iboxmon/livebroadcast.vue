<template>
  <div class="livebroadcast">
    <video id="myPlayer" poster controls playsinline webkit-playsinline autoplay>
      <!-- <source src="rtmp://rtmp.open.ys7.com/openlive/154c0da27e97401d86b01160a58f0894.hd" type="" />
      <source src="http://hls.open.ys7.com/openlive/154c0da27e97401d86b01160a58f0894.hd.m3u8" type="application/x-mpegURL" />-->
      <source :src="urlobj.data.hdAddress" type>
      <source :src="urlobj.data.rtmpHd" type="application/x-mpegURL">
      <!-- <source src="wss://wsopen.ys7.com/154c0da27e97401d86b01160a58f0894" /> -->
    </video>
  </div>
</template>
<script>
import Vue from "vue";
import { setCookie, getCookie } from "../../../../assets/js/cookie.js";
export default {
  name: "livebroadcast",
  data() {
    return {
      urlobj: {
        data: {}
      }
    };
  },
  props: ["iboxObj"],
  created() {},
  mounted() {
	let that = this;
	console.log(this.iboxObj)
    if (!this.iboxObj.cameraNum) {
      this.$message({
        type: "error",
        message: "暂无摄像头序列号"
      });
      return;
    }
    Vue.http.headers.common["userToken"] = getCookie("userToken");
    this.$http
      .get(this.global.getVideo + "?deviceSerial=" + this.iboxObj.cameraNum)
      .then(
        res => {
          if (res.body.status == 200) {
            this.urlobj = res.body.resultObject;
            setTimeout(() => {
              that.playEZUIKit();
            }, 100);
          }
        },
        err => {
          console.log(err);
        }
      );
  },
  methods: {
    playEZUIKit() {
      let player = new EZUIPlayer("myPlayer");
      player.on("error", function() {
        this.$message({
          type: "error",
          message: "播放失败"
        });
      });
      player.on("play", function() {
        console.log("play");
      });
      player.on("pause", function() {
        console.log("pause");
      });
      player.CapturePicture(lpPictureName);
    }
  }
};
</script>
<style scoped lang="less">
#myPlayer {
  height: 600px;
  width: 100%;
}
.livebroadcast {
  width: 920px;
  margin: 10px auto;
}
</style>