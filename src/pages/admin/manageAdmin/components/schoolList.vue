<template>
  <div class="adminList">
    <!-- 表单信息 -->
    <ul class="title-icon">
      <li style="font-size: 14px;
    color: #434343;">学员列表
        <!-- <i class="el-icon-caret-right"></i> -->
      </li>
    </ul>
    <ul class="search">
      <li>
        <el-select v-model="platform" @change="selectChange" placeholder="请选择管理平台">
          <el-option
            v-for="(item,index) in platformlist"
            :key="index"
            :label="item.systembName"
            :value="item.systembId"
          ></el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="schoolValue" placeholder="全部机构" @change="schoolChange">
          <el-option
            v-for="item in schoolList"
            :key="item.schoolId"
            :label="item.schoolName"
            :value="item.schoolId"
          ></el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="GradeValue" placeholder="全部年级" @change="GradeChange">
          <el-option v-for="item in GradeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="classValue" placeholder="全部班级" @change="classChange">
          <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </li>

      <li>
        <el-select v-model="statusValue" placeholder="全部账号状态" @change="statusChange">
          <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </li>
      <li>
        <el-input v-model="serarchValue" placeholder="请输入知号、姓名、学号查询" class="serarchValue"></el-input>
      </li>
      <li>
        <div class="searchs_btn" @click="searchSubmit">查找</div>
        <!-- <el-button type="primary" class="search-button" @click="searchSubmit">查找</el-button> -->
      </li>
    </ul>
    <el-table
      :data="pageData"
      highlight-current-row
      :header-cell-style="headerClassFn"
      style="width: 100%;border:1px solid rgba(229, 229, 228, 1)"
      v-loading="loading"
    >
      <el-table-column prop="userName" label="姓名" width="60"></el-table-column>
      <el-table-column prop="userZhinum" label="知号"></el-table-column>
      <el-table-column prop="userSex" label="性别" width="60">
        <template slot-scope="scope">
          <span v-show="scope.row.userSex == 0">保密</span>
          <span v-show="scope.row.userSex == 1">男</span>
          <span v-show="scope.row.userSex == 2">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="userNum" label="学号">
        <template slot-scope="scope">
          <span v-show="scope.row.userNum == ''">--</span>
          <span v-show="scope.row.userNum != ''">{{scope.row.userNum}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userCard" label="身份证" width="140"></el-table-column>
      <el-table-column prop="systembName" label="所属大B平台" width="100"></el-table-column>

      <el-table-column prop="schoolName" label="机构" width="120">
        <template slot-scope="scope">
          <p>{{ scope.row.schoolName }}</p>
          <!-- <el-popover trigger="hover" placement="top">
            <div slot="reference" >
              <el-tag size="medium">{{ scope.row.schoolName}}</el-tag>
            </div>
          </el-popover>-->
        </template>
      </el-table-column>
      <el-table-column prop="gradeName" label="年级"></el-table-column>
      <el-table-column prop="className" label="班级"></el-table-column>
      <el-table-column prop="userMajor" label="专业">
        <template slot-scope="scope">
          <span v-show="scope.row.userMajor == ''" class="yellow">--</span>
          <span v-show="scope.row.userMajor != ''" class="yellow">{{scope.row.userMajor}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userPhone" label="手机号码" width="120">
        <template slot-scope="scope">
          <span v-show="scope.row.userPhone == ''" class="yellow">--</span>
          <span v-show="scope.row.userPhone != ''" class="yellow">{{scope.row.userPhone}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isDisable" label="状态">
        <template slot-scope="scope">
          <span v-show="scope.row.isDisable == 0" class="yellow">未激活</span>
          <span v-show="scope.row.isDisable == 1 && scope.row.isFreeze == 1" class="yellow">已冻结</span>
          <span
            v-show="scope.row.isDisable == 1 && scope.row.isFreeze == 0 && scope.row.isStop == 0"
            class="green"
          >已激活</span>
          <span
            v-show="scope.row.isDisable == 1 && scope.row.isFreeze == 0 && scope.row.isStop == 1"
          >已停用</span>
        </template>
      </el-table-column>
      <el-table-column prop="subjectType" label="操作" width="310">
        <template slot-scope="scope" class="handle">
          <el-button
            size="small"
            @click="detail(scope.$index, scope.row)"
            class="iconfont-color-blue"
          >
            <i class="iconfont">&#xe602;</i>详情
          </el-button>
          <el-button
            size="small"
            @click="changeState(scope.$index, scope.row,'删除')"
            v-show="scope.row.isDisable == 0"
            class="iconfont-color-blue"
          >
            <i class="iconfont">&#xe61c;</i>删除
          </el-button>
          <el-button
            size="small"
            @click="changeState(scope.$index, scope.row,'恢复')"
            v-show="scope.row.isDisable == 1 && scope.row.isFreeze ==1"
            class="iconfont-color-blue"
          >
            <i class="iconfont">&#xe61c;</i>恢复
          </el-button>
          <el-button
            size="small"
            @click="changeState(scope.$index, scope.row,'冻结')"
            v-show="scope.row.isDisable == 1 && scope.row.isFreeze == 0"
            class="iconfont-color-blue"
          >
            <i class="iconfont">&#xe61c;</i>冻结
          </el-button>
          <el-button
            size="small"
            @click="changePassword(scope.$index, scope.row)"
            class="iconfont-color-blue iconfont-color-red"
          >
            <i class="iconfont">&#xe607;</i>修改密码
          </el-button>
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
    <!-- 详情 -->
    <el-dialog
      title="学员详情"
      :visible.sync="detaildialog"
      :close-on-click-modal="false"
      width="50%"
      class="detailData"
    >
      <h2>账号信息</h2>
      <el-form status-icon label-width="100px" class="demo-ruleForm" :model="detailData">
        <el-form-item label="姓名" prop="userName">
          <el-input type="text" disabled v-model="detailData.userName"></el-input>
        </el-form-item>
        <el-form-item label="知号" prop="userZhinum">
          <el-input type="text" disabled v-model="detailData.userZhinum"></el-input>
        </el-form-item>
        <el-form-item label="账号状态" prop="isDisable">
          <el-input type="text" disabled v-model="computedIsDisable"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="userType">
          <el-input type="text" disabled v-model="computedUserType"></el-input>
        </el-form-item>
        <el-form-item label="机构" prop="schoolName">
          <el-input type="text" disabled v-model="detailData.schoolName"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="userNum">
          <el-input type="text" disabled v-model="detailData.userNum"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="userNum">
          <el-input type="text" disabled v-model="detailData.userCard"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="gradeName">
          <el-input type="text" disabled v-model="detailData.gradeName"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="className">
          <el-input type="text" disabled v-model="detailData.className"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="userMajor">
          <el-input type="text" disabled v-model="detailData.userMajor"></el-input>
        </el-form-item>
        <h2>个人信息</h2>
        <el-form-item label="性别" prop="userSex">
          <el-input type="text" disabled v-model="computedUserSex"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="userPhone">
          <el-input type="text" disabled v-model="detailData.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmial">
          <el-input type="text" disabled v-model="detailData.userEmial"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="userBirthday">
          <el-input type="text" disabled v-model="detailData.userBirthday"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="userAddress">
          <el-input type="text" disabled v-model="detailData.userAddress"></el-input>
        </el-form-item>
        <el-form-item label="个性签名" prop="userSignature">
          <el-input type="text" disabled v-model="detailData.userSignature"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detaildialog = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 删除密码 -->
    <el-dialog
      title="请输入新密码"
      :visible.sync="dialogRePassword"
      width="30%"
      :close-on-click-modal="false"
      style="margin-top:50px;"
    >
      <el-input v-model="newPwd" placeholder="8-15位英文与数字组合字符" type="text"></el-input>
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
import allCites from "../../../../static/mock/city.json";
export default {
  name: "AdminList",
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 8,
      pageData: [],
      loading: false,
      detaildialog: false,
      detailData: {},
      newPwd: "",
      dialogRePassword: false,
      repasswordTips: "",
      useId: "",
      schoolList: "",
      schoolValue: "",
      GradeList: "",
      GradeValue: "",
      classList: "",
      classValue: "",
      serarchValue: "",
      statusList: [
        { name: "未激活", id: 0 },
        { name: "已激活", id: 1 },
        { name: "已冻结", id: 2 },
        { name: "已停用", id: 3 },
        { name: "全部账号状态", id: -1 }
      ],
      statusValue: "",
      statusDetail: "",
      platform: "全部大B平台",
      palatformId: -1,
      platformlist: []
    };
  },
  computed: {
    computedIsDisable() {
      return this.statusDetail;
      /*
      if(this.detailData.isDisable = 0){return '未激活'}
      if(this.detailData.isDisable = 1){return '已激活'}
      if(this.detailData.isDisable = 2){return '冻结'}
      if(this.detailData.isDisable = 3){return '停用'}
      */
    },
    computedUserType() {
      if (this.detailData.userType == 0) {
        return "超级管理员";
      }
      if (this.detailData.userType == 1) {
        return "管理员";
      }
      if (this.detailData.userType == 2) {
        return "学员";
      }
    },
    computedUserSex() {
      if (this.detailData.userSex == 0) {
        return "保密";
      }
      if (this.detailData.userSex == 1) {
        return "男";
      }
      if (this.detailData.userSex == 2) {
        return "女";
      }
    }
  },
  methods: {
    selectChange(val) {
      this.palatformId = val;
      this.loadData(val);
    },
    headerClassFn(row, column, rowIndex, columnIndex) {
      return "color:#434343;background:rgba(245,245,245,1);font-size:12px;";
    },
    // 处理页号改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.loadData();
    },
    // 加载分页数据 userGradeid userClassid isDisable searchText
    loadData() {
      this.loading = true;
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(
          this.global.getCustomUserList +    
            `?userType=2&schoolId=${this.schoolValue}&systembId=${this.palatformId}&userGradeid=${
              this.GradeValue
            }&userClassid=${this.classValue}&isDisable=${
              this.statusValue
            }&searchText=${this.serarchValue}&pageNum=${
              this.currentPage
            }&pageSize=${this.pageSize}`
        )
        .then(res => {
          console.log(res);
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
    // 详情
    detail(index, row) {
      this.detaildialog = true;
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(this.global.getCustomUserById + "?userId=" + row.userId)
        .then(
          res => {
            this.detailData = res.data.resultObject.data;
            if (this.detailData.isDisable == 0) {
              this.statusDetail = "未激活";
            }
            if (
              this.detailData.isDisable == 1 &&
              this.detailData.isFreeze == 1
            ) {
              this.statusDetail = "已冻结";
            }
            if (
              this.detailData.isDisable == 1 &&
              this.detailData.isFreeze == 0 &&
              this.detailData.isStop == 0
            ) {
              this.statusDetail = "已激活";
            }
            if (
              this.detailData.isDisable == 1 &&
              this.detailData.isFreeze == 0 &&
              this.detailData.isStop == 1
            ) {
              this.statusDetail = "已停用";
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    // 修改状态
    changeState(index, row, n) {
      this.$confirm("您确定要进行" + n + "操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(row.isDisable);
          var isDisableNum;
          if (row.isDisable == 0) {
            isDisableNum = 1;
          } else if (row.isDisable == 1 && row.isFreeze == 1) {
            isDisableNum = 3;
          } else if (row.isDisable == 1 && row.isFreeze == 0) {
            isDisableNum = 2;
          }
          console.log(isDisableNum);
          Vue.http.headers.common["userToken"] = getCookie("userToken");
          this.$http
            .post(
              this.global.modifyCustomerUserById,
              { userId: row.userId, type: isDisableNum },
              { emulateJSON: true }
            )
            .then(
              res => {
                console.log(res);
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
      console.log(this.useId);
    },
    dialogRePasswordSubmit() {
      let passwordPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
      if (passwordPattern.test(this.newPwd) == false) {
        this.repasswordTips = "请输入正确的密码格式";
      } else {
        Vue.http.headers.common["userToken"] = getCookie("userToken");
        this.$http
          .post(
            this.global.modifyPassword,
            { userId: this.useId, newPwd: this.newPwd, type: 2 },
            { emulateJSON: true }
          )
          .then(
            res => {
              console.log(res);
              if (res.body.status == 512) {
                this.$notify({
                  title: "警告",
                  message: res.body.errorMessage,
                  type: "warning"
                });
              } else if (res.body.status == 200) {
                this.useId = "";
                this.newPwd = "";
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
    getSchools() {
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http.get(this.global.getSchools).then(res => {
        if (res.data.status === 200) {
          this.schoolList = res.data.resultObject.data;
        }
      });
    },
    schoolChange() {
      console.log(this.schoolValue);
      this.GradeValue = "";
      this.classValue = "";
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(this.global.getGrades + "?schoolId=" + this.schoolValue)
        .then(res => {
          if (res.data.status === 200) {
            console.log(res);
            this.GradeValue = "";
            this.classValue = "";
            this.GradeList = res.data.resultObject.data;
            console.log(this.GradeList);
          }
        });
      this.loadData();
    },
    GradeChange() {
      console.log(this.schoolValue);
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http
        .get(this.global.getClass + "?userGradeid=" + this.GradeValue)
        .then(res => {
          if (res.data.status === 200) {
            console.log(res);
            this.classValue = "";
            this.classList = res.data.resultObject.data;
            console.log(this.classList);
          }
        });
      this.loadData();
    },
    classChange() {
      this.loadData();
    },
    statusChange() {
      console.log(this.statusValue);
      this.loadData();
    },
    searchSubmit() {
      this.loadData();
    }
  },
  created() {
    this.loadData();
    this.getSchools();
    Vue.http.headers.common["userToken"] = getCookie("userToken");
    this.$http.get(this.global.getSystembs).then(res => {
      if (res.body.status === 200) {
        this.platformlistold = res.body.resultObject;
        this.platformlist = [
          { systembId: -1, systembName: "全部大B平台" },
          ...res.body.resultObject
        ];
      } else if (res.body.status === 511) {
        this.$router.push({ path: "/" });
      } else {
        alert(res.body.errorMessage);
      }
    });
  }
};
</script>
<style scoped lang="less">
.adminList {
  padding-bottom: 80px;
  .title-icon {
    display: flex;
    justify-content: space-between;
    li {
      flex-basis: 200px;
      font-size: 16px;
    }
    li:first-child {
      padding-top: 10px;
      text-align: left;
      font-weight: bolder;
    }
  }
  .search {
    overflow: hidden;
    margin-top: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // li {
    //   float: left;
    //   margin-left: 10px;
    // }
    // li:first-child {
    //   margin-left: 0px;
    // }
    .serarchValue {
      width: 300px;
    }
    .search-button {
      width: 110px;
    }
  }
  .el-table {
    margin-top: 15px;
    border-radius: 5px;
  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
  }
  .detailData {
    h2 {
      text-align: left;
      font-size: 18px;
      color: #409eff;
      margin-bottom: 20px;
      text-indent: 20px;
    }
  }
  .wrongTips {
    display: inline-block;
    text-align: left;
    color: #f56c6c;
    width: 100%;
  }
  .green {
    color: #30b44f;
  }
  .el-table {
    font-size: 12px;
  }
  .iconfont-color-blue {
    font-size: 12px;
  }
  .el-button--primary {
    background: #0090ff;
  }
}
</style>
