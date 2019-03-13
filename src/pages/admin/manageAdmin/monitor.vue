<template>
  <div class="adminList">
    <ul class="top">
      <li class="left">
        <span @click="$router.go(-1)">IBOX管理</span>
        <i class="el-icon-caret-right"></i> 监控
      </li>
    </ul>
    <div class="monitor">
        <div class="iboxlf">
          <h4>基本信息</h4>
          <img v-show="iboxObj.iboxStatus==0" src="../../../assets/images/ibox1.png">
          <img v-show="iboxObj.iboxStatus==1" src="../../../assets/images/ibox2.png">
          <img v-show="iboxObj.iboxStatus==2" src="../../../assets/images/ibox3.png">
          <!-- <img src="../../../assets/img/ibox1.png"> -->
          <ul>
            <li class="textell">
              <span class="iboxtext">设备名称：</span>
              <span>{{iboxObj.iboxName}}</span>
            </li>
            <li class="textell">
						<span class="iboxtext">型号：</span><span>{{iboxObj.iboxType==1?'通用型':'/'}}</span>
					</li>
					<li class="textell">
						<span class="iboxtext">编号：</span><span>{{iboxObj.iboxNum || '/'}}</span>
					</li>
					<li class="textell">
						<span class="iboxtext">所在地区：</span><span>{{iboxObj.iboxRegion || '/'}}</span>
					</li>
            <!-- <li class="textell">
              <span class="iboxtext">型号：</span>
              <span>{{iboxObj.iboxName}}</span>
            </li>
            <li class="textell">
              <span class="iboxtext">编号：</span>
              <span>{{iboxObj.iboxNum}}</span>
            </li>
            <li class="textell">
              <span class="iboxtext">所在地区：</span>
              <span>{{iboxObj.iboxName}}</span>
            </li> -->
            <li class="textell">
              <span class="iboxtext">所属机构：</span>
              <span>{{iboxObj.schoolName}}</span>
            </li>
            <li class="textell">
              <span class="iboxtext">负责人：</span>
              <span>{{iboxObj.managerName}}</span>
            </li>
            <li class="textell">
              <span class="iboxtext">联系电话：</span>
              <span>{{iboxObj.managerTel}}</span>
            </li>
            <li class="textell">
              <span class="iboxtext">状态：</span>
              <span>{{iboxObj.iboxStatus | getiboxstatus}}</span>
            </li>
            <li class="textell">
              <span class="iboxtext">使用人次：</span>
              <span>{{iboxObj.useringTotalCount || '/'}}</span>
            </li>
            <li class="textell">
              <span class="iboxtext">最近使用时间：</span>
              <span>{{iboxObj.latestTime | totimestr}}</span>
            </li>
          </ul>
        </div>
        <div class="iboxrg">
          <ol class="iboxrgtab">
            <li class="cur" @click="showcent(0);showind=0;" :class="showind==0?'checkedol':''">
              <i class="iconfont icon-live_icon"></i>
              <span>实况直播</span>
            </li>
            <!-- <li class="cur" @click="showcent(1);showind=1;" :class="showind==1?'checkedol':''">
              <i class="iconfont icon-zhibohuifang"></i>
              <span>视频回放</span>
            </li> -->
            <li class="cur" @click="showcent(2);showind=2;" :class="showind==2?'checkedol':''">
              <i class="iconfont icon-icon-test"></i>
              <span>使用记录</span>
            </li>
            <li class="cur" @click="showcent(3);showind=3;" :class="showind==3?'checkedol':''">
              <i class="iconfont icon-shezhi"></i>
              <span>设置</span>
            </li>
          </ol>
          <livebroadcast v-if="showind==0"></livebroadcast>
				<!-- <playback v-if="showind==1" :timedata='timedata'></playback> -->
			  	<uselist v-if="showind==2" @seeplack="seeplack"></uselist>
          <iboxseting v-if="showind==3" :iboxObj="iboxObj"></iboxseting>
        </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { setCookie, getCookie } from "../../../assets/js/cookie.js";
import iboxseting from './iboxmon/iboxseting.vue';
import livebroadcast from './iboxmon/livebroadcast.vue';
import playback from './iboxmon/playback.vue';
import uselist from './iboxmon/uselist.vue';
export default {
  name: "monitor",
  data() {
    return {
      showind: 0,
      iboxObj: {},
      timedata: {}
    };
  },
  components:{
      livebroadcast,playback,uselist,iboxseting
    },
  created() {
    Vue.http.headers.common["userToken"] = getCookie("userToken");
    if(this.$route.query.isSet){
       this.showind = 3
    }
    this.$http
      .get(this.global.getIbox + `?iboxId=${this.$route.query.iboxId}`)
      .then(res => {
        if (res.body.status === 200) {
          this.iboxObj = res.body.resultObject;
        } else if (res.body.status === 511) {
          this.$router.push({ path: "/" });
        } else {
          alert(res.body.errorMessage);
        }
        this.loading = false;
      });
  },
  mounted() {},
  methods: {
		showcent(){},
    seeplack(obj) {
      this.showind = 1;
      this.timedata = obj;
    }
  }
};
</script>
<style scoped lang="less">
.adminList {
  .top {
    display: flex;
    justify-content: space-between;
		align-items: center;
		height: 40px;
    li.left {
      font-size: 14px;
      color: #434343;
      font-weight: bold;
    }
    li.right {
      width: 120px;
      font-size: 16px;
      color: #fff;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background: rgba(0, 144, 255, 1);
      border-radius: 2px;
      cursor: pointer;
    }
  }
}
.monitor {
	 display: flex;
	 justify-content: space-between;
	 .cur{
		 cursor: pointer;
	 }
  .iboxlf {
    width: 248px;
    border: 1px solid #e5e5e4;
    text-align: center;
    h4 {
      font-size: 18px;
      font-weight: bold;
      text-indent: left;
      line-height: 55px;
      background: rgba(245, 245, 245, 1);
    }
    img {
      width: 158px;
      height: 162px;
      margin-top: 18px;
    }
    .iboxtext {
      font-weight: bold;
    }
    ul {
      padding: 30px 20px;
      font-size: 12px;
    }
    li {
      text-indent: 8px;
      text-align: left;
      line-height: 36px;
    }
  }
  .iboxrg {
		flex: 1;
    border: 1px solid #e5e5e4;
    margin-left: 10px;
  }
  .iboxrgtab {
    height: 54px;
    line-height: 54px;
    background: rgba(245, 245, 245, 1);
    border-bottom: 1px solid rgba(229, 229, 228, 1);
    font-size: 16px;
    li {
      float: left;
      width: 25%;
      text-align: center;
    }
    i {
      margin-right: 10px;
      font-size: 18px;
    }
    .checkedol {
			position: relative;
			background: #0090ff;
			color: #fff;
      &:after {
        position: absolute;
        left: 0;
        bottom: 0;
        content: "";
        width: 100%;
        height: 2px;
        background: #0090ff;
      }
    }
  }
}
</style>


