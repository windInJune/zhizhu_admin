<template>
  <div class="adminList">
    <ul class="top">
      <li class="left">
        <span @click="$router.push({path:'bigb'})">首页</span>
        <i class="el-icon-caret-right"></i> 个人中心
      </li>
    </ul>
    <div class="detailBox">
      <h2>账号信息</h2>
      <el-tooltip class="item" effect="dark" content="点击修改头像" placement="top-end">
        <img :src="userImgs == 'undefined' || !userImgs? userHeadSrc :  userImgs" alt class="userImg" @click="toggleShow">
      </el-tooltip>
      <el-form
        :model="addBigBForm"
        :rules="rules"
        ref="addBigBForms"
        class="addBigBForm"
        label-width="100px"
      >
        <el-form-item prop="systemName" label="用户名：">
          <el-input
            placeholder="用户名限2~16个字符，不可有英文与数字之外的字符。"
            :maxlength="16"
            v-model="addBigBForm.systemName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userName" label="姓名：">
          <el-input
            placeholder="姓名限2~16个字符，不可有英文与汉字之外的字符。"
            :maxlength="16"
            v-model="addBigBForm.userName"
          ></el-input>
        </el-form-item>
        <h2>修改密码</h2>
        <el-form-item label="当前密码" prop="oldPwd" class="eyeinp">
          <img class="inprig" :src="eyeobj[0]? openy:closey" @click="openeyes(0)">
          <el-input v-show="!eyeobj[0]" type="password" v-model="addBigBForm.oldPwd"></el-input>
          <el-input v-show="eyeobj[0]" type="text" v-model="addBigBForm.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd" class="eyeinp">
          <img class="inprig" :src="eyeobj[1]? openy:closey" @click="openeyes(1)">
          <el-input v-show="!eyeobj[1]" type="password" v-model="addBigBForm.newPwd"></el-input>
          <el-input v-show="eyeobj[1]" type="text" v-model="addBigBForm.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="enterPwd" class="eyeinp">
          <img class="inprig" :src="eyeobj[2]? openy:closey" @click="openeyes(2)">
          <el-input v-show="!eyeobj[2]" type="password" v-model="addBigBForm.enterPwd"></el-input>
          <el-input v-show="eyeobj[2]" type="text" v-model="addBigBForm.enterPwd"></el-input>
        </el-form-item>
        <div class="buttonBox" style="margin-top:60px;">
          <el-button type="primary" @click="submitForm('addBigBForms')">保存</el-button>
          <el-button @click="resetForm('addBigBForms')">取消</el-button>
        </div>
      </el-form>
    </div>
    <my-upload
      field="file"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :width="100"
      :height="100"
      url="http://www.zz-w.cn/ibox/user/uploadPhoto"
      :params="params"
      :headers="headers"
      img-format="png"
    ></my-upload>
  </div>
</template>
<script>
import Vue from "vue";
import { setCookie, getCookie } from "../../assets/js/cookie.js";
import openy from "../../assets/images/openeye.png";
import closey from "../../assets/images/closeeye.png";
import { mapState, mapMutations, mapGetters } from "vuex";
import myUpload from "vue-image-crop-upload";
    let testUserName = str => {
      let reg = /^[a-zA-Z\u4e00-\u9fa5\s]{2,16}$/;
      if (str) {
        return reg.test(str);
      } else {
        return true;
      }
    };
    let testSystemName = str => {
      let reg = /^[a-zA-Z0-9\s]{2,16}$/;
      if (str) {
        return reg.test(str);
      } else {
        return true;
      }
    };
 
export default {
  data() {
       let validatePass = (rule, value, callback) => {
      if (!value || value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.addBigBForm.enterPwd != "" && this.addBigBForm.enterPwd) {
          this.$refs.addBigBForms.validateField("enterPwd");
        }
        callback();
      }
    };
    let testpwd = str => {
      let reg = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)+$/;
      if (str) {
        return reg.test(str);
      } else {
        return true;
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "" || !value) {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.addBigBForm.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let oldcheckpwd = (rule, value, callback) => {
      if (value == "" || !value) {
        callback(new Error("请输入当前密码!"));
      } else {
        callback();
      }
    };
    return {
      openy,
      closey,
      userHeadSrc: require("../../assets/images/head.png"),
      addBigBForm: {
        userName: "",
        systemName: "",
        enterPwd: "",
        oldPwd: "",
        newPwd: ""
      },
      eyeobj: {
        "0": false,
        "1": false,
        "2": false
      },
      rules: {
        userName: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { min: 2, max: 16, message: "长度为2-16个字符", trigger: "blur" },
          {
            validator: function(obj, str, callback) {
              if (!testUserName(str)) {
                callback(new Error("只能包含英文和汉字"));
                return;
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        systemName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 16, message: "长度为2-16个字符", trigger: "blur" },
          {
            validator: function(obj, str, callback) {
              if (!testSystemName(str)) {
                callback(new Error("只能包含英文和数字"));
                return;
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        oldPwd: [{ validator: oldcheckpwd, trigger: "blur" }],
        newPwd: [
          {
            min: 8,
            max: 15,
            message: "请输入8到15位字母数字组合密码",
            trigger: "blur"
          },
          {
            validator: function(rule, value, callback) {
              if (!testpwd(value)) {
                callback(new Error("请输入8到15位字母数字组合密码"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        enterPwd: [{ validator: validatePass2, trigger: "blur" }]
      },
      show: false,
      params: {},
      headers: {
        userToken: getCookie("userToken")
      },
      imgDataUrl: "" // the datebase64 url of created image
    };
  },
  created() {
    this.addBigBForm.userName = localStorage.getItem("userNameBig");
    this.addBigBForm.systemName = localStorage.getItem("systemNameBig");
  },
  components: {
    "my-upload": myUpload
  },
  computed: {
    ...mapGetters(["userImgs"]),
    ...mapState(["userdata"])
  },

  methods: {
    ...mapMutations(["USERINFO", "USERNAME", "USERIMG"]),
    submitForm(formName) {
      let regNum = /^[a-zA-Z0-9\s]{2,16}$/;
      let regName = /^[a-zA-Z\u4e00-\u9fa5\s]{2,16}$/;
      if (
        this.addBigBForm.enterPwd == "" &&
        this.addBigBForm.oldPwd == "" &&
        this.addBigBForm.newPwd == ""
      ) {
        if (
          regNum.test(this.addBigBForm.systemName) &&
          regName.test(this.addBigBForm.userName)
        ) {
          Vue.http.headers.common["userToken"] = getCookie("userToken");
          this.$http
            .post(
              this.global.editSystemUser,
              {
                userId: localStorage.getItem("userIdBig"),
                userName: this.addBigBForm.userName,
                userLoginname: this.addBigBForm.systemName
              },
              { emulateJSON: true }
            )
            .then(res => {
              if (res.body.status == 200) {
                this.$message({
                  message: `账户信息修改成功`,
                  type: "success"
                });
                this.userdata.userName = this.addBigBForm.userName;
                this.userdata.userLoginname = this.addBigBForm.systemName;
                this.USERINFO(this.userdata);
                this.USERNAME(this.addBigBForm.userName);
                localStorage.setItem("userNameBig", this.addBigBForm.userName);
                localStorage.setItem("systemNameBig", this.addBigBForm.systemName);
              } else {
                this.$message({
                  message: `${res.body.resultObject}`,
                  type: "warning"
                });
              }
            });
        }else{
          this.$refs[formName].validateField(["systemName","userName"])
        }
        return;

      }
      this.$refs[formName].validate(res => {
        if (res) {
          Vue.http.headers.common["userToken"] = getCookie("userToken");
          this.$http
            .post(
              this.global.editSystemUser,
              {
                userId: localStorage.getItem("userIdBig"),
                userName: this.addBigBForm.userName,
                userLoginname: this.addBigBForm.systemName
              },
              { emulateJSON: true }
            )
            .then(res => {
              if (res.body.status == 200) {
                // this.$message({
                //   message: `用户信息修改成功`,
                //   type: "success"
                // });
                this.userdata.userName = this.addBigBForm.userName;
                this.userdata.userLoginname = this.addBigBForm.systemName;
                this.USERINFO(this.userdata);
                this.USERNAME(this.addBigBForm.userName);
                localStorage.setItem("userNameBig", this.addBigBForm.userName);
                localStorage.setItem("systemNameBig", this.addBigBForm.systemName);
              } else {
                this.$message({
                  message: `${res.body.resultObject}`,
                  type: "warning"
                });
              }
            });
          this.$http
            .post(
              this.global.modifyUserPwdByOldPwd,
              {
                userId: localStorage.getItem("userIdBig"),
                userNewPwd: this.addBigBForm.newPwd,
                userOldPwd: this.addBigBForm.oldPwd
              },
              { emulateJSON: true }
            )
            .then(res => {
              if (res.body.status == 200) {
                this.$message({
                  message: `用户密码修改成功`,
                  type: "success"
                });
              } else {
                this.$message({
                  message: `${res.body.errorMessage}`,
                  type: "warning"
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1);
    },
    //改变密码显示状态
    openeyes(num) {
      this.eyeobj[num] = !this.eyeobj[num];
    },
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      if (jsonData.status != 200) {
        this.show = false;
        this.$message.error(`${jsonData.errorMessage}`);
        return;
      }
      this.show = false;
      this.userImg = this.imgDataUrl;
      this.USERIMG(this.imgDataUrl);
      this.$message({
        message: "头像修改成功",
        type: "success"
      });
    },
    cropUploadFail(status, field) {}
  }
};
</script>
<style scoped lang="less">
.adminList {
  padding-bottom: 80px;
  .top {
    display: flex;
    height: 36px;
    line-height: 36px;
    justify-content: space-between;
    align-items: center;
    li.left {
      font-size: 14px;
      color: #434343;
      font-weight: bold;
      span {
        cursor: pointer;
      }
    }
  }
  .detailBox {
    position: relative;
    margin-top: 20px;
    width: 800px;
    height: auto;
    padding: 30px;
    border: 1px solid rgba(229, 229, 228, 1);
    h2 {
      height: 40px;
      font-size: 18px;
      font-family: MicrosoftYaHei;
      color: rgba(67, 67, 67, 1);
      line-height: 40px;
      text-align: left;
      margin-bottom: 40px;
    }
    .userImg {
      height: 60px;
      width: 60px;
      position: absolute;
      right: 30px;
      top: 20px;
      border-radius: 50%;
      cursor: pointer;
    }
    .identity {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .buttonBox {
      display: flex;
      align-items: center;
      font-size: 16px;
      padding-left: 100px;
      .save {
        width: 120px;
        height: 36px;
        line-height: 36px;
        border: 1px solid rgba(0, 144, 255, 1);
        border-radius: 2px;
        background: rgba(0, 144, 255, 1);
        color: #fff;
      }
      .cannal {
        width: 120px;
        height: 36px;
        margin-left: 30px;
        cursor: pointer;
        line-height: 36px;
        border-radius: 2px;
        color: rgba(0, 144, 255, 1);
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(229, 229, 228, 1);
      }
    }
  }
  .eyeinp {
    position: relative;
  }
  .inprig {
    position: absolute;
    right: 10px;
    top: 50%;
    line-height: 36px;
    width: 28px;
    transform: translateY(-50%);
    z-index: 3;
    cursor: pointer;
  }
}
</style>