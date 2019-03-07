<template>
  <div class="nav-left">
    <el-row class="tac">
      <el-col :span="24">
        <div class="head">
          <img class="head-icon" :src="userImgs || userHeadSrc" alt="">
          <h2>
            {{userNames || this.userName}}
            <i class="iconfont boy" v-show="this.sex == '男'">&#xe648;</i>
            <i class="iconfont gril" v-show="this.sex == '女'">&#xe757;</i>
          </h2>
          <p>大B平台管理员</p>
        </div>
        <el-menu :default-active="routerPath" class="el-menu-vertical-demo">
          <router-link :to="{path: '/manageAdmin/bigb'}" v-show="usertype!=2">
            <el-menu-item index="1" class="list">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">大B平台管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path: '/manageAdmin/bigbadmin' }" v-show="usertype!=2">
            <el-menu-item index="7" class="list">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">大B管理员管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path: '/manageAdmin/manageList' }">
            <el-menu-item index="2" class="list">
              <!--  <i class="el-icon-menu"></i> -->
              <span slot="title">机构管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path: '/manageAdmin/schoolList' }">
            <el-menu-item index="3" class="list">
              <!-- <i class="el-icon-document"></i> -->
              <span slot="title">学员管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path: '/manageAdmin/administratorsList' }">
            <el-menu-item index="4" class="list">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">管理员管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path: '/manageAdmin/iboxList' }">
            <el-menu-item index="5" class="list">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">IBOX管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path: '/manageAdmin/courseList' }">
            <el-menu-item index="6" class="list last-list">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">课程管理</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState,mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["userNames","userImgs"]),
    routerPath() {
      if (
        this.$route.path === "/manageAdmin/bigb" ||
        this.$route.path === "/manageAdmin/addbigb" ||
        this.$route.path == "/manageAdmin/editbigb"
      ) {
        return "1";
      }
      if (this.$route.path === "/manageAdmin/manageList") {
        return "2";
      }
      if (this.$route.path === "/manageAdmin/schoolList") {
        return "3";
      }
      if (this.$route.path === "/manageAdmin/administratorsList") {
        return "4";
      }
      if (
        this.$route.path === "/manageAdmin/iboxList" ||
        this.$route.path === "/manageAdmin/iboxdetail"
      ) {
        return "5";
      }
      if (this.$route.path === "/manageAdmin/courseList") {
        return "6";
      }
      if (this.$route.path === "/manageAdmin/bigbadmin") {
        return "7";
      }
    }
  },
  data() {
    return {
      userName: "",
      sex: "",
      userHeadSrc:require('../../../../assets/images/head.png'),
      usertype: null
    };
  },
  created() {
    this.userName = localStorage.getItem("userName");
    this.sex = localStorage.getItem("sex");
    this.usertype = localStorage.getItem("userType");
  }
};
</script>
<style scoped lang="less">
.el-menu {
  border-right: 0;
}
.nav-left {
  border: 1px solid #e5e5e4;
  margin-left: 2px;
  height: 100%;
  .head {
    height: 208px;
    background: #f5f5f5;
    padding-top: 15px;
    box-sizing: border-box;
    .head-icon {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      cursor: pointer;
      margin: 0 auto;
      border: 7px solid rgba(229, 229, 229, 1);
    }
    h2 {
      font-size: 18px;
      margin-top: 20px;
      font-weight: 400;
      margin-left: 10px;
      color: #434343;
      i {
        color: rgb(255, 212, 219);
        position: relative;
        left: 7px;
        top: -2px;
      }
    }
    p {
      font-size: 12px;
      margin-top: 12px;
    }
  }
  .list {
    position: relative;
    border-top: 1px solid rgb(220, 220, 220);
  }
  .last-list {
    position: relative;
    border-bottom: 1px solid rgb(220, 220, 220);
  }
  .el-menu-item.is-active {
    color: #fff;
    background: #0090ff;
  }
  .el-menu-item {
    height: 50px;
    line-height: 50px;
  }
}
</style>
