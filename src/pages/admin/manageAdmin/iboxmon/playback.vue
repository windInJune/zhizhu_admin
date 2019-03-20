<template>
  <div class="playback">
    <div class="againbox">
      <span class="demonstration">开始时间：</span>
      <el-date-picker v-model="searchdata.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
      <span class="demonstration" style="margin-left:30px;">结束时间：</span>
      <el-date-picker v-model="searchdata.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
      <el-button type="primary" @click="getplay()" style="margin-left:30px;">播放</el-button>
    </div>
    <div class="backmes">
      <p>请先下载安装插件，打开IE浏览器，复制回放地址后进入页面，再复制回放信息，观看回放</p>
      <el-form :model="urlobj" label-width="150px">
        <el-form-item label="下载SDK">
          <el-button type="primary" @click="download()">下载</el-button>
          <span style="margin-left:10px;">已经安装过，无需再次安装</span>
        </el-form-item>
        <el-form-item label="回放地址">
          <el-input type="text" v-model="urlobj.url" ref="url"></el-input>
          <el-button type="primary" @click="copymes('url')">复制</el-button>
        </el-form-item>
        <el-form-item label="回放信息">
          <el-input
            type="textarea"
            ref="mes"
            :autosize="{ minRows: 4, maxRows: 6}"
            v-model="urlobj.appmes"
          ></el-input>
          <el-button type="primary" @click="copymes('mes')">复制</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { setCookie, getCookie } from "../../../../assets/js/cookie.js";
export default {
  name: "playback",
  data() {
    return {
      searchdata: {},
      urlobj: {
        url: "http://47.110.226.59/ibox/EZUIKit_Demo.html",
        appmes: ""
      },
      resultObject: {}
    };
  },
  components: {
    // Navrouter
  },
  props: ["timedata", "iboxObj"],
  created() {
    if (this.timedata) {
      this.searchdata = {
        startTime: this.timedata.startTime * 1000,
        endTime: this.timedata.endTime * 1000
      };
    }
  },
  mounted() {
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
            this.resultObject = res.body.resultObject;
          }
        },
        err => {
          console.log(err);
        }
      );
  },
  methods: {
    download() {
      window.open('http://47.110.226.59/ibox/EZUIKit.exe');
    },
    copymes(ref) {
      let tag = this.$refs[ref];
      tag.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
    },
    getplay() {
      if (this.searchdata.startTime * 1 > this.searchdata.endTime * 1) {
        this.$message({
          type: "error",
          message: "开始时间不能大于结束时间"
        });
        return;
      }
      let startTime = this.settime(this.searchdata.startTime),
        endTime = this.settime(this.searchdata.endTime);
      let str = "begin=" + startTime + "&end=" + endTime;
      let keys = JSON.stringify({
        AppKey: "f42f220758e94296b06462453d9d7a3f",
        AccessToken: this.resultObject.accessToken,
        Url: "ezopen://open.ys7.com/C54604447/1.local.rec?" + str
      });
      this.urlobj["appmes"] = keys;
    },
    settime(val) {
      let date = new Date(val);
      let Y = date.getFullYear();
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    }
  }
};
</script>
<style scoped lang="less">
#myPlayer {
  width: 100%;
}
.playback {
  margin: 10px auto;
  .againbox {
    height: 94px;
    display: flex;
    align-items: center;
    background: #f5f5f5;
    padding: 29px;
    justify-content: center;
  }
  .backmes {
    margin-top: 30px;
    p {
      text-indent: 50px;
      margin-bottom: 30px;
      color: #f00;
    }
  }
}
</style>
<style lang="less">
.playback {
  .backmes {
    .el-input,
    .el-textarea {
      width: 500px;
    }
  }
}
</style>


