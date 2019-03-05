
<!-- eslint-disable -->
<template>
  <div class="adminList">
    <!-- 表单信息 -->
    <ul class="title-icon">
      <li style="font-size: 14px;
      color: #434343;">IBOX列表
        <!-- <i class="el-icon-caret-right"></i> -->
      </li>
    </ul>
    <ul class="search">
      <li>
        <el-select
          v-model="changeObj.provinceId"
          placeholder="请选择省份"
          @change="provchange(changeObj.provinceId)"
        >
          <el-option v-for="(item,index) in city" :key="index" :label="item.name" :value="index"></el-option>
        </el-select>
      </li>
      <li>
        <el-select
          v-model="changeObj.cityId"
          placeholder="请选择城市"
          @change="citychange(changeObj.cityId)"
        >
          <el-option
            v-for="(item,index) in cityarrs"
            :key="index"
            :label="item.name"
            :value="index"
          ></el-option>
        </el-select>
      </li>
      <li>
        <el-select
          v-model="changeObj.areaId"
          placeholder="请选择区县"
          @change="areachange(changeObj.areaId)"
        >
          <el-option v-for="(item,index) in arearrs" :key="index" :label="item" :value="index"></el-option>
        </el-select>
      </li>
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
        <el-select v-model="statusValue" placeholder="全部状态" @change="statusChange">
          <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </li>
      <li>
        <el-select
          v-model="searchText"
          filterable
          placeholder="输入设备名称/设备编号查询..."
          style="width:300px;"
        >
          <el-option v-for="(item,index) in options" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </li>
        <div class="searchs_btn" @click="searchSubmit">查找</div>
        <!-- <el-button type="primary" plain class="search-button" @click="searchSubmit">查找</el-button> -->
    </ul>
    <div class="statistics">当前条件下共有IBOX
      <span>{{this.IBOXStatus[4]}}</span> 台，其中空闲
      <span class="green">{{this.IBOXStatus[0]}}</span>台，忙碌
      <span class="yellow">{{this.IBOXStatus[1]}}</span>台，离线
      <span class="red">{{this.IBOXStatus[2]}}</span>台，警报
      <span style="color:pink">{{this.IBOXStatus[3]}}</span>台。
      <div class="addSb" @click="creatEquip">＋&nbsp;&nbsp;新增设备</div>
      <!-- <el-button type="success"  @click="creatEquip"></el-button> -->
    </div>
    <!-- 表单 -->
    <el-table :data="pageData" highlight-current-row :header-cell-style="headerClassFn"  style="width: 100%;border:1px solid rgba(229, 229, 228, 1)" v-loading="loading">
      <el-table-column type="index" label="序号" width="80">
        <template slot-scope="scope">{{scope.$index + 1 + (currentPage-1)*10}}</template>
      </el-table-column>
      <el-table-column prop="iboxName" label="名称" width="120"></el-table-column>
      <el-table-column prop="iboxType" label="型号">
        <template slot-scope="scope">
          <span v-show="scope.row.iboxType == 1">通用型</span>
        </template>
      </el-table-column>
      <el-table-column prop="iboxNum" label="编号"></el-table-column>
      <el-table-column prop="iboxRegion" label="所在地区" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.iboxRegion }}</p>
          <!-- <el-popover trigger="hover" placement="top">
            <div slot="reference" >
              <el-tag size="medium" class="readMore">{{ scope.row.iboxRegion }}</el-tag>
            </div>
          </el-popover>-->
        </template>
      </el-table-column>
      <el-table-column prop="schoolName" label="所属机构" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.schoolName }}</p>
          <!-- <el-popover trigger="hover" placement="top">
            <div slot="reference" >
              <el-tag size="medium" class="readMore">{{ scope.row.schoolName}}</el-tag>
            </div>
          </el-popover>-->
        </template>
      </el-table-column>
      <el-table-column prop="iboxStatus" label="状态">
        <template slot-scope="scope">
          <span v-show="scope.row.iboxStatus == 0">空闲</span>
          <span v-show="scope.row.iboxStatus == 1">忙碌</span>
          <span v-show="scope.row.iboxStatus == 2">离线</span>
          <span v-show="scope.row.iboxStatus == 3">警报</span>
        </template>
      </el-table-column>
      <el-table-column prop="useringTotalCount" label="使用人次">
        <template slot-scope="scope">
          <span v-show="scope.row.useringTotalCount == ''">--</span>
          <span v-show="scope.row.useringTotalCount != ''">{{scope.row.useringTotalCount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="useringTotalTime" label="累计使用时长" width="120">
        <template slot-scope="scope">
          <span v-show="scope.row.useringTotalTime == ''">--</span>
          <span
            v-show="scope.row.useringTotalTime != ''"
          >{{scope.row.useringTotalTime | formatDate3}}</span>
        </template>
      </el-table-column>
      <!--
      <el-table-column prop="latestTime" label="最近使用">
        <template slot-scope="scope">
          <span v-show="scope.row.latestTime == ''"></span>
          <span v-show="scope.row.latestTime != ''">{{scope.row.latestTime}}</span>
        </template>
      </el-table-column>
      -->
      <el-table-column prop="latestTime" label="最近使用" width="160">
        <template slot-scope="scope">
          <span v-show="scope.row.latestTime == ''">--</span>
          <span v-show="scope.row.latestTime != ''">{{scope.row.latestTime | formatDate2}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="subjectType" label="操作" width="370">
        <template slot-scope="scope" class="handle">
          <el-button
            size="small"
            @click="detail(scope.$index, scope.row)"
            class="iconfont-color-blue"
          >
            <i class="iconfont">&#xe60d;</i>编辑
          </el-button>
          <el-button
            size="small"
            class="iconfont-color-blue"
          >
            <i class="iconfont">&#xe77f;</i>监控
          </el-button>
          <el-button
            size="small"
            class="iconfont-color-blue"
          >
            <i class="iconfont">&#xe608;</i>设置
          </el-button>
          <el-button
            size="small"
            @click="equipDelete(scope.$index, scope.row)"
            class="iconfont-color-blue iconfont-color-red"
          >
            <i class="iconfont">&#xe600;</i>删除
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
    <!-- 新增设备 -->
    <el-dialog
      :title="equipTitle"
      :visible.sync="detaildialog"
      :close-on-click-modal="false"
      width="40%"
      class="detail"
    >
      <el-form status-icon label-width="100px" class="demo-ruleForm" :model="detailData">
        <el-form-item label="设备名称" prop="equipName">
          <span class="must">*</span>
          <el-input
            type="text"
            v-model.trim="detailData.equipName"
            placeholder="请输入设备名称，限2-16个字符"
            @change="equipPattern"
          ></el-input>
          <span
            class="wrongTips"
            v-show="this.detailData.equipNameTips"
          >{{this.detailData.equipNameTips}}</span>
        </el-form-item>
        <el-form-item label="设备型号" class="t-left">
          <span class="must">*</span>
          <el-select
            v-model.trim="detailData.versionTitle"
            placeholder="请选择"
            @change="versionChange()"
            class="version"
          >
            <el-option
              v-for="(item,index) in version"
              :key="index"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
          <span
            class="wrongTips"
            v-show="this.detailData.versionTitleTips"
          >{{this.detailData.versionTitleTips}}</span>
        </el-form-item>
        <el-form-item label="设备编号" prop="equipNum">
          <span class="must">*</span>
          <el-input
            type="text"
            v-model.trim="detailData.equipNum"
            placeholder="请输入设备编号"
            @change="equipNumPattern"
          ></el-input>
          <span
            class="wrongTips"
            v-show="this.detailData.equipNumTips"
          >{{this.detailData.equipNumTips}}</span>
        </el-form-item>
        <el-form-item label="所属大B平台" style="text-align:left">
          <el-select v-model="platformold" @change="selectChangeset" placeholder="请选择管理平台">
            <el-option   v-for="(item,index) in platformlistold"
                :key="index"
                :label="item.systembName"
                :value="item.systembId"></el-option>
          </el-select>
        </el-form-item>
      



        <el-form-item label="所属机构" prop="schoolName" class="schoolname">
          <span class="must">*</span>
          <el-select
            v-model.trim="detailData.schoolId"
            filterable
            placeholder="请选择"
            style="float:left;width:100%;"
            @change="schoolNamePattern"
          >
            <el-option
              v-for="item in schoolList"
              :key="item.schoolId"
              :label="item.schoolName"
              :value="item.schoolId"
            ></el-option>
          </el-select>
          <span
            class="wrongTips"
            v-show="this.detailData.schoolIdTips"
          >{{this.detailData.schoolIdTips}}</span>
        </el-form-item>
        <el-form-item label="负责人" prop="userName">
          <el-input
            type="text"
            v-model.trim="detailData.userName"
            placeholder="请输入不长于6字负责人姓名"
            @change="userNamePattern"
          ></el-input>
          <span
            class="wrongTips"
            v-show="this.detailData.userNameTips"
          >{{this.detailData.userNameTips}}</span>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            type="text"
            v-model.trim="detailData.phone"
            placeholder="请输入负责人手机号码"
            @change="phonePattern"
          ></el-input>
          <span class="wrongTips" v-show="this.detailData.phoneTips">{{this.detailData.phoneTips}}</span>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model.trim="detailData.schoolMark" placeholder="可输入设备详细位置等信息"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detaildialog = false">取消</el-button>
        <el-button type="primary" @click="insertIbox">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/*eslint-disable */
import Vue from "vue";
import $ from "jquery";
import { setCookie, getCookie } from "../../../../assets/js/cookie.js";
import allCites from "../../../../static/mock/city.json";
import cities from "../../../../static/mock/city2.json";
export default {
  filters: {
    formatDate2: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
    formatDate3: function(value) {
      var secondTime = parseInt(value); // 秒
      var minuteTime = 0; // 分
      var hourTime = 0; // 小时
      if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60);
          //获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      var result = "" + parseInt(secondTime) + "秒";

      if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
      }
      if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
      }
      return result;
    }
  },
  name: "AdminList",
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageData: [],
      IBOXStatus: "",
      loading: false,
      detaildialog: false,
      equipTitle: "新增设备",
      iboxId: "",
      editEquip: false,
      detailData: {
        equipName: "",
        equipNameTips: "",
        versionID: "",
        versionTitle: "",
        versionTitleTips: "",
        equipNum: "",
        equipNumTips: "",
        schoolId: "",
        schoolIdTips: "",
        schoolName: "",
        userName: "",
        userNameTips: "",
        phone: "",
        phoneTips: "",
        schoolMark: ""
      },
      //刷选条件
      schoolList: "",
      schoolValue: "",
      serarchValue: "",
      statusValue: "",
      statusList: [
        { name: "空闲", id: 0 },
        { name: "忙碌", id: 1 },
        { name: "离线", id: 2 },
        { name: "全部状态", id: -1 }
      ],
      // 城市选择
      changeObj: {},
      cityarrs: {},
      arearrs: {},
      city: null,
      // 匹配信息
      searchText: "",
      options: "",
      // 设备型号
      version: [{ id: 1, title: "通用型" }],
      provinceId: "",
      cityId: "",
      areaId: "",
      platform: "全部大B平台",
      palatformId: -1,
      platformlist: [],
      platformlistold:[],
      platformold:"",
      platformoldId:null //编辑里面的平台选择id
    };
  },
  methods: {
     selectChangeset(val){
      this.platformoldId = val
    },
      selectChange(val) {
      this.palatformId = val;
      this.loadData(val);
    },
        // 处理页号改变
    headerClassFn(row, column, rowIndex, columnIndex){
      return "color:#434343;font-size:12px;border-radius:0;"
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
          this.global.getIboxList +
            `?schoolId=${this.schoolValue}&iboxStatus=${
              this.statusValue
            }&systembId=${this.palatformId}&provinceId=${this.provinceId}&cityId=${this.cityId}&areaId=${
              this.areaId
            }&searchText=${this.searchText}&pageNum=${
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
            this.IBOXStatus = res.data.resultObject.iboxStatus;
            console.log(res.data.resultObject.iboxStatus);
          } else if (res.data.status === 511) {
            this.$router.push({ path: "/" });
          } else {
            alert(res.data.errorMessage);
          }
          this.loading = false;
        });
    },
    // 获取关键字
    getSearchTexts() {
      this.$http.get(this.global.getSearchTexts).then(
        res => {
          this.options = res.data.resultObject;
          console.log(this.options);
        },
        err => {
          console.log(err);
        }
      );
    },
    // 重置
    resect() {
      this.detailData.equipName = "";
        (this.platformoldId = null),

      this.detailData.equipNameTips = "";
      this.detailData.versionID = "";
      this.detailData.versionTitle = "";
      this.detailData.versionTitleTips = "";
      this.detailData.equipNum = "";
      this.detailData.equipNumTips = "";
      this.detailData.schoolId = "";
      this.detailData.schoolIdTips = "";
      this.detailData.schoolName = "";
      this.detailData.userName = "";
      this.detailData.userNameTips = "";
      this.detailData.phone = "";
      this.detailData.phoneTips = "";
      this.detailData.schoolMark = "";
    },
    // 全部学校
    getSchools() {
      Vue.http.headers.common["userToken"] = getCookie("userToken");
      this.$http.get(this.global.getSchools).then(res => {
        if (res.data.status === 200) {
          this.schoolList = res.data.resultObject.data;
        }
      });
    },
    schoolChange() {
      this.loadData();
    },
    // 搜索keyword
    searchChange() {
      this.keyShow = true;
    },
    // 条件筛选
    classChange() {
      this.loadData();
    },
    statusChange() {
      console.log(this.statusValue);
      this.loadData();
    },
    searchSubmit() {
      this.loadData();
    },
    // 城市选择
    provchange(key) {
      console.log(key);
      this.provinceId = key;
      console.log(this.city[key].name);
      this.cityarrs = this.city[key].child;
      //this.changeObj['provinceName']=this.city[key].name;
      this.arearrs = [];
      this.changeObj.cityId = "";
      this.changeObj.areaId = "";
      this.loadData();
    },
    citychange(key) {
      console.log(key);
      this.cityId = key;
      console.log(this.cityarrs[key].name);
      this.arearrs = this.cityarrs[key].child;
      //this.changeObj['cityName']=this.cityarrs[key].name;
      this.changeObj.areaId = "";
      this.loadData();
    },
    areachange(key) {
      console.log(key);
      this.areaId = key;
      console.log(this.arearrs[key]);
      this.changeObj["areaName"] = this.arearrs[key];
      this.changeObj = Object.assign({}, this.changeObj);
      this.loadData();
    },
    // 删除设备
    equipDelete(index, row) {
      this.$confirm(
        "您确定删除此设备，删除后设备将不能正常工作。",
        "删除设备",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          Vue.http.headers.common["userToken"] = getCookie("userToken");
          this.$http
            .post(
              this.global.deleteIboxById,
              { iboxId: row.iboxId },
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
                    message: "删除设备成功",
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
    // 新增设备
    creatEquip() {
      this.detaildialog = true;
      this.editEquip = false;
      this.resect();
    },
    insertIbox() {
      this.equipTitle = "新增设备";
      let equipPattern = /^.{2,16}$/;
      let equipNumPattern = /^.{10,20}$/;
      let schoolNamePattern = /^.{2,16}$/;
      let versionTitlePatterm = /^.{1,16}$/;
      let userNamePattern = /^.{1,6}$/;
      let phonePatter = /^1[34578]\d{9}$/;
      if (equipPattern.test(this.detailData.equipName) == false) {
        this.detailData.equipNameTips = "！名称限2-16个字符。";
      } else {
        this.detailData.equipNameTips = "";
      }
      if (equipNumPattern.test(this.detailData.equipNum) == false) {
        this.detailData.equipNumTips = "！编号格式错误";
      } else {
        this.detailData.equipNumTips = "";
      }
      if (schoolNamePattern.test(this.detailData.schoolId) == false) {
        this.detailData.schoolIdTips = "！不能为空";
      } else {
        this.detailData.schoolIdTips = "";
      }
      if (versionTitlePatterm.test(this.detailData.versionTitle) == false) {
        this.detailData.versionTitleTips = "！不能为空";
      } else {
        this.detailData.versionTitleTips = "";
      }
       if(!this.platformoldId){
         this.$message({
          message: '请选择管理平台',
          type: 'warning'
        });
        return
      }
      if (
        this.detailData.equipName &&
        this.detailData.versionTitle &&
        this.detailData.equipNum &&
        this.detailData.schoolId &&
        this.detailData.equipNameTips == "" &&
        this.detailData.equipNumTips == "" &&
        this.detailData.schoolIdTips == "" &&
        this.detailData.versionTitleTips == ""
      ) {
        // this.detaildialog = false
        let equipApi = this.global.insertIbox;
        if (this.editEquip) {
          equipApi = this.global.editIbox;
        }
        if ((this.detailData.versionTitle = "通用型")) {
          this.detailData.versionTitle = 1;
        }
        this.$http
          .post(
            equipApi,
            {
              iboxId: this.iboxId,
              iboxName: this.detailData.equipName,
              iboxNum: this.detailData.equipNum,
              iboxType: this.detailData.versionTitle,
              schoolId: this.detailData.schoolId,
              managerTel: this.detailData.phone,
              managerName: this.detailData.userName,
              iboxRemark: this.detailData.schoolMark,
              systembId:this.platformoldId
            },
            { emulateJSON: true }
          )
          .then(
            res => {
              if (res.body.status == 512) {
                this.$message.error(`${res.body.errorMessage}`);
              }
              this.detaildialog = false;
              this.resect();
              this.loadData();
            },
            err => {
              console.log(err);
            }
          );
      } else {
        console.log("no");
      }
    },
    // 编辑
    detail(index, row) {
      this.resect();
      this.detaildialog = true;
      this.equipTitle = "编辑设备";
      this.editEquip = true;
      this.iboxId = row.iboxId;
      this.platformoldId=row.systembId;
      this.platformold=row.systembName;
      console.log(this.equipOperate);
      this.$http.get(this.global.getIbox + "?iboxId=" + row.iboxId).then(
        res => {
          console.log(res.data.resultObject);
          this.detailData.equipName = res.data.resultObject.iboxName;
          this.detailData.equipNum = res.data.resultObject.iboxNum;
          if (res.data.resultObject.iboxType == 1) {
            this.detailData.versionTitle = "通用型";
          }
          // this.detailData.versionTitle = res.data.resultObject.iboxType
          this.detailData.schoolId = res.data.resultObject.schoolId;
          this.detailData.phone = res.data.resultObject.managerTel;
          this.detailData.userName = res.data.resultObject.managerName;
          this.detailData.schoolMark = res.data.resultObject.iboxRemark;
        },
        err => {
          console.log(err);
        }
      );
    },
    // 设备型号
    versionChange() {
      console.log(this.detailData.versionTitle);
      let versionTitlePatterm = /^.{1,16}$/;
      if (versionTitlePatterm.test(this.detailData.versionTitle) == false) {
        this.detailData.versionTitleTips = "！不能为空";
      } else {
        this.detailData.versionTitleTips = "";
      }
    },
    equipNumPattern() {
      let equipNumPattern = /^.{10,20}$/;
      if (equipNumPattern.test(this.detailData.equipNum) == false) {
        this.detailData.equipNumTips = "！编号格式错误";
      } else {
        this.detailData.equipNumTips = "";
      }
    },
    schoolNamePattern() {
      let schoolNamePattern = /^.{2,16}$/;
      if (schoolNamePattern.test(this.detailData.schoolId) == false) {
        this.detailData.schoolIdTips = "！不能为空";
      } else {
        this.detailData.schoolIdTips = "";
      }
    },
    equipPattern() {
      let equipPattern = /^.{2,16}$/;
      if (equipPattern.test(this.detailData.equipName) == false) {
        this.detailData.equipNameTips = "！名称限2-16个字符。";
      } else {
        this.detailData.equipNameTips = "";
      }
    },
    userNamePattern() {
      let userNamePattern = /^.{1,12}$/;
      if (userNamePattern.test(this.detailData.userName) == false) {
        this.detailData.userNameTips = "请输入不长于6字负责人姓名";
      } else {
        this.detailData.userNameTips = "";
      }
    },
    phonePattern() {
      let phonePatter = /^1[34578]\d{9}$/;
      if (phonePatter.test(this.detailData.phone) == false) {
        this.detailData.phoneTips = "请输入正确的手机号码";
      } else {
        this.detailData.phoneTips = "";
      }
    }
  },
  created() {
    this.loadData();
    this.getSchools();
    this.getSearchTexts();
    this.city = allCites;
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
    margin-top: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    li {
      margin-left: 10px;
      flex: 1;
      position: relative;
    }
    li:first-child {
      margin-left: 0px;
    }
    li:last-child {
      text-align: right;
    }
    .serarchValue {
      width: 250px;
    }
    .search-button {
      width: 110px;
      height:40px;
      line-height: 40px;
      background:rgba(0,144,255,1);
      border-radius:2px;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      cursor: pointer;
    }
    .search-content {
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      z-index: 999;
      height: 246px;
      background-color: white;
      border: 1px solid rgb(220, 220, 220);
      overflow: hidden;
      border-radius: 5px;
    }
    .search-content li {
      color: #666;
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      text-align: center;
      margin-left: 0;
    }
  }
  .statistics {
    height: 55px;
    line-height: 55px;
    border: 1px solid rgb(220, 220, 220);
    position: relative;
    top: 15px;
    border-radius: 5px 5px 0 0;
    font-size: 14px;
    text-align: left;
    padding-left: 20px;
    color: #999;
    overflow: hidden;
    border-bottom: 0;
    background-color: rgba(245,245,245,1);
    span {
      padding: 0 3px;
      font-weight: bolder;
    }
    .green {
      color: #30B44F;
    }
    .yellow {
      color:#F2A218;
    }
    .red {
      color: #DA373B;
    }
    .el-button {
      float: right;
      margin: 10px 10px 0 0;
    }
  }
  .detail {
    .t-left {
      text-align: left;
    }
    .version {
      width: 100%;
    }
    .wrongTips {
      display: inline-block;
      text-align: left;
      color: #f56c6c;
      width: 100%;
    }
    .must {
      color: red;
      position: absolute;
      left: -77px;
      top: 0;
    }
    .wrongTips {
      display: inline-block;
      text-align: left;
      color: #f56c6c;
      width: 100%;
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
    .green {
    color: #30B44F;
  }
  .el-table{
    font-size: 12px;
    border-radius: 0;

  }
  .iconfont-color-blue{
    font-size: 12px;
  }
  .addSb{
    width:112px;
    line-height: 33px;
    text-align: center;
    color: #fff;
    height:33px;
    background:rgba(48,180,79,1);
    border:1px solid rgba(15,127,3,1);
    border-radius:4px;
    float: right;
    margin: 10px 10px 0 0;
    cursor: pointer;
  }
}
</style>
