<template>
  <div class="adminList">
    <ul class="adminlistTop">
      <li>用户列表
        <i class="el-icon-caret-right"></i>
      </li>
      <li>
        <el-button type="primary" @click="dialogOpen">新增用户</el-button>
      </li>
    </ul>
    <!-- 表单信息 -->
    <el-table
      :data="pageData"
      highlight-current-row
      :header-cell-style="headerClassFn"
      style="width: 100%;border:1px solid rgba(229, 229, 228, 1)"
      :default-sort="{prop: 'pageData', order: 'descending'}"
    >
       <el-table-column type="index" label="序号" width="80">
            <template slot-scope="scope">{{scope.$index + 1 + (currentPage-1)*10}}</template>
      </el-table-column>
      <!--<el-table-column prop="userId" label="序号" width="180"></el-table-column> -->
      <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
      <el-table-column prop="userLoginname" label="用户名"></el-table-column>
      <el-table-column prop="userSex" label="性别"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" class="creatTime" sortable></el-table-column>
      <el-table-column prop="isDisable" label="状态">
        <template slot-scope="scope" class="handle">
          <span v-show="scope.row.isDisable == 1" class="yellow">冻结</span>
          <span v-show="scope.row.isDisable == 0" class="green">正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="subjectType" label="操作" width="325">
        <template slot-scope="scope" class="handle">
          <el-button
            size="small"
            type="warning"
            @click="userFrozen(scope.$index, scope.row)"
            v-show="scope.row.isDisable == 1"
          >恢复</el-button>
          <el-button
            size="small"
            type="warning"
            @click="userFrozen(scope.$index, scope.row)"
            v-show="scope.row.isDisable == 0"
          >冻结</el-button>
          <el-button
            size="small"
            type="primary"
            @click="changePassword(scope.$index, scope.row)"
          >修改密码</el-button>
          <el-button size="small" type="danger" @click="userDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
    <!-- 新增用户 -->
    <el-dialog title="新增用户" :visible.sync="addUser" width="30%" :close-on-click-modal="false">
      <el-form status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="身份">
          <p class="identity">大平台管理员</p>
        </el-form-item>
        <el-form-item label="性别">
          <div class="identity">
            <el-radio v-model="sex" label="男">男</el-radio>
            <el-radio v-model="sex" label="女">女</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input type="text" v-model="name" placeholder="不超过6个汉字" @change="namePattern"></el-input>
          <span class="wrongTips" v-show="this.nameTips">{{this.nameTips}}</span>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            type="text"
            v-model="userLoginname"
            placeholder="英文与数字格式，长度不超过15字符"
            @change="LoginnamePattern"
          ></el-input>
          <span class="wrongTips" v-show="this.LoginnameTips">{{this.LoginnameTips}}</span>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="userPwd"
            placeholder="8-15位英文与数字组合字符"
            @change="userPwdPattern"
          ></el-input>
          <span class="wrongTips" v-show="this.userPwdTips">{{this.userPwdTips}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUser = false">取 消</el-button>
        <el-button type="primary" @click="addUsers">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码-->
    <el-dialog
      title="请输入新密码"
      :visible.sync="dialogRePassword"
      width="30%"
      :close-on-click-modal="false"
      style="margin-top:50px;"
    >
      <el-input v-model="repassword" placeholder="8-15位英文与数字组合字符" type="text"></el-input>
      <span class="wrongTips">{{this.repasswordTips}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRePassword = false">取 消</el-button>
        <el-button type="primary" @click="dialogRePasswordSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/*eslint-disable */
import Vue from "vue";
import { setCookie, getCookie } from "../../../../assets/js/cookie.js";
export default {
  name: "AdminList",
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageData: [],
      loading: false,
      addUser: false,
      dialogRePassword: false,
      sex: "男",
      name: "",
      userLoginname: "",
      userPwd: "",
      nameTips: "",
      LoginnameTips: "",
      userPwdTips: "",
      useId: "",
      repassword: "",
      repasswordTips: ""
    };
  },
  methods: {
    headerClassFn(row, column, rowIndex, columnIndex) {
      return "color:#434343;background:rgba(245,245,245,1);font-size:12px;";
    },
    // 处理页号改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.loadData();
    },
    // 加载分页数据
    loadData() {
      this.loading = true;
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(
          this.global.getSystemUserList +
            `?userType=0&pageNum=${this.currentPage}&pageSize=${this.pageSize}`
        )
        .then(res => {
          if (res.data.status === 200) {
            this.pageData = res.data.resultObject.data;
            this.currentPage = res.data.resultObject.currentPage;
            this.total = res.data.resultObject.totalCount;
            this.pageSize = res.data.resultObject.pageSize;
            const { items, currentPage } = res.data.resultObject;
          } else if (res.data.status === 511) {
            this.$router.push({ path: "/" });
          } else {
            alert(res.data.errorMessage);
          }
          this.loading = false;
        });
    },
    dialogOpen() {
      this.resets();
      this.addUser = true;
    },
    namePattern() {
      let namePattern = /^[\u4e00-\u9fa5]{1,6}$/;
      if (namePattern.test(this.name) == false) {
        this.nameTips = "姓名格式错误";
      } else {
        this.nameTips = "";
      }
    },
    LoginnamePattern() {
      let LoginnamePattern = /^[a-zA-Z0-9]{1,15}$/;
      if (LoginnamePattern.test(this.userLoginname) == false) {
        this.LoginnameTips = "用户名格式错误";
      } else {
        this.LoginnameTips = "";
      }
    },
    userPwdPattern() {
      let userPwdPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
      if (userPwdPattern.test(this.userPwd) == false) {
        this.userPwdTips = "密码格式错误";
      } else {
        this.userPwdTips = "";
      }
    },
    // 新增用户
    addUsers() {
      let namePattern = /^[\u4e00-\u9fa5]{1,6}$/;
      let LoginnamePattern = /^[a-zA-Z0-9]{1,15}$/;
      let userPwdPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
      if (LoginnamePattern.test(this.userLoginname) == false) {
        this.LoginnameTips = "用户名格式错误";
      } else {
        this.LoginnameTips = "";
      }
      if (namePattern.test(this.name) == false) {
        this.nameTips = "姓名格式错误";
      } else {
        this.nameTips = "";
      }
      if (userPwdPattern.test(this.userPwd) == false) {
        this.userPwdTips = "密码格式错误";
      } else {
        this.userPwdTips = "";
      }
      if (
        !this.nameTips &&
        !this.LoginnameTips &&
        !this.userPwdTips &&
        this.name &&
        this.userLoginname &&
        this.userPwd
      ) {
        Vue.http.headers.common["userToken"] = getCookie("userToken");
        this.$http
          .post(
            this.global.insertUser,
            {
              userType: 0,
              userName: this.name,
              userLoginname: this.userLoginname,
              userSex: this.sex,
              userPwd: this.userPwd
            },
            { emulateJSON: true }
          )
          .then(
            res => {
              if (res.body.status == 512) {
                this.$notify({
                  title: "警告",
                  message: res.body.errorMessage,
                  type: "warning"
                });
              } else if (res.body.status == 200) {
                this.$notify({
                  title: "成功",
                  message: "操作成功",
                  type: "success"
                });
                this.loadData();
              }
            },
            err => {
              console.log(err);
            }
          );
        this.addUser = false;
        this.resets();
      }
    },
    // 删除用户
    userDelete(index, row) {
      this.$confirm("您确定要删除此用户？", "删除用户", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Vue.http.headers.common["userToken"] = getCookie("userToken");
          this.$http
            .post(
              this.global.deleteUser,
              { userId: row.userId },
              { emulateJSON: true }
            )
            .then(
              res => {
                if (res.body.status == 512) {
                  this.$notify({
                    title: "警告",
                    message: res.body.errorMessage,
                    type: "warning"
                  });
                } else if (res.body.status == 200) {
                  this.$notify({
                    title: "成功",
                    message: "操作成功",
                    type: "success"
                  });
                }
                this.loadData();
              },
              err => {
                console.log(err);
              }
            );
        })
        .catch(() => {});
    },
    // 修改密码
    changePassword(index, row) {
      this.dialogRePassword = true;
      this.useId = row.userId;
    },
    dialogRePasswordSubmit() {
      let passwordPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
      if (passwordPattern.test(this.repassword) == false) {
        this.repasswordTips = "请输入正确的密码格式";
      } else {
        Vue.http.headers.common["userToken"] = getCookie("userToken");
        this.$http
          .post(
            this.global.modifyUserPwd,
            { userId: this.useId, userPwd: this.repassword },
            { emulateJSON: true }
          )
          .then(
            res => {
              if (res.body.status == 512) {
                this.$notify({
                  title: "警告",
                  message: res.body.errorMessage,
                  type: "warning"
                });
              } else if (res.body.status == 200) {
                this.useId = "";
                this.repassword = "";
                this.repasswordTips = "";
                this.dialogRePassword = false;
                this.$notify({
                  title: "成功",
                  message: "操作成功",
                  type: "success"
                });
                this.loadData();
              }
            },
            err => {
              console.log(err);
            }
          );
      }
    },
    // 冻结
    userFrozen(index, row) {
      var isDisableNum;
      if (row.isDisable == 0) {
        isDisableNum = 1;
      } else {
        isDisableNum = 0;
      }
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .post(
          this.global.disableUser,
          { userId: row.userId, isDisable: isDisableNum },
          { emulateJSON: true }
        )
        .then(
          res => {
            this.loadData();
          },
          err => {
            console.log(err);
          }
        );
    },
    resets() {
      (this.name = ""), (this.userLoginname = ""), (this.userPwd = "");
    }
  },
  created() {
    this.loadData();
  }
};
</script>
<style scoped lang="less">
.el-pagination{
  text-align: right;
}
.adminList {
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    li {
      font-size: 14px;
      font-weight: bold;
    }
    li:first-child {
      padding-top: 10px;
      text-align: left;
      font-weight: bolder;
    }
  }
  .el-table {
    margin-top: 15px;
    // border-radius: 5px;
    .el-button {
      margin-left: 10px;
    }
    .green {
      color: #67c23a;
    }
    .yellow {
      color: #e6a23c;
    }
  }
  .el-pagination {
    margin-top: 20px;
  }
  .wrongTips {
    display: inline-block;
    text-align: left;
    color: #f56c6c;
    width: 100%;
  }
  .demo-ruleForm {
    padding-right: 50px;
    .identity {
      text-align: left;
    }
  }
}
</style>
