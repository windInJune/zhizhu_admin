<template>
  <div class="nav-left">
    <el-row class="tac">
      <el-col :span="24">
        <div class="head">
          <div class="head-icon"></div>
          <h2>
            {{this.userName}}
            <i class="iconfont boy" v-show="this.sex == '男'">&#xe648;</i>
            <i class="iconfont gril" v-show="this.sex == '女'">&#xe757;</i>
          </h2>
          <p>超级管理员</p>
        </div>
        <el-menu default-active="1">
          <el-menu-item index="1" class="list">
            <i class="el-icon-setting"></i>
            <span slot="title">后台用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
      sex: ""
    };
  },
  created() {
    this.userName = localStorage.getItem("userNameBig");
    this.sex = localStorage.getItem("sexBig");
  }
};
</script>
<style scoped lang="less">
@import "~@/assets/styles/common.less";
.el-menu {
  border-right: 0;
}
.nav-left {
  border: 1px solid #e5e5e4;
  margin-left: 2px;
  height: 100%;
  margin-top: 20px;
  .head {
    height: 208px;
    background: #f5f5f5;
    padding-top: 15px;
    box-sizing: border-box;
    .head-icon {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 0 auto;
      border: 7px solid rgba(229, 229, 229, 1);
      background: url("../../../../assets/images/head.png") no-repeat center;
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
