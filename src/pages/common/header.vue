<template>
  <div class="header">
    <ul>
      <li class="logo">
        <img src="../../assets/images/logo.png">
      </li>
      <li class="sub_title"></li>
      <li class="user" @mouseenter="userEnter" @mouseleave="userLeave">
        <img  class="userIMg" :src="userImgs == 'undefined' || !userImgs? userHeadSrc :  userImgs" alt="">
        {{userNames || this.userName}}
        <div class="out" v-show="userShow">
          <p @click="gotoUserDetail">个人中心</p>
          <p>
            <a @click="quit">退出</a>
          </p>
        </div>
      </li>
      <li class="msg">
        <i class="iconfont">&#xe67d;</i>消息中心
        <span>(0)</span>
      </li>
    </ul>
    <div class="clear_float"></div>
  </div>
</template>
<script>
/* eslint-disable */
import { setCookie, getCookie, delCookie } from "../../assets/js/cookie.js";
import Vue from "vue";
import { mapGetters  } from "vuex";
export default {
  data() {
    return {
      userHeadSrc: require("../../assets/images/head.png"),
      userName: "",
      userShow: false
    };
  },
  computed:{
    ...mapGetters(["userNames","userImgs"]),
  },
  methods: {
    gotoUserDetail(){
      this.$router.push({path:'/manageAdmin/userinfo'})
    },
    userEnter() {
      this.userShow = true;
    },
    userLeave() {
      this.userShow = false;
    },
    quit() {
      delCookie("userToken");
      localStorage.removeItem("userNameBig");
      localStorage.removeItem("userTypeBig");
      localStorage.removeItem("sexBig");
      this.$router.push("/");
    }
  },
  created() {
    this.userName = localStorage.getItem("userNameBig");
  }
};
</script>
<style scoped lang="less">
@import "~@/assets/styles/common.less";
.header {
  height: 60px;
  box-shadow: @box-shadow;
  padding: 0 50px;
  background-color: @main-color;
  ul {
    clear: both;
    height: 60px;
    li {
      height: 60px;
      line-height: 60px;
      font-size: @title-size;
      float: left;
      .userIMg{
        margin-right: 10px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
      }
    }
    .sub_title {
      float: left;
      padding-left: 18px;
      position: relative;
      margin-left: 15px;
      color: #fff;
    }
    .msg {
      float: right;
      padding: 0 20px;
      color: #fff;
      span {
        padding: 0 3px;
      }
      i {
        color: #fff;
        font-size: 20px;
        position: relative;
        top: 2px;
      }
    }
    .user {
      float: right;
      position: relative;
      color: #fff;
      cursor: pointer;
      i {
        font-size: 30px;
        position: relative;
        top: 3px;
      }
      .out {
        width: 120px;
        height: 80px;
        border: 1px solid rgb(220, 220, 220);
        position: absolute;
        top: 50px;
        left: 0;
        z-index: 1000000;
        background-color: #fff;
        p {
          height: 40px;
          line-height: 40px;
          color: @main-color;
          cursor: pointer;
          a {
            color: @main-color;
            cursor: pointer;
          }
        }
        p:first-child {
          border-bottom: 1px solid rgb(220, 220, 220);
        }
      }
    }
  }
}
.clear_float {
  float: none;
  clear: both;
  width: 100%;
}
</style>
