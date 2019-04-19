<template>
  <div class="iboxseting">
    <div class="iboxstatus" v-show="iboxObj.iboxStatus==2">
      <img src="../../../../assets/images/ibox3.png">
      <span>当前设备已离线，暂不能设置</span>
    </div>
    <div class="sucstatus" v-show="iboxObj.iboxStatus!=2">
      <ul>
        <li>
          <span class="iboxsta">开关机</span>
          <span class="switchb">
            <el-switch
              v-model="newObj.isOff"
              @change="setIboxs({isOff:newObj.isOff})"
              active-color="#0078D7"
              inactive-color="#E5E5E4"
            ></el-switch>
          </span>
          <span>（关机状态，除了安全模块及网络服务开通，其它设备都关闭）</span>
        </li>
        <li>
          <span class="iboxsta">定时开关机</span>
          <span class="switchb">
            <el-switch
              v-model="newObj.isTimesleep"
              @change="setIboxs({isTimesleep:newObj.isTimesleep})"
              active-color="#0078D7"
              inactive-color="#E5E5E4"
            ></el-switch>
          </span>
          <span>开始时间：
            <el-select
              v-model="iboxstatusObj.timesleepBegin"
              @change="setIboxs({timesleepBegin:iboxstatusObj.timesleepBegin})"
              placeholder="请选择"
            >
              <el-option v-for="item in timeList" :key="item" :label="item" :value="item"></el-option>
            </el-select>结束时间：
            <el-select
              v-model="iboxstatusObj.timesleepEnd"
              @change="setIboxs({timesleepEnd:iboxstatusObj.timesleepEnd})"
              placeholder="请选择"
            >
              <el-option v-for="item in timeList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </span>
        </li>
        <li class="xiumian">
          <span class="iboxsta">自动休眠</span>
          <span class="switchb">
            <el-switch
              v-model="newObj.isAutosleep"
              @change="setIboxs({isAutosleep:newObj.isAutosleep})"
              active-color="#0078D7"
              inactive-color="#E5E5E4"
            ></el-switch>
          </span>
          <span>在接通电源下，设备经过以下时间进入休眠状态
            <el-select
              style="margin-left:10px;"
              v-model="iboxstatusObj.autosleepTime"
              @change="setIboxs({autosleepTime:iboxstatusObj.autosleepTime})"
              placeholder="请选择"
            >
              <el-option
                v-for="item in autosleepTimeList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </span>
          <span class="reptit">（休眼状态，箱内灯光，空调，显示器都关闭，用户使用时自动激活）</span>
        </li>
        <li>
          <span class="iboxsta">空调</span>
          <span class="switchb">
            <el-switch
              v-model="newObj.isAir"
              @change="setIboxs({isAir:newObj.isAir})"
              active-color="#0078D7"
              inactive-color="#E5E5E4"
            ></el-switch>
          </span>
          <span>模式设置：
            <el-select
              v-model="iboxstatusObj.airMode"
              @change="setIboxs({airMode:iboxstatusObj.airMode})"
              placeholder="请选择"
            >
              <el-option
                v-for="item in airModeList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </span>
          
          <span>温度设置：
            <el-select
              v-model="iboxstatusObj.airTemp"
              @change="setIboxs({airTemp:iboxstatusObj.airTemp})"
              placeholder="请选择"
            >
              <el-option
                v-for="item in airTempList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </span>
          <span>风力大小：
            <el-select
              v-model="iboxstatusObj.airWind"
              @change="setIboxs({airWind:iboxstatusObj.airWind})"
              placeholder="请选择"
            >
              <el-option
                v-for="item in airWindList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </span>
          <span >是否锁定：
            <el-select
              v-model="iboxstatusObj.airIslock"
              @change="setIboxs({airIslock:iboxstatusObj.airIslock})"
              placeholder="请选择"
            >
              <el-option
                v-for="item in airIslockList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </span>
        </li>
        <li>
          <span class="iboxsta">箱内灯光</span>
          <span class="switchb">
            <!-- <el-switch
						  v-model="newObj.isLight"
						  @change="setIboxs({isLight:newObj.isLight})"
						  active-color="#0078D7"
						  inactive-color="#E5E5E4">
            </el-switch>-->
          </span>
          <span style="margin-left:44px;">亮度设置：
            <el-select
              v-model="iboxstatusObj.lightMode"
              @change="setIboxs({lightMode:iboxstatusObj.lightMode})"
              placeholder="请选择"
            >
              <el-option
                v-for="item in lightModeList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { setCookie, getCookie } from "../../../../assets/js/cookie.js";
export default {
  name: "iboxseting",
  data() {
    return {
      value: false,
      autosleepTimeList: [
        { id: "15", value: "15分钟" },
        { id: "30", value: "30分钟" },
        { id: "45", value: "45分钟" },
        { id: "60", value: "1小时" },
        { id: "120", value: "2小时" },
        { id: "180", value: "3小时" },
        { id: "240", value: "4小时" }
      ],
      airModeList: [{ id: "0", value: "制冷" }, { id: "1", value: "制热" }],
      airTempList: [
        { id: "15", value: "15°C" },
        { id: "16", value: "16°C" },
        { id: "17", value: "17°C" },
        { id: "18", value: "18°C" },
        { id: "19", value: "19°C" },
        { id: "20", value: "20°C" },
        { id: "21", value: "21°C" },
        { id: "22", value: "22°C" },
        { id: "23", value: "23°C" },
        { id: "24", value: "24°C" },
        { id: "25", value: "25°C" },
        { id: "26", value: "26°C" },
        { id: "27", value: "27°C" },
        { id: "28", value: "28°C" },
        { id: "29", value: "29°C" }
      ],
      airWindList: [{ id: "1", value: "中" }, { id: "2", value: "高" }],
      airIslockList: [{ id: "1", value: "是" }, { id: "0", value: "否" }],
      timeList: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00"
      ],
      lightModeList: [
        { id: "0", value: "低" },
        { id: "1", value: "中" },
        { id: "2", value: "高" }
      ],
      value: "",
      iboxstatusObj: {},
      newObj: {}
    };
  },
  props: ["iboxObj"],
  created() {
    this.getiboxstatus();
  },
  mounted() {
    // this.getiboxstatus();
  },
  methods: {
    setIboxs(obj) {
      this.newObj = Object.assign({}, this.newObj);
      let newobj = obj;
      if (obj.isOff) {
        newobj["isOff"] = 0;
      } else if (obj.isOff === false) {
        newobj["isOff"] = 1;
      }
      if (obj.isTimesleep) {
        newobj["isTimesleep"] = 1;
      } else if (obj.isTimesleep === false) {
        newobj["isTimesleep"] = 0;
      }
      if (obj.isAutosleep) {
        newobj["isAutosleep"] = 1;
      } else if (obj.isAutosleep === false) {
        newobj["isAutosleep"] = 0;
      }
      if (obj.isAir) {
        newobj["isAir"] = 1;
      } else if (obj.isAir === false) {
        newobj["isAir"] = 0;
      }
      newobj["iboxNum"] = this.$route.query.iboxNum;
      Vue.http.headers.common["userToken"] = getCookie("userToken");
     this.$http
        .post(this.global.updateIboxSettingInfo, newobj, { emulateJSON: true }).then(res => {
				})
    },
    getiboxstatus() {
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(this.global.getIboxSettingInfo + `?iboxNum=${this.$route.query.iboxNum}`)
        .then(res => {
          if (res.body.status == 200) {
            this.iboxstatusObj = res.body.resultObject;
            if (this.iboxstatusObj.isOff == 0) {
              this.newObj["isOff"] = true;
            } else {
              this.newObj["isOff"] = false;
            }
            if (this.iboxstatusObj.isTimesleep == 0) {
              this.newObj["isTimesleep"] = false;
            } else {
              this.newObj["isTimesleep"] = true;
            }
            if (this.iboxstatusObj.isAutosleep == 0) {
              this.newObj["isAutosleep"] = false;
            } else {
              this.newObj["isAutosleep"] = true;
            }
            if (this.iboxstatusObj.isAir == 0) {
              this.newObj["isAir"] = false;
            } else {
              this.newObj["isAir"] = true;
            }
            if (this.iboxstatusObj.isLight == 0) {
              this.newObj["isLight"] = false;
            } else {
              this.newObj["isLight"] = true;
            }
          }
        });
    }
  }
};
</script>
<style scoped lang="less">
.iboxseting {
  .iboxstatus {
    display: flex;
    min-height: 200px;
    align-items: center;
    color: #949494;
    justify-content: center;
    img {
      width: 65px;
      margin-right: 30px;
    }
  }
  .sucstatus {
    font-size: 14px;

    ul {
      margin-top: 30px;
    }
    li {
      line-height: 58px;
			text-align: left;
			margin: 10px 0;
			display: flex;
			align-items: center;
    }
    .iboxsta {
      font-weight: bold;
      display: inline-block;
      width: 100px;
      text-align: right;
    }
    .switchb {
      margin: 0 20px;
    }
    .xiumian {
      height: 80px;
      position: relative;
      .reptit {
        position: absolute;
        height: 16px;
        line-height: 16px;
        left: 240px;
        bottom: 0px;
        color: #a4a3a3;
        font-size: 12px;
      }
    }
	}
}
.el-select{
    width: 100px;
    margin: 0 20px 0 8px;
  }
</style>



